document.addEventListener('plusready', function (a) {
    var first = '';
    plus.key.addEventListener('backbutton', function () {
      //获取地址栏目中的url
      var urls = location.hash.split('/')[1]
      if (urls === 'index') {//判断是首页的时候点击二次退出app
        if (new Date().getTime() - first < 3000) {
          // console.log("关闭程序")
          plus.runtime.quit();
        } else {
          alertMsg("再按一次退出应用");//自定义的弹窗
          first = new Date().getTime();
        }
      } else {
        history.go(-1)
      }
    }, false);
  });