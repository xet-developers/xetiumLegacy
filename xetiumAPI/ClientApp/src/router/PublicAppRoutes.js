import Register from "../pages/unregistered/Register";
import Advertising from "../pages/unregistered/Advertising";
import Authorization from "../pages/unregistered/Authorization";
import CurrentProject from "../pages/registered/CurrentProject";

const PublicAppRoutes = [
    {
        path: "advertising",
        element: <Advertising/>
    },
    {
        path: "register",
        element: <Register/>
    },
    {
        path: "authorization",
        element: <Authorization/>
    },
    {
        path: "*",
        element: <Advertising/>
    }
];


export default PublicAppRoutes;
