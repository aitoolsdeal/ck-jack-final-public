import { User } from "@/types";

interface TableCommon {
    id: number;
    created_at: string;
    updated_at: string;
}

export interface UserExtended extends User {
    pricing_plan_id: number | string | null;
    pm_type: string | null;
    pm_last_four: string | null;
    trial_ends_at: string | null;
}
