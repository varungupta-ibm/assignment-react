import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { content, validate } from "./Services/Config";
import service from "./Services/UserServices";

const Register = (props) => {
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [userType, setUserType] = useState(content.ADMIN);
    const [employer, setEmployer] = useState();
    const [employerList, setEmployerList] = useState([]);

    const getEmployerList = () => {
        service.getEmployers()
            .then((res) => {
                setEmployerList(res.data);
            })
            .catch((err) => {
                // console.log('err', err);
                toast.error(err.message, { toastId: 'error', });
            });
    }

    const handleChangeRole = (role) => {

        if (role === 'EMPLOYEE') {
            getEmployerList();
        }
        setUserType(role);
    }

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

        let message;
        switch (elm.id) {
            case "email":
                message = content.errors.EMAIL;
                break;
            case "name":
                message = content.errors.NAME;
                break;
            case "phone":
                message = content.errors.PHONE;
                break;
            case "password":
                message = content.errors.PASSWORD;
                break;
            case "employer":
                message = content.errors.EMPLOYER;
                break;
        }
        return validate(elm, message);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let checkEmployer;
        const checkemail = handleValidation(document.getElementById('email'));
        const checkName = handleValidation(document.getElementById('name'));
        const checkPhone = handleValidation(document.getElementById('phone'));
        const checkPassword = handleValidation(document.getElementById('password'));
        if (userType === 'EMPLOYEE') {
            checkEmployer = handleValidation(document.getElementById('employer'));
        }

        if (checkemail && checkName && checkPhone && checkPassword) {

            let req;
            if (userType === 'EMPLOYEE') {
                req = {
                    email: email,
                    name: name, phone: phone,
                    password: password,
                    type: userType,
                    adminId: employer
                };
            } else {
                req = {
                    email: email,
                    name: name, phone: phone,
                    password: password,
                    type: userType
                };
            }

            service.RegisterUser(req)
                .then((res) => {
                    if (res && res.status === "SUCCESS") {
                        localStorage.setItem('user-token', res.token);
                        toast.success(res.message, { toastId: 'success', });

                        setTimeout(
                            verifyUserDetails(() => {
                                navigate('/dashboard');
                            }), 2000);
                    } else {
                        toast.success(res.message, { toastId: 'success', });
                        navigate('/login');
                    }
                    // console.log('res', res);
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
                <form className="login-form">
                    <div className="login-form-content">
                        <h3 className="login-form-title">Sign Up</h3>
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
                            <label>Name</label>
                            <input
                                id="name"
                                type="text"
                                className="form-control mt-1"
                                placeholder="Enter name"
                                onBlur={(e) => handleValidation(e.target)}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Phone Number</label>
                            <input
                                id="phone"
                                type="tel"
                                className="form-control mt-1"
                                placeholder="Enter phone number"
                                onBlur={(e) => handleValidation(e.target)}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Role</label>
                            <select
                                id="role"
                                className="form-select"
                                aria-label="Select Role"
                                onBlur={(e) => handleValidation(e.target)}
                                onChange={(e) => handleChangeRole(e.target.value)}
                            >
                                <option defaultValue value={content.ADMIN}>Employer</option>
                                <option value="EMPLOYEE">Employee</option>
                            </select>
                        </div>

                        {userType === "EMPLOYEE" ? (
                            <div className="form-group mt-3">
                                <label>Employer</label>
                                <select
                                    id="employer"
                                    className="form-select"
                                    aria-label="Select Employer"
                                    onBlur={(e) => handleValidation(e.target)}
                                    onChange={(e) => setEmployer(e.target.value)}
                                >
                                    <option className="no-select" defaultValue value="-1">Select Employer</option>
                                    {employerList.map((data, index) => (
                                        <option key={index} value={data.id}>{data.name}</option>
                                    ))}
                                </select>
                            </div>
                        ) : ('')}

                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                id="password"
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                onBlur={(e) => handleValidation(e.target)}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                        <p className="forgot-password text-right mt-2">
                            Already have an account? <a className='redirect-link' onClick={() => navigate('/login')}>Sign in</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;