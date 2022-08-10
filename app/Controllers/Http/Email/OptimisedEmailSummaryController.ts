import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Database from '@ioc:Adonis/Lucid/Database'
import _ from 'lodash'

export default class OptimisedEmailSummaryController {
  public async index({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const userId: string = user.id
    const emailId: string = request.input('email')
    const timezone: string = request.input('timezone', 'UTC')

    let query: string = `SELECT e.id as email_id,e.name,
        e.user_id, e.subject,
        e.destination_email,
        e.gmail_message_id,
        e.gmail_thread_id,
        e.email_sent_time,
        e.is_deleted 
        as email_is_deleted,
        e.updated_at as email_updated_at,
        e.cc_recipient,e.bcc_recipient,
        e.recipient,ev.id as email_event_id,
        ev.email_read_time,
        ev.email_clicked_device_name,
        ev.email_id as event_email_id,
        ev.is_deleted,
        ev.user_agent,
        ev.read_recipient,
        ev.updated_at,
        ev.is_deleted,
        ev.is_deleted,e.created_at::timestamp AT TIME ZONE 'UTC' AT TIME ZONE  '${timezone}' as 
        email_created_at,ev.created_at::timestamp AT TIME ZONE 'UTC' AT TIME ZONE  '${timezone}' 
        as created_at,
        ev.location
        FROM emails e left join email_events ev on e.id = ev.email_id`

    if (user) {
      query += ` where e.user_id='${userId}' AND (e.
            created_at::timestamp AT TIME ZONE 'UTC' AT TIME 
            ZONE '${timezone}' BETWEEN (now()::timestamp 
            AT TIME ZONE 'UTC' AT TIME ZONE '${timezone}' + 
            INTERVAL '-30 days') AND (now()::timestamp AT   
            TIME ZONE 'UTC' AT TIME ZONE '${timezone}')) 
            ORDER BY email_created_at DESC ,ev.email_read_time 
            DESC
        `
    } else {
      query += ` where e.id='${emailId}' ORDER BY email_created_at DESC`
    }

    const emails = await Database.rawQuery(query)
    const emailsGroupedById = _.groupBy(emails.rows, (email) => email.email_id)

    return {
      data: emailsGroupedById,
    }
  }
}
