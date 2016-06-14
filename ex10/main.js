/*
 * 範例10：試寫一程式自動下載大盤歷史資訊，並將新的資自動加到大盤歷史資訊
 * 	   檔案中。使用者可由目前大盤歷史資訊檔案中讀出資料，並且畫成 K 
 *	   線圖，在繪圖視窗中，使用者可以放大、縮小想查看的時間範圍，也可
 *	   以平移 K 線圖到想看的時間區域內。
 *	   在 K 線圖中，使用者可以指定二高點或二低點連成趨勢線，並查看當天
 *	   大盤指數的支撐或壓力點數。
 *	   此範例不只可以畫出K 線圖，還會自動分析出它是屬於那種形式，以供
 *	   使用者決策之用。K 線圖的形式有非常多種，本範例將自動找出常用的
 *	   幾種形式，如下所列：
 *
 *		1. 看跌三部曲結構
 *		2. 看漲三部曲結構
 *		3. 空頭吞噬線
 *		4. 多頭吞噬線
 *		5. 長下影線
 *		6. 長上影線
 *		7. 夜星
 *		8. 晨星
 *		9. 槌線
 *		10. 倒槌線
 *
 *	   以上判斷出的線型會直接在 K 線圖中標示出來。另外，本範例將用物件
 *	   的方式來設計程式。
 */


/* 本範例的進入點是此處的 window.onload 函式。 */

window.onload=function() {
	var idText;
	var companyText;
	var twMarketCheckbox;
	var dayRadio;
	var weekRadio;
	var monthRadio;
	var startButton;
	var clearButton;
	var stockgraphicsCanvas;
	var messageBox;
	var historyType;
	var companyHistoryObject;
	var companyId;
	var savedCompanyArray;
	var totalCompany;
	var companyDirectoryArray;
	var companyNameFilenameArray;

	/* 函式 createCompanyHistoryObjectCallback 是由使用者選擇公司
	 * ID 或大盤之後，產生出該公司歷史資訊的 companyHistoryObject 
	 * 物件被呼叫的函式。此時就可以用此歷史資訊物件來進行繪圖的工
	 * 作了。
	 */

	function createCompanyHistoryObjectCallback() {
		appendMessage("更新物件資料完畢，開始作圖。\n");
		var stockGraphics=new StockGraphics(
			stockgraphicsCanvas,
			CANVAS_WIDTH,
			CANVAS_HEIGHT,
			companyHistoryObject
		);
	}

  	function windowOnResize() {
    		messageBox.style.overflow="scroll";
    		messageBox.style.width=window.innerWidth-15;
    		messageBox.style.height=window.innerHeight-messageBox.offsetTop-15;    
  	}

  	function showInterface() {

		/* 在 HTML 的 body 標記中插入使用者操作介面的元件標記。 */

    		document.body.innerHTML=
		"<p>請輸入股票代號：<input type=text size=6 id='idText' name='id'>&nbsp或者&nbsp"+
		"公司名稱：<input type=text size=6 id='companyText' name='company'>&nbsp或者&nbsp"+
		"<input type=checkbox id='twMarketCheckbox' name='tw-market'>大盤&nbsp&nbsp"+
		"<input type=button id='companyButton' value='公司代號列表'>&nbsp&nbsp"+
		"<input type=button id='updateButton' value='更新所有公司歷史資訊'></p>"+
		"<p>繪圖的形式："+
		"<input type=radio id='dayRadio' name='type'>每日資料"+
		"<input type=radio id='weekRadio' name='type'>每週資料"+
		"<input type=radio id='monthRadio' name='type'>每月資料&nbsp&nbsp"+
		"<input type=button id='startButton' value='開始繪圖'>&nbsp&nbsp"+
		"<input type=button id='clearButton' value='清除訊息'></p>"+
		"<center><canvas id='stockgraphicsCanvas' width="+
			CANVAS_WIDTH+" height="+CANVAS_HEIGHT+">"+
		"你的瀏覽器不支援canvas</canvas></center>"+
      		"<p><pre id='msg'>請輸入公司代號或勾選『大盤』，然後選取繪圖的形式，"+
			"再按下『開始繪圖』按鈕。\n</pre></p>";

		/* 利用 getElementById 取得使用者操作介面元件在 JavaScript
		 * 語言中的物件，並存於區域變數中。
		 */

		idText=document.getElementById("idText");
		companyText=document.getElementById("companyText");
		twMarketCheckbox=document.getElementById("twMarketCheckbox");
		dayRadio=document.getElementById("dayRadio");
		weekRadio=document.getElementById("weekRadio");
		monthRadio=document.getElementById("monthRadio");
		startButton=document.getElementById("startButton");
		clearButton=document.getElementById("clearButton");
    		messageBox=document.getElementById("msg");
		stockgraphicsCanvas=document.getElementById("stockgraphicsCanvas");
		var companyButton=document.getElementById("companyButton");
		var updateButton=document.getElementById("updateButton");

		/* 設定使用者操作介面的初始狀態。 */
		
		clearButton.onclick=function () {
			showMessage("");
		}

		/* 設定『訊息盒』的大小。 */

    		window.onresize=windowOnResize;
		windowOnResize();

		/* 設定下載資料形式的圓鈕之事件處理程式。 
		 * 共有三種下載資料的形式，使用者按下其中一個圓鈕時，
		 * 將會設定 historyType 為不同的值，如下：
		 *
		 * 	每日資料：historyType 是 "d"
		 *	每週資料：historyType 是 "w"
		 *	每月資料：historyType 是 "m"
		 *
		 * 預設是下載每日資料，所以一開始要按一下『每日資料』
		 * 的圓鈕。
		 */
		
		dayRadio.onclick=function() {
			historyType="d";
		};		
		weekRadio.onclick=function() {
			historyType="w";
		};
		monthRadio.onclick=function() {
			historyType="m";
		};
		dayRadio.click();

		/* 預設是繪製大盤 K 線圖 */

		twMarketCheckbox.click();
		idText.value="";
		companyText.value="";
		
		/* 如果使用者勾選『大盤』核取按鈕，則清空 idText 文字盒 */

		twMarketCheckbox.onclick=function () {
			if (twMarketCheckbox.checked) {
				idText.value="";
				companyText.value="";
			}
		};

		/* 如果使用者輸入公司 ID ，則取消『大盤』核取盒的勾選 */

		idText.onkeydown=function() {
			twMarketCheckbox.checked=false;
			companyText.value="";
		};

		companyText.onkeydown=function() {
			twMarketCheckbox.checked=false;
			idText.value="";
		};


		/* 按下『公司代號列表』按鈕後執行的函式 */

		companyButton.onclick=function () {
			showMessage("公司代號列表：\n");
			for (var i=0;i<totalCompany;i++) {
				appendMessage("\t"+savedCompanyArray[i].companyName+
					      "\t"+savedCompanyArray[i].companyID+
					      "\n");
			}
		};

		/* 按下『更新所有公司歷史資訊』按鈕後執行的函式 */

		updateButton.onclick=function () {
			var index=-1;

			/* 開始更新資料後，不可以按下『開始繪圖』等按鈕 */

			startButton.setAttribute("disabled","true");
			updateButton.setAttribute("disabled","true");
			companyButton.setAttribute("disabled","true");

			function newMarketMonthHistoryCallback() {

				/* 更新所有歷史資料完畢後，可以按下『開始繪圖』等按鈕 */

				startButton.removeAttribute("disabled");
				updateButton.removeAttribute("disabled");
				companyButton.removeAttribute("disabled");
				showMessage("所有公司及大盤歷史資訊更新完畢。\n");
			}

			function newMarketWeekHistoryCallback() {
				/* 更新大盤每月歷史資訊 */
				companyHistoryObject=new CompanyHistory(
						"%23001",
						"大盤",
						"m",
						newMarketMonthHistoryCallback
				);
			}

			function newMarketDayHistoryCallback() {
				/* 更新大盤每週歷史資訊 */
				companyHistoryObject=new CompanyHistory(
						"%23001",
						"大盤",
						"w",
						newMarketWeekHistoryCallback
				);
			}

			/* 函式 newCompanyMonthHistoryCallback 是更新一家公司每月歷史資訊後
			 * 的回呼函式。
			 */

			function newCompanyMonthHistoryCallback() {
				index++;
				showMessage("更新所有公司每月歷史資料中，請稍候...\n"+
				    	    "index="+index+"\n");
				if (index==totalCompany) {
					/* 所有公司每月歷史資訊更新完畢 */
					showMessage("所有公司歷史資訊更新完畢。\n");
					appendMessage("更新大盤每日歷史資訊，請稍候...\n");
					companyHistoryObject=new CompanyHistory(
							"%23001",
							"大盤",
							"d",
							newMarketDayHistoryCallback
					);
				} else {
					/* 用 new CompanyHistory 更新每家公司的資料 */
					companyHistoryObject=new CompanyHistory(
						savedCompanyArray[index].companyID,
						savedCompanyArray[index].companyName,
						"m",
						newCompanyMonthHistoryCallback
					);
				}
			}

			/* 函式 newCompanyWeekHistoryCallback 是更新一家公司每週歷史資訊後
			 * 的回呼函式。
			 */

			function newCompanyWeekHistoryCallback() {
				index++;
				showMessage("更新所有公司每週歷史資料中，請稍候...\n"+
				    	    "index="+index+"\n");
				if (index==totalCompany) {	
					/* 所有公司每週歷史資訊更新完畢，重新設定
					 * index ，呼叫 newCompanyMonthHistoryCallback
					 * 函式開始更新第一家公司的每月歷史資訊。
					 */
					index=-1;
					newCompanyMonthHistoryCallback();
				} else {
					/* 用 new CompanyHistory 更新每家公司的資料 */
					companyHistoryObject=new CompanyHistory(
						savedCompanyArray[index].companyID,
						savedCompanyArray[index].companyName,
						"w",
						newCompanyWeekHistoryCallback
					);
				}
			}

			/* 函式 newCompanyDayHistoryCallback 是更新一家公司每日歷史資訊後
			 * 的回呼函式。
			 */

			function newCompanyDayHistoryCallback() {
				index++;
				showMessage("更新所有公司每日歷史資料中，請稍候...\n"+
				    	    "index="+index+"\n");
				if (index==totalCompany) {
					/* 所有公司每日歷史資訊更新完畢，重新設定
					 * index ，呼叫 newCompanyWeekHistoryCallback
					 * 函式開始更新第一家公司的每週歷史資訊。
					 */
					index=-1;
					newCompanyWeekHistoryCallback();
				} else {
					/* 用 new CompanyHistory 更新每家公司的資料 */
					companyHistoryObject=new CompanyHistory(
						savedCompanyArray[index].companyID,
						savedCompanyArray[index].companyName,
						"d",
						newCompanyDayHistoryCallback
					);
				}
			}

			/* 呼叫 newCompanyDayHistoryCallback 開始更新第一家公司的每
			 * 日歷史資訊。index 是目前要更新的公司在 savedCompanyArray
			 * 中的 index 值減去 1，初始時 index=-1 ，在進到 
			 * newCompanyDayHistoryCallback 函式中後會加 1，所以第一家公
			 * 司的 index 是 0。
			 */

			newCompanyDayHistoryCallback();
		};

		/* 按下『開始』按鈕後執行的函式 */

		startButton.onclick=function () {
			if (twMarketCheckbox.checked) {

				/* 如果使用者勾選了『大盤』核取盒，則建立一個大盤
				 * 的歷史資料物件。物件建立(更新資料)完成後，呼叫
				 * createCompanyHistoryObjectCallback 函式進行後續
				 * 的繪圖工作。
				 */

				companyHistoryObject=new CompanyHistory(
							"%23001",
							"大盤",
							historyType,
							createCompanyHistoryObjectCallback
						);
			} else if (idText.value!="") {
				
				/* 如果使用者輸入了公司的代號，則從 savedCompanyArray 中
				 * 查尋是否有該公司代號的公司存在。
				 */

				showMessage("查尋公司代號中...\n共有"+totalCompany+"家公司\n");

				/* 先設定 found 變數是 false ，代表找不到使用者指定的
				 * 的公司代號。 foundIndex 代表找到的公司在 savedCompanyArray
				 * 中的 index，一開始假設無該公司，所以 foundIndex=-1
				 */

				var found=false;
				var foundIndex=-1;

				/* 每家公司一一比對 companyId 是否為 idText.value(使用者輸入
				 * 的ID)。
				 */

				for (var i=0;i<totalCompany;i++) {
					if (savedCompanyArray[i].companyID==idText.value) {

						/* 如果找到使用者輸入的 ID 值則設定 found
						 * 值是 true，表示找到了該公司。此時的 i
						 * 值即該公司在 savedCompanyArray 中的 index。
						 */

						found=true;
						foundIndex=i;
					}
				}
				if (found) {
					appendMessage("有該公司代號之公司!\n公司代號是："+
						savedCompanyArray[foundIndex].companyID+"\n"+
						"公司名稱是："+
						savedCompanyArray[foundIndex].companyName+"\n"
						);

					/* 利用找到的公司 ID 產生一個 CompanyHistory 物件，
					 * 物件產生(更新內部歷史資料)後，會呼叫
					 * createCompanyHistoryObjectCallback 函式進行後續
					 * 繪圖工作。
					 */

					companyHistoryObject=new CompanyHistory(
							savedCompanyArray[foundIndex].companyID,
							savedCompanyArray[foundIndex].companyName,
							historyType,
							createCompanyHistoryObjectCallback
						);
				} else {
					appendMessage("無該公司代號之公司，請重新輸入代號!\n");
				}	
			} else {
				/* 如果使用者輸入了公司的名稱，則從 savedCompanyArray 中
				 * 查尋是否有該公司名稱的公司存在。
				 */

				showMessage("查尋公司名稱中...\n共有"+totalCompany+"家公司\n");

				/* 先設定 found 變數是 false ，代表找不到使用者指定的
				 * 的公司名稱。 foundIndex 代表找到的公司在 savedCompanyArray
				 * 中的 index，一開始假設無該公司，所以 foundIndex=-1
				 */

				var found=false;
				var foundIndex=-1;

				/* 每家公司一一比對 companyName 是否為 companyText.value(使用者輸入
				 * 的ID)。
				 */

				for (var i=0;i<totalCompany;i++) {
					if (savedCompanyArray[i].companyName==companyText.value) {

						/* 如果找到使用者輸入的公司名稱則設定 found
						 * 值是 true，表示找到了該公司。此時的 i
						 * 值即該公司在 savedCompanyArray 中的 index。
						 */

						found=true;
						foundIndex=i;
					}
				}
				if (found) {
					appendMessage("有該公司名稱之公司!\n公司代號是："+
						savedCompanyArray[foundIndex].companyID+"\n"+
						"公司名稱是："+
						savedCompanyArray[foundIndex].companyName+"\n"
						);

					/* 利用找到的公司名稱產生一個 CompanyHistory 物件，
					 * 物件產生(更新內部歷史資料)後，會呼叫
					 * createCompanyHistoryObjectCallback 函式進行後續
					 * 繪圖工作。
					 */

					companyHistoryObject=new CompanyHistory(
							savedCompanyArray[foundIndex].companyID,
							savedCompanyArray[foundIndex].companyName,
							historyType,
							createCompanyHistoryObjectCallback
						);
				} else {
					appendMessage("無該公司名稱之公司，請重新輸入代號!\n");
				}	
			}
		};

		startButton.setAttribute("disabled","true");
		updateButton.setAttribute("disabled","true");
		companyButton.setAttribute("disabled","true");
  	}

	/* 函式 saveNameFileCallback 是在每各公司目錄建立完畢，並且在
	 * 各公司目錄下存入 name.txt 檔案後被呼叫的函式。至此，第一次
	 * 執行程式時，各公司的目錄不存在的問題已完全解決，使用者可以
	 * 下載各公司的歷史資訊，並且存在各公司的目錄中了。如果不是第
	 * 一次執行此程式，也沒有問題，原本存在的各公司目錄及歷史資訊
	 * 仍然可以使用。
	 * 故而，本函式只要再顯示訊息
	 */

	function saveNameFileCallback() {
		showMessage("請輸入公司代號或勾選『大盤』，然後選取繪圖的形式，"+
			"再按下『開始繪圖』按鈕。\n");
		startButton.removeAttribute("disabled");
		updateButton.removeAttribute("disabled");
		companyButton.removeAttribute("disabled");
	}

	/* 函式 saveCompanyDataCallback 是將各公司名稱及代號資料存入 
	 * company.txt 檔案中後呼叫的函式。在此函式中，為每家公司建立
	 * 一個目錄，並在其中存入一個 name.txt 檔案，此檔案中是各公司
	 * 的所屬名稱。到此每家公司都有自己的目錄了，程式就可以用此目
	 * 錄中的歷史資訊來做更新了。
	 * 在建立目錄及存入 name.txt 檔案時，如果該檔案已存在，則不
	 * 覆蓋該目錄及檔案，目錄下的歷史資訊將永遠存在。
	 */

	function saveCompanyDataCallback() {
		companyDirectoryArray=[];
		for (var i=0;i<totalCompany;i++) {
      			companyDirectoryArray.push("/STOCK/"+savedCompanyArray[i].companyID);
    		}
		companyNameFilenameArray=[];
    		for (var i=0;i<totalCompany;i++) {
      			companyNameFilenameArray.push("name.txt");
    		}
		var companyNameArray=[];
		for (var i=0;i<totalCompany;i++) {
      			companyNameArray.push(savedCompanyArray[i].companyName);
    		}
    		saveLocalTextFileSeries(
			companyDirectoryArray,
			companyNameFilenameArray,
			companyNameArray,
			saveNameFileCallback,
			true
		);
	}

	/* 函式 getCompanyArrayCallback 是下載全部類別網頁完成後，並分析
	 * 出各公司的名稱、代號及類別後，被呼叫的函式。
	 * 傳入的參數 companyArray 是各公司前述資料的物件之陣列，此函式中
	 * 將 companyArray 陣列傳給 saveCompanyData 函式存下 company.txt 
	 * 檔。存檔完畢後，呼叫 saveCompanyDataCallback 函式繼續後續的工作。
	 */

	function getCompanyArrayCallback(companyArray) {
		/* 將傳入的 companyArray 存入 savedCompanyArray 變數中
		 * ，以便其它函式可以取得各公司 ID 資訊。
		 */
		savedCompanyArray=companyArray;
		totalCompany=savedCompanyArray.length;
		saveCompanyData(
			companyArray,
			saveCompanyDataCallback
		);
	}

	/* 函式 getClassTableCallback 是下載公司類別網頁成功後會呼叫的函式
	 * ，函式傳入的參數是公司類別的陣列。本範例繼續呼叫 getCompanyArray
	 * 函式以便下載所有類別的網頁，並取得各公司代號的陣列。取得公司代
	 * 號陣列後，會呼叫 getCompanyArrayCallback 函式。
	 */

	function getClassTableCallback(classArray) {
		getCompanyArray(
			classArray,
			getCompanyArrayCallback
		);
	}

	/* 函式 downloadCompanyInfo 是在讀取 company.txt 失敗時被呼叫
	 * 的函式，此時要從網路上下載各公司分類及代號資料，並且重新產
	 * 生 company.txt 檔案。
	 */

	function downloadCompanyInfo() {
		openLocalFileSystem("/STOCK");
		getClassTable(getClassTableCallback);
	}

	/* 函式 readCompanyFileCallback 是讀取 company.txt 成功後會被
	 * 呼叫的函式，如果 company.txt 讀出的內容是 "" ，表示是第一次
	 * 執行程式，所以檔案不存在，此時必須呼叫 downloadCompanyInfo
	 * 函式重新由網路下載公司資料，並存檔成 company.txt 檔。如果
	 * 不是第一次執行程式，則 company.txt 檔案會存在，則直接用它
	 * 讀出的內容來產生公司代號及名稱資料的 companyArray 陣列即可。
	 */

	function readCompanyFileCallback(companyTextArray) {
		var companyText=companyTextArray[0];
		if (companyText=="") {

			/* 如果 company.txt 不存在，則呼叫 downloadCompanyInfo
			 * 下載新的公司分類資料。
			 */

			downloadCompanyInfo();
		} else {
			var companyArray=[];

			/* 將 company.txt 檔案讀出的內容用 "\n" 分割成各公司
			 * 的資料字串。for 迴圈中程式請參考綜合範例 3 中的
			 * findStockIdByHref() 函式中的說明。
			 */

			var companyTextSplitArray=companyText.split("\n");
			for (var i=0;i<(companyTextSplitArray.length-1);i++) {
				var oneCompany=companyTextSplitArray[i];
      				var oneCompanySplit=oneCompany.split(" ");
        			var companyID=oneCompanySplit[0];
       				var companyName=oneCompanySplit[1];
				var companyHref=oneCompanySplit[2];
       				companyArray.push({
					"companyID":companyID,
					"companyName":companyName,
					"companyHref":companyHref
				});
			}
			savedCompanyArray=companyArray;
			totalCompany=savedCompanyArray.length;
			saveNameFileCallback();	
		}
	}

	/* 程式一開始要如綜合範例 3 中一樣，先產生 company.txt，這樣才可以
	 * 確定使用者在 idText 輸入盒中輸入的代號是否存在。接著也要像綜合
	 * 範例 5 一般，要先建立出各公司的目錄及基本檔案，如此在本範例中才可
	 * 以在各公司目錄中存入歷史資料的檔案。
	 */

	showInterface();

	/* 顯示完使用者介面後，立刻讀取 company.txt 檔案，以取得公司代號的資
	 * 料，讀取 company.txt 檔案後，會呼叫 readCompanyFileCallback 函式。
	 * 如果是第一次執行此程式則 company.txt 檔案將不存在，會讀不到資料，
	 * 這時就可以再到網路上下載各公司類別資訊網頁即可。
	 */

	readLocalTextFileSeries(
		["/STOCK"],
		["company.txt"],
		readCompanyFileCallback
	);

};
