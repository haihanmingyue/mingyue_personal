const TokenKey = "JSESSIONID"

export const getToken = () => {
    return sessionStorage.getItem(TokenKey);
}

export const setToken = (token: any) => {
    return sessionStorage.setItem(TokenKey, token);
};

export const removeToken = () => {
    return sessionStorage.removeItem(TokenKey);
};


export const getLocalToken = () => {
    return localStorage.getItem(TokenKey);
}

export const setLocalToken = (token: any) => {
    return localStorage.setItem(TokenKey, token);
};

export const removeLocalToken = () => {
    return localStorage.removeItem(TokenKey);
}
