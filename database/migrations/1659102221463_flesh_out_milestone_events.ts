import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'milestone_events'

  public override async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE').notNullable()
      table.integer('event_type').notNullable()
      table.boolean('is_deleted').notNullable().defaultTo(false)

      table.index('user_id')
    })
  }

  public override async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropIndex('user_id')

      table.dropColumns('user_id', 'event_type', 'is_deleted')
    })
  }
}
