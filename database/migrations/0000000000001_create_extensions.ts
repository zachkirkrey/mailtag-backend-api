import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateExtensions extends BaseSchema {
  public override async up() {
    await this.raw(`CREATE EXTENSION if not exists "uuid-ossp";`)
  }

  public override async down() {
    await this.raw(`DROP EXTENSION if exists "uuid-ossp";`)
  }
}
