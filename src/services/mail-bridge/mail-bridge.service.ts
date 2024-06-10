import { Injectable } from '@nestjs/common';
import { MessageService } from '../message.service';
import { Message, MessageType } from '../../interface/message.interface';

@Injectable()
//הhtml פונקציה זו בודקת מה הסוג הודעה ולפי זה היא מפעילה פונקציה מתאימה שמחזירה את
// ואז היא מפעילה את הפונקציה של שליחת המייל
export class MailBridgeService {
  constructor(private readonly messageService: MessageService) {}
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
        case 'orderMessage':   
          htmlContent= await this.orderMessageHtml(
           message.to,
           message.numOrder,
           message.nameBussniesCode,
          )
          break;
        // אפשר להוסיף כאן מקרים נוספים
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

  private orderMessageHtml(to:string,numOrder:string,nameBussniesCode:string): string {   
    return `
    <h1> ${to} </h1>
    <h2>Your order will be accepted in the system</h2>
    <p>num order: ${numOrder}</p>
    <p>${nameBussniesCode}</p>`;
  }
}
