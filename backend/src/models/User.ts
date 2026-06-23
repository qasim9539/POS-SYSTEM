import mongoose, { Schema, type Document, type Model } from 'mongoose'

export type UserRole = 'admin' | 'manager' | 'user'

export interface IUser {
  fullName: string
  businessName: string
  email: string
  password: string
  role: UserRole
  isVerified: boolean
  isActive: boolean
  lastLogin?: Date
  refreshToken?: string
  createdAt: Date
  updatedAt: Date
}

export interface IUserDocument extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>
}

export interface SafeUser {
  id: string
  fullName: string
  businessName: string
  email: string
  role: UserRole
  isVerified: boolean
  isActive: boolean
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUserDocument>(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: [100, 'Full name cannot exceed 100 characters'],
    },
    businessName: {
      type: String,
      required: [true, 'Business name is required'],
      trim: true,
      maxlength: [150, 'Business name cannot exceed 150 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false,
    },
    role: {
      type: String,
      enum: ['admin', 'manager', 'user'],
      default: 'admin',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
    refreshToken: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret: Record<string, unknown>) {
        delete ret.password
        delete ret.refreshToken
        delete ret.__v
        return ret
      },
    },
  },
)

userSchema.index({ isActive: 1 })

userSchema.methods.comparePassword = async function comparePassword(
  candidatePassword: string,
): Promise<boolean> {
  const bcrypt = await import('bcryptjs')
  return bcrypt.compare(candidatePassword, this.password)
}

export function toSafeUser(user: IUserDocument): SafeUser {
  return {
    id: user._id.toString(),
    fullName: user.fullName,
    businessName: user.businessName,
    email: user.email,
    role: user.role,
    isVerified: user.isVerified,
    isActive: user.isActive,
    lastLogin: user.lastLogin,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
}

export const User: Model<IUserDocument> =
  mongoose.models.User ?? mongoose.model<IUserDocument>('User', userSchema)
