export interface CircuitBreaker {
    id?: string;
    owner_email: string;
    policy_json: string;
    state: string;
    date_created: string;
    time_created: string;
    date_changed: string;
    time_changed: string;
}