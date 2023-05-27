import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards} from "@nestjs/common";
import {UsersService} from "../../services/users/users.service";
import { User } from "../../shemas/user";
import {UserDto} from "../../dto/user-dto";
import {AuthGuard} from "@nestjs/passport";
import {JwtAuthGuard} from "../../services/authentication/jwt-auth.guard/jwt-auth.guard.service";

@Controller('users') // создали контролер в терминале: nest g co <имя контроллера>. http://localhost:3000/users
export class UsersController {

    constructor(private userService: UsersService) {}

  @Get() // получаем всех пользоввателей

  getAllUsers(): Promise<User[]> {
    // при гет-запросе вызывается этот метод, который вызывает метод из UsersService
       return this.userService.getAllUsers()
    }

    @Get(':id')// получаем конкретного пользоввателя. Ожидает с помощью параметра ID. http://localhost:3000/users/33
    getUserByID(@Param('id') id): Promise<User> { //param - req.объект // все параментры, с которыми мы будем работать при запросах, помещаем в контроллер(сюда)
        return this.userService.getUserByID(id)
    }

    // @UseGuards(JwtAuthGuard)
    @Post()
    sendUsers(@Body() data: UserDto): Promise<User> {
        return this.userService.checkRegUser(data.login).then((queryRes) => {
            console.log('data reg', queryRes)
            if (queryRes.length === 0) {
                return this.userService.sendUser(data);
            } else {
                console.log('err - user is exists')
                throw new HttpException({
                    status: HttpStatus.CONFLICT,
                    errorText: 'Пользователь уже зарегистрирован'
                }, HttpStatus.CONFLICT)
            }
        });
    }

    @UseGuards(AuthGuard('local'))
    @Post(":login")
    authUser(@Body() data: UserDto, @Param('login') login): any  {

        return this.userService.login(data)

        // return this.userService.checkAuthUser(data.login, data.psw).then((queryRes) => {
        //     if (queryRes.length !== 0) {
        //         return Promise.resolve(true);
        //     } else {
        //         console.log('err - user is exists')
        //         throw new HttpException({
        //             status: HttpStatus.CONFLICT,
        //             errorText: 'Пользователь не найден в базе'
        //         }, HttpStatus.CONFLICT)
        //     }
        // });

    }

    @Put(':id')
    upDateUsers(@Param('id')id, @Body() data): Promise<User> {
        return this.userService.upDateUsers(id, data)
    }

    @Delete() //удалит всех пользователей. http://localhost:3000/users/33
    deleteAllUsers(): Promise<User> {
        return this.userService.deleteAllUsers()

    }

    @Delete(':id')// удаляем конкретного пользователя по ID. http://localhost:3000/users/33
    deleteUser(@Param('id') id): Promise<User> { //param - req.объект
        return this.userService.deleteUser(id)
    }
}
