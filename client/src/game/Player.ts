import {Colors} from "./Colors";

export default class Player {
    email: string
    color: Colors

    constructor(email: string, color: Colors) {
        this.email = email
        this.color = color
    }
}