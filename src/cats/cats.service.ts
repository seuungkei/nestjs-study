import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CatRequestDto } from './dto/cats.request.dto';
import { CatsRepository } from './cats.repository';
import { Cat } from './cast.schema';

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

  async uploadImg(cat: Cat, images: Express.Multer.File[]) {
    const fileName = `cats/${images[0].filename}`;

    const newCat = await this.catsRepository.findByIdAndUpdateImg(
      cat.id,
      fileName,
    );

    console.log(newCat);
    return newCat;
  }
}
