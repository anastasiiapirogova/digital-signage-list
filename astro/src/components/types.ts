export type Plan = {
    name: string
    monthly: number | null
    yearly: number | null
}

export type Pricing = {
    free_trial: boolean
    pricing_available: boolean
    has_freemium?: boolean
    plans?: Plan[]
    tier?: "affordable" | "midRange" | "premium"
}

export type Product = {
    id: string
    name: string
    description: string
    website: string
    headquarters: string
    open_source: boolean
    pricing: Pricing
    year_founded: number
    supported_platforms: string[]
    stats: {
        screens?: {
            total: number | null
            source: string
            date: string
        }
    }
    has_logo: boolean
}