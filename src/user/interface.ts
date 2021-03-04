import { Token } from 'typedi'
import { User } from './entity'
import { UserInput } from './types'

export const UserDataSource = new Token<UserDataSource>()

export interface UserDataSource {
  getUser(id: string): Promise<User>
  createUser(input: UserInput): Promise<User>
}
