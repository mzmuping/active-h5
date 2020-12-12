var prop_appsumt_id = '',
    //发起任务id
    prop_appsuma_id = ''; //发起活动id
var prop_is_master = true,
    prop_master_id = '';

var prop_frist_in = false;
var prop_game_count = 0;
var prop_light_control = 2;
var page = 1;
var page_size = 6;
var chou_count = 0;
var prop_chou_count = 0;
var list_count = 0;

const audio = document.getElementById('audio');
audio.src = 'http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/baoxiang.mp3';
func_wx_ready(function () {

    // func_get_last();
    func_get_config()

    // 主人背景
    $('.prize_container').css('background', '#ffffe8 url("http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/prize_main_bg.png") no-repeat left top / 100% auto');
    $('.prize_content').css('background','url("http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/c_prize_box.png") no-repeat left top /cover')

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

    $('.btn_back_home').click(function(){
        window.location.href = 'a__item_file__index';
    });

    $('.btn_close').click(function(){
        $('.prize_mask').hide();
    })



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
            // chou_count = data.chou_count;
            $('.my_prize,.float_prize').click(function(){
                window.location.href = '/word_re?site_id='+ data.wx_user.wxuser_site_id +'&word=prize_b'
            });
            func_get_last()
        }
    } else {
        alert(data.errmsg);
    }
}


/*获取最后一条发起记录*/
function func_get_last() {
    var url = 'zz_api__bapi__launch_get_last';

    $.ajax({
        dataType: "json",
        url: url,
        data: {
            get_data:1
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
        console.log(data.launch_data.power_count,chou_count);
        
        prop_chou_count = data.launch_data.power_count - chou_count;
        func_help_list(page);
        
        // const $box_item = $('.prize_box_disable');
        // const $unlock_time_wrap = $('.unlock_time_wrap');
        // for(let i = 0; i < data.launch_data.power_count;i++){
        //     $box_item.eq(i).prop('src','http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/prize_box_close.png').addClass('prize_box_close').removeClass('prize_box_disable');
        //     $unlock_time_wrap.eq(i).hide();
        // }


        
        // $('#page_master').show();

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
            add_power:1
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


function func_chou(_appsumt_id,that){
    var url = 'zz_api__bapi__chou';

    $.ajax({
        dataType: "json",
        url: url,
        data: {
            appsumt_id: _appsumt_id
        },
        //////////////////////////////////////////////////
        success: function success(data, textStatus, jqXHR) {
            setTimeout(function () {
                func_chou__success(data, textStatus, jqXHR,that);
            }, 100);
        },
        //////////////////////////////////////////////////
        error: function error(data, textStatus, jqXHR) {
            alert("系统繁忙，请稍后再试");
        }
    });
}
function func_chou__success(data, textStatus, jqXHR,that) {
    console.log(data);
    console.log(textStatus);
    console.log(jqXHR);

    if (data.errcode == 0) {

        if(typeof WeixinJSBridge === 'object'){
            WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
                audio.play();
            });
        }
        prop_chou_count--;
        $(".chou_times span").html(prop_chou_count);

        var pic,txt;
        if (data.appsup_name) {
            pic = data.appsup_prize_pic_s;
            txt = data.appsup_name;
            $('.prize_mask').show();
            $(that).prop('src','http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/prize_box_open.png').removeClass('prize_box_close').addClass('prize_box_open').off();
        } else {
            pic = '{$APP_SUPER_IMG_ROOT}/noprise_img.png';
            txt = '很遗憾，没有中奖哦~';
        }

        if( prop_chou_count>0 ){
            $('.btn_again').show();
        }


    } else {
        alert(data.errmsg);
    }
}


function func_help_list(page) {
    $.ajax({
        url: "zz_api__bapi__help_list",
        type: "post",
        data: {
            master_id: prop_appsuma_id,
            exclude: 1,
            power: 30,
            page:page,
            page_size:page_size,
            order_type:1
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
    if(!data.errcode){
        chou_count = data.chou_count;
        const open_page = Math.ceil(chou_count / 6);
        const all_open_page = Math.floor(chou_count / 6)
        const open_num = chou_count % 6;
        console.log(open_page,open_num);
        
        const has_page = Math.ceil(data.total / page_size);
        $('.total span').html(has_page);

        if (has_page > 1){
            let numHTML = '';
            for(let n = 1; n <= has_page;n++){
                numHTML+= `<span ${page == n ? 'class="active"':''}>${n}</span>`;
            }
            $('.switch_page').html(numHTML);
        }else{
            $('.pages_wrap').hide();
        }

        $('.switch_page span').click(function(){
            // $(this).addClass('active').siblings().removeClass('active');
            page = $(this).html();
            func_help_list(page);
        });
        
        let html = '';
        for(let i =0;i < data.list.length;i++){
           const item = data.list[i];
           if (all_open_page >= page){
            html+=`
                <div class="box_item">
                    <img src="http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/prize_box_open.png" class="prize_box_open" alt="">
                    <div class="user_pk_info">
                        <div class="avatar_wrap">
                            <img src="${item.wxuser_headimgurl}" alt="">
                        </div>
                        <div class="win_success">
                            <p>战胜<span>${item.wxuser_nickName}</span></p>
                            <p>获得的宝箱</p>
                        </div>
                    </div>
                </div>`;
            }else{
                if (open_page >= page && open_num > i){
                    html+=`
                    <div class="box_item">
                        <img src="http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/prize_box_open.png" class="prize_box_open" alt="">
                        <div class="user_pk_info">
                            <div class="avatar_wrap">
                                <img src="${item.wxuser_headimgurl}" alt="">
                            </div>
                            <div class="win_success">
                                <p>战胜<span>${item.wxuser_nickName}</span></p>
                                <p>获得的宝箱</p>
                            </div>
                        </div>
                    </div>`;
                    }else{
                        html+=`
                        <div class="box_item">
                            <img src="http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/prize_box_close.png" class="prize_box_close" alt="">
                            <div class="user_pk_info">
                                <div class="avatar_wrap">
                                    <img src="${item.wxuser_headimgurl}" alt="">
                                </div>
                                <div class="win_success">
                                    <p>战胜<span>${item.wxuser_nickName}</span></p>
                                    <p>获得的宝箱</p>
                                </div>
                            </div>
                        </div>`;
                    }
            }
           
            
        }
        for(let j = 0; j < 6 - data.list.length;j++){
            html+=`
            <div class="box_item">
                <img src="http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/prize_box_disable.png" class="prize_box_disable" alt="">
                <div class="unlock_time_wrap">
                    <img src="http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/suo.png" class="suo" alt="">
                    <!--<div class="unlock_time">
                        5月11日<br>
                        22点解锁
                    </div>-->
                </div>
                <div class="user_pk_info">
                    <div class="avatar_wrap">
                        <img src="http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/avatar_pk.png" alt="">
                    </div>
                    <div class="win_success">
                        待PK
                    </div>
                </div>
            </div>`;
        }
        $('.prize_main').html(html);

        $('.prize_box_close').off().click(function(){
            func_chou(prop_appsumt_id,this);
        });

    }else{

    }

}