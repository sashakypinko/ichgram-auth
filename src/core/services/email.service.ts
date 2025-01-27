import {Injectable} from 'light-kite';
import path from 'path';
import fs from 'fs';
import transporter from '../config/mailer';

@Injectable()
class EmailService {
  async sendEmail(to: string, subject: string, html: string): Promise<boolean> {
    try {
      await transporter.sendMail({
        from: process.env.FROM_EMAIL,
        to,
        subject,
        html,
      });

      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  };
  
  getEmailTemplate(name: string, variables: {[key: string]: number | string}): string | null {
    const templatePath = path.join(process.cwd(), `src/core/email-templates/${name}.template.html`);
    let emailTemplate = fs.readFileSync(templatePath, 'utf8');

    if (!emailTemplate.length) {
      return null;
    }
    
    for (const [key, value] of Object.entries(variables)) {
      const placeholder = `{{${key}}}`;
      emailTemplate = emailTemplate.replace(new RegExp(placeholder, 'g'), String(value));
    }
    
    return emailTemplate;
  }
}

export default EmailService;
