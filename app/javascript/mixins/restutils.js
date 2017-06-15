var http = (function () {

    var _defaultHandler = (error) => UI.notify('error', error)

    return {
        requestType: {
            get: 'GET',
            post: 'POST',
            put: 'PUT'
        },

        requestData: (url, queryObject, type) => {
            return new Promise(function resolver(resolve, reject) {
                var params = {
                    type: type || 'GET',
                    data: queryObject || {},
                    url: url,
                    async: true,
                    crossDomain: true,
                    success: (result) => {
                        resolve(result)
                        $('.loaderOverlay').hide()
                    },
                    error: (err) => reject ? reject(err) : _defaultHandler(err)
                }
                if (type === 'POST') {
                    params.dataType = 'json'
                }
                $('.loaderOverlay').show();
                $.ajax(params);
            });
        }
    };
})();

export default http;
