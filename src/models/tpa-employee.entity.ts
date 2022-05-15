import { User } from './user.entity';
import { Provider } from './provider.entity';
import { TPA } from './tpa.entity';

export class TPAEmployee {
    id: number;
    tpa: TPA;
    user: User;
    permissions: string[]
    isActive: boolean;
    createdBy: User;
    createdAt: Date;
    updatedBy: User;
    updatedAt: Date;
}
