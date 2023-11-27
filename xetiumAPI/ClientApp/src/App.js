import React, {useState} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {AuthContext} from "./contex/IsAuth";
import CreateRouter from "./components/CreateRouter";


const App = () => {
    const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
    const [isAuth, setIsAuth] = useState(true);

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
        }}>
            <BrowserRouter basename={baseUrl}>
                <CreateRouter/>
            </BrowserRouter>
        </AuthContext.Provider>
    );
};


export default App;