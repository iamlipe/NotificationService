import { Body, Controller, Post, Patch, Param, Get } from '@nestjs/common';
import { notificationDTO } from '../dtos/notificationDTO';

import { SendNotification } from '@application/useCase/sendNotification';
import { NotificationView } from '../view/NotificationView';
import { CancelNotification } from '@application/useCase/cancelNotification';
import { ReadNotification } from '@application/useCase/readNotification';
import { UnreadNotification } from '@application/useCase/unreadNotification';
import { CountRecipientNotification } from '@application/useCase/countRecipientNotification';
import { GetRecipientNotification } from '@application/useCase/getRecipientNotification';

@Controller('notification')
export class NotificationController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotificationn: UnreadNotification,
    private countRecipientNotification: CountRecipientNotification,
    private getRecipientNotification: GetRecipientNotification,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string): Promise<void> {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<{ count: number }> {
    const count = await this.countRecipientNotification.execute({
      recipientId,
    });

    return { count };
  }

  @Get('from/:recipientId')
  async getFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<{ notifications: NotificationView[] }> {
    const { notifications } = await this.getRecipientNotification.execute({
      recipientId,
    });

    return { notifications: notifications.map(NotificationView.toHTTP) };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string): Promise<void> {
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string): Promise<void> {
    await this.unreadNotificationn.execute({
      notificationId: id,
    });
  }

  @Post()
  async create(
    @Body() body: notificationDTO,
  ): Promise<{ notification: NotificationView }> {
    const { recipientId, category, content } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      category,
      content,
    });

    return { notification: NotificationView.toHTTP(notification) };
  }
}
