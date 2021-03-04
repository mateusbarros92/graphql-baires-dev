import { ObjectType, Field, ID } from 'type-graphql'
import { prop as Property, getModelForClass, modelOptions } from '@typegoose/typegoose'

@ObjectType('Address')
export class Address {
  @Field({ nullable: true })
  @Property({ trim: true })
  street?: string

  @Field()
  @Property({ trim: true })
  neighborhood: string

  @Field()
  @Property({ trim: true })
  city: string
}

@ObjectType('User', { description: 'The User model' })
@modelOptions({ schemaOptions: { collection: 'User' } })
export class User {
  @Field(() => ID)
  id: string

  @Field()
  @Property({ trim: true })
  name: string

  @Field()
  @Property({ unique: true, trim: true })
  email: string

  @Field((_type) => Address, { nullable: true })
  @Property()
  address?: Address
}

export const UserModel = getModelForClass(User)
