import { connect as connectMongoose } from 'mongoose'

export async function connect (): Promise<void> {
  await connectMongoose(process.env.MONGODB_CONNECTION_STRING, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}
