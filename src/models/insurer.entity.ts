import { Contact } from './contact.entity';
import { User } from './user.entity';

export class Insurer {
    id: number;
    insurerCode: string;
    contact: Contact;
    isActive: boolean;
    createdBy: User;
    createdAt: Date;
    updatedBy: User;
    updatedAt: Date;
}
