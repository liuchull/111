


function linear(t,d,c,b){
    return (t/d)*c+b
}
function move(curEle,target,duration,callBack){
    let time = 0;
    let begin = {};
    let change = {};
    for(let key in target){
        begin[key] = parseFloat(getComputedStyle(curEle)[key]);
        change[key] = target[key] - begin[key];
    }
    let timer = setInterval(function(){
       time+=20;
        for(let key in change){
          curEle.style[key] = linear(time,duration,change[key],begin[key])+"px";
        }
        if(time>duration){
              clearInterval(timer);
              callBack?callBack():null;
        }
    },17)
}  