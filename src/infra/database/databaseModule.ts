import { Module } from '@nestjs/common';
import { NotificationRepository } from 'src/application/repositories/notificationRepository';
import { PrismaService } from './prisma/prismaService';
import { PrismaNotificationRepository } from './prisma/repositories/prismaNotificationRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationRepository,
    },
  ],
  exports: [NotificationRepository],
})
export class DatabaseModule {}
