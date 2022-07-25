import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'settings'

  public override async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('mailtag_default_enabled').notNullable().defaultTo(false)
      table.boolean('desktop_notifications').notNullable().defaultTo(false)
      table.boolean('email_notifications').notNullable().defaultTo(false)
      table.boolean('link_tracking').notNullable().defaultTo(false)
      table.boolean('attachment_tracking').notNullable().defaultTo(false)
      table.boolean('custom_signatures').notNullable().defaultTo(false)
      table.boolean('custom_signature_for_pings').notNullable().defaultTo(false)

      table.text('bcc').nullable()
      table.text('sub_domain').nullable()
      table.text('boomerang').nullable()
    })
  }

  public override async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumns(
        'mailtag_default_enabled',
        'desktop_notifications',
        'email_notifications',
        'link_tracking',
        'attachment_tracking',
        'custom_signatures',
        'custom_signature_for_pings',
        'bcc',
        'sub_domain',
        'boomerang'
      )
    })
  }
}
