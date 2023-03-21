import { PickType } from '@nestjs/swagger';
import { Comments } from '../comments.schema';

export class commentsCreateDto extends PickType(Comments, [
  'author',
  'content',
] as const) {}
