window.onload=function() {

	/* window.onload �ϰ��ܼƫŧi */

	var allClassCount=0;
	var allClassNo;
	var messageBox=document.getElementById("msg");
	var saveButton=document.getElementById("saveButton");
	var readButton=document.getElementById("readButton");
	var directoryEntry=null;
	var fileEntry=null;
	var fileWriter=null;
	var companyArray=[];

	/* �쥻 ex1 ex2 �{�� */

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
      				for (i=0;i<hrefArray.length;i++) {
        				var href=hrefArray[i];
        				hrefObject=findCompanyPair(href);
        				var companyInfo=hrefObject.companyName.split(" ");
        				var companyID=companyInfo[0];
        				var companyName=companyInfo[1];
        				companyArray.push({"companyID":companyID,"companyName":companyName,"companyHref":hrefObject.href});
     				}
				allClassCount++;
				if (allClassCount===allClassNo) {
      					saveButton.removeAttribute("disabled");
      					saveButton.onclick=saveButtonClick;
					showMessage(
						"�U���U���Ѻ����óB�z�o��U���q�s����T����"+
						"�A�Ы��y<b>�s��</b>�z���s�N���q�s����T�s�ɡC"
						);
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

	/* ex3 �s�[�J�{�� */

	function companyComp(company1,company2) {
  		return company1.companyID-company2.companyID;  
	}

	function saveFile(fw) {
  		fileWriter=fw;
  		fileWriter.onwrite = function(e) {
    			var all="";
    			companyArray.sort(companyComp);
    			for (var i=0;i<companyArray.length;i++) {
      				var companyID=companyArray[i].companyID;
	      			var companyName=companyArray[i].companyName;
	      			var companyHref=companyArray[i].companyHref;
	      			all=all+companyID+"    "+companyName+"    "+companyHref+"\n";
    			}
    			fileWriter.onwrite = function(e) {
				readButton.removeAttribute("disabled");
				readButton.onclick=readButtonClick;
				showMessage(
					"<pre>�U���q�s����T�s�ɧ����A"+
					"�Ы��y<b>Ū��</b>�z���s�d�ݦs�ɸ�ơC<br>"+
					"�s�ɸ�Ʀp�U�G<br>"+
					all+
					"</pre>"
				);
    			};
			var blob = new Blob([all],
    				{type: 'text/plain'});
	    		fileWriter.write(blob);
  		};

		/* saveFile �禡�}�l��m */

		fileWriter.onerror = errorHandler;
		fileWriter.truncate(0);
	}

	function createFileWriter(fe) {
  		fileEntry=fe;
  		fileEntry.createWriter(
    			saveFile,
    			errorHandler
  		);
	}

	function saveButtonClick() {
  		if (directoryEntry===null) {
    			return;
		}
		directoryEntry.getFile(
    			'company.txt',
    			{
      				create: true,
      				exclusive: false
    			},
    			createFileWriter,
    			errorHandler
  		);
	}

	function createReader(file) {
  		var reader = new FileReader();
  		reader.onload = function() {
			showMessage("<pre><h3>���q���Ū�������C</h3><br>"+reader.result+"</pre>");
  		};
  		reader.readAsText(file);
	}

	function readFile(fe) {
  		fileEntry=fe;
  		fileEntry.file(
    			createReader, 
    			errorHandler
  		);
	}

	function readButtonClick() {
  		if (directoryEntry===null) {
    			return;
		}
		showMessage("Ū�ɤ�...");
  		directoryEntry.getFile(
    			'company.txt',
    			{
      				create: true,
      				exclusive: false
    			},
    			readFile,
    			errorHandler
  		); 
	}

	function haveFileSystem(fs) {
  		fs.root.getDirectory(
			"STOKE",
    			{
      				create: true,
      				exclusive: false
    			},
    			function (de) {
      				directoryEntry = de;
    			},
    			errorHandler
  		);
	}

	/* window.onload �禡�}�l��m */
	window.onresize=windowOnResize;
	messageBox.style.overflow="scroll";
	messageBox.style.width=window.innerWidth-15;
	messageBox.style.height=window.innerHeight-messageBox.offsetTop-15;

  	saveButton.setAttribute("disabled","true");
	readButton.setAttribute("disabled","true");
  	var requestFileSystem = window.webkitRequestFileSystem;
	requestFileSystem(PERSISTENT, 0, haveFileSystem, errorHandler);

	showMessage("�е��ݤU���Ҧ����Ѻ���...");
	getUrlSource(
		"https://tw.stock.yahoo.com/h/getclass.php",
		findClassTable,
		errorHandler
	);
};
