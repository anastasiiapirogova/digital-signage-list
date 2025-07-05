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
    tier?: "affordable" | "midRange" | "premium" | string
}

export type Product = {
    id: string
    name: string
    description: string
    website: string
    headquarters: string | string[]
    open_source: boolean
    self_signup: boolean
    categories: string[]
    pricing: Pricing
    discontinued?: boolean
    year_founded: number | null
    supported_platforms: string[]
    is_sponsor?: boolean
    stats: {
        screens?: {
            total: number | null
            source: string
            date: string
        }
    }
    has_logo: boolean
}