import { User } from './user.entity';
import { ClientContractMember } from './client-contract-member.entity';
import { ClientContract } from './client-contract.entity';
import { Client } from './client.entity';
import { ClientContract } from './provider-contract.entity';
import { Provider } from './provider.entity';
import { TPA } from './tpa.entity';

export class Claim {
    id: number;
    visitDate: Date;
    providerContract: ClientContract;
    member: ClientContractMember;
    status: 'NEW' | 'PRINTED' | 'SENT' | 'RECEIVED';
    doctorName: string;
    department: string;
    createdBy: User;
    createdAt: Date;
    updatedBy: User;
    updatedAt: Date;
}
