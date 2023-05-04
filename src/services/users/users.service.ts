import {Delete, Get, Injectable, Param, Post, Put} from '@nestjs/common';
import {AppService} from "../../app.service";

@Injectable()
export class UsersService {  //создали сервис nest g s <имя папки сервиса> и инжектируем его в app.module.ts в providers


    getAllUsers(): string {
        return 'hi, users'
    }


    getUserByID(param): string { //param - req.объект // здесь деректива (@Param()) не нужна, она в контроллере
        return 'user id is ' + param.id
    }


    sendUsers(): string {
        return 'users post date'
    }


    upDateUsers(): string {
        return 'users put date'
    }


    deleteAllUsers(): string {
        return 'delete all users'
    }


    deleteUser(id: string): string { //param - req.объект
        return 'user delete is ' + id
    }
}
