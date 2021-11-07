function testGet(request, responce) {
    responce.json({
        result: 'All ok, bro!'
    })
}
module.exports = testGet;