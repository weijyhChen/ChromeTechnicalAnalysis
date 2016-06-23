/*
 * 範例11：本範例將示範大盤指數及各股歷史資訊的動能分析。動能指標
 *         主要是和成交量、漲跌家數、漲跌停家數、創新高低家數有關
 *         計算所產生的指標，例如絕對廣量指標(Absolute Breadth Index
 *         ,ABI)、騰落指標(Advance/Decline Line)、漲跌比率(Advance/
 *         Decline Ratio)、漲跌平盤成 交量(Advancing, Declining,
 *         Unchanged Valume)、廣量衝力指標(Breadth Thrust)、錢德動能
 *         擺盪指標(Chande Momentum Oscillator)、累積成交量指數(
 *         Cumulative Volume Index)、動態動能指標(Dynamic Momentum
 *         Index)、新高低比率(New Highs/New Lows Ratio)、能量分析
 *         (On Balance Volume)…。
 *         有些動能指標是以整體市場來做分析，所謂水漲船高，整體市
 *         場向上時，各股向上的機率也升高。有些動能指標運用在各股，
 *         當動能指標向下，但股價卻背離向上時，就是要當心的時刻。
 *         所有本範例中的指標皆可輔助決策，隨著時間流逝，不斷計算
 *         出新的指標結果，在本範例中將只是印出結果供做參考，實際
 *         有用的系統應當自動推論出目前的市場狀態是否值得投資，並
 *         結合下一範例的技術指標，挑選出較好的目標供使用者選擇。
 */

/* ※※ 注意：為了不影響原本綜合範例 10 的程式運作，因此不改變
 * historyObject.js檔案，所以把計算出來的大盤及各公司指標資料放在這
 * 裡，實際上和大盤及各公司相關的資料應該放在 CompanyHistory 物件中。
 * 在計算這些資訊會先確定是否有新所有公司歷史資訊一次，如果沒有更
 * 新各公司歷史資訊則會有各公司資訊數量不一致的情形。
 */

/* updatedHistoryData 變數用來指示各公司資訊是否為最新狀態，此值
 * 會受到手動或自動更新的改變，若使用者手動按下『更新所有公司歷史
 * 資訊』按鈕，則此值會被設為 true。若此值在開始計算下列各項數值
 * 時是 false，會先自動更新一次。
 */
var updatedHistoryData=false;

/* startButtonPressed 變數指出目前進行的『更新所有公司歷史資訊』
 * 動件是手動或自動發生，若是因為使用者按下『開始列出動能指標』
 * 所造成的自動更新，則會將此值設為 true。
 */
var startButtonPressed=false;

/* totalDayAdvanceArray 用來記錄每日上漲家數的陣列，一開始它的值是
 * null 表示還沒有根據各公司歷史資料來找出每日上漲家數，經過計算後
 * 此陣列的大小應該會和大盤歷史資訊陣列的大小一致，如果發生不一致
 * 的情形，就再重新計算一次每日上漲的家數，但這種情形應該發生機率
 * 不大，因為用最新的歷史資訊計算過此陣列一次後，除非程式跑超過一
 * 天，有新的歷史資訊出現，否則不會發生上述情形。
 */
var totalDayAdvanceArray=[];

/* totalWeekAdvanceArray 用來記錄每週上漲家數的陣列 */
var totalWeekAdvanceArray=[];

/* totalMonthAdvanceArray 用來記錄每月上漲家數的陣列 */
var totalMonthAdvanceArray=[];

/* totalDayAdvanceVolumeArray 用來記錄每日上漲家數成交量總合的陣列 */
var totalDayAdvanceVolumeArray=[];

/* totalWeekAdvanceVolumeArray 用來記錄每週上漲家數成交量總合的陣列 */
var totalWeekAdvanceVolumeArray=[];

/* totalMonthAdvanceVolumeArray 用來記錄每月上漲家數成交量總合的陣列 */
var totalMonthAdvanceVolumeArray=[];

/* totalDayDeclineArray 用來記錄每日下跌家數的陣列 */
var totalDayDeclineArray=[];

/* totalWeekDeclineArray 用來記錄每週下跌家數的陣列 */
var totalWeekDeclineArray=[];

/* totalMonthDeclineArray 用來記錄每月下跌家數的陣列 */
var totalMonthDeclineArray=[];

/* totalDayDeclineVolumeArray 用來記錄每日下跌家數成交量總合的陣列 */
var totalDayDeclineVolumeArray=[];

/* totalWeekDeclineVolumeArray 用來記錄每週下跌家數成交量總合的陣列 */
var totalWeekDeclineVolumeArray=[];

/* totalMonthDeclineVolumeArray 用來記錄每月下跌家數成交量總合的陣列 */
var totalMonthDeclineVolumeArray=[];

/* AbiMaArray 陣列用來儲存和大盤相關的絕對廣量指標(Absolute Breadth Index,ABI)的
 * 10 天/週/月的移動平均值。
 */
var AbiMaArray=[];

/* adlArray 陣列用來存放和大盤相關的騰落指標( */
var adlArray=[];

/* adrMaArray 陣列用來存放和大盤相關的漲跌比率(Advance/Decline Ratio)的15天/週/月的移動平均值。 */
var adrMaArray=[];

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
	var updateButton;
	var companyButton;
	var messageBox;
	var historyType;
	var companyHistoryObject;
	var companyId;
	var savedCompanyArray;
	var totalCompany;
	var companyDirectoryArray;
	var companyNameFilenameArray;
	var marketDayHistoryObject=null;
	var marketWeekHistoryObject=null;
	var marketMonthHistoryObject=null;
	var companyDayHistoryObjectArray=[];
	var companyWeekHistoryObjectArray=[];
	var companyMonthHistoryObjectArray=[];

	/* 函式 timeCompare 用在將 advanceArray 及 declineArray
	 * 排序時，該二陣列中的元素是物件，物件內容如下：
	 *	{"time":時間,"inc":增加值,"Volume":成交量}
	 * 函式中的 data1 及 data2 即上述的物件。
	 */
	function timeCompare(data1,data2) {
		var time1=data1.time;
		var year1=parseInt(time1.substr(0,4));
		var month1=parseInt(time1.substr(4,2));
		var day1=parseInt(time1.substr(6,2));
		var time2=data2.time;
		var year2=parseInt(time2.substr(0,4));
		var month2=parseInt(time2.substr(4,2));
		var day2=parseInt(time2.substr(6,2));
		if (year1>year2) {
			return 1;
		} else if (year1<year2) {
			return -1;
		} else {														// 年份相同
			if (month1>month2) {
				return 1;
			} else if (month1<month2) {
				return -1;
			} else {													// 月份相同
				if (day1>day2) {
					return 1;
				} else if (day1<day2) {
					return -1;
				} else {												// 日期相同
					return 0;
				}
			}
		}
	}

	/* 函式 calcDayAdvDecArray 用來計算每日漲跌基本資料 */
	function calcDayAdvDecArray() {
		if (totalDayAdvanceArray.length!=marketDayHistoryObject.historyDataArray.length) {
			/* 如果 totalDayAdvanceArray 陣列大小和大盤每日歷史資料
			 * 陣列的大小不一樣時表示要重新計算各種基本資料陣列。
			 * 計算各種基本資料陣列的程式可以放在函式中，每個函式計
			 * 算一個陣列的資料，這樣的程式較為模組化。但是在此直接
			 * 把所有基本資料陣列的計算全部集中到此一函式中，沒有特
			 * 別的好處，純粹作者個人自己便宜行事而已。
			 */

			/* 計算每日基本資料陣列：
			 *	totalDayAdvanceArray
			 *	totalDayAdvanceVolumeArray
			 *	totalDayDeclineArray
			 *	totalDayDeclineVolumeArray
			 * 必須要注意到每家股票交易日期未必一樣，有時某家股票會
			 * 暫停交易數日，如此每家股票的歷史資料日期就會有不同，
			 * 歷史資料陣列的大小也會有不一致的情形。
			 */

			/* 首先將各基本資料陣列中元素全部初始化為0，使其大小和
			 * marketDayHistoryObject.historyDataArray 陣列的大小一
			 * 致，分別對應大盤某天的統計資料。
			 */
			for (var dayIndex=0;dayIndex<marketDayHistoryObject.historyDataArray.length;dayIndex++) {
				totalDayAdvanceArray.push(0);
				totalDayAdvanceVolumeArray.push(0);
				totalDayDeclineArray.push(0);
				totalDayDeclineVolumeArray.push(0);
			}
			/* 把 marketDayHistoryObject.historyDataArray 陣列中的元素
			 * 物件的時間(time)單獨抽出來成為陣列。用在後面 advanceArray
			 * 中的時間(time)能較快速的找出對應到 historyDataArray 的 index
			 */
			var timeArray=[];
			for (var i=0;i<marketDayHistoryObject.historyDataArray.length;i++) {
				var time=marketDayHistoryObject.historyDataArray[i].time;
				timeArray.push(time);
			}
			/* 將每一家公司的每一天漲跌暫時先放入 advanceArray 及
			 * declineArray 中，放入這二個陣列中的是如下的物件：
			 *	{"time":時間,"inc":增加值,"Volume":成交量}
			 * 其中每家公司在某一天若是上漲，則加入一個上述的物件
			 * 到 advanceArray 中，inc 值是 1。
			 * 產生 advanceArray 和 declineArray 後，再根據物件
 		 	 * 的 time 排序，排序完後將相同時間的 inc 及 Volume
			 * 相加，即可得到基本資料陣列的內容。
			 */
			var advanceArray=[];
			var declineArray=[];
			for (var i=0;i<totalCompany;i++) {							// 所有公司的每日歷史資訊都要處理
				var oneCompanyDayHistory=companyDayHistoryObjectArray[i];
				var companyName=oneCompanyDayHistory.companyName;
				var dayHistoryData=oneCompanyDayHistory.historyDataArray;
				if (dayHistoryData.length<=1) {
					/* 如果新上市的公司只有一天的資料，不能判斷漲跌資訊 */
					continue;
				}
				var prevClose=dayHistoryData[0].close;				// 取得第一天的收盤價
				for (var k=1;k<dayHistoryData.length;k++) {	// 由第二天起判斷漲跌
					var oneData=dayHistoryData[k];							// 得到一天的資料
					var time=oneData.time;
					var close=oneData.close;
					/* 成交量要用總價格而不是用張數，但因為沒有記錄成交總價格，所以只能用最低
					 * 價做為成交張數的價格。(試過用最高價及最低價平均值會超過大盤總成交量)
					 * 後面印出漲跌價成交量後，發現總合會有超過大盤總成交量的情形，目前無法
					 * 找出問題所在。
					 */
					var volume=oneData.volume*1000*oneData.low;
					if (close>prevClose) {											// 上漲
						advanceArray.push(
							{
								"time":time,
								"inc":1,
								"volume":volume,
								"name":companyName
							}
						);
					} else if (close<prevClose) {							// 下跌
						declineArray.push(
							{
								"time":time,
								"inc":1,
								"volume":volume,
								"name":companyName
							}
						);
					}
					prevClose=close;
				}
			}
			/* 產生好了 advanceArray 及 declineArray 後，要把它們按時間加以
			 * 排序，排序完成後，把相同時間的 inc 相加即可得到該時間的上漲家數
			 * 及下跌家數。把相同時間的 volume 相加即可得到該時間上漲公司的總
			 * 成交量。
			 */
			advanceArray.sort(timeCompare);
			declineArray.sort(timeCompare);
			var advanceCountArray=[];
			var declineCountArray=[];
			var advanceTime=advanceArray[0].time;							// advanceTime 用來記錄要計算上漲家數的時間
			var advanceCount=advanceArray[0].inc;							// advanceCount 用來計數時間是 advanceTime 時上漲的家數
			var advanceVolume=advanceArray[0].volume;					// advanceVolume 用來計數時間是 advanceTime 時上漲家數的總成交量
			for (var i=1;i<advanceArray.length;i++) {
				if (advanceArray[i].time===advanceTime) {				// 如果時間相同
					advanceCount=advanceCount+advanceArray[i].inc;// 增加上漲家數的計數值
					advanceVolume=advanceVolume+advanceArray[i].volume;
				} else {																				// 如果時間不相同
					advanceCountArray.push(												// 將目前的上漲家數計數值及總成交量值堆入 advanceCountArray 中
						{
							"time":advanceTime,
							"count":advanceCount,
							"volume":advanceVolume
						}
					);
					advanceTime=advanceArray[i].time;							// 重置計數時間
					advanceCount=advanceArray[i].inc;							// 重置計數上漲家數
					advanceVolume=advanceArray[i].volume;					// 重置上漲家數總成交量
				}
			}
			/* 最後一天的累計要推入 */
			advanceCountArray.push(												// 將目前的上漲家數計數值及總成交量值堆入 advanceCountArray 中
				{
					"time":advanceTime,
					"count":advanceCount,
					"volume":advanceVolume
				}
			);
			/* advanceCountArray 陣列的內容目前是各個『時間』時，上漲家數的總合及
			 * 上漲家數總成交量的總合。只要把時間 time 找出它在 timeArray 的 index
			 * 即可將上述資訊放入到 totalDayAdvanceArray 及 totalDayAdvanceVolumeArray
			 * 相對應的 index 位置中。
			 * 找出 time 在 timeArray 中的 index 只要用 indexOf 方法即可，一行
			 * 程式就解決了，這是前面特別準備 timeArray 的原因。如果不這樣做，就要
			 * 在 marketWeekHistoryObject.historyDataArray 陣列中一一比較各物
			 * 件的 time 屬性，程式較煩鎖。
			 */
			for (var i=0;i<advanceCountArray.length;i++) {
				var time=advanceCountArray[i].time;
				var index=timeArray.indexOf(time);
				if (index>=0) {
					totalDayAdvanceArray[index]=advanceCountArray[i].count;
					totalDayAdvanceVolumeArray[index]=advanceCountArray[i].volume/100000000;
				}
			}
			var declineTime=declineArray[0].time;							// declineTime 用來記錄要計算下跌家數的時間
			var declineCount=declineArray[0].inc;							// declineCount 用來計數時間是 declineTime 時下跌的家數
			var declineVolume=declineArray[0].volume;					// declineVolume 用來計數時間是 declineTime 時下跌家數的總成交量
			for (var i=1;i<declineArray.length;i++) {
			  if (declineArray[i].time===declineTime) {				// 如果時間相同
			    declineCount=declineCount+declineArray[i].inc;// 增加下跌家數的計數值
			    declineVolume=declineVolume+declineArray[i].volume;
			  } else {																				// 如果時間不相同
			    declineCountArray.push(												// 將目前的下跌家數計數值及總成交量值堆入 declineCountArray 中
			      {
			        "time":declineTime,
			        "count":declineCount,
			        "volume":declineVolume
			      }
			    );
			    declineTime=declineArray[i].time;							// 重置計數時間
			    declineCount=declineArray[i].inc;							// 重置計數下跌家數
			    declineVolume=declineArray[i].volume;					// 重置下跌家數總成交量
			  }
			}
			/* 最後一天的累計要推入 */
			declineCountArray.push(												// 將目前的下跌家數計數值及總成交量值堆入 declineCountArray 中
				{
					"time":declineTime,
					"count":declineCount,
					"volume":declineVolume
				}
			);
			/* declineCountArray 陣列的內容目前是各個『時間』時，下跌家數的總合及
			 * 下跌家數總成交量的總合。只要把時間 time 找出它在 timeArray 的 index
			 * 即可將上述資訊放入到 totalDaydDeclineArray 及 totalDayDeclineVolumeArray
			 * 相對應的 index 位置中。
			 * 找出 time 在 timeArray 中的 index 只要用 indexOf 方法即可，一行
			 * 程式就解決了，這是前面特別準備 timeArray 的原因。如果不這樣做，就要
			 * 在 marketWeekHistoryObject.historyDataArray 陣列中一一比較各物
			 * 件的 time 屬性，程式較煩鎖。
			 */
			for (var i=0;i<declineCountArray.length;i++) {
			  var time=declineCountArray[i].time;
			  var index=timeArray.indexOf(time);
			  if (index>=0) {
			    totalDayDeclineArray[index]=declineCountArray[i].count;
			    totalDayDeclineVolumeArray[index]=declineCountArray[i].volume/100000000;
			  }
			}
		}
		/* 印出漲跌基本資料 */
		appendMessage("每日上漲下跌基本資料："+"\n");
		appendMessage("時間\t\t漲家數\t跌家數\t漲家成交量(億)\t跌家成交量(億)\t總成交量(億)\n")
		for (var i=0;i<totalDayAdvanceArray.length;i++) {
			appendMessage(
				marketDayHistoryObject.historyDataArray[i].time+"\t"+
				totalDayAdvanceArray[i]+"\t"+
				totalDayDeclineArray[i]+"\t"+
				totalDayAdvanceVolumeArray[i].toFixed(2)+"\t\t"+
				totalDayDeclineVolumeArray[i].toFixed(2)+"\t\t"+
				marketDayHistoryObject.historyDataArray[i].volume+"\n"
			);
		}
	}

	/* 函式 calcWeekAdvDecArray 用來計算每週漲跌基本資料 */
	function calcWeekAdvDecArray() {
		if (totalWeekAdvanceArray.length!=marketWeekHistoryObject.historyDataArray.length) {
			/* 如果 totalWeekAdvanceArray 陣列大小和大盤每週歷史資料
			 * 陣列的大小不一樣時表示要重新計算各種基本資料陣列。
			 * 計算各種基本資料陣列的程式可以放在函式中，每個函式計
			 * 算一個陣列的資料，這樣的程式較為模組化。但是在此直接
			 * 把所有基本資料陣列的計算全部集中到此一函式中，沒有特
			 * 別的好處，純粹作者個人自己便宜行事而已。
			 */

			/* 計算每週基本資料陣列：
			 *	totalWeekAdvanceArray
			 *	totalWeekAdvanceVolumeArray
			 *	totalWeekDeclineArray
			 *	totalWeekDeclineVolumeArray
			 * 必須要注意到每家股票交易日期未必一樣，有時某家股票會
			 * 暫停交易數日，如此每家股票的歷史資料日期就會有不同，
			 * 歷史資料陣列的大小也會有不一致的情形。
			 */

			/* 首先將各基本資料陣列中元素全部初始化為0，使其大小和
			 * marketWeekHistoryObject.historyDataArray 陣列的大小一
			 * 致，分別對應大盤某天的統計資料。
			 */
			for (var weekIndex=0;weekIndex<marketWeekHistoryObject.historyDataArray.length;weekIndex++) {
				totalWeekAdvanceArray.push(0);
				totalWeekAdvanceVolumeArray.push(0);
				totalWeekDeclineArray.push(0);
				totalWeekDeclineVolumeArray.push(0);
			}
			/* 把 marketWeekHistoryObject.historyDataArray 陣列中的元素
			 * 物件的時間(time)單獨抽出來成為陣列。用在後面 advanceArray
			 * 中的時間(time)能較快速的找出對應到 historyDataArray 的 index
			 */
			var timeArray=[];
			for (var i=0;i<marketWeekHistoryObject.historyDataArray.length;i++) {
				var time=marketWeekHistoryObject.historyDataArray[i].time;
				timeArray.push(time);
			}
			/* 將每一家公司的每一週漲跌暫時先放入 advanceArray 及
			 * declineArray 中，放入這二個陣列中的是如下的物件：
			 *	{"time":時間,"inc":增加值,"Volume":成交量}
			 * 其中每家公司在某一週若是上漲，則加入一個上述的物件
			 * 到 advanceArray 中，inc 值是 1。
			 * 產生 advanceArray 和 declineArray 後，再根據物件
		 	 * 的 time 排序，排序完後將相同時間的 inc 及 Volume
			 * 相加，即可得到基本資料陣列的內容。
			 */
			var advanceArray=[];
			var declineArray=[];
			for (var i=0;i<totalCompany;i++) {							// 所有公司的每週歷史資訊都要處理
				var oneCompanyWeekHistory=companyWeekHistoryObjectArray[i];
				var companyName=oneCompanyWeekHistory.companyName;
				var weekHistoryData=oneCompanyWeekHistory.historyDataArray;
				if (weekHistoryData.length<=1) {
					/* 如果新上市的公司只有一週的資料，不能判斷漲跌資訊 */
					continue;
				}
				var prevClose=weekHistoryData[0].close;				// 取得第一週的收盤價
				for (var k=1;k<weekHistoryData.length;k++) {	// 由第二週起判斷漲跌
					var oneData=weekHistoryData[k];							// 得到一週的資料
					var time=oneData.time;
					var close=oneData.close;
					/* 成交量要用總價格而不是用張數，但因為沒有記錄成交總價格，所以只能用最低
					 * 價做為成交張數的價格。(試過用最高價及最低價平均值會超過大盤總成交量)
					 * 後面印出漲跌價成交量後，發現總合會有超過大盤總成交量的情形，目前無法
					 * 找出問題所在。
					 */
					var volume=oneData.volume*1000*oneData.low;
					if (close>prevClose) {											// 上漲
						advanceArray.push(
							{
								"time":time,
								"inc":1,
								"volume":volume,
								"name":companyName
							}
						);
					} else if (close<prevClose) {							// 下跌
						declineArray.push(
							{
								"time":time,
								"inc":1,
								"volume":volume,
								"name":companyName
							}
						);
					}
					prevClose=close;
				}
			}
			/* 產生好了 advanceArray 及 declineArray 後，要把它們按時間加以
			 * 排序，排序完成後，把相同時間的 inc 相加即可得到該時間的上漲家數
			 * 及下跌家數。把相同時間的 volume 相加即可得到該時間上漲公司的總
			 * 成交量。
			 */
			advanceArray.sort(timeCompare);
			declineArray.sort(timeCompare);
			var advanceCountArray=[];
			var declineCountArray=[];
			var advanceTime=advanceArray[0].time;							// advanceTime 用來記錄要計算上漲家數的時間
			var advanceCount=advanceArray[0].inc;							// advanceCount 用來計數時間是 advanceTime 時上漲的家數
			var advanceVolume=advanceArray[0].volume;					// advanceVolume 用來計數時間是 advanceTime 時上漲家數的總成交量
			for (var i=1;i<advanceArray.length;i++) {
				if (advanceArray[i].time===advanceTime) {				// 如果時間相同
					advanceCount=advanceCount+advanceArray[i].inc;// 增加上漲家數的計數值
					advanceVolume=advanceVolume+advanceArray[i].volume;
				} else {																				// 如果時間不相同
					advanceCountArray.push(												// 將目前的上漲家數計數值及總成交量值堆入 advanceCountArray 中
						{
							"time":advanceTime,
							"count":advanceCount,
							"volume":advanceVolume
						}
					);
					advanceTime=advanceArray[i].time;							// 重置計數時間
					advanceCount=advanceArray[i].inc;							// 重置計數上漲家數
					advanceVolume=advanceArray[i].volume;					// 重置上漲家數總成交量
				}
			}
			/* 最後一週的累計要推入 */
			advanceCountArray.push(												// 將目前的上漲家數計數值及總成交量值堆入 advanceCountArray 中
				{
					"time":advanceTime,
					"count":advanceCount,
					"volume":advanceVolume
				}
			);
			/* advanceCountArray 陣列的內容目前是各個『時間』時，上漲家數的總合及
			 * 上漲家數總成交量的總合。只要把時間 time 找出它在 timeArray 的 index
			 * 即可將上述資訊放入到 totalWeekAdvanceArray 及 totalWeekAdvanceVolumeArray
			 * 相對應的 index 位置中。
			 * 找出 time 在 timeArray 中的 index 只要用 indexOf 方法即可，一行
			 * 程式就解決了，這是前面特別準備 timeArray 的原因。如果不這樣做，就要
			 * 在 marketWeekHistoryObject.historyDataArray 陣列中一一比較各物
			 * 件的 time 屬性，程式較煩鎖。
			 */
			for (var i=0;i<advanceCountArray.length;i++) {
				var time=advanceCountArray[i].time;
				var index=timeArray.indexOf(time);
				if (index>=0) {
					totalWeekAdvanceArray[index]=advanceCountArray[i].count;
					totalWeekAdvanceVolumeArray[index]=advanceCountArray[i].volume/100000000;
				}
			}
			/* 接著處理下跌的資訊 */
			var declineTime=declineArray[0].time;							// declineTime 用來記錄要計算下跌家數的時間
			var declineCount=declineArray[0].inc;							// declineCount 用來計數時間是 declineTime 時下跌的家數
			var declineVolume=declineArray[0].volume;					// declineVolume 用來計數時間是 declineTime 時下跌家數的總成交量
			for (var i=1;i<declineArray.length;i++) {
			  if (declineArray[i].time===declineTime) {				// 如果時間相同
			    declineCount=declineCount+declineArray[i].inc;// 增加下跌家數的計數值
			    declineVolume=declineVolume+declineArray[i].volume;
			  } else {																				// 如果時間不相同
			    declineCountArray.push(												// 將目前的下跌家數計數值及總成交量值堆入 declineCountArray 中
			      {
			        "time":declineTime,
			        "count":declineCount,
			        "volume":declineVolume
			      }
			    );
			    declineTime=declineArray[i].time;							// 重置計數時間
			    declineCount=declineArray[i].inc;							// 重置計數下跌家數
			    declineVolume=declineArray[i].volume;					// 重置下跌家數總成交量
			  }
			}
			/* 最後一週的累計要推入 */
			declineCountArray.push(												// 將目前的下跌家數計數值及總成交量值堆入 declineCountArray 中
				{
					"time":declineTime,
					"count":declineCount,
					"volume":declineVolume
				}
			);
			/* declineCountArray 陣列的內容目前是各個『時間』時，下跌家數的總合及
			 * 下跌家數總成交量的總合。只要把時間 time 找出它在 timeArray 的 index
			 * 即可將上述資訊放入到 totalWeekDeclineArray 及 totalWeekDeclineVolumeArray
			 * 相對應的 index 位置中。
			 * 找出 time 在 timeArray 中的 index 只要用 indexOf 方法即可，一行
			 * 程式就解決了，這是前面特別準備 timeArray 的原因。如果不這樣做，就要
			 * 在 marketWeekHistoryObject.historyDataArray 陣列中一一比較各物
			 * 件的 time 屬性，程式較煩鎖。
			 */
			for (var i=0;i<declineCountArray.length;i++) {
			  var time=declineCountArray[i].time;
			  var index=timeArray.indexOf(time);
			  if (index>=0) {
			    totalWeekDeclineArray[index]=declineCountArray[i].count;
			    totalWeekDeclineVolumeArray[index]=declineCountArray[i].volume/100000000;
			  }
			}
		}
		/* 印出漲跌基本資料 */
		appendMessage("每週上漲下跌基本資料："+"\n");
		appendMessage("時間\t\t漲家數\t跌家數\t漲家成交量(億)\t跌家成交量(億)\t總成交量(億)\n")
		for (var i=0;i<totalWeekAdvanceArray.length;i++) {
			appendMessage(
				marketWeekHistoryObject.historyDataArray[i].time+"\t"+
				totalWeekAdvanceArray[i]+"\t"+
				totalWeekDeclineArray[i]+"\t"+
				totalWeekAdvanceVolumeArray[i].toFixed(2)+"\t\t"+
				totalWeekDeclineVolumeArray[i].toFixed(2)+"\t\t"+
				marketWeekHistoryObject.historyDataArray[i].volume+"\n"
			);
		}
	}

	/* 函式 calcMonthAdvDecArray 用來計算每月漲跌基本資料 */
	function calcMonthAdvDecArray() {
	  if (totalMonthAdvanceArray.length!=marketMonthHistoryObject.historyDataArray.length) {
	    /* 如果 totalMonthAdvanceArray 陣列大小和大盤每月歷史資料
	     * 陣列的大小不一樣時表示要重新計算各種基本資料陣列。
	     * 計算各種基本資料陣列的程式可以放在函式中，每個函式計
	     * 算一個陣列的資料，這樣的程式較為模組化。但是在此直接
	     * 把所有基本資料陣列的計算全部集中到此一函式中，沒有特
	     * 別的好處，純粹作者個人自己便宜行事而已。
	     */

	    /* 計算每月基本資料陣列：
	     *	totalMonthAdvanceArray
	     *	totalMonthAdvanceVolumeArray
	     *	totalMonthDeclineArray
	     *	totalMonthDeclineVolumeArray
	     * 必須要注意到每家股票交易日期未必一樣，有時某家股票會
	     * 暫停交易數日，如此每家股票的歷史資料日期就會有不同，
	     * 歷史資料陣列的大小也會有不一致的情形。
	     */

	    /* 首先將各基本資料陣列中元素全部初始化為0，使其大小和
	     * marketMonthHistoryObject.historyDataArray 陣列的大小一
	     * 致，分別對應大盤某天的統計資料。
	     */
	    for (var monthIndex=0;monthIndex<marketMonthHistoryObject.historyDataArray.length;monthIndex++) {
	      totalMonthAdvanceArray.push(0);
	      totalMonthAdvanceVolumeArray.push(0);
	      totalMonthDeclineArray.push(0);
	      totalMonthDeclineVolumeArray.push(0);
	    }
	    /* 把 marketMonthHistoryObject.historyDataArray 陣列中的元素
	     * 物件的時間(time)單獨抽出來成為陣列。用在後面 advanceArray
	     * 中的時間(time)能較快速的找出對應到 historyDataArray 的 index
	     */
	    var timeArray=[];
	    for (var i=0;i<marketMonthHistoryObject.historyDataArray.length;i++) {
	      var time=marketMonthHistoryObject.historyDataArray[i].time;
	      timeArray.push(time);
	    }
	    /* 將每一家公司的每一月漲跌暫時先放入 advanceArray 及
	     * declineArray 中，放入這二個陣列中的是如下的物件：
	     *	{"time":時間,"inc":增加值,"Volume":成交量}
	     * 其中每家公司在某一月若是上漲，則加入一個上述的物件
	     * 到 advanceArray 中，inc 值是 1。
	     * 產生 advanceArray 和 declineArray 後，再根據物件
	     * 的 time 排序，排序完後將相同時間的 inc 及 Volume
	     * 相加，即可得到基本資料陣列的內容。
	     */
	    var advanceArray=[];
	    var declineArray=[];
	    for (var i=0;i<totalCompany;i++) {							// 所有公司的每月歷史資訊都要處理
	      var oneCompanyMonthHistory=companyMonthHistoryObjectArray[i];
	      var companyName=oneCompanyMonthHistory.companyName;
	      var monthHistoryData=oneCompanyMonthHistory.historyDataArray;
	      if (monthHistoryData.length<=1) {
	        /* 如果新上市的公司只有一月的資料，不能判斷漲跌資訊 */
	        continue;
	      }
	      var prevClose=monthHistoryData[0].close;				// 取得第一月的收盤價
	      for (var k=1;k<monthHistoryData.length;k++) {	// 由第二月起判斷漲跌
	        var oneData=monthHistoryData[k];							// 得到一月的資料
	        var time=oneData.time;
	        var close=oneData.close;
	        /* 成交量要用總價格而不是用張數，但因為沒有記錄成交總價格，所以只能用最低
	         * 價做為成交張數的價格。(試過用最高價及最低價平均值會超過大盤總成交量)
	         * 後面印出漲跌價成交量後，發現總合會有超過大盤總成交量的情形，目前無法
	         * 找出問題所在。
	         */
	        var volume=oneData.volume*1000*oneData.low;
	        if (close>prevClose) {											// 上漲
	          advanceArray.push(
	            {
	              "time":time,
	              "inc":1,
	              "volume":volume,
	              "name":companyName
	            }
	          );
	        } else if (close<prevClose) {							// 下跌
	          declineArray.push(
	            {
	              "time":time,
	              "inc":1,
	              "volume":volume,
	              "name":companyName
	            }
	          );
	        }
	        prevClose=close;
	      }
	    }
	    /* 產生好了 advanceArray 及 declineArray 後，要把它們按時間加以
	     * 排序，排序完成後，把相同時間的 inc 相加即可得到該時間的上漲家數
	     * 及下跌家數。把相同時間的 volume 相加即可得到該時間上漲公司的總
	     * 成交量。
	     */
	    advanceArray.sort(timeCompare);
	    declineArray.sort(timeCompare);
	    var advanceCountArray=[];
	    var declineCountArray=[];
	    var advanceTime=advanceArray[0].time;							// advanceTime 用來記錄要計算上漲家數的時間
	    var advanceCount=advanceArray[0].inc;							// advanceCount 用來計數時間是 advanceTime 時上漲的家數
	    var advanceVolume=advanceArray[0].volume;					// advanceVolume 用來計數時間是 advanceTime 時上漲家數的總成交量
	    for (var i=1;i<advanceArray.length;i++) {
	      if (advanceArray[i].time===advanceTime) {				// 如果時間相同
	        advanceCount=advanceCount+advanceArray[i].inc;// 增加上漲家數的計數值
	        advanceVolume=advanceVolume+advanceArray[i].volume;
	      } else {																				// 如果時間不相同
	        advanceCountArray.push(												// 將目前的上漲家數計數值及總成交量值堆入 advanceCountArray 中
	          {
	            "time":advanceTime,
	            "count":advanceCount,
	            "volume":advanceVolume
	          }
	        );
	        advanceTime=advanceArray[i].time;							// 重置計數時間
	        advanceCount=advanceArray[i].inc;							// 重置計數上漲家數
	        advanceVolume=advanceArray[i].volume;					// 重置上漲家數總成交量
	      }
	    }
	    /* 最後一月的累計要推入 */
	    advanceCountArray.push(												// 將目前的上漲家數計數值及總成交量值堆入 advanceCountArray 中
	      {
	        "time":advanceTime,
	        "count":advanceCount,
	        "volume":advanceVolume
	      }
	    );
	    /* advanceCountArray 陣列的內容目前是各個『時間』時，上漲家數的總合及
	     * 上漲家數總成交量的總合。只要把時間 time 找出它在 timeArray 的 index
	     * 即可將上述資訊放入到 totalMonthAdvanceArray 及 totalMonthAdvanceVolumeArray
	     * 相對應的 index 位置中。
	     * 找出 time 在 timeArray 中的 index 只要用 indexOf 方法即可，一行
	     * 程式就解決了，這是前面特別準備 timeArray 的原因。如果不這樣做，就要
	     * 在 marketMonthHistoryObject.historyDataArray 陣列中一一比較各物
	     * 件的 time 屬性，程式較煩鎖。
	     */
	    for (var i=0;i<advanceCountArray.length;i++) {
	      var time=advanceCountArray[i].time;
	      var index=timeArray.indexOf(time);

	      if (index>=0) {
	        totalMonthAdvanceArray[index]=advanceCountArray[i].count;
	        totalMonthAdvanceVolumeArray[index]=advanceCountArray[i].volume/100000000;
	      }
	    }
	    /* 接著處理下跌的資訊 */
	    var declineTime=declineArray[0].time;							// declineTime 用來記錄要計算下跌家數的時間
	    var declineCount=declineArray[0].inc;							// declineCount 用來計數時間是 declineTime 時下跌的家數
	    var declineVolume=declineArray[0].volume;					// declineVolume 用來計數時間是 declineTime 時下跌家數的總成交量
	    for (var i=1;i<declineArray.length;i++) {
	      if (declineArray[i].time===declineTime) {				// 如果時間相同
	        declineCount=declineCount+declineArray[i].inc;// 增加下跌家數的計數值
	        declineVolume=declineVolume+declineArray[i].volume;
	      } else {																				// 如果時間不相同
	        declineCountArray.push(												// 將目前的下跌家數計數值及總成交量值堆入 declineCountArray 中
	          {
	            "time":declineTime,
	            "count":declineCount,
	            "volume":declineVolume
	          }
	        );
	        declineTime=declineArray[i].time;							// 重置計數時間
	        declineCount=declineArray[i].inc;							// 重置計數下跌家數
	        declineVolume=declineArray[i].volume;					// 重置下跌家數總成交量
	      }
	    }
	    /* 最後一月的累計要推入 */
	    declineCountArray.push(												// 將目前的下跌家數計數值及總成交量值堆入 declineCountArray 中
	      {
	        "time":declineTime,
	        "count":declineCount,
	        "volume":declineVolume
	      }
	    );
	    /* declineCountArray 陣列的內容目前是各個『時間』時，下跌家數的總合及
	     * 下跌家數總成交量的總合。只要把時間 time 找出它在 timeArray 的 index
	     * 即可將上述資訊放入到 totalMonthDeclineArray 及 totalMonthDeclineVolumeArray
	     * 相對應的 index 位置中。
	     * 找出 time 在 timeArray 中的 index 只要用 indexOf 方法即可，一行
	     * 程式就解決了，這是前面特別準備 timeArray 的原因。如果不這樣做，就要
	     * 在 marketMonthHistoryObject.historyDataArray 陣列中一一比較各物
	     * 件的 time 屬性，程式較煩鎖。
	     */
	    for (var i=0;i<declineCountArray.length;i++) {
	      var time=declineCountArray[i].time;
	      var index=timeArray.indexOf(time);
	      if (index>=0) {
	        totalMonthDeclineArray[index]=declineCountArray[i].count;
	        totalMonthDeclineVolumeArray[index]=declineCountArray[i].volume/100000000;
	      }
	    }
	  }
		/* 印出漲跌基本資料 */
		appendMessage("每月上漲下跌基本資料："+"\n");
		appendMessage("時間\t\t漲家數\t跌家數\t漲家成交量(億)\t跌家成交量(億)\t總成交量(億)\n")
		for (var i=0;i<totalMonthAdvanceArray.length;i++) {
			appendMessage(
				marketMonthHistoryObject.historyDataArray[i].time+"\t"+
				totalMonthAdvanceArray[i]+"\t"+
				totalMonthDeclineArray[i]+"\t"+
				totalMonthAdvanceVolumeArray[i].toFixed(2)+"\t\t"+
				totalMonthDeclineVolumeArray[i].toFixed(2)+"\t\t"+
				marketMonthHistoryObject.historyDataArray[i].volume+"\n"
			);
		}
	}

	/* 函式 calcAdvDecArray 用來計算每日/每週/每月
	 * 上漲/下跌家數等基本資料的陣列。
	 */
	function calcAdvDecArray() {
		calcDayAdvDecArray();
		calcWeekAdvDecArray();
		calcMonthAdvDecArray();
	}

	var totalAdvanceArray=[];
	var totalDeclineArray=[];
	/* 函式 determineCalcArray 用來決定計算各項動能指標時要用到的 totalAdvanceArray
	 * 及 totalDeclineArray 陣列是指向哪個真正的陣列。
	 */
	function determineCalcArray() {
		/* 根據 historyType 決定要用哪個歷史資料陣列做計算 */
		if (historyType=="d") {
			totalAdvanceArray=totalDayAdvanceArray;
			totalDeclineArray=totalDayDeclineArray;
		} else if (historyType=="w") {
			totalAdvanceArray=totalWeekAdvanceArray;
			totalDeclineArray=totalWeekDeclineArray;
		} else if (historyType=="m") {
			totalAdvanceArray=totalMonthAdvanceArray;
			totalDeclineArray=totalMonthDeclineArray;
		}
	}

	/* 函式 clacABIArray 用來計算和大盤有關的絕對廣量指標(Absolute Breadth Index,ABI) */
	function calcABIArray() {
		AbiMaArray=[];
		var ABIArray=[];
		if ((totalAdvanceArray.length==0)||(totalDeclineArray.length==0)) {
			/* 如果歷史資料陣列為 0 則不能算大盤動能資料 */
			return;
		}
		/* 開始計算動能資料陣列 */
		for (var i=0;i<totalAdvanceArray.length;i++) {
			ABIArray.push(
				Math.abs(totalAdvanceArray[i]-totalDeclineArray[i])/
				totalCompany
			);
		}
		/* 計算 10 天/週/月 平均線 */
		for (i=0;i<ABIArray.length;i++) {
			if (i<10) {
				AbiMaArray.push(0);
			} else {
				var ma=0;
				for (var k=0;k<10;k++) {
					ma=ma+ABIArray[i-k];
				}
				ma=ma/10;
				AbiMaArray.push(ma);
			}
		}
	}

	/* 函式 calcAdlArray 用來計算和大盤有關的騰落指標(Advance/Decline Line) */
	function calcAdlArray() {
		adlArray=[];
		if ((totalAdvanceArray.length==0)||(totalDeclineArray.length==0)) {
			/* 如果歷史資料陣列為 0 則不能算大盤動能資料 */
			return;
		}
		var sumAdl=0;
		for (var i=0;i<totalAdvanceArray.length;i++) {
			sumAdl=sumAdl+(totalAdvanceArray[i]-totalDeclineArray[i]);
			adlArray.push(sumAdl);
		}
	}

	/* 函式 calcAdrArray 用來計算和大盤相關的漲跌比率(Advance/Decline Ratio)，
	 * 並計算出5日的移動平均值。
	 */
	function calcAdrArray() {
		var adrArray=[];
		if ((totalAdvanceArray.length==0)||(totalDeclineArray.length==0)) {
			/* 如果歷史資料陣列為 0 則不能算大盤動能資料 */
			return;
		}
		for (var i=0;i<totalAdvanceArray.length;i++) {
			adrArray.push(totalAdvanceArray[i]/totalDeclineArray[i]);
		}
		/* 計算 15 天/週/月 平均線 */
		for (i=0;i<adrArray.length;i++) {
			if (i<15) {
				adrMaArray.push(0);
			} else {
				var ma=0;
				for (var k=0;k<15;k++) {
					ma=ma+adrArray[i-k];
				}
				ma=ma/15;
				adrMaArray.push(ma);
			}
		}
	}

	/* 函式calcMomentumIndicator 用來集合呼叫各種計算動能指標函式 */
	function calcMomentumIndicator() {
		determineCalcArray();
		calcABIArray();
		calcAdlArray();
		calcAdrArray();
	}

	/* 函式 showMomentumIndicator 呼叫計算漲跌資訊的函式及計算各種動能指標的函式 */
	function showMomentumIndicator() {
		showMessage("");
		appendMessage("開始計算大盤的每日/每週/每月上漲下跌家數等資訊，請稍等...\n");
		calcAdvDecArray();
		appendMessage("計算大盤的每日/每週/每月上漲下跌家數等資訊完畢。\n");
		appendMessage("開始計算各種動能指標，請稍等...\n");
		calcMomentumIndicator();
		appendMessage("計算各種動能指標完畢，印出各種動能指標。");
		/* 印出 adrMaArray */
		for (var i=0;i<adrMaArray.length;i++) {
			appendMessage(i+"\t"+adrMaArray[i].toFixed(2)+"%\n");
		}
	}

	/* 函式 createCompanyHistoryObjectCallback 是由使用者選擇公司
	 * ID 或大盤之後，產生出該公司歷史資訊的 companyHistoryObject
	 * 物件被呼叫的函式。此時就可以用此歷史資訊物件來進行列出動能
	 * 指標的工作。
	 */
	function createCompanyHistoryObjectCallback() {
		if (updatedHistoryData===false) {
			/* 歷史資料未更新，開始全面更新歷史資料。由於
			 * 呼叫 updateButton.onclick() 函式後，不會再
			 * 回到此函式中，因此設定 startButtonPressed
			 * 變數為 true ，表示是由於使用者按下『開始
			 * 列出動能指標』所造成的更新。
			 */
			startButtonPressed=true;
			updateButton.onclick();
		} else {
			showMomentumIndicator();
		}
	}

  function windowOnResize() {
  	messageBox.style.overflow="scroll";
  	messageBox.style.width=window.innerWidth-15;
    messageBox.style.height=window.innerHeight-messageBox.offsetTop-15;
  }

  	function showInterface() {
			/* 在 HTML 的 body 標記中插入使用者操作介面的元件標記。 */
			/* 本範例的人機介面和前一個範例幾乎一樣，唯一的不同只有把
		 	 * 顯示 K 線圖的 canvas 去除。因為用到的資料和前一個範例
		 	 * 完全一樣，只是前一個範例是畫 K 線圖，此範例是列出動能
		 	 * 指標而已。
		 	 */
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
			"<input type=button id='startButton' value='開始列出動能指標'>&nbsp&nbsp"+
			"<input type=button id='clearButton' value='清除訊息'></p>"+
      		"<p><pre id='msg'>請輸入公司代號或勾選『大盤』，"+
			"然後按下『開始列出動能指標』按鈕\n</pre></p>";
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
			companyButton=document.getElementById("companyButton");
			updateButton=document.getElementById("updateButton");
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
				marketMonthHistoryObject=companyHistoryObject;
				/* 更新所有歷史資料完畢後，可以按下『開始繪圖』等按鈕 */
				startButton.removeAttribute("disabled");
				updateButton.removeAttribute("disabled");
				companyButton.removeAttribute("disabled");
				showMessage("所有公司及大盤歷史資訊更新完畢。\n");
				/* 更新所有歷史資訊後把 updatedHistoryData 設為 true
				 * 表示目前所有公司的歷史資訊都是最新的了。
				 */
				updatedHistoryData=true;
				if (startButtonPressed===true) {
					/* 更新完所有歷訊後，如果是因為按下『開始
					 * 列出動能指標』按鈕所造成的更新動作，在
					 * 更新完畢後，要呼叫列出動能指標的函式。
					 */
					startButtonPressed=false;
					showMomentumIndicator();
				}
			}

			function newMarketWeekHistoryCallback() {
				marketWeekHistoryObject=companyHistoryObject;
				/* 更新大盤每月歷史資訊 */
				companyHistoryObject=new CompanyHistory(
						"%23001",
						"大盤",
						"m",
						newMarketMonthHistoryCallback
				);
			}

			function newMarketDayHistoryCallback() {
				marketDayHistoryObject=companyHistoryObject;
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
				if (index>=0) {
					companyMonthHistoryObjectArray.push(companyHistoryObject);
				}
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
				if (index>=0) {
					companyWeekHistoryObjectArray.push(companyHistoryObject);
				}
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
				/* 每次進到此處都表示有一家公司的每日歷料已更新，
				 * companyHistoryObject 物件則是該公司的歷史資料
				 * 物件，所以要把它放到 companyDayHistoryObjectArray
				 * 陣列中。只有在第一次進入時 companyHistoryObject
				 * 不是歷史資訊物件。
				 */
				if (index>=0) {
					companyDayHistoryObjectArray.push(companyHistoryObject);
				}
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
			} else if (idText.value!=="") {
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
		showMessage("請輸入公司代號或勾選『大盤』，"+
			"然後按下『開始列出動能指標』按鈕\n");
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
