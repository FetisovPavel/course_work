import {Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe} from '@nestjs/common';
import {ProductsService} from "./products.service";
import {CreateProductsDto} from "./dto/products.dto";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {ProductsEntity} from "./entity/products.entity";
import {IncompleteProductDto} from "./dto/incomplete-product.dto";

@ApiTags('Products')
@Controller('products')
export class ProductsController {

    constructor(private productService: ProductsService) {}

    @Get()
    findAll():Promise<ProductsEntity[]>{
        return this.productService.findAll()
    }

    @Get('incomplete')
    findIncomplete():Promise<IncompleteProductDto[]>{
        return this.productService.findIncomplete()
    }

    @Get(':name')
    findOne(@Param('name') name: string):Promise<ProductsEntity> {
        return this.productService.findOne(name);
    }

    @ApiOperation({ summary: 'Создание товара' })
    @Post()
    @UsePipes(new ValidationPipe())
    createProduct(@Body() post: CreateProductsDto): Promise<ProductsEntity> {
        return this.productService.create(post)
    }

    @Put(':id')
    updateProduct(@Body() productObj: ProductsEntity, @Param('id') id: number):Promise<ProductsEntity>{
        return this.productService.update(id, productObj)
    }

    @Delete(':id')
    deleteProduct(@Param('id') id: number){
        return this.productService.remove(id)
    }

}
