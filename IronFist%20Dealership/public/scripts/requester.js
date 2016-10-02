let requester = (function() {
    const Authentication_Key = 'zhumgwq8m2cn6p2e';
    const Administrator_Role_Hash = '372d6b60-8102-11e6-9eb4-3157f6092d16';

    let dataAccess = new Everlive({
        appId: Authentication_Key,
        token: localStorage.accessToken
    });

    let filter = new Everlive.Query();

    return {
        dataAccess,
        filter,
        Administrator_Role_Hash
    };
})()

export { requester }