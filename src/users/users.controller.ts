import {Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {UsersService} from "../services/users/users.service";

@Controller('users') // создали контролер в терминале: nest g co <имя контроллера>. http://localhost:3000/users
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get() // получаем всех пользоввателей
    getAllUsers(): string { // при гет-запросе вызывается этот метод, который вызывает метод из UsersService
       return this.usersService.getAllUsers()
    }

    @Get(':id')// получаем конкретного пользоввателя. Ожидает с помощью параметра ID. http://localhost:3000/users/33
    getUserByID(@Param() param): string { //param - req.объект // все параментры, с которыми мы будем работать при запросах, помещаем в контроллер(сюда)
        return this.usersService.getUserByID(param)
    }

    @Post()
    sendUsers(): string {
        return this.usersService.sendUsers()
    }

    @Put()
    upDateUsers(): string {
        return this.usersService.upDateUsers()
    }

    @Delete() //удалит всех пользователей. http://localhost:3000/users/33
    deleteAllUsers(): string {
        return this.usersService.deleteAllUsers()

    }

    @Delete(':id')// удаляем конкретного пользователя по ID. http://localhost:3000/users/33
    deleteUser(@Param('id') id): string { //param - req.объект
        return this.usersService.deleteUser(id)
    }
}
