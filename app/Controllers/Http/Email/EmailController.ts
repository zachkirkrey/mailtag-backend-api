import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Email from 'App/Models/Email'
import MilestoneEvent, { EventType } from 'App/Models/MileStoneEvent'
import User from 'App/Models/User'
import GetEmailByIdValidator from 'App/Validators/Email/GetEmailByIdValidator'
import SearchInboxEmailValidator from 'App/Validators/SearchInboxEmailValidator'
import Config from '@ioc:Adonis/Core/Config'

export default class EmailController {
  public async index({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const page: number = request.input('page', Config.get('app.pagination.page'))
    const limit: number = request.input('limit', Config.get('app.pagination.limit'))

    const emails = await Email.query()
      .where({ userId: user.id })
      .preload('events')
      .paginate(page, limit)

    return emails.serialize()
  }

  public async show({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const { params } = await request.validate(GetEmailByIdValidator)
    const email = await Email.query()
      .where({ id: params.id, userId: user.id })
      .preload('events')
      .firstOrFail()

    return {
      data: {
        email: email.serialize(),
      },
    }
  }

  public async create({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    // TODO add validator
    const { recipient, subject, gmailMessageId, gmailThreadId } = request.body()

    const email = await Email.create({
      userId: user.id,
      recipient,
      subject,
      gmailMessageId,
      gmailThreadId,
    })

    const pingMilestone = { userId: user.id, eventType: EventType.emailCreated }
    await MilestoneEvent.firstOrCreate(pingMilestone, pingMilestone)

    return {
      data: {
        message: 'Email created successfully',
        email: email.serialize(),
      },
    }
  }

  public async update({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    // TODO add body validator
    const { recipient, subject } = request.body()
    const { params } = await request.validate(GetEmailByIdValidator)
    const email = await Email.query().where({ id: params.id, userId: user.id }).firstOrFail()

    await email.merge(recipient, subject).save()

    return {
      data: {
        message: 'Email updated successfully',
        email: email.serialize(),
      },
    }
  }

  public async destroy({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const { params } = await request.validate(GetEmailByIdValidator)

    const email = await Email.query().where({ userId: user.id, id: params.id }).firstOrFail()

    await email.delete()

    /**
     * TODO: queue a delete milestone background job
     * If user has no email records, delete the user's milestone_event with event_type 3
     *
     * We might consider not doing this, since the user is already onboarded. No point in rollinback
     * their onboarding progress
     */

    return {
      data: {
        message: 'Email deleted successfully',
      },
    }
  }

  public async search({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const { searchTerm, only } = await request.validate(SearchInboxEmailValidator)
    const page: number = request.input('page', Config.get('app.pagination.page'))
    const limit: number = request.input('limit', Config.get('app.pagination.limit'))

    const emails = await Email.query()
      .where({ userId: user.id })
      .andWhere((query) => {
        query.whereILike('subject', `%${searchTerm}%`).orWhereILike('recipient', `%${searchTerm}%`)
      })
      .if(only === 'reads', (query) => {
        query.andHas('events')
      })
      .if(only === 'unreads', (query) => {
        query.andDoesntHave('events')
      })
      .preload('events')
      .orderBy([{ column: 'created_at', order: 'desc' }])
      .paginate(page, limit)

    return emails.serialize()
  }
}
