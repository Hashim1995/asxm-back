import { ApiProperty } from '@nestjs/swagger';

export class CreateAboutDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    description?: string;
}


