import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

import { NotifyEmailDto } from './dto/notify-email.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationsService {
  constructor(private readonly configService: ConfigService) {}

  private readonly transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: this.configService.get<string>('SMTPL_USER'),
      clientId: this.configService.get<string>('GOOGLE_OAUTH_CLIENT_ID'),
      clientSecret: this.configService.get<string>(
        'GOOGLE_OAUTH_CLIENT_SECRET',
      ),
      refreshToken: this.configService.get<string>(
        'GOOGLE_OAUTH_REFRESH_TOKEN',
      ),
    },
  });
  async notifyEmail({ email, text }: NotifyEmailDto) {
    await this.transporter.sendMail({
      from: this.configService.get<string>('SMTPL_USER'),
      to: email,
      subject: 'Notification',
      text,
    });
  }
}
