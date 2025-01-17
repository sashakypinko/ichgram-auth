import lightKiteServer from 'light-kite';
import {connectDB} from './core/config/db';
import modules from './modules';
import 'dotenv/config';

connectDB();

const app = lightKiteServer(modules);

app.useUserSocket('secret_key', {
  cors: {
    origin: '*',
  },
});

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.run(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});
