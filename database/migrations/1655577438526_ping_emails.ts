import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'ping_emails'

  public override async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))
      table.string('recipient').notNullable()
      table.string('name').notNullable()
      table.string('subject').nullable()
      table.string('status').notNullable()
      table.boolean('is_deleted').notNullable().defaultTo(false)
      table.string('gmail_message_id').notNullable()
      table.string('gmail_thread_id').notNullable()
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE').notNullable()
      table
        .uuid('ping_sequence_id')
        .references('id')
        .inTable('ping_sequences')
        .onDelete('CASCADE')
        .notNullable()
      table.uuid('email_id').references('id').inTable('emails').onDelete('CASCADE').notNullable()
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
