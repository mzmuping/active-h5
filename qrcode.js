let posterId = 0
let shareUrl, userName, userHead, qrPic, uploadPicId, uploadPicIdWidth, uploadPicIdHeight
let qrLaunchId = null
let launchData = {}
let vioceId
// var vConsole = new VConsole();
var swiper = new Swiper(".p8_box .swiper-container", {
  observer: true,/*启动动态检查器，当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper。*/
  observeParents: true,/*将observe应用于Swiper的父元素。当Swiper的父元素变化时，例如window.resize，Swiper更新。*/
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 150,
    modifier: 1.2,
    slideShadows: false,
  },
  on: {
    slideChange() {
      posterId = this.activeIndex
    }
  },
});

var swiper2 = new Swiper('.big_swiper.swiper-container', {
  direction: 'vertical',
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});



$(function () {
  (function () {
    function isArray(obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    }
    var loader = function (imgList, callback, timeout) {
      timeout = timeout || 5000;
      imgList = isArray(imgList) && imgList || [];
      callback = typeof (callback) === 'function' && callback;

      var total = imgList.length,
        loaded = 0,
        imgages = [],
        _on = function () {
          loaded < total && (++loaded, callback && callback(loaded / total));
        };

      if (!total) {
        return callback && callback(1);
      }

      for (var i = 0; i < total; i++) {
        imgages[i] = new Image();
        imgages[i].onload = imgages[i].onerror = _on;
        imgages[i].src = imgList[i];
      }

      /**
       * 如果timeout * total时间范围内，仍有图片未加载出来（判断条件是loaded < total），通知外部环境所有图片均已加载
       * 目的是避免用户等待时间过长
       */
      setTimeout(function () {
        loaded < total && (loaded = total, callback && callback(loaded / total));
      }, timeout * total);

    };

    "function" === typeof define && define.cmd ? define(function () {
      return loader
    }) : window.imgLoader = loader;
  })();
  // 预加载的背景图片链接
  var images = [
    `${pub_root_file}app/act/t_001/img/p_bg.png?v=1`,
    `${pub_root_file}app/act/t_001/img/p2_model.png?v=1`,
    `${pub_root_file}app/act/t_001/img/p3_bg.png?v=1`,
    `${pub_root_file}app/act/t_001/img/p4_bg.png?v=1`,
    `${pub_root_file}app/act/t_001/img/p5_bg.png?v=1`,
    `${pub_root_file}app/act/t_001/img/say_bg.png?v=1`,
    `${pub_root_file}app/act/t_001/img/p8_poster1.png?v=1`,
    `${pub_root_file}app/act/t_001/img/p8_poster2.png?v=1`,
    `${pub_root_file}app/act/t_001/img/p8_poster3.png?v=1`,
    `${pub_root_file}app/act/t_001/img/p9_poster1.png?v=1`,
    `${pub_root_file}app/act/t_001/img/p9_poster2.png?v=1`,
    `${pub_root_file}app/act/t_001/img/p9_poster3.png?v=1`,
    `${pub_root_file}app/act/t_001/img/p9_icon.png?v=1`,
    `${pub_root_file}app/act/t_001/img/show_bg.png?v=1`,
    `${pub_root_file}app/act/t_001/img/s_tiao.png?v=1`,
    `${pub_root_file}app/act/t_001/img/p6_btn.png?v=1`
  ];
  //获取页面中的所有img
  var imgs = document.images;
  for (var i = 0; i < imgs.length; i++) {
    images.push(imgs[i].src);
  }
  imgLoader(images, function (percentage) {
    setTimeout(function () {
      var percentT = percentage * 100;
      $('.load-num').html('即将进入...' + (parseInt(percentT)) + '%');
      if (percentage == 1) {
        setTimeout(function () {
          $('#page-ft').hide();
          $('.p1_box').show()
          setbg()
        }, 500);
      }
    }, 200)
  });

  ; (function ($) {
    var style = "<style>#toast{position: fixed;top: 0;left: 0;right: 0;bottom: 0;display: flex;display: -webkit-flex;justify-content:center;align-items: center;z-index:9999;}.toast_cont{padding:.5rem 1rem;border-radius: 5px;max-width:10rem;color: white;text-align: center;font-size: 0.7rem;background: rgba(0,0,0,0.9);}</style>";
    var html = '<div id="toast" style="display:none;"><div class="toast_cont"></div></div>';
    $('body').append(html);
    $('head').append(style);
    $.fn.toast = function (content, statusType) {
      var t = $(this);
      t.find(".toast_cont").html(content);


      if (statusType == 0) {
        t.fadeOut();
      } else {
        t.fadeIn();
      }

      // setTimeout(function(){
      // 	t.fadeOut();
      // },time)
    }
  })($);
})

function setbg() {
  let style = `
  <style>
    .p_box{
      background: url(${pub_root_file}app/act/t_001/img/p_bg.png?v=1) 0 0/100% 100% no-repeat;
    }
    .p2_model{
      background: url(${pub_root_file}app/act/t_001/img/p2_piao_5.png?v=1) 0 0/100% 100% no-repeat;
    }
    .p3_box{
      background: url(${pub_root_file}app/act/t_001/img/p3_bg.png?v=1) 0 0/100% 100% no-repeat;
    }
    .p4_box{
      background: url(${pub_root_file}app/act/t_001/img/p4_bg.png?v=1) 0 0/100% 100% no-repeat;
    }
    .p4_add_box{
      background: url(${pub_root_file}app/act/t_001/img/p_add_bg.png?v=1) 0 0/100% 100% no-repeat;
    }
    .p5_box{
      background: url(${pub_root_file}app/act/t_001/img/p5_bg.png?v=1) 0 0/100% 100% no-repeat;
    }
    .say_modex{
      background: url(${pub_root_file}app/act/t_001/img/say_bg.png?v=1) 0 0/100% 100% no-repeat;
    }
    .p8_poster1 {
      background: url(${pub_root_file}app/act/t_001/img/p8_poster1.png?v=1) 0 0/100% 100% no-repeat;
    }
    .p8_poster2 {
      background: url(${pub_root_file}app/act/t_001/img/p8_poster2.png?v=1) 0 0/100% 100% no-repeat;
    }
    .p8_poster3 {
      background: url(${pub_root_file}app/act/t_001/img/p8_poster3.png?v=1) 0 0/100% 100% no-repeat;
    }
    .p9_poster_box{
      background: url(${pub_root_file}app/act/t_001/img/p9_poster1.png?v=1) 0 0/100% 100% no-repeat;
    }
    .p9_icon{
      background: url(${pub_root_file}app/act/t_001/img/p9_icon.png?v=1) center 2.5rem/4.075rem 4.425rem no-repeat;
    }
    .rep_page{
      background: url(${pub_root_file}app/act/t_001/img/show_bg.png?v=1) 0 0/100% 100% no-repeat;
    }
    .s_tiao{
      background: url(${pub_root_file}app/act/t_001/img/s_tiao.png?v=1) 0 0/100% 100% no-repeat;
    }
    .p6_btn{
      background: url(${pub_root_file}app/act/t_001/img/p6_btn.png?v=1) 0 0/100% 100% no-repeat;
    }
  </style>
`
  $('head').append(style)
  $('.p6_btn').css('background', `url(${pub_root_file}app/act/t_001/img/p6_btn.png?v=1) 0 0/100% 100% no-repeat`)
}

function getObjectURL(file) {
  var url = null;
  if (window.createObjectURL != undefined) { // basic    
    url = window.createObjectURL(file);
  } else if (window.URL != undefined) { // mozilla(firefox)    
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL != undefined) { // webkit or chrome    
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
}

var c1 = document.getElementById("canvas1");
// c1.width = $('.p9_icon').width()*2;
// c1.height = $('.p9_icon').height()*2;
var uploadImg = ''
var ctx1 = c1.getContext("2d");


$('#upfile').change(function (e) {
  var file = document.getElementById("upfile").files[0];
  if (posterId == 3) {
    $('.p9_icon').addClass('p9_icon_poster3')
    console.log(c1.width, c1.height)
    // ctx1 = c1.getContext("2d");
    // console.log(c1.width, c1.height)
  } else {
    $('.p9_icon').removeClass('p9_icon_poster3')
  }
  if (!/image\/\w+/.test(file.type))			//判断获取的是否为图片文件
  {
    alert("请确保文件为图像文件");
    return false;
  }

  var reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = function (e) {
    $('.p9_icon').hide()
    $('.p9_back').show()
    $('.flexBtn').addClass('active')
    func_imgCut(this.result);
  }
});
//裁剪方法
function func_imgCut(l_img) {
  var Stage = AlloyPaper.Stage,
    Bitmap = AlloyPaper.Bitmap,
    Loader = AlloyPaper.Loader;

  var stage = new Stage("#canvas1");
  stage.autoUpdate = false;

  console.log('选择成功')

  // var stage2 = new Stage("#canvas_copy");
  // 	stage2.autoUpdate = false;

  var ld = new Loader();
  //console.log(l_img)

  ld.loadRes2([
    { id: "upload_file", src: l_img }
  ]);

  ld.complete(function () {
    var bmp = new Bitmap(ld.get("upload_file"));
    bmp.originX = 0.5;
    bmp.originY = 0.5;
    bmp.x = stage.width / 2;
    bmp.y = 150;
    stage.add(bmp);


    stage.update();

    var initScale = 1;
    new AlloyFinger(bmp, {
      multipointStart: function () {
        initScale = bmp.scaleX;
      },
      rotate: function (evt) {
        evt.preventDefault();
        bmp.rotation += evt.angle;
        stage.update();
      },
      pinch: function (evt) {
        evt.preventDefault();
        bmp.scaleX = bmp.scaleY = initScale * evt.scale;
        stage.update();
      },
      pressMove: function (evt) {
        evt.preventDefault();
        bmp.x += evt.deltaX;
        bmp.y += evt.deltaY;
        stage.update();
      }

    });

  });
}


//audio为变量(给audio标签创个id再赋值给audio即可)
//iphone兼容(旧版)
document.addEventListener("WeixinJSBridgeReady", function () {
  //音频播放
  document.getElementById('audio').play();
}, false);

//iphone兼容
if (typeof WeixinJSBridge === 'object') {
  WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
    document.getElementById('audio').play();
  });
}

var audio = document.getElementById('audio');

$(".music").click(function () {
  if ($(".music").hasClass("m_active")) {
    $(".music").removeClass("m_active");
    audio.pause();
    // $(".music_bg").hide();
    isplay = false;
  } else {
    $(".music").addClass("m_active");
    audio.play();
    // $(".music_bg").show();
    isplay = true;
  }
});

$(function () {

  uploadPicIdWidth = $('.p9_icon').css('width')
  uploadPicIdHeight = $('.p9_icon').css('height')

  // console.log('上传图片宽高', parseInt(uploadPicIdWidth), parseInt(uploadPicIdHeight))
  // funcInit();

})

function funcReady() {
  funcInit()
  eventFun()

  // var id = 'weixin://resourceid/aab48262249495ccdf63fb6a78e73df1';
  // var server_id = '4waKuugf5igHS1i7nfbKszCtU0H9B0CD8Znr_ESOfVHL3n9IAx_wxEyNjJF0UM_q';
  // wx.uploadVoice({
  //   localId: id, // 需要上传的音频的本地ID，由stopRecord接口获得
  //   isShowProgressTips: 1, // 默认为1，显示进度提示
  //   success: function (res) {
  // 	var serverId = res.serverId; // 返回音频的服务器端ID
  // 	func_alert(`录音serverId:${serverId}`);
  //   }
  // });
  // wx.chooseImage({
  //   count: 1, // 默认9
  //   sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
  //   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  //   success: function (res) {
  //     func_alert('选择成功');
  //   }
  // });
  // wx.playVoice({
  //     localId: id // 需要播放的音频的本地ID，由stopRecord接口获得
  // });
}

// 控制音频方法
// var is_start = 0;

function funcPlay(id) {
  wx.playVoice({
    localId: id // 需要播放的音频的本地ID，由stopRecord接口获得
  });
}




//初始化
function funcInit() {
  func_axios({
    url: `${pub_root_app}xweb/act/z_api`,
    data: {},
    success(res) {
      console.log(res);
      if (res.errcode == 0) {
        // func_alert('成功');


        let { user } = res.common

        shareUrl = res.data.common.share.share_url

        // console.log('分享链接', shareUrl)

        // console.log('user',user)

        $('.user_header').attr('src', user.wxuser_headimgurl)
        $('.user_name').text(user.wxuser_nickname)

        userName = user.wxuser_nickname,
          // userHead = user.wxuser_headimgurl
          userHead = `${pub_root_app}app/z_common/app_api/img_change?url=` + user.wxuser_headimgurl

        $('.p8_btn').click(() => {
          $('.p8_box').hide()
          $('.p9_box').show()
          if (posterId == 0) {
            $('.p9_icon').hide()
            $('.p9_poster_box').css('background', `url(${pub_root_file}app/act/t_001/img/p9_poster1.png?v=1) 0 0/100% 100% no-repeat`)
            $('.p9_poster_thing1').hide()
            $('.p9_poster_thing2').hide()
          } else if (posterId == 1) {
            $('.p9_poster_box').css('background', `url(${pub_root_file}app/act/t_001/img/p9_poster2.png?v=1) 0 0/100% 100% no-repeat`)
            // $('.p9_poster_thing1').hide()
            // $('.p9_poster_thing2').hide()
            $('.p9_poster_thing2').removeClass('p9_poster_thing2_p3')
            c1.width = $('.p9_icon').width() * 2;
            c1.height = $('.p9_icon').height() * 2;
            $('#canvas1').css({ 'width': c1.width / 2, 'height': c1.height / 2 })
            $('.p9_icon').show()
            // $('.p9_icon').addClass('p9_icon_poster3').attr('src',`${pub_root_file}app/act/t_001/img/p8_poster3_icon.png?v=1`)
          } else if (posterId == 2) {
            $('.p9_icon').addClass('p9_icon_poster3')
            c1.width = $('.p9_icon_poster3').width() * 2;
            c1.height = $('.p9_icon_poster3').height() * 2;
            $('#canvas1').css({ 'width': c1.width / 2, 'height': c1.height / 2 })
            $('.p9_poster_thing2').addClass('p9_poster_thing2_p3')
            // $('.p9_poster_thing1').hide()
            // $('.p9_poster_thing2').hide()
            $('.p9_icon').show()
            // $('.p9_icon').css('width', '10.525rem')
            // $('.p9_icon').css('width','7.725rem')

            // console.log('比较大小', $('.p9_icon').height(), $('.p9_icon_poster3').height())
            // console.log('比较大小',$('.p9_icon').css('height'), $('.p9_icon_poster3').css('height'))
            // c1.height = 100
            // console.log(c1.width, c1.height)
            $('.p9_poster_box').css('background', `url(${pub_root_file}app/act/t_001/img/p9_poster3.png?v=1) 0 0/100% 100% no-repeat`)
            $('.p9_poster_thing1').hide()
            // $('.p9_icon').addClass('p9_icon_poster3').attr('src',`${pub_root_file}app/act/t_001/img/p8_poster3_icon.png?v=1`)
          }
          // alert('选择了' + posterId + '海报')
        })

        // 2图
        $('.p9_icon').click(function () {
          // alert('click')
          // console.log('wx',wx)
          // wx.startRecord();
          // funcChooseImg()

          // $('#upfile').trigger('click');
          wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
              func_alert('选择成功');
              var localIds = res.localIds;
              wx.getLocalImgData({
                localId: localIds[0], // 图片的localID
                success: function (res) {
                  var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
                  console.log('base64', localData)
                  if (localData.substr(0, 5) != 'data:') {
                    localData = 'data:image;base64,' + localData;
                  }

                  uploadPicId = localData

                  $('.p9_icon').hide()
                  $('.p9_back').show()
                  $('.flexBtn').addClass('active')
                  func_imgCut(uploadPicId);
                  // base64 uploadPicId

                  // finger(uploadPicId)
                }
              });
            }
          });

          // wx.chooseImage({
          //   count: 1, // 默认9
          //   sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
          //   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          //   success: function (res) {
          //     // func_alert('选择成功');
          //     var localIds = res.localIds;

          //     console.log('本地id', localIds)
          //     wx.getLocalImgData({
          //       localId: localIds[0], // 图片的localID
          //       success: function (res) {
          //         var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
          //         console.log('base64', localData)
          //         if (localData.substr(0, 5) != 'data:') {
          //           localData = 'data:image;base64,' + localData;
          //         }
          //         uploadPicId = localData

          //         finger(uploadPicId)
          //       }
          //     });

          //     $('.p9_icon').css('background', `url(${localIds}) no-repeat center center/100% 100%`)
          //   }
          // });
        })

        // 发起&海报生成
        $('.p9_btn').click(function () {
          if (posterId != 0 && uploadPicId == undefined) {
            // alert('请上传图片')
            // return
          }
          uploadImg = c1.toDataURL("image/jpg")
          $('.p9_box').hide()
          $('.p10_box').show()

          let afterUrl = encodeURIComponent(shareUrl.replace(/__WORD__/, `act1604643497$to_page:view,id:${qrLaunchId}`))
          qrPic = `${pub_root_app}app/z_common/app_api/qr?txt=` + afterUrl

          let p_bg
          if (posterId == 0) {
            p_bg = `${pub_root_file}app/act/t_001/img/p9_poster1.png?v=1`
          } else if (posterId == 1) {
            p_bg = `${pub_root_file}app/act/t_001/img/p9_poster2.png?v=1`
          } else if (posterId == 2) {
            p_bg = `${pub_root_file}app/act/t_001/img/p9_poster3.png?v=1`
          }

          $('#toast').toast('生成海报中', 1);
          drawPoster(userName, qrPic, userHead, p_bg)
        })

        // $('.p6_btn').on('touchstart',function(e){
        //   console.log(e)  
        //   var e = e || window.e
        //   e.stopPropagation()
        //   e.preventDefault()
        //   funcStart()
        //   $('.p6_btn').on('touchend', function (e) {
        //       var e = e || window.e
        //       e.stopPropagation()
        //       e.preventDefault()
        //       funcStart()
        //     })
        // })

        // $('.p6_btn').on({
        //   touchstart:function(e){
        //     var e = e || window.e
        //     e.stopPropagation()
        //     e.preventDefault()
        //     funcStart()
        //   },

        //   touchend:function(e){
        //     var e = e || window.e
        //     e.stopPropagation()
        //     e.preventDefault()
        //     funcStart()
        //   }
        // })

        $('.p6_btn').on('touchstart', function (e) {
          console.log(e)
          var e = e || window.e
          if (e.cancelable) {
            e.stopPropagation()
            e.preventDefault()
          }

          funcStart(0)





        })

        $('.p6_btn').on('touchmove', function (e) {
          var e = e || window.e
          if (status !== '11' && this.direction === 'vertical' && !(parseInt(status, 2) & parseInt(direction, 2)) && e.cancelable) {
            e.preventDefault();
            e.stopPropagation();
          }

        })

        $('.p6_btn').on('touchend', function (e) {
          var e = e || window.e
          if (e.cancelable) {
            e.stopPropagation()
            e.preventDefault()
          }
          funcStart(1)

          return true
        })

        // $('.p6_btn').on('mouseup', function (e) {
        //   var e = window.e || e
        //   e.stopPropagation()
        //   e.preventDefault()
        //   funcStart()
        // })

        // $('.p6_btn').mousedown(function(){
        //   var e = window.e || e
        //   e.stopPropagation()
        //   e.preventDefault()
        //   funcStart()

        //   $('.p6_btn').mouseup(function () {
        //     var e = window.e || e
        //     e.stopPropagation()
        //     e.preventDefault()
        //     funcStart()
        //   })
        // })



        // $('.p6_btn').on({
        //   touchstart: function (e) {
        //     // alert(111)
        //     funcStart()
        //     var e = window.e || e
        //     e.stopPropagation()
        //     e.preventDefault()
        //   },
        //   touchend: function (e) {
        //     funcStart()
        //     var e = window.e || e
        //     e.stopPropagation()
        //     e.preventDefault()
        //   }
        // })

      }
      else {
        func_alert(res.errmsg);
      }
    },
  });
}

function func_launch(data = {}) {
  let res = func_axios({
    url: `${pub_root_app}xweb/act/z_api/launch`,
    params: data,
    success(res, id) {
      // console.log('launch结果',res)
      if (res.errcode !== 0) return console.log(data.errmsg)
      if (id == null) func_launch__successful(res)
      func_launch_hasId__successful(res)
    }
  })

}

function func_launch__successful(data) {

  let qrLaunchId = data.entity.adl_id
  let afterUrl = encodeURIComponent(shareUrl.replace(/__WORD__/, `act1604643497$to_page:view,id:${qrLaunchId}`))
  qrPic = `${pub_root_app}app/z_common/app_api/qr?txt=` + afterUrl

  let p_bg
  if (posterId == 0) {
    p_bg = `${pub_root_file}app/act/t_001/img/p9_poster1.png?v=1`
  } else if (posterId == 1) {
    p_bg = `${pub_root_file}app/act/t_001/img/p9_poster2.png?v=1`
  } else if (posterId == 2) {
    p_bg = `${pub_root_file}app/act/t_001/img/p9_poster3.png?v=1`
  }
  drawPoster(userName, qrPic, userHead, p_bg)
}

function func_launch_hasId__successful(data) {
  // console.log('有id的launch', data)
}

async function funcExchangeBasePic(picData) {
  let res = await func_axios({
    url: `${pub_root_app}xweb/z_common/z_api/img_base64`,
    data: {
      base64: picData
    }
  })
  console.log(res)
}

function funcStart(is_start) {
  $(".music").click()
  if (is_start == 0) {
    
    // is_start = 1
    wx.startRecord();
    $('.p6_yin_phone').addClass('p6_yin_phone_saying')
  }
  else {
    // is_start = 0

    wx.stopRecord({
      success: function (res) {
        $('.p6_yin_phone').removeClass('p6_yin_phone_saying')

        if (res.errMsg != 'stopRecord:ok') return alert(res.errMsg)

        var localId = res.localId
        vioceId = localId
        console.log('多次录音', res.localId);

        $('.p6_box').hide()
        $('.p7_box').show()

      }
    });
  }
}

function funcChooseImg() {
  wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      func_alert('选择成功');
    }
  });
}

function eventFun() {
  $('.p1_btn').click(() => {
    $('.p1_box').hide()
    // $('.p2_box').show()
    $('.p4_add_box').show()
  })

  $('.p2_btn').click(() => {
    $('.p2_box').hide()
    $('.p6_box').show()



    // setTimeout(function () {
    //   $('.p3_box').fadeOut()
    //   $('.p4_box').fadeIn()
    //   setTimeout(function () {
    //     $('.p4_box').fadeOut()
    //     $('.p5_box').fadeIn()
    //     setTimeout(function () {
    //       $('.p5_box').fadeOut()
    //       $('.p6_box').fadeIn()
    //     }, 5000)
    //   }, 4500)
    // }, 5000)
  })
  
  $('.p4_add_box .btn_right').click(function () {
    $('.p4_add_box').fadeOut()
    $('.p3_box').fadeIn()
  })

  $('.p4_add_box .btn_left').click(function () {
    $('.p1_box').show()
    $('.p4_add_box').hide()
  })


  $('.p3_box .btn_left').click(function () {
    $('.p4_add_box').show()
    $('.p3_box').hide()
  })

  $('.p3_box .btn_right').click(function () {
    $('.p3_box').fadeOut()
    $('.p4_box').fadeIn()
  })

  $('.p4_box .btn_left').click(function () {
    $('.p3_box').fadeIn()
    $('.p4_box').fadeOut()
  })

  $('.p4_box .btn_right').click(function () {
    $('.p4_box').fadeOut()
    $('.p5_box').fadeIn()
  })


  $('.p5_box .btn_left').click(function () {
    $('.p4_box').fadeIn()
    $('.p5_box').fadeOut()
  })

  $('.p5_box .btn_right').click(function () {
    $('.p5_box').fadeOut()
    $('.p2_box').fadeIn()
  })


  $('.p7_btn_back').click(function () {
    $('.p7_box').hide()
    $('.p6_box').show()
  })

  $('.p7_btn_listen').click(function () {
    //   威伦

    wx.playVoice({
      localId: vioceId // 需要播放的音频的本地ID，由stopRecord接口获得
    });
    console.log('点击听录音')
  })

  $('.p7_btn_sure').click(function () {
    $('.p7_box').hide()
    $('.p8_box').show()
  })

  $(".p9_back").click(function () {
    // $('#upfile').trigger('click'); 
    $('.p9_icon').trigger('click');
  });

  $('.p9_box .last_btn_back').click(function () {
    $('.p9_box').hide()
    $('.p8_box').show()
  })

  $('.p8_box .last_btn_back').click(function () {
    $('.p8_box').hide()
    $('.p7_box').show()
  })

  $('.p6_box .last_btn_back').click(function () {
    $('.p6_box').hide()
    $('.p2_box').show()
  })

  $('.p2_box .last_btn_back').click(function () {
    $('.p2_box').hide()
    $('.p5_box').show()
  })

}



// 画布
function func_posterCreate(data, textStatus, jqXHR) {
  func_mask(true);
}

$(function () {
  // can.width = 640 * total_sca;
  // can.height = 1136 * total_sca;


  $(".poster").click(function (e) {
    e.stopPropagation();
  });
  $(".page_poster").click(function () {
    $(".page_poster").hide();
  })

})

function drawPoster(p_name, p_url, headPic, p_bg) {
  
  var can = null, pen = null;
  var total_sca = window.innerWidth / 320,
    head_w = 150 * total_sca, head_h = 150 * total_sca,
    qr_w = 130 * total_sca, qr_h = 130 * total_sca,
    wx_openid = '', wx_name = '';

  let headX = 120, headY = 900,
    qrX = 540, qrY = 920
  can = document.getElementById('canvas');
  pen = can.getContext('2d');
  can.width = 750 * total_sca;
  can.height = 1100 * total_sca;
  // $(".p10_poster").attr('src', p_url);
  // console.log(p_id+'id');
  console.log('开始绘制海报');
  var poster_bg = new Image();
  // 仙峰寺
  let bgPic = p_bg
  // if (posterId == 2) bgPic = `${pub_root_file}app/act/t_001/img/p9_poster.png?v=1`
  poster_bg.crossOrigin = "Anonymous";
  poster_bg.src = bgPic;

  poster_bg.onload = function () {


    if (posterId != 0) {
      var ditu = new Image()
      ditu.src = uploadImg
      console.log(ditu.src)
      ditu.onload = function () {
        if (posterId == 2) {
          // pen.drawImage(ditu, 72 * total_sca, 170 * total_sca, 620 * total_sca, 480 * total_sca);
          // pen.drawImage(ditu, 72 * total_sca, 170 * total_sca, 610 * total_sca, 430 * total_sca);
          pen.drawImage(ditu, 72 * total_sca, 155 * total_sca, 610 * total_sca, 430 * total_sca);
        } else {
          // pen.drawImage(ditu, 82 * total_sca, 140 * total_sca, 600 * total_sca, 760 * total_sca);
          pen.drawImage(ditu, 82 * total_sca, 140 * total_sca, 585 * total_sca, 664 * total_sca);
        }
        // var poster_bg1 = new Image();
        // poster_bg1.crossOrigin = "Anonymous";
        // poster_bg1.src = `${pub_root_file}app/act/t_001/img/p9_poster_thing1.png?v=1`;
        // poster_bg1.onload = function () {
        //   if (posterId == 1) pen.drawImage(poster_bg1, 20, 800, 449, 290);
        //   poster_bg2 = new Image();
        //   poster_bg2.crossOrigin = "Anonymous";
        //   poster_bg2.src = `${pub_root_file}app/act/t_001/img/p9_poster_thing2.png?v=1`;
        //   poster_bg2.onload = function () {
        //     pen.drawImage(poster_bg2, 650, 80, 224, 225)
        //   }
        // }
        pen.drawImage(poster_bg, 0, 0, can.width, can.height);
        console.log('绘制底图完成');
      }
    } else {
      pen.drawImage(poster_bg, 0, 0, can.width, can.height);
      console.log('绘制底图完成');
    }

    var headUrl = new Image();
    headUrl.crossOrigin = "Anonymous";
    headUrl.src = headPic;
    headUrl.onload = function () {

      var can2 = document.createElement('canvas');
      pen2 = can2.getContext('2d');
      can2.width = can.width;
      can2.height = can.height;
      pen2.drawImage(headUrl, headX * total_sca - head_w / 2, headY * total_sca, head_w, head_h);
      console.log('绘制头像完成');

      // 创建图片纹理
      var pattern = pen.createPattern(can2, "repeat");
      // 如果要绘制一个圆，使用下面代码
      pen.arc(headX * total_sca, headY * total_sca + head_w / 2, Math.max(head_w, head_h) / 2, 0, 2 * Math.PI);
      // 填充绘制的圆o
      pen.fillStyle = pattern;
      pen.fill();

      pen.arc(headX * total_sca, headY * total_sca + head_w / 2, Math.max(head_w, head_h) / 2, 0, 2 * Math.PI);
      pen.strokeStyle = '#ffffff';
      pen.lineWidth = 2;
      pen.stroke();

      var qrUrl = new Image();
      qrUrl.crossOrigin = "Anonymous";
      console.log('传入的二维码', p_url)
      qrUrl.src = p_url;
      qrUrl.onload = function () {




        pen.drawImage(qrUrl, qrX * total_sca, qrY * total_sca, qr_w, qr_h);
        console.log('绘制二维码完成');

        pen.font = 28 * total_sca + "px '微软雅黑'";

        console.log("文本" + pen.measureText(p_name).width)
        // 设置字体填充颜色
        pen.fillStyle = "#fff";
        // 从坐标点(50,50)开始绘制文字
        pen.textAlign = "left";

        if (p_name.length > 7) {
          p_name = p_name.substring(0, 7);
          p_name = p_name + '...';
          console.log(p_name);
        }
        pen.fillText(p_name, 220 * total_sca, 920 * total_sca, 300);
        let tips = `感恩时刻，"聆"感之声`,
          tips2 = `扫码听听我对你的祝福吧～`,
          tips3 = ``
        pen.fillText(tips, 220 * total_sca, 970 * total_sca, 750)

        pen.font = 26 * total_sca + "px '微软雅黑'";


        pen.fillText(tips2, 220 * total_sca, 1010 * total_sca, 750)
        // pen.fillText(tips3, 220 * total_sca, 1050 * total_sca, 750)
        // 

        var result = can.toDataURL("image/png");
        console.log('生成海报');

        $('#toast').toast('生成海报中', 0);

        $(".p10_poster").attr('src', result);

        wx.uploadVoice({
          localId: vioceId, // 需要上传的音频的本地ID，由stopRecord接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            // alert('has uploaded')
            var serverId = res.serverId; // 返回音频的服务器端ID
            launchData.adl_str_00 = serverId

            func_launch(launchData)
          }
        })

      }

    }
  }
}