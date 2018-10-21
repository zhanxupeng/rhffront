import {post, postBlob, put, patch, fetch, jsonPost, filePost} from './http'
import {baseURL} from './apiUrl'

const firstTest={
    test(param){
        return fetch(baseURL + '/hello/test.pub', param)
    }
}

const userLogin={
    login(param){
        return post(baseURL+'/customer/login.do',param)
    },
    getInfo(){
        return post(baseURL+'/customer/getInfo.do')
    }
}

const API={
    firstTest,
    userLogin
}


export default API