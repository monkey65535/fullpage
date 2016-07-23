/**
 * Created by Artoria on 2016/7/23 0023.
 */
window.onload = function () {
    //元素跟随鼠标移动
    function bgMove(parentNode, childNode) {
        var parent = document.querySelector(parentNode);
        var moveNode = parent.querySelectorAll(childNode);
        var screenWherf = document.documentElement.clientWidth/2;
        var screenHherf = document.documentElement.clientHeight/2;
        parent.addEventListener('mousemove',function (ev) {
            for(var i=0; i<moveNode.length ;i++){
                var moveNum = moveNode[i].getAttribute('data-move');
                var x = -(ev.clientX - screenWherf)/moveNum;
                var y = -(ev.clientY - screenHherf)/moveNum;
                moveNode[i].style.transform = 'translate('+x+'px,'+y+'px'+')';
            }
        },false)
    }
    var moveSec = ['.slide-1','.slide-3','.slide-5','.slide-6'];
    for(var i=0; i<moveSec.length;i++){
        bgMove(moveSec[i],'.mouse-move');
    }
    //第二屏动画
    
};