import {makeAutoObservable} from "mobx";

export default class UserStore {
    private _isAuth: boolean;
    private _user: {};

    constructor() {
        this._isAuth = false
        this._user = {}
        makeAutoObservable(this)
    }

    get user(): {} {
        return this._user;
    }

    set user(value: {}) {
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