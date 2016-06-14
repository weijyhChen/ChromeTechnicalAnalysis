
window.onload=function() {

 	function windowOnResize() {
		messageBox.style.overflow="scroll";
		messageBox.style.width=window.innerWidth-15;
		messageBox.style.height=window.innerHeight-messageBox.offsetTop-15;    
	}

  	document.body.innerHTML=
	"<input type='button' id='getCompanyInfo' value='下載'>\n"+
  	"<input type='button' id='saveCompanyInfo' value='存檔'>\n"+
  	"<input type='button' id='readCompanyInfo' value='讀檔'>\n"+
  	"<p id='msg'>你現在可以按下『下載』按鈕。</p>";

	var messageBox=document.getElementById("msg");

	window.onresize=windowOnResize;
	windowOnResize();

  	document.getElementById("saveCompanyInfo").setAttribute("disabled","true");
  	document.getElementById("readCompanyInfo").setAttribute("disabled","true");
  	document.getElementById("getCompanyInfo").onclick=getCompanyClassInfo;
};
