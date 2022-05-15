import { User } from './user.entity';
import { ContactRole } from './contact-role.entity';
import { Region } from './region.entity';

export class Contact {
    id: number;
    contactNameEn: string;
    contactNameAr: string;
    contactType: 'COMPANY' | 'INDIVIDUAL';
    desc?: string;
    contactRoles: ContactRole[];
    parentContact: Contact;
    childrenContacts: Contact[];
    contactEmail: string;
    contactNo: string;
    contactNo2: string;
    country?: string;
    region: Region;
    city?: string;
    addressLine1: string;
    addressLine2: string;
    tags: string[];
    user: User;
    isArchived: boolean;
    createdBy: User;
    createdAt: Date;
    updatedBy: User;
    updatedAt: Date;
}
