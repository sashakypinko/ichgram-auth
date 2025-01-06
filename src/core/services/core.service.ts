import {ApiService, Injectable, InternalServerErrorException} from 'light-kite';
import {IUser} from '../models/user.model';

@Injectable()
class CoreService extends ApiService {
  constructor() {
    super({
      baseURL: process.env.CORE_SERVICE_URL || '',
    });
  }

  async getUserById(id: string): Promise<IUser | null> {
    try {
      const res = await this.get(`/users/${id}`).then((res) => res.data);
      return res.data;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async getUserByUniqueFields(query: { email?: string, username?: string }): Promise<IUser | null> {
    try {
      const res = await this.get('/users/by-unique-fields', query).then((res) => res.data);
      return res.data;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async createUser(data: Omit<IUser, 'scopes' | 'role'>): Promise<IUser> {
    try {
      const res = await this.post('/users', data).then((res) => res.data);
      return res.data;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

}

export default CoreService;
