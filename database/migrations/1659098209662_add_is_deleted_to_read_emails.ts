import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'read_emails'

  public override async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('is_deleted').notNullable().defaultTo(false)
    })
  }

  public override async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('is_deleted')
    })
  }
}
