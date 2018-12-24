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
    },
    getById(param){
        return fetch(baseURL + '/websys/menu/getById.do',param)
    },
    edit(param){
        return jsonPost(baseURL + '/websys/menu/edit.do',param)
    },
    enable(param){
        return jsonPost(baseURL + '/websys/menu/enable.do',param)
    },
    disable(param){
        return jsonPost(baseURL + '/websys/menu/disable.do',param)
    }
}

const menuOperation = {
    add(param){
        return jsonPost(baseURL+'/websys/menuoperation/add.do',param)
    },
    edit(param){
        return jsonPost(baseURL+'/websys/menuoperation/edit.do',param)
    },
    query(param){
        return jsonPost(baseURL+'/websys/menuoperation/query.do',param)
    },
    del(param){
        return jsonPost(baseURL+'/websys/menuoperation/delete.do',param)
    },
    getById(param){
        return fetch(baseURL+'/websys/menuoperation/getById.do',param)
    }
}

const user = {
	getAll(){
		return jsonPost(baseURL + '/websys/user/getAllUser.do')
	},
	add(param){
		console.info(param);
		return jsonPost(baseURL + '/websys/user/addUser.do',param)
	},
	edit(param){
		return jsonPost(baseURL + '/websys/user/editUser.do',param)
	},
	del(param){
		return jsonPost(baseURL + '/websys/user/delUser.do',param)
	},
	getById(param){
		return post(baseURL + '/websys/user/getById.do',param)
	},
	getBySomething(param){
		return jsonPost(baseURL + '/websys/user/getBySomething.do',param)
	}
}

const role = {
	getAll(){
		return fetch(baseURL + '/websys/role/getAll.do')
	},
	add(param){
		return fetch(baseURL + '/websys/role/addRole.do',param)
	},
	getById(param){
		return jsonPost(baseURL + '/websys/role/getById.do',param)
	},
	edit(param){
		return jsonPost(baseURL + '/websys/role/editRole.do',param)
	},
	del(param){
		return jsonPost(baseURL + '/websys/role/delRole.do',param)
	},
	getBySomething(param){
		return jsonPost(baseURL + '/websys/role/getBySomething.do',param)
	}
}

const roleUser = {
	getIsDistribute(param){
		return jsonPost(baseURL + '/websys/roleuser/getIsDistribute.do',param)
	},
	add(param){
		return jsonPost(baseURL + '/websys/roleuser/add.do',param)
	},
	del(param){
		return jsonPost(baseURL + '/websys/roleuser/delList.do',param)
	},
	getIsDistributeBysm(param){
		return jsonPost(baseURL + '/websys/roleuser/getIsDistributeBysm.do',param)
	}
}

const roleRight = {
	edit(param){
		return jsonPost(baseURL + '/websys/roleright/editRoleRight.do',param)
	},
	queryTree(param){
		return jsonPost(baseURL + '/websys/roleright/getRightIdByRole.do',param)
	}
}

const commonAPI = {
    correntURL
}

const API = {
    firstTest,
    userLogin,
    menu,
    menuOperation,
    commonAPI,
	user,
	role,
	roleUser,
	roleRight
}


export default API
