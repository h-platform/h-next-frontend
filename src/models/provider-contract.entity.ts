import { Provider } from './provider.entity';
import { TPA } from './tpa.entity';

export class ClientContract {
    id: number;
    provider: Provider;
    tpa: TPA;
    serviceClasses: string[];
    acceptedByTpa: boolean;
    acceptedByProvider: boolean;
}
