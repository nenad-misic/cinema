module.exports.api = 'https://yts.mx/api/v2/';
module.exports.current_cors = () => {
    if ((new Date()).getHours() > 14 || (new Date()).getHours() <= 1) {
        return 'https://cinema-cors2.herokuapp.com'
    } else {
        return 'https://cinema-cors1.herokuapp.com'
    }
}

module.exports.headers = {
    headers: {
        "X-Requested-With": "XMLHttpRequest",
    }
}
module.exports.aiap = 'https://recommendation-service-cinema.herokuapp.com/';