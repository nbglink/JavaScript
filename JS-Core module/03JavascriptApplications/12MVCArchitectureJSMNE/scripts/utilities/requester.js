function makeRequest(method, url, headers, data) {
    $.ajax(
        {
            method:method,
            url:url,
            headers: headers,
            data: JSON.stringify(data)
        }
    )
}

class Requester {
    constructor() {
    }

    get(url, headers) {
       return  _makeRequest ('GET', url, headers, {});
    }

    post(url, headers, data) {
       return  _makeReqest('POST',url, headers.data);
    }

    put() {

    }

    delete() {

    }


}
