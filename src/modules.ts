import AuthController from './auth/auth.controller';
import AuthService from './auth/auth.service';
import CoreService from './core/services/core.service';
import JWTService from './core/services/jwt.service';
import EmailService from './core/services/email.service';

export default {
  middlewares: [],
  controllers: [AuthController],
  services: [
    AuthService,
    CoreService,
    JWTService,
    EmailService,
  ],
}