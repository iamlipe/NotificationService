import { Body, Controller, Post } from '@nestjs/common';
import {
  SendNotificationResponse,
  SendNotificationUseCase,
} from 'src/application/useCase/sendNotificationUseCase';
import { CreateNotification } from '../../../../src/infra/http/dtos/createNotification';

@Controller('notifications')
export class NotificationController {
  constructor(private sendNotificationUseCase: SendNotificationUseCase) {}

  @Post()
  async create(
    @Body() body: CreateNotification,
  ): Promise<SendNotificationResponse> {
    const { recipientId, category, content } = body;

    const { notification } = await this.sendNotificationUseCase.execute({
      recipientId,
      category,
      content,
    });

    return { notification };
  }
}
