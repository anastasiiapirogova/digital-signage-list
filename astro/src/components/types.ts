export type Pricing = {
    free_trial: boolean;
}

export type Product = {
    id: string;
    name: string;
    description: string;
    website: string;
    headquarters: string;
    open_source: boolean;
    pricing: Pricing,
    supported_platforms: string[];
    stats: {
        screens?: {
            total: number;
            source: string;
            date: string;
        };
    };
};