var app = {};


app.consoler = function (protocol) {
    console.log('%c', 'padding:100px 300px;line-height:150px;background:url('+protocol+'"//javascript.mom/dist/WechatIMG2.jpeg") no-repeat;');
}


app.consoler(location.protocol);