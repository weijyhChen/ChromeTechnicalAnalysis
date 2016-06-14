
window.onload=function() {

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