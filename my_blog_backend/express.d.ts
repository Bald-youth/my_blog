// express.d.ts

import { User } from './src/models/types'; // 这里的 './types' 是你的项目中用来定义用户类型的文件

declare global {
  namespace Express {
    interface Request {
      user?: User; // 这里的 User 是你定义的用户类型
    }
  }
}
