function getCompanyClassInfo() {
  	var totalCompany=0;
  	var companyArray=[];
  	var companyDataLinkArray=[];
  	var companyEarningLinkArray=[];
  	var companyDividendLinkArray=[];
  	var companyDataArray=[];
  	var companySeasonEPS=[];
  	var companyYearEPS=[];
  	var companyEarningArray=[];
  	var companyDividendArray=[];
  	var companyDirectoryArray=[];
  	var companyInfoFilenameArray=[];
  	var companySeansonEPSFilenameArray=[];
  	var companyYearEPSFilenameArray=[];
  	var companyEarningFilenameArray=[];
  	var companyDividendFilenameArray=[];
  	var index=0;
  
  	function enableReadButton() {
    		var companyInfoRead=[];
    		var companySeasonEPSRead=[];
    		var companyYearEPSRead=[];
    		var companyEarningRead=[];
    		var companyDividendRead=[];
    
    		function readCompanyDividendCallback(textArray) {
      			for (var i=0;i<textArray.length;i++) {
        			// 將讀出的各公司股利放到 companyDividendRead 中
        			companyDividendRead.push(textArray[i]);
      			}  
     
			var text="<pre>\n";
      			for (i=0;i<companyInfoRead.length;i++) {
				var info=companyInfoRead[i];
				var infoSplit=info.split("/");
				var seasonEPS=companySeasonEPSRead[i];
				var seasonEPSSplit=seasonEPS.split("\n");
				var yearEPS=companyYearEPSRead[i];
				var yearEPSSplit=yearEPS.split("\n");
				var earning=companyEarningRead[i];
				var earningSplit=earning.split("\n");
				var earning0Split=earningSplit[0].split("/");
				var earning1Split=earningSplit[1].split("/");
				var dividend=companyDividendRead[i];
				var dividendSplit=dividend.split("\n");
				
				var text=text+
	        		"公司代號："+companyArray[i].companyID+"\n"+
	        		"公司名稱："+companyArray[i].companyName+"\n"+
	        		"董事長："+infoSplit[0]+"\n"+
	        		"總經理："+infoSplit[1]+"\n"+
	        		"資本額："+parseFloat(infoSplit[2])+"億\n"+
	        		"每季EPS：\n";
				for (var j=0;j<4;j++) {
					text=text+
					"\t"+seasonEPSSplit[j]+"\n";
				}				
				text=text+
	        		"每年EPS：\n";
				for (var j=0;j<4;j++) {
					text=text+
					"\t"+yearEPSSplit[j]+"\n";
				}
				text=text+
	        		"每月營收：\n";
				text=text+
	        		"\t"+earning0Split[0]+"年\n";
				for (var j=1;j<13;j++) {
					if (parseInt(earning0Split[j])!=-1) {
						text=text+
						"\t\t"+j+"月\t"+earning0Split[j]+" 元\n";
					}
				}
				text=text+
	        		"\t"+earning1Split[0]+"年\n";
				for (var j=1;j<13;j++) {
					if (parseInt(earning1Split[j])!=-1) {
						text=text+
						"\t\t"+j+"月\t"+earning1Split[j]+" 元\n";
					}
				}
				text=text+
	        		"配股配息：\n"+
				"\t年度\t現金股利\t盈餘配股\t公積配股\t股票股利\t合計\n";
				
				for (var j=0;j<dividendSplit.length-1;j++) {
					var oneYearDividend=dividendSplit[j];
					var oneYearDividendSplit=oneYearDividend.split("/");
					for (var k=0;k<oneYearDividendSplit.length;k++) {
						text=text+
						"\t"+oneYearDividendSplit[k];
					}
					text=text+"\n";
				}				
				text=text+				
	        		"\n";
      			}
			text=text+"</pre>";
			showMessage(text);
    		}
    
    		function readCompanyEarningCallback(textArray) {
      			for (var i=0;i<textArray.length;i++) {
        			companyEarningRead.push(textArray[i]);
      			}      
      			readLocalTextFileSeries(companyDirectoryArray,companyDividendFilenameArray,readCompanyDividendCallback);
    		}
    
    		function readCompanyYearEPSCallback(textArray) {
      			for (var i=0;i<textArray.length;i++) {
        			companyYearEPSRead.push(textArray[i]);
      			}      
      			readLocalTextFileSeries(companyDirectoryArray,companyEarningFilenameArray,readCompanyEarningCallback);
    		}
    
    		function readCompanySeasonEPSCallback(textArray) {
      			for (var i=0;i<textArray.length;i++) {
        			companySeasonEPSRead.push(textArray[i]);
      			}
      			readLocalTextFileSeries(companyDirectoryArray,companyYearEPSFilenameArray,readCompanyYearEPSCallback);
    		}
    
    		function readCompanyInfoCallback(textArray) {
      			for (var i=0;i<textArray.length;i++) {
        			companyInfoRead.push(textArray[i]);
      			}
      			readLocalTextFileSeries(companyDirectoryArray,companySeansonEPSFilenameArray,readCompanySeasonEPSCallback);
    		}
  
    		showMessage("各公司資料存檔完畢，可按『讀檔』按鈕讀出各公司資料驗證。");
    		document.getElementById("readCompanyInfo").removeAttribute("disabled");
    		document.getElementById("readCompanyInfo").onclick=function () {
			showMessage("讀出各公司資料檔案中，請稍待...");
      			readLocalTextFileSeries(companyDirectoryArray,companyInfoFilenameArray,readCompanyInfoCallback);
    		};
  	}
  
  	function saveCompanyDividend() {
    		for (var i=0;i<totalCompany;i++) {
      			companyDividendFilenameArray.push("Dividend.txt");
    		}
    		saveLocalTextFileSeries(companyDirectoryArray,companyDividendFilenameArray,companyDividendArray,enableReadButton,true);    
  	}
  
  	function saveCompanyEarning() {
    		for (var i=0;i<totalCompany;i++) {
      			companyEarningFilenameArray.push("earning.txt");
    		}
    		saveLocalTextFileSeries(companyDirectoryArray,companyEarningFilenameArray,companyEarningArray,saveCompanyDividend,true);
  	}
  
  	function saveCompanyYearEPS() {
    		for (var i=0;i<totalCompany;i++) {
      			companyYearEPSFilenameArray.push("yearEPS.txt");
    		}
    		saveLocalTextFileSeries(companyDirectoryArray,companyYearEPSFilenameArray,companyYearEPS,saveCompanyEarning,true);
  	}
  
  	function saveCompanySeansonEPS() {
    		for (var i=0;i<totalCompany;i++) {
      			companySeansonEPSFilenameArray.push("seasonEPS.txt");
    		}
    		saveLocalTextFileSeries(companyDirectoryArray,companySeansonEPSFilenameArray,companySeasonEPS,saveCompanyYearEPS,true);
  	}
  
  	function saveCompanyDataArray() {
    		for (var i=0;i<totalCompany;i++) {
      			companyInfoFilenameArray.push("companyInfo.txt");
    		}
    		saveLocalTextFileSeries(companyDirectoryArray,companyInfoFilenameArray,companyDataArray,saveCompanySeansonEPS,true);
  	}
  
  	function saveCompanyInfoClick() {
    		showMessage("儲存各公司資料中，請稍待...");
    		for (var i=0;i<totalCompany;i++) {
      			companyDirectoryArray.push("STOCK/"+companyArray[i].companyID);
    		}
    		saveCompanyDataArray();
  	}
  
  	function getTotalYearsOfDividends(companyDividendPage) {
    		var totalYears=0;
    		while (1) {
      			var trIndex=companyDividendPage.indexOf("<tr");
      			if (trIndex==-1) {
        			return totalYears;
      			}
      			totalYears++;
      			companyDividendPage=companyDividendPage.slice(trIndex+4,companyDividendPage.length);
    		}
  	}
  
  	function getCompanyDividendLinkCallback() {
    		if (this.status === 200) {
      			var companyDividendPage=this.response;
      			companyDividendPage=companyDividendPage.sliceByPattern(
			"<!---------------------content start-------------------->",
      			"<!---------------------content end-------------------->",
			false);
      			companyDividendPage=skipPatternCount(companyDividendPage,"<table ",4);
      			companyDividendPage=skipPatternCount(companyDividendPage,"<tr ",1);
      			var companyDividendText="";
      			var totalYears=getTotalYearsOfDividends(companyDividendPage);
      			for (var i=0;i<totalYears;i++) {
        			companyDividendPage=skipPatternCount(companyDividendPage,"<tr ",1);
        			companyDividendPage=skipPatternCount(companyDividendPage,"<td ",1);
        			var year=companyDividendPage.sliceByPattern(">","<",false);
        			companyDividendPage=skipPatternCount(companyDividendPage,"<td ",1);
        			var cashDividends=companyDividendPage.sliceByPattern(">","<",false);
        			companyDividendPage=skipPatternCount(companyDividendPage,"<td ",1);
        			var stockDividendRetainedEarning=companyDividendPage.sliceByPattern(">","<",false);
        			companyDividendPage=skipPatternCount(companyDividendPage,"<td ",1);
        			var stockDividendCapitalReserve=companyDividendPage.sliceByPattern(">","<",false);
        			companyDividendPage=skipPatternCount(companyDividendPage,"<td ",1);
        			var stockDividends=companyDividendPage.sliceByPattern(">","<",false);
        			companyDividendPage=skipPatternCount(companyDividendPage,"<td ",1);
        			var totalDividends=companyDividendPage.sliceByPattern(">","<",false);  
        			companyDividendText=companyDividendText+year+"/"+cashDividends+"/"+
        			stockDividendRetainedEarning+"/"+stockDividendCapitalReserve+"/"+
        			stockDividends+"/"+totalDividends+"\n";
      			}
      			companyDividendArray.push(companyDividendText);
      			showMessage("<pre>"+companyDividendText+"index="+index+"</pre>"); 
      			index++;
      			if (index==totalCompany) {
        			showMessage("下載所有公司網頁完畢，可以按『存檔』按鈕將各公司資料存檔。");
        			document.getElementById("saveCompanyInfo").removeAttribute("disabled");
        			document.getElementById("saveCompanyInfo").onclick=saveCompanyInfoClick;
      			} else {
        			getUrlSource(companyDividendLinkArray[index],getCompanyDividendLinkCallback,errorHandler);
      			}      
    		} else {
      			showMessage(this.statusx); 
      			/*
				網頁下載錯誤發生，某些股票的公司股利網頁不存在，
				只能跳過該公司資料(空資料)，繼續下一家公司
			*/
      			index++;
      			companyDividendArray.push("");
      			getUrlSource(companyDividendLinkArray[index],getCompanyDividendLinkCallback,errorHandler);
    		}
  	}
  
  	function getcompanyEarningLinkCallback() {
    		if (this.status === 200) {
      			var companyEarningPage=this.response;
      			companyEarningPage=companyEarningPage.sliceByPattern(
			"<!---------------------content start-------------------->",
      			"<!---------------------content end-------------------->",
			false);
      			companyEarningPage=skipPatternCount(companyEarningPage,"<table ",6);
      			companyEarningPage=companyEarningPage.sliceByPattern("<table","</table>",true);
      			var year1=companyEarningPage.sliceByPattern("<b>","</b>",false);
      			year1=parseInt(year1)+1911;
      			companyEarningPage=skipPatternCount(companyEarningPage,"</b>",1);
      			var year2=companyEarningPage.sliceByPattern("<b>","</b>",false);
      			year2=parseInt(year2)+1911;
      			companyEarningPage=skipPatternCount(companyEarningPage,"<tr ",2);
      			var profit1Text=year1+"/";
      			var profit2Text=year2+"/";
      			for (var i=0;i<12;i++) {
        			companyEarningPage=skipPatternCount(companyEarningPage,"<td ",2);
        			var profit1=companyEarningPage.sliceByPattern(">","<",false);
        			if (profit1==="-") {
          				profit1=-1;         // 沒有營收值
        			} else {
          				profit1=removeComma(profit1);
          				profit1=parseInt(profit1)*1000;
        			}
        			profit1Text=profit1Text+profit1+"/";
        			companyEarningPage=skipPatternCount(companyEarningPage,"<td ",3);
        			var profit2=companyEarningPage.sliceByPattern(">","<",false);
        			if (profit2==="-") {
          				profit2=-1;
        			} else {
          				profit2=removeComma(profit2);
          				profit2=parseInt(profit2)*1000;
        			}
        			profit2Text=profit2Text+profit2+"/";
        			companyEarningPage=skipPatternCount(companyEarningPage,"<td ",4);
      			}
      			companyEarningArray.push(profit1Text+"\n"+profit2Text+"\n");
      			showMessage("<pre>"+profit1Text+"\n"+profit2Text+"\nindex="+index+"</pre>");
      			index++;
      			if (index==totalCompany) {
        			index=0;
        			getUrlSource(companyDividendLinkArray[index],getCompanyDividendLinkCallback,errorHandler);
      			} else {
        			getUrlSource(companyEarningLinkArray[index],getcompanyEarningLinkCallback,errorHandler);
      			}
    		} else {
      			showMessage(this.status);
      			/* 
				網頁下載錯誤發生，某些股票的公司營收網頁不存在，
				只能跳過此公司資料(用-1代表空資料)，繼續下一家公司
			*/
      			companyEarningArray.push("-1/-1/-1/-1/-1/-1/-1/-1/-1/-1/-1/-1/-1/\n"+
      			"-1/-1/-1/-1/-1/-1/-1/-1/-1/-1/-1/-1/-1/\n");
      			index++;
      			getUrlSource(companyEarningLinkArray[index],getcompanyEarningLinkCallback,errorHandler);
    		}
  	}
  
  	function getCompanyDataLinkCallback() {
    		if (this.status === 200) {
      			var companyDataPage=this.response;
      			companyDataPage=companyDataPage.sliceByPattern(
			"<!---------------------content start-------------------->",
      			"<!---------------------content end-------------------->",
			false);
      			var epsDataPage=companyDataPage;
      			companyDataPage=skipPatternCount(companyDataPage,"<table ",2);
      			companyDataPage=companyDataPage.sliceByPattern("<table","</table>",true);
      			companyDataPage=skipPatternCount(companyDataPage,"<tr ",5);
      			companyDataPage=skipPatternCount(companyDataPage,"<td ",2);
      			var president=companyDataPage.sliceByPattern(">","<",false);
      			companyDataPage=skipPatternCount(companyDataPage,"<td ",4);
      			var CEO=companyDataPage.sliceByPattern(">","<",false);
      			companyDataPage=skipPatternCount(companyDataPage,"<td ",6);
      			var capital=companyDataPage.sliceByPattern(">","<",false);
      			var companyData=president+"/"+CEO+"/"+capital+"/";
      			companyDataArray.push(companyData);
      			epsDataPage=skipPatternCount(epsDataPage,"<table ",3);
      			epsDataPage=epsDataPage.sliceByPattern("<table","</table>",true);
      			epsDataPage=skipPatternCount(epsDataPage,"<tr ",2);
      			epsDataPage=skipPatternCount(epsDataPage,"<td ",2);
      			var grossProfit=epsDataPage.sliceByPattern(">","<",false);
      			epsDataPage=skipPatternCount(epsDataPage,"<td ",1);
      			var p1Season=epsDataPage.sliceByPattern(">","<",false);
      			epsDataPage=skipPatternCount(epsDataPage,"<td ",1);
      			var p1SeasonEPS=epsDataPage.sliceByPattern(">","<",false);
      			epsDataPage=skipPatternCount(epsDataPage,"<td ",1);
      			var p1Year=epsDataPage.sliceByPattern(">","<",false);
      			epsDataPage=skipPatternCount(epsDataPage,"<td ",1);
      			var p1YearEPS=epsDataPage.sliceByPattern(">","<",false);
      			epsDataPage=skipPatternCount(epsDataPage,"<td ",2);
      			var operatingProfit=epsDataPage.sliceByPattern(">","<",false);
      			epsDataPage=skipPatternCount(epsDataPage,"<td ",1);
      			var p2Season=epsDataPage.sliceByPattern(">","<",false);
      			epsDataPage=skipPatternCount(epsDataPage,"<td ",1);
      			var p2SeasonEPS=epsDataPage.sliceByPattern(">","<",false);
      			epsDataPage=skipPatternCount(epsDataPage,"<td ",1);
      			var p2Year=epsDataPage.sliceByPattern(">","<",false);
      			epsDataPage=skipPatternCount(epsDataPage,"<td ",1);
      			var p2YearEPS=epsDataPage.sliceByPattern(">","<",false);
      			epsDataPage=skipPatternCount(epsDataPage,"<td ",2);
      			var pretaxMargin=epsDataPage.sliceByPattern(">","<",false);
      			epsDataPage=skipPatternCount(epsDataPage,"<td ",1);
      			var p3Season=epsDataPage.sliceByPattern(">","<",false);
      			epsDataPage=skipPatternCount(epsDataPage,"<td ",1);
      			var p3SeasonEPS=epsDataPage.sliceByPattern(">","<",false);
      			epsDataPage=skipPatternCount(epsDataPage,"<td ",1);
      			var p3Year=epsDataPage.sliceByPattern(">","<",false);
      			epsDataPage=skipPatternCount(epsDataPage,"<td ",1);
      			var p3YearEPS=epsDataPage.sliceByPattern(">","<",false);
      			epsDataPage=skipPatternCount(epsDataPage,"<td ",2);
      			var ROA=epsDataPage.sliceByPattern(">","<",false);
      			epsDataPage=skipPatternCount(epsDataPage,"<td ",1);
      			var p4Season=epsDataPage.sliceByPattern(">","<",false);
      			epsDataPage=skipPatternCount(epsDataPage,"<td ",1);
      			var p4SeasonEPS=epsDataPage.sliceByPattern(">","<",false);
      			epsDataPage=skipPatternCount(epsDataPage,"<td ",1);
      			var p4Year=epsDataPage.sliceByPattern(">","<",false);
      			epsDataPage=skipPatternCount(epsDataPage,"<td ",1);
      			var p4YearEPS=epsDataPage.sliceByPattern(">","<",false);
      			var seasonEPS=p1Season+":"+p1SeasonEPS+"\n"+p2Season+":"+p2SeasonEPS+"\n"+
      			p3Season+":"+p3SeasonEPS+"\n"+p4Season+":"+p4SeasonEPS+"\n";
      			companySeasonEPS.push(seasonEPS);
      			var yearEPS=p1Year+":"+p1YearEPS+"\n"+p2Year+":"+p2YearEPS+"\n"+
      			p3Year+":"+p3YearEPS+"\n"+p4Year+":"+p4YearEPS+"\n";
      			companyYearEPS.push(yearEPS);
      
      			showMessage(companyArray[index].companyID+","+
      			companyArray[index].companyName+","+companyData+","+
			seasonEPS+yearEPS+", index="+index);
      
      			index++;
      			if (index==totalCompany) {
        			index=0;
        			getUrlSource(companyEarningLinkArray[index],
				getcompanyEarningLinkCallback,errorHandler);
      			} else {
        			getUrlSource(companyDataLinkArray[index],
				getCompanyDataLinkCallback,errorHandler);
      			}
    		} else {
      			showMessage(this.status);
      			/*
				網頁下載錯誤發生，可能是某些股票的公司基本資料網頁不存在，
				只能跳過這家公司的資料(填空資料)，繼續下一家公司。
			*/
      			var companyDataEmpty="///";
      			companyDataArray.push(companyDataEmpty);
      			companySeasonEPS.push("");
      			companyYearEPS.push("");
      			index++;
      			getUrlSource(companyDataLinkArray[index],getCompanyDataLinkCallback,errorHandler);
    		}
  	}
  
  	function readCompanyFileCallback(companyClassText) {
    		showMessage("<pre>"+companyClassText+"</pre>");
    		var companyClassTextSlpitArray=companyClassText[0].split("\n");
		/* 
			因為寫入公司檔案時，最後一家公司後也會寫入一個"\n"，
			在這裡用"\n"作分割會造成多一家公司的情形，因此全部
			公司的數量是分割出來陣列的大小再減去1
		*/
    		totalCompany=companyClassTextSlpitArray.length-1;
    		for (var i=0;i<totalCompany;i++) {
      			var oneCompanyClassText=companyClassTextSlpitArray[i];
      			var oneCompanyClassSplitArray=oneCompanyClassText.split(" ");
      			var companyID=oneCompanyClassSplitArray[0];
      			var companyName=oneCompanyClassSplitArray[1];
      			companyArray.push({"companyID":companyID,"companyName":companyName});
      			companyDataLinkArray.push("https://tw.stock.yahoo.com/d/s/company_"+companyID+".html");
      			companyEarningLinkArray.push("https://tw.stock.yahoo.com/d/s/earning_"+companyID+".html");
      			companyDividendLinkArray.push("https://tw.stock.yahoo.com/d/s/dividend_"+companyID+".html");
    		}

    		index=0;
    		getUrlSource(companyDataLinkArray[index],getCompanyDataLinkCallback,errorHandler);
  	}
  
  	showMessage("讀取 company.txt 檔案中，請稍待...");
  	readLocalTextFileSeries(["/STOCK"],["company.txt"],readCompanyFileCallback);
}

function doEx5WindowOnload() {

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
