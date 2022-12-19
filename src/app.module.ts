import { Module } from '@nestjs/common';
import { SendNotification } from '@application/useCase/sendNotification';
import { DatabaseModule } from '@infra/database/databaseModule';
import { HttpModule } from '@infra/http/httpModules';

@Module({
  imports: [DatabaseModule, HttpModule],
  providers: [SendNotification],
})
export class AppModule {}
