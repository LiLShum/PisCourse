import {IUser} from "../models/User";
import {makeObservable, observable} from "mobx";
import AuthService from "../services/AuthService";
import axios, {AxiosResponse} from "axios";
import {AuthResponce} from "../models/Response/AuthResponce";
import EditUserDto from "../models/dto/edit-user.dto";
import UserService from "../services/User.service";
import GrantUserModel from "../models/GrantUserModel";
import {AddSaunaDto, ImageResponse, SaunaDto} from "../models/sauna/add-sauna.dto";
import SaunaService from "../services/Sauna.service";
import UpdateSaunaDto from "../models/sauna/update-sauna.dto";
import BookingDto from "../models/dto/booking.dto";
import BookingService from "../services/BookingService";
import CommentService from "../services/CommentService";
import AddCommentDto from "../models/dto/add-comment.dto";
import {FetchCommentsDto} from "../models/dto/comment.dto";
export default class Store {
    user = {} as IUser;
    isAuth = false;
    saunaId = 0;

    constructor() {
        makeObservable(this, {
            user: observable,
            isAuth: observable,
            saunaId: observable,
        });
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setSaunaId(saunaId: number) {
        this.saunaId = saunaId;
    }

    setUser(user: IUser) {
        this.user = user;
    }
    async login(login: string, password: string) {
        try {
            const response = await AuthService.login    (login, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        }
        catch (e : any) {
            console.log(e.response?.data?.message);
        }
    }

    async register(user: IUser) {
        try {
            const response = await AuthService.register(user);
            console.log(response.data);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        }
        catch (e : any) {
            console.log(e.response?.data?.message);
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            console.log(response);
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        }
        catch (e : any) {
            console.log(e.response?.data?.message);
        }
    }
    async checkAuth() {
        try {
            const response = await axios.get<AuthResponce>('http://localhost:4000/auth/refresh', {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        }
        catch (e : any) {
            console.log(e.response?.data?.message);
        }
    }

    async editProfile(editUserDto : EditUserDto)  {
        const response = await  UserService.editUser(editUserDto);
    }

    async grantRole(grantUserDto: GrantUserModel) {
        const response = await UserService.grantUser(grantUserDto);
    }

    async revokeRole(grantUserDto: GrantUserModel) {
        const response = await UserService.revokeUser(grantUserDto);
    }

    async getUsers() {
       return  await UserService.getUsers();
    }

    async getUserByLogin(login: string) : Promise<AxiosResponse<GrantUserModel>> {
        return UserService.getUserByLogin(login);
    }

    async addSauna(addSaunaDto: AddSaunaDto) {
        return SaunaService.addSauna(addSaunaDto);
    }

    async fetchSaunas() : Promise<AxiosResponse<SaunaDto[]>> {
        return SaunaService.fetchSaunas();
    }

    async fetchUserSaunas(login: string) : Promise<AxiosResponse<SaunaDto[]>> {
        return SaunaService.fetchUserSaunas(login);
    }

    async loadSaunaImage(file: File[], user: IUser) : Promise<AxiosResponse<ImageResponse>> {
        return SaunaService.loadSaunaImage(file, user);
    }

    async deleteSauna(saunaId: string) {
        return SaunaService.deleteSauna(saunaId);
    }

    async updateSauna(updateSaunaDto: UpdateSaunaDto, saunaId: string) {
        return SaunaService.updateSauna(updateSaunaDto, saunaId);
    }

    async getSauna(saunaId: string) : Promise<AxiosResponse<SaunaDto>> {
        return SaunaService.getSauna(saunaId);
    }

    async bookingSauna(bookingDto: BookingDto) {
        return BookingService.bookingSauna(bookingDto);
    }

    async getBookings() {
        return BookingService.getBookings();
    }

    async fetchComments(saunaId: string, limit: number, offset: number) : Promise<AxiosResponse<FetchCommentsDto>> {
        return CommentService.fetchComments(saunaId, limit, offset);
    }

    async addComment(commentDto: AddCommentDto) {
        return CommentService.addComment(commentDto);
    }

    async deleteComment(saunaId: number) {
        return CommentService.deleteComment(saunaId);
    }

    async getUserBookings(userId: string) {
        return BookingService.getUserBookings(userId);
    }

    async deleteBooking(bookingId: string) {
        return BookingService.deleteBooking(bookingId);
    }
}