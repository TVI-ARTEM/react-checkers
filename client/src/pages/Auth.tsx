import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {UserStoreContextType} from "../store/UserStore";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {GAME_ROUTE, MENU_ROUTE} from "../utils/consts";
import {Button, Card, Col, Container, Form, Navbar, Row, Stack} from "react-bootstrap";
import houseImgPath from "./images/logo.png";

const Auth = observer(() => {

    const {user} = useContext(Context) as UserStoreContextType
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const state = {
        button: 1
    }

    const navigate = useNavigate()
    return (
        <>
            <Navbar fixed={'top'} bg={'dark'}>
                <Container fluid>
                    <Navbar.Brand className={'roboto-text-regular'}>
                        <img
                            src={houseImgPath}
                            width="32"
                            height="32"
                            className="d-inline-block align-top"
                            alt={''}/>{' '}Checkers</Navbar.Brand>
                </Container>
            </Navbar>

            {/*<div className={'image-background d-flex justify-content-center align-items-center'}>*/}
            {/*    <Card style={{backgroundColor: "#1E1E1E", borderRadius: "1rem", width: "50vw"}}>*/}
            {/*        <Container style={{}}>*/}
            {/*            <Row>*/}
            {/*                <Col className='roboto-text-regular' style={{fontSize: "3vw"}}>*/}

            {/*                        <Form onSubmit={(event) => {*/}
            {/*                            event.preventDefault()*/}
            {/*                            user.isAuth = true*/}
            {/*                            if (state.button === 1) {*/}
            {/*                                console.log('login')*/}
            {/*                            } else {*/}
            {/*                                console.log('sign up')*/}
            {/*                            }*/}
            {/*                            console.log(user.isAuth)*/}
            {/*                            console.log(email)*/}
            {/*                            console.log(password)*/}
            {/*                            navigate(MENU_ROUTE)*/}
            {/*                        }}>*/}
            {/*                            <Stack gap={2}>*/}
            {/*                                <label className={'text-center'}>Login</label>*/}

            {/*                                <label className={'roboto-text-regular'} style={{fontSize: "1vw"}}>*/}
            {/*                                    Email:*/}
            {/*                                </label>*/}

            {/*                                <input type={'text'} placeholder={'Enter Email'}*/}
            {/*                                       className={'form-control '}*/}
            {/*                                       onChange={(event) => setEmail(event.target.value)}*/}
            {/*                                       required></input>*/}
            {/*                                <label className={'roboto-text-regular'} style={{fontSize: "1vw"}}>*/}
            {/*                                    Password:*/}
            {/*                                </label>*/}
            {/*                                <input type={'password'} placeholder={'Enter Password'}*/}
            {/*                                       className={'form-control '}*/}
            {/*                                       onChange={(event) => setPassword(event.target.value)}*/}
            {/*                                       required></input>*/}

            {/*                                <div className={'mb-md-2'}></div>*/}

            {/*                                <button className="btn btn-outline-light btn-lg px-5 align-self-center" type="submit"*/}
            {/*                                        style={{width: "10vw"}}*/}
            {/*                                        onClick={() => state.button = 1}>*/}
            {/*                                    Login*/}
            {/*                                </button>*/}
            {/*                                <div className={'mb-md-2'}></div>*/}

            {/*                                <button className="btn btn-outline-light btn-lg px-5 align-self-center" type="submit"*/}
            {/*                                        style={{width: "50%"}}*/}
            {/*                                        onClick={() => state.button = 2}>*/}
            {/*                                    Sign up*/}
            {/*                                </button>*/}
            {/*                                <div className={'mb-md-2'}></div>*/}

            {/*                            </Stack>*/}
            {/*                        </Form>*/}
            {/*                </Col>*/}
            {/*            </Row>*/}

            {/*        </Container>*/}

            {/*    </Card>*/}

            {/*</div>*/}
         <div className={'image-background'}>
                <section className="vh-100 gradient-custom" >
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div className="card bg-dark text-white" style={{borderRadius: "1rem"}}>
                                    <div className="card-body p-5 text-center">

                                        <div className="mb-md-5 mt-md-4">
                                            <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                            <p className="text-white-50 mb-5">Please enter your login and password!</p>


                                            <Form onSubmit={(event) => {
                                                event.preventDefault()
                                                user.isAuth = true
                                                if (state.button === 1) {
                                                    console.log('login')
                                                } else {
                                                    console.log('sign up')
                                                }
                                                console.log(user.isAuth)
                                                console.log(email)
                                                console.log(password)
                                                navigate(MENU_ROUTE)
                                            }}>
                                                <Stack gap={2}>
                                                    <label className={'roboto-text-regular'}>
                                                        Email:
                                                    </label>

                                                    <input type={'text'} placeholder={'Enter Email'}
                                                           className={'form-control '}
                                                           onChange={(event) => setEmail(event.target.value)}
                                                           required></input>
                                                    <label className={'roboto-text-regular'}>
                                                        Password:
                                                    </label>
                                                    <input type={'password'} placeholder={'Enter Password'}
                                                           className={'form-control '}
                                                           onChange={(event) => setPassword(event.target.value)}
                                                           required></input>

                                                    <div className={'mb-md-2'}></div>

                                                    <button className="btn btn-outline-light btn-lg px-5 align-self-center" type="submit"
                                                            style={{width: "95%"}}
                                                            onClick={() => state.button = 1}>
                                                        Login
                                                    </button>
                                                    <div className={'mb-md-2'}></div>

                                                    <button className="btn btn-outline-light btn-lg px-5 align-self-center" type="submit"
                                                            style={{width: "95%"}}
                                                            onClick={() => state.button = 2}>
                                                        Sign up
                                                    </button>
                                                </Stack>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </>
    );
});

export default Auth;