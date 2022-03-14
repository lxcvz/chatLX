import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from '../redux/store'

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { userUid } = useSelector((state: RootState) => state.userAuth)
    
    if (!userUid) {
        return <Navigate to="/" />
    }

    return children
}

export default ProtectedRoute