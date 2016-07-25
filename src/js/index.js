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

    var moveSec = ['.slide-1', '.slide-3', '.slide-5', '.slide-6'];
    for (var i = 0; i < moveSec.length; i++) {
        bgMove(moveSec[i], '.mouse-move');
    }

    //滚轮效果
    document.addEventListener('mousewheel', function () {
        console.log(1);
    });

    //第二屏动画
    var screenTwoLeft = document.querySelector(".left-text");
    var twoN = 0;
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

    seesaw.addEventListener("click",function () {
        if(threeOnoff){
            seeLeftText.className = "left-text hide";
            seeRightText.className = "right-text show";
            seeLeftTips.className = "left-tips show-tips";
            seeRightTips.className = "right-tips hide-tips";
            threeOnoff = false;
        }else {
            seeLeftText.className = "left-text show";
            seeRightText.className = "right-text hide";
            seeLeftTips.className = "left-tips hide-tips";
            seeRightTips.className = "right-tips show-tips";
            threeOnoff = true;
        }
        var showTips = screenThree.querySelector(".show-tips");
        console.log(getComputedStyle(showTips).bottom);
        var timer = setInterval(function () {

        },300)
    });



    //第四屏动画 nav部分
    var screenFour = document.querySelector(".slide-4");
    var fourNav = screenFour.querySelector(".s4-nav ");
    var fourNavLi = fourNav.querySelectorAll("li");
    for(var i =0; i<fourNavLi.length;i++){
        setTimeout(function (i) {
            mTween(fourNavLi[i],{marginTop:0,opacity:1},"300","easeIn",function () {
                //吧添加的鼠标事件写进回调函数中，防止在初次动画没有执行完毕的时候就有鼠标的事件，造成BUG
                fourNavLi[i].addEventListener('mouseover',function (ev) {
                    mTween(this,{marginTop:-10},300,"linear");
                    ev.stopPropagation();
                });
                fourNavLi[i].addEventListener('mouseout',function (ev) {
                    mTween(this,{marginTop:0},300,"linear");
                    ev.stopPropagation();
                });
            });
        },300*i,i)
    }

    //滚轮移动
};