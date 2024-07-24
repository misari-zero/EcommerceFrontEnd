const existSesion = () => {
    return localStorage.getItem('sesion') ? true : false
}

const getSesion = () => {
    return localStorage.getItem('sesion')
}

const setSesion = (token) => {
    localStorage.setItem('sesion', token)
}

const deleteSesion = () => {
    localStorage.removeItem('sesion')
}

export default {
    existSesion, getSesion, setSesion, deleteSesion
}