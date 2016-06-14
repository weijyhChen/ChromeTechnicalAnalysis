
window.onload=function() {

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