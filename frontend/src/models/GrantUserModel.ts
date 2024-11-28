import {IUser} from "./User";

export default interface GrantUserModel extends IUser {
    userId: string;
}