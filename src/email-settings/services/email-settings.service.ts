import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailSettings, EmailSettingsDocument } from '../schemas/email-settings.schema';
import { CreateEmailSettingsDto } from '../dto/email-settings.dto';

@Injectable()
export class EmailSettingsService {
  constructor(
    @InjectModel(EmailSettings.name) private _emailSettingsModule: Model<EmailSettings>,
  ) { }

  async findAll(): Promise<EmailSettingsDocument[]> {
    return this._emailSettingsModule.find().exec();
  }

  async createEmailSettings(
    createEmailSettingsDto: CreateEmailSettingsDto,
  ): Promise<EmailSettingsDocument> {
    const createEmailSettings = new this._emailSettingsModule(createEmailSettingsDto);
    return createEmailSettings.save();
  }

  async updateEmailSettings(
    id: string,
    createEmailSettingsDto: CreateEmailSettingsDto,
  ): Promise<EmailSettingsDocument> {
    const updateEmailSettings = await this._emailSettingsModule.findByIdAndUpdate(id, createEmailSettingsDto, {
      new: true,
    });
    if (!updateEmailSettings) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updateEmailSettings;
  }
}