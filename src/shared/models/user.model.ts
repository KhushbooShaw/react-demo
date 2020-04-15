import { Moment } from 'moment';

export interface IActivityPeriods {
    start_time?: Moment | string;
    end_time?: Moment | string;
}

export interface IUser {
    id?: string;
    key?: string;
    real_name?: string;
	tz?: string;
	activity_periods?: IActivityPeriods[];
}

export interface IUserResponse {
    ok: boolean;
    members: IUser[]
}