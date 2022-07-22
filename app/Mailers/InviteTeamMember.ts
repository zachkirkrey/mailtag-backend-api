import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'

export default class InviteTeamMember extends BaseMailer {
  constructor(
    private email: string,
    private teamInviteId: string,
    private teamOwnerName: string | null
  ) {
    super()
  }

  public override prepare(message: MessageContract) {
    message
      .subject('The email subject')
      .from('admin@example.com')
      .to('user@example.com')
      .htmlView('emails/team_invitation', {
        teamInvite: { id: this.teamInviteId, owner: this.teamOwnerName },
        user: { email: this.email },
        url: 'https://mailtag.io', //TODO change this to accept url maybe if not from frontend
      })
  }
}
