import {json} from "react-router-dom";

export class LocalStorageManager {
    static getJWT(){
        return localStorage.getItem('jwt')
    }

    static setJWT(token){
        localStorage.setItem('jwt', token)
    }

    static getIsAuth(){
        return localStorage.getItem("isAuth")
    }

    static setIsAuth(bool){
        localStorage.setItem("isAuth", bool)
    }

    static getUserProjects(){
        return JSON.parse(localStorage.getItem("UserProjects"))
    }

    static setUserProjects(projects){
        localStorage.setItem("UserProjects", JSON.stringify(projects))
    }

    static getCurrentProject(){
        return JSON.parse(localStorage.getItem("CurrentProject"))
    }

    static setCurrentProject(currentProject){
        localStorage.setItem('CurrentProject', JSON.stringify(currentProject))
    }
}