import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function ProtectedRoutes({ children }) {

    const status = useSelector(state => state.auth.status);

    const navigate = useNavigate()
    

    if (status === "idle" || status === "loading") {
        return (
            <div>Loading...</div>
        )
    }

    if (status === "unauthenticated") {
        return (
            navigate("/login")
        )
    }

    if (status === "authenticated") {
        return (
            <>
                {children}
            </>
        )
    }
}

export default ProtectedRoutes