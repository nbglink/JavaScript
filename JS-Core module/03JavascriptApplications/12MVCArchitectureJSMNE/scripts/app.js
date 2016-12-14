(function(){
    let baseURL = 'https://baas.kinvey.com';
    let appKey = 'kid_SJWlt7NQl';
    let appSecret = '69e8a3470f9648ceb21b8787e5f593a4';

    let requester = new Requester();
    let authenticationService = new AuthenticationService(appKey, appSecret);

    let womanView = new WomanView();
    let womanModel = new WomanModel(baseURL, appKey, requester, authenticationService);
    let womanController = new WomanController(model, view);


}());
