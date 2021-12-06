(function(){
   let outer = document.getElementById("outer");
   let inner = document.getElementById("inner");
   let list = document.getElementById("list");
   let right = document.getElementById("right");
   let left = document.getElementById("left");
   let data;
   let step=0;
   function getData(){
       let xhr = new XMLHttpRequest;
       xhr.open("get","./data.json",false);
       xhr.onreadystatechange = function(){
           if(xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){ 
              data = JSON.parse(xhr.responseText);
           }
       }
       xhr.send();
   }
   getData()
   function randerHTML(){
       let innerItems = "";
       let listItems = "";
       data.forEach((item,index)=>{
         innerItems +=`<li><img src="${item.img}"alt=""></li>`;
         listItems += `<li></li>`
         inner.innerHTML = innerItems;
         list.innerHTML = listItems;
       })
   }   
   randerHTML() 
    function autoMove(){
        step++;
        if(step=4){
         inner.style.left=0;
         step=1   
        }
        follow();
        move(inner,{left:-800*step},500)
    }
      
   let timer = setInterval(autoMove,3000);
   function debounce(fn,time){
      let timer;
      return function(){
          clearTimeout(timer);
          let now = !timer;
          timer = setTimeout(function(){
              timer = null;
          },time)
          if(now){
            fn.call(this)
          }
      }
      
   }
    outer.onmouseenter = function(){
        clearInterval(timer)
    };
    outer.onmouseleave = function(){
        timer = setInterval(autoMove,3000);
    }
    let tips = document.querySelectorAll(".list li");
    function bind(){
        for(let i=0;i<tips.length;i++){
             step = i-1;
             autoMove(); 
        }
    }
    // bind()
   function follow(){
       for(let i=0;i<tips.length;i++){
           if(i==step){
               tips[i].classList.add("active")
           }else{
               tips[i].classList.remove("active");
           } 
       }
   }
   follow()

    right.onclick = debounce(function(){
      autoMove();    
    },500) 
                                                                              









})()