
window.onload=function() {

 	function windowOnResize() {
		messageBox.style.overflow="scroll";
		messageBox.style.width=window.innerWidth-15;
		messageBox.style.height=window.innerHeight-messageBox.offsetTop-15;    
	}

  	document.body.innerHTML=
	"<input type='button' id='getCompanyInfo' value='�U��'>\n"+
  	"<input type='button' id='saveCompanyInfo' value='�s��'>\n"+
  	"<input type='button' id='readCompanyInfo' value='Ū��'>\n"+
  	"<p id='msg'>�A�{�b�i�H���U�y�U���z���s�C</p>";

	var messageBox=document.getElementById("msg");

	window.onresize=windowOnResize;
	windowOnResize();

  	document.getElementById("saveCompanyInfo").setAttribute("disabled","true");
  	document.getElementById("readCompanyInfo").setAttribute("disabled","true");
  	document.getElementById("getCompanyInfo").onclick=getCompanyClassInfo;
};
