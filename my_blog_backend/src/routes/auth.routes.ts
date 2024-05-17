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
      user?: IUser; // 根据实际情况定义用户对象的类型
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
    // 将用户对象添加到请求中，以便后续路由可以使用
    req.user = user;
    next();
  } catch (error: any) {
    return res.status(401).json({ message: '身份验证失败', error: error.message });
  }
};

// 登录路由
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: '用户名或密码错误' });
    }

    const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, {
      expiresIn: '0.5h',
    });

    return res.status(200).json({ message: '登录成功', token });
  } catch (error: any) {
    console.error('登录时出现错误:', error);
    return res.status(500).json({ message: '发生了一个意外的错误' });
  }
});

// 注册路由
router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // 检查用户名和邮箱是否已经存在
    const existingUser = await UserModel.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({ message: '用户名已存在' });
      } else {
        return res.status(400).json({ message: '邮箱已存在' });
      }
    }

    // 创建新用户
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword, email });
    await newUser.save();

    // 生成JWT
    const token = jwt.sign({ userId: newUser._id, username: newUser.username }, JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(201).json({ message: '注册成功', token });
  } catch (error: any) {
    console.error('注册时出现错误:', error);
    return res.status(500).json({ message: '发生了一个意外的错误' });
  }
});

export default router;
