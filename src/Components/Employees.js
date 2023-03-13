import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { toast } from 'react-toastify';
import { content, validate } from "./Services/Config";
import service from "./Services/UserServices";
import Container from 'react-bootstrap/Container';
import Header from './Header';

const Employees = (props) => {
    const userData = JSON.parse(localStorage.getItem('user-details'));
    const [employeeList, setEmployeeList] = useState([]);

    const [show, setShow] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});
    const handleClose = () => setShow(false);

    // Handle employee list service call
    const getEmployeeList = () => {
        const req = { userType: content.USER, adminId: userData.id };
        service.getEmployees(req)
            .then((res) => {
                // console.log('employees', res.data);
                setEmployeeList(res.data);
            })
            .catch((err) => {
                // console.log('err', err);
                toast.error(err.message, { toastId: 'error', });
            });
    }

    // Handle verify an employee
    const verifyUser = (ID) => {
        service.verifyUser(ID)
            .then((res) => {
                // console.log('response', res);
                getEmployeeList();
            })
            .catch((err) => {
                // console.log('err', err);
                toast.error(err.message, { toastId: 'error', });
            });
    }


    // Handle click event for update an employee data
    const handleUpdateClick = (data) => {
        setSelectedRow(data);
        setTimeout(setShow(true), 2000);
    }

    // Handle validation for submit updation
    const handleValidation = (elm) => {
        let message = elm.id === "update-name" ? content.errors.NAME : content.errors.PHONE;
        return validate(elm, message);
    }

    // Handle employee data updation service call
    const updateUser = () => {
        let nameElm = document.getElementById('update-name');
        let phoneElm = document.getElementById('update-phone');
        let checkUpdatedName = handleValidation(nameElm);
        let checkUpdatedPhone = handleValidation(phoneElm);

        if (checkUpdatedName && checkUpdatedPhone) {

            const payload = {
                email: selectedRow.email,
                name: nameElm.value,
                phone: phoneElm.value
            };
            service.updateUser(selectedRow.id, payload)
                .then((res) => {
                    console.log('response', res);
                    getEmployeeList();
                    setTimeout(setShow(false), 3000);
                })
                .catch((err) => {
                    // console.log('err', err);
                    toast.error(err.message, { toastId: 'error', });
                });
        }
    }

    // Handle remove user service call
    const removeUser = (ID) => {
        service.removeUser(ID)
            .then((res) => {
                console.log('response', res);
                getEmployeeList();
            })
            .catch((err) => {
                // console.log('err', err);
                toast.error(err.message, { toastId: 'error', });
            });
    }

    useEffect(() => {
        getEmployeeList();
    }, []);

    return (
        <>
            <Header />
            <Container className='main-container bg-white'>

                <h4 className='container-header'>Employee List</h4>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email Address</th>
                            <th>Phone No.</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeList.map((data, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                                <td>{data.phone}</td>
                                <td className="action-td">
                                    {data.verified ? (
                                        <Button variant="outline-success" size="sm" disabled>Active</Button>
                                    ) : (
                                        <Button variant="outline-primary" size="sm" onClick={() => verifyUser(data.id)}>Verify</Button>
                                    )}
                                    <Button variant="outline-warning" size="sm" onClick={() => handleUpdateClick(data)}>Update</Button>
                                    <Button variant="outline-danger" size="sm" onClick={() => removeUser(data.id)}>Remove</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Modal
                    show={show}
                    onHide={handleClose}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">Update Employee</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    id="update-email"
                                    placeholder="name@example.com"
                                    defaultValue={selectedRow.email}
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="update-name"
                                    placeholder="Update Name"
                                    defaultValue={selectedRow.name}
                                    onBlur={(e) => handleValidation(e.target)}
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="update-phone"
                                    placeholder="Update Phone Number"
                                    defaultValue={selectedRow.phone}
                                    onBlur={(e) => handleValidation(e.target)}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={updateUser}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Container>
        </>
    );
};

export default Employees;