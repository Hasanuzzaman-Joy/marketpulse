import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home/Home"
import Login from "../Pages/Login/Login";
import Loading from "../Pages/shared/Loading";
import Contact from "../Pages/Contact/Contact";
import Register from "../Pages/Register/Register";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Forbidden from "../Pages/Forbidden/Forbidden";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayouts />,
        errorElement: <ErrorPage />,
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
                },
                {
                    path: "/forbidden",
                    element: <Forbidden />,
                }
            ]
    }
]);

export default router;