enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

function queryStringify(data: { [key: string]: string }): string {
    return (
        '?' +
        Object.keys(data)
            .map((key) => {
                return `${key}=${data[key]}`;
            })
            .join('&')
    );
}

interface Options {
    timeout?: number;
    data?: { [key: string]: string };
    method?: METHODS;
}

type HTTPMethod = (url: string, options?: Options) => Promise<unknown>

class HTTPTransport {

    get: HTTPMethod = (url, options = {}) => (
        this.request(url, {...options, method: METHODS.GET}, options.timeout)
    )

    put: HTTPMethod = (url, options = {}) => (
        this.request(url, {...options, method: METHODS.PUT}, options.timeout)
    )

    post: HTTPMethod = (url, options = {}) => (
        this.request(url, {...options, method: METHODS.POST}, options.timeout)
    )

    delete: HTTPMethod = (url, options = {}) => (
        this.request(url, {...options, method: METHODS.DELETE}, options.timeout)
    )

    request = (url: string, options: Options, timeout = 5000) => {
        const { data, method } = options;

        return new Promise((resolve, reject) => {
            if (!method) {
                reject('Нет метода');
                return;
            }
            const xhr = new XMLHttpRequest();

            xhr.open(method, url);
            xhr.timeout = timeout;

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === 'GET' || !data) {
                xhr.send();
            } else {
                xhr.send(queryStringify(data));
            }
        });
    };
}

export default HTTPTransport;
