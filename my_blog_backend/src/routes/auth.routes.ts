// auth.routes.ts
import express from 'express';
import UserModel, { IUser } from '../models/user.model';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/auth/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // 检查用户名是否已存在
    const existingUser: IUser | null = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // 对密码进行哈希
    const hashedPassword: string = await bcrypt.hash(password, 10);

    // 创建新用户
    const newUser: IUser = new UserModel({
      username,
      password: hashedPassword,
      email,
    });

    // 保存用户到数据库
    await newUser.save();

    // 返回成功消息
    res.status(201).json({ message: '注册成功！！' });
  } catch (error) {
    console.error('注册时出现错误:', error);
    res.status(500).json({ message: '发生了一个意外的错误！！' });
  }
});

export default router;
