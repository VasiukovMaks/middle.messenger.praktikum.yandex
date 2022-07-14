enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

function queryStringify(data: any):string {
  return `?${Object.keys(data).map((key) => `${key}=${data[key]}`).join('&')}`;
}

export default class HTTPTransport {
  public get = (url : string, options = {}) => (
    this.request(url, { ...options, method: METHODS.GET })
  );

  public post = (url: string, options = {}) => (
    this.request(url, { ...options, method: METHODS.POST })
  );

  public put = (url: string, options = {}) => (
    this.request(url, { ...options, method: METHODS.PUT })
  );

  public delete = (url: string, options = {}) => (
    this.request(url, { ...options, method: METHODS.DELETE })
  );

  request = (baseUrl: string, options : any = {}): Promise<unknown> => {
    const {
      method, data, headers, timeout,
    } : {
      method: string;
      data: any;
      headers: Record<string, string>;
      timeout: number;
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const url = (method === METHODS.GET && data) ? `${baseUrl}${queryStringify(data)}` : baseUrl;
      xhr.open(method, url, true);

      if (headers) {
        Object.entries(headers).forEach(([key, value]) => xhr.setRequestHeader(key, value));
      }
      xhr.timeout = timeout || 5000;

      xhr.onload = () => resolve(xhr);
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
