import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';

const ProtectedRoute = ({ children, path }) => {
    const navigate = useNavigate();
    let { currentUser } = useUserAuth();

    if (!currentUser) {
        if (path === "login" || path === "signup") {
            return children;
        } else {
            return navigate('/login');
        }
    } else {
        if (path === "login" || path === "signup") {
            return navigate('/');
        } else {
            return children;
        }
    }
}

export default ProtectedRoute;