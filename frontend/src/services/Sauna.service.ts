import {AddSaunaDto, ImageResponse, SaunaDto} from "../models/sauna/add-sauna.dto";
import $api from "../http";
import {AxiosResponse} from "axios";
import {IUser} from "../models/User";
import UpdateSaunaDto from "../models/sauna/update-sauna.dto";

export default class SaunaService {
    static async addSauna(addSaunaDto: AddSaunaDto) {
        return  await $api.post<AddSaunaDto>('http://localhost:4000/sauna', addSaunaDto, {
            headers: {
                Authorization: "Bearer: " + window.localStorage.getItem("token")
            }
        });
    }

    static async fetchSaunas() : Promise<AxiosResponse<SaunaDto[]>> {
        return await $api.get(`http://localhost:4000/sauna`, {
            headers: {
                Authorization: "Bearer: " + window.localStorage.getItem("token")
            }
        });
    }

    static async fetchUserSaunas(login: string) : Promise<AxiosResponse<SaunaDto[]>> {
        return await $api.get(`http://localhost:4000/sauna/userSaunas/${login}`);
    }

    static async loadSaunaImage(files: File[], user: IUser): Promise<AxiosResponse<ImageResponse>> {
        const formData = new FormData();
        files.forEach((file) => formData.append("images", file));
        formData.append("user", JSON.stringify(user));
        return $api.post<ImageResponse>("http://localhost:4000/sauna/loadImages", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    }


    static async deleteSauna(saunaId: string) : Promise<AxiosResponse<void>> {
        return await $api.delete(`http://localhost:4000/sauna/${saunaId}`);
    }

    static async updateSauna(updateSaunaDto: UpdateSaunaDto, saunaId: string): Promise<AxiosResponse<UpdateSaunaDto>> {
        return await $api.put(`http://localhost:4000/sauna/${saunaId}`, updateSaunaDto, {
            headers: {
                Authorization: "Bearer: " + window.localStorage.getItem("token")
            }
        });
    }

    static async getSauna(saunaId: string) : Promise<AxiosResponse<SaunaDto>> {
        return await $api.get<SaunaDto>(`http://localhost:4000/sauna/${saunaId}`);
    }
}