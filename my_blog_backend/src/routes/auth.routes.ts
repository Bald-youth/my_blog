// auth.routes.ts
import express from 'express';
import UserModel, { IUser } from '../models/user.model';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    

    // 检查用户名是否已存在
    const existingUser: IUser | null = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: '用户名已存在!' });
    }

    // 对密码进行哈希
    const hashedPassword: string = await bcrypt.hash(password, 10);

    // 创建新用户
    const newUser: IUser = new UserModel({
      username,
      password: hashedPassword,
      email,
    });
    // console.log("注册测试"+username,password,email);

    // 保存用户到数据库
    await newUser.save();

    // 返回成功消息
    res.status(201).json({ message: '注册成功！！' });
  } catch (error) {
    console.error('注册时出现错误:', error);
    res.status(500).json({ message: '发生了一个意外的错误！！' });
  }
});

router.post('/login',async(req,res)=>{
  try{
    const { username,password } = req.body;
    // 根据用户名从数据库中查找用户
    const user = await UserModel.findOne({username});
    // 如果用户不存在或者密码不匹配，则返回错误消息
    if (!user || !(await bcrypt.compare(password,user.password))){
      return res.status(401).json({ message:'用户名或密码错误' });
    }

    // 如果用户名和密码正确，则返回成功消息和用户信息
    // 如果用户存在且密码匹配，则返回成功消息
    return res.status(200).json({message:'登录成功',user });
  }catch(error){
    console.error('登录时出现错误: ',error);
    res.status(500).json({message:'发生了一个意外的错误！！'});
  }
});

export default router;
