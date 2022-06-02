import { Contact } from './contact.entity';
import { User } from './user.entity';

export class TPA {
    id: number;
    tpaCode: string;
    contact: Contact;
    isActive: boolean;
    createdBy: User;
    createdAt: Date;
    updatedBy: User;
    updatedAt: Date;
}
