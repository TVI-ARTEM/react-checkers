import ApiError from "../error/ApiError";
import {Socket} from "socket.io";

module.exports = function (err, socket: Socket) {
    console.log(err)
    if (err instanceof ApiError) {
        socket.emit('error', JSON.stringify({status: err.status, message: err.message}))
    }
    socket.emit('error', JSON.stringify({status: 500, message: "Internal server error!"}))
}