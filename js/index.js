(function (params) {
  var _closeBtn = document.querySelector('.fy-cross');
  var _openBtn = document.querySelector('.fy-menu');
  var _menu = document.querySelector('.left-col');
  var _wrapper = document.querySelector('.right-col');
  _closeBtn.onclick = function () {
    _menu.style.display = 'none' // display动画切换需要setTimeout延迟100
    _wrapper.style.left = 107 + 'px'
  }
  _openBtn.onclick = function () {
    _wrapper.style.left = 514 + 'px'
    _menu.style.display = 'block'
  }
})()