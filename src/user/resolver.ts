import { Service, Inject } from 'typedi'
import {
  Resolver,
  Mutation,
  Arg,
  Query
} from 'type-graphql'
import { User } from './entity'
import { UserInput } from './types'
import { UserController } from './controller'

@Resolver((_of) => User)
@Service()
export class UserResolver {
  @Inject()
  userController: UserController

  @Query((_returns) => User, { nullable: true })
  async getUser (@Arg('id') id: string): Promise<User> {
    return await this.userController.getUser(id)
  }

  @Mutation(() => User)
  async createUser (
    @Arg('input') input: UserInput
  ): Promise<User> {
    return await this.userController.createUser(input)
  }
}
