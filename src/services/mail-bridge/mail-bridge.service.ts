import { Injectable } from '@nestjs/common';
import { MessageService } from '../message.service';
import { Message, MessageType } from '../../interface/message.interface';
import { readFile } from 'fs/promises';

@Injectable()
//הhtml פונקציה זו בודקת מה הסוג הודעה ולפי זה היא מפעילה פונקציה מתאימה שמחזירה את
// ואז היא מפעילה את הפונקציה של שליחת המייל
export class MailBridgeService {
  constructor(private readonly messageService: MessageService) { }

  private async sendNewEmployeeEmail(message: any): Promise<string> {
    try {
      const filePath = "src/EmployeeInvitationEmail/EmployeeInvitationEmail.html";
      const htmlContent = await readFile(filePath, 'utf-8');
      const personalizedHtml = htmlContent
        .replace('[candidate\'s name]', message.name)
        .replace('[job title]', message.jobTitle)
        .replace('[Invitation Link]', message.invitationLink);
      return personalizedHtml;
    } catch (error) {
      console.error('Error reading HTML file:', error)
      throw new Error('Failed to read HTML file for new employee email');
    }
  }

  async handleMessage(message: any): Promise<void> {
    let htmlContent: string;

    try {
      switch (message.kindSubject) {
        case 'message':
          htmlContent = await this.messageHtml(
            message.to,
            message.subject,
            message.text,
          );
          break;
        case 'new Employee':
          htmlContent = await this.sendNewEmployeeEmail(message);
          break;
        default:
          throw new Error(`Unknown kindSubject: ${message.kindSubject}`);
      }
    } catch (error) {
      console.error('Error generating HTML content:', error);
      htmlContent = 'Default HTML content';
    }

    const formattedMessage: Message = {
      to: message.to,
      subject: message.subject,
      html: htmlContent,
      type: MessageType.Email,
      kindSubject: message.kindSubject,
    };
    await this.messageService.sendMessage(formattedMessage);
  }

  private messageHtml(to: string, subject: string, text: string): string {
    //פה מחזירים איך רוצים שההודעה תראה במייל, html
    return `
        <h1>${subject}</h1>
        <p>Hello ${to},</p>
        <p>${text}</p>
        <p>How are you?</p>
        <p>Best regards,</p>
        <p>RabbitMq</p>
      `;
  }
}



