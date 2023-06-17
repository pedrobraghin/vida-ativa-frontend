import notifee, {
  AndroidImportance,
  Notification,
  AndroidChannel,
  TriggerType,
  TimestampTrigger,
  IntervalTrigger,
  TimeUnit,
  AndroidAction,
  EventType,
  Event,
} from "@notifee/react-native";
import { ENotificationPress } from "../@types/NotificationType";
import {
  acceptFriendRequest,
  declineFriendRequest,
} from "../functions/friends";
import { Colors } from "../constants/Colors";
interface ScheduleConfig {
  when: Date;
  repeat: boolean;
  intervalInHours: number;
}

notifee.onBackgroundEvent(async ({ type, detail }: Event) => {
  if (!detail.pressAction) {
    return;
  }

  switch (type) {
    case EventType.ACTION_PRESS:
      const notificationType = detail.pressAction.id as ENotificationPress;
      console.log(detail.notification);
      if (!detail.notification?.data) {
        return;
      }

      const requestId = detail.notification.data.requestId as string;
      await handleFriendRequestNotification(notificationType, requestId);

      break;
  }
});

notifee.onForegroundEvent(async ({ type, detail }: Event) => {
  if (!detail.pressAction) {
    return;
  }

  switch (type) {
    case EventType.ACTION_PRESS:
      const notificationType = detail.pressAction.id as ENotificationPress;

      if (!detail.notification?.data) {
        return;
      }

      const requestId = detail.notification.data.requestId as string;
      await handleFriendRequestNotification(notificationType, requestId);

      break;
  }
});

async function handleFriendRequestNotification(
  notificationType: ENotificationPress,
  requestId: string
) {
  switch (notificationType) {
    case ENotificationPress.ACCEPT_FRIEND_REQUEST:
      await acceptFriendRequest(requestId);
      break;
    case ENotificationPress.DECLINE_FRIEND_REQUEST:
      await declineFriendRequest(requestId);
      break;
  }
}

export class Notifications {
  public async sendNotification(
    channel: AndroidChannel,
    notification: Notification,
    options: {
      actions?: AndroidAction[];
      icon?: string;
    }
  ) {
    await notifee.requestPermission();

    let channelId: string | undefined = undefined;
    const channels = await notifee.getChannels();
    channelId = channels.find((ch) => ch.name === channel.name)?.id;

    if (!channelId) {
      channelId = await this.createChannel(channel);
    }

    const notificationData: Notification = {
      ...notification,

      android: {
        channelId,
        showTimestamp: true,
        sound: "default",
        importance: AndroidImportance.HIGH,
        actions: options.actions,
        largeIcon: options.icon,
        circularLargeIcon: true,
        color: Colors.MainColor,
      },
    };
    await notifee.displayNotification(notificationData);
  }

  public async scheduleNotification(
    channel: AndroidChannel,
    notification: Notification,
    scheduleConfig: ScheduleConfig
  ) {
    const { when, repeat, intervalInHours } = scheduleConfig;
    const date = new Date(Date.now() + when.getMilliseconds());

    let trigger: IntervalTrigger | TimestampTrigger;

    if (repeat) {
      trigger = {
        type: TriggerType.INTERVAL,
        interval: intervalInHours,
        timeUnit: TimeUnit.HOURS,
      };
    } else {
      trigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: date.getTime(),
      };
    }

    let channelId: string | undefined = undefined;
    const channels = await notifee.getChannels();

    if (!channels.find((ch) => ch.name === channel.name)) {
      channelId = await this.createChannel(channel);
    }

    await notifee.createTriggerNotification(
      {
        ...notification,
        android: {
          channelId,
          sound: "default",
          color: Colors.MainColor,
        },
      },
      trigger
    );
  }

  public async cancelNotification(id: string) {
    await notifee.cancelNotification(id);
  }

  public async createChannel(channel: AndroidChannel) {
    return await notifee.createChannel({
      id: channel.id,
      name: channel.name,
      importance: AndroidImportance.HIGH,
      vibration: true,
    });
  }
}
