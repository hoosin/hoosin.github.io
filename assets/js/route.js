var urlRoot = 'http://api.51viper.com/',
    token = localStorage.tName, //拿到localStorage
    name = localStorage.wechatName, //拿到localStorage
    avatar = localStorage.wechatAvatar; //拿到localStorage

console.log('拿到的离线token:' + token)
console.log('拿到离线用户名:' + name)
console.log('拿到离线用户头像:' + avatar)

function pop(obj) {
    $('#JpopE').html(obj).show().css('margin-left', -$('#JpopE').width() / 2)
    setTimeout(function() {
        $('#JpopE').html('').hide();
    }, 1000)
}

function getNowFormatDate() { //格式化时间
    var day = new Date();
    var Year = 0;
    var Month = 0;
    var Day = 0;
    var CurrentDate = "";
    //初始化时间 
    Year = day.getFullYear(); //ie火狐下都可以 
    Month = day.getMonth() + 1;
    Day = day.getDate();
    CurrentDate += Year + "-";
    if (Month >= 10) {
        CurrentDate += Month + "-";
    } else {
        CurrentDate += "0" + Month + "-";
    }
    if (Day >= 10) {
        CurrentDate += Day;
    } else {
        CurrentDate += "0" + Day;
    }
    return CurrentDate;
};

function getTime( /** timestamp=0 **/ ) {
    var ts = arguments[0] || 0;
    var t, y, m, d, h, i, s;
    t = ts ? new Date(ts * 1000) : new Date();
    y = t.getFullYear();
    m = t.getMonth() + 1;
    d = t.getDate();
    h = t.getHours();
    i = t.getMinutes();
    s = t.getSeconds();
    // 可根据需要在这里定义时间格式
    return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + (h < 10 ? '0' + h : h) + ':' + (i < 10 ? '0' + i : i) + ':' + (s < 10 ? '0' + s : s);
}

var today = new Date();
y = today.getFullYear(),
    m = today.getMonth(),
    d = today.getDate(),
    h = today.getHours(),
    ms = today.getMinutes(),
    s = today.getSeconds();

// 公共函数

var allroutes = function() {
        var route = window.location.hash.slice(2);
        console.log(route)
    },
    item = function() {
        $('#Jmanner').removeClass('box-in')
        $('#Jview').removeClass('box-in')
        $('#Jitem').css({'z-index':'100','opacity':'1'});
        $('title').html('赛事列表');
        $('#Jview').html('');
        $('#Jmanner').html('');
        $('title').html('微信也能看比赛，快来分享你的足球态度！');
    },
    details = function() {
        console.log("details");
    },
    manner = function(itemId) {
        $('#Jview').html('');
        $('#Jitem').css({'z-index':'0','opacity':'0'});
        $('#Jmanner').addClass('box-in');
        $('#Jview').removeClass('box-in');
        console.log('态度id：' + itemId)
        var flag = 0

        function addhtml() {
            // 装载html
            $('#Jmanner').html('<div class="comments"><div class="attitude-info comment-list"><div id="Jtop" class="box"><div class="dPic"><div class="img"><img alt="" src=""></div></div><div class="dInfo"><p class="date"><span class="name"></span> <span class="time"></span></p></div></div><div id="Jmsg" class="attitude-msg"><p></p><div id="Jpic" class="pic"><img alt="" src=""></div></div><div class="at-wrap"><a id="Jleft" class="left"><em></em> 支持</a> <a id="Jright" class="right"><em></em> 反对</a></div></div><div class="page-cmt-box"><div class="tit"><span>☁</span> <em id="Jcmtnum"></em> 评论</div><ul id="Jcomment" class="comment-list"></ul><div id="Loadding"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div><div id="Jmore">点击加载更多</div></div></div><div id="footer"><div class="viper-input-group"><div class="viper-form-field"><input id="Jinput" placeholder="发表评论" type="text"></div><div class="viper-input-group-btn"><span id="Jpublish">发表</span></div></div></div><div id="Jrefresh"></div>')
            flag = 1;
        }
        addhtml()
        console.log(flag)
            //直接冒泡。
        $('#Jcomment').on('touchend', 'li .box-cmt', function(a) {
            var t = $(a.target);
            //如果你点的不是li，而是里面的div 或者p标签，那么找到他的父元素
            if (a.target.tagName != 'LI') {
                t = $(a.target).closest('li');
            }
            window.show = !window.show;

            if (window.show && t.children('.box').children('.cmt-pop').css('display') == 'none') {
                t.children('.box').children('.cmt-pop').show();
                return;
            }

            //如果已经显示，那么直接return
            if (t.children('.box').children('.cmt-pop').css('display') == 'block') {
                window.show = !window.show;
                return;
            }

            //如果show是true，而且里面的没显示，表示点击的其他
            if (!window.show && t.children('.box').children('.cmt-pop').css('display') == 'none') {
                $('.cmt-pop').hide();
                window.show = false;
                return;
            }
        }).on('touchend', '.set-btn', function(a) { //回复
            $('#Jinput').focus().attr('placeholder', '回复' + $(a.target).attr('data') + '楼：');
            $('#Jinput').focus().attr('data', $(a.target).attr('data-id'));
            $('#Jinput').focus().attr('data-f', $(a.target).attr('data'));
            window.show = !window.show;
            $('.cmt-pop').hide();
        }).on('touchend', '.report', function(a) { //举报
            var reportId = $(a.target).attr('data');
            $.ajax({
                type: 'POST',
                url: urlRoot + '/api/report.jsp?type=0&token=' + token + '&id=' + reportId,
                // dataType: 'jsonp',
                success: function(data) {
                    var dataObj = eval("(" + data + ")"); //post返回json对象处理
                    if (dataObj.code == 100) {
                        pop(dataObj.message);
                        $('.cmt-pop').hide();
                        window.show = !window.show;
                    } else if (dataObj.code == 1002) {
                        pop(dataObj.message);
                        $('.cmt-pop').hide();
                        window.show = !window.show;
                    } else {
                        pop('举报成功');
                        $('.cmt-pop').hide();
                        window.show = !window.show;
                    }
                    console.log(data)
                }
            });

        });



        function setHtml(data, obj) {
            var msg = data.data,
                html = '';
            for (var i = 0; i < msg.length; i++) {
                html += '<li data="' + msg[i].date + '"><div class="box box-cmt"><div class="dPic"><div class="img">' + ((msg[i].uhead != undefined && msg[i].uhead != '') ? ('<img alt="' + msg[i].nickname + '" src="' + msg[i].uhead + '">') : ('<img alt="我是球迷" src="images/default_empty@2x.png">')) + '</div></div><div class="dInfo"><p class="date"><span class="name">' + msg[i].nickname + '</span><span class="time">' + getTime(msg[i].date) + ' <em>' + msg[i].floor + '楼</em></span></p><p class="get-c"><span class="gray">' + ((msg[i].reply != undefined) ? ('回复' + msg[i].reply.floor + '楼' + msg[i].reply.nickname + '：') : ('')) + '</span>' + msg[i].content + '</p></div><div class="cmt-pop"><span data-id="' + msg[i].id + '" data="' + msg[i].floor + '" class="set-btn">回复</span><span data="' + msg[i].id + '" class="report">举报</span></div></div></li>'
            };
            html += ""
            $('#' + obj).append(html);
        };

        window.manner = {

            bind: function() {
                var _this = this;
                $('.cmt-pop').hide();
                window.show = true;
            },
            scrollLoad: function() {
                that = this;
                var generatedCount = 1;

                //滚动条视觉差
                $('#Jmanner .comments').scroll(function() {
                    $('.cmt-pop').hide()
                    $('#Jinput').blur();
                });

                $('#Jmore').on('touchend', function() {
                    $('#Loadding').show();
                    $('#Jmore').hide();
                    setTimeout(function() {
                        $.ajax({
                            type: 'GET',
                            url: urlRoot + '/api/list_comment.jsp?&pageNo=' + (++generatedCount) + '&pageSize=20&standpoint_id=' + itemId,
                            dataType: 'jsonp',
                            success: function(data) {
                                setHtml(data, 'Jcomment');
                                if (data.data.length == 0) {
                                    $('#Loadding').html('<span class="txt"> 没有更多了哦~~</span>');
                                }
                                $('#Loadding').hide();
                                $('#Jmore').show();
                            }
                        });
                        that.bind()
                    }, 1000);
                });
            },
            init: function() {
                manner.scrollLoad()
                var lastFloor = {};

                $('#Jrefresh')[0].onclick = function() {
                    $('#Jcomment').html('').next('#Jnone').detach();
                    if ($('#Jcomment').children().length == 0) {
                        manner.init()
                    }
                };

                $.ajax({
                    url: urlRoot + '/api/standpoint_info.jsp?standpoint_id=' + itemId,
                    type: 'GET',
                    dataType: 'jsonp',
                    success: function(data) {
                        console.log(data.img.length)
                        var imghtml = '';
                        for (var i = 0; i < data.img.length; i++) {
                            imghtml += '<img alt="" src="' + data.img[i] + '" />'
                        };
                        $('#Jpic').html(imghtml);
                        $('#Jmsg p').html(data.content.replace(/\n/g, "<br/>"));
                        $('#Jtop .dPic img').attr({
                            'src': data.uhead,
                            'alt': data.uname
                        });
                        $('#Jtop .time').html(getTime(data.date));
                        $('#Jtop .name').html(data.uname);
                        $('#Jleft em').html(data.approval);
                        $('#Jright em').html(data.oppose);
                        $('title').html('我是球迷，分享你的态度！')
                        praise()
                    }
                })

                function praise() { //态度支持接口
                        $('#Jleft').attr('date', '0'); //设置post数据
                        $('#Jright').attr('date', '1'); //设置post数据
                        $('#Jleft,#Jright').on('touchend', function() {
                            if (localStorage.praiseid != itemId) {
                                var l = Number($(this).children('em').html()),
                                    obj = $(this).attr('id')
                                $.ajax({
                                    type: 'POST',
                                    url: urlRoot + '/api/support.jsp?standpoint_id=' + itemId + '&token=' + token + '&act=' + $(this).attr('date'),
                                    success: function(data) {
                                        var dataObj = eval("(" + data + ")"); //post返回json对象处理
                                        if (dataObj.code == 0) {
                                            pop('表态成功')
                                            $('#' + obj).children('em').html(++l)
                                            localStorage.praiseid = itemId
                                        }
                                    }
                                });
                            }
                            if (localStorage.praiseid == itemId) {
                                pop('亲，您已经支持过啦。')
                            };
                        });

                    }
                    //默认的评论列表
                $.ajax({
                    type: 'GET',
                    url: urlRoot + '/api/list_comment.jsp?&pageNo=1&pageSize=20&standpoint_id=' + itemId,
                    dataType: 'jsonp',
                    success: function(data) {
                        if (data.data.length == 0) {
                            $('#Jcomment').html('<div id="Jnone">暂无评论</div>');
                            $('#Jcmtnum').html('0');
                        } else {
                            setHtml(data, 'Jcomment');
                            lastFloor.data = data.data[0].floor;
                            $('#Jcmtnum').html(lastFloor.data);
                            
                            console.log(lastFloor.data)
                            if (lastFloor.data < 20) {
                                $('#Jmore').remove()
                            };
                            if (lastFloor.data > 20) {
                                $('#Jmore').show()
                            };
                        }
                        weChatWrite()
                    }
                });

                function weChatWrite() {
                    // 发表评论
                    var l = '';
                    if (lastFloor.data == 'undefined') {
                        l = 0;
                    } else if (lastFloor.data > 20) {
                        l = lastFloor.data;
                    } else if (l < 20) {
                        l = lastFloor.data;
                    };
                    $('#Jpublish').on('touchend', function() {
                        var txt = $('#Jinput').val(),
                            licon = $('#team_icon1').attr('src'),
                            ricon = $('#team_icon2').attr('src'),
                            lgooded = $('#Jnav .left-good span').hasClass('gooded'),
                            replyf = $('#Jinput').attr('data-f'),
                            reply = $('#Jinput').attr('data');

                        console.log(replyf)

                        if (txt == '') {
                            pop('评论不能为空');
                        } else if (txt != '') {
                            $.ajax({
                                type: 'POST',
                                url: urlRoot + '/api/create_comment.jsp?standpoint_id=' + itemId + '&token=' + token + '&content=' + txt + '&reply=' + reply,
                                success: function(data) {
                                    var dataObj = eval("(" + data + ")"); //post返回json对象处理
                                    if (dataObj.code == 100) {
                                        pop(dataObj.message);
                                    } else {
                                        pop('发表成功');
                                        html = '<li><div class="box"><div class="dPic"><div class="img"><img alt="' + name + '" src="' + avatar + '"></div></div><div class="dInfo"><p class="date"><span class="name">' + name + '</span><span class="time">' + (getNowFormatDate(y + '-' + m + '-' + d) + ' ' + h + ':' + ms + ':' + s) + ' <em>' + (++l) + '楼</em></span></p><p class="get-c">' + ((replyf != null && replyf != '') ? ('<span class="gray">回复' + replyf + '楼:</span>') : ('')) + txt + '</p></div><div class="cmt-pop"><span data="' + l + '" class="set-btn">回复</span><span data="" class="report">举报</span></div></div></li>';
                                        $('#Jcomment').prepend(html);
                                        $('#Jnone').remove();
                                        $('#Jinput').val('');
                                        $('#Jinput').attr('placeholder', '发表评论');
                                        $('#Jinput').attr('data', '');
                                        $('#Jinput').attr('data-f', '');
                                        $('#Jcmtnum').html(l);
                                        $('#Jinput').blur();
                                    };
                                }
                            });

                        }
                    });
                }
            }

        }

        if (flag === 1) {
            manner.init()
        }
    },
    detail = function(itemId) {
        $('#Jitem').css({'z-index':'0','opacity':'0'});
        $('#Jmanner').removeClass('box-in');
        $('#Jview').addClass('box-in');
        $('#Jmanner').html('');
        console.log('赛事id：' + itemId);

        var flag = 0

        function addhtml() {
            // 装载html
            $('#Jview').html('<div id="header"><div id="Jnav" class="page-header"><div class="blur"></div><div class="page-header-box"><div class="troops troops-left"><div class="crown-box"><span class="crown"></span></div><img id="team_icon1" alt="我是球迷" src="images/default_empty@2x.png" data="160"><p id="team_name1" class="troops-name">我是球迷</p></div><div class="troops-msg"><p id="Jplan" class="troops-plan">已结束</p><p id="Jvs" class="troops-vs">暂无数据</p></div><div class="troops troops-right"><div class="crown-box"><span class="crown"></span></div><img id="team_icon2" alt="我是球迷" src="images/default_empty@2x.png" data="130"><p id="team_name2" class="troops-name">真是牛逼</p></div><div class="score-box"><span class="pk-logo"></span><div class="add-good left-good"><span data="" class=""></span> <em id="Jnuml"></em></div><div class="add-good right-good"><em id="JnumR"></em> <span data=""></span></div><div id="Jprogress" class="progress-bar"><span class="left" style="width:50%"></span> <span class="right" style="width:50%"></span></div></div></div></div><div class="item-tit">球迷区</div></div><div id="Jscroll" class="comments"><ul id="Jcomment" class="comment-list"></ul><div id="Loadding"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div><div id="Jmore">点击加载更多</div></div><div id="footer"><div class="viper-input-group"><div class="o-inputGg" id="JpopBtn"></div><div class="viper-form-field"><input id="Jinput" placeholder="发表评论" type="text"></div><div class="viper-input-group-btn"><span id="Jpublish">发表</span></div></div></div><div id="Jpop" class="popup popup-animation"><div id="JvsL" class="pop-left"><img src="http://dummyimage.com/50x50/f1f1f1/999" width="50" height="50"><p></p></div><div class="pop-center">VS</div><div id="JvsR" class="pop-right"><img src="http://dummyimage.com/50x50/f1f1f1/999" width="50" height="50"><p></p></div><div class="pop-msg"><p>点击队徽支持球队，</p><p>就可以发言啦！</p></div><div class="pop-btcont"><div id="Jshare" class="pop-share">分享</div><div id="Jclose" class="pop-close">关闭</div></div></div><div id="Jshade"><div class="wechat-share"><img src="images/arrow-wx.png"><div class="wechat-share-txt">点击右上角分享到朋友圈</div></div></div><div id="Jrefresh"></div>')
            flag = 1;
        }
        addhtml()

        console.log(flag)

        // 终端页程序开始


        function setHtml(data, obj, style) {
            var msg = data.data,
                licon = $('.troops-left img').attr('src'),
                la = $('.left-good span').attr('data'),
                ricon = $('.troops-right img').attr('src'),
                ra = $('.right-good span').attr('data'),
                html = '';

            for (var i = 0; i < msg.length; i++) {
                html += '<li data="' + msg[i].date + '"><div class="box box-cmt"><div class="dPic"><div class="img">' + ((msg[i].uhead != undefined && msg[i].uhead != '') ? ('<img alt="' + msg[i].nickname + '" src="' + msg[i].uhead + '">') : ('<img alt="我是球迷" src="images/default_empty@2x.png">')) + '</div><div class="medal"><img src="' + ((msg[i].iconUrl != undefined && msg[i].iconUrl != '') ? (msg[i].iconUrl) : ("images/default_empty@2x.png")) + '"></div></div><div class="dInfo"><p class="date"><span class="name">' + msg[i].nickname + '</span><span class="time">' + getTime(msg[i].date) + ' <em>' + msg[i].floor + '楼</em></span></p><p class="get-c"><span class="gray">' + ((msg[i].reply != undefined) ? ('回复' + msg[i].reply.floor + '楼' + msg[i].reply.nickname + '：') : ('')) + '</span>' + msg[i].content + '</p></div><div class="cmt-pop"><span data-id="' + msg[i].id + '" data="' + msg[i].floor + '" class="set-btn">回复</span><span data="' + msg[i].id + '" class="report">举报</span></div></div></li>'
            };
            if (style == 'pull') {
                $('#' + obj).html(html);
            }
            if (style != 'pull') {
                $('#' + obj).append(html);
            }

        };

        //直接冒泡。
        $('#Jcomment').on('touchend', 'li .box-cmt', function(a) {
            var t = $(a.target);
            //如果你点的不是li，而是里面的div 或者p标签，那么找到他的父元素
            if (a.target.tagName != 'LI') {
                t = $(a.target).closest('li');
            }
            window.show = !window.show;

            if (window.show && t.children('.box').children('.cmt-pop').css('display') == 'none') {
                t.children('.box').children('.cmt-pop').show();
                return;
            }

            //如果已经显示，那么直接return
            if (t.children('.box').children('.cmt-pop').css('display') == 'block') {
                window.show = !window.show;
                return;
            }

            //如果show是true，而且里面的没显示，表示点击的其他
            if (!window.show && t.children('.box').children('.cmt-pop').css('display') == 'none') {
                $('.cmt-pop').hide();
                window.show = false;
                return;
            }
        }).on('touchend', '.set-btn', function(a) { //回复
            $('#Jinput').focus().attr('placeholder', '回复' + $(a.target).attr('data') + '楼：');
            $('#Jinput').focus().attr('data', $(a.target).attr('data-id'));
            $('#Jinput').focus().attr('data-f', $(a.target).attr('data'));
            window.show = !window.show;
            $('.cmt-pop').hide();
        }).on('touchend', '.report', function(a) { //举报
            var reportId = $(a.target).attr('data');
            $.ajax({
                type: 'POST',
                url: urlRoot + '/api/report.jsp?type=0&token=' + token + '&id=' + reportId,
                // dataType: 'jsonp',
                success: function(data) {
                    var dataObj = eval("(" + data + ")"); //post返回json对象处理
                    if (dataObj.code == 100) {
                        pop(dataObj.message);
                        $('.cmt-pop').hide();
                        window.show = !window.show;
                    } else if (dataObj.code == 1002) {
                        pop(dataObj.message);
                        $('.cmt-pop').hide();
                        window.show = !window.show;
                    } else {
                        pop('举报成功');
                        $('.cmt-pop').hide();
                        window.show = !window.show;
                    }
                    console.log(data)
                }
            });

        });
        window.view = {
            bind: function() {
                var _this = this;
                $('.cmt-pop').hide();
                window.show = true;
            },
            scrollLoad: function() {
                that = this;
                var generatedCount = 1;

                //滚动条视觉差
                $('#Jscroll').scroll(function() {
                    $('.cmt-pop').hide();
                    $('#Jinput').blur();
                    if ($('#Jcomment').children().length > 10) {
                        if ($('#Jscroll').scrollTop() > 50) {
                            $('#header').addClass('fix')
                            $('#Jscroll').addClass('comments-fix')
                        } else if ($('#Jscroll').scrollTop() < 50) {
                            $('#header').removeClass('fix')
                            $('#Jscroll').removeClass('comments-fix')
                        };
                    }
                });

                $('#Jmore').on('touchend', function() {
                    $('#Loadding').show();
                    $('#Jmore').hide();
                    setTimeout(function() {
                        $.ajax({
                            type: 'GET',
                            url: urlRoot + '/api/list_comment.jsp?&pageNo=' + (++generatedCount) + '&pageSize=20&match_id=' + itemId,
                            dataType: 'jsonp',
                            success: function(data) {
                                setHtml(data, 'Jcomment');
                                if (data.data.length == 0) {
                                    $('#Loadding').html('<span class="txt"> 没有更多了哦~~</span>');
                                }
                                $('#Loadding').hide();
                                $('#Jmore').show();
                            }
                        });
                        that.bind()
                    }, 1000);
                });
            },
            init: function() {
                var stockpile = {},
                    wechat = {},
                    lastFloor = {};
                $('#Jrefresh')[0].onclick = function() {
                    $('#Jcomment').html('').next('#Jnone').detach();
                    if ($('#Jcomment').children().length == 0) {
                        view.init()
                    }
                };
                // 比赛信息
                if (itemId) {
                    var ajaxAtate = 0;
                    $.ajax({
                        url: urlRoot + '/api/match_info.jsp?match_id=' + itemId + '&token=' + token,
                        type: 'GET',
                        dataType: 'jsonp',
                        success: function(data) {
                            ajaxAtate++;
                            var msg = data.data,
                                state = ['未开始', '进行中', '已结束']; //定义状态
                            $('#team_icon1,#JvsL img').attr({ //获取主队队徽
                                src: msg.team_icon1,
                                alt: msg.team_name1,
                                data: msg.team_id1
                            });
                            $('#team_icon2,#JvsR img').attr({ //获取客队队徽
                                src: msg.team_icon2,
                                alt: msg.team_name2,
                                data: msg.team_id2
                            });
                            $('title').html(msg.league + msg.round); //终端页 title
                            $('#team_name1, #JvsL p').html(msg.team_name1); //主队名
                            $('#team_name2, #JvsR p').html(msg.team_name2); //客队名
                            $('#Jvs').html(msg.team_score1 + ' - ' + msg.team_score2); //比分
                            $('#Jplan').html(state[msg.state - 1]); // 比赛状态

                            var l = msg.team_favorer1,
                                r = msg.team_favorer2,
                                a = l + r,
                                _l = (l / a).toFixed(2).slice(2, 4),
                                _r = (r / a).toFixed(2).slice(2, 4);
                            if ((r / a).toFixed(2) == 1.00) {
                                _r = 100;
                            }
                            if ((l / a).toFixed(2) == 1.00) {
                                _l = 100;
                            }
                            $('#Jprogress .left').css('width', _l + '%');
                            $('#Jprogress .right').css('width', _r + '%');
                            // 比分条算法获取

                            $('#Jnuml').html(l); //主队点赞数
                            $('#JnumR').html(r); //客队点赞数

                            if (msg.favorer == 1) {
                                $('#Jnav .left-good span').addClass('gooded'); //主队点赞后的状态
                                $('#JpopBtn').remove(); //如果点赞后，不要弹窗提示支持
                                $('#Jnav .troops-left span.crown').addClass('show-inline'); //点赞后加小皇冠
                            } else if (msg.favorer == 2) {
                                $('#Jnav .right-good span').addClass('gooded'); //客队点赞后的状态
                                $('#JpopBtn').remove(); //如果点赞后，不要弹窗提示支持
                                $('#Jnav .troops-right span.crown').addClass('show-inline'); //点赞后加小皇冠
                            }; //点赞的状态

                            $('#Jnav .left-good span,#JvsL').attr('data', msg.team_id1); //设置主队ID，存储data，方便使用
                            $('#Jnav .right-good span,#JvsR').attr('data', msg.team_id2); //设置客队ID，存储data，方便使用

                            var wavehtml = '';
                            for (var i = msg.team_wave1.length; i--;) {
                                wavehtml += '<li data="' + msg.team_wave1[i].date + '"><div class="box"><div class="dPic"><div class="img jcheer-img"><img src = "' + msg.team_icon1 + '" > </div></div><div class = "dInfo"><p class="Wave animation"></p><p class="get-c">' + msg.team_name1 + '球迷发起了第' + Number(i + 1) + '次人浪' + '</p > </div></div></li>'
                            };
                            for (var i = msg.team_wave2.length; i--;) {
                                wavehtml += '<li data="' + msg.team_wave2[i].date + '"><div class="box"><div class="dPic"><div class="img jcheer-img"><img src = "' + msg.team_icon2 + '" > </div></div><div class = "dInfo"><p class="Wave animation"></p><p class="get-c">' + msg.team_name2 + '球迷发起了第' + Number(i + 1) + '次人浪' + '</p > </div></div></li>'
                            };
                            $('#Jcomment').append(wavehtml);
                            stockpile.favorer = msg.favorer;
                            wechat.team_name1 = msg.team_name1;
                            wechat.team_name2 = msg.team_name2;
                            wechat.state = msg.state;
                            wechat.team_score1 = msg.team_score1;
                            wechat.team_score2 = msg.team_score2;
                            runAddGood();
                            manner();
                            defaultComment();
                        }
                    })
                };

                function defaultComment() {
                    if (ajaxAtate != 0) {
                        //默认的评论列表
                        $.ajax({
                            type: 'GET',
                            url: urlRoot + '/api/list_comment.jsp?&pageNo=1&pageSize=20&match_id=' + itemId,
                            dataType: 'jsonp',
                            success: function(data) {
                                if (data.data.length == 0) {
                                    $('#Jcomment').after('<div id="Jnone">暂无留言，快来抢沙发</div>');
                                    $('#Jmore').remove();
                                } else {
                                    setHtml(data, 'Jcomment');
                                    lastFloor.data = data.data[0].floor;
                                    console.log(lastFloor.data)
                                    if (lastFloor.data < 20) {
                                        $('#Jmore').remove()
                                    };
                                    if (lastFloor.data > 20) {
                                        $('#Jmore').show()
                                    };
                                }
                                ajaxAtate = 'ready'
                                weChatWrite();
                                update();
                            }
                        });
                    }
                }

                function manner() {
                    if (ajaxAtate != 0) {
                        $.ajax({
                            type: 'GET',
                            url: urlRoot + '/api/match_live.jsp?match_id=' + itemId,
                            dataType: 'jsonp',
                            success: function(data) {
                                var mannerMsg = data.list;
                                mannerHtml = '';
                                for (var i = 0; i < mannerMsg.length; i++) {
                                    mannerHtml += '<li data="' + mannerMsg[i].date + '"><a href="#/details/mannerview/' + mannerMsg[i].id + '"class="box manner-link"><div class="manner-dPic"><div class="img"><img alt="' + mannerMsg[i].content + '" src="' + mannerMsg[i].thumb[0] + '"></div></div><div class="manner-dInfo"><p class="title">' + mannerMsg[i].content + '</p><p class="get-c"><span class="gray">' + mannerMsg[i].comment + '评论</span></p><p class="get-g"><span class="gray">></span></p></div></a></li>';
                                };
                                $('#Jcomment').append(mannerHtml);
                            }
                        });
                    }
                }

                function weChatWrite() {
                    // 发表评论
                    var l = '';
                    if (lastFloor.data == 'undefined') {
                        l = 0;
                    } else if (lastFloor.data > 20) {
                        l = lastFloor.data;
                    } else if (l < 20) {
                        l = lastFloor.data;
                    };
                    $('#Jpublish').on('touchend', function() {
                        var txt = $('#Jinput').val(),
                            licon = $('#team_icon1').attr('src'),
                            ricon = $('#team_icon2').attr('src'),
                            lgooded = $('#Jnav .left-good span').hasClass('gooded'),
                            replyf = $('#Jinput').attr('data-f'),
                            reply = $('#Jinput').attr('data');

                        console.log(replyf)

                        if (txt == '') {
                            pop('评论不能为空');
                        } else if (txt != '') {
                            $.ajax({
                                type: 'POST',
                                url: urlRoot + '/api/create_comment.jsp?match_id=' + itemId + '&token=' + token + '&content=' + txt + '&reply=' + reply,
                                // dataType: 'jsonp',
                                success: function(data) {
                                    var dataObj = eval("(" + data + ")"); //post返回json对象处理
                                    if (dataObj.code == 100) {
                                        pop(dataObj.message);
                                    } else {
                                        pop('发表成功');
                                        html = '<li><div class="box"><div class="dPic"><div class="img"><img alt="' + name + '" src="' + avatar + '"></div><div class="medal"><img src="' + ((lgooded) ? (licon) : (ricon)) + '"></div></div><div class="dInfo"><p class="date"><span class="name">' + name + '</span><span class="time">' + (getNowFormatDate(y + '-' + m + '-' + d) + ' ' + h + ':' + ms + ':' + s) + ' <em>' + (++l) + '楼</em></span></p><p class="get-c">' + ((replyf != null && replyf != '') ? ('<span class="gray">回复' + replyf + '楼:</span>') : ('')) + txt + '</p></div><div class="cmt-pop"><span data="' + l + '" class="set-btn">回复</span><span data="" class="report">举报</span></div></div></li>';
                                        $('#Jcomment').prepend(html);
                                        $('#Jnone').remove();
                                        $('#Jinput').val('');
                                        $('#Jinput').attr('placeholder', '发表评论');
                                        $('#Jinput').attr('data', '');
                                        $('#Jinput').attr('data-f', '');
                                        $('#Jinput').blur();
                                    };
                                }
                            });

                        }
                    });
                }

                function update() {
                    if (ajaxAtate == 'ready' && $('#Jcomment').children().length!=0) {
                        var doms = document.getElementById('Jcomment').getElementsByTagName('li'),
                            lis = [].slice.call(doms);
                        lis.sort(function(a, b) {
                            var a1 = parseInt($(a).attr('data'), 10);
                            var b1 = parseInt($(b).attr('data'), 10);
                            return b1 - a1;
                        });
                        $('#Jcomment').empty();
                        var tmp = [];
                        for (var i = 0; i < lis.length; i++) {
                            tmp.push('<li>' + lis[i].innerHTML + '</li>');
                        }
                        $('#Jcomment').append(tmp.join(''));
                    }
                }

                $('#JpopBtn').on('touchend', function() {
                    $('#Jshade').show();
                    $('#Jpop').show();
                });

                $('#Jclose').on('touchend', function() {
                    $('#Jpop').hide();
                    $('#Jshade').hide();
                });

                $('#Jshare').on('touchend', function() { //分享按钮
                    $('#Jshade').show();
                    $('.wechat-share').show();
                    $('#Jpop').hide();

                });

                $('#Jshade').on('touchend', function() { //笼罩
                    if ($('.wechat-share').css('display') == 'block') {
                        $('#Jshade').hide();
                        $('.wechat-share').hide();
                    };
                });

                function maingood(obj) { //主队点赞函数
                    var g = $(obj).attr('data'),
                        l = Number($('#Jnuml').html()),
                        r = Number($('#JnumR').html()),
                        a = l + r + 1,
                        _l = ((l + 1) / a).toFixed(2).slice(2, 4),
                        _r = (r / a).toFixed(2).slice(2, 4);

                    if (((l + 1) / a).toFixed(2) == 1.00) {
                        _l = 100;
                    }

                    $.ajax({
                        type: 'POST',
                        url: urlRoot + '/api/favorer.jsp?match_id=' + itemId + '&token=' + token + '&team_id=' + g,
                        success: function(data) {
                            console.log(data)
                            var dataObj = eval("(" + data + ")"); //post返回json对象处理
                            if (dataObj.code == 100) {
                                pop(dataObj.message);
                            } else {
                                pop('支持成功');
                                $('#Jnav .left-good span').addClass('gooded');
                                $('#Jnav .troops-left .crown').addClass('show-inline');
                                $('#Jnav .progress-bar .right').css('width', _r + '%');
                                $('#Jnav .progress-bar .left').css('width', _l + '%');
                                $('#Jnuml').html(Number(l) + 1);
                            };

                        }
                    });
                }

                function subgood(obj) { //客队点赞函数

                    var g = $(obj).attr('data'),
                        l = Number($('#Jnuml').html()),
                        r = Number($('#JnumR').html()),
                        a = l + r + 1,
                        _l = (l / a).toFixed(2).slice(2, 4),
                        _r = ((r + 1) / a).toFixed(2).slice(2, 4);

                    if (((r + 1) / a).toFixed(2) == 1.00) {
                        _r = 100;
                    }

                    $.ajax({
                        type: 'POST',
                        url: urlRoot + '/api/favorer.jsp?match_id=' + itemId + '&token=' + token + '&team_id=' + g,
                        success: function(data) {
                            console.log(data)
                            var dataObj = eval("(" + data + ")"); //post返回json对象处理
                            if (dataObj.code == 100) {
                                pop(dataObj.message);
                            } else {
                                pop('支持成功');
                                $('#Jnav .right-good span').addClass('gooded');
                                $('#Jnav .troops-right .crown').addClass('show-inline');
                                $('#Jnav .progress-bar .left').css('width', _l + '%');
                                $('#Jnav .progress-bar .right').css('width', _r + '%');
                                $('#JnumR').html(Number(r) + 1);
                            };

                        }
                    });
                };

                function runAddGood() {
                    if (stockpile.favorer == 0) {
                        //小手主队点赞
                        $('#Jnav .left-good span').on('touchend', function() {
                            maingood($(this));
                            $('#Jnav .left-good span').off(); //取消所有事件
                            $('#Jnav .troops-left img').off(); //取消所有事件
                            $('#Jnav .troops-right img').off(); //取消所有事件
                            $('#Jnav .right-good span').off(); //取消所有事件
                            $('#JpopBtn').remove();
                        });

                        //小手客队点赞 
                        $('#Jnav .right-good span').on('touchend', function() {
                            subgood($(this));
                            $('#Jnav .right-good span').off(); //取消所有事件
                            $('#Jnav .troops-left img').off(); //取消所有事件
                            $('#Jnav .troops-right img').off(); //取消所有事件
                            $('#Jnav .left-good span').off(); //取消所有事件
                            $('#JpopBtn').remove();
                        });

                        //队徽主队点赞
                        $('#Jnav .troops-left img').on('touchend', function() {
                            maingood($(this));
                            $('#Jnav .troops-left img').off(); //取消所有事件
                            $('#Jnav .left-good span').off(); //取消所有事件
                            $('#Jnav .right-good span').off(); //取消所有事件
                            $('#Jnav .troops-right img').off(); //取消所有事件
                            $('#JpopBtn').remove();
                        });

                        //队徽客队点赞 
                        $('#Jnav .troops-right img').on('touchend', function() {
                            subgood($(this));
                            $('#Jnav .troops-right img').off(); //取消所有事件
                            $('#Jnav .left-good span').off(); //取消所有事件
                            $('#Jnav .right-good span').off(); //取消所有事件
                            $('#Jnav .troops-left img').off(); //取消所有事件
                            $('#JpopBtn').remove();
                        });

                        //主队弹窗点赞
                        $('#JvsL').on('touchend', function() {
                            maingood($(this))
                            $('#Jpop').hide();
                            $('#JpopBtn').remove();
                            $('#JvsR').off();
                            $('#Jnav .right-good span').off();
                            $('#Jnav .left-good span').off();
                            $('#Jnav .troops-left img').off();
                            $('#Jnav .troops-right img').off();
                            $('#Jshade').hide();
                        });

                        //客队弹窗点赞
                        $('#JvsR').on('touchend', function() {
                            subgood($(this))
                            $('#Jpop').hide();
                            $('#JpopBtn').remove();
                            $('#JvsL').off();
                            $('#Jnav .right-good span').off();
                            $('#Jnav .left-good span').off();
                            $('#Jnav .troops-left img').off();
                            $('#Jnav .troops-right img').off();
                            $('#Jshade').hide();
                        });

                    } else {
                        $('#Jnav .left-good span,#Jnav .right-good span,#Jnav .troops-left img,#Jnav .troops-right img').on('touchend', function() {
                            pop('亲，您已支持过了。')
                        });
                    };
                }
                view.scrollLoad();
            }

        }

        if (flag === 1) {
            view.init();
        };
    };

var routes = {
    '/item': item,
    '/details': [details, function() { //态度列表
        // console.log("An inline route handler.");
    }],
    '/details/view/:bookId': detail,
    '/details/mannerview/:bookId': manner
};

var router = Router(routes);
router.configure({
    on: allroutes
});
router.init();

if (window.location.hash.slice(1) == '') {
    window.location.href = '#/item';
}