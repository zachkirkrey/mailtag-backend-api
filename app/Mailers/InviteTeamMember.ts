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
      .subject('MailTag Team Invitation')
      .from('info@mailtag.io') //TODO verify domain identity in SES
      .to(this.email)
      .htmlView('emails/team_invitation', {
        teamInvite: { id: this.teamInviteId, owner: this.teamOwnerName },
        user: { email: this.email },
        url: `https://mailtag.io/team-invites/${this.teamInviteId}/accept`, //TODO change this to accept url maybe if not from frontend
      })
  }
}
