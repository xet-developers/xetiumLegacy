import CurrentProject from "../pages/registered/CurrentProject";
import QueryClustering from "../pages/registered/QueryClustering";
import Report from "../pages/registered/Report";
import SitePosition from "../pages/registered/SitePosition";


const AuthAppRoutes = [
    {
        path: "currentproject",
        element: <CurrentProject/>
    },
    {
        path: "queryclustering",
        element: <QueryClustering/>
    },
    {
        path: "report",
        element: <Report/>
    },
    {
        path: "siteposition",
        element: <SitePosition/>
    },
    {
        path: "*",
        element: <CurrentProject/>
    }
    // {
    //     index:true,
    //     element: <Advertising />
    // }, ???
];

export default AuthAppRoutes;
