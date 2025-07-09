import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home/Home"

const router = createBrowserRouter([
    {
    path:'/',
    element: <RootLayouts />,
    children: [
        {
            index: true,
            element: <Home />
        }
    ]
    }
]);

export default router;