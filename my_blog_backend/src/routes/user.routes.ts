// my_blog_backend/src/routes/user.routes.ts
import express, { Request, Response } from 'express';
import UserModel from '../models/user.model'; // 引入用户模型


const router = express.Router();

// 获取指定用户信息的 API
router.get('/:id', async (req: Request, res: Response) => {
    console.log('进入了 user.routes.ts 路由处理器');
  try {
    const userId = req.params.id; // 从请求参数中获取用户 ID
    // console.log(`请求的用户ID: ${userId}`); // 调试信息
    const user = await UserModel.findById(userId).select('username email'); // 查询指定字段
    if (!user) {
      return res.status(404).json({ message: '用户未找到' });
    }
    res.json(user); // 返回用户信息
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: '服务器错误', error: error.message });
    } else {
      res.status(500).json({ message: '服务器错误', error: '未知错误' });
    }
  }
});

export default router;
