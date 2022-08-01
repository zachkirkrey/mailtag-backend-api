import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready
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
