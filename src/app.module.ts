import { Module } from '@nestjs/common';
import { SendNotificationUseCase } from './application/useCase/sendNotificationUseCase';
import { DatabaseModule } from './infra/database/databaseModule';
import { HttpModule } from './infra/http/httpModules';

@Module({
  imports: [DatabaseModule, HttpModule],
  providers: [SendNotificationUseCase],
})
export class AppModule {}
