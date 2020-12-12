var prop_appsumt_id = '',
    //发起任务id
    prop_appsuma_id = ''; //发起活动id
var prop_is_master = true,
    prop_master_id = '';

var prop_frist_in = false;
var prop_game_count = 0;
var prop_light_control = 2;
var prop_page = 1;
var prop_page_size = 10;
var prop_list_count = 0;

func_wx_ready(function () {

    var isPageHide = false;
    window.addEventListener('pageshow', function () {
        if (
            isPageHide) {
            window.location.reload();
        }
    });
    window.addEventListener('pagehide', function () {
        isPageHide = true;
    });

    // func_get_last();
    func_get_config()
    prop_appsumt_id = GetQueryString('appsumt_id');
    prop_appsuma_id = GetQueryString('master_id');



    // 主人背景
    $('.container').css('background', 'url(http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/a_index_bg.png?v1) no-repeat 0 0/100% auto,#ffdae5');
    $('.my_pk_info').css('background', 'url(http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/a_myInfo.png)no-repeat center/cover');
    $('.chest_box_wrap').css('background', 'url(http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/chest_box_wrap.png)no-repeat center/cover');
    $('.a_pkRecord').css('background', 'url(http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/a_pkRecord.png) no-repeat 0 0/100% 100%');



    // $('.prizeProgress_area').css('background', 'url(http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/a_prize_progress_bg.png) no-repeat 0 0/100% 100%');
    // $('.win_schedule').css('background', 'url(http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/win_schedule_bg.png) no-repeat center center/80% auto');
    // $('.pkRecord_area').css('background', 'url(http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/pkRecord_area_bg.png) no-repeat 0 0/100% 100%');


    // $('.prize_box_area').css('background', 'url(http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/a_pri_progress_bg.png) no-repeat 0 0/100% 100%');
    $('.left_canOpenBox').css('background', 'url(http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/a_left_box_tips_bg.png) no-repeat 0 0/100% 100%');



    // 好友
    $('#page_friend').css('background', '#ffffe8 url("http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/dare_bg.png") no-repeat left top / 100% auto');
    $('.dare_box').css('background', 'url("http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/dare_box.png") no-repeat center / cover');

    // $('.dare_mask .box_left').css('background', 'url("http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/box_left.png") no-repeat center / cover');
    // $('.dare_mask .box_right').css('background', 'url("http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/box_right.png") no-repeat center / cover');
    // $('.prize_box_area').css('background', 'url(http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/a_pri_progress_bg.png) no-repeat 0 0/100% 100%');
    // $('.left_canOpenBox').css('background', 'url(http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/a_left_box_tips_bg.png) no-repeat 0 0/100% 100%');


    $(".rule_content").find('ol').html(PROP_DESC)


    $('.btn_rule').click(function () {
        $('.rule_mask').show();
        $('.rule_box').removeClass('out').addClass('in');
    });
    $('.rule_mask .rule_close').click(function () {
        $('.rule_box').removeClass('in').addClass('out');
        setTimeout(function () {
            $('.rule_mask').hide();
        }, 800);
    });
});


/*获取配置*/
function func_get_config() {
    $.ajax({
        url: 'zz_api__bapi__act_get_config',
        type: 'post',
        success: function success(data) {
            func_get_config_success(data);
        },
        error: function error(data) {
            console.log(data);
        },
    });
}

function func_get_config_success(data) {
    console.log(data);

    if (!data.errcode) {

        // var userName =
        //     data.wx_user.wxuser_nickName.length > 6
        //         ? data.wx_user.wxuser_nickName.substr(0, 5) + '...'
        //         : data.wx_user.wxuser_nickName;

        if (data.act_status == '已结束') {
            func_alert_callb('活动已结束', function () {
                wx.closeWindow();
            });
            return;
        } else {
            $('.user1').prop('src', data.wx_user.wxuser_headimgurl);
            $('.user2').prop('src', data.master.wxuser_headimgurl);
            $('.user_name1').html(data.wx_user.wxuser_nickName);
            $('.user_name2').html(data.master.wxuser_nickName);
            if (!data.master || data.wx_user.wxuser_openid === data.master.wxuser_openid) {
                prop_is_master = true;
                func_get_last();

            } else {
                $('#page_friend').show();
                prop_is_master = false;
                // ok主人好友全部传到b页面


                const audio = document.getElementById('audio');
                audio.src = 'http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/click.mp3';
                $(".btn_pk").click(function () {
                    if (typeof WeixinJSBridge === 'object') {
                        WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                            audio.play();
                        });
                    }
                    var search = window.location.search;
                    window.location = 'a__item_file__b_index' + search;
                });
            }
            $('.a_pri_box,.a_btn_ling').click(function () {
                window.location.href = 'a__item_file__c_index';
            });
        }
    } else {
        alert(data.errmsg);
    }
}

//  查询游戏次数
function func_game_left_count() {
    $.ajax({
        url: 'zz_api__bapi__data_game_get_game_left_count',
        type: 'post',
        data: {},
        success: function success(data) {
            func_game_left_count_success(data);
        },
        error: function error(data) {
            console.log(data);
        },
    });
}

function func_game_left_count_success(data) {
    console.log('func_game_left_count', data);

    if (data.errcode == 0) {
        prop_game_count = data.left;
        $('.left_play_count span').html(prop_game_count);
        // 苇茗城
        if (prop_game_count > 0) {

        } else {
            $('#btn_start_game').addClass('filter');

        }
        const audio = document.getElementById('audio');
        audio.src = 'http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/click.mp3'
        // audio.play();
        $(".a_btn_start").click(function () {
            if (prop_game_count > 0) {
                if (typeof WeixinJSBridge === 'object') {
                    WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                        audio.play();
                    });
                }
                var search = window.location.search;
                window.location = 'a__item_file__b_index' + search;
            } else {
                alert('游戏次数不足');
            }

        });
        console.log(prop_game_count);
    } else {
        console.log(data.errmsg);
    }
}

/*获取最后一条发起记录*/
function func_get_last() {
    var url = 'zz_api__bapi__launch_get_last';

    $.ajax({
        dataType: "json",
        url: url,
        data: {
            get_data: 1
        },
        //////////////////////////////////////////////////
        success: function success(data, textStatus, jqXHR) {
            setTimeout(function () {
                func_get_last__success(data, textStatus, jqXHR);
            }, 100);
        },
        //////////////////////////////////////////////////
        error: function error(data, textStatus, jqXHR) {
            alert("系统繁忙，请稍后再试");
        }
    });
}
function func_get_last__success(data, textStatus, jqXHR) {
    console.log(data);
    console.log(textStatus);
    console.log(jqXHR);

    if (data.errcode == 0) {
        prop_appsuma_id = data.master.appsuma_id;
        prop_appsumt_id = data.master_task.appsumt_id;
        $('.pkValue span').html(data.launch_data.firend_help_count);
        $('.cupValue span,.pri_box_count').html(data.launch_data.power_count);
        $('.cupValue span').html(data.launch_data.power_count);
        $('.bestRecord span').html(data.launch_data.game_fun);
        $('.goldValue span').html(data.launch_data.power);

        $('.has_join span').html(data.master.appsuma_key_auto);
        $('.share_best').click(function () {
            window.location.href =
                'a__wx_share_re?page=' +
                encodeURIComponent(
                    'a__item_file__s_index?master_id:' +
                    prop_appsuma_id +
                    ',appsumt_id:' + prop_appsumt_id + ',appsud_id:' + data.launch_data.max_id + ',fun:' + data.launch_data.game_fun + ',game_floor:' + data.launch_data.max_int_02
                );
        });
        func_game_left_count();
        func_help_list();
        $('#page_master').show();

    } else {
        if (data.errcode == -100) {
            func_launch()
        } else {
            alert(data.errmsg);
        }
    }
}


/*发起活动*/
function func_launch() {
    $.ajax({
        url: 'zz_api__bapi__launch',
        type: 'post',
        data: {
            master_help: 1,
            add_power: 1
        },
        success: function success(data) {
            func_launch_success(data);
        },
        error: function error(data) {
            console.log(data);
        },
    });
}

function func_launch_success(data) {
    if (!data.errcode) {
        func_get_last();
    } else {
        alert(data.errmsg);
    }

}


function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
function GetUrlStr(name) {
    var a = GetQueryString('wx_word');
    var arr = a.split('$');
    var _json = {};
    for (var i = 0; i < arr.length; i++) {
        _json[arr[i].split(':')[0]] = arr[i].split(':')[1];
    }

    return _json[name];
}





$(function () {
    ; (function ($) {
        var style = "<style>#toast{position: fixed;top: 0;left: 0;right: 0;bottom: 0;display: flex;display: -webkit-flex;justify-content:center;align-items: center;z-index:9999;}.toast_cont{padding:.5rem 1rem;border-radius: 5px;max-width:10rem;color: white;text-align: center;font-size: 0.7rem;background: rgba(0,0,0,0.9);}</style>";
        var html = '<div id="toast" style="display:none;"><div class="toast_cont"></div></div>';
        $('body').append(html);
        $('head').append(style);
        $.fn.toast = function (content, time) {
            var t = $(this);
            t.find(".toast_cont").html(content);
            t.fadeIn();

            setTimeout(function () {
                t.fadeOut();
            }, time)
        }
    })($);

});


function func_help_list() {
    $.ajax({
        url: "zz_api__bapi__help_list",
        type: "post",
        data: {
            master_id: prop_appsuma_id,
            exclude: 1,
            page_size: prop_page_size,
            page: prop_page
            // power: 30
        },
        success: function success(data) {
            setTimeout(function () {
                func_help_list_success(data);
            }, 100);
        },
        error: function error(data) {
            console.log(data);
        }
    });
}

function func_help_list_success(data) {
    console.log(data);
    if (!data.errcode) {
        let html = '';
        prop_list_count += data.list.length;
        for (let i = 0; i < data.list.length; i++) {
            const item = data.list[i];
            if (item.appsuh_add_power >= 30) {
                html += `
                <div class="player_data">
                        <img src="${item.wxuser_headimgurl}" alt=""
                            class="player_headPic">
                        <div class="player_info">
                            <div class="name_time">
                                <span>${item.wxuser_nickName}</span>
                            </div>
                            <div class="score_wrap">
                                <span>${item.appsuh_int_00}</span>分
                                <div class="player_pk_status">对手挑战失败</div>
                            </div>
                            <div class="box_status">
                                喜提对手宝箱
                                <img src="http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/a_pri_box.png" class="box_win" alt="">
                            </div>
                        </div>
                    </div>`;
            } else {
                html += `
                <div class="player_data">
                        <img src="${item.wxuser_headimgurl}" alt=""
                            class="player_headPic">
                        <div class="player_info">
                            <div class="name_time">
                                <span>${item.wxuser_nickName}</span>
                            </div>
                            <div class="score_wrap gray">
                                <span>${item.appsuh_int_00}</span>分
                                <div class="player_pk_status">对手挑战成功</div>
                            </div>
                            <div class="box_status gray">
                                错失对手宝箱
                                <img src="http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/a_box_disable.png" class=""
                                    alt="">
                            </div>
                        </div>
                    </div>`;
            }

        }
        $('.pkRecord_player_list').append(html);
        $('.box_win').click(function () {
            window.location.href = 'a__item_file__c_index';
        });

        if (prop_list_count < data.total) {
            $('.look_more').show();
        } else {
            $('.look_more').hide();
        }

        $('.look_more').off().click(function () {
            prop_page++;
            func_help_list();
        });

    } else {
        console.log(data.errmsg);

    }

}

//获取地址参数
/**
 * @return {string}
 */
// function GetQueryString(name) {
//     var reg = new RegExp("&?" + name + "(?:=|:)([^\$&,]*)", 'gi');
//     // console.log(reg)
//     // console.log(decodeURIComponent(window.location.search.substr(1)))
//     var id = '';
//     decodeURIComponent(window.location.search.substr(1)).replace(reg, function ($1, $2) {
//         // console.log(arguments)
//         // console.log($2)
//         id = $2;
//     });
//     // console.log(id)
//     return id;
// }