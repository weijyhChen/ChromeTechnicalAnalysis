
function getMarketInfoArrayByText(marketInfoArray) {
  	var text="";
  	var now=new Date();
  
  	text=text+
	now.getFullYear()+"/"+now.getMonth()+"/"+now.getDate()+"("+
	now.getHours()+":"+now.getMinutes()+")\n"+
  	"加權指數:"+marketInfoArray[1][marketInfoArray[0].indexOf('"505"')]+"\n"+
  	"成交量:"+marketInfoArray[1][marketInfoArray[0].indexOf('"423"')]+"\n"+
  	"漲家數:"+marketInfoArray[1][marketInfoArray[0].indexOf('"530"')]+"\n"+
  	"漲停家數:"+marketInfoArray[1][marketInfoArray[0].indexOf('"533"')]+"\n"+
  	"跌家數:"+marketInfoArray[1][marketInfoArray[0].indexOf('"531"')]+"\n"+
  	"跌停家數:"+marketInfoArray[1][marketInfoArray[0].indexOf('"534"')]+"\n"+
	"平家數:"+marketInfoArray[1][marketInfoArray[0].indexOf('"532"')]+"\n"+
  	"無交易家數:"+marketInfoArray[1][marketInfoArray[0].indexOf('"535"')]+"\n"
  	;
  	return text;
}

/*
	以下是 marketInfo 字串的內容對應表格，經過
	processMarketInfoArray 函式處理過後會得到
	martketInfoArray 陣列

	{name:"加權指數",items:[505]},
	{name:"(含金融)",items:[184]},
	{name:"",items:[185]},
	{name:"加權指數",items:[100505]},
	{name:"(未含金融)",items:[100184]},
	{name:"",items:[100185]},
	{name:"成交金額",items:[423]},
	{name:"委買筆數",items:[506]},
	{name:"委賣筆數",items:[507]},
	{name:"成交筆數",items:[501]},
	{name:"委買張數",items:[508]},
	{name:"委賣張數",items:[509]},
	{name:"成交張數",items:[404]},
	{name:"買家數",items:[538,540]},
	{name:"賣家數",items:[539,541]},
	{name:"內外數",items:[536,537]},
	{name:"漲家數",items:[530,533]},
	{name:"跌家數",items:[531,534]},
	{name:"平家數",items:[532,535]}
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
	getMarketInfo 函式主要功能是下載大盤資訊的網頁，
	並加以處理分析以便得到『當日大盤資料』陣列及『當
	日大盤即時指數資料』陣列。處理得到二個陣列後，會
	將它們當做參數呼叫 callback 函式。
	所以呼叫 getMarketInfo 的程式必須提供一個 callback
	回呼函式，且此回呼函式必須接收二個參數。
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

  	showMessage("下載中請稍待...");
  	getUrlSource(
    		"https://tw.quote.finance.yahoo.net/quote/q?type=tick&perd=1m&mkt=10&sym=%23001",
    		processMarketInfo,
    		errorHandler
  	);
}

/*
	以下 window.onload 為綜合範例4中 main.js 中的程式，
	移動到此檔案中是為了不論任何時間，只要呼叫這段程式
	碼可以再次執行綜合範例4的程式。
*/

function doEx4WindowOnload() {

 	function windowOnResize() {
		messageBox.style.overflow="scroll";
		messageBox.style.width=window.innerWidth-15;
		messageBox.style.height=window.innerHeight-messageBox.offsetTop-15;    
	}

	function readMarketInfoCallback(text) {
		showMessage("<pre>讀檔完畢，檔案內容如下：\n"+text+"</pre>");
	}

	function saveMarketInfoCallback() {
		showMessage(
	  	"存檔完畢，現在可以按『讀檔』按鈕。");
	  	readMarketButton.removeAttribute("disabled");
	  	readMarketButton.onclick=function() {
	  		readLocalTextFile(
	    			"tw-market.txt",
	    			readMarketInfoCallback
    			);
	  	};
	}

	function getMarketInfoCallback(marketInfoText,tickInfoText) {
		showMessage("<pre>"+
	      		"下載完畢，現在可以按『存檔』按鈕。\n"+
      			marketInfoText+tickInfoText+"</pre>");
		saveMarketButton.removeAttribute("disabled");
    		saveMarketButton.onclick=function() {
			showMessage("存檔中請稍待...");
      			saveLocalTextFile(
        			"tw-market.txt",
	        		marketInfoText+tickInfoText+"\n\n",
	        		saveMarketInfoCallback,
				false
      			);
	    	};
	}

  	document.body.innerHTML=
	"<input type='button' id='getMarketInfo' value='下載'>\n"+
  	"<input type='button' id='saveMarketInfo' value='存檔'>\n"+
  	"<input type='button' id='readMarketInfo' value='讀檔'>\n"+
  	"<p id='msg'>你現在可以按下『下載』按鈕。</p>";

	var getMarketButton=document.getElementById("getMarketInfo");
	var saveMarketButton=document.getElementById("saveMarketInfo");
	var readMarketButton=document.getElementById("readMarketInfo");
	var messageBox=document.getElementById("msg");

	window.onresize=windowOnResize;
	windowOnResize();

	openLocalFileSystem("STOCK");
  	getMarketButton.onclick=function() {
		getMarketInfo(getMarketInfoCallback);
	}
  	saveMarketButton.setAttribute("disabled","true");
  	readMarketButton.setAttribute("disabled","true");
};
