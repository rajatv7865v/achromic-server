import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  sendMail(to: string, subject: string, template: string, context: any): any {
    this.mailerService
      .sendMail({
        to: to,
        bcc: 'info@globalipacademy.in',
        from: 'info@globalipacademy.in',
        subject: subject,
        template: template,
        context: context,
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async sendEmailBcc() {
    await this.mailerService.sendMail({
      bcc: [], // Use bcc instead of to
      subject: 'Test Email',
      template: 'confirmSpeaker', // Assuming 'template' is the name of your Handlebars template file
      context: {
        name: 'GLA Team',
      },
    });
  }
}