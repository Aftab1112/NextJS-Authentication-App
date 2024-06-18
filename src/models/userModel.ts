import mongoose, { Document, Model, Schema } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAdmin: boolean;
  forgotPasswordToken: string;
  forgotPasswordTokenExpiry: Date;
  verifyToken: string;
  verifyTokenExpiry: Date;
}

const userSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: {
      type: String,
      default: null,
    },
    forgotPasswordTokenExpiry: {
      type: Date,
      default: null,
    },
    verifyToken: {
      type: String,
      default: null,
    },
    verifyTokenExpiry: {
      type: Date,
      default: null,
    },
  },
  {
    collection: "Users",
  }
);

const User: Model<IUser> =
  mongoose.models.Users || mongoose.model<IUser>("Users", userSchema);
export default User;
