import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import { ClientModule } from './client/client.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { StoresModule } from './stores/stores.module';
@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username:process.env.POSTGRES_USER,
      password:process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ClientModule,
    OrdersModule,
    ProductsModule,
    StoresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}


