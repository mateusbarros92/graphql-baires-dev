import 'source-map-support/register'
import 'reflect-metadata'
import {
  Context,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Callback
} from 'aws-lambda'
import { ApolloServer } from 'apollo-server-lambda'
import { buildSchema } from 'type-graphql'
import { Container as container } from 'typedi'
import { connect } from './mongo'
import { UserResolver } from './user/resolver'

const createHandler = async (): Promise<any> => {
  await connect()

  const schema = await buildSchema({
    resolvers: [
      UserResolver
    ],
    container,
    emitSchemaFile: process.env.NODE_ENV === 'development',
    validate: true
  })

  const server = new ApolloServer({
    schema,
    introspection: true,
    playground: {
      settings: {
        'editor.theme': 'dark'
      },
      tabs: [
        {
          endpoint: `${process.env.PLAYGROUND_PATH}/graphql`
        }
      ]
    }
  })

  return server.createHandler({
    cors: {
      origin: '*',
      credentials: true
    }
  })
}

export const graphql = (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback<APIGatewayProxyResult>
): void => {
  context.callbackWaitsForEmptyEventLoop = false
  createHandler()
    .then((handler) => handler(event, context, callback))
    .catch(err => console.error(err))
}
