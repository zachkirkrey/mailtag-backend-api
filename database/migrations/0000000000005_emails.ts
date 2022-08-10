import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'emails'

  public override async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE').notNullable()
      table.specificType('recipient', 'json ARRAY').notNullable()
      table.specificType('bcc_recipient', 'json ARRAY').notNullable()
      table.specificType('cc_recipient', 'json ARRAY').notNullable()
      table.string('subject').nullable()
      table.string('name').nullable()
      table.string('gmail_message_id').notNullable()
      table.string('gmail_thread_id').notNullable()
      table.boolean('is_deleted').notNullable().defaultTo(false)
      table.string('destination_email').nullable()
      table.string('email_sent_time').nullable()
      table.string('time_zone').nullable()
      table.string('email_body').nullable()

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
