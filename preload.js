class Preload {
  constructor(supper){

  }
  index = 0;
  // 
  loadding(callback) {
    let homeImgArr = $('.home img')
    let homeImgArrLenth = homeImgArr.length + 1
    let index = 0
    for (let i = 0; i < homeImgArr.length; i++) {
      let image = new Image()
      let originalImage = $($('.home img')[i])
      image.src = $($('.home img')[i]).data().original

      image.onload = function () {
        //图片下载完毕时异步调用callback函数。
        index++
        originalImage.attr('src', image.src)
        $('.loading-tips').html(
          Number((index / homeImgArrLenth) * 100).toFixed(0) + '%'
        )
        if (index === homeImgArrLenth) {
          $('.loading-wrap').hide()
        }
      }
    }
  }
  complete(){
    //图片下载完毕时异步调用callback函数。
    index++
    originalImage.attr('src', image.src)
    $('.loading-tips').html(
      Number((index / homeImgArrLenth) * 100).toFixed(0) + '%'
    )
    if (index === homeImgArrLenth) {
      $('.loading-wrap').hide()
    }
  }
}