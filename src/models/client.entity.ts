import { Contact } from './contact.entity';
import { User } from './user.entity';

export class Client {
    id: number;
    clientCode: string;
    contact: Contact;    
    isActive: boolean;
    createdBy: User;
    createdAt: Date;
    updatedBy: User;
    updatedAt: Date;
}
