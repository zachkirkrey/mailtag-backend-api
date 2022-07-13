import Application from '@ioc:Adonis/Core/Application'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  private async runSeeder(seeder: { default: typeof BaseSeeder }) {
    /**
     * Do not run when not in dev mode and seeder is development
     * only
     */
    if (seeder.default.developmentOnly && !Application.inDev) {
      return
    }

    await new seeder.default(this.client).run()
  }

  public override async run() {
    // Write your database queries inside the run method
    await this.runSeeder(await import('../Account'))
    await this.runSeeder(await import('../User'))
    await this.runSeeder(await import('../Email'))
    await this.runSeeder(await import('../EmailEvent'))
    await this.runSeeder(await import('../Link'))
    await this.runSeeder(await import('../LinkEvent'))
    await this.runSeeder(await import('../Signature'))
    await this.runSeeder(await import('../SignatureEvent'))
    await this.runSeeder(await import('../PingSequence'))
    await this.runSeeder(await import('../Ping'))
    await this.runSeeder(await import('../PingEvent'))
    await this.runSeeder(await import('../ReadEmail'))
    await this.runSeeder(await import('../ReadEmailActivity'))
    await this.runSeeder(await import('../UnreadEmail'))
    await this.runSeeder(await import('../UnreadEmailActivity'))
    await this.runSeeder(await import('../Activity'))
  }
}
