import {$authHost, cookie} from "./index";

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

    const room = JSON.parse(data.room) as { room_id: string; room_password: string; }
    cookie.set('room_id', room.room_id)
    cookie.set('room_password', room.room_password)
}

export const joinRoom = async (id: string, password: string) => {
    console.log('joinRoom')
    const {data} = await $authHost.post('api/room/join', {id: id, password: password})
    const room = JSON.parse(data.room) as { room_id: string; room_password: string; }
    cookie.set('room_id', room.room_id)
    cookie.set('room_password', room.room_password)
}