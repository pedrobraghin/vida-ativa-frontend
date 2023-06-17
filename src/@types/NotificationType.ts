export type NotificationType = {
  id: string;
  fromId: string;
  title: string;
  message: string;
  type: string;
  dateTime: Date;
  img?: string;
};

export enum ENotificationPress {
  ACCEPT_FRIEND_REQUEST = "accept_friend_request",
  DECLINE_FRIEND_REQUEST = "decline_friend_request",
}
