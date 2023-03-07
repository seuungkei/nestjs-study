import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CatRequestDto } from './dto/cats.request.dto';
import { CatsRepository } from './cats.repository';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catsRepository.existsByEmail(email);

    if (isCatExist) {
      throw new HttpException('해당하는 고양이는 이미 존재합니다.', 403);
    }

    const saltRounds = 12;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashPassword,
    });

    return cat.readOnlyData;
  }
}
