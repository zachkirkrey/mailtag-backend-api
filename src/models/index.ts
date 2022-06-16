import Users from './Users';
import Accounts from './Accounts';
import AccountSubscription from './AccountSubscription';
import Activities from './Activities';
import Attachments from './Attachments';
import AttachmentEvents from './AttachmentEvents';
import Emails from './Emails';
import EmailEvents from './EmailEvents';
import MilestoneEvents from './MilestoneEvents';
import PingSequences from './PingSequences';
import Preferences from './Preferences';
import ReferralCodes from './ReferralCodes';
import ScheduledEmails from './ScheduledEmails';
import ScheduledJobs from './ScheduledJobs';
import Sessions from './Sessions';
import Subscriptions from './Subscriptions';
import UserDevices from './UserDevices';
import PingSequenceDetails from './PingSequenceDetails';
import PingEmails from './PingEmails';
import PingSequenceActivities from './PingSequenceActivities';
import Links from './Links';
import LinkEvent from './LinkEvent';
import Signatures from './Signatures';
import ProfilePics from './ProfilePics';
import Teams from './Teams';
import TeamsAdmins from './TeamAdmins';
import TeamInvites from './TeamInvites';
import TeamMembers from './TeamMembers';
import Settings from './Setting';
import Errors from './Errors';

export default {
  Users,
  Accounts,
  AccountSubscription,
  Activities,
  Attachments,
  AttachmentEvents,
  EmailEvents,
  Emails,
  MilestoneEvents,
  PingEmails,
  PingSequenceDetails,
  PingSequences,
  Sessions,
  Subscriptions,
  UserDevices,
  LinkEvent,
  Links,
  PingSequenceActivities,
  ScheduledEmails,
  ScheduledJobs,
  Signatures,
  Teams,
  TeamsAdmins,
  TeamInvites,
  TeamMembers,
  ProfilePics,
  Settings,
  Errors,
  Preferences,
};

Users.hasMany(Accounts, { foreignKey: 'account_id' });
Users.hasMany(Activities, { foreignKey: 'user_id' });
Users.hasMany(Attachments, { foreignKey: 'user_id' });
Users.hasMany(Emails, { foreignKey: 'user_id' });
Users.hasMany(MilestoneEvents, { foreignKey: 'user_id' });
Users.hasMany(PingSequences, { foreignKey: 'user_id' });
Users.hasMany(Preferences, { foreignKey: 'user_id' });
Users.hasMany(ReferralCodes, { foreignKey: 'user_id' });
Users.hasMany(ScheduledEmails, { foreignKey: 'user_id' });
Users.hasMany(ScheduledJobs, { foreignKey: 'user_id' });
Users.hasMany(Sessions, { foreignKey: 'user_id' });
Users.hasMany(Subscriptions, { foreignKey: 'user_id' });
Users.hasMany(UserDevices, { foreignKey: 'user_id' });
Users.hasMany(PingSequenceDetails, { foreignKey: 'user_id' });
Users.hasMany(PingEmails, { foreignKey: 'user_id' });
Users.hasMany(PingSequenceActivities, { foreignKey: 'user_id' });
Subscriptions.hasMany(AccountSubscription, { foreignKey: 'subscription_id' });
Emails.hasMany(EmailEvents, { foreignKey: 'email_id' });
Emails.hasMany(Links, { foreignKey: 'email_id' });
Attachments.hasMany(AttachmentEvents, { foreignKey: 'attachment_id' });
PingSequences.hasMany(PingEmails, { foreignKey: 'ping_sequence_id' });
PingSequences.hasMany(PingSequenceDetails, { foreignKey: 'ping_sequence_id' });
Links.hasMany(LinkEvent, { foreignKey: 'link_id' });
PingSequences.hasMany(PingSequenceActivities, {
  foreignKey: 'ping_sequence_id',
});
PingSequenceDetails.hasMany(PingSequenceActivities, {
  foreignKey: 'ping_sequence_details_id',
});
PingEmails.hasMany(PingSequenceActivities, { foreignKey: 'ping_email_id' });
Users.hasMany(Settings, { foreignKey: 'user_id' });
Users.hasMany(Errors, { foreignKey: 'user_id' });
