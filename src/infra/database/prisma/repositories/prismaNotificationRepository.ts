import { Injectable } from '@nestjs/common';
import { Notification } from '../../../../../src/application/entities/notifications';
import { NotificationRepository } from '../../../../../src/application/repositories/notificationRepository';
import { PrismaService } from '../prismaService';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: {
        recipientId: notification.recipientId,
        category: notification.category,
        content: notification.content.value,
        readAt: notification.readAt,
        createdAt: notification.createdAt,
      },
    });
  }
}
