
func_wx_ready(function () {

  const bgm = document.getElementById('bgm');
  bgm.src = 'https://res.wx.qq.com/voice/getvoice?mediaid=MzU5ODAyMzYxMF8xMDAwMDAyNDU=';

  var prop_is_master = true;
  var prop_game_count =10;
  var prop_site_id;
  var game_key = {};
  var judge = 0;
  var appsud_id = '';
  var prop_master_fun = 0;
  var initGame; // 全局canvas
  var game_floor = 0;
  var prop_score = 0;

  $('.stage_game_start').css(
    'background',
    'url(http://img0.wx.xiao-bo.com/z/act/2019-040506/yfc_dwH5/page_bg.png) no-repeat 0 0/100% 100%',
  );
  $('.countdown').css(
    'background',
    'url({$APP_SUPER_IMG_ROOT}/b_index_clock.png) no-repeat 0 0/auto 100%',
  );



  $('.result_mask').css('background', '#ffffe7 url("http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/result_bg.png") no-repeat left top / 100% auto');
  $('.result_mask .result_box').css('background', 'url("http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/result_box.png") no-repeat center / cover');
  $('.optimum_score_wrap').css('background', 'url("http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/result_bar.png") no-repeat left top / contain');
  $('.battle_info_wrap').css('background', 'url("http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/battle_info.png") no-repeat center / cover');
  $('.ceng').css('background', 'url("http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/ceng.png") no-repeat center / cover')
  $('#score').css('background','url("http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/red.png") no-repeat center / cover');
  $('#pk_score').css('background','url("http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/blue.png") no-repeat center / cover');
  prop_appsumt_id = GetQueryString('appsumt_id');
  prop_appsuma_id = GetQueryString('master_id');
  prop_is_master = false;

  $('.music_icon').click(function () {
    if ($(this).hasClass('active')) {
      bgm.pause();
      $(this).removeClass('active');
    } else {
      bgm.play();
      $(this).addClass('active');
    }
  });

  // 兼容性
  var phone_size = $(window).height() / $(window).width();

  console.log(phone_size);
  //游戏
  (function () {
    const canvas = document.getElementById('game');
    const gameBg = document.getElementById('gameBg');
    const clientWidth = window.innerWidth * 2;
    const clientHeight = window.innerHeight * 2;
    // canvas.width = clientWidth;
    canvas.height = clientHeight;
    canvas.addEventListener('touchstart', function (e) {
      e.preventDefault();
    });
    const cjs = createjs;
    class Game {
      //预加载
      preload() {
        this.queue = new cjs.LoadQueue(true, 'http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/', true);
        const manifest = [
          {
            src: 'house1.png',
            id: 'house1'
          },
          {
            src: 'house2.png',
            id: 'house2'
          },
          {
            src: 'house3.png',
            id: 'house3'
          },
          {
            src: 'house4.png',
            id: 'house4'
          },
          {
            src: 'house5.png',
            id: 'house5'
          },
          {
            src: 'house6.png',
            id: 'house6'
          },
          {
            src: 'house7.png',
            id: 'house7'
          },
          {
            src: 'house8.png',
            id: 'house8'
          },
          {
            src: 'house9.png',
            id: 'house9'
          },
          {
            src: 'house10.png',
            id: 'house10'
          },
          {
            src: 'house11.png',
            id: 'house11'
          },
          {
            src: 'house12.png',
            id: 'house12'
          },
          {
            src: 'house13.png',
            id: 'house13'
          },
          {
            src: 'house14.png',
            id: 'house14'
          },
          {
            src: 'house15.png',
            id: 'house15'
          },
          {
            src: 'house16.png',
            id: 'house16'
          },
          {
            src: 'house17.png',
            id: 'house17'
          },
          {
            src: 'house18.png',
            id: 'house18'
          },
          {
            src: 'house19.png',
            id: 'house19'
          },
          {
            src: 'house20.png',
            id: 'house20'
          },
          {
            src: 'house21.png',
            id: 'house21'
          },
          {
            src: 'house22.png',
            id: 'house22'
          },
          {
            src: 'house23.png',
            id: 'house23'
          },
          {
            src: 'house24.png',
            id: 'house24'
          },
          {
            src: 'house25.png',
            id: 'house25'
          },
          {
            src: 'pliers.png',
            id: 'pliers'
          },
          {
            src: 'gameBg.png',
            id: 'gameBg'
          },
          {
            src: 'hp.png',
            id: 'hp'
          },
          {
            src: 'machine_hand.png',
            id: 'machine_hand'
          },
          {
            src: 'logo.png',
            id: 'logo'
          },
          {
            src: 'chi.png',
            id: 'chi'
          },
          {
            src: 'cloud.png',
            id: 'cloud'
          },
          {
            src: 'plan.png',
            id: 'plan'
          },
          {
            src: 'balloon.png',
            id: 'balloon'
          },
          {
            src: 'fly_logo.png',
            id: 'fly_logo'
          }

        ];
        this.queue.loadManifest(manifest);
        this.queue.on('complete', e => {
         
         
          this.init();
          func_mask(false);
          $('.ceng').show();
          $('.tutorial_mask').hide()
          console.log(this.queue);
          if (typeof WeixinJSBridge === 'object') {
            WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
              bgm.play();
              $('.music_icon').addClass('active');
            });
          }
        });
      }

      init() {
        this.stage = new cjs.Stage('game');
        cjs.Touch.enable(this.stage);
        this.houseContainer = new cjs.Container();
        cjs.Ticker.timingMode = cjs.Ticker.RAF;


        //背景图
        this.gameBg = new cjs.Container();
        const bg = new cjs.Bitmap(this.queue.getResult('gameBg'));
        this.bottomDir = canvas.height - bg.image.naturalHeight;
        this.gameBg.addChild(bg);
        this.stage.addChild(this.gameBg);
        const data = {
          images: [this.queue.getResult('logo')],
          // "framerate": 0.01,
          "frames": [
            [1, 1, 743, 201, 0, 0, 0],
            [-35, 204, 745, 235, 0, 0, 0],
            [1, 441, 643, 200, 0, 0, 0]
          ],

          "animations": {
            // "logo动图_0001_图层": { "frames": [0] },
            // "logo动图_0002_图层": { "frames": [1] },
            // "logo动图_0000_图层": { "frames": [2] }
            'run': {
              frames: [2, 0, 1],
              speed: 0.005
            }
          },
        };
        const logoSheet = new createjs.SpriteSheet(data);
        const logoSprite = new createjs.Sprite(logoSheet, "run");
        console.log(canvas.height);
        logoSprite.x = 5;
        logoSprite.y = 660;
        this.gameBg.addChild(logoSprite);

        const chiData = {
          images: [this.queue.getResult('chi')],
          "framerate": 5,
          "frames": [
            [1, 1, 429, 52, 0, 0, 0],
            [1, 55, 429, 49, 0, 0, 0]
          ],

          "animations": {
            // "logo动图_0001_图层": { "frames": [0] },
            // "logo动图_0002_图层": { "frames": [1] },
            // "logo动图_0000_图层": { "frames": [2] }
            'run': {
              frames: [1, 0],
              speed: 0.08
            }
          },
        };
        const chiSheet = new createjs.SpriteSheet(chiData);
        this.chiSprite = new createjs.Sprite(chiSheet, "run");
        this.chiSprite.visible = false;
        console.log(canvas.height);
        this.stage.addChild(this.chiSprite);


        //云
        const cloud1 = new cjs.Bitmap(this.queue.getResult('cloud'));
        this.stage.addChild(cloud1);
        cloud1.y = 100;
        cloud1.x = 600;
        const cloud2 = new cjs.Bitmap(this.queue.getResult('cloud'));
        this.stage.addChild(cloud2);
        cloud2.y = 400;
        cloud2.x = 100;
        cjs.Tween.get(cloud1, { loop: true }).to({ x: 550 }, 1500).to({ x: 600 }, 1500)
        cjs.Tween.get(cloud2, { loop: true }).to({ x: 150 }, 1500).to({ x: 100 }, 1500)


        // 飞机
        this.plan = new cjs.Bitmap(this.queue.getResult('plan'));
        this.plan.x = -150;
        this.stage.addChild(this.plan);


        // 气球
        this.balloon = new cjs.Bitmap(this.queue.getResult('balloon'));
        this.balloon.x = 44;
        this.balloon.y = 270;
        cjs.Tween.get(this.balloon, { loop: true }).to({ y: 290 }, 900).to({ y: 270 }, 900);
        this.stage.addChild(this.balloon);


        // 浮动logo
        this.fly_logo = new cjs.Bitmap(this.queue.getResult('fly_logo'));
        this.fly_logo.x = 535;
        this.fly_logo.y = 410;
        this.fly_logo.visible = false;
        cjs.Tween.get(this.fly_logo, { loop: true }).to({ y: 430 }, 900).to({ y: 410 }, 900);
        this.stage.addChild(this.fly_logo);

        // //注册音乐
        createjs.Sound.alternateExtensions = ["mp3"];
        createjs.Sound.registerSounds([
          {
            src: "http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/click.mp3",
            id: "sound"
          },
          {
            src: 'http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/gameover.mp3',
            id: 'gameover'
          },
          {
            src: 'http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/shibai.mp3',
            id: 'shibai'
          },
          {
            src: 'http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/success.mp3',
            id: 'success'
          },
          {
            src: 'http://img.wx.xiao-bo.com/z/act/2019-101112/zx_gl/chi.mp3',
            id: 'chi'
          }
        ]);
        // cjs.Sound.on("fileload",this.registerBgm,this);

        this.tipsArr = [];

        //创建房子的容器
        this.stage.addChild(this.houseContainer);
        this.downContainer = new cjs.Container();
        this.stage.addChild(this.downContainer);
        this.drawPliers();
        this.hpContainer = new cjs.Container();
        this.stage.addChild(this.hpContainer);




        // 开始游戏
        this.start();
        cjs.Ticker.addEventListener('tick', e => {
          this.stage.update();
        });
      }

      //重置游戏，重新开始
      start() {
        this.pliersContainer.visible = true;
        this.houseContainer.visible = true;
        this.gameBg.y = this.bottomDir;
        this.rotateSpeed = 2;
        this.downCount = 0;
        this.score = 0;
        this.gameStart = false;
        this.time = 20;
        this.hp = 1;
        this.lastHouse = null;
        this.downContainer.removeAllChildren();
        this.downContainer.x = 0;
        this.downContainer.y = 0;
        this.lastGap = 20;
        cjs.Tween.removeTweens(this.downContainer);
        // this.drawHp();
        $('#second').html(this.time);
        $('#score').html(this.score);
        $('.ceng span').html(this.downCount);
      }

      drawHp() {
        this.hpContainer.x = 27;
        this.hpContainer.y = 140;
        for (let i = 0; i < this.hp; i++) {
          const hp = new cjs.Bitmap(this.queue.getResult('hp'));
          hp.x = i * 60;
          this.hpContainer.addChild(hp);
        }
      }

      drawPliers() {
        //钳子容器
        this.pliersContainer = new cjs.Container();
        //钳子图片
        const data = {
          images: [this.queue.getResult('machine_hand')],

          "framerate": 1,
          "frames": [
            [1, 1, 397, 504, 0, -178, -68],
            [400, 1, 382, 516, 0, -184, -68],
            [400, 1, 382, 516, 0, -184, -68],
            [784, 1, 381, 526, 0, -184, -68],
            [1167, 1, 381, 523, 0, -184, -71],
            [1550, 1, 375, 528, 0, -187, -68]
          ],
          "animations": {
            'close': { "frames": [5] },
            'open': {
              "frames": [5, 3, 2, 0, 1, 4],
              "next": 'close',
              speed: 0.5
            },
          },
        };
        const spriteSheet = new createjs.SpriteSheet(data);
        this.pliers = new createjs.Sprite(spriteSheet, "close");
        // this.pliers = new cjs.Bitmap(this.queue.getResult('pliers'));
        // //创建房子的容器
        this.pliersContainer.addChild(this.pliers);
        this.stage.addChild(this.pliersContainer);
        this.pliersContainer.deg = 0;
        this.pliersContainer.addEventListener('tick', e => {
          this.pliersContainer.deg += this.rotateSpeed;
          this.pliersContainer.x = 260 * Math.cos(this.pliersContainer.deg % 360 * Math.PI / 180);
          this.pliersContainer.y = 60 * Math.sin(this.pliersContainer.deg % 360 * Math.PI / 180) - 300;
        });
        this.drawHouse();
      }

      timeDown() {
        this.timer = setInterval(e => {
          if (this.time > 1) {
            this.time--;
          } else {
            this.time = 0;
            clearInterval(this.timer);
            this.gameOver();
          }
          $('#second').html(this.time);
        }, 1000)
      }

      gameOver() {


        this.gameStart = false;
        this.pliersContainer.visible = false;
        this.houseContainer.visible = false;
        if (prop_is_master) {
          cjs.Sound.play("gameover");
          game_floor = this.downCount + 1;
          prop_score = this.score;
          func_set_game_fun(prop_score, game_floor);
        } else {
          console.log(this.score, prop_master_fun);
          var isWin = false;

           // 挑战成功，加主人积分
          if (this.score < prop_master_fun) {
            $('.fail_mask .win_info span').html(prop_master_fun);
            $('.fail_mask .fail_info span').html(this.score);
            $('.fail_mask').show();
            isWin = false;
            func_help(this.score, 30);
            cjs.Sound.play("shibai");
          } 
            // 挑战成功，不加主人积分
          if (this.score > prop_master_fun) {
            $('.win_mask .win_info span').html(this.score);
            $('.win_mask .fail_info span').html(prop_master_fun);
            isWin = true;
            $('.win_mask').show();
            func_help(this.score, 0);
            cjs.Sound.play("success");
          }

          // 同分，挑战失败，不加主人积分
          if (this.score == prop_master_fun) {
            $('.fail_mask .win_info span').html(prop_master_fun);
            $('.fail_mask .fail_info span').html(this.score);
            $('.fail_mask').show();
            isWin = false;
            func_help(this.score, 0);
            cjs.Sound.play("shibai");
          } 

          $('.btn_wyy').off().click(function () {
            $('.mask').hide();
            $('.wyy_mask').show();
          });

          $('.btn_close').off().click(function () {
            $('.wyy_mask').hide();
            if (isWin) {
              $('.win_mask').show();

            } else {
              $('.fail_mask').show();
            }
          });

        }

      }

      //绘制楼层
      drawHouse() {
        const rmd =Math.ceil(Math.random() * 25);
        //创建的时候，把坐标设置画布之外，避免图片在0，0，位置闪烁一下
        const house = new cjs.Bitmap(this.queue.getResult('house'+rmd)).set({ x: -1000, y: -1000 });
        this.houseContainer.addChild(house);
        //房子的角度要和钳子的同步，要不然会出现错位
        house.isDown = false;
        console.log(house);
        house.height = house.image.naturalHeight;
        house.width = house.image.naturalWidth;
        house.addEventListener('tick', e => {
          if (!house.isDown) {
            house.deg = this.pliersContainer.deg;
            house.x = 260 * Math.cos(house.deg % 360 * Math.PI / 180) + 235;
            house.y = 60 * Math.sin(house.deg % 360 * Math.PI / 180) + 200;
          } else {
            house.y += 20;
            house.addScore = 100;
            if (!this.lastHouse) {
              if (!this.gameStart) {
                // 如果是主人
                if (prop_is_master) {
                  func_insert_game_key();
                }
                this.timeDown();
                this.gameStart = true;
              }

              /**
               * 375 是画布底部距离第一次停留的位置
               * house.image.naturalHeight  源图片的高度
               */
              if (house.y >= canvas.height - house.height - 350) {
                house.y = canvas.height - house.height - 350;
                cjs.Sound.play("sound");
                console.log(house.x, 375);
                if (house.x < 375 - house.width || house.x > 375) {
                  this.houseTopple(house, house.x < 375 - house.width / 2);
                } else {
                  house.removeAllEventListeners();
                  console.log(`length=${this.tipsArr.length}`);
                  
                  this.showFunHandle(house);
                  $('.ceng span').html(this.downCount + 1);
                  this.score += house.addScore;
                  if (this.score <= 0) this.score = 0;
                  $('#score').html(this.score);
                  this.downContainer.addChild(house);
                  this.drawHouse();
                  //把当前的房设置为最后的房子
                  this.lastHouse = house;
                }
              }
            } else {
              /**
               * 房子下落的y轴的位置 - 已经下落的房子容器的y轴 如果大于最后一个房子的y轴加上他的高度表示已经碰撞
               */
              if (house.y - this.downContainer.y >= this.lastHouse.y - house.height) {
                //获取两个房子的x轴的绝对值差距
                console.log(this.lastHouse.getTransformedBounds().x, house.getTransformedBounds().x, this.downContainer.x);
                house.offset = this.lastHouse.getTransformedBounds().x - house.getTransformedBounds().x + this.downContainer.x;
                const gap = Math.abs(house.offset);
                console.log(gap);
                // 判断吻合程度进行加分
                if (gap <= 10) {
                  house.x = this.lastHouse.x + this.downContainer.x;
                  // 连续两次以上吻合的加双倍分数
                  if (this.lastGap <= 10) {
                    console.log('加600分');
                    house.addScore = 350;
                  } else {
                    console.log('加300分');
                    house.addScore = 260;
                  }
                } else if (gap <= 60) {
                  console.log('加200分');
                  house.addScore = 180;
                } else if (gap <= house.width * 0.4) {
                  console.log('加100分');
                  house.addScore = 100;
                } else {
                  console.log('没得分');
                  console.log(house.offset);
                  house.addScore = -250;
                }
                // 记录上一次吻合程度
                this.lastGap = gap;
                // 不加分（房子掉下去了）
                if (house.addScore <= 0) {
                  this.houseTopple(house, house.offset > 0);
                } else {
                  house.x -= this.downContainer.x;
                  house.removeAllEventListeners();
                  // 记录已经盖了多少层
                  this.downCount++;
                  if (this.downCount > 7) {
                    this.balloon.visible = false;

                  }
                  if (this.downCount > 8) {
                    this.fly_logo.visible = true
                  }
                  $('.ceng span').html(this.downCount + 1);
                  house.y = this.lastHouse.y - house.height;

                  // 吻合程度好的添加翅膀效果
                  if (gap <= 10) {
                    this.chiSprite.x = house.x - 75 + this.downContainer.x;
                    this.chiSprite.y = house.y + 30;
                    this.chiSprite.y = this.downContainer.y + house.y + 30;
                    this.chiSprite.visible = true;
                  }

                  if (this.downCount > 2){
                    this.rotateSpeed  = 3;
                  }

                  if (this.downCount > 6){
                    this.rotateSpeed  = 3.5;
                  }
                 
                  if (this.downCount > 9){
                    this.rotateSpeed  = 4;
                  }

                  // 难点 ： 房子大于4的时候背景滑动高一点
                  if (this.downCount > 4) {
                    cjs.Tween.get(this.downContainer).to({ y: house.height * (this.downCount + 1) }, 500).to({ x: canvas.width / 2 - house.width / 2 - house.x }, 2000);
                    cjs.Tween.get(this.gameBg).to({ y: house.height * (this.downCount + 1) + this.bottomDir }, 500).call(e => {
                      this.chiSprite.visible = false;
                    });

                    

                    if (this.plan.fly) {

                    } else {
                      this.plan.x = 800;
                      this.plan.y = 500;
                      cjs.Tween.get(this.plan).to({ x: -1000, y: 400 }, 10000).call(e => {
                        this.plan.fly = false;
                      });
                      this.plan.fly = true;
                    }

                    //突然升高时要进行调整
                    if (this.downCount === 5) {
                      cjs.Tween.get(this.chiSprite).to({ y: this.chiSprite.y + house.height * 2 }, 500);
                    } else {
                      cjs.Tween.get(this.chiSprite).to({ y: this.chiSprite.y + house.height }, 500);
                    }
                  } else {
                    cjs.Tween.get(this.downContainer).to({ y: house.height * (this.downCount) }, 500).call(e => {
                      this.chiSprite.visible = false;
                    });
                    cjs.Tween.get(this.chiSprite).to({ y: this.chiSprite.y + house.height }, 500);
                    cjs.Tween.get(this.gameBg).to({ y: house.height * (this.downCount) + this.bottomDir }, 500);
                  }
                  this.downContainer.addChild(house);
                  this.lastHouse = house;
                  this.drawHouse();
                }
                if (this.gameStart) {
                  this.showFunHandle(house);
                  if (gap <= 10){
                    cjs.Sound.play("chi");
                  }else{
                    cjs.Sound.play("sound");
                  }
                  this.score += house.addScore;
                  if (this.score <= 0) this.score = 0;
                  $('#score').html(this.score);
                }
              }
            }
          }
        });

       

        //click
        $(canvas).off().on('touchstart', e => {
          this.stage.removeAllEventListeners();
          house.isDown = true;
          this.pliers.gotoAndPlay('open');
        });
      }

      // 显示加分的值
      showFunHandle(house){
        let last = {}
        if (this.lastHouse){
          last = this.lastHouse;
        }else{
          last = house;
        }
        if (this.tipsArr.length < 1) {
          let addScoreTips;
          if(house.addScore < 0){
            addScoreTips = new cjs.Text(`${house.addScore > 0 ? '+'+house.addScore:house.addScore} `, '60px Arial', '#0000ff');
          }else{
            addScoreTips = new cjs.Text(`${house.addScore > 0 ? '+'+house.addScore:house.addScore} `, '60px Arial', '#ff0000');
          }

          addScoreTips.y = this.downContainer.y+ last.y;
          addScoreTips.x = last.x + house.width / 2 - 50 + this.downContainer.x;
          addScoreTips.alpha = 1;
          cjs.Tween.get(addScoreTips).to({ regY: 20, alpha: 0 }, 500).call(e => {
            addScoreTips.regY = 0;
            this.tipsArr.push(addScoreTips);
          });
          this.stage.addChild(addScoreTips)
        } else {
          const addScoreTips = this.tipsArr.shift();
          console.log(addScoreTips);  
          if (house.addScore < 0){
            addScoreTips.color = '#0000ff';
          }else{
            addScoreTips.color = '#ff0000';
          }
          addScoreTips.text = `${house.addScore > 0 ? '+'+house.addScore:house.addScore} `;
          addScoreTips.y =this.downContainer.y+ last.y;
          addScoreTips.x = last.x + house.width / 2 - 50 + this.downContainer.x;
          addScoreTips.alpha = 1;
          cjs.Tween.get(addScoreTips).to({ regY: 20, alpha: 0 }, 500).call(e => {
            addScoreTips.regY = 0;
            this.tipsArr.push(addScoreTips);
          });
        }
      }



      //没盖好
      houseTopple(house, dir_left) {
        house.removeAllEventListeners();

        house.regY = house.height / 2;
        house.regX = house.width / 2;
        house.y += house.height / 2;
        house.x += house.width / 2;
        let offset = 0;
        let rotation = 0;
        if (dir_left) {
          offset = house.x - 60;
          rotation = -450;
        } else {
          offset = house.x + 200;
          rotation = 450;
        }
        cjs.Tween.get(house).wait(100).to({
          y: 1500,
          x: offset,
          rotation: rotation
        }, 500).call(e => {
          console.log(this.houseContainer);
          this.houseContainer.removeChild(house);
          console.log(this.houseContainer);
          // if (this.hp <= 0) {
          //   this.gameOver();
          //   clearInterval(this.timer);
          // } else {
          //   this.hp--;
          //   this.hpContainer.removeChildAt(this.hp);
          // }
          this.drawHouse();
        });
      }

      //注册音乐事件
      registerBgm(e) {
        console.log(e);
      }


      //获得一个随机值
      static random(n) {
        return Math.floor(Math.random() * n);
      }
    }

    window.Game = Game;

  })();
  const game = new Game();


  func_get_config()


  function func_insert_game_key() {
    $.ajax({
      url: 'zz_api__bapi__launch_insert_game_key',
      type: 'get',
      data: {
        game_id: Date.now()
      },
      success: function success(data) {
        func_insert_game_key_success(data);
      },
      error: function error(data) {
        console.log(data);
      },
    });
  }
  function func_insert_game_key_success(data) {
    console.log(data);
    if (!data.errcode) {
      game_key.game_date = data.game_date;
      game_key.game_id = data.game_id;
    } else {
      alert('系统繁忙，请稍后再试');
    }
  }



  // 天球交汇 --上方游戏主体,下方活动流程相关 --

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
    func_get_last();
  }

  /*发起最后一条记录*/
  function func_get_last() {
    $.ajax({
      url: 'zz_api__bapi__launch_get_last',
      type: 'post',
      success: function success(data) {
        func_get_last__success(data);
      },
      error: function error(data) {
        console.log(data);
      },
    });
  }

  function func_get_last__success(data) {
    console.log(data);

    if (data.errcode == 0) {
      prop_appsuma_id = data.master.appsuma_id;
      prop_appsumt_id = data.master_task.appsumt_id;

      // func_get_ranking();

      func_game_left_count();

    } else {
      if (data.errcode == -100) {
        //没有发起记录
        func_launch();
      } else if (data.errcode == -233) {
        // 跳转至验证页面
        // window.location.href = data.code;
      } else {
        alert(data.errmsg);
      }
    }
  }

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
      // var urlParam = '$master_id:' + prop_appsuma_id;
      // var userName =
      //   data.wx_user.wxuser_nickName.length > 6
      //     ? data.wx_user.wxuser_nickName.substr(0, 5) + '...'
      //     : data.wx_user.wxuser_nickName;

      if (data.act_status == '已结束') {


        func_alert_callb('活动已结束', function () {
          wx.closeWindow();
        });
        return;
      } else {
        $('.user1').prop('src', data.wx_user.wxuser_headimgurl);
        $('.user2').prop('src', data.master.wxuser_headimgurl)
        if (!data.master || data.wx_user.wxuser_openid === data.master.wxuser_openid) {
          prop_is_master = true;
          func_get_last();
        } else {
          func_is_help()
          prop_is_master = false;

          // game.preload();
          // appsud_id = GetQueryString('appsud_id');
          // func_data_get_by_id(appsud_id);


        }

        // $('.tip_user_header,.t_game_user_header').attr(
        //   'src',
        //   data.wx_user.wxuser_headimgurl,
        // );

        // $('.tip_user_name,.t_game_user_name').text(data.wx_user.wxuser_nickName);

        // $('.game_start_show,.t_over_show').css(
        //   'background',
        //   'url({$APP_SUPER_IMG_ROOT}/b_game_t_bg.png) no-repeat 0 0/100% 100%',
        // );
      }

      // $('.my_pic').attr('src', data.wx_user.wxuser_headimgurl);
      // $('#record_area').show();
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

      // 苇茗城

      $('.tutorial_mask').one('click',function (e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        if (prop_game_count > 0) {
          func_mask(true);
          game.preload();

        } else {
          alert('没有游戏次数了哦～');
          // $('.tutorial_mask').hide()
        }
      });


      // $('.has_game_count strong').text(prop_game_count);
      // $('.has_chou_count strong').text(data.already);

      console.log(prop_game_count);
    } else {
      console.log(data.errmsg);
    }
  }

  function func_help(fun, power) {
    $.ajax({
      url: 'zz_api__bapi__help',
      type: 'post',
      data: {
        master_id: prop_appsuma_id,
        power: power,
        int_00: fun,
        str_00: appsud_id
      },
      success: function success(data) {
        console.log(data);

        setTimeout(function () {
          func_help_success(data);
        }, 100);
      },
      error: function error(data) {
        console.log(data);
      },
    });
  }

  function func_help_success(data) {
    console.log(data);

    if (data.errcode == 0) {
    }
  }

  // history.pushState(null, null, document.URL);
  // window.addEventListener('popstate', function() {
  //   history.pushState(null, null, document.URL);
  // });

  //记录游戏分数
  function func_set_game_fun(fun, game_floor) {
    var url = 'zz_api__bapi__data_set_game_fun';

    $.ajax({
      dataType: 'json',
      url: url,
      data: {
        fun: fun,
        pid: Date.now(),
        type: 'max',
        main: 'game_ranking',
        game_id: game_key.game_id,
        date: game_key.game_date,
        int_02: game_floor,
        get_data: 1
      },
      success: function success(data, textStatus, jqXHR) {
        setTimeout(function () {
          func_set_game_fun_success(data, textStatus, jqXHR);
        }, 100);
      },
      error: function error(data, textStatus, jqXHR) {
        alert('系统繁忙，请稍后再试');
      },
    });
  }

  function func_set_game_fun_success(data, textStatus, jqXHR) {
    console.log(data);
    if (data.errcode == 0) {
      console.log(data.list.appsud_int_00);

      $('.btn_pk').click(function () {
        window.location.href =
          'a__wx_share_re?page=' +
          encodeURIComponent(
            'a__item_file__s_index?master_id:' +
            prop_appsuma_id +
            ',appsumt_id:' + prop_appsumt_id + ',appsud_id:' + data.list.appsud_id + ',fun:' + data.list.appsud_int_00 + ',game_floor:' + data.list.appsud_int_02
          );
      });

      $('.get').click(function () {
        window.location.href =
          'a__wx_share_re?page=' +
          encodeURIComponent(
            'a__item_file__s_index?master_id:' +
            prop_appsuma_id +
            ',appsumt_id:' + prop_appsumt_id + ',appsud_id:' + data.max_id + ',fun:' + data.entity_rank.appsud_int_00 + ',game_floor:' + data.max_int_02
          );
      });


      prop_game_count--;
      var { appsud_int_00 } = data.list; // 单次得分
      $('.result_mask .score').html(appsud_int_00);
      $('.layers_wrap span').html(data.list.appsud_int_02);
      $('.optimum_score_wrap span').html(data.entity_rank.appsud_int_00);
      $('.result_mask').show();


      $('.restart').off().click(function () {

        console.log(game);

        if (prop_game_count > 0) {
          game.start();
          $('.result_mask').hide();
        } else {
          alert('没有游戏次数了');
        }
      });

      // appsud_int_00
      // if (prop_game_count > 0) {
      //   func_get_ranking();
      // } else {
      //   $('.b_btn_continue').addClass('filter');
      // }



      // $('.b_btn_continue')
      //   .off()
      //   .click(function () {
      //     if (prop_game_count <= 0) {
      //       func_alert_callb('没有游戏机会了');
      //     } else {
      //       $('.t_game_over').hide();
      //       initGame.init();
      //     }
      //   });
      // $('.t_fen').text(appsud_int_00);
      // $('.t_rank').text(data.rank);
      // $('.t_game_over').show();
    } else {
      alert(data.errmsg);
    }
  }



  function func_data_get_by_id(appsud_id) {
    $.ajax({
      dataType: 'json',
      url: 'zz_api__bapi__data_get_by_id',
      data: {
        id: appsud_id
      },
      success: function success(data, textStatus, jqXHR) {
        setTimeout(function () {
          func_data_get_by_id_success(data, textStatus, jqXHR);
        }, 100);
      },
      error: function error(data, textStatus, jqXHR) {
        alert('系统繁忙，请稍后再试');
      },
    });
  }

  function func_data_get_by_id_success(data) {
    console.log(data);
    if (!data.errcode) {
      prop_master_fun = data.entity.appsud_int_00;
      $('#pk_score').html(prop_master_fun);
      $('.game-info1').show();
    } else {
      alert(data.errmsg);
    }
  }

  function func_is_help() {
    $.ajax({
      dataType: 'json',
      url: 'zz_api__bapi__power_is_help',
      data: {
        master_id: prop_appsuma_id,
      },
      success: function success(data, textStatus, jqXHR) {
        setTimeout(function () {
          func_is_help_success(data, textStatus, jqXHR);
        }, 100);
      },
      error: function error(data, textStatus, jqXHR) {
        alert('系统繁忙，请稍后再试');
      },
    });
  }

  function func_is_help_success(data, textStatus, jqXHR) {
    console.log(data);
    if (!data.errcode) {
      if (data.is_help) {
        $('.wyy_mask').show();
        $('.btn_close').hide();
        $('.tutorial_mask').hide();
      } else {
        $('.tutorial_mask').one('click',function (e) {
          e.stopPropagation();
          e.stopImmediatePropagation();
          game.preload();
          appsud_id = GetQueryString('appsud_id');
          func_data_get_by_id(appsud_id);
        });

        $('.btn_ling').click(function () {
          window.location.href = 'http://oauth.wx.xiao-bo.com/zZ6418-app_super20191206101231.aspx?site_id=zz-open-jmeii.wxacd3dab43d40510e&word=app_super20191206101231&scope=snsapi_userinfo';
        });

      }

    } else {

    }

  }


  //获取地址参数
  /**
   * @return {string}
   */
  function GetQueryString(name) {
    var reg = new RegExp('&?' + name + '(?:=|:)([^$&,]*)', 'gi');
    // console.log(reg)
    // console.log(decodeURIComponent(window.location.search.substr(1)))
    var id = '';
    decodeURIComponent(window.location.search.substr(1)).replace(reg, function (
      $1,
      $2,
    ) {
      // console.log(arguments)
      // console.log($2)
      id = $2;
    });
    // console.log(id)
    return id;
  }

  var style =
    '<style>.weui_mask_transition,.weui_mask_transparent,.weui_mask{position:fixed;top:0;left:0;z-index:999;width:100%;height:100%}.weui_mask{background:rgba(0,0,0,.6)}.weui_dialog{position:fixed;top:50%;left:50%;z-index:1000;width:85%;border-radius:3px;background-color:#fafafc;text-align:center;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.weui_dialog_hd{padding:1.2em 0 .5em}.weui_dialog_title{font-weight:400;font-size:17px}.weui_dialog_bd{padding:0 20px;color:#888;font-size:15px}.weui_dialog_ft{position:relative;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;margin-top:20px;font-size:17px;line-height:42px}.weui_btn_dialog.primary{color:#0bb20c}.weui_dialog_ft a{display:block;color:#3cc51f;text-decoration:none;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;-webkit-tap-highlight-color:transparent}a{text-decoration:none}.weui_btn_dialog.default{color:#353535}.weui_dialog_ft a{position:relative;display:block;color:#3cc51f;text-decoration:none;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;-webkit-tap-highlight-color:transparent}.weui_dialog_ft:after{position:absolute;top:0;left:0;width:100%;height:1px;border-top:1px solid #D5D5D6;color:#D5D5D6;content:" ";-webkit-transform:scaleY(.5);transform:scaleY(.5);-webkit-transform-origin:0 0;transform-origin:0 0}.weui_dialog_ft:after{position:absolute;top:0;left:0;width:100%;height:1px;border-top:1px solid #D5D5D6;color:#D5D5D6;content:" ";-webkit-transform:scaleY(.5);transform:scaleY(.5);-webkit-transform-origin:0 0;transform-origin:0 0}.weui_dialog_alert .weui_dialog_ft a:after{position:absolute;top:0;left:0;width:1px;height:100%;border-left:1px solid #D5D5D6;color:#D5D5D6;content:" ";-webkit-transform:scaleX(.5);transform:scaleX(.5);-webkit-transform-origin:0 0;transform-origin:0 0}</style>';
  $('head').append(style);
  function func_alert_callb(text, callback) {
    var html =
      '<div class="weui_dialog_alert" id="alert_callb" style="display: none;"><div class="weui_mask"></div><div class="weui_dialog"><div class="weui_dialog_hd"><strong class="weui_dialog_title">提示</strong></div><div class="weui_dialog_bd"></div><div class="weui_dialog_ft"><a href="javascript:;" class="weui_btn_dialog primary">确定</a></div></div></div>';
    $('body').append(html);
    var tk = $('#alert_callb');

    tk.find('.weui_dialog_bd').html(text);
    tk.find('.weui_btn_dialog').click(function () {
      tk.remove();
      if (callback && typeof callback === 'function') {
        callback();
      }
    });
    tk.show();
  }




});


