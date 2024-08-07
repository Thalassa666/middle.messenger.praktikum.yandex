enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
};

function queryStringify(data: any): string {
    const arr = [];
    for (let key in data) {
        arr.push(key.toString() + '=' + data[key].toString());
    }
    return arr.length > 0 ? '?' + arr.join('&') : '';
}

type OptionsGeneral = {
    method: string
    data?: Document | XMLHttpRequestBodyInit | null | undefined
    headers?: Record<string, string>
    timeout?: number
    withCredentials?: boolean
}

type OptionsType = Omit<OptionsGeneral, 'method'>
type ConstructorOptionsType = {
    baseUrl?: string;
    url?: string;
}


type HTTPMethod = (url: string, options: OptionsType) => Promise<XMLHttpRequest>

export default class HTTPTransport {
    private _baseUrl: string

    constructor({ baseUrl = 'https://ya-praktikum.tech/api/v2', url = '' }: ConstructorOptionsType) {
        this._baseUrl = baseUrl.concat(url)
    }

    get: HTTPMethod = (url, options) => {
        const params = queryStringify(options.data)
        return this.request(this._baseUrl + url + params, { ...options, method: METHOD.GET });
    };

    put: HTTPMethod = (url, options) => {
        return this.request(this._baseUrl + url, { ...options, method: METHOD.PUT });
    }

    post: HTTPMethod = (url, options) => {
        return this.request(this._baseUrl + url, { ...options, method: METHOD.POST });
    }

    delete: HTTPMethod = (url, options) => {
        return this.request(this._baseUrl + url, { ...options, method: METHOD.DELETE });
    }

    patch: HTTPMethod = (url, options) => {
        return this.request(this._baseUrl + url, { ...options, method: METHOD.PATCH });
    }

    request = (url: string, options: OptionsGeneral): Promise<XMLHttpRequest> => {
        const { method, data, headers = {}, timeout = 5000, withCredentials = false } = options;

        return new Promise<XMLHttpRequest>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.withCredentials = withCredentials

            for (let header in headers as Record<string, string>) {
                xhr.setRequestHeader(header.toString(), headers[header].toString());
            }

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;

            xhr.onerror = reject;

            xhr.timeout = timeout;

            xhr.ontimeout = reject;

            if (method === METHOD.GET || data === undefined) {
                xhr.send();
            } else {
                xhr.send(data);
                console.log(data)
            }
        });
    };
}
