import { Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'generated/prisma/client';
import { DATABASE_CONNECTION_STRING } from 'src/lib/constants';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        const adapter = new PrismaPg({ connectionString: DATABASE_CONNECTION_STRING })
        super({ adapter })
    }
}
