import { makeAutoObservable } from "mobx";
import userData from './api/apiTest.json'
export interface UserType {
    id: number,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    age: number,
    isAdmin: string
}

class Store {
    users: UserType[] = userData;

    constructor(){
        makeAutoObservable(this)
    }

    addUser(newUser: UserType): void {
        this.users.push(newUser);
    }

    removeUser(userId: number): void {
        this.users = this.users.filter(user => user.id !== userId);
    }

    updateUser(updatedUser: UserType): void {
        this.users = this.users.map(user => {
            if (user.id === updatedUser.id) {
                return updatedUser;
            }
            return user;
        });
    }
}

const store = new Store();
export default store;
