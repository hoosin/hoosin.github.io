(function() {

    $('#Jitem').before('<div id="JpopE"></div>');//弹窗装载

    function getQueryString(name) { //获取url参数
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"),
            r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    };

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

    function getNowFormatWeek(getData) { //星期算法
        var arys1 = [],
            riqi = getData,
            arys1 = riqi.split('-'),
            ssdate = new Date(arys1[0], parseInt(arys1[1] - 1), arys1[2]),
            ssdateTxt = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        return ssdateTxt[ssdate.getDay()]
    };

    function GetDateStr(AddDayCount) { //日期算法
        var dd = new Date();
        dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期 
        var y = dd.getFullYear();
        var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1); //获取当前月份的日期，不足10补0
        var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
        return y + "-" + m + "-" + d;
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

    var myDate = new Date(),
        y = myDate.getFullYear(),
        m = myDate.getMonth(),
        d = myDate.getDate(),
        today = getNowFormatDate(y + '-' + m + '-' + d), //获取到当前客户端时间 2014-11-03
        ajaxBefore = GetDateStr(-2), //一个星期前
        ajaxAfter = GetDateStr(7), //一个星期后
        loadingDay = GetDateStr(8), //一个星期后
        urlRoot = 'http://api.51viper.com';

    /**
     * log.debug('debug')
     * start
     */

    console.log('动态加载前：' + ajaxBefore);
    console.log('动态加载后：' + ajaxAfter);
    console.log('动态加载开始的日期：' + loadingDay);
    console.log('今天日期：' + today);

    console.log('昨天：' + GetDateStr(-1));
    console.log('明天：' + GetDateStr(1));

    /**
     * log.debug('debug')
     * end
     */

    // setHtml
    function setHtml(data, obj, pull) {
        var msg = data.data,
            state = ['未开始', '比赛中', '已结束'],
            tag = ['tag tag-no', 'tag', 'tag tag-no'],
            html = '';

        for (var key in msg) {
            if (msg[key] != 0) {
                html += '<li>'

                if (key == today) {
                    html += '<div id="Jtoday" class="item-tit">' + key + ' ' + '今天' + '</div>'
                } else if (key == GetDateStr(1)) {
                    html += '<div class="item-tit">' + key + ' ' + '明天' + '</div>'
                } else if (key == GetDateStr(-1)) {
                    html += '<div class="item-tit">' + key + ' ' + '昨天' + '</div>'
                } else {
                    html += '<div class="item-tit">' + key + ' ' + getNowFormatWeek(key) + '</div>';
                };
                for (var i = 0; i < msg[key].length; i++) {
                    html += '<div class="item-list"><a href="#/details/view/' + msg[key][i].id + '"><div class="troops troops-left"><img alt="' + msg[key][i].team_name1 + '" src="' + msg[key][i].team_icon1 + '"><p>' + msg[key][i].team_name1 + '</p></div><div class="troops-msg"><p class="troops-plan">' + msg[key][i].league + msg[key][i].round + '</p><p class="troops-vs">' + ((msg[key][i].state != 1) ? (msg[key][i].team_score1 + ':' + msg[key][i].team_score2) : 'VS') + '</p><p class="troops-state">' + ((msg[key][i].state == 1) ? ('<span class="time">' + getTime(msg[key][i].time).substring(11, 16) + '</span>') : '') + '<span class="' + tag[msg[key][i].state - 1] + '">' + state[msg[key][i].state - 1] + '</span></p></div><div class="troops troops-right"><img alt="' + msg[key][i].team_name2 + '" src="' + msg[key][i].team_icon2 + '"><p>' + msg[key][i].team_name2 + '</p></div></a></div>'
                };
                html += '</li>'
            };
        }

        if (pull == 'pullDown') {
            $('#' + obj).prepend(html);
        } else {
            $('#' + obj).append(html);
        };
    };

    $('#Jitem').html('<div class="comment"><div id="pullDown"><span class="pullDownIcon"></span><span class="pullDownLabel">下拉加载历史信息...</span></div><div id="Jlist"></div><div id="pullUp"><span class="pullUpIcon"></span><span class="pullUpLabel">上拉加载更多...</span></div></div>')


    window.app = {
        myScroll: {},
        main: function() {
            var wechat = {};
            var fromId = localStorage.appId;
            console.log('离线localStorage:' + fromId)
            $.ajax({
                type: 'POST',
                url: urlRoot + '/api/auth.jsp?uid=' + fromId + '&from=3&udid=' + fromId,
                success: function(data) {
                    var dataObj = eval("(" + data + ")");
                    if (dataObj.code == 100) {
                        alert(dataObj.message);
                    } else {
                        wechat.token = dataObj.token;
                        wechatInfo();
                    };
                    console.log('tokenmsg:' + dataObj.token)
                }
            });

            function wechatInfo() {
                $.ajax({
                    type: 'GET',
                    url: 'http://weixin.51viper.com/api/user/userinfo.jsp?id=' + fromId,
                    success: function(data) {
                        var dataObj = eval("(" + data + ")");
                        wechat.name = dataObj.nickname,
                            wechat.avatar = dataObj.avatarUrl,
                            wechat.location = dataObj.address;
                        wechatUpdate()
                    }
                });

                function wechatUpdate() {
                    $.ajax({
                        type: 'POST',
                        url: urlRoot + '/api/update.jsp?token=' + wechat.token + '&nickname=' + wechat.name + '&location=' + wechat.location + '&head=' + wechat.avatar,
                        success: function(data) {
                            var dataObj = eval("(" + data + ")");
                            if (dataObj.code == 0) {
                                //存储信息
                                localStorage.tName = wechat.token;
                                localStorage.wechatName = wechat.name;
                                localStorage.wechatAvatar = wechat.avatar;
                                //存储信息
                                console.log('localStorage-token:' + localStorage.tName)
                                console.log('localStorage-wechatName:' + localStorage.wechatName)
                                console.log('localStorage-wechatAvatar:' + localStorage.wechatAvatar)
                            } else {
                                alert(dataObj.message)
                            };

                        }
                    });

                }
            }

            app.scrollLoad();
            //当前的默认列表
            $.ajax({
                type: 'GET',
                url: urlRoot + '/api/list_match.jsp?begin=' + ajaxBefore + '&end=' + ajaxAfter,
                dataType: 'jsonp',
                success: function(data) {
                    setHtml(data, 'Jlist');
                    window.app.myScroll.refresh();
                    window.app.myScroll.scrollToElement('#Jtoday', 100);
                    $('#pullDown, #pullUp').css('opacity', 1)
                }
            });
        },
        scrollLoad: function() {

            var pullDownEl, pullDownOffset,
                pullUpEl, pullUpOffset,
                pullUp = 7,
                pullDown = -2;

            /**
             * 下拉刷新 （自定义实现此方法）
             * window.app.myScroll.refresh();     // 数据加载完成后，调用界面更新方法
             */
            function pullDownAction() {
                setTimeout(function() {
                    $.ajax({
                        type: 'GET',
                        url: urlRoot + '/api/list_match.jsp?begin=' + GetDateStr(--pullDown) + '&end=' + GetDateStr(pullDown),
                        dataType: 'jsonp',
                        success: function(data) {
                            setHtml(data, 'Jlist', 'pullDown');
                            window.app.myScroll.refresh();
                        }
                    });
                }, 1000);
            }


            /**
             * 滚动翻页 （自定义实现此方法）
             * window.app.myScroll.refresh();      // 数据加载完成后，调用界面更新方法
             */
            function pullUpAction() {
                setTimeout(function() {
                    $.ajax({
                        type: 'GET',
                        url: urlRoot + '/api/list_match.jsp?begin=' + GetDateStr(++pullUp) + '&end=' + GetDateStr(pullUp),
                        dataType: 'jsonp',
                        success: function(data) {
                            setHtml(data, 'Jlist', 'pullUp');
                            window.app.myScroll.refresh();
                        }
                    });
                }, 1000);
            }

            /**
             * 初始化iScroll控件
             */
            function loaded() {
                pullDownEl = document.getElementById('pullDown');
                pullDownOffset = pullDownEl.offsetHeight;
                pullUpEl = document.getElementById('pullUp');
                pullUpOffset = pullUpEl.offsetHeight;

                window.app.myScroll = new iScroll('Jitem', {
                    scrollbarClass: 'myScrollbar',
                    /* 重要样式 */
                    useTransition: false,
                    topOffset: pullDownOffset,
                    onRefresh: function() {
                        if (pullDownEl.className.match('loading')) {
                            pullDownEl.className = '';
                            pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉加载历史信息...';
                        } else if (pullUpEl.className.match('loading')) {
                            pullUpEl.className = '';
                            pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                        }
                    },
                    onScrollMove: function() {
                        if (this.y > 5 && !pullDownEl.className.match('flip')) {
                            pullDownEl.className = 'flip';
                            pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
                            this.minScrollY = 0;
                        } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                            pullDownEl.className = '';
                            pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                            this.minScrollY = -pullDownOffset;
                        } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                            pullUpEl.className = 'flip';
                            pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
                            this.maxScrollY = this.maxScrollY;
                        } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                            pullUpEl.className = '';
                            pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                            this.maxScrollY = pullUpOffset;
                        }
                    },
                    onScrollEnd: function() {
                        if (pullDownEl.className.match('flip')) {
                            pullDownEl.className = 'loading';
                            pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
                            pullDownAction(); // Execute custom function (ajax call?)
                        } else if (pullUpEl.className.match('flip')) {
                            pullUpEl.className = 'loading';
                            pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
                            pullUpAction(); // Execute custom function (ajax call?)
                        }
                    }
                });

                setTimeout(function() {
                    document.getElementById('Jitem').style.left = '0';
                }, 800);
            }

            //初始化绑定iScroll控件 
            document.getElementById('Jitem').addEventListener('touchmove', function(e) {
                e.preventDefault();
            }, false);
            document.addEventListener('DOMContentLoaded', loaded, false);
        }
    }


    if (localStorage.getItem('Readys')) {
        localStorage.appId = getQueryString('id');
        app.main()
        localStorage.removeItem('Readys');
    } else if (localStorage.getItem('appId')) {
        app.main()
    } else {
        localStorage.Readys = 'yes';
        // location.href = 'http://192.168.0.179/wechatapp/app.html?id=ofMzgsn8xZblyvZsWzVYjeZRFoLU#/item'
        location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxed5251def0b30178&redirect_uri=http%3A%2F%2Fweixin.51viper.com%2Fapi%2Fuser%2Foauth.jsp&response_type=code&scope=snsapi_base&state=%7B%22cid%22%3A32%7D#wechat_redirect';
    }

})()