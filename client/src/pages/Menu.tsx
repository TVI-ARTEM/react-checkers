import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {IUser, UserStoreContextType} from "../store/UserStore";
import {Button, Col, Container, Form, ListGroup, Modal, Navbar, Row, Stack} from "react-bootstrap";
import './Menu.css';
import {useNavigate} from "react-router-dom";
import {AUTH_ROUTE, GAME_ROUTE, MENU_ROUTE} from "../utils/consts";
import houseImgPath from "./images/logo.png";
import {getWinners} from "../http/winnerApi";


const Menu = observer(() => {
    const {user} = useContext(Context) as UserStoreContextType

    const [room_id_join, setRoomIDJoin] = useState('')
    const [room_password_join, setRoomPasswordJoin] = useState('')

    const [room_id, setRoomID] = useState('')
    const [room_password, setRoomPassword] = useState('')

    const [pc_players, setPCPlayers] = useState('0')
    const [multiplayer, setMultiplayer] = useState('solo')
    const [gameMode, setGameMode] = useState('standard')
    const [difficult, setDifficult] = useState('easy')

    const [show, setShow] = useState(false)
    const [showMessage, setShowMessage] = useState('')

    const [showCreateRoom, setShowCreateRoom] = useState(false)
    const [showRatings, setShowRatings] = useState(false)

    const navigate = useNavigate()

    const [bestPlayer, setBestPlayer] = useState(new Array<{ email: string, count: number }>())

    useEffect(() => {
        if (!user.isAuth) {
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
                        <Button onClick={() => {
                            user.user = {} as IUser
                            user.isAuth = false
                            localStorage.setItem('token', '')
                            navigate(AUTH_ROUTE)
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
                            <Form onSubmit={(event) => {
                                event.preventDefault()
                                if (room_id_join.length !== 8) {
                                    setShowMessage('Length of Room id must be equal 8')
                                    setShow(true)
                                    return;
                                }
                                console.log(room_id_join)
                                console.log(room_password_join)

                                navigate(GAME_ROUTE)
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
                    <Form className={'align-self-center'} onSubmit={(event) => {
                        event.preventDefault()
                        if (room_id.length !== 8) {
                            setShowMessage('Length of Room id must be equal 8')
                            setShow(true)
                            return;
                        }
                        console.log(room_id)
                        console.log(room_password)
                        console.log(pc_players)
                        console.log(multiplayer)
                        console.log(gameMode)
                        console.log(difficult)
                        setShowCreateRoom(false)
                        navigate(GAME_ROUTE)
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
                                <option value="0">Only Real Players</option>
                                <option value="1">1 PC Player</option>
                                <option value="2">2 PC Players</option>
                                <option value="3">3 PC Players</option>
                            </select>
                            <label className={'roboto-text-regular'} style={{color: "black"}}>
                                Coop Style:
                            </label>
                            <select className={'form-select'}
                                    onChange={(event) => setMultiplayer(event.target.value)}>
                                <option value="solo">Solo</option>
                                <option value="coop">Co-op</option>
                            </select>
                            <label className={'roboto-text-regular'} style={{color: "black"}}>
                                Game mode:
                            </label>
                            <select className={'form-select'}
                                    onChange={(event) => setGameMode(event.target.value)}>
                                <option value="standard">Standard</option>
                                <option value="3_checkers">3 Checkers</option>
                                <option value="1_kings">1 King</option>
                                <option value="2_kings">2 Kings</option>
                                <option value="3_kings">3 Kings</option>
                            </select>
                            <label className={'roboto-text-regular'} style={{color: "black"}}>
                                Difficult:
                            </label>
                            <select className={'form-select'}
                                    onChange={(event) => setDifficult(event.target.value)}>
                                <option value="easy">Easy</option>
                                <option value="pro">Pro</option>
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