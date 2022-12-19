import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/databaseModule';

import { NotificationController } from './controllers/notificationController';

import { SendNotification } from '@application/useCase/sendNotification';
import { CancelNotification } from '@application/useCase/cancelNotification';
import { ReadNotification } from '@application/useCase/readNotification';
import { UnreadNotification } from '@application/useCase/unreadNotification';
import { GetRecipientNotification } from '@application/useCase/getRecipientNotification';
import { CountRecipientNotification } from '@application/useCase/countRecipientNotification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [
    SendNotification,
    CancelNotification,
    ReadNotification,
    UnreadNotification,
    GetRecipientNotification,
    CountRecipientNotification,
  ],
})
export class HttpModule {}
