import { BadRequestException, Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { EmailSettingsService } from '../services/email-settings.service';
import { EmailSettings } from '../schemas/email-settings.schema';
import { CreateEmailSettingsDto } from '../dto/email-settings.dto';

@Controller('email-settings')
export class EmailSettingsController {
  constructor(private readonly _emailSettingsService: EmailSettingsService) { }

  @Get()
  async findAll(): Promise<EmailSettings[]> {
    try {
      return this._emailSettingsService.findAll();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post()
  async createEmailSettings(
    @Body() createEmailSettingsDto: CreateEmailSettingsDto,
  ): Promise<EmailSettings> {
    try {
      return this._emailSettingsService.createEmailSettings(createEmailSettingsDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() createEmailSettingsDto: CreateEmailSettingsDto,
  ) {
    try {
      return this._emailSettingsService.updateEmailSettings(id, createEmailSettingsDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}