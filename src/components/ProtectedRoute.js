import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    let { currentUser } = useUserAuth();

    console.log(currentUser, children.type.name)

    if (!currentUser) {
        if (children.type.name === "Login" || children.type.name === "Signup") {
            return children;
        } else {
            return navigate('/login');
        }
    } else {
        if (children.type.name === "Login" || children.type.name === "Signup") {
            return navigate('/');
        } else {
            return children;
        }
    }
}

export default ProtectedRoute;