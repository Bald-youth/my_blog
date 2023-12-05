// src/routes/auth.routes.ts
import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel, { IUser } from '../models/user.model';

const router = express.Router();

// 用户登录路由
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // 查找用户
    const user: IUser | null = await UserModel.findOne({ username });

    // 如果找不到用户，返回错误
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // 验证密码
    const isValidPassword: boolean = await bcrypt.compare(password, user.password);

    // 如果密码不匹配，返回错误
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // 生成 JWT
    const token: string = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

    // 返回成功响应，包含生成的 JWT
    res.json({ token });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
