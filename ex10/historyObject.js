/* 函式 CompanyHistory 是公司歷史資訊物件的建構式，傳入的第一個參數是
 * 代表公司的代號。各公司歷史股價資訊可以由『 
 * https://tw.quote.finance.yahoo.net/quote/q?type=ta&perd=d&
 * mkt=10&sym=公司代號』取得，若公司代號是『%23001』表示是大盤
 * 的歷史資料，下載資料的格式是
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
 * 傳入的第二個參數 historyType 代表要查看的資料型態，詳細的說明請看建構式
 * 中的說明。
 * 傳入的第三個參數 callback 是歷史資料更新完後會呼叫的函式。在產生物件的
 * 當下，物件程式本身就會由檔案中讀入相關檔案，取出已經存檔的歷史資料，
 * 然後會下載網頁中最新的歷史資料更新物件中的 historyDataArray 陣列，更
 * 新完後會再把歷史資料存檔，存完檔就會呼叫 callback 函式，以便回到物件
 * 使用者的控制之中。
 *
 * 本綜合範例中，利用很多訊息輸出到顯示盒中來幫助了解程式執行的情形，初
 * 學者可以學習這類的技巧，在程式執行狀況不如你的想像時，有時一點小小的
 * 訊息就可以讓你了解問題出在什麼地方。
 */

function CompanyHistory(companyId,companyName,historyType,callback) {
	
	/* 屬性 historyDataArray 是公司的歷史資訊，歷史資訊的形態是
	 * 由屬性 historyType 決定。
	 */

	this.historyDataArray=[];

	/* 屬性 companyId 是公司代號 */

	this.companyId=companyId;
	this.companyName=companyName;

	/* 屬性 callback 是歷史資料更新過後會回呼的函式 */

	this.callback=callback;

	/* 屬性 historyType 代表此歷史資訊是日線、週線或月線的資料，它的值可以是
	 *
	 * 	"d" 表示是每日歷史資料
	 *	"w" 表示是每週歷史資料
	 *	"m" 表示是每月歷史資料
	 *
	 * 在此利用呼叫物件本身的方法 setHistoryType 來設定資料型態。
	 */

	this.setHistoryType(historyType);
	
	/* appendMessage("CompanyHistory:\ncompanyId="+this.companyId+
		"，historyType="+this.historyType+"\n");*/
}

/* 類別 CompanyHistory 的 setHistoryType 方法用來設定該物件的
 * historyType 屬性。
 * 在一般的程式中，雖然可以用 companyHistoryObject.historyType="d"
 * 的方式直接設定 companyHistoryObject 物件的 historyType 屬性，
 * 但這是不對的方式，所有物件的屬性都應該透過方法來改變或取得它的
 * 值。如果不這樣做可能會有以下的問題：
 *
 *	(1) 設定的屬性值超過容許的範圍。
 *	    如果透過方法來設定屬性值，在方法中就可以利用程式來檢查
 *	    設定值是否合法。
 *	(2) 設定屬性值後，物件內部狀態無法自動更新。
 *	    如果透過方法來設定屬性值，在方法中可以根據屬性值的改變
 *	    加入程式自動更新物件的內部狀態(資料)。
 *
 * 物件的方法一般都是像這樣可以由使用物件的程式所呼叫的函式，使用
 * 物件的程式透過方法可以操作物件，因此物件的方法有時也可稱做
 * 『介面』。
 * 以 setHistoryType 方法來說，雖然只是簡單的改變物件的 historyType
 * 的屬性，但還是要用一個方法來完成，因為在這個方法中，必須要檢查
 * 設定數值 historyType 是否為 "d","w"或"m"，如果使用者設定了錯誤的
 * historyType 數值，後續 CompanyHistory 物件的程式可能都會出問題
 * 了。另外，設定完 historyType 屬性後，內部的歷史資訊可能就不對了
 * ，此時就要根據新的 historyType 更新內部的歷史資料才對。
 */

CompanyHistory.prototype.setHistoryType=function (historyType) {
	if ((historyType!="d") && (historyType!="w") && (historyType!="m")) {

		/* 顯示設定 historyType 錯誤訊息，字串混合單、雙
		 * 引號是為了不使用跳脫字元，減少程式的雜亂度。
		 */

		showMessage('呼叫 setHistoryType 方法時，historyType 錯誤!\n');
		appendMessage('historyType='+historyType+"\n");
		appendMessage('historyType 合法值是 "d","w","m" 。');
	}
	this.historyType=historyType;
	this.update();
};

/* 類別 CompanyHistory 的 getHistoryType 方法是用來取得該物件的
 * historyType 屬性值。和 setHistoryType 方法一樣，要取得物件中
 * 的屬性也是要透過方法去取得，不可以直接存取物件內部的屬性。
 */

CompanyHistory.prototype.getHistoryType=function () {
	return this.historyType;
};

/* 類別 CompanyHistory 的 update 方法是用來更新該物件內部的
 * historyDataArray 歷史資訊陣列內容。
 */

CompanyHistory.prototype.update=function () {

	/* 函式 downloadHistoryData 是用來下載大盤或各公司的歷史資訊網頁
	 * ，下載的網頁會被處理成陣列的結構，並將此陣列傳給 callback 回呼
	 * 函式。此方法的主要程式和前一個綜合範例中的 downloadHistoryData
	 * 函式(在 history.js 檔案中)幾乎一樣。
	 */

	function downloadHistoryData() {


		/* historyDataStringToObject 函式是將下列格式字串的參數轉換成物件
		 * 後傳回。
		 *
		 * "t":20151223,"o":8296.58,"h":8359.25,"l":8296.58,"c":8315.7,"v":74307
		 */

		function historyDataStringToObject(oneData) {
		
			/* 首先將傳入的資料字串按 "," 加以分割，並得到 dataSplitArray
			 * 陣列。陣列中每個元素代表資料字串的的一個資料，分別如下：
			 *
			 *	dataSplitArray[0] 為 "t":20151223
			 *	dataSplitArray[1] 為 "o":8296.58
			 *	dataSplitArray[2] 為 "h":8259.25
			 *	dataSplitArray[3] 為 "l":8296.58
			 *	dataSplitArray[4] 為 "c":8315.7
			 *	dataSplitArray[5] 為 "v":74307(單：百萬)
			 */

			var dataSplitArray=oneData.split(",");
			
			/* 處理 dataSplitArray[0] 取得時間資訊，方法是
			 * 將其依 ":" 加以分開，得到 tempSplitArray 陣列
			 * ，tempSplitArray 陣列中的元素如下：
			 *
			 *	tempSplitArray[0] 是 "t"
			 *	tempSplitArray[1] 是 20151223 即時間資訊
			 */

			var tempSplitArray=dataSplitArray[0].split(":");
			var time=tempSplitArray[1];
			
			/* 處理 dataSplitArray[1] 取得開盤價資訊，方法是
			 * 將其依 ":" 加以分開，得到 tempSplitArray 陣列
			 * ，tempSplitArray 陣列中的元素如下：
			 *
			 *	tempSplitArray[0] 是 "o"
			 *	tempSplitArray[1] 是 8296.58 即開盤價資訊
			 */

			tempSplitArray=dataSplitArray[1].split(":");
			var open=parseFloat(tempSplitArray[1]);

			/* 處理 dataSplitArray[2] 取得最高價資訊，方法是
			 * 將其依 ":" 加以分開，得到 tempSplitArray 陣列
			 * ，tempSplitArray 陣列中的元素如下：
			 *
			 *	tempSplitArray[0] 是 "h"
			 *	tempSplitArray[1] 是 8259.25 即最高價資訊
			 */

			tempSplitArray=dataSplitArray[2].split(":");
			var high=parseFloat(tempSplitArray[1]);

			/* 處理 dataSplitArray[3] 取得最低價資訊，方法是
			 * 將其依 ":" 加以分開，得到 tempSplitArray 陣列
			 * ，tempSplitArray 陣列中的元素如下：
			 *
			 *	tempSplitArray[0] 是 "l"
			 *	tempSplitArray[1] 是 8296.58 即最低價資訊
			 */

			tempSplitArray=dataSplitArray[3].split(":");
			var low=parseFloat(tempSplitArray[1]);

			/* 處理 dataSplitArray[4] 取得收盤價資訊，方法是
			 * 將其依 ":" 加以分開，得到 tempSplitArray 陣列
			 * ，tempSplitArray 陣列中的元素如下：
			 *
			 *	tempSplitArray[0] 是 "c"
			 *	tempSplitArray[1] 是 8315.7 即收盤價資訊
			 */

			tempSplitArray=dataSplitArray[4].split(":");
			var close=parseFloat(tempSplitArray[1]);

			/* 處理 dataSplitArray[5] 取得成交量資訊，方法是
			 * 將其依 ":" 加以分開，得到 tempSplitArray 陣列
			 * ，tempSplitArray 陣列中的元素如下：
			 *
			 *	tempSplitArray[0] 是 "v"
			 *	tempSplitArray[1] 是 74307 即成交量資訊
			 */

			tempSplitArray=dataSplitArray[5].split(":");
			var volume;

			/* 如果是大盤則成交量的單位是『億』，各股則成交量單位是『張』 */

			if (savedThisObject.companyId=="%23001") {
				volume=parseFloat(tempSplitArray[1])/100.0;
			} else {
				volume=parseFloat(tempSplitArray[1]);
			}

			return {
				"time":time,
				"open":open,
				"close":close,
				"high":high,
				"low":low,
				"volume":volume
			};
		}

		/* 函式 processHistoryData 是下載歷史資訊網頁後被呼叫的函式 */

		function processHistoryData() {
			if (this.status === 200) {
				var historyData=this.response;
	
				/* 在此要將取得的 historyData 歷史資訊字串
				 * 處理成為資料陣列的結構，方便後續程式的處理，
				 * 資料陣列暫時名稱是 tempHistoryDataArray。
				 */

				/* 歷史資訊字串的前半部是當日的即時資訊，
				 * 從 "ta":[{ 開始才是歷史資訊，並且一直到 }]
				 * 為止都是每日的資料所構成的字串，因此要先從下載
				 * 到的 historyData 字串中切割出歷史資訊字串，利
				 * 用 sliceByPattern 函式將開頭是 "[{" 且結尾是 
				 * "}]" 的字串切割出來即可。
				 */

				historyData=historyData.sliceByPattern("[{","}]",true);

				/* 宣告 historyDataArray 為空陣列，此陣列負責儲存
				 * 歷史資訊經處理後的結構。每一個陣列的元素即
				 * 是一筆(一天或者一月、一年)資料，它的結構是一個
				 * 物件的結構，如下：
				 * 	{
				 *		"time":時間,
				 *		"open":開盤價,
				 *		"close":收盤價,
				 *		"high":最高價,
				 *		"low":最低價,
				 *		"valume":成交值(單位是百萬元)
				 *	}
				 */

				var tempHistoryDataArray=[];

				/* 利用 sliceByPattern 函式將 historyData 字串中的
				 * 第一個 "{一筆歷史資料}" 切割出來，並放在 oneData
				 * 變數中。
				 */

				oneData=historyData.sliceByPattern("{","}",false);

				/* 不斷利用 sliceByPattern 函式將一筆一筆歷史資料
				 * 切割出來，並在 while 敘述中判斷切刮出的資料字串
				 * 是否為空字串，如果不是空字串，則繼續切割一筆資
				 * 的動作。
				 */

				while (oneData!="") {
	
					/* 每次找到一筆歷史資料字串，都要用 
					 * historyDataStringToObject 函式把字串轉換
					 * 成物件的結構 oneDataObject，才把該物件
					 * 放入到 historyDataArray 陣列中。
					 */

					oneDataObject=historyDataStringToObject(oneData);
					tempHistoryDataArray.push(oneDataObject);
	
					/* 將 historyData 跳過已經被切割出來的一筆資料 */

					historyData=skipPatternCount(historyData,"{",1);

					/* 再次切割出一筆歷史資料 */

					oneData=historyData.sliceByPattern("{","}",false);
				}

				var tempHistoryData=historyDataArrayToString(tempHistoryDataArray);
				appendMessage("下載的歷史資訊(共"+tempHistoryDataArray.length+"筆)：\n"+
				tempHistoryData+"\n");

				/* 處理得到 tempHistoryDataArray 後，要從此陣列中找出不在
				 * this.historyDataArray 中的資料，並將其加入到該陣列中。
				 * 由於下載資料的最後一筆通常不是正確的資料，因此不用此筆
				 * 資料更新記錄。例如在5月5日時下載每月歷史資訊，也會得到
				 * 一筆5月份的歷史資料，但這筆資料是不完整的一個月份的資料
				 * 所以不可用來更新歷史資訊。
				 */

				for (var i=0;i<(tempHistoryDataArray.length-1);i++) {

					/* 從網頁歷史資料陣列中取出一個元素 */

					var historyObject=tempHistoryDataArray[i];

					/* 由於歷史資訊的來源是網頁中得到，它原本就是按照日期
					 * 順序排列，所以在 this.historyDataArray 陣列中找尋
					 * historyObject 時，只要和 this.historyDataArray
					 * 最後一個元素比較即可，如果 historyObject 的日期
					 * 比最後一個日期比較晚，表示它不在 this.historyDataArray 
					 * 陣列中。
					 */

					var length=savedThisObject.historyDataArray.length-1;
					if (length==-1) {
	
						/* 如果 this.historyDataArray 中沒有元素，則直接
						 * 把網頁歷史資料直接加入到 this.historyDataArray
						 * 即可。
						 */
	
						savedThisObject.historyDataArray.push(historyObject);
					} else if (historyObject.time==savedThisObject.historyDataArray[length].time) {
					
						/* 在此處時，表示 historyObject 的日期和 this.historyDataArray
						 * 中最後一筆資料的日期是一樣的，網頁中的歷史資料一定是最
						 * 新的，所以用 historyObject 取代 this.historyDataArray
						 * 的最後一筆資料。
						 */

						savedThisObject.historyDataArray[length]=historyObject;	
					} else if (historyObject.time>savedThisObject.historyDataArray[length].time) {

						/* 在此處時，表示 historyObject 的日期比 this.historyDataArray
						 * 中最後一筆資料的日期還晚，直接把網頁歷史資料直接加入
						 * 到 this.historyDataArray 中即可。
						 */

						savedThisObject.historyDataArray.push(historyObject);
					}
				}

				/* savedThisObject.historyDataArray 陣列中的元素，有部份是從
				 * 檔案中讀出，這時它元素的值是字串型態。有些元素則是從網路下
				 * 載得到，此時元素的價格值是浮點數型態。所以先把所有元素的
				 * 數值(除時間值外)都改為浮點數型態，這樣在呼叫 historyDataArrayToString
				 * 函式時才不會出問題。
				 */

				for (var i=0;i<savedThisObject.historyDataArray.length;i++) {
					savedThisObject.historyDataArray[i].open=parseFloat(savedThisObject.historyDataArray[i].open);
					savedThisObject.historyDataArray[i].close=parseFloat(savedThisObject.historyDataArray[i].close);
					savedThisObject.historyDataArray[i].high=parseFloat(savedThisObject.historyDataArray[i].high);
					savedThisObject.historyDataArray[i].low=parseFloat(savedThisObject.historyDataArray[i].low);
					savedThisObject.historyDataArray[i].volume=parseFloat(savedThisObject.historyDataArray[i].volume);	
				}

				var historyString=historyDataArrayToString(savedThisObject.historyDataArray);
				appendMessage("更新過後的歷史資料如下：\n");				
				appendMessage("時間		開盤價	收盤價	最高價	最低價	成交量(億)\n");
				appendMessage(historyString);
				
				if (savedThisObject.companyId=="%23001") {
					/* 大盤 */
					appendMessage("開始存入更新後的大盤歷史資訊到 /STOCK/"+
					savedThisObject.historyFilename+" 檔案中，請稍待...\n");
					saveLocalTextFileSeries(
						["/STOCK"],
						[savedThisObject.historyFilename],
						[historyString],
						savedThisObject.callback,
						true
					);
				} else {
					/* 個股 */
					appendMessage("開始存入更新後的個股歷史資訊到 /STOCK/"+
					savedThisObject.companyId+"/"+
					savedThisObject.historyFilename+" 檔案中，請稍待...\n");
					saveLocalTextFileSeries(
						["/STOCK/"+savedThisObject.companyId],
						[savedThisObject.historyFilename],
						[historyString],
						savedThisObject.callback,
						true
					);
				}			
			} else {
				showMessage("下載"+this.companyName+
					    "歷史資料失敗! status="+
					    this.status);
			}
		}


		/* 根據物件的 historyType 產生 urlString，用以下載資料。 */

		var urlString="https://tw.quote.finance.yahoo.net/quote/q?"+
			      "type=ta&perd="+savedThisObject.historyType+"&mkt=10&sym="+
			      savedThisObject.companyId;

		/* 呼叫 getUrlSource 函式下載 urlSting 網址的資料，
		 * 下載完成後，呼叫 processHistoryData 函式負責處理
		 * 下載的資料。
		 */

		appendMessage("開始下載歷史資訊網頁，請稍候...\n"+urlString+"\n");
		getUrlSource(
			urlString,
			processHistoryData,
			errorHandler
		);
	}

	/* 函式 readHistoryFileCallback 是在讀出歷史資訊檔案後，
	 * 被呼叫的函式。傳入的參數 historyDataTextArray 是讀出字
	 * 串所形成的陣列，其中只有一個元素。
	 * 此函式必須放在 update() 方法中，如此才能取用包存下來的
	 * savedThisObject 物件本身的變數。
	 */

	function readHistoryFileCallback(historyDataTextArray) {
		appendMessage("讀取歷史資料檔案完畢，開始下載歷史網頁，請稍候...\n");
		var historyDataText=historyDataTextArray[0];
		if (historyDataText=="") {
			savedThisObject.historyDataArray=[];
		} else {
			savedThisObject.historyDataArray=historyStringToDataArray(historyDataText);
		}
		appendMessage("讀出歷史資訊：\n"+historyDataText+"\n");
		downloadHistoryData();
	}

	/* update() 方法的主要程式由此開始 */

	/* 在物件的方法中保存住物件本身，在系統回呼時才可以
	 * 取得本身物件。
	 */

	var savedThisObject=this;

	appendMessage("更新");
	
	/* 根據物件屬性 historyType 決定歷史資訊檔案的名稱，
	 * 並把檔案名稱設定給屬性 historyFilename。
	 */

	switch (this.historyType) {
		case "d":
		appendMessage("每日");
		this.historyFilename="dayHistory.txt";
		break;
		case "w":
		appendMessage("每週");
		this.historyFilename="weekHistory.txt";
		break;
		case "m":
		appendMessage("每月");
		this.historyFilename="monthHistory.txt";
		break;
	}

	/* 顯示訊息開始更新歷史資訊，更新的過程如下：
	 *
	 *	(1) 讀取公司的歷史資訊檔案到歷史資訊陣列中。
	 *	(2) 下載公司歷史資訊網頁，將新的歷史資訊
	 *	    加入到歷史資訊陣列中。
	 *	(3) 將歷史資訊陣列資料寫入到歷史資訊檔案中。
	 */

	appendMessage("歷史資料庫中，請稍候...\n");

	if (this.companyId=="%23001") {
		/* 大盤 */
		readLocalTextFileSeries(
			["/STOCK"],
			[this.historyFilename],
			readHistoryFileCallback	
		);

	} else {
		/* 個股 */
		readLocalTextFileSeries(
			["/STOCK/"+this.companyId],
			[this.historyFilename],
			readHistoryFileCallback	
		);
	}
};
