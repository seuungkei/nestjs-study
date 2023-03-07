import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cast.schema';

export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '1234343',
    description: 'id',
  })
  id: string;
}
