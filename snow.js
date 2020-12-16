/**
 * Created by ajex on 2017/4/11.
 */
(function () {
  let canvas,
    stage,
    container1,
    container2,
    images = {};
  function init() {
    createjs.MotionGuidePlugin.install();
    canvas = document.getElementById("snowCanvas");
    const clientWidth = window.innerWidth;
    const clientHeight = window.innerHeight * 1.4;
    canvas.width = clientWidth;
    canvas.height = clientHeight;
    stage = new createjs.Stage(canvas);
    container1 = new createjs.Container(); //后雪景容器
    stage.addChild(container1);
    // container2 = new createjs.Container(); //前雪景容器
    stage.addChild(container2);

    let loader = new createjs.LoadQueue(false);
    loader.addEventListener("fileload", handleFileLoad);
    loader.addEventListener("complete", completeHandler);
    loader.loadManifest([
      { src: "https://filex.wx.siyoumi.com/app/act/t_002/img/snow.png", id: "snow1" },
      { src: "https://filex.wx.siyoumi.com/app/act/t_002/img/snow-dian.png", id: "snow2" },
    ]);

    createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stageBreakHandler);
  }
  function handleFileLoad(evt) {
    if (evt.item.type == "image") {
      images[evt.item.id] = evt.result;
    }
  }
  function completeHandler(event) {
    event.currentTarget.removeEventListener("fileload", handleFileLoad);
    event.currentTarget.removeEventListener("complete", completeHandler);
    stageBreakHandler();
    createSnow();
  }

  //雪花数组 用作回收
  let _snow1List = [];

  function createSnow() {
    let i;
    let snow;
    let scale;
    for (i = 0; i < 50; i++) {
      //后景雪
      snow = getSnow();
      scale = 0.2 + Math.random() * 1 - 0.5;
      snow.scaleX = scale;
      snow.scaleY = scale;
      snow.x = Math.random() * canvas.width;
      snow.y = -Math.random() * canvas.height;
      snow.speed = 0.5 + Math.random() * 1;
      snow.rotation = 360 * Math.random();
      _snow1List.push(snow);
      container1.addChild(snow);
    }
  }
  function lightFrameHandler() {
    let i;
    let snow;
    let scale;
    for (i = 0; i < container1.numChildren; i++) {
      mc = container1.getChildAt(i);

      // mc.x -= 0.1;
      mc.y += mc.speed;
      // mc.alpha -= 0.001;
      if (mc.flower) {
        mc.rotation += 1;
      }
      if (mc.y > canvas.height + 100) {
        // mc.alpha = 1;
        scale = 0.2 + Math.random() * 1 - 0.5;
        mc.scaleX = scale;
        mc.scaleY = scale;

        mc.x = Math.random() * canvas.width;
        mc.y = -Math.random() * canvas.height;
      }
    }
  }
  //为什么不直接做成一个对象，通过参数改变子对象呢？
  // 因为如果这样做new一个对象，相当于new所有子对象，
  // 而且这个对象本身又new的多 这种情况生成多个对象时很浪费性能的
  function getSnow() {
    let random = Math.random() * 10;
    let snow;
    if (random > 8) {
      snow = new createjs.Bitmap(images.snow1);
      snow.flower = true;
    } else {
      snow = new createjs.Bitmap(images.snow2);
    }
    return snow;
  }
  function stageBreakHandler(event) {
    lightFrameHandler();
    stage.update();
  }
  init();
})();