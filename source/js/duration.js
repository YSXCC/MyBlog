!(function() {
    fetch('https://v1.hitokoto.cn')
    .then(function (res){
      return res.json();
    })
    .then(function (data) {
      var hitokoto = document.getElementById('hitokoto');
      hitokoto.innerText = data.hitokoto + '——【' + data.from + '】';
    })
    .catch(function (err) {
      console.error(err);
    })
    function update() {
      var now = new Date();
      var grt = new Date("2020-05-24 00:00:00");  /** 此处是计时的起始时间 **/
      now.setTime(now.getTime()+250);
      days = (now - grt ) / 1000 / 60 / 60 / 24;
      dnum = Math.floor(days);
      hours = (now - grt ) / 1000 / 60 / 60 - (24 * dnum);
      hnum = Math.floor(hours);
      if(String(hnum).length === 1 ){
        hnum = "0" + hnum;
      }
      minutes = (now - grt ) / 1000 /60 - (24 * 60 * dnum) - (60 * hnum);
      mnum = Math.floor(minutes);
      if(String(mnum).length === 1 ){
        mnum = "0" + mnum;
      }
      seconds = (now - grt ) / 1000 - (24 * 60 * 60 * dnum) - (60 * 60 * hnum) - (60 * mnum);
      snum = Math.round(seconds);
      if(String(snum).length === 1 ){
        snum = "0" + snum;
      }
      document.getElementById("timeDate").innerHTML = "WeTree已经成长了&nbsp"+dnum+"&nbsp天";
      document.getElementById("times").innerHTML = hnum + "&nbsp小时&nbsp" + mnum + "&nbsp分&nbsp" + snum + "&nbsp秒";
    }
    setInterval(update, 1000);
  })();