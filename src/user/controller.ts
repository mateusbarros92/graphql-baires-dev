import { Service } from 'typedi'
import { ApolloError } from 'apollo-server-lambda'
import { User, UserModel } from './entity'
import { UserDataSource } from './interface'
import { UserInput } from './types'

@Service('UserController')
export class UserController implements UserDataSource {
  async getUser (_id: string): Promise<User> {
    return await UserModel.findById({ _id })
  }

  async createUser (input: UserInput): Promise<User> {
    try {
      const user = await UserModel.create(input)
      return user
    } catch (err) {
      console.error(err)
      throw new ApolloError(
        'There is already an user with the same email',
        'USR400'
      )
    }
  }
}
