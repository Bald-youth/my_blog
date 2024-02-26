// user.model.ts
import { Document, Schema, model } from 'mongoose';

// 定义用户接口
export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  // 其他用户相关的属性
}

// 定义用户模型
const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: {type:String, required: true},
  // 其他用户相关的属性
});

const UserModel = model<IUser>('User', UserSchema);

export default UserModel;
