import {LocalStorageManager} from "../misc/LocalStorageManager";

export class Requests {
    unregisteredPostParams = {
        method: 'POST',
        headers: {
            'Content-Type': "application/problem+json; charset=utf-8"
        },
    };

    RegisteredGetParams = {
        method: "GET",
        headers: {
            "Authorization": 'Bearer ' + LocalStorageManager.getJWT()
        }
    }

    RegisteredPostParams = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + LocalStorageManager.getJWT(),
            'Content-Type': "application/problem+json; charset=utf-8"
        },
    };

    async unregisteredPost(path, body) {
        this.unregisteredPostParams.body = JSON.stringify(body)
        return await fetch(path, this.unregisteredPostParams)
    }

    async registeredDelete(){

    }

    async registeredGet(path){
        return await fetch(path, this.RegisteredGetParams)
    }

    async registeredPost(path, body){
        this.RegisteredPostParams.body = JSON.stringify(body)
        return await fetch(path, this.RegisteredPostParams)
    }
}