import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context, ContextType} from "../index";
import {IUser} from "../store/ContextStore";
import {Button, Col, Container, Form, ListGroup, Modal, Navbar, Row, Stack} from "react-bootstrap";
import './Menu.css';
import {useNavigate} from "react-router-dom";
import {
    AUTH_ROUTE,
    COOP_STYLE_COOP_VALUE,
    COOP_STYLE_SOLO_VALUE,
    DIFFICULT_EASY_VALUE, DIFFICULT_PRO_VALUE,
    GAME_MODE_1_KINGS_VALUE,
    GAME_MODE_3_CHECKERS_VALUE, GAME_MODE_3_KINGS_VALUE,
    GAME_MODE_STANDARD_VALUE,
    GAME_ROUTE,
    MENU_ROUTE,
    PC_PLAYERS_0_VALUE,
    PC_PLAYERS_1_VALUE,
    PC_PLAYERS_2_VALUE,
    PC_PLAYERS_3_VALUE
} from "../utils/consts";
import houseImgPath from "./images/logo.png";
import {getWinners} from "../http/winnerApi";
import {createRoom, joinRoom} from "../http/roomApi";
import {logout} from "../http/userApi";


const Menu = observer(() => {
    const {store, socket} = useContext(Context) as ContextType

    const [room_id_join, setRoomIDJoin] = useState('')
    const [room_password_join, setRoomPasswordJoin] = useState('')

    const [room_id, setRoomID] = useState('')
    const [room_password, setRoomPassword] = useState('')

    const [pc_players, setPCPlayers] = useState(PC_PLAYERS_0_VALUE)
    const [multiplayer, setMultiplayer] = useState(COOP_STYLE_SOLO_VALUE)
    const [gameMode, setGameMode] = useState(GAME_MODE_STANDARD_VALUE)
    const [difficult, setDifficult] = useState(DIFFICULT_EASY_VALUE)

    const [show, setShow] = useState(false)
    const [showMessage, setShowMessage] = useState('')

    const [showCreateRoom, setShowCreateRoom] = useState(false)
    const [showRatings, setShowRatings] = useState(false)

    const navigate = useNavigate()

    const [bestPlayer, setBestPlayer] = useState(new Array<{ email: string, count: number }>())

    useEffect(() => {
        if (!store.isAuth) {
            navigate(AUTH_ROUTE)
        }
    }, [])

    useEffect(() => {
        getWinners().then(winners => setBestPlayer(winners as [{ email: string, count: number }]))
    }, [])


    return (
        <>
            <Navbar fixed={'top'} bg={'dark'}>
                <Container fluid>
                    <Navbar.Brand onClick={() => navigate(MENU_ROUTE)} className={'roboto-text-regular'}>
                        <img
                            src={houseImgPath}
                            width="32"
                            height="32"
                            className="d-inline-block align-top"
                            alt={''}/>{' '}Checkers</Navbar.Brand>
                    <div>
                        <Button onClick={() => setShowCreateRoom(true)} variant={'light'}
                                style={{marginRight: "0.5rem"}}>Create Room</Button>
                        <Button onClick={() => setShowRatings(true)} variant={'light'}
                                style={{marginLeft: "0.5rem", marginRight: "0.5rem"}}>Ratings</Button>
                        <Button onClick={async () => {
                            await logout(store.user.email).then(() => {
                                socket.emit('logout', JSON.stringify({email: store.user.email}))
                                store.user = {} as IUser
                                store.isAuth = false
                                navigate(AUTH_ROUTE)
                            }).catch(error => {
                                setShowMessage(error.response.data.message)
                                setShow(true)
                            })
                        }} variant={'danger'}
                                style={{marginLeft: "0.5rem"}}>Logout</Button>
                    </div>

                </Container>
            </Navbar>

            <div className={'image-background d-flex justify-content-center align-items-center'}>
                <Container className='table'>
                    <Row>
                        <Col className='roboto-text-header'>
                            Невские шашки
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{marginInline: "25%"}}>
                            <Form onSubmit={async (event) => {
                                try {
                                    event.preventDefault()
                                    await joinRoom(room_id_join, room_password_join).then(data => {
                                        navigate(GAME_ROUTE)
                                    });
                                } catch (error: any) {
                                    setShowMessage(error.response.data.message)
                                    setShow(true)
                                }
                            }}>
                                <Stack gap={2}>
                                    <label className={'roboto-text-regular'}>
                                        Room ID:
                                    </label>

                                    <input type={'number'} placeholder={'Enter Room ID'}
                                           className={'form-control '}
                                           onChange={(event) => setRoomIDJoin(event.target.value)} required></input>
                                    <label className={'roboto-text-regular'}>
                                        Room Password:
                                    </label>
                                    <input type={'number'} placeholder={'Enter Password'}
                                           className={'form-control '}
                                           onChange={(event) => setRoomPasswordJoin(event.target.value)}
                                           required></input>
                                    <Button variant={'danger'} type={'submit'} className={'align-self-center'}
                                            style={{width: "50%"}}>Join</Button>

                                </Stack>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton style={{color: "red"}}>
                    Incorrect Input
                </Modal.Header>
                <Modal.Body>
                    {showMessage}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShow(false)}>OK</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showCreateRoom} onHide={() => setShowCreateRoom(false)} centered>
                <Modal.Header closeButton>
                    Creating Room
                </Modal.Header>
                <Modal.Body>
                    <Form className={'align-self-center'} onSubmit={async (event) => {
                        try {
                            event.preventDefault()
                            await createRoom(room_id, room_password, pc_players, multiplayer, gameMode, difficult).then(data => {
                                setShowCreateRoom(false)
                                navigate(GAME_ROUTE)
                            })

                        } catch (error: any) {
                            setShowMessage(error.response.data.message)
                            setShow(true)
                        }
                    }}>
                        <Stack gap={2}>
                            <label className={'roboto-text-regular'} style={{color: "black"}}>
                                Room ID:
                            </label>

                            <input type={'number'} placeholder={'Enter Room ID'}
                                   className={'form-control '}
                                   onChange={(event) => setRoomID(event.target.value)} required></input>
                            <label className={'roboto-text-regular'} style={{color: "black"}}>
                                Room Password:
                            </label>
                            <input type={'number'} placeholder={'Enter Password'}
                                   className={'form-control '}
                                   onChange={(event) => setRoomPassword(event.target.value)} required></input>

                            <label className={'roboto-text-regular'} style={{color: "black"}}>
                                PC Players:
                            </label>
                            <select className={'form-select'}
                                    onChange={(event) => setPCPlayers(event.target.value)}>
                                <option value={PC_PLAYERS_0_VALUE}>Only Real Players</option>
                                <option value={PC_PLAYERS_1_VALUE}>1 PC Player</option>
                                <option value={PC_PLAYERS_2_VALUE}>2 PC Players</option>
                                <option value={PC_PLAYERS_3_VALUE}>3 PC Players</option>
                            </select>
                            <label className={'roboto-text-regular'} style={{color: "black"}}>
                                Coop Style:
                            </label>
                            <select className={'form-select'}
                                    onChange={(event) => setMultiplayer(event.target.value)}>
                                <option value={COOP_STYLE_SOLO_VALUE}>Solo</option>
                                <option value={COOP_STYLE_COOP_VALUE}>Co-op</option>
                            </select>
                            <label className={'roboto-text-regular'} style={{color: "black"}}>
                                Game mode:
                            </label>
                            <select className={'form-select'}
                                    onChange={(event) => setGameMode(event.target.value)}>
                                <option value={GAME_MODE_STANDARD_VALUE}>Standard</option>
                                <option value={GAME_MODE_3_CHECKERS_VALUE}>3 Checkers</option>
                                <option value={GAME_MODE_1_KINGS_VALUE}>1 King</option>
                                <option value={GAME_MODE_3_KINGS_VALUE}>3 Kings</option>
                            </select>
                            <label className={'roboto-text-regular'} style={{color: "black"}}>
                                Difficult:
                            </label>
                            <select className={'form-select'}
                                    onChange={(event) => setDifficult(event.target.value)}>
                                <option value={DIFFICULT_EASY_VALUE}>Easy</option>
                                <option value={DIFFICULT_PRO_VALUE}>Pro</option>
                            </select>
                            <Button variant={'danger'} type={'submit'} className={'align-self-center'}
                                    style={{width: "50%"}}>Create Room</Button>

                        </Stack>
                    </Form>
                </Modal.Body>
            </Modal>
            <Modal show={showRatings} onHide={() => setShowRatings(false)} centered>
                <Modal.Header closeButton>
                    Ratings
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {
                            bestPlayer.map((item, idx) =>
                                <ListGroup.Item className={'roboto-text-regular'} style={{color: "black"}}
                                                key={idx}>{idx + 1}. {item.email}: {item.count}</ListGroup.Item>
                            )
                        }
                    </ListGroup>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={async () => {
                        getWinners().then(winners => setBestPlayer(winners as [{ email: string, count: number }]))
                    }}>Refresh</Button>
                    <Button variant="danger" onClick={() => setShowRatings(false)}>OK</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
});

export default Menu;