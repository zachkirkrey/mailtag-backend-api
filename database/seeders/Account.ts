import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Account from 'App/Models/Account'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Account.createMany(Array.from(Array(3)))
  }
}
