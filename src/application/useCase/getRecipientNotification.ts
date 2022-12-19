import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notificationRepository';
import { Notification } from '@application/entities/notifications';

export interface GetRecipientNotificationResquest {
  recipientId: string;
}

export interface GetRecipientNotificationResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: GetRecipientNotificationResquest,
  ): Promise<GetRecipientNotificationResponse> {
    const { recipientId } = request;

    const notifications =
      await this.notificationRepository.findManyByRecipientId(recipientId);

    return { notifications };
  }
}
