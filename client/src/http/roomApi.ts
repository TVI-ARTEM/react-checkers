import {$authHost} from "./index";
import {IRoom} from "../store/ContextStore";

export const createRoom = async (id: string, password: string, pc_players: string, coop_style: string, game_mode: string, difficult: string) => {
    console.log('createRoom')
    const {data} = await $authHost.post('api/room/create', {
        id: id,
        password: password,
        pc_players: pc_players,
        coop_style: coop_style,
        game_mode: game_mode,
        difficult: difficult
    })

    return JSON.parse(data.room) as IRoom
}

export const joinRoom = async (id: string, password: string) => {
    console.log('joinRoom')
    const {data} = await $authHost.post('api/room/join', {id: id, password: password})
    return JSON.parse(data.room) as IRoom
}