var prop_fen;

func_wx_ready(function () {

    /**如果需要修改iframe的样式 */

        var styleText = `.poster{width:76vw;}`;
        window.parent.postMessage({styleText:styleText}, '*'); 
    /**如果需要修改iframe的样式 */


    /**如果需要执行某些js代码 */
    // var jscode = `$('#poster').click(function(){alert(1)})`;
    // window.parent.postMessage({jscode:jscode}, '*'); 

    /**如果需要执行某些js代码 */

    

    // $('.container').css('background','#b6df99 url({$APP_SUPER_IMG_ROOT}/s_haibao_bg.png) no-repeat center top/100% 100%');
    $('.container').css('background','#abe4ef');


    var prop_appsumt_id ='';
    var prop_appsuma_id ='';
    var share_link = '';
    var wxuser_openid = '';
    var wxuser_nickName = '';
    var act_key = '';
    var fun = GetQueryString('fun');
    var game_floor = GetQueryString('game_floor');
    // var appsud_id =window.location.search.substring(window.location.search.indexOf('appsud_id=')+10);
    var appsud_id =GetQueryString('appsud_id');

    console.log('appsud_id='+appsud_id);
    console.log(fun);
    
    
    $.when(
        // $.getScript("https://cdnjs.cloudflare.com/ajax/libs/jquery_lazyload/1.9.7/jquery.lazyload.min.js"),
        $.getScript("a__item_file__a_config?{$V}"),
    ).done(function () {
        console.log(arguments)

        scriptLoad();
    });



    function scriptLoad() {
        func_get_last();
        // func_get_config();
    }



    function func_get_last() {
        var url = 'zz_api__bapi__launch_get_last';
        $.ajax({
            dataType: "json",
            url: url,
            data: {},
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
            //func_card_list(prop_appsuma_id);
            prop_appsuma_id = data.master.appsuma_id;
            prop_appsumt_id = data.master_task.appsumt_id;



           if (data.master.appsuma_pic_00){
                window.parent.postMessage({poster:data.master.appsuma_pic_00}, '*'); 
                $('.send').click(function(){
                    window.parent.postMessage({sendTips:true,msg:'海报将从公众号发出，请关闭此页'},'*'); 
                });
                listenMessage(data.master.appsuma_pic_00);
                
           }else{
                func_get_config();
           }


            
        } else if (data.errcode == -100) {
            //没有发起记录
            // func_launch();

        } else {
            alert(data.errmsg);
        }

    }

    

    /*获取应用配置信息*/
    function func_get_config() {
        var url = 'zz_api__bapi__act_get_config';

        $.ajax({
            dataType: "json",
            url: url,
            data: {},
            success: function success(data, textStatus, jqXHR) {
                setTimeout(function () {
                    func_get_config__success(data, textStatus, jqXHR);
                }, 100);
            },
            error: function error() {
                alert("系统繁忙，请稍后再试");
            }
        });
    }

    function func_get_config__success(data, textStatus, jqXHR) {
        console.log(data);
        console.log(textStatus);
        console.log(jqXHR);
        shareData = {};
        if (data.errcode == 0) {
            console.log(',master_id:' + prop_appsuma_id + ',appsumt_id:' + prop_appsumt_id);
            console.log(window.location.search);
            wxuser_openid = data.wx_user.wxuser_openid;
            wxuser_nickName = data.wx_user.wxuser_nickName;
            act_key = data.key;
            var urlParam;
            if (data.master == '' || data.master.wxuser_openid == data.wx_user.wxuser_openid) {
                urlParam = 'master_id:' + prop_appsuma_id + ',appsumt_id:' + prop_appsumt_id+',appsud_id:'+appsud_id;
                shareData.share_title = data.title;
                shareData.share_desc = data.desc;
                shareData.share_url = data.link.replace("--WP--", urlParam);
                shareData.share_pic = data.small_pic[0].url;
                console.log(111, urlParam)
            }
            share_link = shareData.share_url;
            console.log(shareData)
            func_get_myRanking();

            drawPoster_df(wxuser_openid, wxuser_nickName);
            $('.haibao_title').html(PROP_SHARE_CONFIG.posterTop_msg);
            $('.haibao_bottom').html(PROP_SHARE_CONFIG.posterBot_msg);
        } else if (data.errcode == -233) {
            window.location.href = data.url;
        } else {
            $.alert(data.errmsg);
        }
    }




    function drawPoster_df(wxid, name) {
        func_mask(true);
        var can = document.createElement('canvas');
        var pen = can.getContext('2d');
        can.width = PROP_SHARE_CONFIG.poster_w;
        can.height = PROP_SHARE_CONFIG.poster_h;

        console.log('开始绘制海报');
        var poster_bg = new Image();
        poster_bg.crossOrigin = 'anonymous';
        const n = Math.floor(Math.random() * 2);
        poster_bg.src = "http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/poster"+ n +".png?{$V1}";
        poster_bg.onload = function () {
            console.log('绘制底图海报');
            pen.drawImage(poster_bg, 0, 0, can.width, can.height);
            console.log('第三方');
            console.log(share_link);
            console.log('第四方');
            console.log(encodeURIComponent(share_link));
            var qrUrl = new Image();

            switch (PROP_SHARE_CONFIG.poster_type) {
                case 0:
                    qrUrl.src = '/qr?content=' + encodeURIComponent(share_link);
                    break;
                default:
                    qrUrl.src = 'zz_api__bapi__getHelpQrCode?word_src=app_super'+ act_key +'$master_id:'+ prop_appsuma_id +',appsud_id:'+appsud_id;
            }
            console.log(qrUrl);
            
            qrUrl.onload = function () {
                pen.drawImage(qrUrl, PROP_SHARE_CONFIG.qr_x, PROP_SHARE_CONFIG.qr_y, PROP_SHARE_CONFIG.qr_w, PROP_SHARE_CONFIG.qr_h);
                console.log('绘制二维码完成');

                pen.fillStyle = PROP_SHARE_CONFIG.name_c;
                pen.font = PROP_SHARE_CONFIG.name_s + "px Arial";
                pen.textAlign = "center";
                pen.textBaseline = "top";
                pen.fillText(name,PROP_SHARE_CONFIG.name_x, PROP_SHARE_CONFIG.name_y);


                // 分数
                pen.fillStyle = '#fff';
                pen.font = "italic bold 80px Arial";
                pen.textAlign = "center";
                pen.textBaseline = "top";
                pen.fillText(fun,189, 420);

                // 分字
                pen.fillStyle = '#fff';
                pen.font = "italic bold 34px Arial";
                pen.textAlign = "center";
                pen.textBaseline = "top";
                console.log(pen.measureText(fun));
                
                pen.fillText('分',215+pen.measureText(fun).width*1.1, 450);
                pen.fillStyle = '#ffef94';
                pen.font = "italic  38px Arial";
                pen.textAlign = "center";
                pen.fillText(game_floor+'层楼',189, 500);

               
                

                var headUrl = new Image();
                poster_bg.crossOrigin = 'anonymous';
                headUrl.src = "/wx_headimg?wx_from=" + wxid;
                headUrl.onload = function () {

                    circleImg(pen, headUrl, PROP_SHARE_CONFIG.head_x, PROP_SHARE_CONFIG.head_y, PROP_SHARE_CONFIG.head_w / 2, '#fff')
                    console.log('绘制头像完成');
                    var result = can.toDataURL("image/jpeg");
                    console.log('生成海报');
                    $('.poster').prop('src', result);
                    window.parent.postMessage({poster:result}, '*'); 

                    $('.send').click(function(){
                        window.parent.postMessage({sendTips:true,msg:'海报保存成功，请前往公众号查看'},'*'); 
                    })
         
     

                    listenMessage(result);

                    // window.addEventListener('message', function (event){
                    //     console.log('chilren');
                        
                    //     console.log(event.data);

                    //     //确认发送海报
                    //     if (event.data.sendPost){
                    //         func_send_post_image(result);
                    //     }

                    //     //海报加载完毕
                    //     if (event.data.posterLoad){
                    //         $('#main').show();
                    //     }
                        
                    // })


                    func_mask(false);

                }

            }
        }
    }

    function circleImg(ctx, img, x, y, r, c) {
        x = parseInt(x);
        y = parseInt(y);
        r = parseInt(r);
        ctx.save();
        var d = 2 * r;
        var cx = x + r;
        var cy = y + r;
        ctx.arc(cx, cy, r, 0, 2 * Math.PI);
        ctx.clip();
        ctx.drawImage(img, x, y, d, d);
        ctx.strokeStyle = c;
        ctx.lineWidth = 8;
        ctx.stroke();
        ctx.closePath()
        ctx.restore();
    }


    function GetQueryString(name) {
        var reg = new RegExp("&?" + name + "(?:=|:)([^,&]*)", 'gi');
        console.log(reg)
        console.log(decodeURIComponent(window.location.search.substr(1)))
        var id = '';
        console.log(
            decodeURIComponent(window.location.search.substr(1)).replace(reg, function ($1, $2) {
                console.log(arguments)
                console.log($2)
                id = $2;
            })
        );
        
        console.log(id)
        return id;
    }

    //zz_api__bapi__data_post_image

    function func_send_post_image(base64) {
        var url = 'zz_api__bapi__data_post_image';

        $.ajax({
            dataType: "json",
            url: url,
            type:'POST',
            data: {
                image_base64:base64
            },
            success: function success(data, textStatus, jqXHR) {
                setTimeout(function () {
                    func_send_post_image__success(data, textStatus, jqXHR);
                }, 100);
            },
            error: function error() {
                alert("系统繁忙，请稍后再试");
            }
        });
    }

    function func_send_post_image__success(data, textStatus, jqXHR){
        console.log(data);
        if(data.errcode == 0){
            // $.alert('海报保存成功',function(){
            //     wx.closeWindow();
            // })
            // alert('海报保存成功');
            // window.parent.postMessage({page_close:true}, '*'); 
            // wx.closeWindow();
            // func_alert_callb('海报保存成功',function(){
            //     window.parent.postMessage({save_seccess:true}, '*'); 
            // })

            window.parent.postMessage({save_seccess:true,msg:'海报保存成功,关闭页面'}, '*'); 

        }else{
            // func_alert_callb(data.errmsg);
            window.parent.postMessage({errmsg:data.errmsg}, '*'); 
        }
        
    }

   
    function listenMessage(picUrl){
        window.addEventListener('message', function (event){
            console.log('chilren');
            
            console.log(event.data);

            //确认发送海报
            if (event.data.sendPost){
                func_send_post_image(picUrl);
            }

            //海报加载完毕
            if (event.data.posterLoad){
                $('#main').show();
            }
            
        });
    }
    
});



var style = '<style>.weui_mask_transition,.weui_mask_transparent,.weui_mask{position:fixed;top:0;left:0;z-index:999;width:100%;height:100%}.weui_mask{background:rgba(0,0,0,.6)}.weui_dialog{position:fixed;top:50%;left:50%;z-index:1000;width:85%;border-radius:3px;background-color:#fafafc;text-align:center;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.weui_dialog_hd{padding:1.2em 0 .5em}.weui_dialog_title{font-weight:400;font-size:17px}.weui_dialog_bd{padding:0 20px;color:#888;font-size:15px}.weui_dialog_ft{position:relative;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;margin-top:20px;font-size:17px;line-height:42px}.weui_btn_dialog.primary{color:#0bb20c}.weui_dialog_ft a{display:block;color:#3cc51f;text-decoration:none;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;-webkit-tap-highlight-color:transparent}a{text-decoration:none}.weui_btn_dialog.default{color:#353535}.weui_dialog_ft a{position:relative;display:block;color:#3cc51f;text-decoration:none;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;-webkit-tap-highlight-color:transparent}.weui_dialog_ft:after{position:absolute;top:0;left:0;width:100%;height:1px;border-top:1px solid #D5D5D6;color:#D5D5D6;content:" ";-webkit-transform:scaleY(.5);transform:scaleY(.5);-webkit-transform-origin:0 0;transform-origin:0 0}.weui_dialog_ft:after{position:absolute;top:0;left:0;width:100%;height:1px;border-top:1px solid #D5D5D6;color:#D5D5D6;content:" ";-webkit-transform:scaleY(.5);transform:scaleY(.5);-webkit-transform-origin:0 0;transform-origin:0 0}.weui_dialog_alert .weui_dialog_ft a:after{position:absolute;top:0;left:0;width:1px;height:100%;border-left:1px solid #D5D5D6;color:#D5D5D6;content:" ";-webkit-transform:scaleX(.5);transform:scaleX(.5);-webkit-transform-origin:0 0;transform-origin:0 0}</style>';
$('head').append(style);
function func_alert_callb(text,callback){
  var html = '<div class="weui_dialog_alert" id="alert_callb" style="display: none;"><div class="weui_mask"></div><div class="weui_dialog"><div class="weui_dialog_hd"><strong class="weui_dialog_title">提示</strong></div><div class="weui_dialog_bd"></div><div class="weui_dialog_ft"><a href="javascript:;" class="weui_btn_dialog primary">确定</a></div></div></div>';
  $('body').append(html);
  var tk = $('#alert_callb');

  tk.find('.weui_dialog_bd').html(text);
  tk.find(".weui_btn_dialog").click(function(){
  tk.remove();
    if (callback && typeof callback === 'function' ){
        callback();
    }
  });
  tk.show();
}


// zz_api__bapi__data_get_ranking
function func_get_myRanking(){
    var url = 'zz_api__bapi__data_get_ranking';

    $.ajax({
        dataType: "json",
        url: url,
        data: {},
        //////////////////////////////////////////////////
        success: function success(data, textStatus, jqXHR) {
            setTimeout(function () {
                func_get_myRanking__success(data, textStatus, jqXHR);
            }, 100);
        },
        //////////////////////////////////////////////////
        error: function error(data, textStatus, jqXHR) {
            alert("系统繁忙，请稍后再试");
        }
    });
}

function func_get_myRanking__success(data, textStatus, jqXHR){
    if(data.errcode == 0){
        console.log(data);
        var {data} = data;

        prop_fen = data.appsud_int_00;

    }else{
        console.log(date.errcode,data.errmsg);
    }
}

