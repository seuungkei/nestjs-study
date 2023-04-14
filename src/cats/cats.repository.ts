import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Comments, CommentsSchema } from 'src/comments/comments.schema';
import { Cat } from '../cats/cats.schema';
import { CatRequestDto } from './dto/cats.request.dto';

@Injectable()
export class CatsRepository {
  constructor(
    @InjectModel(Cat.name) private readonly catModel: Model<Cat>,
    @InjectModel(Comments.name) private readonly commentModel: Model<Comments>,
  ) {}

  async findCatByIdWithoutPassword(
    catId: string | Types.ObjectId,
  ): Promise<Cat | null> {
    const cat = await this.catModel.findById(catId).select('-password');
    return cat;
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email });
    return cat;
  }

  async existsByEmail(email: string): Promise<object> {
    const result = await this.catModel.exists({ email });
    return result;
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }

  async findByIdAndUpdateImg(id: string, fileName: string) {
    const cat = await this.catModel.findById(id);

    cat.imgUrl = `http://localhost:3000/media/${fileName}`;

    const newCat = await cat.save();
    return newCat.readOnlyData;
  }

  async findAll() {
    const CommentsModel = mongoose.model('comments', CommentsSchema);
    const result = await this.catModel
      .find()
      .populate('comments', CommentsModel);
    return result;
  }
}



{"movieListResult":{"totCnt":95043,"source":"영화진흥위원회","movieList":[{"movieCd":"20231091","movieNm":"라스트 필름 쇼","movieNmEn":"Last Film Show","prdtYear":"2021","openDt":"","typeNm":"장편","prdtStatNm":"개봉예정","nationAlt":"인도,프랑스,미국","genreAlt":"드라마","repNationNm":"인도","repGenreNm":"드라마","directors":[{"peopleNm":"판 나린"}],"companys":[]},{"movieCd":"20210846","movieNm":"항구의 니쿠코짱!","movieNmEn":"Fortune Favors Lady Nikuko","prdtYear":"2021","openDt":"20230427","typeNm":"장편","prdtStatNm":"개봉예정","nationAlt":"일본","genreAlt":"애니메이션","repNationNm":"일본","repGenreNm":"애니메이션","directors":[{"peopleNm":"와타나베 아유무"}],"companys":[]},{"movieCd":"20228930","movieNm":"엘리멘탈","movieNmEn":"Elemental","prdtYear":"2023","openDt":"","typeNm":"장편","prdtStatNm":"개봉예정","nationAlt":"미국","genreAlt":"애니메이션","repNationNm":"미국","repGenreNm":"애니메이션","directors":[{"peopleNm":"피터 손"}],"companys":[]},{"movieCd":"20112775","movieNm":"자전거 도둑","movieNmEn":"Bicycle Thieves","prdtYear":"1948","openDt":"","typeNm":"장편","prdtStatNm":"개봉예정","nationAlt":"이탈리아","genreAlt":"드라마","repNationNm":"이탈리아","repGenreNm":"드라마","directors":[{"peopleNm":"비토리오 데 시카"}],"companys":[]},{"movieCd":"20228649","movieNm":"오디션","movieNmEn":"Audition","prdtYear":"1999","openDt":"20230419","typeNm":"장편","prdtStatNm":"개봉예정","nationAlt":"일본","genreAlt":"공포(호러)","repNationNm":"일본","repGenreNm":"공포(호러)","directors":[{"peopleNm":"미이케 다카시"}],"companys":[]},{"movieCd":"20228367","movieNm":"곤륜겁지교인루","movieNmEn":"Tears of Shark in Kunlun","prdtYear":"2022","openDt":"","typeNm":"장편","prdtStatNm":"개봉예정","nationAlt":"중국","genreAlt":"액션,판타지,드라마","repNationNm":"중국","repGenreNm":"액션","directors":[],"companys":[]},{"movieCd":"20225512","movieNm":"리턴 투 서울","movieNmEn":"Return to Seoul","prdtYear":"2022","openDt":"20230503","typeNm":"장편","prdtStatNm":"개봉예정","nationAlt":"프랑스","genreAlt":"드라마","repNationNm":"프랑스","repGenreNm":"드라마","directors":[{"peopleNm":"데이비 추"}],"companys":[{"companyCd":"20138515","companyNm":"(주)맑은시네마"}]},{"movieCd":"20230967","movieNm":"보이지 않아","movieNmEn":"Always I am","prdtYear":"2021","openDt":"","typeNm":"장편","prdtStatNm":"개봉예정","nationAlt":"한국","genreAlt":"드라마","repNationNm":"한국","repGenreNm":"드라마","directors":[{"peopleNm":"천세환"}],"companys":[{"companyCd":"20218024","companyNm":"주식회사 아웃런브라더스픽처스"},{"companyCd":"20239962","companyNm":"주식회사 퍼니필름"}]},{"movieCd":"2023C165","movieNm":"토미리스: 전쟁의 여신 리덕스","movieNmEn":"The Legend of Tomiris","prdtYear":"2019","openDt":"","typeNm":"온라인전용","prdtStatNm":"기타","nationAlt":"카자흐스탄","genreAlt":"전쟁,드라마,액션","repNationNm":"카자흐스탄","repGenreNm":"전쟁","directors":[{"peopleNm":"아칸 사타예브"}],"companys":[]},{"movieCd":"20231212","movieNm":"바람개비","movieNmEn":"Windmill","prdtYear":"2023","openDt":"","typeNm":"장편","prdtStatNm":"개봉예정","nationAlt":"한국","genreAlt":"액션","repNationNm":"한국","repGenreNm":"액션","directors":[{"peopleNm":"이상훈"}],"companys":[{"companyCd":"20174081","companyNm":"(주)오예스"}]}]}}