import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import './Game.css';
import {Button, Card, Container, Modal, Nav, Navbar, Row, Stack} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {AUTH_ROUTE, MENU_ROUTE} from "../utils/consts";
import houseImgPath from './images/logo.png'
import {Context} from "../index";
import {UserStoreContextType} from "../store/UserStore";


const Game = observer(() => {
    const {user} = useContext(Context) as UserStoreContextType
    const navigate = useNavigate()
    const [modalShow, setModalShow] = useState(false)

    useEffect(() => {
        if (!user.isAuth) {
            navigate(AUTH_ROUTE)
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
                Menu
            </Container>

            <Modal show={modalShow} onHide={() => setModalShow(false)} aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title className={'roboto-text-regular'} style={{color: 'black'}}>Menu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stack gap={2}>
                        <Button variant={'primary'} className={'align-self-center'} style={{width: "50%"}} onClick={() => setModalShow(false)}>Return</Button>
                        <Button variant={'danger'} className={'align-self-center'} style={{width: "50%"}} onClick={() => navigate(MENU_ROUTE)}>Exit</Button>

                    </Stack>

                </Modal.Body>
            </Modal>

        </>
    );
});

export default Game;