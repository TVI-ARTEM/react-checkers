import {makeAutoObservable} from "mobx";

export default class ContextStore {
    private _isAuth: boolean;
    private _user: IUser;
    private _room: IRoom;

    constructor() {
        this._isAuth = false
        this._user = {} as IUser;
        this._room = {} as IRoom;
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

    get room(): IRoom {
        return this._room;
    }

    set room(value: IRoom) {
        this._room = value;
    }
}



export interface IUser{
    id: number,
    email: string,
}

export interface IRoom {
    room_id: string,
    room_password: string
}