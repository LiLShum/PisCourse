import {IUser} from "../User";

export interface AuthResponce {
    accessToken: string;
    user: IUser;
}