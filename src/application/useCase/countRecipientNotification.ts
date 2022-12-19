import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notificationRepository';

export interface CountRecipientNotificationResquest {
  recipientId: string;
}

@Injectable()
export class CountRecipientNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(request: CountRecipientNotificationResquest): Promise<number> {
    const { recipientId } = request;

    const count = await this.notificationRepository.countManyByRecipientId(
      recipientId,
    );

    return count;
  }
}
