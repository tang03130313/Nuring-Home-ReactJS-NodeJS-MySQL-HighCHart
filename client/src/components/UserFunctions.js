import axios from 'axios'

export const register = newUser => {
    return axios
        .post('users/register', {
            name: newUser.name,
            email: newUser.email,
            username: newUser.username,
            password: newUser.password
        })
        .then(res => {
            console.log("Registered")
        })
}

export const login = user => {
    return axios
        .post('users/login', {
            username: user.username,
            password: user.password
        })
        .then(res => {
            localStorage.setItem('usertoken', res.data)
            console.log(res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const test = aaa => {
    return axios
        .get('test/test')
        .then(res => {
            localStorage.setItem('datatoken', res.data)
            console.log(localStorage.datatoken)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const home = aaa => {
    return axios
        .get('home/home')
        .then(res => {
            
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const patient_home = user => {
    return axios
        .post('patient/home', {
            userid : user
        })
        .then(res => {
            
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const patient_1 = user => {
    return axios
        .post('patient/realtime', {
            userid : user
        })
        .then(res => {
            
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const rank = aaa => {
    return axios
        .get('rank/rank')
        .then(res => {
            
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}