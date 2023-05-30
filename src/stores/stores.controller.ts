import {Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe} from '@nestjs/common';
import {StoresService} from "./stores.service";
import {CreateStoresDto} from "./dto/stores.dto";
import {StoresEntity} from "./entity/stores.entity";
import {IncompleteStoreDto} from "./dto/incomplete-store.dto";
import {ApiOperation, ApiTags} from "@nestjs/swagger";

@ApiTags("Stores")
@Controller('stores')
export class StoresController {
    constructor(private storesService: StoresService) {}

    @Get()
    findAll():Promise<StoresEntity[]>{
        return this.storesService.findAll()
    }

    @ApiOperation({ summary: 'Создание магазина' })
    @Post()
    @UsePipes(new ValidationPipe())
    createStores(@Body() post: CreateStoresDto): Promise<StoresEntity> {
        return this.storesService.create(post)
    }

    @Get('incomplete')
    findIncomplete(): Promise<IncompleteStoreDto[]>{
        return this.storesService.findIncomplete();
    }

    @Get(':id')
    findOne(@Param('id') id: number):Promise<StoresEntity> {
        return this.storesService.findOne(id);
    }

    @Put(':id')
    updateStore(@Body() productObj: StoresEntity, @Param('id') id: number):Promise<StoresEntity>{
        return this.storesService.update(id, productObj)
    }

    @Delete(':id')
    deleteProduct(@Param('id') id: number){
        return this.storesService.remove(id)
    }
}
