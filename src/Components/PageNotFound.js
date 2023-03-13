import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <header className="App-header">
            <p>
                <code>Page not found ..</code>
                <br />
                <a className='btn-404' onClick={() => navigate('/login')}>Return to home</a>
            </p>
        </header>
    );
};

export default PageNotFound;