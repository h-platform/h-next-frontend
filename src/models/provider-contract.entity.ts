import { Provider } from './provider.entity';
import { TPA } from './tpa.entity';

export class ProviderContract {
    id: number;
    provider: Provider;
    tpa: TPA;
    serviceClass: string;
}
