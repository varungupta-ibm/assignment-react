import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { content, validate } from "./Services/Config";
import service from "./Services/UserServices";

const Login = (props) => {
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const verifyUserDetails = (callback) => {
        service.getUserDetails()
            .then((res) => {
                console.log('response', res);
                localStorage.setItem('user-details', JSON.stringify(res));
                callback();
            })
            .catch((err) => {
                console.log('err', err);
            });
    }

    const handleValidation = (elm) => {
        let message = elm.id === "email" ? content.errors.EMAIL : content.errors.PASSWORD;
        return validate(elm, message);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const checkemail = handleValidation(document.getElementById('email'));
        const checkPassword = handleValidation(document.getElementById('password'));
        if (checkemail && checkPassword) {
            service.LoginUser({ email: email, password: password })
                .then((res) => {
                    // console.log('res', res);
                    localStorage.setItem('user-token', res.token);

                    setTimeout(
                        verifyUserDetails(() => {
                            navigate('/dashboard');
                        }), 2000);
                })
                .catch((err) => {
                    // console.log('err', err);
                    toast.error(err.message, { toastId: 'error', });
                });
        }
    }

    return (
        <div className='login-container'>
            <div className="login-form-container">
                <form className="login-form" noValidate onSubmit={handleSubmit}>
                    <div className="login-form-content">
                        <h3 className="login-form-title">Sign In</h3>
                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <input
                                id="email"
                                type="email"
                                className="form-control mt-1"
                                placeholder="Enter Email"
                                onBlur={(e) => handleValidation(e.target)}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                id="password"
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter Password"
                                onBlur={(e) => handleValidation(e.target)}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                        <p className="forgot-password text-right mt-2">
                            Don't have an account? <a className='redirect-link' onClick={() => navigate('/register')}>Sign up</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;