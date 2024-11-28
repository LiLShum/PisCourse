import EditUserDto from "../models/dto/edit-user.dto";
import $api from "../http";
import EditUserResponse from "../models/Response/EditUserResponce";
import GrantUserDto from "../models/dto/grant-user.dto";
import app from "../app";
import {IUser} from "../models/User";
import {AxiosResponse} from "axios";
import GrantUserModel from "../models/GrantUserModel";

export default class UserService {
    static async editUser(editUserDto: EditUserDto) {
        return $api.put<EditUserResponse>('http://localhost:4000/user', editUserDto);
    }

    static async grantUser(grantUserDto: GrantUserModel) {
        return $api.post('http://localhost:4000/user/grantRoleToUser', grantUserDto);
    }

    static async revokeUser(grantUserDto: GrantUserModel) {
        return $api.post('http://localhost:4000/user/revokeRoleToUser', grantUserDto);
    }

    static async getUsers() {
        return $api.get('http://localhost:4000/user');
    }

    static async getUserByLogin(login: string): Promise<AxiosResponse<GrantUserModel>> {
        return $api.get(`http://localhost:4000/user/getUserByLogin/${login}`);
    }

}