import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Account from 'App/Models/Account'
import Logger from '@ioc:Adonis/Core/Logger'

export default class extends BaseSeeder {
  public override async run() {
    // Write your database queries inside the run method
    Logger.info('Starting account seeder')

    await Account.createMany(Array.from(Array(3)))

    Logger.info('Finishing account seeder')
  }
}
