import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'emails'

  public override async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .uuid('signature_id')
        .references('id')
        .inTable('signatures')
        .onDelete('SET NULL')
        .nullable()
    })
  }

  public override async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumns('signature_id')
    })
  }
}
