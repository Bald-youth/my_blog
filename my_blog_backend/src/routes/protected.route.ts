// protected.route.ts

import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET as string;

// 身份验证中间件
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ message: '未提供身份验证令牌！' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      console.error('JWT 验证失败:', err);
      return res.status(403).json({ message: '身份验证失败！' });
    }
    req.user = user;
    next();
  });
};

// 受保护的 API 端点
router.get('/protected', authenticateToken, (req: Request, res: Response) => {
  // 如果通过了身份验证，可以处理请求
  res.json({ message: '这是一个受保护的路由。' });
});

export default router;