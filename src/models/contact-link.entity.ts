import { Contact } from './contact.entity';

export class ContactLink {
    id: number;
    relation: string;
    from: Contact;
    to: Contact;
}
