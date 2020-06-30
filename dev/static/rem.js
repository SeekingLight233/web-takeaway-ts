//rem.js并不会经过webpack的构建，因此要用es5的写法

;(function name() {
  var docEL = document.documentElement

  //动态设置html的fontsize
  function setRemUnit() {
    //clientWidth为元素的内部宽度(包括padding)
    var rem = docEL.clientWidth / 10
    docEL.style.fontSize = rem + "px"
    console.log("设置成功！！！！！！！！！！！！")
  }

  setRemUnit()
  window.addEventListener("resize", setRemUnit) //当浏览器窗口改变时触发
})()
