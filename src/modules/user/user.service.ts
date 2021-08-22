import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import { UserModel } from '../db/entities/user.entity';
import { Errors } from '../../error/errors';
import { hash } from 'bcrypt';
import { ConfigurationService } from '../config/configuration.service';
import { setApiKey, send } from '@sendgrid/mail';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel) private userRepository: Repository<UserModel>,
    private readonly configService: ConfigurationService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const hashedPassword = await hash(
      createUserDto.password,
      this.configService.getConfig().config.PASSWORD_SALT,
    );
    const foundUser = await this.userRepository.findOne({
      email: createUserDto.email,
    });
    if (foundUser) {
      Errors.USER_EXISTS.throw();
    }
    const user = {
      ...createUserDto,
      password: hashedPassword,
      validationToken: uuidv4(),
    };
    const createdUser = await this.userRepository.save(user);
    const config = this.configService.getConfig();
    setApiKey(config.email.SENDGRID_API_KEY);
    await send({
      from: 'archilivardidze@gmail.com',
      templateId: config.email.SENDGRID_TEMPLATE_ID,
      dynamicTemplateData: {
        Link: `http://localhost:3000/confirm/${createdUser.validationToken}`,
      },
      to: user.email,
    });
    return createdUser;
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({
      email: email,
      isVerified: true,
    });
  }

  async confirmUser(token: string) {
    const foundUser = await this.userRepository.findOne({
      validationToken: token,
    });
    if (!foundUser) {
      Errors.ENTITY_NOT_FOUND.throw();
    }
    foundUser.isVerified = true;
    foundUser.validationToken = null;
    return await this.userRepository.save(foundUser);
  }
  // async validateUser(userData: ValidateUserDto){
  //   const filter = {validationToken: userData.validationToken, pin: userData.pin};
  //   const update = {isVerified: true, validationToken: '', pin: -1}
  //   const resp = await this.userRepository.findOneAndUpdate(filter, update, {
  //     new: true
  //   })
  //   if(resp){
  //     return {
  //       success: true,
  //       user: resp
  //     }
  //   }
  //   else{
  //     throw new HttpException("INVALID PARAMETERS", 422)
  //   }
  // }
  // async findOneByEmail(email: string){
  //   return this.userModel.findOne({email: email, isVerified: true}).select("password").exec();
  // }
  // async findOneById(id: string){
  //   const response = await this.userModel.findOne({id: id}).exec();
  //   return response;
  // }
  // async findAll(): Promise<User[]> {
  //   const response = await this.userModel.find()
  //   return response;
  // }
}
