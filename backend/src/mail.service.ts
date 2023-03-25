import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async mailSenderVerification(to: string, token: string, name: string) {
    const baseUrl = this.configService.get('BASE_URL');
    const verificationLink = `${baseUrl}/auth/email-verification/${token}`;

    const mailOptions = {
      to,
      subject: `Hey ${name} verifie ton email !`,
      html: `
      <div align="center"> 
        <h1>Bienvenu ${name} </h1>
        <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGE4Zjg4NjRmN2ExNjUyZmRlYmM5NzYxNGI0NDA0MmJjZGIwMTQzMiZjdD1n/Awuqdc4Rj6MbS/giphy.gif" width="240" height="120" alt="Animated GIF" style="display:block;">
        <p>Merci de cliquer sur le lien suivant pour valider votre inscription </p><p><a href="${verificationLink}">${verificationLink}</a></p>
      </div>
      `,
    };

    return this.mailerService.sendMail(mailOptions);
  }
}
