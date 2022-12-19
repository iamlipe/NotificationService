import { Notification as PrismaNotification } from '@prisma/client';
import { Notification } from '@application/entities/notifications';
import { Content } from '@application/entities/content';

export class NotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      category: notification.category,
      content: notification.content.value,
      readAt: notification.readAt,
      cancelAt: notification.cancelAt,
      createdAt: notification.createdAt,
    };
  }

  static prismaToDomain(raw: PrismaNotification) {
    return new Notification(
      {
        recipientId: raw.recipientId,
        category: raw.category,
        content: new Content(raw.content),
        readAt: raw.readAt,
        cancelAt: raw.cancelAt,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}
