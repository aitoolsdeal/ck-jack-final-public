interface TableCommon {
    id: string;
    created_at: string;
    updated_at: string;
}

interface PricingPlan extends TableCommon {
    active: boolean;
    type: 'free' | 'paid';
    title: string | null;
    description: string | null;
    stripe_product_id: string | null;
    stripe_product_price_id: string | null;
    pricing_feature_id: string | null;
    pricing_features: PricingPlanFeature | null;
    price: any;
    product: any;
}

interface PricingPlanFeature extends TableCommon {
    biolinks: number | null;
    biolink_blocks: number;
    shortlinks: number | null;
    projects: number | null;
    qrcodes: number | null;
    themes: 'BASIC' | 'STANDARD' | 'PREMIUM';
    custom_theme: boolean;
    support: number;
    pricing_plan_id: string | number;
}
