import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

import service from "./Services/UserServices";
import Container from 'react-bootstrap/Container';
import Header from './Header';

const Employees = (props) => {
    const userData = JSON.parse(localStorage.getItem('user-details'));
    const [employeeList, setEmployeeList] = useState([]);

    const getEmployeeList = () => {
        const req = { userType: 'EMPLOYEE', adminId: userData.id };
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

    const updateUser = (ID) => {
        console.log('_ID', ID);
    }

    const removeUser = (ID) => {
        console.log('_ID', ID);
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
                                    {/* {data.verified ? 'VERIFIED' : 'NOT VERIFIED'} */}
                                    {data.verified ? (
                                        <Button variant="outline-success" size="sm" disabled>Active</Button>
                                    ) : (
                                        <Button variant="outline-primary" size="sm" onClick={() => verifyUser(data.id)}>Verify</Button>
                                    )}
                                    <Button variant="outline-warning" size="sm" onClick={() => updateUser(data.id)}>Update</Button>
                                    <Button variant="outline-danger" size="sm" onClick={() => removeUser(data.id)}>Remove</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
};

export default Employees;