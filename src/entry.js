var app = {};


app.consoler = function (protocol) {
    console.log('%c\n     ', 'font-size:500px;background:url('+protocol+'"//javascript.mom/dist/WechatIMG2.jpeg") no-repeat 0 0');
}


app.consoler(location.protocol);