const CANVAS_WIDTH=740;
const CANVAS_HEIGHT=380;

const GRAPH_LEFT=30;		// K 線圖中各物件距畫布左邊的距離
const GRAPH_WIDTH=600;		// K 線圖中各物件的寬度
const MSG1_TOP=50;		// 第一行訊息文字距畫布上邊的距離
const MSG2_TOP=70;		// 第二行訊息文字距畫布上邊的距離
const KBAR_TOP=90;		// K 線圖距畫布上邊的距離
const KBAR_HEIGHT=180;		// K 線圖的高度
const MSG3_TOP=270;		// 第三行訊息文字距畫布上邊的距離
const VOL_TOP=290;		// 成交量圖距畫布上邊的距離
const VOL_HEIGHT=55;		// 成交量圖的高度
const KBAR_SPACING=3;		// 二個 K 棒的間距

/* 將圖像的位置設成常數，雖然這些常數是用 const
 * 來宣告，在整個程式中，它們的值將不會改變。
 * 這些常數會在顯示圖示的 drawIcon 函式中用到，
 * 也會在 canvas.onmouseup 事件處理函式中用到。
 */
	
const ICON_SIZE=30;
const FIRST_ICON_CENTER_XPOS=30;
const FIRST_ICON_CENTER_YPOS=30;

/* 函式 floatToInt 將傳入的參數 x 轉成整數傳回 */

function floatToInt(x) {
	var xString=x.toFixed(1);	// 轉成 1 位小數的字串
	var intX=parseInt(xString);	// 將字串轉成整數
	return intX;
}

/* 函式 StockGraphics 是 K 線圖物件的建構式。 */

function StockGraphics(canvas,width,height,companyHistoryObject) {

	var savedThis=this;

	/* 記錄 canvas 距離視窗上邊及左邊的大小 */

	var canvasTop=canvas.offsetTop;
	var canvasLeft=canvas.offsetLeft;

	function distance(x1,y1,x2,y2) {
		return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));		
	}

	/* 函式 onMouseUp 是 canvas 的滑鼠按下事件的處理函式。
	 * 主要負責判斷是否使用者在圖示上有按下的動作，並且分辨
	 * 出是那一個圖示被按下。
	 */

	function onMouseUp(mouseEvent) {

		/* mouseEvent.clientX 是滑鼠按下事件時，滑鼠位置距
		 * 視窗左邊的距離，減去 canvas 左邊到視窗左邊的距離
		 * 才是滑鼠在 canvas 中的 X 座標。
		 * Y 座標也是相同的道理。
		 */

		var mouseX=mouseEvent.clientX-canvasLeft;
		var mouseY=mouseEvent.clientY-canvasTop;
		
		/* 計算滑鼠位置和 4 個圖示中心的距離，分別是 
		 * 	distance1 滑鼠到圖示一中心的距離
		 * 	distance2 滑鼠到圖示二中心的距離
		 * 	distance3 滑鼠到圖示三中心的距離
		 * 	distance4 滑鼠到圖示四中心的距離
		 */

		var distance1=distance(mouseX,mouseY,FIRST_ICON_CENTER_XPOS,FIRST_ICON_CENTER_YPOS);
		var distance2=distance(mouseX,mouseY,FIRST_ICON_CENTER_XPOS+ICON_SIZE,FIRST_ICON_CENTER_YPOS);	
		var distance3=distance(mouseX,mouseY,FIRST_ICON_CENTER_XPOS+2*ICON_SIZE,FIRST_ICON_CENTER_YPOS);
		var distance4=distance(mouseX,mouseY,FIRST_ICON_CENTER_XPOS+3*ICON_SIZE,FIRST_ICON_CENTER_YPOS);
		var distance5=distance(mouseX,mouseY,FIRST_ICON_CENTER_XPOS+4*ICON_SIZE,FIRST_ICON_CENTER_YPOS);
		var distance6=distance(mouseX,mouseY,FIRST_ICON_CENTER_XPOS+5*ICON_SIZE,FIRST_ICON_CENTER_YPOS);
		var circleRadius=ICON_SIZE/2;

		if (distance1<circleRadius) {

			/* 如果和圖示一中心距離小於圓半徑，表示是在圖示
			 * 一中按下滑鼠，放大 K 線圖。 
			 */

			appendMessage("放大 K 線圖\n");
			savedThis.barOneSideWidth=savedThis.barOneSideWidth*2;
			savedThis.redrawCanvas();
		} else if (distance2<circleRadius) {

			/* 如果和圖示二中心距離小於圓半徑，表示是在圖示
			 * 二中按下滑鼠，縮小 K 線圖。 
			 */

			appendMessage("縮小 K 線圖\n");
			savedThis.barOneSideWidth=savedThis.barOneSideWidth/2;
			savedThis.redrawCanvas();
		} else if (distance3<circleRadius) {

			/* 如果和圖示三中心距離小於圓半徑，表示是在圖示
			 * 三中按下滑鼠，左移 K 線圖時間範圍。 
			 */

			appendMessage("左移 K 線圖時間範圍\n");
			savedThis.barEndIndex=savedThis.barEndIndex+savedThis.barNumber/4;
			savedThis.redrawCanvas();
		} else if (distance4<circleRadius) {

			/* 如果和圖示四中心距離小於圓半徑，表示是在圖示
			 * 四中按下滑鼠，右移 K 線圖時間範圍。 
			 */

			appendMessage("右移 K 線圖時間範圍\n");
			savedThis.barEndIndex=savedThis.barEndIndex-savedThis.barNumber/4;
			savedThis.redrawCanvas();
		} else if (distance5<circleRadius) {

			/* 如果和圖示五中心距離小於圓半徑，表示是在圖示
			 * 五中按下滑鼠，上升趨勢線測量。 
			 */
			
			if (savedThis.downTrend==false) {
				/* 只有不是在測量下降趨勢線的情形下才能測量上升趨勢線 */
				if (savedThis.upTrend==false) {
					savedThis.upTrend=true;

					/* 屬性 upIndex1 及 upIndex2 是用來保存使用者
					 * 設定的二個上升趨勢線端點的 Index。
					 */

					savedThis.upIndex1=-1;
					savedThis.upIndex2=-1;
					showMessage("開始上升趨勢線測量\n");
					appendMessage("請點選二個高點，讓它們連成一條上升趨勢線。\n");
					appendMessage("現在請點選第一點。\n");
				} else {
					savedThis.upTrend=false;
					showMessage("結束上升趨勢線測量\n");
				}
				savedThis.redrawCanvas();
			}
		} else if (distance6<circleRadius) {

			/* 如果和圖示六中心距離小於圓半徑，表示是在圖示
			 * 六中按下滑鼠，下降趨勢線測量。 
			 */

			if (savedThis.upTrend==false) {
				/* 只有不是在測量上升趨勢線的情形下才能測量下降趨勢線 */
				if (savedThis.downTrend==false) {
					savedThis.downTrend=true;

					/* 屬性 downIndex1 及 downIndex2 是用來保存使用者
					 * 設定的二個下降趨勢線端點的 Index。
					 */

					savedThis.downIndex1=-1;
					savedThis.downIndex2=-1;
					showMessage("開始下降趨勢線測量\n");
					appendMessage("請點選二個低點，讓它們連成一條下降趨勢線。\n");
					appendMessage("現在請點選第一點。\n");
				} else {
					savedThis.downTrend=false;
					showMessage("結束下降趨勢線測量\n");
				}
				savedThis.redrawCanvas();
			}
		} else if (savedThis.upTrend==true) {
			if (savedThis.upIndex1==-1) {
				showMessage("已點選上升趨勢線第一點，index="+savedThis.msgIndex+"\n");
				appendMessage("請繼續點選第二點。\n");
				savedThis.upIndex1=savedThis.msgIndex;
			} else if (savedThis.upIndex2==-1) {
				showMessage("已點選上升趨勢線第二點，index="+savedThis.msgIndex+"\n");
				appendMessage("請移動游標測量當日股價支撐值。\n");
				savedThis.upIndex2=savedThis.msgIndex;
			}
			savedThis.redrawCanvas();			
		} else if (savedThis.downTrend==true) {
			if (savedThis.downIndex1==-1) {
				showMessage("已點選下降趨勢線第一點，index="+savedThis.msgIndex+"\n");
				appendMessage("請繼續點選第二點。\n");
				savedThis.downIndex1=savedThis.msgIndex;
			} else if (savedThis.downIndex2==-1) {
				showMessage("已點選下降趨勢線第二點，index="+savedThis.msgIndex+"\n");
				appendMessage("請移動游標測量當日股價壓力值。\n");
				savedThis.downIndex2=savedThis.msgIndex;			
			}
			savedThis.redrawCanvas();
		}
	}

	/* 函式 onMouseOver 是 canvas 處理滑鼠 onmouseover 事件
	 * 的程式。此函式主要用來找出滑鼠位置的歷史資訊，並顯示
	 * 該資訊的收盤價給使用者查看。
	 */

	function onMouseMove(mouseEvent) {

		var width=savedThis.kbarWidth;

		/* mouseEvent.clientX 是滑鼠按下事件時，滑鼠位置距
		 * 視窗左邊的距離，減去 canvas 左邊到視窗左邊的距離
		 * ，再減去 K 線圖左邊到 canvas 左邊界的距離，才是
		 * 滑鼠在 k 線圖中的 X 座標。
		 * Y 座標也是相同的道理。
		 */

		var mouseX=mouseEvent.clientX-canvasLeft-GRAPH_LEFT;
		var mouseY=mouseEvent.clientY-canvasTop-KBAR_TOP;
		var oneBarWidth=savedThis.barWidth+KBAR_SPACING;

		/* 計算滑鼠是在歷史資訊陣列的第幾個 index */

		var index=savedThis.barEndIndex-floatToInt((width-mouseX)/oneBarWidth);
		savedThis.msgIndex=index;		
		savedThis.redrawCanvas();
	}

	/* 函式 calcMAValue 負責計算 N 日平均值，並傳回平均值的陣列 */

	function calcMAValue(N) {
		/* 計算 N 日平均值，前 N 天沒有辦法算 N 日平均值 */

		var maNArray=[];
		for (var i=0;i<savedThis.companyHistoryObject.historyDataArray.length;i++) {
			var maNValue;
			if (i<N) {
				maNValue=Number.NAN;
			} else {
				maNValue=0;
				/* 加總 companyHistoryObject.historyDataArray[i] 之前 N 日的值 */
				for (var k=0;k<N;k++) {
					maNValue=maNValue+
						savedThis.companyHistoryObject.historyDataArray[i-k].close;
				}
				maNValue=maNValue/N;	// 計算平均值
			}
			maNArray.push(maNValue);
		}

		return maNArray;
	}

	/* 函式 calcKbarPercent 負責計算每日歷史資料的上影線、主體及下影線
	 * 的比例值。
	 *
	 *	topStickPercent		上影線的比例值
	 *	bodyPercent		主體的比例值
	 *	bottomStickPercent	下影線的比例值
	 *
	 * 上述計算出的三個值將形成一個物件，並把每天的比例值物件結合成陣列
	 * ，陣列大小和歷史資訊陣列的大小一樣。
	 */

	function calcKbarPercent() {
		var kbarPercentArray=[];
		for (var i=0;i<savedThis.companyHistoryObject.historyDataArray.length;i++) {
			var topStickPercent;
			var bodyPercent;
			var bottomStickPercent;
			var oneObject=savedThis.companyHistoryObject.historyDataArray[i];
			var high=oneObject.high;
			var low=oneObject.low;
			var open=oneObject.open;
			var close=oneObject.close;
			var top;
			var bottom;

			/* 先找出開盤價及收盤價何者較高，較高者設為
			 * top 變數，較低者設為 down 變數。
			 */
			if (open>close) {
				top=open;
				bottom=close;
			} else {
				top=close;
				bottom=open;
			}

			/* 如果最高價及最低價相同時(暗示開盤也等於
			 * 收盤)，此時將無法計算各部份所佔的比例值。
			 */
			if (high==low) {
				topStickPercent=1;
				bodyPercent=1;
				bottomStickPercent=1;
			} else {
				topStickPercent=(high-top)/(high-low);
				bodyPercent=(top-bottom)/(high-low);
				bottomStickPercent=(bottom-low)/(high-low);
			}

			/* 將算出的上影線、主體及下影線比例值結合
			 * 成物件，並用 push 方法放入到 kbarPercentArray
			 * 陣列中。
			 */
			kbarPercentArray.push({
				"topStick":topStickPercent,
				"body":bodyPercent,
				"bottomStick":bottomStickPercent
			});
		}

		return kbarPercentArray;
	}

	/* 函式 calcTrendCount 負責計算每日的趨勢計數值，趨勢計數值
	 * 主要是根據 MA10 的值判斷當日是上升或下降，並且計算當日之前
	 * 同樣是上升或下降的天數。若當日是上升且前一天也是上升，則
	 * 當日的上升計數值是前一天的上升計數值加1。如果當日是上升，
	 * 但前一天是下降，則表示當日是轉折，上升計數值歸0，下降計數
	 * 值則設為1。當日為下降時，則邏輯和前相反。
	 * 此函式將為每日計算出下列二值：
	 *
	 *	upCount		代表當日的上升計數值
	 *	downCount	代表當日的下降計數值
	 *
	 * 每日的二個計數結合成一個物件，並將此物件放入到 trendCountArray
	 * 陣列中。函式結束時傳回此一陣列。
	 */

	function calcTrendCount() {
		var trendCountArray=[];
		var prevMa10;
		var ma10;
		var upCount;
		var downCount;

		/* 前面10天沒有 MA10 的值，第11天也因為前一天沒有 MA11 
		 * 值，所以計數值都設為0。 
		 */
		for (var i=0;i<11;i++) {
			upCount=0;
			downCount=0;
			prevMa10=savedThis.ma10[i];
			trendCountArray.push({
				"upCount":upCount,
				"downCount":downCount
			});
		}
		/* 先計算出第12天的計數值 */
		ma10=savedThis.ma10[11];
		if (ma10>prevMa10) {
			upCount=1;
			downCount=0;
		} else if (prevMa10>ma10) {
			upCount=0;
			downCount=1;
		} else {
			upCount=0;
			downCount=0;
		}
		trendCountArray.push({
			"upCount":upCount,
			"downCount":downCount
		});
		prevMa10=ma10;

		/* 計算第12天以後的計數值 */

		for (var i=12;i<savedThis.companyHistoryObject.historyDataArray.length;i++) {
			var ma10=savedThis.ma10[i];
			if (ma10>prevMa10) {
				if (upCount>0) {
					upCount++;		// 持續上升中
				} else if (downCount>0) {
					downCount=0;		// 下降中反轉為上升
					upCount=1;
				}
			} else if (prevMa10>ma10) {
				if (upCount>0) {
					upCount=0;		// 上升中反轉為下降
					downCount=1;
				} else if (downCount>0) {
					downCount++;		// 持續下降中
				}
			} else {
				if (upCount>0) {
					upCount++;		// 持續上升中
				} else if (downCount>0) {
					downCount++;		// 持續上升中
				}

			}
			trendCountArray.push({
				"upCount":upCount,
				"downCount":downCount
			});
			prevMa10=ma10;
		}
		return trendCountArray;
	}

	/* 函式 patternMatch 負責從 K 線中找出當日屬於何種組合型態，
	 * 並將形態編號存入 patternTypeArray 中。詳細的判斷依據請參
	 * 考第362頁 K 線圖的形態說明。
	 */

	function patternMatch() {
		var patternTypeArray=[];
		var totalLength=savedThis.companyHistoryObject.historyDataArray.length;

		for (var i=0;i<totalLength;i++) {
			/* patternType 是當日的形態編號，預設值-1表示當日沒有
			 * 匹配的形態。
			 */

			var patternType=-1;
			/* 在此的形態判斷邏輯中，不使用 else if 敘述的原因是
			 * 因為某日的 K 線形態可能有多重形態的可能，也許書中
			 * 列出的10種並沒有多重形態的可能性，但須要保留這種可
			 * 能性的處理邏輯。發生多重形態的情形時，由於較多天的
			 * 形態判斷是在後面，所以會蓋掉較少天數形態。如果要記
			 * 錄多重形態的可能性，則必須使用二維陣列，增加程式的
			 * 複雜度，留做讀者自行練習。
			 */

			if (i<=(totalLength-1)) { /* 判斷型態 5,6,9,10 ，至少須要 1 天資料 */
				var dataObject=savedThis.companyHistoryObject.historyDataArray[i];
				var close=dataObject.close;
				var open=dataObject.open;
			
				if ((savedThis.trendCountArray[i].downCount>5)&&
				    (close>open)&&
				    (savedThis.kbarPercent[i].bottomStick>0.66)) {
					/* 判斷型態 5,9 */
					if (savedThis.kbarPercent[i].topStick==0) {
						patternType=9;	// 槌線沒有上影線
					} else {
						patternType=5;
					}
				} else if ((savedThis.trendCountArray[i].upCount>5)&&
					   (open>close)&&
					   (savedThis.kbarPercent[i].topStick>0.66)) {
					/* 判斷型態 6,10 */
					if (savedThis.kbarPercent[i].bottomStick==0) {
						patternType=10;	// 倒槌線沒有下影線
					} else {
						patternType=6;
					}
				} 
			}

			if (i<=(totalLength-2)) { /* 判斷型態 3,4 ，至少須要 2 天資料 */

				var dataObject1=savedThis.companyHistoryObject.historyDataArray[i];
				var close1=dataObject1.close;
				var open1=dataObject1.open;
				var dataObject2=savedThis.companyHistoryObject.historyDataArray[i+1];
				var close2=dataObject2.close;
				var open2=dataObject2.open;

				if ((savedThis.trendCountArray[i].downCount>5)&&
				    (close2>open2)&&((close2-open2)/close2>0.03)&&
				    (open1>close1)&&((open1-close1)/open1<0.01)&&
				    (open1<close2)&&(close1>open2)) {
					/* 判斷型態 4 */
					patternType=4;
				} else if ((savedThis.trendCountArray[i].upCount>5)&&
					   (open2>close2)&&((open2-close2)/open2>0.03)&&
					   (close1>open1)&&((close1-open1)/close1<0.01)&&
					   (close1<open2)&&(open1>close2)) {
					/* 判斷型態 3 */
					patternType=3;
				} 
			} 

			if (i<=(totalLength-3)) { /* 判斷型態 7,8 ，至少須要 3 天資料 */

				var dataObject1=savedThis.companyHistoryObject.historyDataArray[i];
				var close1=dataObject1.close;
				var open1=dataObject1.open;
				var dataObject2=savedThis.companyHistoryObject.historyDataArray[i+1];
				var close2=dataObject2.close;
				var open2=dataObject2.open;
				var high;
				var low;
				if (close2>open2) {
					high=close2;
					low=open2;
				} else {
					high=open2;
					low=close2;
				}
				var dataObject3=savedThis.companyHistoryObject.historyDataArray[i+2];
				var close3=dataObject3.close;
				var open3=dataObject3.open;

				if ((close1>open1)&&((close1-open1)/close1>0.03)&&
				    (low>close1)&&
				    (Math.abs(close2-open2)/close2<0.005)&&
				    (open3>close3)&&((open3-close3)/open3>0.03)&&
				    (high<open3)&&(low>close3)) {
					patternType=7;
				} else if ((open1>close1)&&((open1-close1)/open1>0.03)&&
					   (high<close1)&&
					   (Math.abs(close2-open2)/close2<0.005)&&
					   (close3>open3)&&((close3-open3)/close3>0.03)&&
					   (high<close3)&&(low>open3)) {
					patternType=8;
				}
			} 

			if (i<=(totalLength-5)) { /* 判斷型態 1,2 ，至少須要 5 天資料 */

				var dataObject1=savedThis.companyHistoryObject.historyDataArray[i];
				var close1=dataObject1.close;
				var open1=dataObject1.open;
				var high=Number.NEGATIVE_INFINITY;
				var low=Number.POSITIVE_INFINITY;
				
				/* 找到第二三四天中開盤及收盤的最大值及最小值 */
				for (k=1;k<=3;k++) {
					var dataObject=savedThis.companyHistoryObject.historyDataArray[i+k];
					var close=dataObject.close;
					var open=dataObject.open;

					if ((open>close)&&(open>high)) {
						high=open;
					} else if ((close>open)&&(close>high)) {
						high=close;
					}
					if ((open<close)&&(open<low)) {
						low=open;
					} else if ((close<open)&&(close<low)) {
						low=close;
					}
				}

				var dataObject5=savedThis.companyHistoryObject.historyDataArray[i+4];
				var close5=dataObject5.close;
				var open5=dataObject5.open;

				if ((savedThis.trendCountArray[i].downCount>5)&&
				    (open1>close1)&&((open1-close1)/open1>0.03)&&
				    (high<open1)&&(low>close1)&&
				    (open5>close5)&&((open5-close5)/open5>0.03)&&
				    (open5<open1)) {
					/* 判斷型態 1 */
					patternType=1;
				} else if ((savedThis.trendCountArray[i].upCount>5)&&
					   (close1>open1)&&((close1-open1)/close1>0.03)&&
					   (high<close1)&&(low>open1)&&
					   (close5>open5)&&((close5-open5)/close5>0.03)&&
					   (close5>close1)) {
					/* 判斷型態 2 */
					patternType=2;
				} 
			} 

			patternTypeArray.push(patternType);
		}
		return patternTypeArray;
	}

	/* 物件 StockGraphics 建構函式由此處開始 */
	/* 根據傳入的 width 及 height 參數設定畫布的大小 */
	
	canvas.setAttribute("width",width);
	canvas.setAttribute("height",height);
	
	/* 屬性 width 保存了畫存的寬，屬性 height 保存了畫布的高 */

	this.width=width;
	this.height=height;

	/* 屬性 context 保存了畫布的繪圖環境 */

	this.context=canvas.getContext("2d");


	/* 以下屬性和 K 線圖的位置有關，這些屬性會用在 redrawCanvas 
	 * 方法中。前面常數定義時，有些常數會在這裡重複使用，例如
	 * GRAPH_LEFT 在這裡會設定給畫布上不同物件的左邊界值，前面
	 * 只定義一個常數值的目的是只要修改一個常數值，這裡的屬性
	 * 值就不用一一修正了。這裡的屬性值為了各物件的位置保有各
	 * 自的名稱，所以還是各物件分別定義一個屬性，例如訊息物件
	 * 的左邊界及 K 線圖的左邊界雖然數值是一樣的，但還是要分開
	 * 成不同的屬性才好。在畫不同物件時使用各自的屬性名稱，好
	 * 處是不會混淆，而且將來若要用不同的數值時，程式也比較好
	 * 修改。
	 */
	
	this.valueMsgTop=MSG1_TOP;	// 數值訊息距畫布上邊的距離
	this.valueMsgLeft=GRAPH_LEFT;	// 數值訊息距畫布左邊的距離
	this.maMsgTop=MSG2_TOP;		// 移動平均值訊息距畫布上邊的距離
	this.maMsgLeft=GRAPH_LEFT;	// 移動平均值訊息距畫布左邊的距離
	this.kbarTop=KBAR_TOP;		// K 線圖距畫布上邊的距離
	this.kbarLeft=GRAPH_LEFT;	// K 線圖距畫布左邊的距離
	this.kbarWidth=GRAPH_WIDTH;	// K 線圖的寬度
	this.kbarHeight=KBAR_HEIGHT;	// K 線圖的高度
	this.volMsgTop=MSG3_TOP;	// 成交量訊息距畫布上邊的距離
	this.volMsgLeft=GRAPH_LEFT;	// 成交量訊息距畫布左邊的距離
	this.volTop=VOL_TOP;		// 成交量圖距畫布上邊的距離
	this.volLeft=GRAPH_LEFT;	// 成交量圖距畫布左邊的距離
	this.volWidth=GRAPH_WIDTH;	// 成交量圖的寬度
	this.volHeight=VOL_HEIGHT;	// 成交量圖的高度

	/* 定義 K 棒一邊的像素點數，此值最小是 1，最大是 64 */
	
	this.barOneSideWidth=1;		// 預設一個 K 棒的一邊有1點像素

	/* 將傳入的參數 companyHistoryObject 保存在屬性中 */

	this.companyHistoryObject=companyHistoryObject;
	this.companyId=companyHistoryObject.companyId;

	/* 預設要畫出的時間範圍之結束時間是歷史資訊陣列的最後一天 */
	
	this.barEndIndex=this.companyHistoryObject.historyDataArray.length-1;
	this.barStartIndex=0;
	this.maxBarEndIndex=this.companyHistoryObject.historyDataArray.length-1;

	/* 決定 K 線圖縱座標的最小及最大值 */
	var tempMax=0;
	var tempMin=Number.MAX_VALUE;
	for (var i=0;i<this.companyHistoryObject.historyDataArray.length-1;i++) {
		var oneObject=this.companyHistoryObject.historyDataArray[i];
		var high=oneObject.high;
		var low=oneObject.low;
		if (high>tempMax) {
			tempMax=high;
		}
		if (low<tempMin) {
			tempMin=low;
		}
	}
	this.barMaxValue=tempMax;
	this.barMinValue=tempMin;

	/* 決定成交量圖縱座標的最大值，最小值為 0 */
	this.volMaxValue=0;
	this.volMinValue=0;
	for (var i=0;i<this.companyHistoryObject.historyDataArray.length-1;i++) {
		var oneObject=this.companyHistoryObject.historyDataArray[i];
		var volume=oneObject.volume;
		if (volume>this.volMaxValue) {
			this.volMaxValue=volume;
		}
	}	
	/* 如果是大盤則成交量的單位是『億』，各股則成交量單位是『張』。
	 * 大盤的最大值以100億為單位計算出最大值。各股的最大值
	 * 是由 10 的次方決定，例如某股票最大成交量是 353 張，則座標最大值
	 * 可設為 1000，若成交量最大值是 2438 張，則座標最大值可設為
	 * 10000，...。
	 */

	if (this.companyId=="%23001") {
		/* 大盤的成交量以100億為一個單位，首先算出最大值有幾個
		 * 100億。
		 */
		this.volMaxValue=floatToInt(this.volMaxValue/100)+1;
		/* 再把最大值設定為100億的倍數 */
		this.volMaxValue=this.volMaxValue*100;
	} else {
		/* 將目前最大值取 log10 則可得目前最大值是10的幾次方，
		 * 取整數再加1即可決定新的最大值。由於 JavaScript 的
		 * Math.log(x) 是計算 ln(x) 的值，所以要算 log10(x)
		 * 必須用 log10(e)*ln(x) 才能得到。
		 */
		var exp=floatToInt(Math.LOG10E*Math.log(this.volMaxValue));

		/* 找出成交量最大值是10的幾次方 */

		var newVolMaxValue=Math.pow(10,exp);		// 先設定新的最大值是一個 10^exp
		while (newVolMaxValue<this.volMaxValue) {	// 新的最大值如果還沒有大於原本的最大值
			/* 新的最大值再多加一個 10^exp */
			newVolMaxValue=newVolMaxValue+Math.pow(10,exp);
		}
		/* 至此新的最大值(縱座標最大刻度值)已經大於原本的最大值，
		 * 且新的最大值是 10^exp 的倍數。
		 */
		this.volMaxValue=newVolMaxValue;
	}

	/* 呼叫 calcMAValue 函式計算5日、20日及60日平均值 */
	
	this.ma5=calcMAValue(5);
	this.ma10=calcMAValue(10);	// 10日平均值用在 calcTrendCount 函式中
	this.ma20=calcMAValue(20);
	this.ma60=calcMAValue(60);

	/* 呼叫 calcKbarPercent 函式計算出每日的上影線、主體
	 * 及下影線所佔百分比。
	 */

	this.kbarPercent=calcKbarPercent();

	/* 呼叫 calcTrendCount 函式計算每日的上升或下降計數值，
	 * 上升或下降計數值可以輔助判斷 K 線的組合形態。
	 */

	this.trendCountArray=calcTrendCount();

	/* 呼叫 patternMatch 函式找出每日的 K 線是否符合某種
	 * 形態。
	 */

	this.patternTypeArray=patternMatch();

	/* 設定要顯示歷史資訊陣列中的第幾個資料 */

	this.msgIndex=this.maxBarEndIndex;

	/* 設定上升趨勢線或下降趨勢線的量測是 OFF (禁能)的狀態 */

	this.upTrend=false;
	this.downTrend=false;

	/* 指定處理 canvas mouse up 的事件處理程式 */
	
	canvas.onmouseup=onMouseUp;

	/* 指定處理 canvas mouse move 的事件處理程式 */

	canvas.onmousemove=onMouseMove;
	
	/* 呼叫 redrawCanvas() 方法畫出 K 線圖 */

	this.redrawCanvas();
};

/* 類別 StockGraphics 的方法 calcDrawParameter 主要用來事先
 * 計算出畫 K 線圖時會用到的一些重要參數，例如一張圖中可以
 * 容納幾天的 K 棒、K 棒的寬度、第一天是資料陣列中的第幾個。
 */

StockGraphics.prototype.calcDrawParameter=function () {

	/* 檢查經過放大、縮小之後的 this.barOneSideWidth 值
	 * 是否超過範圍。
	 */

	if (this.barOneSideWidth<1.0) {
		this.barOneSideWidth=1;
	} else if (this.barOneSideWidth>64) {
		this.barOneSideWidth=64;
	}

	/* 檢查 K 線圖經過左右平移後，this.barEndIndex 的值
	 * 是否超過範圍。
	 */

	if (this.barEndIndex>this.companyHistoryObject.historyDataArray.length-1) {
		this.barEndIndex=this.companyHistoryObject.historyDataArray.length-1;
	}
	if (this.barEndIndex<0) {
		this.barEndIndex=0;
	}

	/* 決定 K 棒伸出線的寬度 */

	this.barStickWidth=this.barOneSideWidth/10;
	if (this.barStickWidth<1.0) {
		this.barStickWidth=1;
	} else {
		this.barStickWidth=floatToInt(this.barStickWidth);
	}

	/* 決定 K 棒的寬度，二邊寬度加上伸出線的寬度 */

	this.barWidth=2*this.barOneSideWidth+this.barStickWidth;

	/* 決定 K 線圖中可畫幾個 K 棒，二個 K 棒中間要空 1 像素 */
	
	this.barNumber=floatToInt(this.kbarWidth/(this.barWidth+KBAR_SPACING));

	/* 決定 K 線圖中時間範圍的開始時間(歷史資訊陣列中的開始 index) */
	
	this.barStartIndex=this.barEndIndex-this.barNumber+1;
	if (this.barStartIndex<0) {
		this.barStartIndex=0;
	}
};

/* 類別 StockGraphics 的方法 redrawCanvas 主要用來重畫出現
 * 在畫布上的各種物件，例如訊息、K 線圖、移動平均線、成交量
 * 圖。在此方法中包含了數個函式，各是用來畫出不同的物件。
 */

StockGraphics.prototype.redrawCanvas=function () {
	var savedThis=this;

	/* 函式 clearGraphics 負責在重畫 K 線圖時先清除先前所畫
	 * 的 K 線圖，否則先前畫的和在要畫的會混在一起。
	 */

	function clearGraphics() {
		var top=0;
		var left=0;
		var width=CANVAS_WIDTH;
		var height=CANVAS_HEIGHT;

		savedThis.context.beginPath();
		savedThis.context.fillStyle="#ffffff";
		savedThis.context.fillRect(left,top,width,height);

		/* 畫出繪圖區域的外框 */

		savedThis.context.beginPath();
		savedThis.context.strokeStyle="#FFAA00";
		savedThis.context.lineWidth=3;
		savedThis.context.strokeRect(0,0,width,height);
	}
	
	/* 函式 drawIcon 負責在重畫時繪出上升及下降的圓形圖示，
	 * 由於按下這二個圖示後會改變它們的狀態，所以要重畫它
	 * 們，另外四個圓形圖示則不用。
	 */

	function drawIcon() {

		/* 畫出第一個圓形圖示：放大 K 線圖。 */

		savedThis.context.beginPath();
		savedThis.context.strokeStyle="#00AA00";
		savedThis.context.lineWidth=3;
		savedThis.context.arc(
			FIRST_ICON_CENTER_XPOS,	
			FIRST_ICON_CENTER_YPOS,
			ICON_SIZE/2,
			0,
			2*Math.PI
		);
		savedThis.context.stroke();
		savedThis.context.beginPath();
		savedThis.context.moveTo(FIRST_ICON_CENTER_XPOS-5,FIRST_ICON_CENTER_YPOS);
		savedThis.context.lineTo(FIRST_ICON_CENTER_XPOS+5,FIRST_ICON_CENTER_YPOS);
		savedThis.context.stroke();
		savedThis.context.beginPath();
		savedThis.context.moveTo(FIRST_ICON_CENTER_XPOS,FIRST_ICON_CENTER_YPOS-5);
		savedThis.context.lineTo(FIRST_ICON_CENTER_XPOS,FIRST_ICON_CENTER_YPOS+5);
		savedThis.context.stroke();

		/* 畫出第二個圓形圖示：縮小 K 線圖。 */

		savedThis.context.beginPath();
		savedThis.context.arc(
			FIRST_ICON_CENTER_XPOS+ICON_SIZE,	
			FIRST_ICON_CENTER_YPOS,
			ICON_SIZE/2,
			0,
			2*Math.PI
		);
		savedThis.context.stroke();
		savedThis.context.beginPath();
		savedThis.context.moveTo(FIRST_ICON_CENTER_XPOS+ICON_SIZE-5,FIRST_ICON_CENTER_YPOS);
		savedThis.context.lineTo(FIRST_ICON_CENTER_XPOS+ICON_SIZE+5,FIRST_ICON_CENTER_YPOS);
		savedThis.context.stroke();

		/* 畫出第三個圓形圖示：左移 K 線圖時間範圍。 */

		savedThis.context.beginPath();
		savedThis.context.arc(
			FIRST_ICON_CENTER_XPOS+ICON_SIZE*2,	
			FIRST_ICON_CENTER_YPOS,
			ICON_SIZE/2,
			0,
			2*Math.PI
		);
		savedThis.context.stroke();
		savedThis.context.beginPath();
		savedThis.context.lineJoin="round";
		savedThis.context.moveTo(FIRST_ICON_CENTER_XPOS+ICON_SIZE*2-5,FIRST_ICON_CENTER_YPOS);
		savedThis.context.lineTo(FIRST_ICON_CENTER_XPOS+ICON_SIZE*2+5,FIRST_ICON_CENTER_YPOS);
		savedThis.context.stroke();
		savedThis.context.beginPath();
		savedThis.context.moveTo(FIRST_ICON_CENTER_XPOS+ICON_SIZE*2,FIRST_ICON_CENTER_YPOS-5);
		savedThis.context.lineTo(FIRST_ICON_CENTER_XPOS+ICON_SIZE*2-5,FIRST_ICON_CENTER_YPOS);
		savedThis.context.lineTo(FIRST_ICON_CENTER_XPOS+ICON_SIZE*2,FIRST_ICON_CENTER_YPOS+5);
		savedThis.context.stroke();

		/* 畫出第四個圓形圖示：右移 K 線圖時間範圍。 */

		savedThis.context.beginPath();
		savedThis.context.arc(
			FIRST_ICON_CENTER_XPOS+ICON_SIZE*3,	
			FIRST_ICON_CENTER_YPOS,
			ICON_SIZE/2,
			0,
			2*Math.PI
		);
		savedThis.context.stroke();
		savedThis.context.beginPath();
		savedThis.context.lineJoin="round";
		savedThis.context.moveTo(FIRST_ICON_CENTER_XPOS+ICON_SIZE*3-5,FIRST_ICON_CENTER_YPOS);
		savedThis.context.lineTo(FIRST_ICON_CENTER_XPOS+ICON_SIZE*3+5,FIRST_ICON_CENTER_YPOS);
		savedThis.context.stroke();
		savedThis.context.beginPath();
		savedThis.context.moveTo(FIRST_ICON_CENTER_XPOS+ICON_SIZE*3,FIRST_ICON_CENTER_YPOS-5);
		savedThis.context.lineTo(FIRST_ICON_CENTER_XPOS+ICON_SIZE*3+5,FIRST_ICON_CENTER_YPOS);
		savedThis.context.lineTo(FIRST_ICON_CENTER_XPOS+ICON_SIZE*3,FIRST_ICON_CENTER_YPOS+5);
		savedThis.context.stroke();

		/* 畫出第五個圓形圖示：上升趨勢線測量 */
		savedThis.context.beginPath();
		savedThis.context.lineWidth=3;
		savedThis.context.strokeStyle="#00AA00";
		if (savedThis.upTrend==false) {
			savedThis.context.fillStyle="white";
		} else {
			savedThis.context.fillStyle="#cccccc";
		}
		savedThis.context.arc(
			FIRST_ICON_CENTER_XPOS+ICON_SIZE*4,	
			FIRST_ICON_CENTER_YPOS,
			ICON_SIZE/2,
			0,
			2*Math.PI
		);
		savedThis.context.fill();
		savedThis.context.stroke();
		savedThis.context.beginPath();
		savedThis.context.lineJoin="round";
		savedThis.context.moveTo(FIRST_ICON_CENTER_XPOS+ICON_SIZE*4-5,FIRST_ICON_CENTER_YPOS+5);
		savedThis.context.lineTo(FIRST_ICON_CENTER_XPOS+ICON_SIZE*4+5,FIRST_ICON_CENTER_YPOS-5);
		savedThis.context.stroke();
		savedThis.context.beginPath();
		savedThis.context.moveTo(FIRST_ICON_CENTER_XPOS+ICON_SIZE*4-5,FIRST_ICON_CENTER_YPOS+5);
		savedThis.context.lineTo(FIRST_ICON_CENTER_XPOS+ICON_SIZE*4-10,FIRST_ICON_CENTER_YPOS+5);
		savedThis.context.stroke();
		savedThis.context.beginPath();
		savedThis.context.moveTo(FIRST_ICON_CENTER_XPOS+ICON_SIZE*4+5,FIRST_ICON_CENTER_YPOS-5);
		savedThis.context.lineTo(FIRST_ICON_CENTER_XPOS+ICON_SIZE*4+10,FIRST_ICON_CENTER_YPOS-5);
		savedThis.context.stroke();

		/* 畫出第六個圓形圖示：下降趨勢線測量 */
		savedThis.context.beginPath();
		savedThis.context.lineWidth=3;
		savedThis.context.strokeStyle="#00AA00";
		if (savedThis.downTrend==false) {
			savedThis.context.fillStyle="white";
		} else {
			savedThis.context.fillStyle="#cccccc";
		}
		savedThis.context.arc(
			FIRST_ICON_CENTER_XPOS+ICON_SIZE*5,	
			FIRST_ICON_CENTER_YPOS,
			ICON_SIZE/2,
			0,
			2*Math.PI
		);
		savedThis.context.fill();
		savedThis.context.stroke();
		savedThis.context.beginPath();
		savedThis.context.lineJoin="round";
		savedThis.context.moveTo(FIRST_ICON_CENTER_XPOS+ICON_SIZE*5+5,FIRST_ICON_CENTER_YPOS+5);
		savedThis.context.lineTo(FIRST_ICON_CENTER_XPOS+ICON_SIZE*5-5,FIRST_ICON_CENTER_YPOS-5);
		savedThis.context.stroke();
		savedThis.context.beginPath();
		savedThis.context.moveTo(FIRST_ICON_CENTER_XPOS+ICON_SIZE*5+5,FIRST_ICON_CENTER_YPOS+5);
		savedThis.context.lineTo(FIRST_ICON_CENTER_XPOS+ICON_SIZE*5+10,FIRST_ICON_CENTER_YPOS+5);
		savedThis.context.stroke();
		savedThis.context.beginPath();
		savedThis.context.moveTo(FIRST_ICON_CENTER_XPOS+ICON_SIZE*5-5,FIRST_ICON_CENTER_YPOS-5);
		savedThis.context.lineTo(FIRST_ICON_CENTER_XPOS+ICON_SIZE*5-10,FIRST_ICON_CENTER_YPOS-5);
		savedThis.context.stroke();
	}

	/* 函式drawKBarVerticalLine 負責在 K 線圖中畫出縱座標平行線 */

	function drawKBarVerticalLine() {
		var top=savedThis.kbarTop;
		var left=savedThis.kbarLeft;
		var width=savedThis.kbarWidth;
		var height=savedThis.kbarHeight;

		/* 要畫和縱座標平行的線，要先找出歷史資訊陣列中
		 * 那個 index 處要畫線。lineIndexArray 陣列即是
		 * 用來保存要畫縱線的 index 值。縱線是畫在二個
		 * 不同日期的交界處，以日線來看這個交界是月份
		 * 和月份間，以週線來看這個交界是季和季之間，若
		 * 是以月線來看這個交界則是年和年之間。
		 * 所以這裡要先用程式來找出這個交界的地方，並把
		 * 該交界的 index 記在 lineIndexArray 陣列中。
		 */

		var lineIndexArray=[];
		var historyDataArray=savedThis.companyHistoryObject.historyDataArray;
		var historyType=savedThis.companyHistoryObject.getHistoryType();

		/* 在開始找分界前先找出前一天的年份及月份 */

		var prevTime=historyDataArray[0].time;
		var prevYear=parseInt(prevTime.substr(0,4));
		var prevMonth=parseInt(prevTime.substr(4,2));

		/* appendMessage("prevTime="+prevTime+",prevYear="+prevYear+",prevMonth="+prevMonth+"\n"); */

		for (var i=1;i<historyDataArray.length;i++) {

			/* 找出當日的年分及月份 */

			var time=historyDataArray[i].time;
			var year=parseInt(time.substr(0,4));
			var month=parseInt(time.substr(4,2));
		
			if (historyType=="d") {
				/* 日線要找月份之間的交界 */
				if (month!=prevMonth) {
					lineIndexArray.push(i);
					prevYear=year;
					prevMonth=month;
				}
			} else if (historyType=="w") {
				/* 週線要找季之間的交界，1月4月7月11月 */
				if (((month%3)==1)&&(month!=prevMonth)) {
					lineIndexArray.push(i);
					prevYear=year;
					prevMonth=month;
				}
			} else {
				/* 月線要找年份之間的交界 */
				if (year!=prevYear) {
					lineIndexArray.push(i);
					prevYear=year;
					prevMonth=month;
				}
			}
		}

		/* appendMessage(lineIndexArray); */
		
		/* 根據找到的 line index 去畫出縱座標平行線 */
		
		for (var i=0;i<lineIndexArray.length;i++) {
			/* 計算出縱座標平行線的座標值 */

			var xPos=(left+width)-(savedThis.barEndIndex-lineIndexArray[i]+1)*	
				(savedThis.barWidth+KBAR_SPACING)+
				savedThis.barOneSideWidth;

			if (xPos>left) {
				/* 在 K 線圖中畫出縱標平行線 */
				savedThis.context.beginPath();
				savedThis.context.strokeStyle="#aaaaaa";
				savedThis.context.lineWidth=1;
				savedThis.context.moveTo(xPos,top);
				savedThis.context.lineTo(xPos,top+height);
				savedThis.context.stroke();
				/* 在成交量圖中畫出縱座標平行線 */
				savedThis.context.beginPath();
				savedThis.context.strokeStyle="#aaaaaa";
				savedThis.context.lineWidth=1;
				savedThis.context.moveTo(xPos,savedThis.volTop);
				savedThis.context.lineTo(xPos,savedThis.volTop+savedThis.volHeight);
				savedThis.context.stroke();
				/* 在成交量圖最小方畫出交界的日期 */				
				var time=historyDataArray[lineIndexArray[i]].time;
				var year=parseInt(time.substr(0,4));
				var month=parseInt(time.substr(4,2));
				savedThis.context.beginPath();
				savedThis.context.font="10px Arial"; 
				savedThis.context.fillStyle="#666666";
				savedThis.context.textAlign="center";
				savedThis.context.textBaseline="middle";
				var timeText;
				if (historyType=="m") {
					timeText=year;
				} else {
					timeText=year+"/"+month;
				}
				savedThis.context.fillText(timeText,xPos,savedThis.volTop+savedThis.volHeight+7);
				savedThis.context.stroke();			
			}
		}
	}

	/* 函式 drawKBarGraphics 負責畫出 K 線圖 */

	function drawKBarGraphics() {
		var top=savedThis.kbarTop;
		var left=savedThis.kbarLeft;
		var width=savedThis.kbarWidth;
		var height=savedThis.kbarHeight;
		
		/* 畫出外框 */

		savedThis.context.beginPath();
		savedThis.context.strokeStyle="#666666";
		savedThis.context.lineWidth=1;
		savedThis.context.strokeRect(left,top,width,height);

		/* 畫出橫座標軸，共分十等分 */		
		var ySpace=height/10;					// 每條格線的距離
		for (var i=1;i<10;i++) {
			var yPos=top+height-i*ySpace;			// 格線的 y 座標值
			savedThis.context.beginPath();
			savedThis.context.strokeStyle="#aaaaaa";
			savedThis.context.lineWidth=1;
			savedThis.context.moveTo(left,yPos);
			savedThis.context.lineTo(left+width,yPos);
			savedThis.context.stroke();
		}

		/* 用 filltext 畫出橫座標的值 */
		var yValueDiff=(savedThis.barMaxValue-savedThis.barMinValue)/10;
		for (var i=1;i<=10;i++) {
			var yPos=top+height-i*ySpace;			// 文字的 y 座標值
			var yValue=savedThis.barMinValue+i*yValueDiff;	// 文字的數值
			savedThis.context.beginPath();
			savedThis.context.font="10px Arial"; 
			savedThis.context.fillStyle="#666666";
			savedThis.context.textAlign="left";
			savedThis.context.textBaseline="middle";
			savedThis.context.fillText(yValue.toFixed(2),left+width+5,yPos);
			savedThis.context.stroke();
		}

		/* 用 filltext 畫出橫座標的單位 */
		var yPos=top+height-11*ySpace;				// 文字的 y 座標值
		savedThis.context.beginPath();
		savedThis.context.font="10px Arial"; 
		savedThis.context.fillStyle="#666666";
		savedThis.context.textAlign="left";
		savedThis.context.textBaseline="middle";
		if (savedThis.companyId=="%23001") {
			savedThis.context.fillText("單位：加權指數",left+width+5,yPos);
		} else {
			savedThis.context.fillText("單位：元",left+width+5,yPos);
		}
		savedThis.context.stroke();
		
		drawKBarVerticalLine();

		/* 畫出所有 K 棒的上下突出線 */
		for (var i=savedThis.barStartIndex;i<=savedThis.barEndIndex;i++) {
			var oneObject=savedThis.companyHistoryObject.historyDataArray[i];
			var high=oneObject.high;
			var low=oneObject.low;
			var yValue;					// K 棒上下突出線左上角的值
			var color;					// K 棒上下突出線的顏色
			var diff;					// 最高及最低價差

			/* 決定 yValue, color 的值 */
			yValue=high;
			color="black";
			diff=high-low;
			
			/* 計算出 K 棒上下突出線左上角的座標值 */
			var xPos=(left+width)-(savedThis.barEndIndex-i+1)*	
				(savedThis.barWidth+KBAR_SPACING)+
				savedThis.barOneSideWidth;
			var yPos=(top+height)-
				savedThis.kbarHeight*(yValue-savedThis.barMinValue)/
				(savedThis.barMaxValue-savedThis.barMinValue);
			
			/* 計算出 K 棒上下突出線的高度 */
			var kbarHeight=diff*height/
				(savedThis.barMaxValue-savedThis.barMinValue);
			if (kbarHeight<1) {
				kbarHeight=1;				// K 棒上下突出線至少一條線
			}
			kbarHeight=floatToInt(kbarHeight);

			/* 畫出一個 K 棒上下突出線 */
			savedThis.context.beginPath();
			savedThis.context.fillStyle=color;
			savedThis.context.fillRect(xPos,yPos,savedThis.barStickWidth,kbarHeight);
		}

		/* 畫出所有 K 棒 */
		for (var i=savedThis.barStartIndex;i<=savedThis.barEndIndex;i++) {
			var oneObject=savedThis.companyHistoryObject.historyDataArray[i];
			var open=oneObject.open;
			var close=oneObject.close;
			var yValue;					// K 棒左上角的值
			var color;					// K 棒的顏色
			var diff;					// 開盤及收盤價差

			/* 決定 yValue, color 的值 */
			if (open>close) {		
				/* 開盤價在上，故顏色為綠色 */		
				yValue=open;				
				color="green";
				diff=open-close;
			} else if (open<close) {
				/*  收盤價在上，故顏色為紅色 */
				yValue=close;
				color="red";
				diff=close-open;
			} else {
				/* 開盤價等於收盤價，顏色為黑色 */
				yValue=open;
				color="black";
				diff=0;	
			}

			/* 計算出 K 棒左上角的座標值 */
			var xPos=(left+width)-(savedThis.barEndIndex-i+1)*(savedThis.barWidth+KBAR_SPACING);	
			var yPos=(top+height)-
				savedThis.kbarHeight*(yValue-savedThis.barMinValue)/
				(savedThis.barMaxValue-savedThis.barMinValue);
			
			/* 計算出 K 棒的高度 */
			var kbarHeight=diff*height/
				(savedThis.barMaxValue-savedThis.barMinValue);
			if (kbarHeight<1) {
				kbarHeight=1;				// K 棒至少一條線
			}
			kbarHeight=floatToInt(kbarHeight);

			/* 畫出一個 K 棒 */
			savedThis.context.beginPath();
			savedThis.context.fillStyle=color;
			savedThis.context.fillRect(xPos,yPos,savedThis.barWidth,kbarHeight);
			savedThis.context.beginPath();
			savedThis.context.strokeStyle="black";
			savedThis.context.lineWidth=1;
			savedThis.context.strokeRect(xPos,yPos,savedThis.barWidth,kbarHeight);
		}
	}

	/* 函式 drawVolumeGraphics 負責畫出成交量圖 */

	function drawVolumeGraphics() {
		var top=savedThis.volTop;
		var left=savedThis.volLeft;
		var width=savedThis.volWidth;
		var height=savedThis.volHeight;
		
		/* 畫出外框 */
		savedThis.context.strokeStyle="#666666";
		savedThis.context.lineWidth=1;
		savedThis.context.strokeRect(left,top,width,height);

		/* 畫出橫座標軸，等分成5等分 */
		var yDiff=5;
		var ySpace=height/yDiff;				// 每條格線的距離
		for (var i=1;i<yDiff;i++) {
			var yPos=top+height-i*ySpace;			// 格線的 y 座標值
			savedThis.context.beginPath();
			savedThis.context.strokeStyle="#aaaaaa";
			savedThis.context.lineWidth=1;
			savedThis.context.moveTo(left,yPos);
			savedThis.context.lineTo(left+width,yPos);
			savedThis.context.stroke();
		}

		/* 用 filltext 畫出橫座標的值 */
		var yValueDiff=(savedThis.volMaxValue-savedThis.volMinValue)/yDiff;
		for (var i=1;i<=yDiff;i++) {
			var yPos=top+height-i*ySpace;			// 文字的 y 座標值
			var yValue=savedThis.volMinValue+i*yValueDiff;	// 文字的數值
			savedThis.context.beginPath();
			savedThis.context.font="10px Arial"; 
			savedThis.context.fillStyle="#666666";
			savedThis.context.textAlign="left";
			savedThis.context.textBaseline="middle";
			savedThis.context.fillText(yValue.toFixed(0),left+width+5,yPos);
			savedThis.context.stroke();
		}

		/* 用 filltext 畫出橫座標的單位 */
		var yPos=top+height-(yDiff+1)*ySpace;			// 文字的 y 座標值
		savedThis.context.beginPath();
		savedThis.context.font="10px Arial"; 
		savedThis.context.fillStyle="#666666";
		savedThis.context.textAlign="left";
		savedThis.context.textBaseline="middle";
		if (savedThis.companyId=="%23001") {
			savedThis.context.fillText("單位：億",left+width+5,yPos);
		} else {
			savedThis.context.fillText("單位：張",left+width+5,yPos);
		}
		savedThis.context.stroke();

		/* 畫出所有成交量棒 */
		for (var i=savedThis.barStartIndex;i<=savedThis.barEndIndex;i++) {
			var oneObject=savedThis.companyHistoryObject.historyDataArray[i];
			var close=oneObject.close;
			var prevClose;
			var volume=oneObject.volume;
			if (i>0) {
				prevClose=savedThis.companyHistoryObject.historyDataArray[i-1].close;
			} else {
				prevClose=0;				// 沒有前一天的收盤價
			}
			var color;					// 成交量的顏色

			/* 決定 yValue, color 的值 */
			if (close>prevClose) {		
				/* 收盤上漲，故顏色為紅色 */		
				color="red";
			} else if (close<prevClose) {
				/*  收盤下跌，故顏色為綠色 */
				color="green";
			} else {
				/* 收盤價不變，顏色為黑色 */
				color="black";
			}

			/* 計算出成交量棒子左上角的座標值 */
			var xPos=(left+width)-(savedThis.barEndIndex-i+1)*(savedThis.barWidth+KBAR_SPACING);	
			var yPos=(top+height)-
				savedThis.volHeight*(volume-savedThis.volMinValue)/
				(savedThis.volMaxValue-savedThis.volMinValue);

			/* 計算出成交量棒的高度 */
			var volHeight=(top+height)-yPos;
			if (volHeight<1) {
				volHeight=1;				// 成交量棒至少一條線
			}
			volHeight=floatToInt(volHeight);

			/* 畫出一個成交量棒 */
			savedThis.context.beginPath();
			savedThis.context.fillStyle=color;
			savedThis.context.fillRect(xPos,yPos,savedThis.barWidth,volHeight);
			savedThis.context.beginPath();
			savedThis.context.strokeStyle="black";
			savedThis.context.lineWidth=1;
			savedThis.context.strokeRect(xPos,yPos,savedThis.barWidth,volHeight);
		}
	}

	/* 函式 drawMaGraphics 負責畫出均線圖，傳入的參數 N
	 * 是表示要畫 N 天的平均線圖， color 則是畫線的顏色。
	 */

	function drawMaGraphics(N,color) {
		var top=savedThis.kbarTop;
		var left=savedThis.kbarLeft;
		var width=savedThis.kbarWidth;
		var height=savedThis.kbarHeight;
		var maArray;

		/* 根據輸入的變數 N 決定要畫的均值陣列是那一個 */

		if (N==5) {
			maArray=savedThis.ma5;
		} else if (N==20) {
			maArray=savedThis.ma20;
		} else if (N==60) {
			maArray=savedThis.ma60;
		} else {
			/* N 錯誤，不畫線，直接返回呼叫程式。
			 * 理論上不可能執行到這裡，因為寫這個
			 * 程式的人不會不知道只有 ma5, ma20
			 * 和 ma60，但是接手維護程式的人卻不
			 * 見得會知道，也可能不小心打錯 N 值
			 * ，所以加上這段程式可以避開可能的
			 * 當掉問題。
			 */
			return;
		}
				
		/* 畫出均線 */

		for (var i=(savedThis.barStartIndex+1);i<=savedThis.barEndIndex;i++) {
			if (i>N) {
				/* i>N 時 ma[i] 才有平均值，否則其中內容是 NaN，
				 * i==N 時，因為前一點是 NaN，無法畫線，故從
				 * i>N 開始畫線。
				 * 畫線的方法是由 index 是 i-1 的 ma 值畫到 index 
				 * 是 i 的 ma 值。
				 */

				/* 根據 index 是 i-1 的 ma 值算出在畫布上的 (x,y) 座標值 */
				var xPos1=(left+width)-(savedThis.barEndIndex-(i-1)+1)*(savedThis.barWidth+KBAR_SPACING)+savedThis.barOneSideWidth;	
				var yPos1=(top+height)-
				savedThis.kbarHeight*(maArray[i-1]-savedThis.barMinValue)/
				(savedThis.barMaxValue-savedThis.barMinValue);

				/* 根據 index 是 i 的 ma 值算出在畫布上的 (x,y) 座標值 */
				var xPos2=(left+width)-(savedThis.barEndIndex-i+1)*(savedThis.barWidth+KBAR_SPACING)+savedThis.barOneSideWidth;	
				var yPos2=(top+height)-
				savedThis.kbarHeight*(maArray[i]-savedThis.barMinValue)/
				(savedThis.barMaxValue-savedThis.barMinValue);

				savedThis.context.beginPath();
				savedThis.context.strokeStyle=color;
				savedThis.context.lineWidth=1;
				savedThis.context.moveTo(xPos1,yPos1);
				savedThis.context.lineTo(xPos2,yPos2);
				savedThis.context.stroke();
			}
		}
	}

	/* 函式 drawValueText 用來畫出目前游標位置的歷史資訊值 */

	function drawValueText() {
		
		if (savedThis.msgIndex<0) {
			return;
		}

		/* 算出顯示資料的位置 */

		var yPos=savedThis.valueMsgTop+5;
		var xPos=savedThis.valueMsgLeft;
	
		/* 找出歷史資訊的值 */

		var oneObject=savedThis.companyHistoryObject.historyDataArray[savedThis.msgIndex];
		var time=oneObject.time;
		var high=oneObject.high;
		var low=oneObject.low;
		var open=oneObject.open;
		var close=oneObject.close;
		var volume=oneObject.volume;

		/* 決定當日上漲或下跌數值 */

		var riseOrDown;
		if (savedThis.msgIndex>0) {
			/* 必須要有前一筆記錄才能決定當日的漲或下跌數值 */
			var prevClose=savedThis.companyHistoryObject.historyDataArray[savedThis.msgIndex-1].close;
			if (prevClose<close) {
				riseOrDown="上漲："+(close-prevClose).toFixed(2);
			} else if (prevClose>close) {
				riseOrDown="下跌："+(prevClose-close).toFixed(2);
			} else {
				riseOrDown="漲跌：-";
			}
		} else {
			/* 第0筆資料，沒有前一天的記錄，沒有漲跌 */
			riseOrDown="漲跌：-";
		}

		var text;
		if (savedThis.companyId=="%23001") {
			text=time+"  開："+open+"  高："+high+"  低："+low+"  收："+close+"  量："+volume+" 億  "+riseOrDown;
		} else {
			text=time+"  開："+open+"  高："+high+"  低："+low+"  收："+close+"  量："+volume+" 張  "+riseOrDown;
		}

		/* 畫出歷史資訊數值 */

		savedThis.context.beginPath();
		savedThis.context.font="10px Arial"; 
		savedThis.context.fillStyle="black";
		savedThis.context.textAlign="left";
		savedThis.context.textBaseline="top";
		savedThis.context.fillText(text,xPos,yPos);
		savedThis.context.stroke();
	}

	/* 函式 drawMaText 用來畫出目前游標位置的 MA 資訊值 */

	function drawMaText() {

		if (savedThis.msgIndex<0) {
			return;
		}

		var yPos=savedThis.maMsgTop;
		var xPos=savedThis.maMsgLeft;

		/* 以下的程式碼事實上有重複出現的情形，留給初學者
		 * 做練習，將重複的部份改成函式來呼叫。
		 */

		/* 畫出 MA5 字樣 */

		savedThis.context.beginPath();
		savedThis.context.font="10px Arial"; 
		savedThis.context.fillStyle="blue";
		savedThis.context.textAlign="left";
		savedThis.context.textBaseline="top";
		savedThis.context.fillText("MA5",xPos,yPos);
		savedThis.context.stroke();

		/* 畫出 MA5 數值 */

		savedThis.context.beginPath();
		savedThis.context.font="10px Arial"; 
		savedThis.context.fillStyle="black";
		savedThis.context.textAlign="left";
		savedThis.context.textBaseline="top";
		if (savedThis.msgIndex>=5) {
			savedThis.context.fillText(savedThis.ma5[savedThis.msgIndex].toFixed(2),xPos+30,yPos);
		} else {
			savedThis.context.fillText("-",xPos+30,yPos);
		}
		savedThis.context.stroke();

		/* 判斷當日 MA5 是上升或下降 */

		var ma5UpOrDown=0;			// 0 表示持平
		if (savedThis.msgIndex>6) {
			if (savedThis.ma5[savedThis.msgIndex]>savedThis.ma5[savedThis.msgIndex-1]) {
				ma5UpOrDown=1;		// 1 表示上升
			} else if (savedThis.ma5[savedThis.msgIndex]<savedThis.ma5[savedThis.msgIndex-1]) {
				ma5UpOrDown=-1;		// -1 表示下降
			} 
		}
		
		/* 畫出 MA5 上升或下降圖形 */

		savedThis.context.beginPath();
		savedThis.context.font="10px Arial"; 
		savedThis.context.textAlign="left";
		savedThis.context.textBaseline="top";
		if (ma5UpOrDown>0) {
			savedThis.context.fillStyle="red";
			savedThis.context.fillText("▲",xPos+80,yPos);
		} else if (ma5UpOrDown<0) {
			savedThis.context.fillStyle="green";
			savedThis.context.fillText("▼",xPos+80,yPos);
		}
		savedThis.context.stroke();

		/* 畫出 MA20 字樣 */

		savedThis.context.beginPath();
		savedThis.context.font="10px Arial"; 
		savedThis.context.fillStyle="orange";
		savedThis.context.textAlign="left";
		savedThis.context.textBaseline="top";
		savedThis.context.fillText("MA20",xPos+120,yPos);
		savedThis.context.stroke();

		/* 畫出 MA20 數值 */

		savedThis.context.beginPath();
		savedThis.context.font="10px Arial"; 
		savedThis.context.fillStyle="black";
		savedThis.context.textAlign="left";
		savedThis.context.textBaseline="top";
		if (savedThis.msgIndex>=20) {
			savedThis.context.fillText(savedThis.ma20[savedThis.msgIndex].toFixed(2),xPos+160,yPos);
		} else {
			savedThis.context.fillText("-",xPos+160,yPos);
		}
		savedThis.context.stroke();

		/* 判斷當日 MA20 是上升或下降 */

		var ma20UpOrDown=0;			// 0 表示持平
		if (savedThis.msgIndex>21) {
			if (savedThis.ma20[savedThis.msgIndex]>savedThis.ma20[savedThis.msgIndex-1]) {
				ma20UpOrDown=1;		// 1 表示上升
			} else if (savedThis.ma20[savedThis.msgIndex]<savedThis.ma20[savedThis.msgIndex-1]) {
				ma20UpOrDown=-1;		// -1 表示下降
			} 
		}
		
		/* 畫出 MA20 上升或下降圖形 */

		savedThis.context.beginPath();
		savedThis.context.font="10px Arial"; 
		savedThis.context.textAlign="left";
		savedThis.context.textBaseline="top";
		if (ma20UpOrDown>0) {
			savedThis.context.fillStyle="red";
			savedThis.context.fillText("▲",xPos+210,yPos);
		} else if (ma20UpOrDown<0) {
			savedThis.context.fillStyle="green";
			savedThis.context.fillText("▼",xPos+210,yPos);
		}
		savedThis.context.stroke();

		/* 畫出 MA60 字樣 */

		savedThis.context.beginPath();
		savedThis.context.font="10px Arial"; 
		savedThis.context.fillStyle="green";
		savedThis.context.textAlign="left";
		savedThis.context.textBaseline="top";
		savedThis.context.fillText("MA60",xPos+240,yPos);
		savedThis.context.stroke();

		/* 畫出 MA60 數值 */

		savedThis.context.beginPath();
		savedThis.context.font="10px Arial"; 
		savedThis.context.fillStyle="black";
		savedThis.context.textAlign="left";
		savedThis.context.textBaseline="top";
		if (savedThis.msgIndex>=60) {
			savedThis.context.fillText(savedThis.ma60[savedThis.msgIndex].toFixed(2),xPos+280,yPos);
		} else {
			savedThis.context.fillText("-",xPos+280,yPos);
		}
		savedThis.context.stroke();

		/* 判斷當日 MA60 是上升或下降 */

		var ma60UpOrDown=0;			// 0 表示持平
		if (savedThis.msgIndex>61) {
			if (savedThis.ma60[savedThis.msgIndex]>savedThis.ma60[savedThis.msgIndex-1]) {
				ma60UpOrDown=1;		// 1 表示上升
			} else if (savedThis.ma60[savedThis.msgIndex]<savedThis.ma60[savedThis.msgIndex-1]) {
				ma60UpOrDown=-1;		// -1 表示下降
			} 
		}
		
		/* 畫出 MA60 上升或下降圖形 */

		savedThis.context.beginPath();
		savedThis.context.font="10px Arial"; 
		savedThis.context.textAlign="left";
		savedThis.context.textBaseline="top";
		if (ma60UpOrDown>0) {
			savedThis.context.fillStyle="red";
			savedThis.context.fillText("▲",xPos+330,yPos);
		} else if (ma60UpOrDown<0) {
			savedThis.context.fillStyle="green";
			savedThis.context.fillText("▼",xPos+330,yPos);
		}
		savedThis.context.stroke();

	}

	/* 函式 drawClosePrice 用來畫出目前游標位置的當日收盤價交叉線 */

	function drawClosePriceAndVolume() {
		if (savedThis.msgIndex<savedThis.barStartIndex) {
			return;
		}
		var closeTop=savedThis.kbarTop;
		var closeLeft=savedThis.kbarLeft;
		var closeWidth=savedThis.kbarWidth;
		var closeHeight=savedThis.kbarHeight;
		var oneObject=savedThis.companyHistoryObject.historyDataArray[savedThis.msgIndex];
		var close=oneObject.close;
		var volume=oneObject.volume;
		var time=oneObject.time;

		/* 計算出目前游標位置收盤價交叉線的座標值 */

		var xPos=(closeLeft+closeWidth)-(savedThis.barEndIndex-savedThis.msgIndex+1)*	
			(savedThis.barWidth+KBAR_SPACING)+
			savedThis.barOneSideWidth+savedThis.barStickWidth/2;
		var yPos=(closeTop+closeHeight)-
			savedThis.kbarHeight*(close-savedThis.barMinValue)/
			(savedThis.barMaxValue-savedThis.barMinValue);

		/* 畫出目前游標位置收盤價交叉線 */

		savedThis.context.beginPath();
		savedThis.context.strokeStyle="#2277FF";
		savedThis.context.lineWidth=1;
		savedThis.context.moveTo(closeLeft,yPos);
		savedThis.context.lineTo(closeLeft+closeWidth,yPos);
		savedThis.context.stroke();
		savedThis.context.beginPath();
		savedThis.context.strokeStyle="#2277FF";
		savedThis.context.lineWidth=1;
		savedThis.context.moveTo(xPos,closeTop);
		savedThis.context.lineTo(xPos,closeTop+closeHeight);
		savedThis.context.stroke();

		/* 畫出目前游標位置收盤價的數值 */

		savedThis.context.beginPath();			// 先畫反白區域
		savedThis.context.fillStyle="#2277FF";
		savedThis.context.fillRect(closeLeft+closeWidth,yPos-7,50,14);

		savedThis.context.beginPath();			// 再顯示白色文字
		savedThis.context.font="10px Arial"; 
		savedThis.context.fillStyle="white";
		savedThis.context.textAlign="center";
		savedThis.context.textBaseline="middle";
		savedThis.context.fillText(close,closeLeft+closeWidth+25,yPos);
		savedThis.context.stroke();

		/* 計算出目前游標位置成交量交叉線的座標值 */
		var volTop=savedThis.volTop;
		var volLeft=savedThis.volLeft;
		var volWidth=savedThis.volWidth;
		var volHeight=savedThis.volHeight;

		xPos=(volLeft+volWidth)-(savedThis.barEndIndex-savedThis.msgIndex+1)*	
			(savedThis.barWidth+KBAR_SPACING)+
			savedThis.barOneSideWidth+savedThis.barStickWidth/2;
		yPos=(volTop+volHeight)-
			savedThis.volHeight*(volume-savedThis.volMinValue)/
			(savedThis.volMaxValue-savedThis.volMinValue);

		/* 畫出目前游標位置成交量交叉線 */

		savedThis.context.beginPath();
		savedThis.context.strokeStyle="#2277FF";
		savedThis.context.lineWidth=1;
		savedThis.context.moveTo(volLeft,yPos);
		savedThis.context.lineTo(volLeft+volWidth,yPos);
		savedThis.context.stroke();
		savedThis.context.beginPath();
		savedThis.context.strokeStyle="#2277FF";
		savedThis.context.lineWidth=1;
		savedThis.context.moveTo(xPos,volTop);
		savedThis.context.lineTo(xPos,volTop+volHeight);
		savedThis.context.stroke();

		/* 畫出目前游標位置成交量的數值 */

		savedThis.context.beginPath();			// 先畫反白區域
		savedThis.context.fillStyle="#2277FF";
		savedThis.context.fillRect(volLeft+volWidth,yPos-7,50,14);

		savedThis.context.beginPath();			// 再顯示白色文字
		savedThis.context.font="10px Arial"; 
		savedThis.context.fillStyle="white";
		savedThis.context.textAlign="center";
		savedThis.context.textBaseline="middle";
		savedThis.context.fillText(volume,volLeft+volWidth+25,yPos);
		savedThis.context.stroke();

		/* 在最下面畫出目前游標位置的日期 */
		
		var year=time.substr(0,4);
		var month=time.substr(4,2);
		var day=time.substr(6,2);

		savedThis.context.beginPath();			// 先畫反白區域
		savedThis.context.fillStyle="#2277FF";
		savedThis.context.fillRect(xPos-35,volTop+volHeight,70,14);
		
		savedThis.context.beginPath();			// 再顯示白色文字
		savedThis.context.font="10px Arial"; 
		savedThis.context.fillStyle="white";
		savedThis.context.textAlign="center";
		savedThis.context.textBaseline="middle";
		savedThis.context.fillText(year+"/"+month+"/"+day,xPos,volTop+volHeight+7);
		savedThis.context.stroke();
	}

	/* 函式 drawTrendLine 用來畫出上升或下降趨勢線，
	 * 在還沒有決定趨勢線的二點座標前，此函式用來
	 * 畫出目前位置的最高或最低點股價，分別用一個
	 * 小的或綠色圓圈代表。
	 * 在此函式中會用到的屬性如下：
	 *	this.upTrend	如果是 true 表示有上升趨勢線
	 *	this.downTrend	如果是 true 表示有下降趨勢線
	 *	this.upIndex1	是上升趨勢線的第一點 index 
	 *	this.upIndex2	是上升趨勢線的第二點 index 
	 *	this.downIndex1	是下降趨勢線的第一點 index 
	 *	this.downIndex2	是下降趨勢線的第二點 index 
	 * 上述 index 是指 companyHistoryObject.historyDataArray
	 * 陣列中的索引值。upIndex1、upIndex2、downIndex1、
	 * downIndex2 初始是 -1，必須經過使用者的點選後才會
	 * 有記錄 index 值。
	 */

	function drawTrendLine() {
		var top=savedThis.kbarTop;
		var left=savedThis.kbarLeft;
		var width=savedThis.kbarWidth;
		var height=savedThis.kbarHeight;
		var oneObject=savedThis.companyHistoryObject.historyDataArray[savedThis.msgIndex];
		var high=oneObject.high;
		var low=oneObject.low;
		var color;
		var xPos;
		var yPos;

		savedThis.context.beginPath();
		savedThis.context.lineWidth=3;
		if (savedThis.upTrend==true) {
			/* 有上升趨勢線 */
			savedThis.context.strokeStyle="green";
			if (savedThis.upIndex1==-1) {
				/* 正在選取第一點 */
				xPos=(left+width)-(savedThis.barEndIndex-savedThis.msgIndex+1)*	
					(savedThis.barWidth+KBAR_SPACING)+
					savedThis.barOneSideWidth+savedThis.barStickWidth/2;
				yPos=(top+height)-
					height*(low-savedThis.barMinValue)/
					(savedThis.barMaxValue-savedThis.barMinValue);
				savedThis.context.arc(
					xPos,	
					yPos,
					3,
					0,
					2*Math.PI
				);
				savedThis.context.stroke();
			} else if (savedThis.upIndex2==-1) {
				/* 在選取的第一點先畫一個小圓 */
				xPos=(left+width)-(savedThis.barEndIndex-savedThis.upIndex1+1)*	
					(savedThis.barWidth+KBAR_SPACING)+
					savedThis.barOneSideWidth+savedThis.barStickWidth/2;
				yPos=(top+height)-height*
					(savedThis.companyHistoryObject.historyDataArray[savedThis.upIndex1].low
					-savedThis.barMinValue)/(savedThis.barMaxValue-savedThis.barMinValue);
				savedThis.context.arc(
					xPos,	
					yPos,
					3,
					0,
					2*Math.PI
				);
				savedThis.context.stroke();
				/* 保存第一點座標值 */
				var xPos1=xPos;
				var yPos1=yPos;
				/* 正在選取第二點 */
				savedThis.context.beginPath();
				xPos=(left+width)-(savedThis.barEndIndex-savedThis.msgIndex+1)*	
					(savedThis.barWidth+KBAR_SPACING)+
					savedThis.barOneSideWidth+savedThis.barStickWidth/2;
				yPos=(top+height)-
					height*(low-savedThis.barMinValue)/
					(savedThis.barMaxValue-savedThis.barMinValue);
				savedThis.context.arc(
					xPos,	
					yPos,
					3,
					0,
					2*Math.PI
				);
				savedThis.context.stroke();
				/* 保存第二點座標值 */
				var xPos2=xPos;
				var yPos2=yPos;
				/* 在第一點及第二點間畫一直線，直線要畫到圖框邊緣 */
				var newX1=xPos1+(top-yPos1)*(xPos2-xPos1)/(yPos2-yPos1);
				var newY1=top;
				var newX2=xPos1+(top+height-yPos1)*(xPos2-xPos1)/(yPos2-yPos1);
				var newY2=top+height;
				/* 在此不檢查 newX1 及 newX2 是否出圖框左右，
				 * newY1 及 newY2 一定會在圖框中，如果你想要
				 * 讓直線保持在圖框中，請在此加入程式檢查 
				 * newX1 及 newX2，並且加以修正。
				 */
				savedThis.context.beginPath();
				savedThis.context.lineWidth=1;
				savedThis.context.moveTo(newX1,newY1);
				savedThis.context.lineTo(newX2,newY2);
				savedThis.context.stroke();
			} else {
				/* 已選完二點 */ 
				/* 在選取的第一點畫一個小圓 */
				xPos=(left+width)-(savedThis.barEndIndex-savedThis.upIndex1+1)*	
					(savedThis.barWidth+KBAR_SPACING)+
					savedThis.barOneSideWidth+savedThis.barStickWidth/2;
				yPos=(top+height)-height*
					(savedThis.companyHistoryObject.historyDataArray[savedThis.upIndex1].low
					-savedThis.barMinValue)/(savedThis.barMaxValue-savedThis.barMinValue);
				savedThis.context.arc(
					xPos,	
					yPos,
					3,
					0,
					2*Math.PI
				);
				savedThis.context.stroke();
				/* 保存第一點座標值 */
				var xPos1=xPos;
				var yPos1=yPos;
				/* 在選取的第二點畫一個小圓 */
				savedThis.context.beginPath();
				xPos=(left+width)-(savedThis.barEndIndex-savedThis.upIndex2+1)*	
					(savedThis.barWidth+KBAR_SPACING)+
					savedThis.barOneSideWidth+savedThis.barStickWidth/2;
				yPos=(top+height)-height*
					(savedThis.companyHistoryObject.historyDataArray[savedThis.upIndex2].low
					-savedThis.barMinValue)/(savedThis.barMaxValue-savedThis.barMinValue);
				savedThis.context.arc(
					xPos,	
					yPos,
					3,
					0,
					2*Math.PI
				);
				savedThis.context.stroke();
				/* 保存第二點座標值 */
				var xPos2=xPos;
				var yPos2=yPos;
				/* 在第一點及第二點間畫一直線，直線要畫到圖框邊緣 */
				var newX1=xPos1+(top-yPos1)*(xPos2-xPos1)/(yPos2-yPos1);
				var newY1=top;
				var newX2=xPos1+(top+height-yPos1)*(xPos2-xPos1)/(yPos2-yPos1);
				var newY2=top+height;
				/* 在此不檢查 newX1 及 newX2 是否出圖框左右，
				 * newY1 及 newY2 一定會在圖框中，如果你想要
				 * 讓直線保持在圖框中，請在此加入程式檢查 
				 * newX1 及 newX2，並且加以修正。
				 */
				savedThis.context.beginPath();
				savedThis.context.lineWidth=1;
				savedThis.context.moveTo(newX1,newY1);
				savedThis.context.lineTo(newX2,newY2);
				savedThis.context.stroke();
				/* 決定目前游標位置的支撐股價 */
				xPos=(left+width)-(savedThis.barEndIndex-savedThis.msgIndex+1)*	
					(savedThis.barWidth+KBAR_SPACING)+
					savedThis.barOneSideWidth+savedThis.barStickWidth/2;
				var support=savedThis.companyHistoryObject.historyDataArray[savedThis.upIndex1].low+
					(savedThis.companyHistoryObject.historyDataArray[savedThis.upIndex2].low-
					savedThis.companyHistoryObject.historyDataArray[savedThis.upIndex1].low)*
					(xPos-xPos1)/(xPos2-xPos1);
				/* 在目前游標位置畫出支撐值 */
				xPos=(left+width)-(savedThis.barEndIndex-savedThis.msgIndex+1)*	
					(savedThis.barWidth+KBAR_SPACING)+
					savedThis.barOneSideWidth+savedThis.barStickWidth/2;
				yPos=(top+height)-
					height*(support-savedThis.barMinValue)/
					(savedThis.barMaxValue-savedThis.barMinValue);
				/* 如果游標位置在圖框中才畫出支撐值 */
				if ((xPos>=left)&&(xPos<=(left+width))&&(yPos>=top)&&(yPos<=(top+height))) {
					savedThis.context.beginPath();
					savedThis.context.fillStyle="black";
					savedThis.context.fillRect(xPos-25,yPos-7,50,14);
					savedThis.context.beginPath();
					savedThis.context.font="10px Arial"; 
					savedThis.context.fillStyle="white";
					savedThis.context.textAlign="center";
					savedThis.context.textBaseline="middle";
					savedThis.context.fillText(support.toFixed(2),xPos,yPos);
					savedThis.context.stroke();
				}
			}
		} else {
			/* 有下降趨勢線 */
			savedThis.context.strokeStyle="red";
			if (savedThis.downIndex1==-1) {
				/* 正在選取第一點 */
				xPos=(left+width)-(savedThis.barEndIndex-savedThis.msgIndex+1)*	
					(savedThis.barWidth+KBAR_SPACING)+
					savedThis.barOneSideWidth+savedThis.barStickWidth/2;
				yPos=(top+height)-
					height*(high-savedThis.barMinValue)/
					(savedThis.barMaxValue-savedThis.barMinValue);
				savedThis.context.arc(
					xPos,	
					yPos,
					3,
					0,
					2*Math.PI
				);
				savedThis.context.stroke();
			} else if (savedThis.downIndex2==-1) {
				/* 在選取的第一點先畫一個小圓 */
				xPos=(left+width)-(savedThis.barEndIndex-savedThis.downIndex1+1)*	
					(savedThis.barWidth+KBAR_SPACING)+
					savedThis.barOneSideWidth+savedThis.barStickWidth/2;
				yPos=(top+height)-height*
					(savedThis.companyHistoryObject.historyDataArray[savedThis.downIndex1].high
					-savedThis.barMinValue)/(savedThis.barMaxValue-savedThis.barMinValue);
				savedThis.context.arc(
					xPos,	
					yPos,
					3,
					0,
					2*Math.PI
				);
				savedThis.context.stroke();
				/* 保存第一點座標值 */
				var xPos1=xPos;
				var yPos1=yPos;
				/* 正在選取第二點 */
				savedThis.context.beginPath();
				xPos=(left+width)-(savedThis.barEndIndex-savedThis.msgIndex+1)*	
					(savedThis.barWidth+KBAR_SPACING)+
					savedThis.barOneSideWidth+savedThis.barStickWidth/2;
				yPos=(top+height)-
					height*(high-savedThis.barMinValue)/
					(savedThis.barMaxValue-savedThis.barMinValue);
				savedThis.context.arc(
					xPos,	
					yPos,
					3,
					0,
					2*Math.PI
				);
				savedThis.context.stroke();
				/* 保存第二點座標值 */
				var xPos2=xPos;
				var yPos2=yPos;
				/* 在第一點及第二點間畫一直線，直線要畫到圖框邊緣 */
				var newX1=xPos1+(top-yPos1)*(xPos2-xPos1)/(yPos2-yPos1);
				var newY1=top;
				var newX2=xPos1+(top+height-yPos1)*(xPos2-xPos1)/(yPos2-yPos1);
				var newY2=top+height;
				/* 在此不檢查 newX1 及 newX2 是否出圖框左右，
				 * newY1 及 newY2 一定會在圖框中，如果你想要
				 * 讓直線保持在圖框中，請在此加入程式檢查 
				 * newX1 及 newX2，並且加以修正。
				 */
				savedThis.context.beginPath();
				savedThis.context.lineWidth=1;
				savedThis.context.moveTo(newX1,newY1);
				savedThis.context.lineTo(newX2,newY2);
				savedThis.context.stroke();
			} else {
				/* 已選完二點 */ 
				/* 在選取的第一點畫一個小圓 */
				xPos=(left+width)-(savedThis.barEndIndex-savedThis.downIndex1+1)*	
					(savedThis.barWidth+KBAR_SPACING)+
					savedThis.barOneSideWidth+savedThis.barStickWidth/2;
				yPos=(top+height)-height*
					(savedThis.companyHistoryObject.historyDataArray[savedThis.downIndex1].high
					-savedThis.barMinValue)/(savedThis.barMaxValue-savedThis.barMinValue);
				savedThis.context.arc(
					xPos,	
					yPos,
					3,
					0,
					2*Math.PI
				);
				savedThis.context.stroke();
				/* 保存第一點座標值 */
				var xPos1=xPos;
				var yPos1=yPos;
				/* 在選取的第二點畫一個小圓 */
				savedThis.context.beginPath();
				xPos=(left+width)-(savedThis.barEndIndex-savedThis.downIndex2+1)*	
					(savedThis.barWidth+KBAR_SPACING)+
					savedThis.barOneSideWidth+savedThis.barStickWidth/2;
				yPos=(top+height)-height*
					(savedThis.companyHistoryObject.historyDataArray[savedThis.downIndex2].high
					-savedThis.barMinValue)/(savedThis.barMaxValue-savedThis.barMinValue);
				savedThis.context.arc(
					xPos,	
					yPos,
					3,
					0,
					2*Math.PI
				);
				savedThis.context.stroke();
				/* 保存第二點座標值 */
				var xPos2=xPos;
				var yPos2=yPos;
				/* 在第一點及第二點間畫一直線，直線要畫到圖框邊緣 */
				var newX1=xPos1+(top-yPos1)*(xPos2-xPos1)/(yPos2-yPos1);
				var newY1=top;
				var newX2=xPos1+(top+height-yPos1)*(xPos2-xPos1)/(yPos2-yPos1);
				var newY2=top+height;
				/* 在此不檢查 newX1 及 newX2 是否出圖框左右，
				 * newY1 及 newY2 一定會在圖框中，如果你想要
				 * 讓直線保持在圖框中，請在此加入程式檢查 
				 * newX1 及 newX2，並且加以修正。
				 */
				savedThis.context.beginPath();
				savedThis.context.lineWidth=1;
				savedThis.context.moveTo(newX1,newY1);
				savedThis.context.lineTo(newX2,newY2);
				savedThis.context.stroke();
				/* 決定目前游標位置的壓力股價 */
				xPos=(left+width)-(savedThis.barEndIndex-savedThis.msgIndex+1)*	
					(savedThis.barWidth+KBAR_SPACING)+
					savedThis.barOneSideWidth+savedThis.barStickWidth/2;
				var resistance=savedThis.companyHistoryObject.historyDataArray[savedThis.downIndex1].high+
					(savedThis.companyHistoryObject.historyDataArray[savedThis.downIndex2].high-
					savedThis.companyHistoryObject.historyDataArray[savedThis.downIndex1].high)*
					(xPos-xPos1)/(xPos2-xPos1);
				/* 在目前游標位置畫出支撐值 */
				xPos=(left+width)-(savedThis.barEndIndex-savedThis.msgIndex+1)*	
					(savedThis.barWidth+KBAR_SPACING)+
					savedThis.barOneSideWidth+savedThis.barStickWidth/2;
				yPos=(top+height)-
					height*(resistance-savedThis.barMinValue)/
					(savedThis.barMaxValue-savedThis.barMinValue);
				/* 如果游標位置在圖框中才畫出支撐值 */
				if ((xPos>=left)&&(xPos<=(left+width))&&(yPos>=top)&&(yPos<=(top+height))) {
					savedThis.context.beginPath();
					savedThis.context.fillStyle="black";
					savedThis.context.fillRect(xPos-25,yPos-7,50,14);
					savedThis.context.beginPath();
					savedThis.context.font="10px Arial"; 
					savedThis.context.fillStyle="white";
					savedThis.context.textAlign="center";
					savedThis.context.textBaseline="middle";
					savedThis.context.fillText(resistance.toFixed(2),xPos,yPos);
					savedThis.context.stroke();
				}
			}
		}
	}

	/* 函式 drawPattern 負責畫出符合某種 K 線形式的編號值 */

	function drawPattern() {
		var top=savedThis.volMsgTop;
		var left=savedThis.volMsgLeft;
		var width=savedThis.kbarWidth;

		for (var i=(savedThis.barStartIndex+1);i<=savedThis.barEndIndex;i++) {
			var patternType=savedThis.patternTypeArray[i];
			if (patternType!=-1) {
				/* 如果 patternType 不是 -1，表示符合了某個 K 線
				 * 形態，在該日的 K 線圖和成交量圖的中間畫出該
				 * 形態的值(即書中 1-10 種形態值)。
				 */
				var xPos=(left+width)-(savedThis.barEndIndex-i+1)*	
					(savedThis.barWidth+KBAR_SPACING)+
					savedThis.barOneSideWidth+savedThis.barStickWidth/2;
				var yPos=top;
				savedThis.context.beginPath();

				/* 如果是看漲的形態，則把底色設成紅色，如果是看
				 * 跌的形態，則把底色設成綠色。
				 */

				if ((patternType==1)||(patternType==3)||
				    (patternType==6)||(patternType==7)||
				    (patternType==10)) {
					savedThis.context.fillStyle="green";
				} else {
					savedThis.context.fillStyle="red";
				}

				savedThis.context.fillRect(xPos-10,yPos+3,20,14);
				savedThis.context.beginPath();
				savedThis.context.font="10px Arial"; 
				savedThis.context.fillStyle="white";
				savedThis.context.textAlign="center";
				savedThis.context.textBaseline="middle";
				savedThis.context.fillText(patternType,xPos,yPos+10);
				savedThis.context.stroke();
			}
		}
	}

	/* StockGraphics.prototype.redrawCanvas 方法由此開始 */

	/* 開始繪圖前先計算畫圖時會用到的重要參數 */

	this.calcDrawParameter();

	/* 開始畫 K 線圖、成交量圖及均線圖 */

	clearGraphics();
	drawIcon();
	drawKBarGraphics();
	drawVolumeGraphics();
	drawMaGraphics(5,"blue");
	drawMaGraphics(20,"orange");
	drawMaGraphics(60,"green");
	drawValueText();
	drawMaText();
	drawClosePriceAndVolume();
	if (this.upTrend || this.downTrend) {
		drawTrendLine();
	}
	drawPattern();	

	/* 去掉此處的註解，,可以在游標移動時，看到一些數據 
	showMessage("游標所在位置 index="+this.msgIndex+"\n");
	appendMessage("上影線比例值="+this.kbarPercent[this.msgIndex].topStick.toFixed(1)+"\n");
	appendMessage("主體比例值="+this.kbarPercent[this.msgIndex].body.toFixed(1)+"\n");
	appendMessage("下影線比例值="+this.kbarPercent[this.msgIndex].bottomStick.toFixed(1)+"\n");
	appendMessage("上升計數值="+this.trendCountArray[this.msgIndex].upCount+"\n");
	appendMessage("下降計數值="+this.trendCountArray[this.msgIndex].downCount+"\n");
	appendMessage("K 線形態值="+this.patternTypeArray[this.msgIndex]+"\n");
	*/
};
