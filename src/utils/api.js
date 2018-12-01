import axios from 'axios'
import { post, postBlob, put, patch, fetch, jsonPost, filePost } from './http'
import { baseURL, correntURL } from './apiUrl'

const firstTest = {
    test(param) {
        return fetch(baseURL + '/hello/test.pub', param)
    }
}

const userLogin = {
    login(param) {
        return post(baseURL + '/websys/userlogin/login.pub', param)
    },
    getInfo() {
        return fetch(baseURL + '/customer/getInfo.do')
    },
    ifNeetCaptcha(param) {
        return fetch(baseURL + '/websys/userlogin/ifNeetCaptcha.pub', param)
    }
}

const menu = {
    queryTree() {
        return fetch(baseURL + '/websys/menu/queryTree.do')
    },
    query(param) {
        return jsonPost(baseURL + '/websys/menu/query.do', param)
    },
    add(param){
        return jsonPost(baseURL + '/websys/menu/add.do',param)
    },
    del(param){
        return jsonPost(baseURL + '/websys/menu/delete.do',param)
    }
}

const commonAPI = {
    correntURL
}

const API = {
    firstTest,
    userLogin,
    menu,
    commonAPI
}


export default API