import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'email_events'

  public override async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))
      table.uuid('email_id').references('id').inTable('emails').onDelete('CASCADE').notNullable()
      table.string('device').notNullable()
      table.string('location').notNullable()
      table.string('email_read_time').nullable()
      table.string('email_clicked_device_name').notNullable()
      table.string('user_agent').notNullable()
      table.string('read_recipient').nullable()
      table.boolean('is_deleted').notNullable().defaultTo(false)

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
