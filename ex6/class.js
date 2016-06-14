
function companyComp(company1,company2) {
	return company1.companyID-company2.companyID;  
}

function saveCompanyData(companyArray,callback) {
	showMessage("存檔中...");
	companyArray.sort(companyComp);
	var all="";
    	for (var i=0;i<companyArray.length;i++) {
      		var companyID=companyArray[i].companyID;
	    	var companyName=companyArray[i].companyName;
	      	var companyHref=companyArray[i].companyHref;
	      	all=all+companyID+" "+
		    companyName+" "+companyHref+"\n";
    	}
	saveLocalTextFile(
		"company.txt",
		all,
		callback,		
		true
	);
}

function readCompanyData(callback) {
	showMessage("讀檔中...");
	readLocalTextFile(
		"company.txt",
		callback
	);
}

function getCompanyArray(classArray,callback) {
	var allClassCount=0;
	var companyArray=[];
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
				for (i=0;i<hrefArray.length;i++) {
       					var href=hrefArray[i];
       					hrefObject=findCompanyPair(href);
       					var companyInfo=hrefObject.companyName.split(" ");
        				var companyID=companyInfo[0];
       					var companyName=companyInfo[1];
       					companyArray.push({"companyID":companyID,"companyName":companyName,"companyHref":hrefObject.href});
				}
				allClassCount++;
				if (allClassCount===classArray.length) {
					callback(companyArray);
				}
			} else {
				showMessage(this.status);
			}
		}

		/* findStockId 函式開始位置 */

		getUrlSource(
			href,
			findStockIdByHref,
			errorHandler
		);
	}

	allClassCount=0;
	for (i=0;i<classArray.length;i++) {
		classObject=classArray[i];
		findStockId(classObject.href,classObject.className);
	}
}

function getClassTable(callback) {
	var allClassNo;

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
			classPage=classPage.sliceByPattern(
				"<!----table 2",
				"<!----table 3"
			);
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
			allClassNo=hrefArray.length-6;
			var classArray=[];
			showMessage("<h4>共有"+allClassNo+
				"個類股的網頁要下載，請耐心等待下載各類股網頁...</h4>");
			for (i=0;i<allClassNo;i++) {
				var href=hrefArray[i];
				hrefObject=findClassPair(href);
				classArray.push(hrefObject);
			}
			callback(classArray);
		} else {
			showMessage(this.status);
		}
	}

	getUrlSource(
		"https://tw.stock.yahoo.com/h/getclass.php",
		findClassTable,
		errorHandler
	);
}

/* 
	原綜合範例3的程式經過分門別類後放置在不同的檔案中，
	以下程式是原本綜合範例3的 window.onload 函式，重新
	改寫為利用本檔案中分門別類整理過的函式的結果。
*/


function doEx3WindowOnload() {
	document.body.innerHTML=
		"<input type='button' id='saveButton' value='存檔'>"+
		"<input type='button' id='readButton' value='讀檔'>"+
		"<p id='msg'>在此顯示訊息</p>";

	var saveButton=document.getElementById("saveButton");
	var readButton=document.getElementById("readButton");
	var messageBox=document.getElementById("msg");

 	function windowOnResize() {
		messageBox.style.overflow="scroll";
		messageBox.style.width=window.innerWidth-15;
		messageBox.style.height=window.innerHeight-messageBox.offsetTop-15;    
	}

	function readCompanyDataCallback(readText) {
		showMessage("<pre><h3>公司資料讀取完畢。</h3><br>"+readText+"</pre>");
	}

	function readButtonClick() {
		readCompanyData(readCompanyDataCallback);
	}

	function saveCompanyDataCallback() {
		readButton.removeAttribute("disabled");
		readButton.onclick=readButtonClick;
		showMessage(
			"<pre>各公司連結資訊存檔完畢，"+
			"請按『<b>讀檔</b>』按鈕查看存檔資料。<br>"+
			"</pre>"
		);
	}
	
	function getCompanyArrayCallback(companyArray) {

		function saveButtonClick() {
			saveCompanyData(
				companyArray,
				saveCompanyDataCallback
			);
		}

      		saveButton.removeAttribute("disabled");
      		saveButton.onclick=saveButtonClick;
		showMessage(
			"下載各類股網頁並處理得到各公司連結資訊完畢"+
			"，請按『<b>存檔</b>』按鈕將公司連結資訊存檔。"
		);
	}

	function getClassTableCallback(classArray) {
		getCompanyArray(
			classArray,
			getCompanyArrayCallback
		);
	}

	window.onresize=windowOnResize;
	windowOnResize();

  	saveButton.setAttribute("disabled","true");
	readButton.setAttribute("disabled","true");
	
	openLocalFileSystem("/STOCK");

	showMessage("請等待下載所有類股網頁...");

	getClassTable(getClassTableCallback);
};

