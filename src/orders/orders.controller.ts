import {Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe} from '@nestjs/common';
import {OrdersService} from "./orders.service";
import {CreateOrdersDto} from "./dto/orders.dto";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {OrdersEntity} from "./entity/orders.entity";
import {IncompleteOrderDto} from "./dto/incomplete-order.dto";

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @Get()
    findAll():Promise<OrdersEntity[]>{
        return this.ordersService.findAll()
    }

    @Get('incomplete')
    findIncomplete():Promise<IncompleteOrderDto[]>{
        return this.ordersService.findIncomplete()
    }

    @ApiOperation({ summary: 'Создание заказа' })
    @Post()
    @UsePipes(new ValidationPipe())
    createOrder(@Body() post: CreateOrdersDto): Promise<OrdersEntity> {
        return this.ordersService.create(post)
    }

    @Get(':id')
    findOne(@Param('id') id: number):Promise<OrdersEntity> {
        return this.ordersService.findOne(id);
    }

    @Put(':id')
    updateOrder(@Body() orderObj: OrdersEntity, @Param('id') id: number):Promise<OrdersEntity>{
        return this.ordersService.update(id, orderObj)
    }

    @Delete(':id')
    deleteOrder(@Param('id') id: number){
        return this.ordersService.remove(id)
    }

}
