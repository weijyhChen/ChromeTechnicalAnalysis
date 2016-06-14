/*
 * 範例７：試寫一程式讀出各公司基本資料，EPS 後，
 *         （１）依股本排序前　１００　大公司
 *         （２）依前四季 EPS 排序前　１００　大公司
 */

function doEx7WindowOnload() {

  	var allCompanyDirectoryArray=[];
  	var allCompanyInfoFileArray=[];
  	var allCompanySeasonEPSFileArray=[];
  	var companyName=[];         // 所有公司名稱陣列
  	var companyID=[];           // 所有公司ID陣列
  	var companyPresident=[];    // 所有公司的董事長陣列
  	var companyCEO=[];          // 所有公司的總經理陣列
  	var companyCapital=[];      // 所有公司的股本陣列
  	var companyEPS=[];          // 所有公司的EPS陣列
  	var totalCompany=0;         // 所有公司的數量，即 companyArray 的大小
  	var sortCapitalButton;      // HTML 元件 sortCapital 的 Javascript 物件
  	var sortSeasonEPSButton;    // HTML 元件 sortSeasonEPS 的 Javascript 物件
  	var messageBox;             // HTML 元件 messageBox 的 Javascript 物件
  	var companyInfo="";
  	var companySeasonEPS="";
  	var companyYearEPS="";

  	function epsCompare(companyIDEPS1,companyIDEPS2) {
    		return companyIDEPS2.eps-companyIDEPS1.eps;
  	}

  	/* (23):
   	 * sortSeasonEPSButtonClick 函式是當使用者按下『按四季EPS總合排序』
   	 * 按鈕後會呼叫的事件處理函式。詳細說明請參考 (20)(21)(22)
   	 */

  	function sortSeasonEPSButtonClick() {
    		var companyIDEPSArray=[];
    		for (i=0;i<totalCompany;i++) {
      			companyIDEPSArray.push({
        			"id":companyID[i],
        			"eps":companyEPS[i]
                        });
    		}
    		companyIDEPSArray.sort(epsCompare);
    		showMessage("");
    		for (i=0;i<100;i++) {
	      		var id=companyIDEPSArray[i].id;
      			var idIndex=companyID.indexOf(id);
      			appendMessage(
	      			"排名 "+(i+1)+"\n"+
      				"    公司代號："+id+"\n"+
      				"    公司名稱："+companyName[idIndex]+"\n"+
	      			"    四季EPS總合："+companyEPS[idIndex]+"\n\n"
			);
    		}
  	}

  	/* (22):
   	 * capitalCompare 函式是用來做排序股本時所用到的比較函式，當呼叫
   	 * companyIDCapitalArray.sort 來排序時，sort 會呼叫 capitalCompare
   	 * 並傳入二個公司的物件，比較函式要把傳入的二個物件加以比較，
   	 * 傳回結果。由於是遞減排序，所以用第二個參數減第一個參數的結果
   	 * 傳回。請自行比較範例３中的比較函式 companyComp。
   	 */

  	function capitalCompare(companyIDCapital1,companyIDCapital2) {
    		return companyIDCapital2.capital-companyIDCapital1.capital;
  	}
  
  	/* (19):
   	 * sortCapitalButtonClick 函式是當使用者按下『按資本額排序』
   	 * 按鈕後會呼叫的事件處理函式。
   	 */

  	function sortCapitalButtonClick() {

    		/* (20):
   	  	 * 要排序股本時，要先把它和公司ID結合在一起去排序，才可以在股本排序
    	 	 * 完成後知道公司的ID是什麼。
    	 	 * companyIDCapitalArray 就是結合 ID 和股本所形成的陣列，它的元素
   	  	 * 是一個物件，{"id":公司 ID，"capital":股本}
   	  	 */

    		var companyIDCapitalArray=[];
    		for (i=0;i<totalCompany;i++) {
      			companyIDCapitalArray.push({
       		 		"id":companyID[i],
        			"capital":companyCapital[i]
			});
    		}

    		/* (21):
     		 * 在把 companyIDCapitalArray 排序時，使用 capitalCompare 函式
     		 * 做為比較函式。排完後列出前 100 大公司的 ID、名稱及股本。
     		 */

    		companyIDCapitalArray.sort(capitalCompare);
    		showMessage("單位 : 億元\n");
    		for (i=0;i<100;i++) {
      			var id=companyIDCapitalArray[i].id;
      			var idIndex=companyID.indexOf(id);
	      		appendMessage(
      				"排名 "+(i+1)+"\n"+
      				"    代號："+id+"\n"+
	      			"    公司名稱："+companyName[idIndex]+"\n"+
      				"    資本額："+companyCapital[idIndex]+"\n\n"
			);
	    	}
	}

  	/* (18):
   	 * windowOnResize 函式是在視窗被使用者變更大小時會調用的函式，它在
   	 * showInterface 函式中被指定給 window.onresize 當做事件處理函式。
   	 * 當視窗大小變更時，可能會影響 messageBox 中的資料顯示，請看 (17) 說明
   	 */
   
  	function windowOnResize() {
    		messageBox.style.overflow="scroll";
    		messageBox.style.width=window.innerWidth-15;
    		messageBox.style.height=window.innerHeight-messageBox.offsetTop-15;    
  	}

  	/* (15):
   	 * showInterface 函式主要是用來在 HTML 文件中插入使用者介面相關的
   	 * 程式碼，並且指定按鍵的事件處理函式。
   	 */

  	function showInterface() {

    		/* (16):
     	 	 * 產生 HTML 中要用到的元件，有二個按鈕， sortCapital 用來排序前
     		 * １００大股本的公司，sortSeasonEPS 用來排序前１００大ＥＰＳ的公司
     		 * ，段落 msg 則當做訊息輸出盒，讓使用者看到程式的訊息及搜尋
     		 * 的結果。
     		 * 在還沒從檔案中讀出各公司的資料前先將 sortCapital 及 sortSeasonEPS
     		 * 禁能。在此函式中還要設定 window.onresize 事件處理函式，以及開始
     		 * 時訊息輸出盒的大小(依視窗的大小)。
     		 */

    		document.body.innerHTML=
      		"<p><input type=button id='sortCapital' value='按資本額排序'></p>"+
      		"<p><input type=button id='sortSeasonEPS' value='按四季EPS總合排序'></p>"+
      		"<p><pre id='msg'>Message box.</pre></p>";
    		sortCapitalButton=document.getElementById("sortCapital");
    		sortSeasonEPSButton=document.getElementById("sortSeasonEPS");
    		messageBox=document.getElementById("msg");
    		sortCapitalButton.setAttribute("disabled","true");
    		sortSeasonEPSButton.setAttribute("disabled","true");
    		window.onresize=windowOnResize;   // 指定視窗大小改變時的事件處理函式
    		
		/* (17):
    		 * 依視窗的大小設定訊息輸出盒的大小，在此假設捲動桿的寬度是 15，
		 * 訊息輸出盒的高度是視窗的高度再減去訊息盒在 body 中距上邊的大小
     		 * ，還要減去下邊捲動桿的高度，也是假設是 15。
     		 * 捲動桿的厚度不用很精準，只要讓它能出現在視窗中即可。
     		 */
 
    		messageBox.style.overflow="scroll";
    		messageBox.style.width=window.innerWidth-15;
    		messageBox.style.height=window.innerHeight-messageBox.offsetTop-15;  
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
       		 	 * 得到所有公司前四季EPS總合數值後，即可讓 sortCapital 及 
       		 	 * sortSeasonEPS 二個按鈕去除禁能的狀態，讓使用者可以自由按下它們。
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

    		showMessage("檔案讀取完畢，你可按下列按鈕排序...\n");
    		sortCapitalButton.removeAttribute("disabled");
    		sortSeasonEPSButton.removeAttribute("disabled");
    		sortCapitalButton.onclick=sortCapitalButtonClick;
    		sortSeasonEPSButton.onclick=sortSeasonEPSButtonClick;
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
    		showMessage("請稍候，正在讀取EPS(每季)檔案...\n");

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
    		showMessage("請稍候，正在讀取公司基本資料檔案...\n");

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
 * 另一個『綜合範例6』按鈕才是啟動本範例程式的真正關鍵。
 */

window.onload=function() {
	document.body.innerHTML=
		"<input type=button id='ex3Button' value='綜合範例3'>"+
		"<input type=button id='ex5Button' value='綜合範例5'>"+
		"<input type=button id='ex7Button' value='綜合範例7'>"+
		"<p><pre id='msg'>此處是訊息盒，在此顯示訊息。</pre></p>";

	document.getElementById("ex3Button").onclick=function() {
		doEx3WindowOnload();
	};

	document.getElementById("ex5Button").onclick=function() {
		doEx5WindowOnload();
	};

	document.getElementById("ex7Button").onclick=function() {
		doEx7WindowOnload();
	};
};
