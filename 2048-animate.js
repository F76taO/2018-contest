function animate(dom,obj,item){
	clearInterval(dom.timer);
	if(item){
		for(var x in item){
			dom.style[x]=item[x];
		}
	}
	dom.timer=setInterval(function(){
		var bool=true;
		for(var k in obj){

			if(k=="opacity"){
				var objAttr=parseFloat(getAttr(dom,k))*100;
			}else{
				var objAttr=parseInt(getAttr(dom,k));
			}
			var speed=(obj[k]-objAttr)/5;
			speed=speed>0 ? Math.ceil(speed) : Math.floor(speed) ;

			if(obj[k]!=objAttr){
				bool=false;
			}
			if(k=="opacity"){
				dom.style.filter="alpha(opacity:"+objAttr+speed+")";
				dom.style[k]=(objAttr+speed)/100;
			}else{
				dom.style[k]=objAttr+speed+"px";
			}
		}
		var judge=false;
		if(obj["left"]&&obj["left"]===item["left"] || obj["top"]&&obj["top"]===item["top"]){
			judge=true;
		}
		if(judge||bool){
			clearInterval(dom.timer);
		}
	},30)
}
function getAttr(dom,attr){
	if(dom.currentStyle){
		return dom.currentStyle[attr];
	}else{
		return getComputedStyle(dom,null)[attr];
	}
}