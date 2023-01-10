import {makeAutoObservable} from "mobx";

export default class UserStore {
    private _isAuth: boolean;
    private _user: IUser;

    constructor() {
        this._isAuth = false
        this._user = {} as IUser;
        makeAutoObservable(this)
    }

    get user(): IUser {
        return this._user;
    }

    set user(value: IUser) {
        this._user = value;
    }

    get isAuth(): boolean {
        return this._isAuth;
    }

    set isAuth(value: boolean) {
        this._isAuth = value;
    }
}

export type UserStoreContextType = {
    user: UserStore
}

export interface IUser{
    id: number,
    email: string,
}