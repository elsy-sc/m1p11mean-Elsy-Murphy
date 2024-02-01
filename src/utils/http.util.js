function sendJson(response, data, status, message){
    data = data|| [];
    status = status|| 200;
    message = message|| "";
    response.send({ message, status, data });
}

exports.sendJson = sendJson;