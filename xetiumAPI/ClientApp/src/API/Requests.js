import {LocalStorageManager} from "../misc/LocalStorageManager";

export class Requests {
    JWT = LocalStorageManager.getJWT()

    unregisteredPostParams = {
        method: 'POST',
        headers: {
            'Content-Type': "application/problem+json; charset=utf-8"
        },
    };

    RegisteredGetParams = {
        method: "GET",
        headers: {
            "Authorization": 'Bearer ' + this.JWT
        }
    }

    RegisteredPostParams = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + this.JWT,
            'Content-Type': "application/problem+json; charset=utf-8"
        },
    };

    async unregisteredPost(path, body) {
        this.unregisteredPostParams.body = JSON.stringify(body)
        return await fetch(path, this.unregisteredPostParams)
    }

    async registeredGet(path){
        return await fetch(path, this.RegisteredGetParams)
    }

    async registeredPost(path, body){
        this.RegisteredPostParams.body = JSON.stringify(body)
        return await fetch(path, this.RegisteredPostParams)
    }
}