import Env from '@ioc:Adonis/Core/Env'
import { Credentials, SQS } from 'aws-sdk'
import { Consumer } from 'sqs-consumer'
import Logger from '@ioc:Adonis/Core/Logger'
import User from 'App/Models/User'
import WelcomeUserMail from 'App/Mailers/WelcomeUserMail'
import { SQSMessageTypes } from 'App/Helpers/type'
import PaymentException from 'App/Exceptions/PaymentException'

export default class Sqs {
  private queueUrl = Env.get('SQS_QUEUE_URL')
  private accessKeyId = Env.get('AWS_ACCESS_KEY')
  private secretAccessKey = Env.get('AWS_ACCESS_SECRET')
  private region = this.queueUrl.split('//')[1].split('.')[1]
  private credentials = new Credentials({
    accessKeyId: this.accessKeyId,
    secretAccessKey: this.secretAccessKey,
  })
  private sqs = new SQS({
    region: this.region,
    credentials: this.credentials,
  })

  public async sendMessage(type: string, userId: User['id'], email: User['email']) {
    const params = {
      QueueUrl: this.queueUrl,
      MessageBody: `${type}/${userId}/${email}`,
      MessageAttributes: {
        type: {
          DataType: 'String',
          StringValue: type,
        },
        userId: {
          DataType: 'String',
          StringValue: userId,
        },
        email: {
          DataType: 'String',
          StringValue: email,
        },
      },
    }

    const message = await this.sqs.sendMessage(params).promise()

    return message.MessageId
  }

  // Gets the first message sent FIFO
  public async receiveMessage() {
    const message = await this.sqs
      .receiveMessage({ MessageAttributeNames: ['All'], QueueUrl: this.queueUrl })
      .promise()

    return message
  }

  public async start() {
    const app = Consumer.create({
      queueUrl: this.queueUrl,
      handleMessage: this.handleMessage,
      messageAttributeNames: ['All'],
    })

    app.on('error', (err) => {
      Logger.error(err.message)
    })

    app.on('processing_error', (err) => {
      Logger.error(err.message)
    })

    app.start()
  }

  public async handleMessage(message: SQS.Message) {
    const type = message.MessageAttributes?.type.StringValue as SQSMessageTypes
    const userId = message.MessageAttributes?.userId.StringValue
    const user = await User.query().where({ id: userId }).firstOrFail()

    switch (type) {
      case 'welcome_email':
        Logger.info('Sending welcome email')
        await new WelcomeUserMail(user.email, user.username).sendLater()
        break
      default:
        throw new PaymentException('No message type', 422)
    }
  }
}
