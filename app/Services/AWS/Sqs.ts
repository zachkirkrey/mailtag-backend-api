import Env from '@ioc:Adonis/Core/Env'
import { Credentials, SQS } from 'aws-sdk'
import { Consumer } from 'sqs-consumer'
import Logger from '@ioc:Adonis/Core/Logger'
import User from 'App/Models/User'
import WelcomeUserMail from 'App/Mailers/WelcomeUserMail'
import { SQSMessageTypes } from 'App/Helpers/type'
import PaymentException from 'App/Exceptions/PaymentException'
import Application from '@ioc:Adonis/Core/Application'

const SQS_AUTH_ERROR_MESSAGE =
  'SQS receive message failed: The security token included in the request is invalid.'

export default class Sqs {
  private readonly queueUrl = Env.get('SQS_QUEUE_URL')
  private readonly region = this.queueUrl.split('//')[1].split('.')[1]
  private readonly credentials = new Credentials({
    accessKeyId: Env.get('AWS_ACCESS_KEY'),
    secretAccessKey: Env.get('AWS_ACCESS_SECRET'),
  })
  private readonly sqs = new SQS({
    region: this.region,
    credentials: this.credentials,
  })
  private readonly consumer: Consumer

  constructor() {
    this.consumer = Consumer.create({
      queueUrl: this.queueUrl,
      handleMessage: this.handleMessage,
      messageAttributeNames: ['All'],
    })

    this.attachConsumerEventListeners()
  }

  public async sendMessage(type: string, userId: User['id'], email: User['email']) {
    if (Application.inDev) {
      Logger.info(JSON.stringify({ SqsMessage: { type, userId, email } }, null, 2))
      return
    }

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
    this.consumer.start()
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

  private attachConsumerEventListeners() {
    this.consumer.on('error', async (err) => {
      Logger.error(err.message)
      if (err.message === SQS_AUTH_ERROR_MESSAGE) {
        // TODO: crash the process consumer is running on
        Logger.error('Stopping the sqs consumer, please fix your auth token')
        this.consumer.stop()
      }
    })

    this.consumer.on('processing_error', (err) => {
      Logger.error(err.message)
    })
  }
}
