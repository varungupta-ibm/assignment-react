import Container from 'react-bootstrap/Container';
import Header from './Header';

const Dashboard = () => {

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