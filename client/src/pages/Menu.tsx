import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {UserStoreContextType} from "../store/UserStore";
import {Button, Col, Container, Form, Row, Stack} from "react-bootstrap";
import './Menu.css';
import {useNavigate} from "react-router-dom";
import {GAME_ROUTE} from "../utils/consts";


const Menu = observer(() => {
    const {user} = useContext(Context) as UserStoreContextType


    const [room_id, setRoomID] = useState('')
    const [room_password, setRoomPassword] = useState('')
    const [pc_players, setPCPlayers] = useState('0')
    const [multiplayer, setMultiplayer] = useState('solo')
    const [difficult, setDifficult] = useState('easy')


    const navigate = useNavigate()

    return (
        <div className='image-background'>
            <Container className='table'>
                <Row>
                    <Col className='roboto-text-header'>
                        Невские шашки
                    </Col>
                </Row>
                <Row className={'align-items-center'}>
                    <Col >
                        <Form onSubmit={(event) => {
                            event.preventDefault()
                            console.log(room_id)
                            console.log(room_password)
                            console.log(pc_players)
                            console.log(multiplayer)
                            console.log(difficult)
                            navigate(GAME_ROUTE)
                        }} >
                            <Stack gap={2}>
                                <label className={'roboto-text-regular'}>
                                    Room ID:
                                </label>

                                <input type={'number'} placeholder={'Enter Room ID'}
                                       className={'form-control '}
                                       onChange={(event) => setRoomID(event.target.value)} required></input>
                                <label className={'roboto-text-regular'}>
                                    Room Password:
                                </label>
                                <input type={'number'} placeholder={'Enter Password'}
                                       className={'form-control '}
                                       onChange={(event) => setRoomPassword(event.target.value)} required></input>

                                <label className={'roboto-text-regular'}>
                                    PC Players:
                                </label>
                                <select className={'form-select'}
                                        onChange={(event) => setPCPlayers(event.target.value)}>
                                    <option value="0">Only Real Players</option>
                                    <option value="1">1 PC Player</option>
                                    <option value="2">2 PC Players</option>
                                    <option value="3">3 PC Players</option>
                                </select>
                                <label className={'roboto-text-regular'}>
                                    Coop Style:
                                </label>
                                <select className={'form-select'}
                                        onChange={(event) => setMultiplayer(event.target.value)}>
                                    <option value="solo">Solo</option>
                                    <option value="coop">Co-op</option>
                                </select>
                                <label className={'roboto-text-regular'}>
                                    Game mode:
                                </label>
                                <select className={'form-select'}
                                        onChange={(event) => setDifficult(event.target.value)}>
                                    <option value="easy">Easy</option>
                                    <option value="pro">Pro</option>
                                </select>

                                <Button variant={'danger'} type={'submit'}>Create Room</Button>
                            </Stack>

                        </Form>
                    </Col>
                    <Col xs={2}></Col>
                    <Col>
                        <Form onSubmit={(event) => {
                            event.preventDefault()
                            console.log(room_id)
                            console.log(room_password)
                            console.log(pc_players)
                            console.log(multiplayer)
                            console.log(difficult)
                            navigate(GAME_ROUTE)
                        }} >
                            <Stack gap={2}>
                                <label className={'roboto-text-regular'}>
                                    Room ID:
                                </label>

                                <input type={'number'} placeholder={'Enter Room ID'}
                                       className={'form-control '}
                                       onChange={(event) => setRoomID(event.target.value)} required></input>
                                <label className={'roboto-text-regular'}>
                                    Room Password:
                                </label>
                                <input type={'number'} placeholder={'Enter Password'}
                                       className={'form-control '}
                                       onChange={(event) => setRoomPassword(event.target.value)} required></input>

                                <Button variant={'danger'} type={'submit'}>Join</Button>
                            </Stack>

                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
});

export default Menu;