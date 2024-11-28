import {AxiosResponse} from 'axios'
import {AuthResponce} from "../models/Response/AuthResponce";
import $api from "../http";
import {IUser} from "../models/User";
export default class AuthService {
    static async login(login: string, password: string) : Promise<AxiosResponse<AuthResponce>> {
        console.log({login, password});
        return $api.post<AuthResponce>('http://localhost:4000/auth/signIn', {login, password});
    }
    static async register(user: IUser) : Promise<AxiosResponse<AuthResponce>> {
        return $api.post<AuthResponce>('http://localhost:4000/auth/register', user);
    }
    static async logout() : Promise<AxiosResponse<void>> {
        return $api.get('http://localhost:4000/auth/logout');
    }

}