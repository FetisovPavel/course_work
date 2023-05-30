import {Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe} from '@nestjs/common';
import {ClientService} from "./client.service";
import {ClientDto} from "./dto/client.dto";
import {ClientAuthorizationDto} from "./dto/client.authorization.dto";
import {ClientsEntity} from "./entity/client.entity";
import {IncompleteClientDto} from "./dto/incomplete-client.dto";

@Controller('clients')
export class ClientController {
    constructor(private clientService: ClientService) {}

    @Get()
    findAll():Promise<ClientsEntity[]>{
        return this.clientService.findAll()
    }

    @Get('incomplete')
    findIncomplete():Promise<IncompleteClientDto[]>{
        return this.clientService.findIncomplete()
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<ClientsEntity> {
        return this.clientService.findOne(id);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async register(@Body() createClientDto: ClientDto): Promise<boolean> {
        return await this.clientService.createClient(createClientDto);
    }

    @Post('find')
    @UsePipes(new ValidationPipe())
    async authorization(@Body() clientAuthorizationDto: ClientAuthorizationDto): Promise<boolean>{
        return await this.clientService.findClient(clientAuthorizationDto)
    }

    @Post('token')
    async token(@Body() body: { username: string }): Promise<boolean>{
        const { username: requestBodyUsername } = body;
        return await this.clientService.findToken(requestBodyUsername);
    }

    @Post('logout')
    async logout(@Body() body: { username: string }): Promise<boolean> {
        const { username } = body;
        return await this.clientService.logout(username)
    }

    @Put(':id')
    update(@Body() clientObj: ClientsEntity, @Param('id') id: number):Promise<ClientsEntity>{
        return this.clientService.update(id, clientObj)
    }

    @Delete(':id')
    delete(@Param('id') id: number){
        return this.clientService.remove(id)
    }

}
