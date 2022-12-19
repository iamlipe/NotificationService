import { Notification } from '@application/entities/notifications';

export class NotificationView {
  static toHTTP(notification: Notification) {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      category: notification.category,
      content: notification.content.value,
      readAt: notification.readAt,
      cancelAt: notification.cancelAt,
    };
  }
}
