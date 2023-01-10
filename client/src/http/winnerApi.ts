import {$authHost} from "./index";

export const updateWinner = async (email: string) => {
    console.log('update-winners')
    await $authHost.post('api/winner/update-winner', {email: email})
    return
}

export const getWinners = async () => {
    console.log('get-winners')
    const {data} = await $authHost.get('api/winner/get-winners')
    return data.winners
}