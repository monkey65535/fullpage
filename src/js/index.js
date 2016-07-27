/**
 * Created by Artoria on 2016/7/23 0023.
 */
window.onload = function () {
    //元素跟随鼠标移动
    function bgMove(parentNode, childNode) {
        var parent = document.querySelector(parentNode);
        var moveNode = parent.querySelectorAll(childNode);
        var screenWherf = document.documentElement.clientWidth / 2;
        var screenHherf = document.documentElement.clientHeight / 2;
        parent.addEventListener('mousemove', function (ev) {
            var ev = ev || event;
            for (var i = 0; i < moveNode.length; i++) {
                var moveNum = moveNode[i].getAttribute('data-move');
                var x = -(ev.clientX - screenWherf) / moveNum;
                var y = -(ev.clientY - screenHherf) / moveNum;
                moveNode[i].style.transform = 'translate(' + x + 'px,' + y + 'px' + ')';
            }
        }, false)
    }

    var moveSec = ['.slide-1', '.slide-3', '.slide-6'];
    for (var i = 0; i < moveSec.length; i++) {
        bgMove(moveSec[i], '.mouse-move');
    }

    //实现滚动条监控
    var secs= document.querySelectorAll(".sec");
    var dotUl = document.querySelector(".right-dots");
    var dots = dotUl.querySelectorAll("li");
    var secArr = [];
    for(var i=0;i<secs.length;i++){
        secArr.push(secs[i].offsetTop);
    }
    console.log(secArr);
    //secArr.push(document.documentElement.clientHeight);
    //当页面改变的时候改变secArr的值
    window.addEventListener('resize',function () {
        secArr = [];
        for(var i=0;i<secs.length;i++){
            secArr.push(secs[i].offsetTop);
        }
    });

    //当鼠标移动的时候，判断当前的scroll的位置
    window.addEventListener("scroll",dotsMove);
    function dotsMove() {
        var scrollMove = document.body.scrollTop || document.documentElement.scrollTop;
        //比较滚动条的高度和数组中的数据，如果滚动条的高度小于数组中的0和1的话就在第0个，依次类推
        for(var i=0; i<secArr.length; i++){
            if(scrollMove>=secArr[i] && scrollMove <secArr[i+1]){
                for(var j=0; j<dots.length;j++){
                    dots[j].className = "";
                }
                dots[i].className = "active";
            }
        }
    }

    //第二屏动画
    var screenTwoLeft = document.querySelector(".left-text");
    var lis = screenTwoLeft.querySelectorAll("li");

    function twoAni(obj) {
        var round = obj.querySelector(".round");
        var text = obj.querySelector(".text");
        var tips = obj.querySelector(".tips");
        var span = obj.querySelector("span");
        mTween(round, {width: 60, height: 60, opacity: 1}, 200, "easeIn", function () {
            mTween(text, {marginLeft: -10, opacity: 1}, 200, "easeIn", function () {
                mTween(tips, {marginLeft: -10, opacity: 1}, 200, "easeIn", function () {
                    if (span) {
                        mTween(span, {height: 60, opacity: 1}, 200, "easeIn");
                    }
                });
            });
        })
    }

    //第二屏动画调用
    for (var i = 0; i < lis.length; i++) {
        setTimeout(function (i) {
            twoAni(lis[i]);
        }, 800 * i, i);
    }

    //第三屏动画
    var threeOnoff = true;
    var screenThree = document.querySelector(".slide-3");
    var seesaw = screenThree.querySelector(".human");
    var seeLeftText = screenThree.querySelector(".left-text");
    var seeRightText = screenThree.querySelector(".right-text");
    var seeLeftTips = screenThree.querySelector(".left-tips");
    var seeRightTips = screenThree.querySelector(".right-tips");
    seesaw.addEventListener("click", function () {
        if (threeOnoff) {
            seeLeftText.className = "left-text hide";
            seeRightText.className = "right-text show";
            seeLeftTips.className = "left-tips show-tips";
            seeRightTips.className = "right-tips hide-tips";
            threeOnoff = false;
        } else {
            seeLeftText.className = "left-text show";
            seeRightText.className = "right-text hide";
            seeLeftTips.className = "left-tips hide-tips";
            seeRightTips.className = "right-tips show-tips";
            threeOnoff = true;
        }
    });



    //第四屏动画 nav部分
    var screenFour = document.querySelector(".slide-4");
    var fourNav = screenFour.querySelector(".s4-nav ");
    var fourNavLi = fourNav.querySelectorAll("li");
    for (var i = 0; i < fourNavLi.length; i++) {
        setTimeout(function (i) {
            mTween(fourNavLi[i], {marginTop: 0, opacity: 1}, "300", "easeIn", function () {
                //吧添加的鼠标事件写进回调函数中，防止在初次动画没有执行完毕的时候就有鼠标的事件，造成BUG
                fourNavLi[i].addEventListener('mouseover', function (ev) {
                    mTween(this, {marginTop: -10}, 300, "linear");
                    ev.stopPropagation();
                });
                fourNavLi[i].addEventListener('mouseout', function (ev) {
                    mTween(this, {marginTop: 0}, 300, "linear");
                    ev.stopPropagation();
                });
            });
        }, 300 * i, i)
    }

    //第四屏自定义滚动条
    var workTabs = screenFour.querySelector(".work-tabs");
    var worklist = screenFour.querySelector(".work-list");
    var workLI = worklist.querySelectorAll("li");
    var scrollBar = document.getElementById("scroll-bar");
    var scrollBlock = document.getElementById("scroll-block");
    var disX = 0;
    //设定worklist的宽度
    worklist.style.width = workLI[0].offsetWidth*workLI.length + 100 +"px";
    //计算滚动条可以移动的距离和内容区域可以移动的距离(左右各一像素阴影)
    var scrollDoMove = scrollBar.clientWidth-scrollBlock.offsetWidth-2;
    var tabsDoMove = worklist.clientWidth - workTabs.clientWidth;
    //自定义滚动条
    scrollBlock.addEventListener("mousedown",function (ev) {
        disX =ev.clientX - this.offsetLeft;
        document.addEventListener("mousemove",moveBar);
        document.addEventListener("mouseup",function () {
            document.removeEventListener("mousemove",moveBar);
        });
        ev.preventDefault();
    });
    function moveBar(ev) {
        var ev = ev || event;
        var left = ev.clientX - disX;
        if(left <=1){
            left=1;
        }else if(left>=scrollBar.clientWidth-scrollBlock.offsetWidth-1){
            left = scrollBar.clientWidth-scrollBlock.offsetWidth-1;
        }
        scrollBlock.style.left = left+ "px";
        worklist.style.left = -(left/scrollDoMove)*tabsDoMove +"px";
        //计算
    }
    //鼠标滚轮触发滚动条
    mScroll(workTabs,function () {
        //这里是鼠标滚轮向上滚动的事件
        var X = scrollBlock.offsetLeft;
        X-=100;
        if(X<=1){
            X=1;
        }
        //mTween(scrollBlock,{left:X},300,"linear");
        scrollBlock.style.left = X +　"px";
        worklist.style.left = -(X/scrollDoMove)*tabsDoMove +"px";
    },function () {
        //这里是鼠标滚轮向下滚动的事件
        var X = scrollBlock.offsetLeft;
        X+=100;
        if(X>=scrollBar.clientWidth-scrollBlock.offsetWidth-1){
            X=scrollBar.clientWidth-scrollBlock.offsetWidth-1;
        }
        //mTween(scrollBlock,{left:X},300,"linear");
        scrollBlock.style.left = X +　"px";
        worklist.style.left = -(X/scrollDoMove)*tabsDoMove +"px";
    });



    //封装鼠标滚动函数
    function mScroll(obj, callBackUp, callBackDown) {
        obj.onmousewheel = fn;
        obj.addEventListener('DOMMouseScroll',fn);
        function fn(ev) {
            var ev = ev || event;
            if(ev.wheelDelta == 120 || ev.detail == -3){
                //这个时候是向上滚动
                callBackUp();
            }else {
                //那相反就是向下滚动了
                callBackDown();
            }
            //组织默认事件
            ev.preventDefault();
        }
    }
};
