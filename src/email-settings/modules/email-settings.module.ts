import { Module } from '@nestjs/common';
import { EmailSettingsController } from '../controllers/email-settings.controller';
import { EmailSettingsService } from '../services/email-settings.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailSettings, EmailSettingsSchema } from '../schemas/email-settings.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailSettings.name, schema: EmailSettingsSchema },
    ]),
  ],
  controllers: [EmailSettingsController],
  providers: [EmailSettingsService],
  exports: [EmailSettingsService]
})
export class EmailSettingsModule { }