/*
 * 範例８：試寫一程式讀出各公司基本資料、EPS後，再下載各公司目前的
 *         股價，計算各公司本益比，依本益比排序(由小到大)排序前
 *         １００家公司。
 *
 * 說明：各公司股價可由『https://tw.quote.finance.yahoo.net/quote/q
 *       ?type=tick&perd=1m&mkt=10&sym=公司ID』得到。該網頁是每
 *       日股價走勢圖，只在開盤前30分鐘左右沒有資料，其它任何時間都
 *       可以得到當天或前一天的走勢圖。從該網頁中把成交價取出，可以
 *       算是即時的股價資訊。
 */

function doEx8WindowOnload() {

  	var allCompanyDirectoryArray=[];
  	var allCompanyInfoFileArray=[];
  	var allCompanySeasonEPSFileArray=[];
  	var companyName=[];         // 所有公司名稱陣列
  	var companyID=[];           // 所有公司ID陣列
  	var companyPresident=[];    // 所有公司的董事長陣列
  	var companyCEO=[];          // 所有公司的總經理陣列
  	var companyCapital=[];      // 所有公司的股本陣列
  	var companyEPS=[];          // 所有公司的EPS陣列
  	var companyPrice=[];        // 所有公司的目前成交價格陣列
  	var totalCompany=0;         // 所有公司的數量，即 companyArray 的大小
  	var sortPERatioButton;      // HTML 元件 sortPERatio 的 Javascript 物件
  	var messageBox;             // HTML 元件 messageBox 的 Javascript 物件
  	var companyInfo="";
  	var companySeasonEPS="";
  	var companyYearEPS="";

  	function peratioCompare(idPERatio1,idPERatio2) {
    		return idPERatio1.peratio-idPERatio2.peratio;
  	}

  	/* (26):
   	 * sortPERatioButtonClick 函式是當使用者按下『按本益比(前四季EPS)排序』
   	 * 按鈕後會呼叫的事件處理函式。
   	 * 首先計算每家公司的本益比，放入 peRatioArray ，然後如前一個範例
   	 * 準備好『本益比』及『ID』結合的物件陣列 idPERatioArray，然後才對
   	 * 此陣列進行本益比的排序(由小到大)。
   	 */

  	function sortPERatioButtonClick() {
    		var peRatioArray=[];
    		for (i=0;i<totalCompany;i++) {
      			if (isNaN(companyPrice[i])||(companyEPS[i]<=0)) {

        			/* (27):
         		 	 * 如果前面下載公司股價的時候失敗，則 companyPrice 是 NaN，
         		 	 * 此時不能計算本益比。另外若 EPS 總合是負的話，由小到大去排
         		 	 * 序反而會排到前面，我們關心的應該是 EPS 總合是正數的排序，
         		 	 * 所以前面這二種情形都不可以去排序，我們把它的本益比設為正
         		 	 * 無限大，排序時自然會跑到最後面了。
         		 	 */

        			peRatioArray.push(Number.POSITIVE_INFINITY);
      			} else {
        			peRatioArray.push(companyPrice[i]/companyEPS[i]);
      			}
    		}
    		var idPERatioArray=[];
    		for (i=0;i<totalCompany;i++) {
      			idPERatioArray.push({"id":companyID[i],"peratio":peRatioArray[i]});
    		}
    		idPERatioArray.sort(peratioCompare);
    		showMessage("");
    		for (i=0;i<100;i++) {
      			var idIndex=companyID.indexOf(idPERatioArray[i].id);
      			appendMessage(
                             	"排名 "+(i+1)+"\n"+
                             	"公司名稱："+companyName[idIndex]+"\n"+
                             	"公司代號："+idPERatioArray[i].id+"\n"+
				"前四季EPS總合："+companyEPS[idIndex]+"\n"+
				"目前股價："+companyPrice[idIndex]+"\n"+
                             	"本益比："+idPERatioArray[i].peratio+"\n\n"
			);
    		}
  	}

  	/* (25):
   	 * windowOnResize 函式是在視窗被使用者變更大小時會調用的函式，它在
   	 * showInterface 函式中被指定給 window.onresize 當做事件處理函式。
   	 * 當視窗大小變更時，可能會影響 messageBox 中的資料顯示，請看 (17) 說明
   	 */
   
  	function windowOnResize() {
    		messageBox.style.overflow="scroll";
    		messageBox.style.width=window.innerWidth-15;
    		messageBox.style.height=window.innerHeight-messageBox.offsetTop-15;    
  	}

  	/* (22):
    	 * showInterface 函式主要是用來在 HTML 文件中插入使用者介面相關的
   	 * 程式碼，並且指定按鍵的事件處理函式。
   	 */

  	function showInterface() {

    		/* (23):
     		 * 產生 HTML 中要用到的元件，有一個按鈕， sortPERatio 用來排序前
     		 * １００大本益比的公司，段落 messageBox 則當做訊息輸出盒，讓使用者
     		 * 看到程式的訊息及搜尋的結果。
     		 * 在還沒從檔案中讀出各公司的資料前先將 sortPERatio禁能。在此函式中
     		 * 還要設定 window.onresize 事件處理函式，以及開始時訊息輸出盒的大小
     		 * (依視窗的大小)。
     		 */

    		document.body.innerHTML=
      		"<p><input type=button id='sortPERatio' value='按本益比(前四季EPS)排序'></p>"+
      		"<p><pre id='msg'>請按上面按鈕進行排序。</pre></p>";
    		sortPERatioButton=document.getElementById("sortPERatio");
    		messageBox=document.getElementById("msg");
    		sortPERatioButton.setAttribute("disabled","true");
    		window.onresize=windowOnResize;   // 指定視窗大小改變時的事件處理函式

    		/* (24):
     		 * 依視窗的大小設定訊息輸出盒的大小，在此假設捲動桿的寬度是 15，
     		 * 訊息輸出盒的高度是視窗的高度再減去訊息盒在 body 中距上邊的大小
     		 * ，還要減去下邊捲動桿的高度，也是假設是 15。
     		 * 捲動桿的厚度不用很精準，只要讓它能出現在視窗中即可。
     		 */ 

    		messageBox.style.overflow="scroll";
    		messageBox.style.width=window.innerWidth-15;
      		messageBox.style.height=window.innerHeight-messageBox.offsetTop-15;  
  	}

  	/* (15):
   	 * downloadCompanyStockPrice 下載各公司的即時走勢圖網頁，網址是
   	 * 『https://tw.quote.finance.yahoo.net/quote/q?type=tick&perd=1m&
   	 * mkt=10&sym=公司ID』，然後從網頁中取出目前成交價。
   	 */

  	function downloadCompanyStockPrice() {
    		var index;
    
    		/* (21):
     		 * processcCompanyPriceInfoArray 函式的作用請參考範例４中的
     		 * processMarketInfoArray 函式說明。
     		 */ 

    		function processcCompanyPriceInfoArray(CompanyPriceInfo) {
      			var CompanyPriceInfoSplitArray=CompanyPriceInfo.split(",");
      			var CompanyPriceInfoArray=new Array(2);
      			CompanyPriceInfoArray[0]=[];
      			CompanyPriceInfoArray[1]=[];
      			for (var i=0;i<CompanyPriceInfoSplitArray.length;i++) {
        			var oneInfo=CompanyPriceInfoSplitArray[i].split(":");
        			CompanyPriceInfoArray[0].push(oneInfo[0]);
        			CompanyPriceInfoArray[1].push(oneInfo[1]);
      			}
      			return CompanyPriceInfoArray; 
    		}
    
    		/* (17):
     		 * processCompanyPriceInfo 函式負責處理下載的各公司走勢圖網頁。
     		 * 從下載公司走勢圖原始碼中取出 CompanyPriceInfoArray 的方法和
     		 * 範例４中取出大盤 marketInfoArray 的方法一樣，請參閱先前說明。
     		 */

    		function processCompanyPriceInfo() {

      			/* (19):
       			 * 初始化 price 為 NaN 的目的是為了下載網頁若是失敗的情形下，
       			 * 該公司的成交價將不存在，但是所有公司成交價的陣列中還是要把
       			 * 一個值放入到陣列中，在此選擇將 NaN 放入，之後在計算本益比
       			 * 的時候將不計算成交價不存在的公司。
       			 */

      			var price=Number.NaN;
      			if (this.status === 200) {
        			var CompanyPriceInfo=this.response;
        			var tempIndex1=CompanyPriceInfo.indexOf("name");
        			CompanyPriceInfo=CompanyPriceInfo.slice(tempIndex1-1);
        			tempIndex1=CompanyPriceInfo.indexOf("[");
        			CompanyPriceInfo=CompanyPriceInfo.slice(0,tempIndex1-9);
        			CompanyPriceInfoArray=processcCompanyPriceInfoArray(CompanyPriceInfo);
        
				/* (18):
         			 * 下載的網頁資料中有如下的格式
         			 * "name":"聯詠","128":2036.0,...,"122":81.0,"125":123.5,"126":113.0
         			 * processcCompanyPriceInfoArray 處理後傳回的 CompanyPriceInfoArray
         			 * 是一個二維陣列，其中
         			 * CompanyPriceInfoArray[0] 內容是 "name","128",...,"125","126"
         			 * CompanyPriceInfoArray[1] 內容是 "聯詠",2036.0,...,123.5,113
         			 * 要注意到的是內容包含有雙引號在裏面，成交值是相對於
         			 * CompanyPriceInfoArray[0] 內容是 "125" 的那一個 index 在 
         			 * CompanyPriceInfoArray[1] 中的值，以上例來說就是 123.5，用
         			 * indexOf 來搜尋 "125" 字串時，要包括雙引號。
         			 */

        			var priceIndex=CompanyPriceInfoArray[0].indexOf("\"125\"");
        			if (priceIndex!=-1) {
          				// 下載資料中有成交值時，才設定 price 的值，否則 price 會是 NaN
          				price=parseFloat(CompanyPriceInfoArray[1][priceIndex]); 
        			}
      			} else {
        			showMessage("下載公司即股價失敗! status="+
                                this.status);
      			}      

      			/* (20):
       		 	 * 不論公司的股價存在與否，都要在所有公司成交價陣列中放入一個
       		 	 * 值。然後再繼續下一個公司網頁的下載。
       		 	 * 如果到達最後一家公司，則將 sortPERatio 按鈕的禁能去除，讓使
       		 	 * 用者可以按下按鈕，開始進行排序。
       		 	 */

      			companyPrice.push(price);
			showMessage("請稍候，正在下載各公司即時股價網頁中...\n"+
				"index="+index);
      			index++;    // 繼續下一家公司
      			if (index==totalCompany) {
        			showMessage("下載完畢，請按上方按鈕進行排序...\n");
        			sortPERatioButton.removeAttribute("disabled");
        			sortPERatioButton.onclick=sortPERatioButtonClick;
      			} else {
        			getUrlSource(
          				companyPriceUrlArray[index],
          				processCompanyPriceInfo,
          				errorHandler
        			);      
      			}
    		}
    
    		/* (16):
     		 * 首先準備好各公司走勢圖網址的陣列 companyPriceUrlArray，然後
    	 	 * 依序下載各公司網頁。下載各公司走勢圖網頁的程式可以參考範例４
    	 	 * 中下載大盤走勢圖的程式。
   	  	 * index 是目前要下載公司的網頁在 companyPriceUrlArray 中的位置，
    	 	 * 一開始先設成0表示從第0個網址開始下載。下載網頁仍然是利用
    	 	 * getUrlSource 函式進行，每下載完一個網頁就呼叫 processCompanyPriceInfo
    	 	 * 函式，負責處理下載的網頁原始碼。
   	  	 */

   	 	var companyPriceUrlArray=[];
   	 	for (i=0;i<totalCompany;i++) {
   	   		companyPriceUrlArray.push(
   	   		"https://tw.quote.finance.yahoo.net/quote/q?type=tick&perd=1m&mkt=10&sym="+
   	   		companyID[i]);
    		}
    		index=0;
    		showMessage("請稍候，正在下載各公司即時股價網頁中...\n");
   	 	getUrlSource(
     	 		companyPriceUrlArray[index],
     	 		processCompanyPriceInfo,
     	 		errorHandler
    		);
  	}
  
  	/* (13):
   	 * readAllCompanySeasonEPSOK 函式是在讀取完所有公司每季EPS檔案後被
   	 * 呼叫，傳入的參數 textArray 是讀檔得到的文字字串陣列，大小也是
   	 * totalCompany ，此陣列中的每一個元素是一個公司的每季EPS資料。
   	 * 必須提醒的是，在這裏有一個假設存在，正常來說每季 EPS 的檔案會
   	 * 隨著時間增大，當有新一季的 EPS 出來時，要附加到檔案中，目前每季
   	 * EPS 的存檔程式(範例５)是把下載網頁中的資料直接覆蓋每季 EPS 的檔案
   	 * ，你必須自己修改程式為附加新一季的資料到檔案中。另外，你也必須
   	 * 自己寫程式判斷 EPS 的年份及屬於第幾季。
   	 */

  	function readAllCompanySeasonEPSOK(textArray) {
    		for (i=0;i<totalCompany;i++) {
      			var oneCompanySeasonEPS=textArray[i];    // 得到一家公司EPS的基本資料

      			/* (14):
       			 * 將一家公司的各季EPS字串用 "\n" 分開成一季一季的字串，再將
     	  		 * 一季的字串用 ":" 分開成陣列，分開後陣列的第0個元素是年度及
     	  		 * 第幾季，第1個元素才是一季的EPS，將EPS用 parseFloat 轉成數值
     	  		 * 把它加總到 totalEPS 中，前四季的EPS加總完畢後，即可放入
      	 		 * companyEPS 陣列中。
     	  		 * 得到所有公司前四季EPS總合數值後，即可讓 sortPERatio  
      	 		 * 按鈕去除禁能的狀態，讓使用者可以自由按下它。
      	 		 * 請注意這裏的 EPS 總合是前四季，未必是同一年度的獲利，如果要是同
     	  		 * 一年度的獲利，最好是每年2,3月時已經確定前一年度四季 EPS 的時候，
     	  		 * 才來執行此程式。
      	 		 */

      			var totalEPS=0;
      			var oneCompanySeasonEPSSplitArray=oneCompanySeasonEPS.split("\n");
      			for (k=0;k<oneCompanySeasonEPSSplitArray.length-1;k++) {
       		 		var oneSeasonEPSText=oneCompanySeasonEPSSplitArray[k];
        			var oneSeasonEPSTextSplitArray=oneSeasonEPSText.split(":");
        			var seasonEPS=parseFloat(oneSeasonEPSTextSplitArray[1]);
        			totalEPS=totalEPS+seasonEPS;
      			}
      			companyEPS.push(totalEPS);
    		}
    		downloadCompanyStockPrice();
  	}
  
  	/* (10):
   	 * readAllCompanySeasonEPS 函式負責啟動讀取各公司每季盈餘的作業。
   	 * 在開始讀入作業前要先準備好各檔案的目錄及檔名，由於目錄在
   	 * readAllComanyInformation 函式中已準備過了，因此在此函式中只要
   	 * 把檔名陣列準備即可。
   	 */

  	function readAllCompanySeasonEPS() {

    		/* (11):
     		 * 準備所有公司每季EPS檔案名稱的陣列 allCompanySeasonEPSFileArray
     		 */    

    		allCompanySeasonEPSFileArray=[];
    		for (i=0;i<totalCompany;i++) {     // 共有 totalCompany 個檔案要讀取
      			// 檔案名稱均為 "seasonEPS.txt"
      			allCompanySeasonEPSFileArray.push("seasonEPS.txt");
    		}       
    		showMessage("請稍候，讀取各公司每季EPS檔案中...\n");

    		/* (12):
     		 * 調用 readLOcalTextFileSeries 函式讀入所有公司每季EPS資料檔案。
     		 * 所有檔案讀取完畢後呼叫 readAllCompanySeasonEPSOK 函式。
     		 */      

    		readLocalTextFileSeries(allCompanyDirectoryArray,
                            allCompanySeasonEPSFileArray,
                            readAllCompanySeasonEPSOK);    
  	}
  
  	/* (8):
   	 * readAllComanyInformationOK 函式是在讀取完全部公司的基本資料檔案後
   	 * 被呼叫。傳入的參數 textArray 是讀檔得到的文字字串陣列，大小也是
   	 * totalCompany ，此陣列中的每一個元素是一個公司的基本資料，格式是
   	 * 董事長/總經理/股本/。
   	 * 處理完所有公司基本資料後，呼叫 readAllCompanySeasonEPS 函式
   	 */

  	function readAllComanyInformationOK(textArray) {
    		for (i=0;i<totalCompany;i++) {
      			var oneCompanyInfo=textArray[i];    // 得到一家公司的基本資料

      			/* (9):
       			 * 將一家公司的資料依 "/" 分開成陣列，分開後陣列的第 0 個
       			 * 元素是董事長，第 1 個元素是總經理，第 2 個元素是股本，
       			 * 分別將各元素放入整體性變數 companyPresident、companyCEO
       			 * companyCapital 三個陣列中。
       			 */

      			var oneCompanyInfoSplitArray=oneCompanyInfo.split("/");
      			companyPresident.push(oneCompanyInfoSplitArray[0]);
      			companyCEO.push(oneCompanyInfoSplitArray[1]);
      			companyCapital.push(parseFloat(oneCompanyInfoSplitArray[2]));
    		}
    		readAllCompanySeasonEPS();
  	}
  
  	/* (4):
   	 * readAllComanyInformation 函式負責啟動讀入所有公司基本資料的作業。
   	 * 在開始讀入作業前要準備好所有公司基本資料所在的目錄陣列及檔案目錄
   	 * 陣列，這二個陣列的大小都是 totalCompany。
   	 */

  	function readAllComanyInformation() {

    		/* (5):
     		 * 首先準備所有公司基本資料檔案所在目錄的陣列 allCompanyDirectoryArray
     		 */

    		allCompanyDirectoryArray=[];
    		for (i=0;i<totalCompany;i++) {     // 共有 totalCompany 個檔案要讀取
      			// 檔案所在目錄均為 "STOCK/ID"
      			allCompanyDirectoryArray.push("STOCK/"+companyID[i]);
    		}

    		/* (6):
     		 * 接著準備所有公司基本資料檔案名稱的陣列 allCompanyInfoFileArray
     		 */ 
   
    		allCompanyInfoFileArray=[];
    		for (i=0;i<totalCompany;i++) {     // 共有 totalCompany 個檔案要讀取
      			// 檔案名稱均為 "companyInfo.txt"
      			allCompanyInfoFileArray.push("companyInfo.txt");
    		}    
    		showMessage("請稍候，讀取公司基本資料檔案中...\n");

    		/* (7):
     		 * 調用 readLOcalTextFileSeries 函式讀入所有公司基本資料檔案。
     		 * 所有檔案讀取完畢後呼叫 readAllComanyInformationOK 函式。
     		 */      

    		readLocalTextFileSeries(allCompanyDirectoryArray,
                            allCompanyInfoFileArray,
                            readAllComanyInformationOK);
  	}
  
  	/* (2):
   	 * 在讀入 company.txt 檔案後會呼叫此函式，此函式主要由檔案內容
   	 * 處理出各公司名稱及ID，得到 companyName,companyID 陣列及 
   	 * totalCompany 變數。
   	 * 請參考範例5中 readCompanyFileOK 函式的說明，這裏的程式和範例5
   	 * 中程式幾乎完全相同。
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
    		showInterface();

    		/* (3):
     		 * 處理得到 companyArray 之後，呼叫 readAllComanyInformation 函式，該函
     		 * 式主要用來啟動讀入所有公司基本資料檔案的作業。
     		 */

    		readAllComanyInformation();
  	}
      
  	/* (1):
   	 * 本範例程式由此開始執行，程式用到的資料變數及函式全部都放在
   	 * windoiw.onload 中。
   	 * 程式一開始先讀入 company.txt 檔案的內容。讀取檔案的函式在這
   	 * 是使用 readLoaclTextFileSeries ，雖然這個函式主要是可以一次
   	 * 讀取多個檔案，用它來讀取一個檔案也是可以的。只要把要讀取的
   	 * 單一檔案所在目錄放在陣列中形成第一個參數，要讀取的檔案名稱
    	 * 同樣放入一個陣列中形成第二個參數即可。
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
 * 另一個『綜合範例8』按鈕才是啟動本範例程式的真正關鍵。
 */

window.onload=function() {
	document.body.innerHTML=
		"<input type=button id='ex3Button' value='綜合範例3'>"+
		"<input type=button id='ex5Button' value='綜合範例5'>"+
		"<input type=button id='ex8Button' value='綜合範例8'>"+
		"<p><pre id='msg'>此處是訊息盒，在此顯示訊息。</pre></p>";

	document.getElementById("ex3Button").onclick=function() {
		doEx3WindowOnload();
	};

	document.getElementById("ex5Button").onclick=function() {
		doEx5WindowOnload();
	};

	document.getElementById("ex8Button").onclick=function() {
		doEx8WindowOnload();
	};
};
