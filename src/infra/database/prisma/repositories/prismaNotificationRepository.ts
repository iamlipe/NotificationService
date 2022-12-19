import { Injectable } from '@nestjs/common';
import { Notification } from '../../../../../src/application/entities/notifications';
import { NotificationRepository } from '../../../../../src/application/repositories/notificationRepository';
import { PrismaService } from '../prismaService';
import { NotificationMapper } from '@infra/database/mapper/notificationMapper';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prismaService.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification) return null;

    return NotificationMapper.prismaToDomain(notification);
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notification = await this.prismaService.notification.findMany({
      where: { recipientId },
    });

    return notification.map(NotificationMapper.prismaToDomain);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const notification = await this.prismaService.notification.findMany({
      where: { recipientId },
    });

    return notification.length;
  }

  async create(notification: Notification): Promise<void> {
    const raw = NotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data: raw,
    });
  }

  async save(notification: Notification): Promise<void> {
    const raw = NotificationMapper.toPrisma(notification);

    await this.prismaService.notification.update({
      where: { id: raw.id },
      data: raw,
    });
  }
}
