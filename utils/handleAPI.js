/**
 * 处理请求响应中相同的部分
 */

exports.injectPost = function injectPost(reg, responseHandler) {

    return {
        url: reg,
        type: 'post',
        response: config => {

            let callback = null;

            try {
                callback = responseHandler(config)
            } catch (error) {

                return {
                    code: 500,
                    msg: '服务器端异常',
                    track: error
                }
            }

            if (!callback) {
                return {
                    code: 500,
                    msg: '服务器端异常',
                }
            }

            return {
                code: 200,
                msg: 'success',
                data: callback(config)
            }
        }
    }
}

exports.injectGet = function injectGet(reg, responseHandler) {
    return {
        url: reg,
        type: 'get',
        response: config => {

            let callback = null;

            try {
                callback = responseHandler(config)
            } catch (error) {

                return {
                    code: 500,
                    msg: '服务器端异常',
                    track: error
                }
            }

            if (!callback) {
                return {
                    code: 500,
                    msg: '服务器端异常',
                }
            }

            let data = callback
            if (typeof callback === 'function') {
                data = callback(config)
            }

            return {
                code: 200,
                msg: 'success',
                data: data
            }
        }
    }
}