
/* 函式 historyDataArrayToString 用來將大盤歷史資訊陣列中的
 * 資料轉換成字串。轉換出的字串可以用來顯示或存檔。
 */

function historyDataArrayToString(historyDataArray) {
	var historyString="";
	for (var i=0;i<historyDataArray.length;i++) {
		var oneData=historyDataArray[i];
		historyString=historyString+
			oneData.time+
			"\t"+oneData.open.toPrecision(6)+
			"\t"+oneData.close.toPrecision(6)+
			"\t"+oneData.high.toPrecision(6)+
			"\t"+oneData.low.toPrecision(6)+
			"\t"+oneData.volume+
			"\n";
	}
	return historyString;
}

/* 函式 historyStringToDataArray 用來將大盤歷史資料字串
 * 轉換成陣列的形式。陣列中每個元素都是一筆大盤歷史資料
 * 的物件，物件格式如下：
 * 	{
 *		"time":時間,
 *		"open":開盤價,
 *		"close":收盤價,
 *		"high":最高價,
 *		"low":最低價,
 *		"volume":成交量
 *	}
 */

function historyStringToDataArray(historyDataString) {
	
	/* 大盤歷史資訊字串每一筆是用 "\n" 分開 */

	var dataStringSplitArray=historyDataString.split("\n");
	var historyDataArray=[];
	for (var i=0;i<(dataStringSplitArray.length-1);i++) {

		/* 每一筆資料字串中是用 "\t" 分開各種資料 */

		var tempSplitArray=dataStringSplitArray[i].split("\t");
		historyDataArray.push({
			"time":tempSplitArray[0],
			"open":tempSplitArray[1],
			"close":tempSplitArray[2],
			"high":tempSplitArray[3],
			"low":tempSplitArray[4],
			"volume":tempSplitArray[5]
		});
	}
	return historyDataArray;
}

/* 函式 downloadHistoryData 是負責下載大盤歷史資料的函式。
 * 此函式的第一個參數 historyType 是要下載大盤歷史資料的形式，
 *
 * 	historyType 是 "d" 表示要下載每日資料。
 * 	historyType 是 "w" 表示要下載每週資料。
 * 	historyType 是 "m" 表示要下載每月資料。
 *
 * 此函式的第二個參數是回呼函式，在本函式將下載資料處理
 * 成陣列的形式後，會回呼此參數指定的函式，並將資料陣列
 * 當成回呼函式的第一個參數傳給它。
 */

function downloadHistoryData(historyType,callback) {

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
		var volume=parseFloat(tempSplitArray[1])/100.0;

		return {
			"time":time,
			"open":open,
			"close":close,
			"high":high,
			"low":low,
			"volume":volume
		};
	}

	/* processHistoryData 函式是下載大盤歷史資訊網頁
	 * 成功後，會被呼叫的函式。
	 */

	function processHistoryData() {
		if (this.status === 200) {
			historyData=this.response;

			/* 在此要將取得的 historyData 大盤歷史資訊字串
			 * 處理成為資料陣列的結構，方便後續程式的處理，
			 * 陣列的名稱為 historyDataArray。
			 * 得到陣列後，會呼叫 callback 函式，並且將
			 * historyDataArray 當做參數傳給回呼函式，
			 * 讓回呼函式決定要如何處理陣列中的資料。
			 */

			/* 大盤歷史資訊字串的前半部是當日大盤的即時資訊，
			 * 從 "ta":[{ 開始才是大盤歷史資訊，並且一直到 }]
			 * 為止都是每日的資料所構成的字串，因此要先從下載
			 * 到的 historyData 字串中切割出歷史資訊字串，利
			 * 用 sliceByPattern 函式將開頭是 "[{" 且結尾是 
			 * "}]" 的字串切割出來即可。
			 */

			historyData=historyData.sliceByPattern("[{","}]",true);

			/* 宣告 historyDataArray 為空陣列，此陣列負責儲存
			 * 大盤歷史資訊經處理後的結構。每一個陣列的元素即
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

			var historyDataArray=[];

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
				historyDataArray.push(oneDataObject);

				/* 將 historyData 跳過已經被切割出來的一筆資料 */

				historyData=skipPatternCount(historyData,"{",1);

				/* 再次切割出一筆歷史資料 */

				oneData=historyData.sliceByPattern("{","}",false);
			}

			/* 處理得到 historyDataArray 後，將此陣列當做參
			 * 數傳給 callback 函式。
			 */

			callback(historyDataArray);
		} else {
			showMessage("下載大盤歷史資料失敗! status="+
			this.status);
		}
	}

	/* 根據傳入的 historyType 參數產生 urlString，用以下載資料。 */

	var urlString="https://tw.quote.finance.yahoo.net/quote/q?"+
		      "type=ta&perd="+historyType+"&mkt=10&sym=%23001";

	/* 呼叫 getUrlSource 函式下載 urlSting 網址的資料，
	 * 下載完成後，呼叫 processHistoryData 函式負責處理
	 * 下載的資料。
	 */

	getUrlSource(
		urlString,
		processHistoryData,
		errorHandler
	);		
}