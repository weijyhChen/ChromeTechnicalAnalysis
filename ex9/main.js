/*
 * 範例９：試寫一程式下載大盤歷史股價資訊，存檔，並讀出。
 * 說明：大盤歷史股價資訊可以由 https://tw.quote.finance.yahoo.net/quote/q?
 *       type=ta&perd=d&mkt=10&sym=%23001 取得，下載資料的格式是
 *
 *       null({"mkt":"10","id":"#001","perd":"d","type":"ta","mem":{
 *       "id":"#001","name":"加權指數","129":7664.01,...,"126":7729.01},
 *       "ta":[{"t":20151001,"o":8194.3,"h":8317.79,"l":8170.78,"c":8295.94
 *       ,"v":87824},...,{"t":20160122,"o":7729.01,"h":7774.12,"l":7706.14,
 *       "c":7756.18,"v":69118}]
 *
 *       簡言之加權指數的歷史每日股價是在二個中括號 [] 之，每一筆由大括號
 *       {} 包住， 每個資料由逗號 , 分開，如下說明:
 *
 *          "t":20160122 日期
 *          "o":7729.01 開盤價
 *          "h":7774.12 最高價
 *          "l":7706.14 最低價
 *          "c":7756.18 收盤價
 *          "v":69118 成交量
 *
 *       存檔在 STOCK/dayHistory.txt 中，格式為每列一天的資料，每列資料格式為
 *       日期,開盤價,最高價,最低價,收盤價,成交值\n
 *       在存檔前，會先讀出檔案放在記憶體陣列中，若某天的資料已存在則不重複
 *       存檔。
 *      
 *	 在下載網址中的 perd=d 是代表下載的指數資料是每天的資料，若改為 perd=w
 *	 則下載的指數資料是每週一次的資料，perd=m 則是每月一次的資料。
 */


/* 本範例的進入點是此處的 window.onload 函式。 */

window.onload=function() {
	var downloadButton;
	var saveButton;
	var readButton;
	var dayRadio;
	var weekRadio;
	var monthRadio;
	var messageBox;
	var historyType;

	/* 函式 readHistoryDataCallback 是讀取大盤歷史資料完畢後被呼叫的
	 * 函式。在此函式中主要是將讀出的大盤歷史資料字串顯示給讀者查看，
	 * 並且將資料字串轉換為陣列形式，以待後面的範例使用。
	 */

	function readHistoryDataCallback(textArray) {

		/* 由於是用 readLocalTextFileSeries 讀取檔案，因此讀出的資料
		 * 字串是放在陣列中，所以 textArray[0] 中是檔案讀出的字串。
		 */

		var historyDataString=textArray[0];

		showMessage("<pre>讀出大盤資料如下：\n");
		appendMessage("時間		開盤價	收盤價	最高價	最低價	成交量(億)\n");

		/* 將讀出的資料字串轉換成陣列的形式，並顯示給使用者查看。
		 * 其實直接將 historyDataString 顯示給使用者查看也是一樣，
		 * 在此只是示範 historyDataArray 大盤資料陣列的用法，在後
		 * 面的範例中將會利用 historyDataArray 來給繪圖。
		 */

		var historyDataArray=historyStringToDataArray(historyDataString);
		for (var i=0;i<historyDataArray.length;i++) {
			appendMessage(
				historyDataArray[i].time+"\t"+
				historyDataArray[i].open+"\t"+
				historyDataArray[i].close+"\t"+
				historyDataArray[i].high+"\t"+
				historyDataArray[i].low+"\t"+
				historyDataArray[i].volume+"\t"+
				"\n"
			);
		}
		appendMessage("</pre>");
	}

	/* 函式 saveHistoryDataCallback 是在儲存大盤歷史資料完畢後被呼叫
	 * 的函式。在此函式中主要是將『讀檔』按鈕致能，並且設定按下『讀檔』
	 * 按鈕後的程式。
	 */

	function saveHistoryDataCallback() {
		showMessage("儲存大盤資料完畢，請按『讀檔』按鈕讀出資料來查看。");
		readButton.removeAttribute("disabled");
		readButton.onclick=function () {
			switch (historyType) {
				case "d":
					showMessage("讀取每日大盤資料中...");
					readLocalTextFileSeries(
						["/STOCK"],
						["dayHistory.txt"],
						readHistoryDataCallback
					);
				break;
				case "w":
					showMessage("讀取每週大盤資料中...");
					readLocalTextFileSeries(
						["/STOCK"],
						["weekHistory.txt"],
						readHistoryDataCallback
					);
				break;
				case "m":
					showMessage("讀取每月大盤資料中...");
					readLocalTextFileSeries(
						["/STOCK"],
						["monthHistory.txt"],
						readHistoryDataCallback
					);
				break;
			}
		}
	}

	/* 函式 downloadHistoryDataCallback 是在下載大盤歷史資料完畢後
	 * 被呼叫的函式。
	 * 函式主要功能是將下載的資料顯示給使用者查看，並且設定『存檔』
	 * 按鈕為致能的狀態，並且指定按下『存檔』按鈕後的程式。
	 */

	function downloadHistoryDataCallback(historyDataArray) {
		showMessage("<pre>大盤歷史資料下載完畢，資料如下，請按『存檔』按鈕進行存檔。\n\n");
		appendMessage("時間		開盤價	收盤價	最高價	最低價	成交量(億)\n");
		historyString=historyDataArrayToString(historyDataArray);
		appendMessage(historyString+"</pre>");

		saveButton.removeAttribute("disabled");
		saveButton.onclick=function () {
			switch (historyType) {
				case "d":
					showMessage("儲存每日大盤資料中...");
					saveLocalTextFileSeries(
						["/STOCK"],
						["dayHistory.txt"],
						[historyString],
						saveHistoryDataCallback,
						true);
				break;
				case "w":
					showMessage("儲存每週大盤資料中...");
					saveLocalTextFileSeries(
						["/STOCK"],
						["weekHistory.txt"],
						[historyString],
						saveHistoryDataCallback,
						true);
				break;
				case "m":
					showMessage("儲存每月大盤資料中...");
					saveLocalTextFileSeries(
						["/STOCK"],
						["monthHistory.txt"],
						[historyString],
						saveHistoryDataCallback,
						true);
				break;
			}
		}
	}

  	function windowOnResize() {
    		messageBox.style.overflow="scroll";
    		messageBox.style.width=window.innerWidth-15;
    		messageBox.style.height=window.innerHeight-messageBox.offsetTop-15;    
  	}

  	function showInterface() {

		/* 在 HTML 的 body 標記中插入使用者操作介面的元件標記。 */

    		document.body.innerHTML=
      		"<p><input type=button id='downloadButton' value='下載'>"+
		"<input type=button id='saveButton' value='存檔'>"+
		"<input type=button id='readButton' value='讀檔'></p>"+
		"<p>下載資料的形式：</p>"+
		"<p><input type=radio id='dayRadio' name='type'>每日資料"+
		"<input type=radio id='weekRadio' name='type'>每週資料"+
		"<input type=radio id='monthRadio' name='type'>每月資料</p>"+
      		"<p><pre id='msg'>請先選取下載資料的形式，"+
		"再按『下載』按鈕開始下載大盤歷史資料。</pre></p>";

		/* 利用 getElementById 取得使用者操作介面元件在 JavaScript
		 * 語言中的物件，並存於區域變數中。
		 */

		downloadButton=document.getElementById("downloadButton");
		saveButton=document.getElementById("saveButton");
		readButton=document.getElementById("readButton");
		dayRadio=document.getElementById("dayRadio");
		weekRadio=document.getElementById("weekRadio");
		monthRadio=document.getElementById("monthRadio");
    		messageBox=document.getElementById("msg");

		/* 設定使用者操作介面的初始狀態。 */
		
		saveButton.setAttribute("disabled","true");
		readButton.setAttribute("disabled","true");

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

		/* 設定『下載』按鈕的事件處理函式。	
		 * 在此事件處理函式中會呼叫 downloadHistoryData 函式，
		 * 並將下載資料形式的區域變數 historyType 傳入該函式，
		 * 同時也要傳入一個回呼函式 downloadHistoryDataCallback
		 * 表示下載大盤歷史資料並處理成陣列形式後，所要回呼的
		 * 函式，此回呼函式會接下後續該如何處理歷史資料陣列的
		 * 工作。
		 */
		
		downloadButton.onclick=function() {
				downloadHistoryData(
				historyType,
				downloadHistoryDataCallback
			);
		};
  	}

	showInterface();
};
