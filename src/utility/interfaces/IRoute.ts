import React from "react";

export interface IRoute {
    id?: number;
    path: string;
    component?: React.ComponentType | null;
    isProtectedRoute?: boolean;
    permission?: boolean;
    exact: boolean;
}

export interface SignUpInitialValue extends SignInInitialValue {
    full_name: string;
}

export interface SignInInitialValue {
    email: string;
    password: string;
}

export interface ForgotPasswordInitialValue {
    email: string;
}

export interface ResetPasswordInitialValue {
    email: string;
    password: string;
    confirmPassword: string;
    token?: string | undefined | null
}

export interface ResetPasswordWithTokenInitialValue {
    email: string;
    password: string;
    confirmPassword: string;
    token?: string | undefined | null;
}

export interface UserInfoInitialValue {
    email?: string;
    first_name?: string;
    last_name?: string;
    phone_number?: number | null;
    address?: string;
    number?: string;
    city?: string;
    state?: string;
    zip?: string;
    profile_pic?: string;
    cover_pic?: string
    block_no?: string
    user_id?: number
    full_name?: string
}

export interface NotificationStatus {
    company_news?: boolean
    account_activity?: boolean
    meetups?: boolean
}

export interface StockInitialValue {
    id?: number | null | undefined
    name?: string
    current_price?: number
}

export interface StockData {
    stock_name: string;
    current_value: number;
    status: "low" | "high";
    average: string;
    day: string[];
    day_value: number[];
    week: string[];
    week_value: number[];
    month: string[];
    month_value: number[];
    year: number[];
    year_value: number[];
}
