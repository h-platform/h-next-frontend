export type ClientContractMember = {
    id: number;
    fullName: string;
    clientNameAr: string;
    serviceClass: string;
    jobTitle: string;
    relation: string;
    memberNo: string;
    gender: 'MALE' | 'FEMALE';
    birthDate: Date;
    status: 'ACTIVE' | 'EXPIRED' | 'CANCELED';
    contract: {
        client: any;
    }
}