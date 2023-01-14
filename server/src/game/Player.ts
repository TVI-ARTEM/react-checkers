import {Colors} from "./Colors";

export default class Player {
    email: string
    color: Colors
    union: string

    constructor(email: string, color: Colors, union: string = '') {
        this.email = email
        this.color = color
        this.union = union
    }
}