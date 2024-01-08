import {json} from "react-router-dom";

export class LocalStorageManager {
    static _JWT= ''
    static getJWT(){
        if(this._JWT === ''){
            this._JWT = localStorage.getItem('jwt')
        }

        return this._JWT
    }

    static setJWT(token){
        localStorage.setItem('jwt', token)
    }

    static getIsAuth(){
        localStorage.getItem("isAuth")
    }

    static setIsAuth(){

    }

    static getCurrentProject(){
        return JSON.parse(localStorage.getItem("CurrentProject"))
    }

    static setCurrentProject(currentProject){
        localStorage.setItem('CurrentProject', JSON.stringify(currentProject))
    }
}