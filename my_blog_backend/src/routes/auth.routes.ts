// my_blog_backend/src/routes/auth.routes.ts

import express, { Request, Response, NextFunction } from 'express';
import UserModel from '../models/user.model';
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
      user?: any; // 根据实际情况定义用户对象的类型
    }
  }
}

// 验证用户身份的中间件
const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
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
  } catch (error: any) { // 显式指定 error 的类型为 any
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
      expiresIn: '1h',
    });

    return res.status(200).json({ message: '登录成功', token });
  } catch (error: any) { // 显式指定 error 的类型为 any
    console.error('登录时出现错误:', error);
    res.status(500).json({ message: '发生了一个意外的错误' });
  }
});

// 添加需要登录验证的其他路由和中间件
router.get('/protected', authenticateUser, (req, res) => {
  res.status(200).json({ message: '已登录，可以访问受保护的页面' });
});

export default router;
