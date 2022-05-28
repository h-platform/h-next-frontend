import { ClientContract } from './client-contract.entity';

export class ClientContractMember {
    id: number;
    contract: ClientContract;
    fullName: string;
    contactNo: string;
    serviceClass: string;
    benefit: string;
    jobTitle: string;
    relation: string;
    memberNo: string;
    idType: string;
    idNumber: string;
    gender: 'MALE' | 'FEMALE';
    birthDate: Date;
    startDate: Date;
    endDate: Date;
    status: 'ACTIVE' | 'EXPIRED' | 'CANCELED';
}
