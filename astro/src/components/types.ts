export type Product = {
    id: string;
    name: string;
    description: string;
    website: string;
    headquarters: string;
    stats: {
        screens?: {
            total: number;
            source: string;
            date: string;
        };
    };
};