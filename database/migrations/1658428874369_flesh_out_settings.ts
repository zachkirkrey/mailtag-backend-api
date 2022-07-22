import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'settings'

  public override async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('timezone').notNullable().defaultTo('UTC')
      table.text('language').notNullable().defaultTo('en')
      table.text('country').notNullable().defaultTo('US')

      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE').notNullable()
    })
  }

  public override async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumns('timezone', 'language', 'country', 'user_id')
    })
  }
}
