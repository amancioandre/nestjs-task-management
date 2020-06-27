import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_URI || 'db',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'task_management',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
}