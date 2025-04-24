import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {UserService} from './user.service';
import {WhoAmIDto} from './dto/whoAmI.dto';
import {SaveDeviceDTO, UpdateUserDTO, UserDeleteDto, UserInfoDto} from './dto/userInfo.dto';
import {Request} from 'express';
import {RolesGuard} from '../libs/common/decorators/role-validator';
import {FileInterceptor} from "@nestjs/platform-express";
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('whoAmI')
  @HttpCode(HttpStatus.OK)
  public async whoAmI(@Body() dto: WhoAmIDto) {
    return await this.userService.findById(dto.userId);
  }

  @Post('getEnergy')
  @HttpCode(HttpStatus.OK)
  public async getEnergy(@Body() dto: { id: string }) {
    return await this.userService.getEnergy(dto.id);
  }

  @Post('allUsers')
  @HttpCode(HttpStatus.OK)
  @UseGuards(new RolesGuard(['administrator', 'support']))
  public async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Post('userInfo')
  @HttpCode(HttpStatus.OK)
  @UseGuards(new RolesGuard(['administrator', 'support']))
  public async getUserInfo(@Body() dto: UserInfoDto, @Req() request: Request) {
    return await this.userService.getUserInfo(dto.role, dto.email, request);
  }

  @Delete('deleteUser')
  @HttpCode(HttpStatus.OK)
  @UseGuards(new RolesGuard(['administrator']))
  public async deleteUser(@Body() dto: UserDeleteDto) {
    return await this.userService.deleteUser(dto.id);
  }

  @Post('update')
  @HttpCode(HttpStatus.OK)
  public async update(@Body() dto: UpdateUserDTO) {
    return await this.userService.updateById(dto)
  }

  @Post('getDevices')
  @HttpCode(HttpStatus.OK)
  public async getDevices(@Body() dto: UserDeleteDto) {
    return await this.userService.getDevices(dto.id)
  }

  @Post('saveDevice')
  @HttpCode(HttpStatus.OK)
  public async saveDevice(@Body() dto: SaveDeviceDTO) {
    return await this.userService.saveDevice(dto)
  }

  @Post('collectDangerData')
  @HttpCode(HttpStatus.OK)
  public async collectDangerData(@Body() dto: UserDeleteDto) {
    return await this.userService.collectDangerData(dto.id)
  }
}

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
          },
        }),
      }),
  )
  uploadFile(@UploadedFile() file) {
    return {
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      path: file.path,
    };
  }
}