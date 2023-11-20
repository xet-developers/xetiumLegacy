import React, {useContext} from "react";
import {AuthContext} from "../contex/IsAuth";
import publicAppRoutes from "../router/PublicAppRoutes";
import authAppRoutes from "../router/AuthAppRoutes";
import {Route, Routes} from "react-router-dom";

const CreateRouter = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)

    let curRoutes = publicAppRoutes

    if(isAuth){
        curRoutes = authAppRoutes
    }

    return (
        <div>
            <Routes>
                {curRoutes.map((route) => {
                    const {element, ...rest} = route;
                    return <Route key={rest.path} {...rest} element={element}/>;
                })}
            </Routes>
        </div>
    );
};


export default CreateRouter