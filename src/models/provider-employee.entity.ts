import { User } from './user.entity';
import { Provider } from './provider.entity';

export class ProviderEmployee {
    id: number;
    provider: Provider;
    user: User;
    permissions: string[]
    isActive: boolean;
    createdBy: User;
    createdAt: Date;
    updatedBy: User;
    updatedAt: Date;
}
