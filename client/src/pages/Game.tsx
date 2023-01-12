import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import './Game.css';
import {Button, Container, Modal, Navbar, Stack} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {AUTH_ROUTE, MENU_ROUTE} from "../utils/consts";
import houseImgPath from './images/logo.png'
import {Context, ContextType} from "../index";
import IRoom from "../game/room/Room";
import {cookie} from "../http";
import jsonToClass from "../utils/jsonToClass";




require("json-circular-stringify");

const Game = observer(() => {
    const {store, socket} = useContext(Context) as ContextType
    const navigate = useNavigate()
    const [modalShow, setModalShow] = useState(false)
    const [room, setRoom] = useState<IRoom | null>(null)

    useEffect(() => {
        if (!store.isAuth) {
            navigate(AUTH_ROUTE)
        }
        socket.emit('get-game', JSON.stringify({id: cookie.get('room_id'), password: cookie.get('room_password')}))

        socket.on('send-game', (message) => {
            console.log('SEND-GAME');
            console.log(message);
            const roomJson: IRoom = jsonToClass(message)
            console.log(roomJson)

            setRoom(roomJson)

        });

        socket.on('stop-game', () => {
            console.log('STOP-GAME');
            navigate(MENU_ROUTE);
        });


        return () => {
            socket.off('send-game')
            socket.off('stop-game')
        }
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
                    <Button onClick={() => setModalShow(true)} variant={'light'}>Menu</Button>

                </Container>
            </Navbar>
            <Container
                className={'d-flex justify-content-center align-items-center'}
                style={{height: window.innerHeight}}
            >
                <div className={'board'}>
                    {
                        room !== null && ((room as IRoom).board.cells).map((row, idx) =>
                            <React.Fragment key={idx}>
                                {
                                    row.map((col, idx) =>
                                        <div key={idx} className={'diamond align-items-center'}>
                                            {
                                                col && col.figure &&
                                                <div key={idx} className={'checker'} style={{
                                                    backgroundImage: `url(${col.figure.logo})`
                                                }}></div>
                                            }

                                        </div>
                                    )
                                }
                            </React.Fragment>
                        )
                    }
                </div>
            </Container>

            <Modal show={modalShow} onHide={() => setModalShow(false)} aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title className={'roboto-text-regular'} style={{color: 'black'}}>Menu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stack gap={2}>
                        <Button variant={'primary'} className={'align-self-center'} style={{width: "50%"}}
                                onClick={() => setModalShow(false)}>Return</Button>
                        <Button variant={'secondary'} className={'align-self-center'} style={{width: "50%"}}
                                onClick={() => {
                                    socket.emit('get-game', JSON.stringify({
                                        id: cookie.get('room_id'),
                                        password: cookie.get('room_password')
                                    }))
                                    setModalShow(false)
                                }}>Refresh</Button>
                        <Button variant={'danger'} className={'align-self-center'} style={{width: "50%"}} onClick={
                            () => {
                                socket.emit('leave-room', JSON.stringify({
                                    email: store.user.email,
                                    id: cookie.get('room_id'),
                                    password: cookie.get('room_password')
                                }))

                                cookie.set('room_id', "")
                                cookie.set('room_password', "")
                                navigate(MENU_ROUTE)
                            }}>Exit</Button>

                    </Stack>

                </Modal.Body>
            </Modal>

        </>
    );
});

export default Game;