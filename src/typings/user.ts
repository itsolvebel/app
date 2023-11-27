import { Category } from '@/typings/category'

export type User = {
  id: String
  username: String
  first_name: String
  last_name: String
  email: String
  description: String | null
  avatar_url: String | null
  roles: UserRole[]
  categories: Category[]
}

export type UserUpdate = {
  first_name?: String
  last_name?: String
  description?: String
  avatar_url?: String
}

export type UserLogin = {
  username_or_email: String
  password: String
}

export type UserSignup = {
  username: String
  first_name: String
  last_name: String
  email: String
  password: String
}

export enum UserRole {
  Admin,
  Freelancer,
  User,
  Tm,
  SalesRep,
}
