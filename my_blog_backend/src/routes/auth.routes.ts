// auth.routes.ts

import express from 'express';
import UserModel from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET as string;

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 根据用户名从数据库中查找用户
    const user = await UserModel.findOne({ username });

    // 如果用户不存在或者密码不匹配，则返回错误消息
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: '用户名或密码错误' });
    }

    // 如果用户名和密码正确，则生成JWT
    const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, {
      expiresIn: '1h', // token的有效期为1小时
    });

    // 返回成功消息和JWT
    return res.status(200).json({ message: '登录成功', token });
  } catch (error) {
    console.error('登录时出现错误:', error);
    res.status(500).json({ message: '发生了一个意外的错误！！' });
  }
});

// 添加其他路由和身份验证的中间件

export default router;
