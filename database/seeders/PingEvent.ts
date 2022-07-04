import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TEST_USER_PROVIDER_ID } from 'App/Helpers/constant'
import { PingEventAttributes } from 'App/Helpers/type'
import Ping from 'App/Models/Ping'
import PingEvent from 'App/Models/PingEvent'
import Logger from '@ioc:Adonis/Core/Logger'

export default class extends BaseSeeder {
  public override async run() {
    // Write your database queries inside the run method
    Logger.info('Starting ping event seeder')

    const ping = await Ping.query()
      .whereHas('email', (query) =>
        query.whereHas('user', (query) => query.where({ providerId: TEST_USER_PROVIDER_ID }))
      )
      .firstOrFail()

    const pingEvents = Array.from(Array(5)).map(() => {
      const pingEventAttributes: PingEventAttributes = {
        pingId: ping.id,
      }

      return pingEventAttributes
    })

    await PingEvent.createMany(pingEvents)

    Logger.info('Finishing ping event seeder')
  }
}
