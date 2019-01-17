import qs from 'qs';
import axios from 'axios';
import isNode from 'isnode';

class Request {
    constructor() {
        this.base = {
            type: 'get',
            meta: isNode ? 'http://127.0.0.1:3000' : 'http://192.168.100.95:3000'
        };
        this.options = {
            url: null,
            params: null,
            data: null
        };
    }
    config(obj) {
        this.options = obj;
        return this.run();
    }
    setConfig(type) {
        return {
            method: type || this.base.type,
            url: this.base.meta + this.options.url,
            params: this.options.params || {}, // Get的参数
            data: this.options.data ? (this.options.data.constructor === FormData ? this.options.data : qs.stringify(this.options.data)) : {} // Post的参数
        };
    }
    run() {
        return new Promise((resolve, reject) => {
            axios
                .request(this.setConfig(this.options.type))
                .then(res => {
                    resolve(res.data);
                })
                .catch(res => {
                    reject(res);
                });
        });
    }
}
export default new Request();
