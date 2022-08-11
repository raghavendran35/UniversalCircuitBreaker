// id is not explicit
export interface CircuitBreakerPolicy {
    id?: string;
    type: string;
    time_window_millis: number;
    trailing_requests_to_break: number;
    time_broken_millis: number;
    time_to_close_millis: number;
    trailing_requests_to_open: number;
    //iam role:
    aws_access_key: string;
    aws_secret_key: string;
    //client token: https://docs.datadoghq.com/account_management/api-app-keys/
    datadog_client_token: string;
}