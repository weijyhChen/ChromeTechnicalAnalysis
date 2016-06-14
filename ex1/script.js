function showMessage(message) {
	document.getElementById("msg").innerHTML=message;
}

function appendMessage(message) {
	document.getElementById("msg").innerHTML+=message;
}

function getUrlSource(url,callback,error) {
	var req=new XMLHttpRequest();
	req.onload=callback;
	req.onerror=error;
	req.responseType="text";
	req.open("get",url);
	req.send();
}

String.prototype.sliceByPattern=function(beginPattern,endPattern) {
	var beginPos=this.indexOf(beginPattern);
	if (beginPos==-1) {
		return "";
	}
	var tempString=this.slice(beginPos,this.length);
	var endPos=tempString.indexOf(endPattern);
	tempString=tempString.slice(0,endPos);
	return tempString;
}

function findClassPair(oneHref) {
	var beginPos=oneHref.indexOf("\"");
	beginPos++;
	var endPos=oneHref.indexOf("\">");
	var href=oneHref.slice(beginPos,endPos);
	href="https://tw.stock.yahoo.com"+href;
	beginPos=endPos+2;
	endPos=oneHref.indexOf("</a");
	var className=oneHref.slice(beginPos,endPos);
	return {"href":href, "className":className};
}

function findClassTable() {
	if (this.status === 200) {
		var classPage=this.response;
		classPage=classPage.sliceByPattern("<!----table 2","<!----table 3");
		var hrefArray=[];
		while (1) {
			beginPos=classPage.indexOf("<a href");
			if (beginPos==-1) {
				break;
			}
			endPos=classPage.indexOf("</td>");
			var oneHref=classPage.slice(beginPos,endPos);
			hrefArray.push(oneHref);
			classPage=classPage.slice(endPos+4,classPage.length);
		}
		showMessage("<pre>各類股資訊：<br>");
		for (i=0;i<hrefArray.length;i++) {
			var href=hrefArray[i];
			hrefObject=findClassPair(href);
			appendMessage(hrefObject.className+",  "+hrefObject.href+"<br>");
		}
		appendMessage("</pre>");
	} else {
		showMessage(this.status);
	}
}

function errorHandler(e) {
	showMessage(e);
}

window.onload=function() {
	showMessage("Wait...");
	getUrlSource(
		"https://tw.stock.yahoo.com/h/getclass.php",
		findClassTable,
		errorHandler
	);
};
