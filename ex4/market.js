
function getMarketInfoArrayByText(marketInfoArray) {
  	var text="";
  	var now=new Date();
  
  	text=text+
	now.getFullYear()+"/"+now.getMonth()+"/"+now.getDate()+"("+
	now.getHours()+":"+now.getMinutes()+")\n"+
  	"舦计:"+marketInfoArray[1][marketInfoArray[0].indexOf('"505"')]+"\n"+
  	"Θユ秖:"+marketInfoArray[1][marketInfoArray[0].indexOf('"423"')]+"\n"+
  	"害產计:"+marketInfoArray[1][marketInfoArray[0].indexOf('"530"')]+"\n"+
  	"害氨產计:"+marketInfoArray[1][marketInfoArray[0].indexOf('"533"')]+"\n"+
  	"禴產计:"+marketInfoArray[1][marketInfoArray[0].indexOf('"531"')]+"\n"+
  	"禴氨產计:"+marketInfoArray[1][marketInfoArray[0].indexOf('"534"')]+"\n"+
	"キ產计:"+marketInfoArray[1][marketInfoArray[0].indexOf('"532"')]+"\n"+
  	"礚ユ產计:"+marketInfoArray[1][marketInfoArray[0].indexOf('"535"')]+"\n"
  	;
  	return text;
}

/*
	琌 marketInfo ﹃ず甧癸莱竒筁
	processMarketInfoArray ㄧΑ矪瞶筁穦眔
	martketInfoArray 皚

	{name:"舦计",items:[505]},
	{name:"(磕)",items:[184]},
	{name:"",items:[185]},
	{name:"舦计",items:[100505]},
	{name:"(ゼ磕)",items:[100184]},
	{name:"",items:[100185]},
	{name:"Θユ肂",items:[423]},
	{name:"〆禦掸计",items:[506]},
	{name:"〆芥掸计",items:[507]},
	{name:"Θユ掸计",items:[501]},
	{name:"〆禦眎计",items:[508]},
	{name:"〆芥眎计",items:[509]},
	{name:"Θユ眎计",items:[404]},
	{name:"禦產计",items:[538,540]},
	{name:"芥產计",items:[539,541]},
	{name:"ず计",items:[536,537]},
	{name:"害產计",items:[530,533]},
	{name:"禴產计",items:[531,534]},
	{name:"キ產计",items:[532,535]}
*/

function processMarketInfoArray(marketInfo) {
  	var marketInfoSplitArray=marketInfo.split(",");
  	var marketInfoArray=new Array(2);
  	marketInfoArray[0]=[];
  	marketInfoArray[1]=[];
  	for (var i=0;i<marketInfoSplitArray.length;i++) {
    		var oneInfo=marketInfoSplitArray[i].split(":");
    		marketInfoArray[0].push(oneInfo[0]);
    		marketInfoArray[1].push(oneInfo[1]);
  	}
  	return marketInfoArray; 
}

function getTickInfoArrayByText(tickInfoArray) {
  	var text="";
  	for (var i=0;i<tickInfoArray.length;i++) {
    		text=text+tickInfoArray[i]+"\n";
  	}
  	return text;
}

function processTickInfoArray(tickInfo) {
  	var tickInfoArray=[];
  	while (1) {
    		var beginIndex=tickInfo.indexOf("{");
    		if (beginIndex==-1) {
      			break;
    		}
    		var endIndex=tickInfo.indexOf("}");
    		var oneTick=tickInfo.slice(beginIndex+1,endIndex);
    		tickInfoArray.push(oneTick);
    		tickInfo=tickInfo.slice(endIndex+1,tickInfo.length);
  	}
  	return tickInfoArray;
}

/* 
	getMarketInfo ㄧΑ璶琌更絃戈癟呼
	矪瞶だ猂獽眔讽ら絃戈皚の讽
	ら絃计戈皚矪瞶眔皚穦
	盢ウ讽暗把计㊣ callback ㄧΑ
	┮㊣ getMarketInfo 祘Αゲ斗矗ㄑ callback
	㊣ㄧΑ㊣ㄧΑゲ斗钡Μ把计
*/

function getMarketInfo(callback) {

	function processMarketInfo() {
	  	if (this.status === 200) {
			var marketInfo=this.response;
			var tempIndex1=marketInfo.indexOf("name");
			marketInfo=marketInfo.slice(tempIndex1-1,marketInfo.length-1);
			tempIndex1=marketInfo.indexOf("[");
			var tempIndex2=marketInfo.indexOf("]");
			var tickInfo=marketInfo.slice(tempIndex1+1,tempIndex2);
			marketInfo=marketInfo.slice(0,tempIndex1-9);
			marketInfoArray=processMarketInfoArray(marketInfo);	
			marketInfoArrayText=getMarketInfoArrayByText(marketInfoArray);
			tickInfoArray=processTickInfoArray(tickInfo);
			tickInfoArrayText=getTickInfoArrayByText(tickInfoArray);
			callback(marketInfoArrayText,tickInfoArrayText);
	  	} else {
			showMessage(this.status);
  		}
	}

  	showMessage("更い叫祔...");
  	getUrlSource(
    		"https://tw.quote.finance.yahoo.net/quote/q?type=tick&perd=1m&mkt=10&sym=%23001",
    		processMarketInfo,
    		errorHandler
  	);
}



