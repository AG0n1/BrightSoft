import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '../../../prisma/__generated__';

export class UserInfoDto {
  role: UserRole;

  @IsString({ message: 'Email должен быть строкой.' })
  @IsEmail({}, { message: 'Некорректный формат email.' })
  @IsNotEmpty({ message: 'Email обязателен для заполнения.' })
  email: string;
}

export class UserDeleteDto {
  @IsString({ message: 'Id должен быть строкой.' })
  @IsNotEmpty({ message: 'Id обязателен для заполнения.' })
  id: string;
}

export class SaveDeviceDTO {
  type: string;
  name: string;
  consumptionRate: number;
  picture: string;
}

export class UpdateUserDTO {
  @IsString({ message: 'Id должен быть строкой.' })
  @IsNotEmpty({ message: 'Id обязателен для заполнения.' })
  id: string;

  firstName: string;
  secondName: string;
  fatherName: string;
  userName: string;
}