import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'signature_events'

  public override async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE').notNullable()
      table.uuid('email_id').references('id').inTable('emails').onDelete('CASCADE').notNullable()
      table.text('email_subject').nullable()
      table.text('click_recipient').notNullable()
      table.boolean('is_deleted').notNullable().defaultTo(false)

      table.timestamp('signature_cliked_time', { useTz: true })
    })
  }

  public override async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumns(
        'user_id',
        'email_id',
        'email_subject',
        'click_recipient',
        'is_deleted',
        'signature_cliked_time'
      )
    })
  }
}
