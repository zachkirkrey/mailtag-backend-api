import { BaseCommand } from '@adonisjs/core/build/standalone'

export default class DropTables extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static override commandName = 'drop:tables'

  /**
   * Command description is displayed in the "help" output
   */
  public static override description = ''

  public static override settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  }

  public override async run() {
    const { default: Database } = await import('@ioc:Adonis/Lucid/Database')
    await Database.rawQuery('DROP SCHEMA public CASCADE')
    await Database.rawQuery('CREATE SCHEMA public')

    this.logger.info('DB Schema Dropped')
  }
}
