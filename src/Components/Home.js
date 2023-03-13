import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <Container className='main-container bg-white'>
                <div className='home-buttons'>
                <a className='active-link' onClick={() => navigate('/login')}>Sign In</a>
                <a className='active-link' onClick={() => navigate('/register')}>Sign Up</a>
                </div>
                <p className='welcome-text'>
                    Welcome to the Full Stack Assignment
                </p>
            </Container>
        </>
    );
};

export default Home;