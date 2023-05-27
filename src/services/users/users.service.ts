import {Delete, Get, Injectable, Param, Post, Put} from '@nestjs/common';
import {AppService} from "../../app.service";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "../../shemas/user";
import {use} from "passport";
import {UserDto} from "../../dto/user-dto";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UsersService {  //создали сервис nest g s <имя папки сервиса> и инжектируем его в app.module.ts в providers

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private jwtService: JwtService) {
    }

    async getAllUsers(): Promise<User[]> {
        return this.userModel.find()
    }


    async getUserByID(id): Promise<User> { //param - req.объект // здесь деректива (@Param()) не нужна, она в контроллере
        return this.userModel.findById(id)
    }


    async sendUser(data): Promise<User> {
        const userData = new this.userModel(data) //создаем новую запись
        return userData.save()
    }


    async upDateUsers(id: string, body): Promise<User> {
        return this.userModel.findByIdAndUpdate(id, body)
    }


    async deleteAllUsers(): Promise<User> {
        return this.userModel.findOneAndRemove()
    }


    async deleteUser(id: string): Promise<User> { //param - req.объект
        return this.userModel.findByIdAndRemove(id)
    }

    async checkAuthUser(login: string, psw: string): Promise<User[]> {
        const userArr = await this.userModel.find({login: login, psw: psw})
        return userArr.length === 0 ? null: userArr
    }

    async checkRegUser(login: string): Promise<User[]> {
        return this.userModel.find({login: login});
    }

    async login(user: UserDto) {
        const payload = {login: user.login, psw: user.psw}
        const userFromDb = await this.userModel.find({login: user.login})
        return {
            id: userFromDb[0]._id,
            access_token: this.jwtService.sign(payload)
        }
    }


}
