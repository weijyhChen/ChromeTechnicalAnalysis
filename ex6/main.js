/*
 * 範例６：試寫一程式從檔案中讀出各公司基本資料，EPS，營收資料及股利資訊
 *         並由使用者輸入公司名稱或公司ID做搜尋，找到該公司的資料後，由
 *	   使用者勾選要看的項目。
 */

function doEx6WindowOnload() {

  	var companyName=[];     // 所有公司名稱構成的陣列，從檔案中讀出後，陣列大小是totalCompany
  	var companyID=[];       // 所有公司ID構成的陣列
  	var totalCompany=0;     // 所有公司的數量，即 companyName,companyID 的大小
  	var inputBox;           // HTML 元件 inputBox 的 Javascript 物件
  	var searchButton;       // HTML 元件 searchButton 的 Javascript 物件
  	var messageBox;         // HTML 元件 messageBox 的 Javascript 物件
  	var companyInfo="";
  	var companySeasonEPS="";
  	var companyYearEPS="";
  	var companyEarning="";
  	var companyDividend="";
  
 	/* (21):
   	 * windowOnResize 函式是在視窗被使用者變更大小時會調用的函式，它在
   	 * showInterface 函式中被指定給 window.onresize 當做事件處理函式。
   	 * 當視窗大小變更時，可能會影響 messageBox 中的資料顯示，請看 (12) 說明
   	 */

  	function windowOnResize() {
    		messageBox.style.overflow="scroll";
    		messageBox.style.width=window.innerWidth-15;
    		messageBox.style.height=window.innerHeight-messageBox.offsetTop-15;    
  	}

  	/* (11):
   	 * readComanyInformationOK 函式在讀出一個公司的五個檔案後被呼叫，
   	 * 傳入的參數 textArray 是字串陣列，由於只讀取單一公司的資料，所以
   	 * textArray[0] 是公司的基本資料字串，格式是 "董事長/總經理/股本"
   	 * textArray[1] 是公司的每季EPS資料字串
	 * textArray[2] 是公司的每年EPS資料字串
	 * textArray[3] 是公司的每月營收資訊字串
	 * textArray[4] 是公司的配息配股資訊字串
   	 */

  	function readComanyInformationOK(textArray) {
    		companyInfo=textArray[0];
    		companySeasonEPS=textArray[1];
    		companyYearEPS=textArray[2];
    		companyEarning=textArray[3];
    		companyDividend=textArray[4];
    
    		/* (12):
     		 * 因為後面在 messageBox 中顯示資料時，可能因為資料會超過視窗外面
     		 * 所以要設定 messageBox 的高度及寬度，當顯示資料超過設定的高度時
     		 * 就要出現捲動桿讓使用者可以捲動到想看的地方。
     		 * messageBox.style 是 messageBox 的 style sheet 屬性
     		 * style.overflow 設成 scroll 表示當超過顯示範圍時，要出現捲動桿
     		 * style.width 設成比視窗的寬度再小 15 點，是讓 messageBox 加上捲
     		 *             動桿後，還是可以出現在視窗中，捲動桿也不會跑到視窗外。
     	 	 * style.height 除了要比視窗高度小之外，還要考慮 messageBox 的最
     		 *              上邊是在視窗的什麼位置(即 offsetTop )
     		 */

    		messageBox.style.overflow="scroll";
    		messageBox.style.width=window.innerWidth-15;
    		messageBox.style.height=window.innerHeight-messageBox.offsetTop-15;
    
    		/* (13):
     		 * 如果使用者有勾選要查看公司基本資訊，才顯示公司基本資訊
     		 */

    		if (document.getElementById("infoCheck").checked) {
      			var companyInfoSplitArray=companyInfo.split("/");
      			appendMessage("董事長："+companyInfoSplitArray[0]+"\n"+
        			"總經理："+companyInfoSplitArray[1]+"\n"+
        			"資本額："+companyInfoSplitArray[2]+"\n");
    		}

    		/* (14):
     		 * 如果使者有勾選要查看每季 EPS 資訊，才顯示每季 EPS 資訊
     		 */

    		if (document.getElementById("seasonEPSCheck").checked) {
			var seasonEPSSplit=companySeasonEPS.split("\n");
      			appendMessage("EPS(每季)：\n");
			for (var j=0;j<4;j++) {
				appendMessage("\t"+seasonEPSSplit[j]+"\n");
			}
    		}

    		/* (15):
     		 * 如果使者有勾選要查看每年 EPS 資訊，才顯示每年 EPS 資訊
     		 */
    
    		if (document.getElementById("yearEPSCheck").checked) {
			var yearEPSSplit=companyYearEPS.split("\n");
      			appendMessage("EPS(每年)：\n");
			for (var j=0;j<4;j++) {
				appendMessage("\t"+yearEPSSplit[j]+"\n");
			}
    		}

    		/* (16):
     		 * 如果使者有勾選要查看盈餘資訊，才顯示盈餘資訊
     		 */

    		if (document.getElementById("earningCheck").checked) {
      			appendMessage("每月盈收：\n");

    			/* (17):
     			 * 每年的盈餘資訊是一個字串，用 \n 分隔
     			 */
          
      			var companyEarningSplitArray=companyEarning.split("\n");
      			for (i=0;i<companyEarningSplitArray.length-1;i++) {

        			/* (18):
         			 * 從 companyEarningSplitArray[i] 取得一年的盈餘資訊字串
         			 * 把一年盈餘字串依 "/" 分隔開來成陣列，陣列第 0 個元素是
         			 * 年度值，而後 12 個元素分別是 12 個月的盈餘值
         			 */

        			var oneYearEarning=companyEarningSplitArray[i];
        			var oneYearEarningSplitArray=oneYearEarning.split("/");
        			appendMessage("年度：\n"+oneYearEarningSplitArray[0]+"\n");
        			for (k=1;k<13;k++) {
          				appendMessage("    月 "+k+"："+
          				oneYearEarningSplitArray[k]+"元\n");
        			}
      			}
      			appendMessage("\n");
    		}

    		/* (19):
     		 * 每年的股利資訊是一個字串，用 \n 分隔
     		 */
 
    		if (document.getElementById("dividendCheck").checked) {
      			var companyDividendSplitArray=companyDividend.split("\n");
      			appendMessage("配息配股:\n"+
			"\t年度\t現金股利\t盈餘配股\t公積配股\t股票股利\t合計\n");   
      			for (i=0;i<companyDividendSplitArray.length-1;i++) {

        			/* (20):
         			 * 從 companyDividendSpliArray[i] 取得一年的股利資訊字串
         			 * 把一年股利字串依 "/" 分隔開來成陣列，陣列第 0 個元素是
         			 * 年度值，而後面 5 個元素分別是現金股利、盈餘配股、公積配股
         			 * 股票股利及合計
         			 */  

        			var oneYearDividend=companyDividendSplitArray[i];
				var oneYearDividendSplit=oneYearDividend.split("/");
				for (var k=0;k<oneYearDividendSplit.length;k++) {
					appendMessage("\t"+oneYearDividendSplit[k]);
				}
				appendMessage("\n");
      			}
    		}        
  	}

  	/* (10):
   	 * readCompanyInformation 函式接受一個 searchID 參數，根據該參數
   	 * 讀入相關 ID 公司的資料。讀入資料完畢後呼叫　readComanyInformationOK
   	 */

  	function readComanyInformation(searchID) {
    		var companyDirectoryArray=[];
    		for (var i=0;i<5;i++) {     // 共有五種檔案要讀取
      			// 五個檔案所在目錄均為 "STOCK/ID"
      			companyDirectoryArray.push("STOCK/"+searchID);
    		}
    		var infoFileArray=[];
    		infoFileArray.push("companyInfo.txt");    // 公司基本資料檔案名稱
    		infoFileArray.push("seasonEPS.txt");      // 每季 EPS 資料檔案名稱
    		infoFileArray.push("yearEPS.txt");        // 每年 EPS 資料檔案名稱
    		infoFileArray.push("earning.txt");        // 盈餘檔案名稱
    		infoFileArray.push("Dividend.txt");       // 股利檔案名稱
    		var idIndex=companyID.indexOf(searchID);
    		showMessage("<pre>公司名稱："+companyName[idIndex]+"\n"+
     			"公司代號："+searchID+"\n");
    		readLocalTextFileSeries(companyDirectoryArray,infoFileArray,
                	readComanyInformationOK);
  	}
  
  	/* (7):
   	 * 按下 searchButton 會呼叫此函式，函式中主要是從 inputBox 中取得要
   	 * 搜尋的公司名稱或ID，然後在
   	 */

  	function startSearch() {
    		var searchText=inputBox.value;        // 取得使用者輸入搜尋字串

    		/* (8):
     		 * 先在 companyID 陣列中搜尋使用者輸入字串，如果找不到，則再到
     		 * companyName 陳列中搜尋。如果都找不到，則顯示訊息提示使用者找
     		 * 不到，請重新輸入並搜尋。
     		 */

    		var companyIndex=companyID.indexOf(searchText);
    		if (companyIndex===-1) {
      			companyIndex=companyName.indexOf(searchText);
    		}
    		if (companyIndex===-1) {
      			showMessage(
			"找不到此公司代號及公司名稱，\n"+
        		"請重新輸入公司代號或公司名稱...！\n");
      			return;                             // 跳出函式，結束搜尋
    		}

    		/* (9):
     		 * 找到使用者搜尋的字串在 companyName 或 companyID 中的索引值
     		 * ，顯示該公司的名稱給使用者並且提示載入該公司資料的訊息。接
     		 * 著呼叫 readComanyInformation 函式載入該公司資料。
     		 */

    		var searchID=companyID[companyIndex];
		var searchName=companyName[companyIndex];
    		showMessage("請稍候，正在讀取"+searchName+"公司資料...\n");
    		readComanyInformation(searchID);
  	}
  
  	/* (4):
   	 * showInterface 函式主要是用來在 HTML 文件中插入使用者介面相關的
   	 * 程式碼，並且指定按鍵的事件處理函式。
   	 */

  	function showInterface() {

    		/* (5):
     		 * 產生 HTML 中要用到的元件，有一個輸入盒 inputBox 用來接受使用者輸
     		 * 入要查詢的公司名稱或ID，按鈕 searchButton 用來使用者觸發搜尋動作
     		 * ，段落 messageBox 則當做訊息輸出盒，讓使用者看到程式的訊息及搜尋
     		 * 的結果。
     		 */

    		document.body.innerHTML=
      		"<p><input type=text id='inputBox' placeholder="+
      		"'請在此輸入公司代號或公司名稱：' size=30>"+
      		"<input type=button id='searchButton' value='搜尋'></p>"+
      		"<input type=checkbox id='infoCheck' checked>基本資訊"+
      		"<input type=checkbox id='seasonEPSCheck' checked>EPS(每季)"+
      		"<input type=checkbox id='yearEPSCheck' checked>EPS(每年)"+
      		"<input type=checkbox id='earningCheck' checked>盈餘資訊"+
      		"<input type=checkbox id='dividendCheck' checked>股利資訊"+
      		"<p><pre id='msg'>請勾選想查看的資料，輸入公司代號或公司名稱，"+
		"按下『搜尋』按鈕開始查訊。</pre></p>";
    		inputBox=document.getElementById("inputBox");
    		searchButton=document.getElementById("searchButton");
		messageBox=document.getElementById("msg");

    		/* (6):
     		 * 指定按下 searchButton 按鈕會觸發 startSearch 函式。
     		 */

    		searchButton.onclick=startSearch;
    		window.onresize=windowOnResize;
  	}
  
  	/* 註解(2)：
    	 * 在讀入 company.txt 檔案後會呼叫此函式，此函式主要由檔案內容
	 * 處理出各公司名稱及ID，得到 companyName,companyID 陣列及 
   	 * totalCompany 變數。
  	 * 請參考範例5中 readCompanyFileCallback 函式的說明，這裏的程式
   	 * 和範例5中程式幾乎完全相同。
   	 */

  	function readCompanyOK(textArray) {
    		var companyText=textArray[0];
    		var companyTextSlpitArray=companyText.split("\n");
    		totalCompany=companyTextSlpitArray.length-1;   
    		for (var i=0;i<totalCompany;i++) {
      			var oneCompanyText=companyTextSlpitArray[i];
      			var oneCompanySplitArray=oneCompanyText.split(" ");
      			var oneCompanyID=oneCompanySplitArray[0];
      			var oneCompanyName=oneCompanySplitArray[1];
      			companyName.push(oneCompanyName);
      			companyID.push(oneCompanyID);
    		}
    		/* (3):
     		 * 處理得到 companyArray 之後，呼叫 showInterface 函式，該函
     		 * 式主要用來在視窗中加入使用者介面.
     		 */

    		showInterface();
  	}
      
	/* 註解(1)：
	 * 本範例程式由此開始執行，程式用到的資料變數及函式全部都放在
   	 * doEx6WindowOnload 中。
   	 * 程式一開始先讀入 company.txt 檔案的內容。讀取檔案的函式在這
   	 * 裡是使用 readLoaclTextFileSeries，雖然這個函式主要是可以一次
   	 * 讀取多個檔案，但是用它來讀取一個檔案也是可以的。只要把要讀取
   	 * 的檔案所在目錄放在陣列中形成第一個參數，要讀取的檔案名稱放入
   	 * 一個陣列中形成第二個參數即可。
   	 * 讀取 compnay.txt 檔案完畢後會呼叫 readCompanyOK 函式。
   	 */

  	readLocalTextFileSeries(["/STOCK"],["company.txt"],readCompanyOK);

}

/* 註解(0)：
 * 本範例的進入點是此處的 window.onload 函式，由於不同程式間的檔案不能
 * 互相共用，所以綜合範例3及綜合範例5中存下的檔案，在這個範例中不能被讀
 * 取，所以必須在本範例中存下 company.txt 及各公司的基本資料檔案。為了達
 * 到這個目的，必須在本範例各執行一次範例3及範例5，手動將各種檔案存檔
 * 一次，這樣才能在本範例中被讀取出來。
 * window.onload 中利用二個按鈕『綜合範例3』及『綜合範例5』讓你可以在本
 * 範例中能重新執行範例3及範例5得以產生company.txt及各公司的基本資料檔案。
 * 另一個『綜合範例6』按鈕才是啟動本範例程式的真正關鍵。
 */

window.onload=function() {
	document.body.innerHTML=
		"<input type=button id='ex3Button' value='綜合範例3'>"+
		"<input type=button id='ex5Button' value='綜合範例5'>"+
		"<input type=button id='ex6Button' value='綜合範例6'>"+
		"<p><pre id='msg'>此處是訊息盒，在此顯示訊息。</pre></p>";

	document.getElementById("ex3Button").onclick=function() {
		doEx3WindowOnload();
	};

	document.getElementById("ex5Button").onclick=function() {
		doEx5WindowOnload();
	};

	document.getElementById("ex6Button").onclick=function() {
		doEx6WindowOnload();
	};
};