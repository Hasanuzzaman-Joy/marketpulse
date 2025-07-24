import { Navigate, useLocation } from 'react-router';
import useAuth from '../../hooks/useAuth';
import Loading from '../../Pages/shared/Loading';
import useRole from '../../hooks/useRole';

const PrivateRoute = ({allowedRoles, children}) => {
    const{user, loading} = useAuth();
    const location = useLocation();
    const{userRole, roleLoading} = useRole();

    if(loading || roleLoading || !userRole) return <Loading />
    if(!user) return <Navigate to='/login' state={{from : location.pathname}} replace />

    if(!allowedRoles.includes(userRole)){
        return <Navigate to='/forbidden' />
    }

    return children;
};

export default PrivateRoute;