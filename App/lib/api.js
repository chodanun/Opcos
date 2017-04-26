class Api {
  static headers() {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'dataType': 'json',
    }
  }

  static get(route) {
    return this.xhr(route, null, 'GET');
  }

  static get_test(route) {
    return this.xhr_test(route, null, 'GET');
  }

  static put(route, params) {
    return this.xhr(route, params, 'PUT')
  }

  static post(route, params) {
    return this.xhr(route, params, 'POST')
  }

  static delete(route, params) {
    return this.xhr(route, params, 'DELETE')
  }

  static xhr(route, params, verb) {
    // const host = "http://192.168.1.104:8000"
    const host = "http://158.108.141.27:8000"
    // const host ="http://localhost:8000"
    const url = `${host}${route}`
    let options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null );
    options.headers = Api.headers()
    return fetch(url, options).then( resp => {
      let json = resp.json();
      if (resp.ok) {
        return json
      }
      return json.then(err => {throw err});
    }).then( json => json );
  }

  static fb_get(route) {
    return this.fb(route, null, 'GET');
  }

  static fb(route, params, verb) {
    const host ="https://graph.facebook.com/v2.8"
    const url = `${host}${route}`
    let options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null );
    options.headers = Api.headers()
    return fetch(url, options).then( resp => {
      let json = resp.json();
      if (resp.ok) {
        return json
      }
      return json.then(err => {throw err});
    }).then( json => json );
  }

  static xhr_test(route, params, verb) {
    const url = `${route}`
    let options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null );
    // options.headers = Api.headers()
    return fetch(url, options).then( resp => {
      let json = resp.json();
      if (resp.ok) {
        return json
      }
      return json.then(err => {throw err});
    }).then( json => json );
  }

}
export default Api
