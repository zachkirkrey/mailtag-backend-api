import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import InviteToMailTag from 'App/Mailers/InviteToMailTag'
import Invite from 'App/Models/Invite'
import User from 'App/Models/User'
import InviteEmailValidator from 'App/Validators/InviteEmailValidator'

export default class InviteController {
  public async invite({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const { emails } = await request.validate(InviteEmailValidator)

    await Promise.all(
      emails.map(async (email) => {
        // TODO handle sending errors, check response then create maybe
        new InviteToMailTag(email, user.username).sendLater()
        Invite.firstOrCreate(
          { receiverEmail: email },
          { receiverEmail: email, senderEmail: user.email }
        )
      })
    )

    return {
      data: {
        message: 'Emails invitation successfully sent',
      },
    }
  }
}
