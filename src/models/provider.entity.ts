import { Contact } from 'src/contacts/entities/contact.entity';
import { User } from '../../user/entities/user.entity';

export class Provider {
    id: number;
    providerCode: string;
    contact: Contact;
    isActive: boolean;
    providerType: 'HOSPITAL' | 'PHARMACY' | 'CLINC' | 'LAB';
    createdBy: User;
    createdAt: Date;
    updatedBy: User;
    updatedAt: Date;
}
