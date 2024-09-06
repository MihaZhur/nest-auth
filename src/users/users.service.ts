import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.prismaService.user.create({
      data: createUserDto,
    });
    return createdUser;
  }

  // async findAll(): Promise<UserDocument[]> {
  //   return this.userModel.find().exec();
  // }

  async findByEmail(email: string): Promise<User> {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  async findById(userId: number): Promise<User> {
    return this.prismaService.user.findUnique({ where: { id: userId } });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    console.log(updateUserDto);
    
    return this.prismaService.user
      .update({ where: { id }, data: updateUserDto })
  }

  // async remove(id: string): Promise<UserDocument> {
  //   return this.userModel.findByIdAndDelete(id).exec();
  // }
}
