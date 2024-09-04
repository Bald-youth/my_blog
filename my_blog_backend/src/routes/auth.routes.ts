// my_blog_backend/src/routes/auth.routes.ts

import express, { Request, Response } from 'express';
import UserModel, { IUser } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET as string;

// 扩展 Express 的 Request 对象以包含用户属性
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

// 验证用户身份的中间件
const authenticateUser = async (req: Request, res: Response, next: express.NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: '未提供身份验证令牌' });
  }

  try {
    const decodedToken: any = jwt.verify(token, JWT_SECRET);
    const user = await UserModel.findById(decodedToken.userId);
    if (!user) {
      return res.status(401).json({ message: '无效的身份验证令牌' });
    }
    req.user = user;
    next();
  } catch (error: any) {
    return res.status(401).json({ message: '身份验证失败', error: error.message });
  }
};

// 密码复杂度检查函数
const isPasswordStrong = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// 登录路由
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: '用户名或密码错误' });
    }

    const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, {
      expiresIn: '0.5h',
    });

    

    return res.status(200).json({ message: '登录成功', token ,userId: user._id});
  } catch (error: any) {
    console.error('登录时出现错误:', error);
    return res.status(500).json({ message: '服务器错误，请稍后重试' });
  }
});

// 注册路由
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;

    if (!isPasswordStrong(password)) {
      return res.status(400).json({
        message: '密码必须包含至少8个字符，其中包括大写字母、小写字母、数字和特殊字符',
      });
    }

    const existingUser = await UserModel.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({
        message: existingUser.username === username ? '用户名已存在' : '邮箱已存在',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword, email });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id, username: newUser.username }, JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(201).json({ message: '注册成功', token });
  } catch (error: any) {
    console.error('注册时出现错误:', error);
    return res.status(500).json({ message: '服务器错误，请稍后重试' });
  }
});

export default router;

