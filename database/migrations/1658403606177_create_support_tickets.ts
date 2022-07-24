import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'support_tickets'

  public override async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))

      table.text('subject').notNullable()
      table.text('message').notNullable()
      table.uuid('user_id').references('id').inTable('users').onDelete('SET NULL').nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public override async down() {
    this.schema.dropTable(this.tableName)
  }
}
