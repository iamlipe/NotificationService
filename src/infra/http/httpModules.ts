import { Module } from '@nestjs/common';
import { SendNotificationUseCase } from 'src/application/useCase/sendNotificationUseCase';
import { DatabaseModule } from '../database/databaseModule';
import { NotificationController } from './controllers/notificationController';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [SendNotificationUseCase],
})
export class HttpModule {}
