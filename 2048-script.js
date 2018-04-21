
var indexArr=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
var score=0;
function startGame(){
	randomDiv();randomDiv();
}
function reStart(){
	var alls=document.getElementById("moveBox");
	var divs=alls.getElementsByTagName("div");
	for(var i=0;i<divs.length;i++){
		if(divs[i].style){ divs[i].style="";}
		divs[i].innerHTML="";
		divs[i].className="numStart";
	}
	indexArr=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
	startGame();
}

function randomDiv(){
	var iR,jR;
	while(1){
		iR=createRandomNum(0,3);
		jR=createRandomNum(0,3);
		if(indexArr[iR][jR]==0){
			break;
		}
	}
	indexArr[iR][jR]=1;
	var str="dv"+iR+"_"+jR;
	var obj=document.getElementById(str);
	obj.style="";
	obj.innerHTML=2;
	obj.className="num2";
	animate(obj,{"width":80,"height":80,"top":iR*90+10,"left":jR*90+10},{"width":0,"height":0,"top":iR*90+50,"left":jR*90+50});

}
function createRandomNum(Min,Max){
      var Range = Max - Min;
      var Rand = Math.random();
      var num = Min + Math.round(Rand * Range);
      return num;
}

function divDouble(obj){
	var num=parseInt(obj.innerHTML)*2;
	obj.className="num"+num;
	obj.innerHTML=num;
}
function backToStart(obj){
	var str=obj.id;
	var x=str[2];
	var y=str[4];
	obj.className="numStart";
	obj.style="";
	obj.style.top=90*x+10+"px";
	obj.style.left=90*y+10+"px";
}

function winlose(){
	var alls=document.getElementById("moveBox");
	var divs=alls.getElementsByTagName("div");
	var arr=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
	for(var i=0;i<divs.length;i++){
		if(divs[i].innerHTML==2048){
			return "Win";
		}
		var str=divs[i].id;
		var x=str[2];
		var y=str[4];
		if(divs[i].className!="numStart"){
			arr[x][y]=divs[i].innerHTML;
		}
	}
	var result=0;
	var index=false;
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			result+=indexArr[i][j];
			if(j-1>=0 && arr[i][j]==arr[i][j-1]){
				index=true;
			}
			if(j+1<4 && arr[i][j]==arr[i][j+1]){
				index=true;
			}
		}
	}
	for(var j=0;j<4;j++){
		for(var i=0;i<4;i++){
			if(i-1>=0 && arr[i][j]==arr[i-1][j]){
				index=true;
			}
			if(i+1<4 && arr[i][j]==arr[i+1][j]){
				index=true;
			}
		}
	}
	if(result==16 && !index){
		return "Lose";
	}
	return 0;
}

document.onkeyup=function(e){
	var e= window.event||e ;
	var scoreObj=document.getElementById("score");
	switch(e.keyCode){
		case 37:
			moveLeft();  break;
		case 38:
			moveUp();    break;
		case 39:
			moveRight(); break;
		case 40:
			moveDown();  break;
	}
	scoreObj.value=score+"";
	var winOrLose=winlose();
	if(winOrLose=="Win"){
		alert("Win");
		reStart();
	}else if(winOrLose=="Lose"){
		alert("Lose");
		reStart();
	}
	if(winOrLose!=="Win"){
		randomDiv();
	}
}
function moveLeft(){
	for(var i=0;i<4;i++){
		var dstIndex=0;
		var compareNum=0;
		var limit=false;
		for(var j=0;j<4;j++){
			if(indexArr[i][j]==0){
				dstIndex++;
			}else{
				var obj1=document.getElementById("dv"+i+"_"+j);
				if(limit==false&&obj1.innerHTML==compareNum){
					divDouble(obj1);
					var j2=j-dstIndex-1;
					var obj2=document.getElementById("dv"+i+"_"+j2);
					var innerObj1=obj1.innerHTML;
					backToStart(obj1);
					obj2.className="num"+innerObj1;
					obj2.innerHTML=innerObj1;
					indexArr[i][j]=0;
					indexArr[i][j2]=1;
					limit=true;
					dstIndex++;
					score+=parseInt(innerObj1);
				}else{
					compareNum=obj1.innerHTML;
					var j2=j-dstIndex;
					var obj2=document.getElementById("dv"+i+"_"+j2);
					var innerObj1=obj1.innerHTML;
					backToStart(obj1);
					obj2.className="num"+innerObj1;
					obj2.innerHTML=innerObj1;
					indexArr[i][j]=0;
					indexArr[i][j2]=1;
					limit=false;
				}
			}
		}
	}
}
function moveUp(){
	for(var j=0;j<4;j++){
		var dstIndex=0;
		var compareNum=0;
		var limit=false;
		for(var i=0;i<4;i++){
			if(indexArr[i][j]==0){
				dstIndex++;
			}else{
				var obj1=document.getElementById("dv"+i+"_"+j);
				if(limit==false&&obj1.innerHTML==compareNum){
					divDouble(obj1);
					var i2=i-dstIndex-1;
					var obj2=document.getElementById("dv"+i2+"_"+j);
					var innerObj1=obj1.innerHTML;
					backToStart(obj1);
					obj2.className="num"+innerObj1;
					obj2.innerHTML=innerObj1;
					indexArr[i][j]=0;
					indexArr[i2][j]=1;
					limit=true;
					dstIndex++;
					score+=parseInt(innerObj1);
				}else{
					compareNum=obj1.innerHTML;
					var i2=i-dstIndex;
					var obj2=document.getElementById("dv"+i2+"_"+j);
					var innerObj1=obj1.innerHTML;
					backToStart(obj1);
					obj2.className="num"+innerObj1;
					obj2.innerHTML=innerObj1;
					indexArr[i][j]=0;
					indexArr[i2][j]=1;
					limit=false;
				}
			}
		}
	}
}
function moveRight(){
	for(var i=0;i<4;i++){
		var dstIndex=0;
		var compareNum=0;
		var limit=false;
		for(var j=3;j>=0;j--){
			if(indexArr[i][j]==0){
				dstIndex++;
			}else{
				var obj1=document.getElementById("dv"+i+"_"+j);
				if(limit==false&&obj1.innerHTML==compareNum){
					divDouble(obj1);
					var j2=j+dstIndex+1;
					var obj2=document.getElementById("dv"+i+"_"+j2);
					var innerObj1=obj1.innerHTML;
					backToStart(obj1);
					obj2.className="num"+innerObj1;
					obj2.innerHTML=innerObj1;
					indexArr[i][j]=0;
					indexArr[i][j2]=1;
					limit=true;
					dstIndex++;
					score+=parseInt(innerObj1);
				}else{
					compareNum=obj1.innerHTML;
					var j2=j+dstIndex;
					var obj2=document.getElementById("dv"+i+"_"+j2);
					var innerObj1=obj1.innerHTML;
					backToStart(obj1);
					obj2.className="num"+innerObj1;
					obj2.innerHTML=innerObj1;
					indexArr[i][j]=0;
					indexArr[i][j2]=1;
					limit=false;
				}
			}
		}
	}
}
function moveDown(){
	for(var j=0;j<4;j++){
		var dstIndex=0;
		var compareNum=0;
		var limit=false;
		for(var i=3;i>=0;i--){
			if(indexArr[i][j]==0){
				dstIndex++;
			}else{
				var obj1=document.getElementById("dv"+i+"_"+j);
				if(limit==false&&obj1.innerHTML==compareNum){
					divDouble(obj1);
					var i2=i+dstIndex+1;
					var obj2=document.getElementById("dv"+i2+"_"+j);
					var innerObj1=obj1.innerHTML;
					obj2.className="num"+innerObj1;
					obj2.innerHTML=innerObj1;
					backToStart(obj1);
					indexArr[i][j]=0;
					indexArr[i2][j]=1;
					limit=true;
					dstIndex++;
					score+=parseInt(innerObj1);
				}else{
					compareNum=obj1.innerHTML;
					var i2=i+dstIndex;
					var obj2=document.getElementById("dv"+i2+"_"+j);
					var innerObj1=obj1.innerHTML;
					backToStart(obj1);
					obj2.className="num"+innerObj1;
					obj2.innerHTML=innerObj1;
					indexArr[i][j]=0;
					indexArr[i2][j]=1;
					limit=false;
				}
			}
		}
	}
}

startGame();
var btn=document.getElementById("Restart");
btn.addEventListener("click",function(){
	reStart();
},false);

