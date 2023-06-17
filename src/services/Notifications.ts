import notifee, {
  AndroidImportance,
  Notification,
  AndroidChannel,
  TriggerType,
  TimestampTrigger,
  AndroidAction,
  EventType,
  Event,
  RepeatFrequency,
} from "@notifee/react-native";
import {
  acceptFriendRequest,
  declineFriendRequest,
} from "../functions/friends";

import { ENotificationPress } from "../@types/NotificationType";
import { Colors } from "../constants/Colors";
interface ScheduleConfig {
  when: Date;
  repeat: boolean;
  intervalInHours?: number;
}

notifee.onBackgroundEvent(async ({ type, detail }: Event) => {
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

export async function handleFriendRequestNotification(
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
        pressAction: {
          id: "open-app",
          launchActivity: "default",
        },
      },
    };
    await notifee.displayNotification(notificationData);
  }

  public async scheduleNotification(
    channel: AndroidChannel,
    notification: Notification,
    scheduleConfig: ScheduleConfig
  ) {
    const { when, repeat } = scheduleConfig;
    const time = new Date(Date.now());

    if (when.getTime() < time.getTime()) {
      when.setDate(when.getDate() + 1);
    }
    time.setHours(when.getHours());
    time.setMinutes(when.getMinutes());
    time.setDate(when.getDate());
    time.setMonth(when.getMonth());
    time.setFullYear(when.getFullYear());

    let trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: time.getTime(),
      alarmManager: {
        allowWhileIdle: true,
      },
    };

    if (repeat) {
      trigger.repeatFrequency = RepeatFrequency.DAILY;
    } else {
      trigger.repeatFrequency = RepeatFrequency.NONE;
    }

    let channelId: string | undefined = undefined;
    const channels = await notifee.getChannels();
    const channelExists = channels.find((ch) => ch.name === channel.name);

    if (!channelExists) {
      channelId = await this.createChannel(channel);
    } else {
      channelId = channelExists.id;
    }

    await notifee.createTriggerNotification(
      {
        ...notification,
        android: {
          channelId,
          sound: "default",
          color: Colors.MainColor,
          showTimestamp: true,
          pressAction: {
            id: "open-app",
            launchActivity: "default",
          },
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
