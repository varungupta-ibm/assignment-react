import { useEffect } from "react";

import Container from 'react-bootstrap/Container';
import Header from './Header';

import { useSelector } from 'react-redux'

const Dashboard = (props) => {
    const userDetails = useSelector((state) => state.user.userDetails);

    useEffect(() => {
        console.log('DATA__', userDetails);
    }, []);

    return (
        <>
            <Header />
            <Container className='main-container bg-white'>
                <p className='welcome-text'>
                    Welcome to the Dashboard
                </p>
            </Container>
        </>
    );
};

export default Dashboard;