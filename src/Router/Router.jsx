import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home/Home"
import Login from "../Pages/Login/Login";
import Loading from "../Pages/shared/Loading";
import Contact from "../Pages/Contact/Contact";
import Register from "../Pages/Register/Register";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayouts />,
        children:
            [
                {
                    index: true,
                    element: <Home />
                },
                {
                    path: '/login',
                    element: <Login />
                },
                {
                    path: '/register',
                    element: <Register />
                },
                {
                    path: '/contact',
                    element: <Contact />
                },
                {
                    path: '/loading',
                    element: <Loading />
                }
            ]
    }
]);

export default router;