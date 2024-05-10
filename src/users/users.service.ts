import { BadRequestException, Injectable } from '@nestjs/common';
import { IUsers } from './interfaces/users.interface';

@Injectable()
export class UsersService {
  private readonly users: IUsers[] = [
    {
      id: 1,
      username: 'smith@yopmail.com',
      password: '12345678@',
    },
    {
      id: 2,
      username: 'patricia@yopmail.com',
      password: '987654321@',
    },
  ];

  async findOne(username: string): Promise<IUsers | undefined> {
    const user = this.users.find((user) => user.username === username);
    if (!user) throw new BadRequestException('User not found');
    return user;
  }
}
