import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import { AboutService } from './about.service';
import { About } from './entities/about.entity';
// import { ICommonResponse } from 'src/common/types';
// import { ApiQuery } from '@nestjs/swagger';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';
import { ApiTags } from '@nestjs/swagger';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import { Public } from 'src/decorators/public.decorator';
// import { IAboutBase } from './IAboutBase';


@ApiTags('About')
@Controller('about')
export class AboutController {
    constructor(private readonly aboutService: AboutService) { }

    @Post()
    create(@Body() createAboutDto: CreateAboutDto): Promise<About> {
        return this.aboutService.create(createAboutDto);
    }

    @Get()
    findAll(

    ): Promise<About[]> {
        return this.aboutService.findAll();
    }


    @Get(':id')
    findOne(@Param('id') id: number): Promise<About> {
        return this.aboutService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateAboutDto: UpdateAboutDto): Promise<About> {
        return this.aboutService.update(id, updateAboutDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.aboutService.remove(id);
    }
}
