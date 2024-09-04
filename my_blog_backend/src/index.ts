// my_blog_backend/src/index.ts
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes'

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/blog_database', {} as any);

app.use('/auth', authRoutes);  // 将路由添加到/auth前缀下
app.use('/api/users', userRoutes); // 将用户路由挂载到 /api/users

app.get('/', (req, res) => {
  res.send('Hello, this is your backend!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
