import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {UserStoreContextType, IUser} from "../store/UserStore";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import { MENU_ROUTE} from "../utils/consts";
import {Container, Form, Navbar, Stack} from "react-bootstrap";
import houseImgPath from "./images/logo.png";
import {login, registration} from "../http/userApi";


const Auth = observer(() => {

    const {user} = useContext(Context) as UserStoreContextType
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const state = {
        button: 1
    }
    const navigate = useNavigate()

    useEffect(() => {
        if (user.isAuth) {
            navigate(MENU_ROUTE)
        }
    }, [])


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
            <div className={'image-background'}>
                <section className="vh-100 gradient-custom">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div className="card bg-dark text-white" style={{borderRadius: "1rem"}}>
                                    <div className="card-body p-5 text-center">

                                        <div className="mb-md-5 mt-md-4">
                                            <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                            <p className="text-white-50 mb-5">Please enter your login and password!</p>


                                            <Form onSubmit={async (event) => {
                                                try {
                                                    event.preventDefault()
                                                    let data;
                                                    if (state.button === 1) {
                                                        data = await login(email, password);
                                                    } else {
                                                        data = await registration(email, password);
                                                    }
                                                    user.user = data as IUser
                                                    user.isAuth = true
                                                    navigate(MENU_ROUTE)
                                                } catch (e: any) {
                                                    alert(e.response.data.message)
                                                }

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

                                                    <button
                                                        className="btn btn-outline-light btn-lg px-5 align-self-center"
                                                        type="submit"
                                                        style={{width: "95%"}}
                                                        onClick={() => state.button = 1}>
                                                        Login
                                                    </button>
                                                    <div className={'mb-md-2'}></div>

                                                    <button
                                                        className="btn btn-outline-light btn-lg px-5 align-self-center"
                                                        type="submit"
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