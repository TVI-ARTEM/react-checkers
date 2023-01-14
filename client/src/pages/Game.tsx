import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import './Game.css';
import {Button, Col, Container, ListGroup, Modal, Navbar, Row, Stack} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {AUTH_ROUTE, MENU_ROUTE} from "../utils/consts";
import houseImgPath from './images/logo.png'
import {Context, ContextType} from "../index";
import IRoom, {get_current_player, get_player, isKing} from "../game/room/Room";
import {cookie} from "../http";
import jsonToClass from "../utils/jsonToClass";
import Cell from "../game/Cell";

import Player from "../game/Player";
import {updateWinner} from "../http/winnerApi";
import {King} from "../game/figure/King";


require("json-circular-stringify");


const Game = observer(() => {
    const {store, socket} = useContext(Context) as ContextType
    const navigate = useNavigate()
    const [modalShow, setModalShow] = useState(false)
    const [modalShowWinner, setModalShowWinner] = useState(false)
    const [modalShowWinnerAnother, setModalShowWinnerAnother] = useState(false)
    const [winnerEmail, setWinnerEmail] = useState('')
    const [room, setRoom] = useState<IRoom | null>(null)
    const [availableCells, setAvailableCells] = useState(new Array<{ prevCells: Cell[], cell: Cell }>())
    const [selectedCell, setCell] = useState<Cell | null>(null)

    const cellContains = (cell: Cell) => {
        for (const availableCell of availableCells) {
            if (availableCell.cell.x === cell.x && availableCell.cell.y === cell.y) {
                return true
            }
        }

        return false
    }

    useEffect(() => {
        if (!store.isAuth) {
            navigate(AUTH_ROUTE)
        }
        socket.emit('get-game', JSON.stringify({id: cookie.get('room_id'), password: cookie.get('room_password')}))

        socket.on('send-game', (message) => {
            console.log('SEND-GAME');
            const roomJson: IRoom = jsonToClass(message)

            setRoom(roomJson)
            setAvailableCells([])
        });

        socket.on('stop-game', () => {
            console.log('STOP-GAME');
            navigate(MENU_ROUTE);
        });

        socket.on('winner', async () => {
            console.log('WINNER')
            await updateWinner(store.user.email).then(() => {
                setModalShowWinner(true)
            })
        })

        socket.on('stop-game-normal', (msg) => {
            console.log('STOP-GAME-NORMAL')
            setWinnerEmail(msg)
            setModalShowWinnerAnother(true)
        })

        return () => {
            socket.off('send-game')
            socket.off('stop-game')
        }
    }, [])

    function onClickCell(cell: Cell) {
        return () => {
            if (room !== null) {
                const player = get_current_player(room) as Player
                if (player?.email !== store.user.email || cell.figure && player.color !== cell.figure.color) {
                    setAvailableCells([])
                    setCell(null)

                    return
                }
            }

            if (cell.figure) {
                setAvailableCells(cell.figure.getAvailableCells())
                setCell(cell)
            } else if (cellContains(cell)) {
                console.log('Pressed')
                console.log(selectedCell)
                for (const availableCell of availableCells) {
                    if (availableCell.cell.x === cell?.x && availableCell.cell.y === cell.y) {
                        if (selectedCell?.figure) {
                            if (isKing(availableCell.cell, selectedCell.figure.color)) {
                                new King(selectedCell.figure.color, availableCell.cell)
                            } else {
                                availableCell.cell.figure = selectedCell.figure
                                availableCell.cell.figure.cell = availableCell.cell
                            }
                        }
                        for (const prevCell of availableCell.prevCells) {
                            prevCell.figure = null
                        }

                        socket.emit('next-step', JSON.stringify(room))
                        setAvailableCells([])
                        setCell(null)
                        break
                    }
                }
            } else {
                setAvailableCells([])
                setCell(null)
            }
        };
    }

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
                <Row>
                    <Col>
                        <ListGroup>
                            <ListGroup.Item className={'roboto-text-regular'} style={{color: "black"}}>
                                Queue:
                            </ListGroup.Item>
                            {
                                room?.queue.slice(0, 10).map((item, idx) =>
                                    <ListGroup.Item className={'roboto-text-regular'} style={{color: "black"}}
                                                    key={idx}>{item}</ListGroup.Item>
                                )
                            }
                        </ListGroup>
                    </Col>
                    <Col>
                        <div className={'board'}>
                            {
                                room !== null && ((room as IRoom).board.cells).map((row, idx) =>
                                    <React.Fragment key={idx}>
                                        {
                                            row.map((cell, idx) =>
                                                <div key={idx} className={'diamond align-items-center'}
                                                     onClick={onClickCell(cell)
                                                     }>
                                                    {
                                                        cell.figure &&
                                                        <div key={idx} className={'checker'} style={{
                                                            backgroundImage: `url(${cell.figure.logo})`
                                                        }}
                                                        ></div>
                                                    }
                                                    {
                                                        cellContains(cell) && <div key={idx} className={'dot'}>

                                                        </div>
                                                    }

                                                </div>
                                            )
                                        }
                                    </React.Fragment>
                                )
                            }
                        </div>
                    </Col>
                    <Col>
                        <ListGroup>
                            <ListGroup.Item className={'roboto-text-regular'} style={{
                                color: "black"
                            }}>
                                Current Players:
                            </ListGroup.Item>
                            {
                                room?.current_players.slice(0, 10).map((item, idx) =>
                                    <ListGroup.Item className={'roboto-text-regular'} style={
                                        {
                                            color: room !== null && (get_current_player(room) as Player).email === item.email ?
                                                "red" : "black"
                                        }
                                    } key={idx}>
                                        {item.email}: {item.color}
                                        {
                                            room !== null && get_player(room, item.email)?.union !== '' ? ` - ${get_player(room, item.email)?.union}` : ""
                                        }
                                        {
                                            room !== null &&
                                            (get_current_player(room) as Player).email === store.user.email &&
                                            store.user.email === item.email ? " - Your turn" : ""
                                        }
                                    </ListGroup.Item>
                                )
                            }
                        </ListGroup>
                    </Col>
                </Row>

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

            <Modal show={modalShowWinner} onHide={() => {
                setModalShowWinner(false)
                cookie.set('room_id', "")
                cookie.set('room_password', "")
                navigate(MENU_ROUTE)
            }} aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title className={'roboto-text-regular'} style={{color: 'black'}}>Winner</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={'roboto-text-regular'} style={{color: 'black'}}>Congratulations! You're winner!
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => {
                        setModalShowWinner(false)
                        cookie.set('room_id', "")
                        cookie.set('room_password', "")
                        navigate(MENU_ROUTE)
                    }}>OK</Button>
                </Modal.Footer>
            </Modal>


            <Modal show={modalShowWinnerAnother} onHide={() => {
                setModalShowWinnerAnother(false)
                cookie.set('room_id', "")
                cookie.set('room_password', "")
                navigate(MENU_ROUTE)
            }} aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title className={'roboto-text-regular'} style={{color: 'black'}}>Winner</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={'roboto-text-regular'} style={{color: 'black'}}>Winner: {winnerEmail}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => {
                        setModalShowWinnerAnother(false)
                        cookie.set('room_id', "")
                        cookie.set('room_password', "")
                        navigate(MENU_ROUTE)
                    }}>OK</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
});

export default Game;