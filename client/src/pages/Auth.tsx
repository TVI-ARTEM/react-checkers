import React, {useContext} from 'react';
import {Context} from "../index";
import {UserStoreContextType} from "../store/UserStore";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {MENU_ROUTE} from "../utils/consts";

const Auth = observer( () => {

    const {user} = useContext(Context) as UserStoreContextType
    const navigate = useNavigate()
    return (
        <div style={{backgroundColor: 'powderblue'}}>
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{borderRadius: "1rem"}}>
                            <div className="card-body p-5 text-center">

                                <div className="mb-md-5 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                    <p className="text-white-50 mb-5">Please enter your login and password!</p>

                                    <div className="form-outline form-white mb-4">
                                        <input type="email" id="typeEmailX" className="form-control form-control-lg"/>
                                        <label className="form-label" htmlFor="typeEmailX">Email</label>
                                    </div>

                                    <div className="form-outline form-white mb-4">
                                        <input type="password" id="typePasswordX"
                                               className="form-control form-control-lg"/>
                                        <label className="form-label" htmlFor="typePasswordX">Password</label>
                                    </div>


                                    <div className="form-outline form-white mb-4">
                                        <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={(event) => {
                                            user.isAuth = true
                                            console.log(user.isAuth)
                                            navigate(MENU_ROUTE)
                                        }}>
                                            Login
                                        </button>
                                    </div>

                                    <div className="form-outline form-white mb-4">
                                        <button className="btn btn-outline-light btn-lg px-5" type="submit">
                                            Sign up
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        </div>
    );
});

export default Auth;