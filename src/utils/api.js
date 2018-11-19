import axios from 'axios'
import {post, postBlob, put, patch, fetch, jsonPost, filePost} from './http'
import {baseURL,correntURL} from './apiUrl'

const firstTest={
    test(param){
        return fetch(baseURL + '/hello/test.pub', param)
    }
}

const userLogin={
    login(param){
        return post(baseURL+'/websys/userlogin/login.pub',param)
    },
    getInfo(){
        return fetch(baseURL+'/customer/getInfo.do')
    },
    ifNeetCaptcha(param){
        return fetch(baseURL + '/websys/userlogin/ifNeetCaptcha.pub',param)
    }
}

const commonAPI={
    correntURL
}

const API={
    firstTest,
    userLogin,
    commonAPI
}


export default API