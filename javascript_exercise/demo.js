/*
function paraText(){
document.getElementById('pt').innerHTML = getSum(2,4,sum);

}
function sum(para1,para2){
  return para1+para2;
}

function getSum(para1,para2,fn){
 return fn(para1,para2);
}


(function(){
  var i=0;
  var  move = function(){
       var movTop =20;
       var movleft=20;
      var el = document.getElementById("box");
      left = el.offsetLeft;
      top = el.offsetTop;
    //  el.style.left = left+movleft+"px";
      el.style.top = top+movTop+"px";
      if(top>400){
        clearTimeout(timer);
      }
   };
  var timer =setInterval(move,2000);
}());
*/
function createList(){

var  el = document.getElementById("list");
var list =["item1","item2","item3","item4"];
var text ="<ul>";
for(var i=0;i<list.length;i++)  {
 text = text+ "<li>" + list[i] + "</li>";
}
  text+= "</ul>";
  el.innerHTML=text;
}
