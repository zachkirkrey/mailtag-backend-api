import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { CamelCaseNamingStrategy } from 'App/Strategies/CamelCaseNamingStrategy'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready
    const { BaseModel } = await import('@ioc:Adonis/Lucid/Orm')
    BaseModel.namingStrategy = new CamelCaseNamingStrategy()
  }

  public async ready() {
    const { default: Sqs } = await import('App/Services/AWS/Sqs')
    const consumer = new Sqs()
    consumer.start()
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
