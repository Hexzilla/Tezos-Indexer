import { Document, Schema, model } from "mongoose";
import * as jwt from "jsonwebtoken";
import * as crypto from "crypto";
import { JWT_SECRET } from "utils/secrets";

export interface User extends Document {
  username: string;
  email: string;
  hash: string;
  salt: string;
  token?: string;
  generateJWT(): string;
  toAuthJSON(): any;
  setPassword(password: string): void;
  validPassword(password: string): boolean;
}

const UserSchema = new Schema<User>(
  {
    username: {
      type: Schema.Types.String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      index: true,
    },
    email: {
      type: Schema.Types.String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
    },
    hash: {
      type: Schema.Types.String,
    },
    salt: {
      type: Schema.Types.String,
    },
  },
  { timestamps: true }
);

UserSchema.methods.validPassword = function (password: string): boolean {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};

UserSchema.methods.setPassword = function (password: string) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

UserSchema.methods.generateJWT = function (): string {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      exp: exp.getTime() / 1000,
    },
    JWT_SECRET
  );
};

UserSchema.methods.toAuthJSON = function (): any {
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT(),
  };
};

export const UserModel = model<User>("User", UserSchema);
