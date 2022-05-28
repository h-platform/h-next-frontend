import { User } from './user.entity';
import { Client } from './client.entity';
import { Insurer } from './insurer.entity';
import { TPA } from './tpa.entity';

export class ClientContract {
    id: number;
    client: Client;
    tpa: TPA;
    insurer: Insurer;
    contractType: 'DIRECT' | 'INSURANCE';
    refNo: String;
    startDate: Date;
    endDate: Date;
    acceptedByTpa: boolean;
}
