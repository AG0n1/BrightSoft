import {Injectable, NotFoundException,} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import {$Enums, AuthMethods} from '../../prisma/__generated__';
import {Request} from 'express';
import UserRole = $Enums.UserRole;
import {SaveDeviceDTO, UpdateUserDTO} from "./dto/userInfo.dto";


@Injectable()
export class UserService {
  public constructor(private readonly prismaService: PrismaService) {}

  public isMoreThanTwoWeeksAgo(dateString: string): boolean {
    const [year, month, day] = dateString.split(':').map(Number);
    const inputDate = new Date(year, month - 1, day);
    const today = new Date();

    const diffInMs = today.getTime() - inputDate.getTime();
    const daysPassed = diffInMs / (1000 * 60 * 60 * 24);

    return daysPassed >= 14;
  }



  public async findById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user)
      throw new NotFoundException(
        `Пользователь с идентификатором ${id} не найден!`,
      );
    return user;
  }

  public async findMyEmail(email: string) {
    const user = this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user)
      throw new NotFoundException(
        `Пользователь с почтой ${email} не был найден!`,
      );

    return user;
  }

  public async getAllUsers(): Promise<any> {
    const data = this.prismaService.user.findMany({});
    if (!data) throw new NotFoundException(`Пользователи не найдены!`);
    return data;
  }

  public async getUserInfo(role: UserRole, email: string, request: Request) {
    const data = this.findMyEmail(email);
    if (!data) throw new NotFoundException(`Пользователь не найден!`);
    return data;
  }

  public async deleteUser(id: string) {
    const data = this.prismaService.user.delete({
      where: { id },
    });
    if (!data) throw new NotFoundException(`Пользователь не найден!`);
    return data;
  }

  public async getEnergy(id: string) {
    try {
      const user = await this.findById(id)
      return user.energy
    } catch (e) {
      console.log(id)
    }
  }

  public async updateById(dto: UpdateUserDTO) {
    const user = await this.prismaService.user.findUnique({
      where: { id: dto.id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${dto.id} not found`);
    }
    await this.prismaService.user.update({
      where: { id: dto.id },
      data: dto,
    })

    return await this.findById(dto.id);
  }

  public async saveDevice(dto: SaveDeviceDTO) {
    // const data = await this.prismaService.device.create({
    //
    // })
  }

  public async getDevices(id: string) {
    const data = await this.prismaService.device.findMany({
      where: {
        ownerId: id,
      }
    });
    return data;
  }

  public async collectDangerData(id: string) {
    const data = await this.prismaService.device.findMany({
      where: {
        ownerId: id
      }
    })
    return data
  }

  public async create(
    email: string,
    password: string,
    userName: string,
    picture: string,
    method: AuthMethods,
    isVerified: boolean,
    role: UserRole,
  ) {
    const user = this.prismaService.user.create({
      data: { email, password, userName, picture, method, isVerified, role },

    });
    return user;
  }
}
