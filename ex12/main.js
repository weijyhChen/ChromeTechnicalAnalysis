/*
 * 範例12：本範例將示範大盤指數及各股歷史資訊的各種技術分析指標的
 * 計算。由於技術分析的指標種 類繁多，本範例將只做常用的幾種技術
 * 指標的示範，其它的指標留給讀者自行研究。常見的 技術分析指標有
 * 平滑異同移動平均線(Moving Average Convergence Divergence,MACD)
 * 、KD隨 機震盪指標(KD Stochastic Oscillator)、相對強弱指標
 * (Relative Strength Index,RSI)。
 */

 /*
	 其它重要技術標列表：

	 BIA：乖離率，以當日指數(股價)-最近 N日平均指
　　　數(股價)，再除以最近 N日平均數(股價)。
　　　a.10日 BIA達-4.5%以下為買進時機，5%以上
　　　　為賣出時機。
　　　b.20日 BIA達-7%以下為買進時機，8%以上為
　　　　賣出時機。
　　　c.60日乖離率達-11%以下為買進時機，14%以
　　　　上為賣出時機。

	 威廉指標：W%R 9：9日威廉指標， %R=
　　　100*(9日內最高價-當日收盤價)/(9日內最高價-9日內最低價)
　　　以%R=0為上限， 100為下限；當
　　　1. %R進入80-100%之間為超賣狀態；
　　　2. %R進入20-0%之間為超買狀態；
　　　3. %R為 50%稱之中軸線，衝上 50%，股價開始轉強可買入，
　　　　 跌破中軸線，股價開始轉弱，應該賣出。
　　　此指標敏感度大，相對騙線多。
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
 * 動件是手動或自動發生，若是因為使用者按下『開始列出技術指標』
 * 所造成的自動更新，則會將此值設為 true。
 */
var startButtonPressed=false;

/* cema15Array 陣列用來存放15%指數移動平均線(Calculation, Exponential Moving Average) */
var cema15Array=[];

/* cema7dot5Array 陣列用來存放7.5%指數移動平均線(Calculation, Exponential Moving Average) */
var cema7dot5Array=[];

/* macdArray 陣列用來存放平滑異同移動平均線(Moving Average Convergence/Divergence) */
var macdArray=[];

/* rsv9Array 陣列用來保存9期KD隨機震盪指標(KD Stochastic Oscillator)的RSV值 */
var rsv9Array=[];

/* kdsoKArray 陣列用來保存9期KD隨機震盪指標(KD Stochastic Oscillator)的K值 */
var kdsoKArray=[];

/* kdsoDArray 陣列用來保存9期KD隨機震盪指標(KD Stochastic Oscillator)的D值 */
var kdsoDArray=[];

/* kdsoJArray 陣列用來保存9期KD隨機震盪指標(KD Stochastic Oscillator)的J值 */
var kdsoJArray=[];

/* rsi5Array, rsi10Array 陣列分別用來儲存5期及10期的相對強弱指標(Relative Strength Index) */
var rsi5Array=[];
var rsi10Array=[];

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
	var found=false;
	var foundIndex=-1;
	var companyIndex;

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

	var historyDataArrayForTechnicalAnalysis=[];
	/* 函式 determineHistoryDataArray 來決定做技術分析計算時要用到的歷史資料陣列是哪一個 */
	function determineHistoryDataArray() {
		/* 初始化 historyDataArrayForTechnicalAnalysis 為空陣列，而後判定該
		 * 用哪一個陣列指定給 historyDataArrayForTechnicalAnalysis 當做技術
		 * 分析要用到的歷史資料陣列。
		 */
		historyDataArrayForTechnicalAnalysis=[];
		if (twMarketCheckbox.checked) {
			/* 如果使用者勾選了『大盤』核取盒 */
			companyIndex=-1;
			if (historyType=="d") {
				historyDataArrayForTechnicalAnalysis=marketDayHistoryObject.historyDataArray;
			} else if (historyType=="w") {
				historyDataArrayForTechnicalAnalysis=marketWeekHistoryObject.historyDataArray;
			} else if (historyType=="m") {
				historyDataArrayForTechnicalAnalysis=marketMonthHistoryObject.historyDataArray;
			}
		} else if (companyIndex!=-1) {
			if (historyType=="d") {
				historyDataArrayForTechnicalAnalysis=companyDayHistoryObjectArray[companyIndex].historyDataArray;
			} else if (historyType=="w") {
				historyDataArrayForTechnicalAnalysis=companyWeekHistoryObjectArray[companyIndex].historyDataArray;
			} else if (historyType=="m") {
				historyDataArrayForTechnicalAnalysis=companyMonthHistoryObjectArray[companyIndex].historyDataArray;
			}
		}
	}

	/* 函式 calcCemaArray 用來計算指數移動平均線(Calculation, Exponential Moving Average) */
	function calcCemaArray(percent) {
		var percentCemaArray=[];
		var prevCema=0;
		percentCemaArray.push(prevCema);
		for (var i=1;i<historyDataArrayForTechnicalAnalysis.length;i++) {
			prevCema=historyDataArrayForTechnicalAnalysis[i].close*percent+prevCema*(1-percent);
			percentCemaArray.push(prevCema);
		}
		return percentCemaArray;
	}

	/* 函式 calcMacdArray 用來計算平滑異同移動平均線(Moving Average Convergence/Divergence) */
	function calcMacdArray() {
		macdArray=[];
		for (var i=0;i<historyDataArrayForTechnicalAnalysis.length;i++) {
			var macd=cema15Array[i]-cema7dot5Array[i];
			macdArray.push(macd);
		}
	}

	/* 函式 calcRsvArray 用來計算N期KD隨機震盪指標(KD Stochastic Oscillator)的RSV值 */
	function calcRsvArray(N) {
		var rsvArray=[];
		for (var i=0;i<historyDataArrayForTechnicalAnalysis.length;i++) {
			if (i<N) {
				rsvArray.push(0);
			} else {
				/* 找出 N 期中的最高價及最低價 */
				var min=Number.MAX_VALUE;
				var max=Number.MIN_VALUE;
				for (var k=0;k<N;k++) {
					if (historyDataArrayForTechnicalAnalysis[i-k].high>max) {
						max=historyDataArrayForTechnicalAnalysis[i-k].high;
					}
					if (historyDataArrayForTechnicalAnalysis[i-k].low<min) {
						min=historyDataArrayForTechnicalAnalysis[i-k].low;
					}
				}
				/* 計算KD隨機震盪指標的RSV值並堆入陣列中 */
				var rsvValue=(historyDataArrayForTechnicalAnalysis[i].close-min)/(max-min)*100;
				// appendMessage(i+"\t"+min+"\t"+max+"\t"+rsvValue+"\n");
				rsvArray.push(rsvValue);
			}
		}
		return rsvArray;
	}

	/* 函式 calcKDJArray 用來計算KD隨機震盪指標(KD Stochastic Oscillator)的KD,J值 */
	function calcKDJArray(rsvArray) {
		kdsoKArray=[];
		kdsoDArray=[];
		kdsoJArray=[];
		var K=0;
		var D=0;
		var J=0;
		for (i=0;i<rsvArray.length;i++) {
			K=2/3*K+1/3*rsvArray[i];
			D=2/3*D+1/3*K;
			J=3*K-2*D;
			kdsoKArray.push(K);
			kdsoDArray.push(D);
			kdsoJArray.push(J);
		}
	}

	/* 函式 calcRsiArray 用來計算N期相對強弱指標(Relative Strength Index)
		RSI：相對強弱指標
　　	A 值：過去 N日內上漲點數(價格)總和/ N
　　	B 值：過去 N日內下跌點數(價格)總和/ N
　　	RS： A/B
　　	C 值：100/(RS+1)
　　	N 日 RSI= 100-C
	*/
	function calcRsiArray(N) {
		var rsiArray=[];
		for (var i=0;i<historyDataArrayForTechnicalAnalysis.length;i++) {
			var prevUpSome;
			var prevDownSome;
			if (i<N) {
				rsiArray.push(0);
			} else if (i==N) {
				var upSum=0;
				var downSum=0;
				for (k=0;k<N;k++) {
					if (historyDataArrayForTechnicalAnalysis[i-k].close>historyDataArrayForTechnicalAnalysis[i-k-1].close){
						/* 上漲 */
						upSum=upSum+(historyDataArrayForTechnicalAnalysis[i-k].close-historyDataArrayForTechnicalAnalysis[i-k-1].close);
					} else if (historyDataArrayForTechnicalAnalysis[i-k].close<historyDataArrayForTechnicalAnalysis[i-k-1].close) {
						/* 下跌 */
						downSum=downSum+(historyDataArrayForTechnicalAnalysis[i-k-1].close-historyDataArrayForTechnicalAnalysis[i-k].close);
					}
				}
				var prevUpSome=upSum/N;
				var prevDownSome=downSum/N;
				var RS=prevUpSome/prevDownSome;
				var C=100/(RS+1);
				rsiArray.push(100-C);
			} else {
				if (historyDataArrayForTechnicalAnalysis[i].close>historyDataArrayForTechnicalAnalysis[i-1].close){
					/* 上漲 */
					prevUpSome=prevUpSome+1/N*(historyDataArrayForTechnicalAnalysis[i].close-historyDataArrayForTechnicalAnalysis[i-1].close-prevUpSome);
					prevDownSome=prevDownSome+1/N*(0-prevDownSome);
				} else if (historyDataArrayForTechnicalAnalysis[i].close<historyDataArrayForTechnicalAnalysis[i-1].close) {
					/* 下跌 */
					prevUpSome=prevUpSome+1/N*(0-prevUpSome);
					prevDownSome=prevDownSome+1/N*(historyDataArrayForTechnicalAnalysis[i-1].close-historyDataArrayForTechnicalAnalysis[i].close-prevDownSome);
				}
				var RS=prevUpSome/prevDownSome;
				var C=100/(RS+1);
				rsiArray.push(100-C);
			}
		}
		return rsiArray;
	}

	/* 函式 calcTechnicalIndicator 用來計算各種技術分析指標 */
	function calcTechnicalIndicator() {
		determineHistoryDataArray();
		cema15Array=calcCemaArray(0.15);
		cema7dot5Array=calcCemaArray(0.075);
		calcMacdArray();
		rsv9Array=calcRsvArray(9);
		calcKDJArray(rsv9Array);
		rsi5Array=calcRsiArray(5);
		rsi10Array=calcRsiArray(10);
	}

	/* 函式 printTechnicalIndicator 用來列印出各種技術分析指標 */
	function printTechnicalIndicator() {
		appendMessage("印出");
		if (twMarketCheckbox.checked) {
			appendMessage("大盤");
		} else if (companyIndex!=-1) {
			appendMessage(savedCompanyArray[companyIndex].companyName);
		}
		appendMessage("各種技術分析指標:\n");
		appendMessage("CEMA15\t\t15%指數移動平均線\n");
		appendMessage("CEMA75\t\t7.5%指數移動平均線\n");
		appendMessage("MACD\t\t平滑異同移動平均線\n");
		appendMessage("RSV\t\tKD隨機震盪指標(RSV值)\n");
		appendMessage("K\t\tKD隨機震盪指標(K值)\n");
		appendMessage("D\t\tKD隨機震盪指標(D值)\n");
		appendMessage("RSI5\t\t5期相對強弱指標\n");
		appendMessage("RSI10\t\t10期相對強弱指標\n");
		appendMessage("\n");
		appendMessage("時間\t\tCEMA15\tCEMA75\tMACD\tRSV\tK\tD\tRSI5\tRSI10");
		appendMessage("\n");
		for (var i=0;i<historyDataArrayForTechnicalAnalysis.length;i++) {
			appendMessage(
				historyDataArrayForTechnicalAnalysis[i].time+"\t"+
				cema15Array[i].toFixed(1)+"\t"+
				cema7dot5Array[i].toFixed(1)+"\t"
			);
			/* MACD 的值在26期之後才有效 */
			if (i>26) {
				appendMessage(macdArray[i].toFixed(2)+"\t");
			} else {
				appendMessage("0.0\t");
			}
			appendMessage(rsv9Array[i].toFixed(2)+"\t");
			appendMessage(kdsoKArray[i].toFixed(2)+"\t");
			appendMessage(kdsoDArray[i].toFixed(2)+"\t");
			appendMessage(rsi5Array[i].toFixed(2)+"\t");
			appendMessage(rsi10Array[i].toFixed(2)+"\t");
			appendMessage("\n");
		}
	}

	/* 函式 showTechnicalIndicator 呼叫計算漲跌資訊的函式及計算各種技術指標的函式 */
	function showTechnicalIndicator() {
		showMessage("");
		appendMessage("開始計算大盤及個股各種技術指標，請稍等...\n");
		calcTechnicalIndicator();
		appendMessage("計算大盤及個股各種技術指標完畢，印出各種技術指標。\n");
		printTechnicalIndicator();
	}

	/* 函式 createCompanyHistoryObjectCallback 是由使用者選擇公司
	 * ID 或大盤之後，產生出該公司歷史資訊的 companyHistoryObject
	 * 物件被呼叫的函式。此時就可以用此歷史資訊物件來進行列出技術
	 * 指標的工作。
	 */
	function createCompanyHistoryObjectCallback() {
		if (updatedHistoryData===false) {
			/* 歷史資料未更新，開始全面更新歷史資料。由於
			 * 呼叫 updateButton.onclick() 函式後，不會再
			 * 回到此函式中，因此設定 startButtonPressed
			 * 變數為 true ，表示是由於使用者按下『開始
			 * 列出技術指標』所造成的更新。
			 */
			startButtonPressed=true;
			updateButton.onclick();
		} else {
			showTechnicalIndicator();
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
		 	 * 完全一樣，只是前一個範例是畫 K 線圖，此範例是列出技術
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
			"<input type=button id='startButton' value='開始列出技術指標'>&nbsp&nbsp"+
			"<input type=button id='clearButton' value='清除訊息'></p>"+
      		"<p><pre id='msg'>請輸入公司代號或勾選『大盤』，"+
			"然後按下『開始列出技術指標』按鈕\n</pre></p>";
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
					 * 列出技術指標』按鈕所造成的更新動作，在
					 * 更新完畢後，要呼叫列出技術指標的函式。
					 */
					startButtonPressed=false;
					showTechnicalIndicator();
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
				companyIndex=-1;
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
					companyIndex=foundIndex;
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
					companyIndex=foundIndex;
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
			"然後按下『開始列出技術指標』按鈕\n");
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
