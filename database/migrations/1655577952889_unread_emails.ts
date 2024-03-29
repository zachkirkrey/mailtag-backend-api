import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'unread_emails'

  public override async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))
      table.uuid('email_id').references('id').inTable('emails').onDelete('CASCADE').notNullable()
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE').notNullable()
      table.string('device').notNullable()

      table.unique(['email_id', 'user_id'])

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
