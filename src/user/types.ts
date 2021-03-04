import { InputType, Field } from 'type-graphql'
import { Length, IsEmail } from 'class-validator'
import { User } from './entity'

@InputType('UserAddress')
export class UserAddress {
  @Field({ nullable: true })
  @Length(3, 100, { message: 'The street must contain between 3 and 100 characters' })
  street?: string

  @Field()
  @Length(3, 100, { message: 'The neighborhood must contain between 3 and 100 characters' })
  neighborhood: string

  @Field()
  @Length(3, 100, { message: 'The city must contain between 3 and 100 characters' })
  city: string
}

@InputType('UserInput')
export class UserInput implements Partial<User> {
  @Field()
  @Length(3, 200, { message: 'The name must contain between 3 and 200 characters' })
  name: string

  @Field()
  @IsEmail({}, { message: 'Enter a valid email address' })
  email: string

  @Field(() => UserAddress, { nullable: true })
  address?: UserAddress
}
