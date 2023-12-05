// src/index.ts
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/auth.routes'

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(bodyParser.json());
app.use(cors());

// MongoDB 连接
mongoose.connect('mongodb://localhost:27017/my_blog_database', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
} as any);

// 使用路由
app.use('/auth',authRoutes);

// 示例路由
app.get('/', (req, res) => {
  res.send('Hello, this is your backend!');
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
