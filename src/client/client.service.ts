import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {TokenEntity} from "./entity/client.entity.token";
import {ClientDto} from "./dto/client.dto";
import {ClientsEntity} from "./entity/client.entity";
import {ClientAuthorizationDto} from "./dto/client.authorization.dto";
import {IncompleteClientDto} from "./dto/incomplete-client.dto";

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(ClientsEntity)
        private readonly clientRepository: Repository<ClientsEntity>,
        @InjectRepository(TokenEntity)
        private readonly tokenRepository: Repository<TokenEntity>,
    ) {}


    async createClient(clientDto: ClientDto): Promise<boolean> {
        const client = await this.clientRepository.findOne({where: {username: clientDto.username}})
        const email = await this.clientRepository.findOne({where: {email: clientDto.email}})
        if (client || email){
            return false
        }
        else{
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(clientDto.password, saltRounds);
            await this.clientRepository.save({ ...clientDto, password: hashedPassword });
            return true;
        }
    }

    async findClient(clientAuthorizationDto: ClientAuthorizationDto): Promise<boolean> {
        const client = await this.clientRepository.findOne({ where: { username: clientAuthorizationDto.username } });
        if (client) {
            const passwordMatch = await bcrypt.compare(clientAuthorizationDto.password, client.password);
            if (passwordMatch) {
                const existingToken = await this.tokenRepository.findOne({ where: { userId: client.id } });
                if (existingToken) {
                    await this.tokenRepository.remove(existingToken);
                }

                const token = jwt.sign({ userId: client.id }, 'secretKey');
                const tokenEntity = new TokenEntity();
                tokenEntity.userId = client.id;
                tokenEntity.username = client.username;
                tokenEntity.token = token;
                tokenEntity.expirationDate = new Date(Date.now() + 60 * 1000);
                await this.tokenRepository.save(tokenEntity);
                return true;
            }
        }
        return false;
    }

    async findAll(): Promise<ClientsEntity[]>{
        return await this.clientRepository.find({
            relations: { orders: true }
        })
    }

    findOne(id: number): Promise<ClientsEntity> {
        return this.clientRepository.findOne({
            where: { id },
            relations: { orders: true },
        });
    }

    async findIncomplete(): Promise<IncompleteClientDto[]> {
        const clients = await this.clientRepository.find();
        return clients.map((client) => {
            const incompleteClient = new IncompleteClientDto();
            incompleteClient.id = client.id;
            incompleteClient.username = client.username;
            incompleteClient.email = client.email;
            return incompleteClient;
        });
    }

    async update(id: number, updatedClient: ClientsEntity) {
        const client = await this.clientRepository.findOne({ where: { id } });
        client.username = updatedClient.username;
        client.password = updatedClient.password;
        client.email = updatedClient.email;
        await this.clientRepository.save(client);
        return client;
    }

    remove(id: number) {
        this.clientRepository.delete({ id });
    }

    async findToken(username: string): Promise<boolean> {
        const tokenEntity = await this.tokenRepository.findOne({ where: { username } });
        if (tokenEntity && tokenEntity.expirationDate > new Date()) {
            return true;
        } else {
            return false;
        }
    }

    async logout(username: string): Promise<boolean>{
        const tokenEntity = await this.tokenRepository.findOne({ where: { username } });
        if (tokenEntity){
            await this.tokenRepository.delete(tokenEntity)
            return true
        }
        return false;
    }
}
