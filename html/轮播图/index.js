(function(){
    let outer = document.getElementById("outer");
    let inner = document.getElementById("inner");
    let list = document.getElementById("list");
    let left = document.getElementById("left");
    let right = document.getElementById("right");
    let data = null;
    let step = 0;  
    function debounce(fn,time){
        let timer2;
        return function(){
            clearTimeout(timer2)
            timer2 = setTimeout(function(){
              fn.call(this)
            },time)
        }
    }
    function  getData(){
        let xhr = new XMLHttpRequest;
        xhr.open("get","./data.json",false);
        xhr.onreadystatechange = function(){
            if(xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){
                data = JSON.parse( xhr.responseText);
            }
        }
        xhr.send();
        console.log(data)
    }
    getData()
    function randomHTML(){
        let innerItems = "";
        let listItems = "";
         data.forEach(function(item,index){
            innerItems += `<li><img src="${item.img}" alt=""></li>`;
            listItems += `<li></li>`
         })
         innerItems +=   `<li><img src="${data[0].img}" alt=""></li>`
         inner.innerHTML = innerItems;
         list.innerHTML = listItems;
    }
   randomHTML()
       
    function moveItems(){
        step++
        console.log(step)
        if(step>=4){
            inner.style.left = 0;
            step = 1
        }
       console.log(step)
       bind();
       move(inner,{left:-800*step},500)
    } 

   let timer = setInterval(moveItems,2000)
   outer.onmouseenter = function(){
       clearInterval(timer)
   };
   outer.onmouseleave = function(){
    timer = setInterval(moveItems,2000)
   }
   let tips = document.querySelectorAll(".list li")
   console.log(tips)
    function bind(){
        for(let i=0;i<tips.length;i++){
            if(i===step){
               tips[i].classList.add("active")
            }else{
                tips[i].classList.remove("active")
            }
           
        }
        if(step==tips.length){
            tips[0].classList.add("active")
        }
    }
    bind();


     function follow(){
         for(let i=0;i<tips.length;i++){
             tips[i].onclick = function(){
                  step = i-1
                  moveItems()
             }  
         }
     }
    follow()
    
    
        right.onclick = debounce( function(){
            moveItems();},200)
 
    left.onclick = function(){
        step-=2;
       
        if(step===-2){
         list.style.left = (data.length)*-800+"px"
         step=3
        }
        moveItems() 
    }


})()