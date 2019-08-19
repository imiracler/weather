import axios from 'axios';
import history from '../history';
export const AuthHeader = 'ONEsuite-Auth';

class HttpUtil {
    constructor() {
        this.token = null;
    }

    setToken(token) {
        this.token = token;
    }

    constructRequestURL(url) {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        } else {
            return this.getBaseApiUrl() + url;
        }
    }

    getBaseApiUrl() {
        // console.log(process)
        //return process.env.BASEAPIURL ? process.env.BASEAPIURL : ''
        return 'http://118.25.135.109';
    }

    get(url, options) {
        // console.warn(url)
        return new Promise((resolve, reject) => {
            axios.get(this.constructRequestURL(url), this._setHeaders(options)).then(this._resolveData(resolve, reject)).catch(this._errorHandle(reject));
        });
    }

    post(url, data, options) {
        // console.warn(url)
        return new Promise((resolve, reject) => {
            axios.post(this.constructRequestURL(url), data, this._setHeaders(options)).then(this._resolveData(resolve, reject)).catch(this._errorHandle(reject));
        });
    }

    put(url, data, options) {
        return new Promise((resolve, reject) => {
            axios.put(this.constructRequestURL(url), data, this._setHeaders(options)).then(this._resolveData(resolve, reject)).catch(this._errorHandle(reject));
        });
    }

    delete(url, options) {
        return new Promise((resolve, reject) => {
            axios.delete(this.constructRequestURL(url), this._setHeaders(options)).then(this._resolveData(resolve, reject)).catch(this._errorHandle(reject));
        });
    }

    http(url, options) {
        return new Promise((resolve, reject) => {
            axios(this.constructRequestURL(url), this._setHeaders(options)).then(this._resolveData(resolve, reject)).catch(this._errorHandle(reject));
        });
    }

    _setHeaders(options) {
        let token = this.token;
        if (token == null) {
            //token = this.getLocalStorage('token');
            token = localStorage.getItem('token');
            if (token) {
                try {
                    this.token = JSON.parse(token);
                } catch (e) {
                    this.token = null;
                    var remembered = localStorage.getItem('user-name');
                    localStorage.clear();
                    if (remembered)
                        localStorage.setItem('user-name', remembered);
                }
            }
        }
        if (this.token) {
            options = options || {};
            options.headers = options.headers || {};
            options.headers[AuthHeader] = this.token;
        }
        return options;
    }

    _resolveData(resolve, reject) {
        return result => {
            //console.log("result", result);
            if (result.data.result === 0 || result.data.result === '' || result.data.result) {
                return resolve(result.data.result);
            }
            if (result.data !== undefined) {
                return resolve(result.data);
            }
            // if (result.data.result === 0 || result.data.result) {
            //     return resolve(result.data.result);
            // }
            if (result.data.error) {
                let errors = result.data.errors;
                if (errors && errors.length > 0) {
                    return reject(errors);
                }
                return reject([{ errorCode: "unknown", message: "unknown error" }]);
            }
            resolve();
        };
    }

    _errorHandle(reject) {
        return err => {
            if (err.status === 401 || (err.response && err.response.status === 401)) {
                history.push('/login');
                return reject(["unauthentication"]);
            }
            if (err.status === 403 || (err.response && err.response.status === 403)) {
                history.push('/no-permission');
                return reject(["noright"]);
            }
            if (err.response && err.response.data && err.response.data.errors && err.response.data.errors.length) {
                let errors = err.response.data.errors;
                return reject(errors);
            }
            return reject([{ errorCode: "unknown", message: err.message ? err.message : JSON.stringify(err) }]);
        };
    }
}

export const httpUtil = new HttpUtil();