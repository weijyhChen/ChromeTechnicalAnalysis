window.onload=function() {

	/* window.onload �ϰ��ܼƫŧi */

	var allClassCount=0;
	var allClassNo;
	var messageBox=document.getElementById("msg");

	/* �쥻 ex1 �{�� */

	function showMessage(message) {
		messageBox.innerHTML=message;
	}

	function appendMessage(message) {
		messageBox.innerHTML+=message;
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
    			allClassCount=0;
			allClassNo=hrefArray.length-6;
			showMessage("<h4>�@��"+allClassNo+"�����Ѫ������n�U���A�Э@�ߵ��ݤU���U���Ѻ���...</h4>");
			for (i=0;i<allClassNo;i++) {
				var href=hrefArray[i];
				hrefObject=findClassPair(href);
				findStockId(hrefObject.href,hrefObject.className);
			}
		} else {
			showMessage(this.status);
		}
	}

	function errorHandler(e) {
		showMessage(e);
	}

	/* ex2 �s�[�J�{�� */
	
 	function windowOnResize() {
		messageBox.style.overflow="scroll";
		messageBox.style.width=window.innerWidth-15;
		messageBox.style.height=window.innerHeight-messageBox.offsetTop-15;    
	}


	function appendTopMessage(message) {
		messageBox.innerHTML=message+document.getElementById("msg").innerHTML;
	}

	function findStockId(href,className) {

		function findCompanyPair(oneHref) {
			var beginPos=oneHref.indexOf("<a href=");
			beginPos=beginPos+8;
			var endPos=oneHref.indexOf(">");
			var href=oneHref.slice(beginPos,endPos);
			href="https://tw.stock.yahoo.com"+href;
			beginPos=endPos+1;
			endPos=oneHref.length;
			var companyName=oneHref.slice(beginPos,endPos);
			return {"href":href,"companyName":companyName};
		}

		function findStockIdByHref() {
			if (this.status === 200) {
				var companyPage=this.response;
				var tempIndex=companyPage.indexOf("mob-com yui-mobile-pad");
				companyPage=companyPage.slice(tempIndex,companyPage.length);
				tempIndex=companyPage.indexOf("<table");
				companyPage=companyPage.slice(tempIndex+6,companyPage.length);
				tempIndex=companyPage.indexOf("<table");
				companyPage=companyPage.slice(tempIndex+6,companyPage.length);
				companyPage=companyPage.sliceByPattern("<table","</table");
				hrefArray=[];
				while (1) {
					beginPos=companyPage.indexOf("<a href=/q");
					if (beginPos==-1) {
						break;
					}
					endPos=companyPage.indexOf("</a>",beginPos);
					var oneHref=companyPage.slice(beginPos,endPos);
					hrefArray.push(oneHref);
					companyPage=companyPage.slice(endPos+4,companyPage.length);
				}
				appendMessage("<pre>");
				for (i=0;i<hrefArray.length;i++) {
					var href=hrefArray[i];
					hrefObject=findCompanyPair(href);    
					appendMessage(hrefObject.companyName+"["+className+"]     "+hrefObject.href+"<br>");
				}
				appendMessage("</pre>");
				allClassCount++;
				if (allClassCount===allClassNo) {
					appendTopMessage("<h2>�Ҧ������U�������A�i�H���������F!</h2>");
				}
			} else {
				showMessage(this.status);
			}
		}

		/* findStockId �禡�}�l��m */

		getUrlSource(
			href,
			findStockIdByHref,
			errorHandler
		);
	}


	/* window.onload �禡�}�l��m */
	window.onresize=windowOnResize;
	messageBox.style.overflow="scroll";
	messageBox.style.width=window.innerWidth-15;
	messageBox.style.height=window.innerHeight-messageBox.offsetTop-15;  	

	showMessage("�е��ݤU���Ҧ����Ѻ���...");
	getUrlSource(
		"https://tw.stock.yahoo.com/h/getclass.php",
		findClassTable,
		errorHandler
	);
};
