import mongoose, { Schema, Document, models, model } from "mongoose";

// 1. Khai báo TypeScript interface
export interface UserType extends Document {
  id: string;
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt?: Date;
  updatedAt?: Date;
}
const UserSchema = new Schema<UserType>(
  {
    id: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  {
    collection: "user",
    timestamps: true, 
  }
);

const User = models.User || model<UserType>("User", UserSchema);
export default User;
