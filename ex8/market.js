
function getMarketInfoArrayByText(marketInfoArray) {
  	var text="";
  	var now=new Date();
  
  	text=text+
	now.getFullYear()+"/"+now.getMonth()+"/"+now.getDate()+"("+
	now.getHours()+":"+now.getMinutes()+")\n"+
  	"�[�v����:"+marketInfoArray[1][marketInfoArray[0].indexOf('"505"')]+"\n"+
  	"����q:"+marketInfoArray[1][marketInfoArray[0].indexOf('"423"')]+"\n"+
  	"���a��:"+marketInfoArray[1][marketInfoArray[0].indexOf('"530"')]+"\n"+
  	"�����a��:"+marketInfoArray[1][marketInfoArray[0].indexOf('"533"')]+"\n"+
  	"�^�a��:"+marketInfoArray[1][marketInfoArray[0].indexOf('"531"')]+"\n"+
  	"�^���a��:"+marketInfoArray[1][marketInfoArray[0].indexOf('"534"')]+"\n"+
	"���a��:"+marketInfoArray[1][marketInfoArray[0].indexOf('"532"')]+"\n"+
  	"�L����a��:"+marketInfoArray[1][marketInfoArray[0].indexOf('"535"')]+"\n"
  	;
  	return text;
}

/*
	�H�U�O marketInfo �r�ꪺ���e�������A�g�L
	processMarketInfoArray �禡�B�z�L��|�o��
	martketInfoArray �}�C

	{name:"�[�v����",items:[505]},
	{name:"(�t����)",items:[184]},
	{name:"",items:[185]},
	{name:"�[�v����",items:[100505]},
	{name:"(���t����)",items:[100184]},
	{name:"",items:[100185]},
	{name:"������B",items:[423]},
	{name:"�e�R����",items:[506]},
	{name:"�e�浧��",items:[507]},
	{name:"���浧��",items:[501]},
	{name:"�e�R�i��",items:[508]},
	{name:"�e��i��",items:[509]},
	{name:"����i��",items:[404]},
	{name:"�R�a��",items:[538,540]},
	{name:"��a��",items:[539,541]},
	{name:"���~��",items:[536,537]},
	{name:"���a��",items:[530,533]},
	{name:"�^�a��",items:[531,534]},
	{name:"���a��",items:[532,535]}
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
	getMarketInfo �禡�D�n�\��O�U���j�L��T�������A
	�å[�H�B�z���R�H�K�o��y���j�L��ơz�}�C�Ρy��
	��j�L�Y�ɫ��Ƹ�ơz�}�C�C�B�z�o��G�Ӱ}�C��A�|
	�N���̷��ѼƩI�s callback �禡�C
	�ҥH�I�s getMarketInfo ���{���������Ѥ@�� callback
	�^�I�禡�A�B���^�I�禡���������G�ӰѼơC
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

  	showMessage("�U�����еy��...");
  	getUrlSource(
    		"https://tw.quote.finance.yahoo.net/quote/q?type=tick&perd=1m&mkt=10&sym=%23001",
    		processMarketInfo,
    		errorHandler
  	);
}

/*
	�H�U window.onload ����X�d��4�� main.js �����{���A
	���ʨ즹�ɮפ��O���F���ץ���ɶ��A�u�n�I�s�o�q�{��
	�X�i�H�A�������X�d��4���{���C
*/

function doEx4WindowOnload() {

 	function windowOnResize() {
		messageBox.style.overflow="scroll";
		messageBox.style.width=window.innerWidth-15;
		messageBox.style.height=window.innerHeight-messageBox.offsetTop-15;    
	}

	function readMarketInfoCallback(text) {
		showMessage("<pre>Ū�ɧ����A�ɮפ��e�p�U�G\n"+text+"</pre>");
	}

	function saveMarketInfoCallback() {
		showMessage(
	  	"�s�ɧ����A�{�b�i�H���yŪ�ɡz���s�C");
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
	      		"�U�������A�{�b�i�H���y�s�ɡz���s�C\n"+
      			marketInfoText+tickInfoText+"</pre>");
		saveMarketButton.removeAttribute("disabled");
    		saveMarketButton.onclick=function() {
			showMessage("�s�ɤ��еy��...");
      			saveLocalTextFile(
        			"tw-market.txt",
	        		marketInfoText+tickInfoText+"\n\n",
	        		saveMarketInfoCallback,
				false
      			);
	    	};
	}

  	document.body.innerHTML=
	"<input type='button' id='getMarketInfo' value='�U��'>\n"+
  	"<input type='button' id='saveMarketInfo' value='�s��'>\n"+
  	"<input type='button' id='readMarketInfo' value='Ū��'>\n"+
  	"<p id='msg'>�A�{�b�i�H���U�y�U���z���s�C</p>";

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
