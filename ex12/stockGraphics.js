const CANVAS_WIDTH=740;
const CANVAS_HEIGHT=380;

const GRAPH_LEFT=30;		// K �u�Ϥ��U����Z�e�����䪺�Z��
const GRAPH_WIDTH=600;		// K �u�Ϥ��U���󪺼e��
const MSG1_TOP=50;		// �Ĥ@��T����r�Z�e���W�䪺�Z��
const MSG2_TOP=70;		// �ĤG��T����r�Z�e���W�䪺�Z��
const KBAR_TOP=90;		// K �u�϶Z�e���W�䪺�Z��
const KBAR_HEIGHT=180;		// K �u�Ϫ�����
const MSG3_TOP=270;		// �ĤT��T����r�Z�e���W�䪺�Z��
const VOL_TOP=290;		// ����q�϶Z�e���W�䪺�Z��
const VOL_HEIGHT=55;		// ����q�Ϫ�����
const KBAR_SPACING=3;		// �G�� K �Ϊ����Z

/* �N�Ϲ�����m�]���`�ơA���M�o�Ǳ`�ƬO�� const
 * �ӫŧi�A�b��ӵ{�����A���̪��ȱN���|���ܡC
 * �o�Ǳ`�Ʒ|�b��ܹϥܪ� drawIcon �禡���Ψ�A
 * �]�|�b canvas.onmouseup �ƥ�B�z�禡���Ψ�C
 */
	
const ICON_SIZE=30;
const FIRST_ICON_CENTER_XPOS=30;
const FIRST_ICON_CENTER_YPOS=30;

/* �禡 floatToInt �N�ǤJ���Ѽ� x �ন��ƶǦ^ */

function floatToInt(x) {
	var xString=x.toFixed(1);	// �ন 1 ��p�ƪ��r��
	var intX=parseInt(xString);	// �N�r���ন���
	return intX;
}

/* �禡 StockGraphics �O K �u�Ϫ��󪺫غc���C */

function StockGraphics(canvas,width,height,companyHistoryObject) {

	var savedThis=this;

	/* �O�� canvas �Z�������W��Υ��䪺�j�p */

	var canvasTop=canvas.offsetTop;
	var canvasLeft=canvas.offsetLeft;

	function distance(x1,y1,x2,y2) {
		return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));		
	}

	/* �禡 onMouseUp �O canvas ���ƹ����U�ƥ󪺳B�z�禡�C
	 * �D�n�t�d�P�_�O�_�ϥΪ̦b�ϥܤW�����U���ʧ@�A�åB����
	 * �X�O���@�ӹϥܳQ���U�C
	 */

	function onMouseUp(mouseEvent) {

		/* mouseEvent.clientX �O�ƹ����U�ƥ�ɡA�ƹ���m�Z
		 * �������䪺�Z���A��h canvas �����������䪺�Z��
		 * �~�O�ƹ��b canvas ���� X �y�СC
		 * Y �y�Ф]�O�ۦP���D�z�C
		 */

		var mouseX=mouseEvent.clientX-canvasLeft;
		var mouseY=mouseEvent.clientY-canvasTop;
		
		/* �p��ƹ���m�M 4 �ӹϥܤ��ߪ��Z���A���O�O 
		 * 	distance1 �ƹ���ϥܤ@���ߪ��Z��
		 * 	distance2 �ƹ���ϥܤG���ߪ��Z��
		 * 	distance3 �ƹ���ϥܤT���ߪ��Z��
		 * 	distance4 �ƹ���ϥܥ|���ߪ��Z��
		 */

		var distance1=distance(mouseX,mouseY,FIRST_ICON_CENTER_XPOS,FIRST_ICON_CENTER_YPOS);
		var distance2=distance(mouseX,mouseY,FIRST_ICON_CENTER_XPOS+ICON_SIZE,FIRST_ICON_CENTER_YPOS);	
		var distance3=distance(mouseX,mouseY,FIRST_ICON_CENTER_XPOS+2*ICON_SIZE,FIRST_ICON_CENTER_YPOS);
		var distance4=distance(mouseX,mouseY,FIRST_ICON_CENTER_XPOS+3*ICON_SIZE,FIRST_ICON_CENTER_YPOS);
		var distance5=distance(mouseX,mouseY,FIRST_ICON_CENTER_XPOS+4*ICON_SIZE,FIRST_ICON_CENTER_YPOS);
		var distance6=distance(mouseX,mouseY,FIRST_ICON_CENTER_XPOS+5*ICON_SIZE,FIRST_ICON_CENTER_YPOS);
		var circleRadius=ICON_SIZE/2;

		if (distance1<circleRadius) {

			/* �p�G�M�ϥܤ@���߶Z���p���b�|�A��ܬO�b�ϥ�
			 * �@�����U�ƹ��A��j K �u�ϡC 
			 */

			appendMessage("��j K �u��\n");
			savedThis.barOneSideWidth=savedThis.barOneSideWidth*2;
			savedThis.redrawCanvas();
		} else if (distance2<circleRadius) {

			/* �p�G�M�ϥܤG���߶Z���p���b�|�A��ܬO�b�ϥ�
			 * �G�����U�ƹ��A�Y�p K �u�ϡC 
			 */

			appendMessage("�Y�p K �u��\n");
			savedThis.barOneSideWidth=savedThis.barOneSideWidth/2;
			savedThis.redrawCanvas();
		} else if (distance3<circleRadius) {

			/* �p�G�M�ϥܤT���߶Z���p���b�|�A��ܬO�b�ϥ�
			 * �T�����U�ƹ��A���� K �u�Ϯɶ��d��C 
			 */

			appendMessage("���� K �u�Ϯɶ��d��\n");
			savedThis.barEndIndex=savedThis.barEndIndex+savedThis.barNumber/4;
			savedThis.redrawCanvas();
		} else if (distance4<circleRadius) {

			/* �p�G�M�ϥܥ|���߶Z���p���b�|�A��ܬO�b�ϥ�
			 * �|�����U�ƹ��A�k�� K �u�Ϯɶ��d��C 
			 */

			appendMessage("�k�� K �u�Ϯɶ��d��\n");
			savedThis.barEndIndex=savedThis.barEndIndex-savedThis.barNumber/4;
			savedThis.redrawCanvas();
		} else if (distance5<circleRadius) {

			/* �p�G�M�ϥܤ����߶Z���p���b�|�A��ܬO�b�ϥ�
			 * �������U�ƹ��A�W���Ͷսu���q�C 
			 */
			
			if (savedThis.downTrend==false) {
				/* �u�����O�b���q�U���Ͷսu�����ΤU�~����q�W���Ͷսu */
				if (savedThis.upTrend==false) {
					savedThis.upTrend=true;

					/* �ݩ� upIndex1 �� upIndex2 �O�ΨӫO�s�ϥΪ�
					 * �]�w���G�ӤW���Ͷսu���I�� Index�C
					 */

					savedThis.upIndex1=-1;
					savedThis.upIndex2=-1;
					showMessage("�}�l�W���Ͷսu���q\n");
					appendMessage("���I��G�Ӱ��I�A�����̳s���@���W���Ͷսu�C\n");
					appendMessage("�{�b���I��Ĥ@�I�C\n");
				} else {
					savedThis.upTrend=false;
					showMessage("�����W���Ͷսu���q\n");
				}
				savedThis.redrawCanvas();
			}
		} else if (distance6<circleRadius) {

			/* �p�G�M�ϥܤ����߶Z���p���b�|�A��ܬO�b�ϥ�
			 * �������U�ƹ��A�U���Ͷսu���q�C 
			 */

			if (savedThis.upTrend==false) {
				/* �u�����O�b���q�W���Ͷսu�����ΤU�~����q�U���Ͷսu */
				if (savedThis.downTrend==false) {
					savedThis.downTrend=true;

					/* �ݩ� downIndex1 �� downIndex2 �O�ΨӫO�s�ϥΪ�
					 * �]�w���G�ӤU���Ͷսu���I�� Index�C
					 */

					savedThis.downIndex1=-1;
					savedThis.downIndex2=-1;
					showMessage("�}�l�U���Ͷսu���q\n");
					appendMessage("���I��G�ӧC�I�A�����̳s���@���U���Ͷսu�C\n");
					appendMessage("�{�b���I��Ĥ@�I�C\n");
				} else {
					savedThis.downTrend=false;
					showMessage("�����U���Ͷսu���q\n");
				}
				savedThis.redrawCanvas();
			}
		} else if (savedThis.upTrend==true) {
			if (savedThis.upIndex1==-1) {
				showMessage("�w�I��W���Ͷսu�Ĥ@�I�Aindex="+savedThis.msgIndex+"\n");
				appendMessage("���~���I��ĤG�I�C\n");
				savedThis.upIndex1=savedThis.msgIndex;
			} else if (savedThis.upIndex2==-1) {
				showMessage("�w�I��W���Ͷսu�ĤG�I�Aindex="+savedThis.msgIndex+"\n");
				appendMessage("�в��ʴ�д��q���ѻ��伵�ȡC\n");
				savedThis.upIndex2=savedThis.msgIndex;
			}
			savedThis.redrawCanvas();			
		} else if (savedThis.downTrend==true) {
			if (savedThis.downIndex1==-1) {
				showMessage("�w�I��U���Ͷսu�Ĥ@�I�Aindex="+savedThis.msgIndex+"\n");
				appendMessage("���~���I��ĤG�I�C\n");
				savedThis.downIndex1=savedThis.msgIndex;
			} else if (savedThis.downIndex2==-1) {
				showMessage("�w�I��U���Ͷսu�ĤG�I�Aindex="+savedThis.msgIndex+"\n");
				appendMessage("�в��ʴ�д��q���ѻ����O�ȡC\n");
				savedThis.downIndex2=savedThis.msgIndex;			
			}
			savedThis.redrawCanvas();
		}
	}

	/* �禡 onMouseOver �O canvas �B�z�ƹ� onmouseover �ƥ�
	 * ���{���C���禡�D�n�Ψӧ�X�ƹ���m�����v��T�A�����
	 * �Ӹ�T�����L�����ϥΪ̬d�ݡC
	 */

	function onMouseMove(mouseEvent) {

		var width=savedThis.kbarWidth;

		/* mouseEvent.clientX �O�ƹ����U�ƥ�ɡA�ƹ���m�Z
		 * �������䪺�Z���A��h canvas �����������䪺�Z��
		 * �A�A��h K �u�ϥ���� canvas ����ɪ��Z���A�~�O
		 * �ƹ��b k �u�Ϥ��� X �y�СC
		 * Y �y�Ф]�O�ۦP���D�z�C
		 */

		var mouseX=mouseEvent.clientX-canvasLeft-GRAPH_LEFT;
		var mouseY=mouseEvent.clientY-canvasTop-KBAR_TOP;
		var oneBarWidth=savedThis.barWidth+KBAR_SPACING;

		/* �p��ƹ��O�b���v��T�}�C���ĴX�� index */

		var index=savedThis.barEndIndex-floatToInt((width-mouseX)/oneBarWidth);
		savedThis.msgIndex=index;		
		savedThis.redrawCanvas();
	}

	/* �禡 calcMAValue �t�d�p�� N �饭���ȡA�öǦ^�����Ȫ��}�C */

	function calcMAValue(N) {
		/* �p�� N �饭���ȡA�e N �ѨS����k�� N �饭���� */

		var maNArray=[];
		for (var i=0;i<savedThis.companyHistoryObject.historyDataArray.length;i++) {
			var maNValue;
			if (i<N) {
				maNValue=Number.NAN;
			} else {
				maNValue=0;
				/* �[�` companyHistoryObject.historyDataArray[i] ���e N �骺�� */
				for (var k=0;k<N;k++) {
					maNValue=maNValue+
						savedThis.companyHistoryObject.historyDataArray[i-k].close;
				}
				maNValue=maNValue/N;	// �p�⥭����
			}
			maNArray.push(maNValue);
		}

		return maNArray;
	}

	/* �禡 calcKbarPercent �t�d�p��C����v��ƪ��W�v�u�B�D��ΤU�v�u
	 * ����ҭȡC
	 *
	 *	topStickPercent		�W�v�u����ҭ�
	 *	bodyPercent		�D�骺��ҭ�
	 *	bottomStickPercent	�U�v�u����ҭ�
	 *
	 * �W�z�p��X���T�ӭȱN�Φ��@�Ӫ���A�ç�C�Ѫ���ҭȪ��󵲦X���}�C
	 * �A�}�C�j�p�M���v��T�}�C���j�p�@�ˡC
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

			/* ����X�}�L���Φ��L����̸����A�����̳]��
			 * top �ܼơA���C�̳]�� down �ܼơC
			 */
			if (open>close) {
				top=open;
				bottom=close;
			} else {
				top=close;
				bottom=open;
			}

			/* �p�G�̰����γ̧C���ۦP��(�t�ܶ}�L�]����
			 * ���L)�A���ɱN�L�k�p��U�����Ҧ�����ҭȡC
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

			/* �N��X���W�v�u�B�D��ΤU�v�u��ҭȵ��X
			 * ������A�å� push ��k��J�� kbarPercentArray
			 * �}�C���C
			 */
			kbarPercentArray.push({
				"topStick":topStickPercent,
				"body":bodyPercent,
				"bottomStick":bottomStickPercent
			});
		}

		return kbarPercentArray;
	}

	/* �禡 calcTrendCount �t�d�p��C�骺�Ͷխp�ƭȡA�Ͷխp�ƭ�
	 * �D�n�O�ھ� MA10 ���ȧP�_���O�W�ɩΤU���A�åB�p���餧�e
	 * �P�ˬO�W�ɩΤU�����ѼơC�Y���O�W�ɥB�e�@�Ѥ]�O�W�ɡA�h
	 * ��骺�W�ɭp�ƭȬO�e�@�Ѫ��W�ɭp�ƭȥ[1�C�p�G���O�W�ɡA
	 * ���e�@�ѬO�U���A�h��ܷ��O���A�W�ɭp�ƭ��k0�A�U���p��
	 * �ȫh�]��1�C��鬰�U���ɡA�h�޿�M�e�ۤϡC
	 * ���禡�N���C��p��X�U�C�G�ȡG
	 *
	 *	upCount		�N���骺�W�ɭp�ƭ�
	 *	downCount	�N���骺�U���p�ƭ�
	 *
	 * �C�骺�G�ӭp�Ƶ��X���@�Ӫ���A�ñN�������J�� trendCountArray
	 * �}�C���C�禡�����ɶǦ^���@�}�C�C
	 */

	function calcTrendCount() {
		var trendCountArray=[];
		var prevMa10;
		var ma10;
		var upCount;
		var downCount;

		/* �e��10�ѨS�� MA10 ���ȡA��11�Ѥ]�]���e�@�ѨS�� MA11 
		 * �ȡA�ҥH�p�ƭȳ��]��0�C 
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
		/* ���p��X��12�Ѫ��p�ƭ� */
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

		/* �p���12�ѥH�᪺�p�ƭ� */

		for (var i=12;i<savedThis.companyHistoryObject.historyDataArray.length;i++) {
			var ma10=savedThis.ma10[i];
			if (ma10>prevMa10) {
				if (upCount>0) {
					upCount++;		// ����W�ɤ�
				} else if (downCount>0) {
					downCount=0;		// �U�������ର�W��
					upCount=1;
				}
			} else if (prevMa10>ma10) {
				if (upCount>0) {
					upCount=0;		// �W�ɤ����ର�U��
					downCount=1;
				} else if (downCount>0) {
					downCount++;		// ����U����
				}
			} else {
				if (upCount>0) {
					upCount++;		// ����W�ɤ�
				} else if (downCount>0) {
					downCount++;		// ����W�ɤ�
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

	/* �禡 patternMatch �t�d�q K �u����X����ݩ��زզX���A�A
	 * �ñN�κA�s���s�J patternTypeArray ���C�ԲӪ��P�_�̾ڽа�
	 * �Ҳ�362�� K �u�Ϫ��κA�����C
	 */

	function patternMatch() {
		var patternTypeArray=[];
		var totalLength=savedThis.companyHistoryObject.historyDataArray.length;

		for (var i=0;i<totalLength;i++) {
			/* patternType �O��骺�κA�s���A�w�]��-1��ܷ��S��
			 * �ǰt���κA�C
			 */

			var patternType=-1;
			/* �b�����κA�P�_�޿褤�A���ϥ� else if �ԭz����]�O
			 * �]���Y�骺 K �u�κA�i�঳�h���κA���i��A�]�\�Ѥ�
			 * �C�X��10�بèS���h���κA���i��ʡA�����n�O�d�o�إi
			 * ��ʪ��B�z�޿�C�o�ͦh���κA�����ήɡA�ѩ���h�Ѫ�
			 * �κA�P�_�O�b�᭱�A�ҥH�|�\�����֤ѼƧκA�C�p�G�n�O
			 * ���h���κA���i��ʡA�h�����ϥΤG���}�C�A�W�[�{����
			 * �����סA�d��Ū�̦ۦ�m�ߡC
			 */

			if (i<=(totalLength-1)) { /* �P�_���A 5,6,9,10 �A�ܤֶ��n 1 �Ѹ�� */
				var dataObject=savedThis.companyHistoryObject.historyDataArray[i];
				var close=dataObject.close;
				var open=dataObject.open;
			
				if ((savedThis.trendCountArray[i].downCount>5)&&
				    (close>open)&&
				    (savedThis.kbarPercent[i].bottomStick>0.66)) {
					/* �P�_���A 5,9 */
					if (savedThis.kbarPercent[i].topStick==0) {
						patternType=9;	// �l�u�S���W�v�u
					} else {
						patternType=5;
					}
				} else if ((savedThis.trendCountArray[i].upCount>5)&&
					   (open>close)&&
					   (savedThis.kbarPercent[i].topStick>0.66)) {
					/* �P�_���A 6,10 */
					if (savedThis.kbarPercent[i].bottomStick==0) {
						patternType=10;	// �˺l�u�S���U�v�u
					} else {
						patternType=6;
					}
				} 
			}

			if (i<=(totalLength-2)) { /* �P�_���A 3,4 �A�ܤֶ��n 2 �Ѹ�� */

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
					/* �P�_���A 4 */
					patternType=4;
				} else if ((savedThis.trendCountArray[i].upCount>5)&&
					   (open2>close2)&&((open2-close2)/open2>0.03)&&
					   (close1>open1)&&((close1-open1)/close1<0.01)&&
					   (close1<open2)&&(open1>close2)) {
					/* �P�_���A 3 */
					patternType=3;
				} 
			} 

			if (i<=(totalLength-3)) { /* �P�_���A 7,8 �A�ܤֶ��n 3 �Ѹ�� */

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

			if (i<=(totalLength-5)) { /* �P�_���A 1,2 �A�ܤֶ��n 5 �Ѹ�� */

				var dataObject1=savedThis.companyHistoryObject.historyDataArray[i];
				var close1=dataObject1.close;
				var open1=dataObject1.open;
				var high=Number.NEGATIVE_INFINITY;
				var low=Number.POSITIVE_INFINITY;
				
				/* ���ĤG�T�|�Ѥ��}�L�Φ��L���̤j�Ȥγ̤p�� */
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
					/* �P�_���A 1 */
					patternType=1;
				} else if ((savedThis.trendCountArray[i].upCount>5)&&
					   (close1>open1)&&((close1-open1)/close1>0.03)&&
					   (high<close1)&&(low>open1)&&
					   (close5>open5)&&((close5-open5)/close5>0.03)&&
					   (close5>close1)) {
					/* �P�_���A 2 */
					patternType=2;
				} 
			} 

			patternTypeArray.push(patternType);
		}
		return patternTypeArray;
	}

	/* ���� StockGraphics �غc�禡�Ѧ��B�}�l */
	/* �ھڶǤJ�� width �� height �ѼƳ]�w�e�����j�p */
	
	canvas.setAttribute("width",width);
	canvas.setAttribute("height",height);
	
	/* �ݩ� width �O�s�F�e�s���e�A�ݩ� height �O�s�F�e������ */

	this.width=width;
	this.height=height;

	/* �ݩ� context �O�s�F�e����ø������ */

	this.context=canvas.getContext("2d");


	/* �H�U�ݩʩM K �u�Ϫ���m�����A�o���ݩʷ|�Φb redrawCanvas 
	 * ��k���C�e���`�Ʃw�q�ɡA���Ǳ`�Ʒ|�b�o�̭��ƨϥΡA�Ҧp
	 * GRAPH_LEFT �b�o�̷|�]�w���e���W���P���󪺥���ɭȡA�e��
	 * �u�w�q�@�ӱ`�ƭȪ��ت��O�u�n�ק�@�ӱ`�ƭȡA�o�̪��ݩ�
	 * �ȴN���Τ@�@�ץ��F�C�o�̪��ݩʭȬ��F�U���󪺦�m�O���U
	 * �۪��W�١A�ҥH�٬O�U������O�w�q�@���ݩʡA�Ҧp�T������
	 * ������ɤ� K �u�Ϫ���������M�ƭȬO�@�˪��A���٬O�n���}
	 * �����P���ݩʤ~�n�C�b�e���P����ɨϥΦU�۪��ݩʦW�١A�n
	 * �B�O���|�V�c�A�ӥB�N�ӭY�n�Τ��P���ƭȮɡA�{���]����n
	 * �ק�C
	 */
	
	this.valueMsgTop=MSG1_TOP;	// �ƭȰT���Z�e���W�䪺�Z��
	this.valueMsgLeft=GRAPH_LEFT;	// �ƭȰT���Z�e�����䪺�Z��
	this.maMsgTop=MSG2_TOP;		// ���ʥ����ȰT���Z�e���W�䪺�Z��
	this.maMsgLeft=GRAPH_LEFT;	// ���ʥ����ȰT���Z�e�����䪺�Z��
	this.kbarTop=KBAR_TOP;		// K �u�϶Z�e���W�䪺�Z��
	this.kbarLeft=GRAPH_LEFT;	// K �u�϶Z�e�����䪺�Z��
	this.kbarWidth=GRAPH_WIDTH;	// K �u�Ϫ��e��
	this.kbarHeight=KBAR_HEIGHT;	// K �u�Ϫ�����
	this.volMsgTop=MSG3_TOP;	// ����q�T���Z�e���W�䪺�Z��
	this.volMsgLeft=GRAPH_LEFT;	// ����q�T���Z�e�����䪺�Z��
	this.volTop=VOL_TOP;		// ����q�϶Z�e���W�䪺�Z��
	this.volLeft=GRAPH_LEFT;	// ����q�϶Z�e�����䪺�Z��
	this.volWidth=GRAPH_WIDTH;	// ����q�Ϫ��e��
	this.volHeight=VOL_HEIGHT;	// ����q�Ϫ�����

	/* �w�q K �Τ@�䪺�����I�ơA���ȳ̤p�O 1�A�̤j�O 64 */
	
	this.barOneSideWidth=1;		// �w�]�@�� K �Ϊ��@�䦳1�I����

	/* �N�ǤJ���Ѽ� companyHistoryObject �O�s�b�ݩʤ� */

	this.companyHistoryObject=companyHistoryObject;
	this.companyId=companyHistoryObject.companyId;

	/* �w�]�n�e�X���ɶ��d�򤧵����ɶ��O���v��T�}�C���̫�@�� */
	
	this.barEndIndex=this.companyHistoryObject.historyDataArray.length-1;
	this.barStartIndex=0;
	this.maxBarEndIndex=this.companyHistoryObject.historyDataArray.length-1;

	/* �M�w K �u���a�y�Ъ��̤p�γ̤j�� */
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

	/* �M�w����q���a�y�Ъ��̤j�ȡA�̤p�Ȭ� 0 */
	this.volMaxValue=0;
	this.volMinValue=0;
	for (var i=0;i<this.companyHistoryObject.historyDataArray.length-1;i++) {
		var oneObject=this.companyHistoryObject.historyDataArray[i];
		var volume=oneObject.volume;
		if (volume>this.volMaxValue) {
			this.volMaxValue=volume;
		}
	}	
	/* �p�G�O�j�L�h����q�����O�y���z�A�U�ѫh����q���O�y�i�z�C
	 * �j�L���̤j�ȥH100�������p��X�̤j�ȡC�U�Ѫ��̤j��
	 * �O�� 10 ������M�w�A�Ҧp�Y�Ѳ��̤j����q�O 353 �i�A�h�y�г̤j��
	 * �i�]�� 1000�A�Y����q�̤j�ȬO 2438 �i�A�h�y�г̤j�ȥi�]��
	 * 10000�A...�C
	 */

	if (this.companyId=="%23001") {
		/* �j�L������q�H100�����@�ӳ��A������X�̤j�Ȧ��X��
		 * 100���C
		 */
		this.volMaxValue=floatToInt(this.volMaxValue/100)+1;
		/* �A��̤j�ȳ]�w��100�������� */
		this.volMaxValue=this.volMaxValue*100;
	} else {
		/* �N�ثe�̤j�Ȩ� log10 �h�i�o�ثe�̤j�ȬO10���X����A
		 * ����ƦA�[1�Y�i�M�w�s���̤j�ȡC�ѩ� JavaScript ��
		 * Math.log(x) �O�p�� ln(x) ���ȡA�ҥH�n�� log10(x)
		 * ������ log10(e)*ln(x) �~��o��C
		 */
		var exp=floatToInt(Math.LOG10E*Math.log(this.volMaxValue));

		/* ��X����q�̤j�ȬO10���X���� */

		var newVolMaxValue=Math.pow(10,exp);		// ���]�w�s���̤j�ȬO�@�� 10^exp
		while (newVolMaxValue<this.volMaxValue) {	// �s���̤j�Ȧp�G�٨S���j��쥻���̤j��
			/* �s���̤j�ȦA�h�[�@�� 10^exp */
			newVolMaxValue=newVolMaxValue+Math.pow(10,exp);
		}
		/* �ܦ��s���̤j��(�a�y�г̤j��׭�)�w�g�j��쥻���̤j�ȡA
		 * �B�s���̤j�ȬO 10^exp �����ơC
		 */
		this.volMaxValue=newVolMaxValue;
	}

	/* �I�s calcMAValue �禡�p��5��B20���60�饭���� */
	
	this.ma5=calcMAValue(5);
	this.ma10=calcMAValue(10);	// 10�饭���ȥΦb calcTrendCount �禡��
	this.ma20=calcMAValue(20);
	this.ma60=calcMAValue(60);

	/* �I�s calcKbarPercent �禡�p��X�C�骺�W�v�u�B�D��
	 * �ΤU�v�u�Ҧ��ʤ���C
	 */

	this.kbarPercent=calcKbarPercent();

	/* �I�s calcTrendCount �禡�p��C�骺�W�ɩΤU���p�ƭȡA
	 * �W�ɩΤU���p�ƭȥi�H���U�P�_ K �u���զX�κA�C
	 */

	this.trendCountArray=calcTrendCount();

	/* �I�s patternMatch �禡��X�C�骺 K �u�O�_�ŦX�Y��
	 * �κA�C
	 */

	this.patternTypeArray=patternMatch();

	/* �]�w�n��ܾ��v��T�}�C�����ĴX�Ӹ�� */

	this.msgIndex=this.maxBarEndIndex;

	/* �]�w�W���Ͷսu�ΤU���Ͷսu���q���O OFF (�T��)�����A */

	this.upTrend=false;
	this.downTrend=false;

	/* ���w�B�z canvas mouse up ���ƥ�B�z�{�� */
	
	canvas.onmouseup=onMouseUp;

	/* ���w�B�z canvas mouse move ���ƥ�B�z�{�� */

	canvas.onmousemove=onMouseMove;
	
	/* �I�s redrawCanvas() ��k�e�X K �u�� */

	this.redrawCanvas();
};

/* ���O StockGraphics ����k calcDrawParameter �D�n�ΨӨƥ�
 * �p��X�e K �u�Ϯɷ|�Ψ쪺�@�ǭ��n�ѼơA�Ҧp�@�i�Ϥ��i�H
 * �e�ǴX�Ѫ� K �ΡBK �Ϊ��e�סB�Ĥ@�ѬO��ư}�C�����ĴX�ӡC
 */

StockGraphics.prototype.calcDrawParameter=function () {

	/* �ˬd�g�L��j�B�Y�p���᪺ this.barOneSideWidth ��
	 * �O�_�W�L�d��C
	 */

	if (this.barOneSideWidth<1.0) {
		this.barOneSideWidth=1;
	} else if (this.barOneSideWidth>64) {
		this.barOneSideWidth=64;
	}

	/* �ˬd K �u�ϸg�L���k������Athis.barEndIndex ����
	 * �O�_�W�L�d��C
	 */

	if (this.barEndIndex>this.companyHistoryObject.historyDataArray.length-1) {
		this.barEndIndex=this.companyHistoryObject.historyDataArray.length-1;
	}
	if (this.barEndIndex<0) {
		this.barEndIndex=0;
	}

	/* �M�w K �Φ��X�u���e�� */

	this.barStickWidth=this.barOneSideWidth/10;
	if (this.barStickWidth<1.0) {
		this.barStickWidth=1;
	} else {
		this.barStickWidth=floatToInt(this.barStickWidth);
	}

	/* �M�w K �Ϊ��e�סA�G��e�ץ[�W���X�u���e�� */

	this.barWidth=2*this.barOneSideWidth+this.barStickWidth;

	/* �M�w K �u�Ϥ��i�e�X�� K �ΡA�G�� K �Τ����n�� 1 ���� */
	
	this.barNumber=floatToInt(this.kbarWidth/(this.barWidth+KBAR_SPACING));

	/* �M�w K �u�Ϥ��ɶ��d�򪺶}�l�ɶ�(���v��T�}�C�����}�l index) */
	
	this.barStartIndex=this.barEndIndex-this.barNumber+1;
	if (this.barStartIndex<0) {
		this.barStartIndex=0;
	}
};

/* ���O StockGraphics ����k redrawCanvas �D�n�Ψӭ��e�X�{
 * �b�e���W���U�ت���A�Ҧp�T���BK �u�ϡB���ʥ����u�B����q
 * �ϡC�b����k���]�t�F�ƭӨ禡�A�U�O�Ψӵe�X���P������C
 */

StockGraphics.prototype.redrawCanvas=function () {
	var savedThis=this;

	/* �禡 clearGraphics �t�d�b���e K �u�Ϯɥ��M�����e�ҵe
	 * �� K �u�ϡA�_�h���e�e���M�b�n�e���|�V�b�@�_�C
	 */

	function clearGraphics() {
		var top=0;
		var left=0;
		var width=CANVAS_WIDTH;
		var height=CANVAS_HEIGHT;

		savedThis.context.beginPath();
		savedThis.context.fillStyle="#ffffff";
		savedThis.context.fillRect(left,top,width,height);

		/* �e�Xø�ϰϰ쪺�~�� */

		savedThis.context.beginPath();
		savedThis.context.strokeStyle="#FFAA00";
		savedThis.context.lineWidth=3;
		savedThis.context.strokeRect(0,0,width,height);
	}
	
	/* �禡 drawIcon �t�d�b���e��ø�X�W�ɤΤU������ιϥܡA
	 * �ѩ���U�o�G�ӹϥܫ�|���ܥ��̪����A�A�ҥH�n���e��
	 * �̡A�t�~�|�Ӷ�ιϥܫh���ΡC
	 */

	function drawIcon() {

		/* �e�X�Ĥ@�Ӷ�ιϥܡG��j K �u�ϡC */

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

		/* �e�X�ĤG�Ӷ�ιϥܡG�Y�p K �u�ϡC */

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

		/* �e�X�ĤT�Ӷ�ιϥܡG���� K �u�Ϯɶ��d��C */

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

		/* �e�X�ĥ|�Ӷ�ιϥܡG�k�� K �u�Ϯɶ��d��C */

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

		/* �e�X�Ĥ��Ӷ�ιϥܡG�W���Ͷսu���q */
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

		/* �e�X�Ĥ��Ӷ�ιϥܡG�U���Ͷսu���q */
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

	/* �禡drawKBarVerticalLine �t�d�b K �u�Ϥ��e�X�a�y�Х���u */

	function drawKBarVerticalLine() {
		var top=savedThis.kbarTop;
		var left=savedThis.kbarLeft;
		var width=savedThis.kbarWidth;
		var height=savedThis.kbarHeight;

		/* �n�e�M�a�y�Х��檺�u�A�n����X���v��T�}�C��
		 * ���� index �B�n�e�u�ClineIndexArray �}�C�Y�O
		 * �ΨӫO�s�n�e�a�u�� index �ȡC�a�u�O�e�b�G��
		 * ���P�������ɳB�A�H��u�Ӭݳo�ӥ�ɬO���
		 * �M������A�H�g�u�Ӭݳo�ӥ�ɬO�u�M�u�����A�Y
		 * �O�H��u�Ӭݳo�ӥ�ɫh�O�~�M�~�����C
		 * �ҥH�o�̭n���ε{���ӧ�X�o�ӥ�ɪ��a��A�ç�
		 * �ӥ�ɪ� index �O�b lineIndexArray �}�C���C
		 */

		var lineIndexArray=[];
		var historyDataArray=savedThis.companyHistoryObject.historyDataArray;
		var historyType=savedThis.companyHistoryObject.getHistoryType();

		/* �b�}�l����ɫe����X�e�@�Ѫ��~���Τ�� */

		var prevTime=historyDataArray[0].time;
		var prevYear=parseInt(prevTime.substr(0,4));
		var prevMonth=parseInt(prevTime.substr(4,2));

		/* appendMessage("prevTime="+prevTime+",prevYear="+prevYear+",prevMonth="+prevMonth+"\n"); */

		for (var i=1;i<historyDataArray.length;i++) {

			/* ��X��骺�~���Τ�� */

			var time=historyDataArray[i].time;
			var year=parseInt(time.substr(0,4));
			var month=parseInt(time.substr(4,2));
		
			if (historyType=="d") {
				/* ��u�n������������� */
				if (month!=prevMonth) {
					lineIndexArray.push(i);
					prevYear=year;
					prevMonth=month;
				}
			} else if (historyType=="w") {
				/* �g�u�n��u��������ɡA1��4��7��11�� */
				if (((month%3)==1)&&(month!=prevMonth)) {
					lineIndexArray.push(i);
					prevYear=year;
					prevMonth=month;
				}
			} else {
				/* ��u�n��~����������� */
				if (year!=prevYear) {
					lineIndexArray.push(i);
					prevYear=year;
					prevMonth=month;
				}
			}
		}

		/* appendMessage(lineIndexArray); */
		
		/* �ھڧ�쪺 line index �h�e�X�a�y�Х���u */
		
		for (var i=0;i<lineIndexArray.length;i++) {
			/* �p��X�a�y�Х���u���y�Э� */

			var xPos=(left+width)-(savedThis.barEndIndex-lineIndexArray[i]+1)*	
				(savedThis.barWidth+KBAR_SPACING)+
				savedThis.barOneSideWidth;

			if (xPos>left) {
				/* �b K �u�Ϥ��e�X�a�Х���u */
				savedThis.context.beginPath();
				savedThis.context.strokeStyle="#aaaaaa";
				savedThis.context.lineWidth=1;
				savedThis.context.moveTo(xPos,top);
				savedThis.context.lineTo(xPos,top+height);
				savedThis.context.stroke();
				/* �b����q�Ϥ��e�X�a�y�Х���u */
				savedThis.context.beginPath();
				savedThis.context.strokeStyle="#aaaaaa";
				savedThis.context.lineWidth=1;
				savedThis.context.moveTo(xPos,savedThis.volTop);
				savedThis.context.lineTo(xPos,savedThis.volTop+savedThis.volHeight);
				savedThis.context.stroke();
				/* �b����q�ϳ̤p��e�X��ɪ���� */				
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

	/* �禡 drawKBarGraphics �t�d�e�X K �u�� */

	function drawKBarGraphics() {
		var top=savedThis.kbarTop;
		var left=savedThis.kbarLeft;
		var width=savedThis.kbarWidth;
		var height=savedThis.kbarHeight;
		
		/* �e�X�~�� */

		savedThis.context.beginPath();
		savedThis.context.strokeStyle="#666666";
		savedThis.context.lineWidth=1;
		savedThis.context.strokeRect(left,top,width,height);

		/* �e�X��y�жb�A�@���Q���� */		
		var ySpace=height/10;					// �C����u���Z��
		for (var i=1;i<10;i++) {
			var yPos=top+height-i*ySpace;			// ��u�� y �y�Э�
			savedThis.context.beginPath();
			savedThis.context.strokeStyle="#aaaaaa";
			savedThis.context.lineWidth=1;
			savedThis.context.moveTo(left,yPos);
			savedThis.context.lineTo(left+width,yPos);
			savedThis.context.stroke();
		}

		/* �� filltext �e�X��y�Ъ��� */
		var yValueDiff=(savedThis.barMaxValue-savedThis.barMinValue)/10;
		for (var i=1;i<=10;i++) {
			var yPos=top+height-i*ySpace;			// ��r�� y �y�Э�
			var yValue=savedThis.barMinValue+i*yValueDiff;	// ��r���ƭ�
			savedThis.context.beginPath();
			savedThis.context.font="10px Arial"; 
			savedThis.context.fillStyle="#666666";
			savedThis.context.textAlign="left";
			savedThis.context.textBaseline="middle";
			savedThis.context.fillText(yValue.toFixed(2),left+width+5,yPos);
			savedThis.context.stroke();
		}

		/* �� filltext �e�X��y�Ъ���� */
		var yPos=top+height-11*ySpace;				// ��r�� y �y�Э�
		savedThis.context.beginPath();
		savedThis.context.font="10px Arial"; 
		savedThis.context.fillStyle="#666666";
		savedThis.context.textAlign="left";
		savedThis.context.textBaseline="middle";
		if (savedThis.companyId=="%23001") {
			savedThis.context.fillText("���G�[�v����",left+width+5,yPos);
		} else {
			savedThis.context.fillText("���G��",left+width+5,yPos);
		}
		savedThis.context.stroke();
		
		drawKBarVerticalLine();

		/* �e�X�Ҧ� K �Ϊ��W�U��X�u */
		for (var i=savedThis.barStartIndex;i<=savedThis.barEndIndex;i++) {
			var oneObject=savedThis.companyHistoryObject.historyDataArray[i];
			var high=oneObject.high;
			var low=oneObject.low;
			var yValue;					// K �ΤW�U��X�u���W������
			var color;					// K �ΤW�U��X�u���C��
			var diff;					// �̰��γ̧C���t

			/* �M�w yValue, color ���� */
			yValue=high;
			color="black";
			diff=high-low;
			
			/* �p��X K �ΤW�U��X�u���W�����y�Э� */
			var xPos=(left+width)-(savedThis.barEndIndex-i+1)*	
				(savedThis.barWidth+KBAR_SPACING)+
				savedThis.barOneSideWidth;
			var yPos=(top+height)-
				savedThis.kbarHeight*(yValue-savedThis.barMinValue)/
				(savedThis.barMaxValue-savedThis.barMinValue);
			
			/* �p��X K �ΤW�U��X�u������ */
			var kbarHeight=diff*height/
				(savedThis.barMaxValue-savedThis.barMinValue);
			if (kbarHeight<1) {
				kbarHeight=1;				// K �ΤW�U��X�u�ܤ֤@���u
			}
			kbarHeight=floatToInt(kbarHeight);

			/* �e�X�@�� K �ΤW�U��X�u */
			savedThis.context.beginPath();
			savedThis.context.fillStyle=color;
			savedThis.context.fillRect(xPos,yPos,savedThis.barStickWidth,kbarHeight);
		}

		/* �e�X�Ҧ� K �� */
		for (var i=savedThis.barStartIndex;i<=savedThis.barEndIndex;i++) {
			var oneObject=savedThis.companyHistoryObject.historyDataArray[i];
			var open=oneObject.open;
			var close=oneObject.close;
			var yValue;					// K �Υ��W������
			var color;					// K �Ϊ��C��
			var diff;					// �}�L�Φ��L���t

			/* �M�w yValue, color ���� */
			if (open>close) {		
				/* �}�L���b�W�A�G�C�⬰��� */		
				yValue=open;				
				color="green";
				diff=open-close;
			} else if (open<close) {
				/*  ���L���b�W�A�G�C�⬰���� */
				yValue=close;
				color="red";
				diff=close-open;
			} else {
				/* �}�L�����󦬽L���A�C�⬰�¦� */
				yValue=open;
				color="black";
				diff=0;	
			}

			/* �p��X K �Υ��W�����y�Э� */
			var xPos=(left+width)-(savedThis.barEndIndex-i+1)*(savedThis.barWidth+KBAR_SPACING);	
			var yPos=(top+height)-
				savedThis.kbarHeight*(yValue-savedThis.barMinValue)/
				(savedThis.barMaxValue-savedThis.barMinValue);
			
			/* �p��X K �Ϊ����� */
			var kbarHeight=diff*height/
				(savedThis.barMaxValue-savedThis.barMinValue);
			if (kbarHeight<1) {
				kbarHeight=1;				// K �Φܤ֤@���u
			}
			kbarHeight=floatToInt(kbarHeight);

			/* �e�X�@�� K �� */
			savedThis.context.beginPath();
			savedThis.context.fillStyle=color;
			savedThis.context.fillRect(xPos,yPos,savedThis.barWidth,kbarHeight);
			savedThis.context.beginPath();
			savedThis.context.strokeStyle="black";
			savedThis.context.lineWidth=1;
			savedThis.context.strokeRect(xPos,yPos,savedThis.barWidth,kbarHeight);
		}
	}

	/* �禡 drawVolumeGraphics �t�d�e�X����q�� */

	function drawVolumeGraphics() {
		var top=savedThis.volTop;
		var left=savedThis.volLeft;
		var width=savedThis.volWidth;
		var height=savedThis.volHeight;
		
		/* �e�X�~�� */
		savedThis.context.strokeStyle="#666666";
		savedThis.context.lineWidth=1;
		savedThis.context.strokeRect(left,top,width,height);

		/* �e�X��y�жb�A������5���� */
		var yDiff=5;
		var ySpace=height/yDiff;				// �C����u���Z��
		for (var i=1;i<yDiff;i++) {
			var yPos=top+height-i*ySpace;			// ��u�� y �y�Э�
			savedThis.context.beginPath();
			savedThis.context.strokeStyle="#aaaaaa";
			savedThis.context.lineWidth=1;
			savedThis.context.moveTo(left,yPos);
			savedThis.context.lineTo(left+width,yPos);
			savedThis.context.stroke();
		}

		/* �� filltext �e�X��y�Ъ��� */
		var yValueDiff=(savedThis.volMaxValue-savedThis.volMinValue)/yDiff;
		for (var i=1;i<=yDiff;i++) {
			var yPos=top+height-i*ySpace;			// ��r�� y �y�Э�
			var yValue=savedThis.volMinValue+i*yValueDiff;	// ��r���ƭ�
			savedThis.context.beginPath();
			savedThis.context.font="10px Arial"; 
			savedThis.context.fillStyle="#666666";
			savedThis.context.textAlign="left";
			savedThis.context.textBaseline="middle";
			savedThis.context.fillText(yValue.toFixed(0),left+width+5,yPos);
			savedThis.context.stroke();
		}

		/* �� filltext �e�X��y�Ъ���� */
		var yPos=top+height-(yDiff+1)*ySpace;			// ��r�� y �y�Э�
		savedThis.context.beginPath();
		savedThis.context.font="10px Arial"; 
		savedThis.context.fillStyle="#666666";
		savedThis.context.textAlign="left";
		savedThis.context.textBaseline="middle";
		if (savedThis.companyId=="%23001") {
			savedThis.context.fillText("���G��",left+width+5,yPos);
		} else {
			savedThis.context.fillText("���G�i",left+width+5,yPos);
		}
		savedThis.context.stroke();

		/* �e�X�Ҧ�����q�� */
		for (var i=savedThis.barStartIndex;i<=savedThis.barEndIndex;i++) {
			var oneObject=savedThis.companyHistoryObject.historyDataArray[i];
			var close=oneObject.close;
			var prevClose;
			var volume=oneObject.volume;
			if (i>0) {
				prevClose=savedThis.companyHistoryObject.historyDataArray[i-1].close;
			} else {
				prevClose=0;				// �S���e�@�Ѫ����L��
			}
			var color;					// ����q���C��

			/* �M�w yValue, color ���� */
			if (close>prevClose) {		
				/* ���L�W���A�G�C�⬰���� */		
				color="red";
			} else if (close<prevClose) {
				/*  ���L�U�^�A�G�C�⬰��� */
				color="green";
			} else {
				/* ���L�����ܡA�C�⬰�¦� */
				color="black";
			}

			/* �p��X����q�Τl���W�����y�Э� */
			var xPos=(left+width)-(savedThis.barEndIndex-i+1)*(savedThis.barWidth+KBAR_SPACING);	
			var yPos=(top+height)-
				savedThis.volHeight*(volume-savedThis.volMinValue)/
				(savedThis.volMaxValue-savedThis.volMinValue);

			/* �p��X����q�Ϊ����� */
			var volHeight=(top+height)-yPos;
			if (volHeight<1) {
				volHeight=1;				// ����q�Φܤ֤@���u
			}
			volHeight=floatToInt(volHeight);

			/* �e�X�@�Ӧ���q�� */
			savedThis.context.beginPath();
			savedThis.context.fillStyle=color;
			savedThis.context.fillRect(xPos,yPos,savedThis.barWidth,volHeight);
			savedThis.context.beginPath();
			savedThis.context.strokeStyle="black";
			savedThis.context.lineWidth=1;
			savedThis.context.strokeRect(xPos,yPos,savedThis.barWidth,volHeight);
		}
	}

	/* �禡 drawMaGraphics �t�d�e�X���u�ϡA�ǤJ���Ѽ� N
	 * �O��ܭn�e N �Ѫ������u�ϡA color �h�O�e�u���C��C
	 */

	function drawMaGraphics(N,color) {
		var top=savedThis.kbarTop;
		var left=savedThis.kbarLeft;
		var width=savedThis.kbarWidth;
		var height=savedThis.kbarHeight;
		var maArray;

		/* �ھڿ�J���ܼ� N �M�w�n�e�����Ȱ}�C�O���@�� */

		if (N==5) {
			maArray=savedThis.ma5;
		} else if (N==20) {
			maArray=savedThis.ma20;
		} else if (N==60) {
			maArray=savedThis.ma60;
		} else {
			/* N ���~�A���e�u�A������^�I�s�{���C
			 * �z�פW���i������o�̡A�]���g�o��
			 * �{�����H���|�����D�u�� ma5, ma20
			 * �M ma60�A���O������@�{�����H�o��
			 * ���o�|���D�A�]�i�ण�p�ߥ��� N ��
			 * �A�ҥH�[�W�o�q�{���i�H�׶}�i�઺
			 * �����D�C
			 */
			return;
		}
				
		/* �e�X���u */

		for (var i=(savedThis.barStartIndex+1);i<=savedThis.barEndIndex;i++) {
			if (i>N) {
				/* i>N �� ma[i] �~�������ȡA�_�h�䤤���e�O NaN�A
				 * i==N �ɡA�]���e�@�I�O NaN�A�L�k�e�u�A�G�q
				 * i>N �}�l�e�u�C
				 * �e�u����k�O�� index �O i-1 �� ma �ȵe�� index 
				 * �O i �� ma �ȡC
				 */

				/* �ھ� index �O i-1 �� ma �Ⱥ�X�b�e���W�� (x,y) �y�Э� */
				var xPos1=(left+width)-(savedThis.barEndIndex-(i-1)+1)*(savedThis.barWidth+KBAR_SPACING)+savedThis.barOneSideWidth;	
				var yPos1=(top+height)-
				savedThis.kbarHeight*(maArray[i-1]-savedThis.barMinValue)/
				(savedThis.barMaxValue-savedThis.barMinValue);

				/* �ھ� index �O i �� ma �Ⱥ�X�b�e���W�� (x,y) �y�Э� */
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

	/* �禡 drawValueText �Ψӵe�X�ثe��Ц�m�����v��T�� */

	function drawValueText() {
		
		if (savedThis.msgIndex<0) {
			return;
		}

		/* ��X��ܸ�ƪ���m */

		var yPos=savedThis.valueMsgTop+5;
		var xPos=savedThis.valueMsgLeft;
	
		/* ��X���v��T���� */

		var oneObject=savedThis.companyHistoryObject.historyDataArray[savedThis.msgIndex];
		var time=oneObject.time;
		var high=oneObject.high;
		var low=oneObject.low;
		var open=oneObject.open;
		var close=oneObject.close;
		var volume=oneObject.volume;

		/* �M�w���W���ΤU�^�ƭ� */

		var riseOrDown;
		if (savedThis.msgIndex>0) {
			/* �����n���e�@���O���~��M�w��骺���ΤU�^�ƭ� */
			var prevClose=savedThis.companyHistoryObject.historyDataArray[savedThis.msgIndex-1].close;
			if (prevClose<close) {
				riseOrDown="�W���G"+(close-prevClose).toFixed(2);
			} else if (prevClose>close) {
				riseOrDown="�U�^�G"+(prevClose-close).toFixed(2);
			} else {
				riseOrDown="���^�G-";
			}
		} else {
			/* ��0����ơA�S���e�@�Ѫ��O���A�S�����^ */
			riseOrDown="���^�G-";
		}

		var text;
		if (savedThis.companyId=="%23001") {
			text=time+"  �}�G"+open+"  ���G"+high+"  �C�G"+low+"  ���G"+close+"  �q�G"+volume+" ��  "+riseOrDown;
		} else {
			text=time+"  �}�G"+open+"  ���G"+high+"  �C�G"+low+"  ���G"+close+"  �q�G"+volume+" �i  "+riseOrDown;
		}

		/* �e�X���v��T�ƭ� */

		savedThis.context.beginPath();
		savedThis.context.font="10px Arial"; 
		savedThis.context.fillStyle="black";
		savedThis.context.textAlign="left";
		savedThis.context.textBaseline="top";
		savedThis.context.fillText(text,xPos,yPos);
		savedThis.context.stroke();
	}

	/* �禡 drawMaText �Ψӵe�X�ثe��Ц�m�� MA ��T�� */

	function drawMaText() {

		if (savedThis.msgIndex<0) {
			return;
		}

		var yPos=savedThis.maMsgTop;
		var xPos=savedThis.maMsgLeft;

		/* �H�U���{���X�ƹ�W�����ƥX�{�����ΡA�d����Ǫ�
		 * ���m�ߡA�N���ƪ������令�禡�өI�s�C
		 */

		/* �e�X MA5 �r�� */

		savedThis.context.beginPath();
		savedThis.context.font="10px Arial"; 
		savedThis.context.fillStyle="blue";
		savedThis.context.textAlign="left";
		savedThis.context.textBaseline="top";
		savedThis.context.fillText("MA5",xPos,yPos);
		savedThis.context.stroke();

		/* �e�X MA5 �ƭ� */

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

		/* �P�_��� MA5 �O�W�ɩΤU�� */

		var ma5UpOrDown=0;			// 0 ��ܫ���
		if (savedThis.msgIndex>6) {
			if (savedThis.ma5[savedThis.msgIndex]>savedThis.ma5[savedThis.msgIndex-1]) {
				ma5UpOrDown=1;		// 1 ��ܤW��
			} else if (savedThis.ma5[savedThis.msgIndex]<savedThis.ma5[savedThis.msgIndex-1]) {
				ma5UpOrDown=-1;		// -1 ��ܤU��
			} 
		}
		
		/* �e�X MA5 �W�ɩΤU���ϧ� */

		savedThis.context.beginPath();
		savedThis.context.font="10px Arial"; 
		savedThis.context.textAlign="left";
		savedThis.context.textBaseline="top";
		if (ma5UpOrDown>0) {
			savedThis.context.fillStyle="red";
			savedThis.context.fillText("��",xPos+80,yPos);
		} else if (ma5UpOrDown<0) {
			savedThis.context.fillStyle="green";
			savedThis.context.fillText("��",xPos+80,yPos);
		}
		savedThis.context.stroke();

		/* �e�X MA20 �r�� */

		savedThis.context.beginPath();
		savedThis.context.font="10px Arial"; 
		savedThis.context.fillStyle="orange";
		savedThis.context.textAlign="left";
		savedThis.context.textBaseline="top";
		savedThis.context.fillText("MA20",xPos+120,yPos);
		savedThis.context.stroke();

		/* �e�X MA20 �ƭ� */

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

		/* �P�_��� MA20 �O�W�ɩΤU�� */

		var ma20UpOrDown=0;			// 0 ��ܫ���
		if (savedThis.msgIndex>21) {
			if (savedThis.ma20[savedThis.msgIndex]>savedThis.ma20[savedThis.msgIndex-1]) {
				ma20UpOrDown=1;		// 1 ��ܤW��
			} else if (savedThis.ma20[savedThis.msgIndex]<savedThis.ma20[savedThis.msgIndex-1]) {
				ma20UpOrDown=-1;		// -1 ��ܤU��
			} 
		}
		
		/* �e�X MA20 �W�ɩΤU���ϧ� */

		savedThis.context.beginPath();
		savedThis.context.font="10px Arial"; 
		savedThis.context.textAlign="left";
		savedThis.context.textBaseline="top";
		if (ma20UpOrDown>0) {
			savedThis.context.fillStyle="red";
			savedThis.context.fillText("��",xPos+210,yPos);
		} else if (ma20UpOrDown<0) {
			savedThis.context.fillStyle="green";
			savedThis.context.fillText("��",xPos+210,yPos);
		}
		savedThis.context.stroke();

		/* �e�X MA60 �r�� */

		savedThis.context.beginPath();
		savedThis.context.font="10px Arial"; 
		savedThis.context.fillStyle="green";
		savedThis.context.textAlign="left";
		savedThis.context.textBaseline="top";
		savedThis.context.fillText("MA60",xPos+240,yPos);
		savedThis.context.stroke();

		/* �e�X MA60 �ƭ� */

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

		/* �P�_��� MA60 �O�W�ɩΤU�� */

		var ma60UpOrDown=0;			// 0 ��ܫ���
		if (savedThis.msgIndex>61) {
			if (savedThis.ma60[savedThis.msgIndex]>savedThis.ma60[savedThis.msgIndex-1]) {
				ma60UpOrDown=1;		// 1 ��ܤW��
			} else if (savedThis.ma60[savedThis.msgIndex]<savedThis.ma60[savedThis.msgIndex-1]) {
				ma60UpOrDown=-1;		// -1 ��ܤU��
			} 
		}
		
		/* �e�X MA60 �W�ɩΤU���ϧ� */

		savedThis.context.beginPath();
		savedThis.context.font="10px Arial"; 
		savedThis.context.textAlign="left";
		savedThis.context.textBaseline="top";
		if (ma60UpOrDown>0) {
			savedThis.context.fillStyle="red";
			savedThis.context.fillText("��",xPos+330,yPos);
		} else if (ma60UpOrDown<0) {
			savedThis.context.fillStyle="green";
			savedThis.context.fillText("��",xPos+330,yPos);
		}
		savedThis.context.stroke();

	}

	/* �禡 drawClosePrice �Ψӵe�X�ثe��Ц�m����馬�L����e�u */

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

		/* �p��X�ثe��Ц�m���L����e�u���y�Э� */

		var xPos=(closeLeft+closeWidth)-(savedThis.barEndIndex-savedThis.msgIndex+1)*	
			(savedThis.barWidth+KBAR_SPACING)+
			savedThis.barOneSideWidth+savedThis.barStickWidth/2;
		var yPos=(closeTop+closeHeight)-
			savedThis.kbarHeight*(close-savedThis.barMinValue)/
			(savedThis.barMaxValue-savedThis.barMinValue);

		/* �e�X�ثe��Ц�m���L����e�u */

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

		/* �e�X�ثe��Ц�m���L�����ƭ� */

		savedThis.context.beginPath();			// ���e�ϥհϰ�
		savedThis.context.fillStyle="#2277FF";
		savedThis.context.fillRect(closeLeft+closeWidth,yPos-7,50,14);

		savedThis.context.beginPath();			// �A��ܥզ��r
		savedThis.context.font="10px Arial"; 
		savedThis.context.fillStyle="white";
		savedThis.context.textAlign="center";
		savedThis.context.textBaseline="middle";
		savedThis.context.fillText(close,closeLeft+closeWidth+25,yPos);
		savedThis.context.stroke();

		/* �p��X�ثe��Ц�m����q��e�u���y�Э� */
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

		/* �e�X�ثe��Ц�m����q��e�u */

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

		/* �e�X�ثe��Ц�m����q���ƭ� */

		savedThis.context.beginPath();			// ���e�ϥհϰ�
		savedThis.context.fillStyle="#2277FF";
		savedThis.context.fillRect(volLeft+volWidth,yPos-7,50,14);

		savedThis.context.beginPath();			// �A��ܥզ��r
		savedThis.context.font="10px Arial"; 
		savedThis.context.fillStyle="white";
		savedThis.context.textAlign="center";
		savedThis.context.textBaseline="middle";
		savedThis.context.fillText(volume,volLeft+volWidth+25,yPos);
		savedThis.context.stroke();

		/* �b�̤U���e�X�ثe��Ц�m����� */
		
		var year=time.substr(0,4);
		var month=time.substr(4,2);
		var day=time.substr(6,2);

		savedThis.context.beginPath();			// ���e�ϥհϰ�
		savedThis.context.fillStyle="#2277FF";
		savedThis.context.fillRect(xPos-35,volTop+volHeight,70,14);
		
		savedThis.context.beginPath();			// �A��ܥզ��r
		savedThis.context.font="10px Arial"; 
		savedThis.context.fillStyle="white";
		savedThis.context.textAlign="center";
		savedThis.context.textBaseline="middle";
		savedThis.context.fillText(year+"/"+month+"/"+day,xPos,volTop+volHeight+7);
		savedThis.context.stroke();
	}

	/* �禡 drawTrendLine �Ψӵe�X�W�ɩΤU���Ͷսu�A
	 * �b�٨S���M�w�Ͷսu���G�I�y�Ыe�A���禡�Ψ�
	 * �e�X�ثe��m���̰��γ̧C�I�ѻ��A���O�Τ@��
	 * �p���κ����N��C
	 * �b���禡���|�Ψ쪺�ݩʦp�U�G
	 *	this.upTrend	�p�G�O true ��ܦ��W���Ͷսu
	 *	this.downTrend	�p�G�O true ��ܦ��U���Ͷսu
	 *	this.upIndex1	�O�W���Ͷսu���Ĥ@�I index 
	 *	this.upIndex2	�O�W���Ͷսu���ĤG�I index 
	 *	this.downIndex1	�O�U���Ͷսu���Ĥ@�I index 
	 *	this.downIndex2	�O�U���Ͷսu���ĤG�I index 
	 * �W�z index �O�� companyHistoryObject.historyDataArray
	 * �}�C�������ޭȡCupIndex1�BupIndex2�BdownIndex1�B
	 * downIndex2 ��l�O -1�A�����g�L�ϥΪ̪��I���~�|
	 * ���O�� index �ȡC
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
			/* ���W���Ͷսu */
			savedThis.context.strokeStyle="green";
			if (savedThis.upIndex1==-1) {
				/* ���b����Ĥ@�I */
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
				/* �b������Ĥ@�I���e�@�Ӥp�� */
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
				/* �O�s�Ĥ@�I�y�Э� */
				var xPos1=xPos;
				var yPos1=yPos;
				/* ���b����ĤG�I */
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
				/* �O�s�ĤG�I�y�Э� */
				var xPos2=xPos;
				var yPos2=yPos;
				/* �b�Ĥ@�I�βĤG�I���e�@���u�A���u�n�e��Ϯ���t */
				var newX1=xPos1+(top-yPos1)*(xPos2-xPos1)/(yPos2-yPos1);
				var newY1=top;
				var newX2=xPos1+(top+height-yPos1)*(xPos2-xPos1)/(yPos2-yPos1);
				var newY2=top+height;
				/* �b�����ˬd newX1 �� newX2 �O�_�X�Ϯإ��k�A
				 * newY1 �� newY2 �@�w�|�b�Ϯؤ��A�p�G�A�Q�n
				 * �����u�O���b�Ϯؤ��A�Цb���[�J�{���ˬd 
				 * newX1 �� newX2�A�åB�[�H�ץ��C
				 */
				savedThis.context.beginPath();
				savedThis.context.lineWidth=1;
				savedThis.context.moveTo(newX1,newY1);
				savedThis.context.lineTo(newX2,newY2);
				savedThis.context.stroke();
			} else {
				/* �w�粒�G�I */ 
				/* �b������Ĥ@�I�e�@�Ӥp�� */
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
				/* �O�s�Ĥ@�I�y�Э� */
				var xPos1=xPos;
				var yPos1=yPos;
				/* �b������ĤG�I�e�@�Ӥp�� */
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
				/* �O�s�ĤG�I�y�Э� */
				var xPos2=xPos;
				var yPos2=yPos;
				/* �b�Ĥ@�I�βĤG�I���e�@���u�A���u�n�e��Ϯ���t */
				var newX1=xPos1+(top-yPos1)*(xPos2-xPos1)/(yPos2-yPos1);
				var newY1=top;
				var newX2=xPos1+(top+height-yPos1)*(xPos2-xPos1)/(yPos2-yPos1);
				var newY2=top+height;
				/* �b�����ˬd newX1 �� newX2 �O�_�X�Ϯإ��k�A
				 * newY1 �� newY2 �@�w�|�b�Ϯؤ��A�p�G�A�Q�n
				 * �����u�O���b�Ϯؤ��A�Цb���[�J�{���ˬd 
				 * newX1 �� newX2�A�åB�[�H�ץ��C
				 */
				savedThis.context.beginPath();
				savedThis.context.lineWidth=1;
				savedThis.context.moveTo(newX1,newY1);
				savedThis.context.lineTo(newX2,newY2);
				savedThis.context.stroke();
				/* �M�w�ثe��Ц�m���伵�ѻ� */
				xPos=(left+width)-(savedThis.barEndIndex-savedThis.msgIndex+1)*	
					(savedThis.barWidth+KBAR_SPACING)+
					savedThis.barOneSideWidth+savedThis.barStickWidth/2;
				var support=savedThis.companyHistoryObject.historyDataArray[savedThis.upIndex1].low+
					(savedThis.companyHistoryObject.historyDataArray[savedThis.upIndex2].low-
					savedThis.companyHistoryObject.historyDataArray[savedThis.upIndex1].low)*
					(xPos-xPos1)/(xPos2-xPos1);
				/* �b�ثe��Ц�m�e�X�伵�� */
				xPos=(left+width)-(savedThis.barEndIndex-savedThis.msgIndex+1)*	
					(savedThis.barWidth+KBAR_SPACING)+
					savedThis.barOneSideWidth+savedThis.barStickWidth/2;
				yPos=(top+height)-
					height*(support-savedThis.barMinValue)/
					(savedThis.barMaxValue-savedThis.barMinValue);
				/* �p�G��Ц�m�b�Ϯؤ��~�e�X�伵�� */
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
			/* ���U���Ͷսu */
			savedThis.context.strokeStyle="red";
			if (savedThis.downIndex1==-1) {
				/* ���b����Ĥ@�I */
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
				/* �b������Ĥ@�I���e�@�Ӥp�� */
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
				/* �O�s�Ĥ@�I�y�Э� */
				var xPos1=xPos;
				var yPos1=yPos;
				/* ���b����ĤG�I */
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
				/* �O�s�ĤG�I�y�Э� */
				var xPos2=xPos;
				var yPos2=yPos;
				/* �b�Ĥ@�I�βĤG�I���e�@���u�A���u�n�e��Ϯ���t */
				var newX1=xPos1+(top-yPos1)*(xPos2-xPos1)/(yPos2-yPos1);
				var newY1=top;
				var newX2=xPos1+(top+height-yPos1)*(xPos2-xPos1)/(yPos2-yPos1);
				var newY2=top+height;
				/* �b�����ˬd newX1 �� newX2 �O�_�X�Ϯإ��k�A
				 * newY1 �� newY2 �@�w�|�b�Ϯؤ��A�p�G�A�Q�n
				 * �����u�O���b�Ϯؤ��A�Цb���[�J�{���ˬd 
				 * newX1 �� newX2�A�åB�[�H�ץ��C
				 */
				savedThis.context.beginPath();
				savedThis.context.lineWidth=1;
				savedThis.context.moveTo(newX1,newY1);
				savedThis.context.lineTo(newX2,newY2);
				savedThis.context.stroke();
			} else {
				/* �w�粒�G�I */ 
				/* �b������Ĥ@�I�e�@�Ӥp�� */
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
				/* �O�s�Ĥ@�I�y�Э� */
				var xPos1=xPos;
				var yPos1=yPos;
				/* �b������ĤG�I�e�@�Ӥp�� */
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
				/* �O�s�ĤG�I�y�Э� */
				var xPos2=xPos;
				var yPos2=yPos;
				/* �b�Ĥ@�I�βĤG�I���e�@���u�A���u�n�e��Ϯ���t */
				var newX1=xPos1+(top-yPos1)*(xPos2-xPos1)/(yPos2-yPos1);
				var newY1=top;
				var newX2=xPos1+(top+height-yPos1)*(xPos2-xPos1)/(yPos2-yPos1);
				var newY2=top+height;
				/* �b�����ˬd newX1 �� newX2 �O�_�X�Ϯإ��k�A
				 * newY1 �� newY2 �@�w�|�b�Ϯؤ��A�p�G�A�Q�n
				 * �����u�O���b�Ϯؤ��A�Цb���[�J�{���ˬd 
				 * newX1 �� newX2�A�åB�[�H�ץ��C
				 */
				savedThis.context.beginPath();
				savedThis.context.lineWidth=1;
				savedThis.context.moveTo(newX1,newY1);
				savedThis.context.lineTo(newX2,newY2);
				savedThis.context.stroke();
				/* �M�w�ثe��Ц�m�����O�ѻ� */
				xPos=(left+width)-(savedThis.barEndIndex-savedThis.msgIndex+1)*	
					(savedThis.barWidth+KBAR_SPACING)+
					savedThis.barOneSideWidth+savedThis.barStickWidth/2;
				var resistance=savedThis.companyHistoryObject.historyDataArray[savedThis.downIndex1].high+
					(savedThis.companyHistoryObject.historyDataArray[savedThis.downIndex2].high-
					savedThis.companyHistoryObject.historyDataArray[savedThis.downIndex1].high)*
					(xPos-xPos1)/(xPos2-xPos1);
				/* �b�ثe��Ц�m�e�X�伵�� */
				xPos=(left+width)-(savedThis.barEndIndex-savedThis.msgIndex+1)*	
					(savedThis.barWidth+KBAR_SPACING)+
					savedThis.barOneSideWidth+savedThis.barStickWidth/2;
				yPos=(top+height)-
					height*(resistance-savedThis.barMinValue)/
					(savedThis.barMaxValue-savedThis.barMinValue);
				/* �p�G��Ц�m�b�Ϯؤ��~�e�X�伵�� */
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

	/* �禡 drawPattern �t�d�e�X�ŦX�Y�� K �u�Φ����s���� */

	function drawPattern() {
		var top=savedThis.volMsgTop;
		var left=savedThis.volMsgLeft;
		var width=savedThis.kbarWidth;

		for (var i=(savedThis.barStartIndex+1);i<=savedThis.barEndIndex;i++) {
			var patternType=savedThis.patternTypeArray[i];
			if (patternType!=-1) {
				/* �p�G patternType ���O -1�A��ܲŦX�F�Y�� K �u
				 * �κA�A�b�Ӥ骺 K �u�ϩM����q�Ϫ������e�X��
				 * �κA����(�Y�Ѥ� 1-10 �اκA��)�C
				 */
				var xPos=(left+width)-(savedThis.barEndIndex-i+1)*	
					(savedThis.barWidth+KBAR_SPACING)+
					savedThis.barOneSideWidth+savedThis.barStickWidth/2;
				var yPos=top;
				savedThis.context.beginPath();

				/* �p�G�O�ݺ����κA�A�h�⩳��]������A�p�G�O��
				 * �^���κA�A�h�⩳��]�����C
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

	/* StockGraphics.prototype.redrawCanvas ��k�Ѧ��}�l */

	/* �}�lø�ϫe���p��e�Ϯɷ|�Ψ쪺���n�Ѽ� */

	this.calcDrawParameter();

	/* �}�l�e K �u�ϡB����q�ϤΧ��u�� */

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

	/* �h�����B�����ѡA,�i�H�b��в��ʮɡA�ݨ�@�Ǽƾ� 
	showMessage("��ЩҦb��m index="+this.msgIndex+"\n");
	appendMessage("�W�v�u��ҭ�="+this.kbarPercent[this.msgIndex].topStick.toFixed(1)+"\n");
	appendMessage("�D���ҭ�="+this.kbarPercent[this.msgIndex].body.toFixed(1)+"\n");
	appendMessage("�U�v�u��ҭ�="+this.kbarPercent[this.msgIndex].bottomStick.toFixed(1)+"\n");
	appendMessage("�W�ɭp�ƭ�="+this.trendCountArray[this.msgIndex].upCount+"\n");
	appendMessage("�U���p�ƭ�="+this.trendCountArray[this.msgIndex].downCount+"\n");
	appendMessage("K �u�κA��="+this.patternTypeArray[this.msgIndex]+"\n");
	*/
};
