import {IOrder} from "../interfaces/order";

export class OrderDto implements IOrder {
    age: string;
    birthday: string;
    cardNumber: string;
    tourId: string;
    userId: string;

    constructor(age, birthday, cardNumber, tourId, userId) {

        this.age = age;
        this.birthday = birthday;
        this.cardNumber = cardNumber;
        this.tourId = tourId;
        this.userId = userId;


    }

}