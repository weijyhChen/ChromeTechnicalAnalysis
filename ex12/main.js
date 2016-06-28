/*
 * �d��12�G���d�ұN�ܽd�j�L���ƤΦU�Ѿ��v��T���U�ا޳N���R���Ъ�
 * �p��C�ѩ�޳N���R�����к� ���c�h�A���d�ұN�u���`�Ϊ��X�ا޳N
 * ���Ъ��ܽd�A�䥦�����Яd��Ū�̦ۦ��s�C�`���� �޳N���R���Ц�
 * ���Ʋ��P���ʥ����u(Moving Average Convergence Divergence,MACD)
 * �BKD�H ���_������(KD Stochastic Oscillator)�B�۹�j�z����
 * (Relative Strength Index,RSI)�C
 */

/* ���� �`�N�G���F���v�T�쥻��X�d�� 10 ���{���B�@�A�]��������
 * historyObject.js�ɮסA�ҥH��p��X�Ӫ��j�L�ΦU���q���и�Ʃ�b�o
 * �̡A��ڤW�M�j�L�ΦU���q������������ө�b CompanyHistory ���󤤡C
 * �b�p��o�Ǹ�T�|���T�w�O�_���s�Ҧ����q���v��T�@���A�p�G�S����
 * �s�U���q���v��T�h�|���U���q��T�ƶq���@�P�����ΡC
 */

/* updatedHistoryData �ܼƥΨӫ��ܦU���q��T�O�_���̷s���A�A����
 * �|�����ʩΦ۰ʧ�s�����ܡA�Y�ϥΪ̤�ʫ��U�y��s�Ҧ����q���v
 * ��T�z���s�A�h���ȷ|�Q�]�� true�C�Y���Ȧb�}�l�p��U�C�U���ƭ�
 * �ɬO false�A�|���۰ʧ�s�@���C
 */
var updatedHistoryData=false;

/* startButtonPressed �ܼƫ��X�ثe�i�檺�y��s�Ҧ����q���v��T�z
 * �ʥ�O��ʩΦ۰ʵo�͡A�Y�O�]���ϥΪ̫��U�y�}�l�C�X�޳N���Сz
 * �ҳy�����۰ʧ�s�A�h�|�N���ȳ]�� true�C
 */
var startButtonPressed=false;

/* cema15Array �}�C�ΨӦs��15%���Ʋ��ʥ����u(Calculation, Exponential Moving Average) */
var cema15Array=[];

/* cema7dot5Array �}�C�ΨӦs��7.5%���Ʋ��ʥ����u(Calculation, Exponential Moving Average) */
var cema7dot5Array=[];

/* macdArray �}�C�ΨӦs�񥭷Ʋ��P���ʥ����u(Moving Average Convergence/Divergence) */
var macdArray=[];

/* ���d�Ҫ��i�J�I�O���B�� window.onload �禡�C */
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

	/* �禡 timeCompare �Φb�N advanceArray �� declineArray
	 * �ƧǮɡA�ӤG�}�C���������O����A���󤺮e�p�U�G
	 *	{"time":�ɶ�,"inc":�W�[��,"Volume":����q}
	 * �禡���� data1 �� data2 �Y�W�z������C
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
		} else {														// �~���ۦP
			if (month1>month2) {
				return 1;
			} else if (month1<month2) {
				return -1;
			} else {													// ����ۦP
				if (day1>day2) {
					return 1;
				} else if (day1<day2) {
					return -1;
				} else {												// ����ۦP
					return 0;
				}
			}
		}
	}

	var historyDataArrayForTechnicalAnalysis=[];
	/* �禡 determineHistoryDataArray �ӨM�w���޳N���R�p��ɭn�Ψ쪺���v��ư}�C�O���@�� */
	function determineHistoryDataArray() {
		/* ��l�� historyDataArrayForTechnicalAnalysis ���Ű}�C�A�ӫ�P�w��
		 * �έ��@�Ӱ}�C���w�� historyDataArrayForTechnicalAnalysis ���޳N
		 * ���R�n�Ψ쪺���v��ư}�C�C
		 */
		historyDataArrayForTechnicalAnalysis=[];
		if (twMarketCheckbox.checked) {
			/* �p�G�ϥΪ̤Ŀ�F�y�j�L�z�֨��� */
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

	/* �禡 calcCemaArray �Ψӭp����Ʋ��ʥ����u(Calculation, Exponential Moving Average) */
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

	/* �禡 calcMacdArray �Ψӭp�⥭�Ʋ��P���ʥ����u(Moving Average Convergence/Divergence) */
	function calcMacdArray() {
		macdArray=[];
		for (var i=0;i<historyDataArrayForTechnicalAnalysis.length;i++) {
			var macd=cema15Array[i]-cema7dot5Array[i];
			macdArray.push(macd);
		}
	}

	/* �禡 calcTechnicalIndicator �Ψӭp��U�ا޳N���R���� */
	function calcTechnicalIndicator() {
		determineHistoryDataArray();
		cema15Array=calcCemaArray(0.15);
		cema7dot5Array=calcCemaArray(0.075);
		calcMacdArray();
	}

	/* �禡 printTechnicalIndicator �ΨӦC�L�X�U�ا޳N���R���� */
	function printTechnicalIndicator() {
		appendMessage("�L�X");
		if (twMarketCheckbox.checked) {
			appendMessage("�j�L");
		} else if (companyIndex!=-1) {
			appendMessage(savedCompanyArray[companyIndex].companyName);
		}
		appendMessage("�U�ا޳N���R����:\n");
		appendMessage("CEMA15\t\t15%���Ʋ��ʥ����u\n");
		appendMessage("CEMA75\t\t7.5%���Ʋ��ʥ����u\n");
		appendMessage("MACD\t\t���Ʋ��P���ʥ����u\n");
		appendMessage("\n");
		appendMessage("�ɶ�\t\tCEMA15\tCEMA75\tMACD");
		appendMessage("\n");
		for (var i=0;i<historyDataArrayForTechnicalAnalysis.length;i++) {
			appendMessage(
				historyDataArrayForTechnicalAnalysis[i].time+"\t"+
				cema15Array[i].toFixed(1)+"\t"+
				cema7dot5Array[i].toFixed(1)+"\t"
			);
			/* MACD ���Ȧb16������~���� */
			if (i>26) {
				appendMessage(macdArray[i].toFixed(2)+"\t");
			} else {
				appendMessage("0.0\t");
			}
			appendMessage("\n");
		}
	}

	/* �禡 showTechnicalIndicator �I�s�p�⺦�^��T���禡�έp��U�ا޳N���Ъ��禡 */
	function showTechnicalIndicator() {
		showMessage("");
		appendMessage("�}�l�p��j�L�έӪѦU�ا޳N���СA�еy��...\n");
		calcTechnicalIndicator();
		appendMessage("�p��j�L�έӪѦU�ا޳N���Ч����A�L�X�U�ا޳N���СC\n");
		printTechnicalIndicator();
	}

	/* �禡 createCompanyHistoryObjectCallback �O�ѨϥΪ̿�ܤ��q
	 * ID �Τj�L����A���ͥX�Ӥ��q���v��T�� companyHistoryObject
	 * ����Q�I�s���禡�C���ɴN�i�H�Φ����v��T����Ӷi��C�X�޳N
	 * ���Ъ��u�@�C
	 */
	function createCompanyHistoryObjectCallback() {
		if (updatedHistoryData===false) {
			/* ���v��ƥ���s�A�}�l������s���v��ơC�ѩ�
			 * �I�s updateButton.onclick() �禡��A���|�A
			 * �^�즹�禡���A�]���]�w startButtonPressed
			 * �ܼƬ� true �A��ܬO�ѩ�ϥΪ̫��U�y�}�l
			 * �C�X�޳N���Сz�ҳy������s�C
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
			/* �b HTML �� body �аO�����J�ϥΪ̾ާ@����������аO�C */
			/* ���d�Ҫ��H�������M�e�@�ӽd�ҴX�G�@�ˡA�ߤ@�����P�u����
		 	 * ��� K �u�Ϫ� canvas �h���C�]���Ψ쪺��ƩM�e�@�ӽd��
		 	 * �����@�ˡA�u�O�e�@�ӽd�ҬO�e K �u�ϡA���d�ҬO�C�X�޳N
		 	 * ���ЦӤw�C
		 	 */
    	document.body.innerHTML=
			"<p>�п�J�Ѳ��N���G<input type=text size=6 id='idText' name='id'>&nbsp�Ϊ�&nbsp"+
			"���q�W�١G<input type=text size=6 id='companyText' name='company'>&nbsp�Ϊ�&nbsp"+
			"<input type=checkbox id='twMarketCheckbox' name='tw-market'>�j�L&nbsp&nbsp"+
			"<input type=button id='companyButton' value='���q�N���C��'>&nbsp&nbsp"+
			"<input type=button id='updateButton' value='��s�Ҧ����q���v��T'></p>"+
			"<p>ø�Ϫ��Φ��G"+
			"<input type=radio id='dayRadio' name='type'>�C����"+
			"<input type=radio id='weekRadio' name='type'>�C�g���"+
			"<input type=radio id='monthRadio' name='type'>�C����&nbsp&nbsp"+
			"<input type=button id='startButton' value='�}�l�C�X�޳N����'>&nbsp&nbsp"+
			"<input type=button id='clearButton' value='�M���T��'></p>"+
      		"<p><pre id='msg'>�п�J���q�N���ΤĿ�y�j�L�z�A"+
			"�M����U�y�}�l�C�X�޳N���Сz���s\n</pre></p>";
			/* �Q�� getElementById ���o�ϥΪ̾ާ@��������b JavaScript
		 	 * �y����������A�æs��ϰ��ܼƤ��C
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
			/* �]�w�ϥΪ̾ާ@��������l���A�C */
			clearButton.onclick=function () {
				showMessage("");
			}
			/* �]�w�y�T�����z���j�p�C */
      window.onresize=windowOnResize;
      windowOnResize();
			/* �]�w�U����ƧΦ�����s���ƥ�B�z�{���C
			 * �@���T�ؤU����ƪ��Φ��A�ϥΪ̫��U�䤤�@�Ӷ�s�ɡA
			 * �N�|�]�w historyType �����P���ȡA�p�U�G
		 	 *
		 	 * 	�C���ơGhistoryType �O "d"
		 	 *	�C�g��ơGhistoryType �O "w"
		 	 *	�C���ơGhistoryType �O "m"
		 	 *
		 	 * �w�]�O�U���C���ơA�ҥH�@�}�l�n���@�U�y�C���ơz
		 	 * ����s�C
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
			/* �w�]�Oø�s�j�L K �u�� */
			twMarketCheckbox.click();
			idText.value="";
			companyText.value="";
			/* �p�G�ϥΪ̤Ŀ�y�j�L�z�֨����s�A�h�M�� idText ��r�� */
			twMarketCheckbox.onclick=function () {
				if (twMarketCheckbox.checked) {
					idText.value="";
					companyText.value="";
				}
			};
			/* �p�G�ϥΪ̿�J���q ID �A�h�����y�j�L�z�֨������Ŀ� */
			idText.onkeydown=function() {
				twMarketCheckbox.checked=false;
				companyText.value="";
			};
			companyText.onkeydown=function() {
				twMarketCheckbox.checked=false;
				idText.value="";
			};
			/* ���U�y���q�N���C��z���s����檺�禡 */
			companyButton.onclick=function () {
				showMessage("���q�N���C��G\n");
				for (var i=0;i<totalCompany;i++) {
					appendMessage("\t"+savedCompanyArray[i].companyName+
					      "\t"+savedCompanyArray[i].companyID+
					      "\n");
				}
			};
			/* ���U�y��s�Ҧ����q���v��T�z���s����檺�禡 */
			updateButton.onclick=function () {
			var index=-1;
			/* �}�l��s��ƫ�A���i�H���U�y�}�lø�ϡz�����s */
			startButton.setAttribute("disabled","true");
			updateButton.setAttribute("disabled","true");
			companyButton.setAttribute("disabled","true");
			function newMarketMonthHistoryCallback() {
				marketMonthHistoryObject=companyHistoryObject;
				/* ��s�Ҧ����v��Ƨ�����A�i�H���U�y�}�lø�ϡz�����s */
				startButton.removeAttribute("disabled");
				updateButton.removeAttribute("disabled");
				companyButton.removeAttribute("disabled");
				showMessage("�Ҧ����q�Τj�L���v��T��s�����C\n");
				/* ��s�Ҧ����v��T��� updatedHistoryData �]�� true
				 * ��ܥثe�Ҧ����q�����v��T���O�̷s���F�C
				 */
				updatedHistoryData=true;
				if (startButtonPressed===true) {
					/* ��s���Ҧ����T��A�p�G�O�]�����U�y�}�l
					 * �C�X�޳N���Сz���s�ҳy������s�ʧ@�A�b
					 * ��s������A�n�I�s�C�X�޳N���Ъ��禡�C
					 */
					startButtonPressed=false;
					showTechnicalIndicator();
				}
			}

			function newMarketWeekHistoryCallback() {
				marketWeekHistoryObject=companyHistoryObject;
				/* ��s�j�L�C����v��T */
				companyHistoryObject=new CompanyHistory(
						"%23001",
						"�j�L",
						"m",
						newMarketMonthHistoryCallback
				);
			}

			function newMarketDayHistoryCallback() {
				marketDayHistoryObject=companyHistoryObject;
				/* ��s�j�L�C�g���v��T */
				companyHistoryObject=new CompanyHistory(
						"%23001",
						"�j�L",
						"w",
						newMarketWeekHistoryCallback
				);
			}

			/* �禡 newCompanyMonthHistoryCallback �O��s�@�a���q�C����v��T��
			 * ���^�I�禡�C
			 */
			function newCompanyMonthHistoryCallback() {
				if (index>=0) {
					companyMonthHistoryObjectArray.push(companyHistoryObject);
				}
				index++;
				showMessage("��s�Ҧ����q�C����v��Ƥ��A�еy��...\n"+
				    	    "index="+index+"\n");
				if (index==totalCompany) {
					/* �Ҧ����q�C����v��T��s���� */
					showMessage("�Ҧ����q���v��T��s�����C\n");
					appendMessage("��s�j�L�C����v��T�A�еy��...\n");
					companyHistoryObject=new CompanyHistory(
							"%23001",
							"�j�L",
							"d",
							newMarketDayHistoryCallback
					);
				} else {
					/* �� new CompanyHistory ��s�C�a���q����� */
					companyHistoryObject=new CompanyHistory(
						savedCompanyArray[index].companyID,
						savedCompanyArray[index].companyName,
						"m",
						newCompanyMonthHistoryCallback
					);
				}
			}

			/* �禡 newCompanyWeekHistoryCallback �O��s�@�a���q�C�g���v��T��
			 * ���^�I�禡�C
			 */
			function newCompanyWeekHistoryCallback() {
				if (index>=0) {
					companyWeekHistoryObjectArray.push(companyHistoryObject);
				}
				index++;
				showMessage("��s�Ҧ����q�C�g���v��Ƥ��A�еy��...\n"+
				    	    "index="+index+"\n");
				if (index==totalCompany) {
					/* �Ҧ����q�C�g���v��T��s�����A���s�]�w
					 * index �A�I�s newCompanyMonthHistoryCallback
					 * �禡�}�l��s�Ĥ@�a���q���C����v��T�C
					 */
					index=-1;
					newCompanyMonthHistoryCallback();
				} else {
					/* �� new CompanyHistory ��s�C�a���q����� */
					companyHistoryObject=new CompanyHistory(
						savedCompanyArray[index].companyID,
						savedCompanyArray[index].companyName,
						"w",
						newCompanyWeekHistoryCallback
					);
				}
			}

			/* �禡 newCompanyDayHistoryCallback �O��s�@�a���q�C����v��T��
			 * ���^�I�禡�C
			 */
			function newCompanyDayHistoryCallback() {
				/* �C���i�즹�B����ܦ��@�a���q���C����Ƥw��s�A
				 * companyHistoryObject ����h�O�Ӥ��q�����v���
				 * ����A�ҥH�n�⥦��� companyDayHistoryObjectArray
				 * �}�C���C�u���b�Ĥ@���i�J�� companyHistoryObject
				 * ���O���v��T����C
				 */
				if (index>=0) {
					companyDayHistoryObjectArray.push(companyHistoryObject);
				}
				index++;
				showMessage("��s�Ҧ����q�C����v��Ƥ��A�еy��...\n"+
				    	    "index="+index+"\n");
				if (index==totalCompany) {
					/* �Ҧ����q�C����v��T��s�����A���s�]�w
					 * index �A�I�s newCompanyWeekHistoryCallback
					 * �禡�}�l��s�Ĥ@�a���q���C�g���v��T�C
					 */
					index=-1;
					newCompanyWeekHistoryCallback();
				} else {
					/* �� new CompanyHistory ��s�C�a���q����� */
					companyHistoryObject=new CompanyHistory(
						savedCompanyArray[index].companyID,
						savedCompanyArray[index].companyName,
						"d",
						newCompanyDayHistoryCallback
					);
				}
			}

			/* �I�s newCompanyDayHistoryCallback �}�l��s�Ĥ@�a���q���C
			 * ����v��T�Cindex �O�ثe�n��s�����q�b savedCompanyArray
			 * ���� index �ȴ�h 1�A��l�� index=-1 �A�b�i��
			 * newCompanyDayHistoryCallback �禡����|�[ 1�A�ҥH�Ĥ@�a��
			 * �q�� index �O 0�C
			 */
			newCompanyDayHistoryCallback();
		};

		/* ���U�y�}�l�z���s����檺�禡 */
		startButton.onclick=function () {
			if (twMarketCheckbox.checked) {
				/* �p�G�ϥΪ̤Ŀ�F�y�j�L�z�֨����A�h�إߤ@�Ӥj�L
				 * �����v��ƪ���C����إ�(��s���)������A�I�s
				 * createCompanyHistoryObjectCallback �禡�i�����
				 * ��ø�Ϥu�@�C
				 */
				companyIndex=-1;
				companyHistoryObject=new CompanyHistory(
							"%23001",
							"�j�L",
							historyType,
							createCompanyHistoryObjectCallback
						);
			} else if (idText.value!=="") {
				/* �p�G�ϥΪ̿�J�F���q���N���A�h�q savedCompanyArray ��
				 * �d�M�O�_���Ӥ��q�N�������q�s�b�C
				 */
				showMessage("�d�M���q�N����...\n�@��"+totalCompany+"�a���q\n");
				/* ���]�w found �ܼƬO false �A�N��䤣��ϥΪ̫��w��
				 * �����q�N���C foundIndex �N���쪺���q�b savedCompanyArray
				 * ���� index�A�@�}�l���]�L�Ӥ��q�A�ҥH foundIndex=-1
				 */
				/* �C�a���q�@�@��� companyId �O�_�� idText.value(�ϥΪ̿�J
				 * ��ID)�C
				 */
				for (var i=0;i<totalCompany;i++) {
					if (savedCompanyArray[i].companyID==idText.value) {
						/* �p�G���ϥΪ̿�J�� ID �ȫh�]�w found
						 * �ȬO true�A��ܧ��F�Ӥ��q�C���ɪ� i
						 * �ȧY�Ӥ��q�b savedCompanyArray ���� index�C
						 */
						found=true;
						foundIndex=i;
					}
				}
				if (found) {
					appendMessage("���Ӥ��q�N�������q!\n���q�N���O�G"+
						savedCompanyArray[foundIndex].companyID+"\n"+
						"���q�W�٬O�G"+
						savedCompanyArray[foundIndex].companyName+"\n"
						);
					/* �Q�Χ�쪺���q ID ���ͤ@�� CompanyHistory ����A
					 * ���󲣥�(��s�������v���)��A�|�I�s
					 * createCompanyHistoryObjectCallback �禡�i�����
					 * ø�Ϥu�@�C
					 */
					companyIndex=foundIndex;
					companyHistoryObject=new CompanyHistory(
							savedCompanyArray[foundIndex].companyID,
							savedCompanyArray[foundIndex].companyName,
							historyType,
							createCompanyHistoryObjectCallback
						);
				} else {
					appendMessage("�L�Ӥ��q�N�������q�A�Э��s��J�N��!\n");
				}
			} else {
				/* �p�G�ϥΪ̿�J�F���q���W�١A�h�q savedCompanyArray ��
				 * �d�M�O�_���Ӥ��q�W�٪����q�s�b�C
				 */
				showMessage("�d�M���q�W�٤�...\n�@��"+totalCompany+"�a���q\n");
				/* ���]�w found �ܼƬO false �A�N��䤣��ϥΪ̫��w��
				 * �����q�W�١C foundIndex �N���쪺���q�b savedCompanyArray
				 * ���� index�A�@�}�l���]�L�Ӥ��q�A�ҥH foundIndex=-1
				 */
				var found=false;
				var foundIndex=-1;
				/* �C�a���q�@�@��� companyName �O�_�� companyText.value(�ϥΪ̿�J
				 * ��ID)�C
				 */
				for (var i=0;i<totalCompany;i++) {
					if (savedCompanyArray[i].companyName==companyText.value) {
						/* �p�G���ϥΪ̿�J�����q�W�٫h�]�w found
						 * �ȬO true�A��ܧ��F�Ӥ��q�C���ɪ� i
						 * �ȧY�Ӥ��q�b savedCompanyArray ���� index�C
						 */
						found=true;
						foundIndex=i;
					}
				}
				if (found) {
					appendMessage("���Ӥ��q�W�٤����q!\n���q�N���O�G"+
						savedCompanyArray[foundIndex].companyID+"\n"+
						"���q�W�٬O�G"+
						savedCompanyArray[foundIndex].companyName+"\n"
						);
					/* �Q�Χ�쪺���q�W�ٲ��ͤ@�� CompanyHistory ����A
					 * ���󲣥�(��s�������v���)��A�|�I�s
					 * createCompanyHistoryObjectCallback �禡�i�����
					 * ø�Ϥu�@�C
					 */
					companyIndex=foundIndex;
					companyHistoryObject=new CompanyHistory(
							savedCompanyArray[foundIndex].companyID,
							savedCompanyArray[foundIndex].companyName,
							historyType,
							createCompanyHistoryObjectCallback
						);
				} else {
					appendMessage("�L�Ӥ��q�W�٤����q�A�Э��s��J�N��!\n");
				}
			}
		};
		startButton.setAttribute("disabled","true");
		updateButton.setAttribute("disabled","true");
		companyButton.setAttribute("disabled","true");
  }

	/* �禡 saveNameFileCallback �O�b�C�U���q�ؿ��إߧ����A�åB�b
	 * �U���q�ؿ��U�s�J name.txt �ɮ׫�Q�I�s���禡�C�ܦ��A�Ĥ@��
	 * ����{���ɡA�U���q���ؿ����s�b�����D�w�����ѨM�A�ϥΪ̥i�H
	 * �U���U���q�����v��T�A�åB�s�b�U���q���ؿ����F�C�p�G���O��
	 * �@�����榹�{���A�]�S�����D�A�쥻�s�b���U���q�ؿ��ξ��v��T
	 * ���M�i�H�ϥΡC
	 * �G�ӡA���禡�u�n�A��ܰT��
	 */
	function saveNameFileCallback() {
		showMessage("�п�J���q�N���ΤĿ�y�j�L�z�A"+
			"�M����U�y�}�l�C�X�޳N���Сz���s\n");
		startButton.removeAttribute("disabled");
		updateButton.removeAttribute("disabled");
		companyButton.removeAttribute("disabled");
	}

	/* �禡 saveCompanyDataCallback �O�N�U���q�W�٤ΥN����Ʀs�J
	 * company.txt �ɮפ���I�s���禡�C�b���禡���A���C�a���q�إ�
	 * �@�ӥؿ��A�æb�䤤�s�J�@�� name.txt �ɮסA���ɮפ��O�U���q
	 * �����ݦW�١C�즹�C�a���q�����ۤv���ؿ��F�A�{���N�i�H�Φ���
	 * ���������v��T�Ӱ���s�F�C
	 * �b�إߥؿ��Φs�J name.txt �ɮ׮ɡA�p�G���ɮפw�s�b�A�h��
	 * �л\�ӥؿ����ɮסA�ؿ��U�����v��T�N�û��s�b�C
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

	/* �禡 getCompanyArrayCallback �O�U���������O����������A�ä��R
	 * �X�U���q���W�١B�N�������O��A�Q�I�s���禡�C
	 * �ǤJ���Ѽ� companyArray �O�U���q�e�z��ƪ����󤧰}�C�A���禡��
	 * �N companyArray �}�C�ǵ� saveCompanyData �禡�s�U company.txt
	 * �ɡC�s�ɧ�����A�I�s saveCompanyDataCallback �禡�~����򪺤u�@�C
	 */
	function getCompanyArrayCallback(companyArray) {
		/* �N�ǤJ�� companyArray �s�J savedCompanyArray �ܼƤ�
		 * �A�H�K�䥦�禡�i�H���o�U���q ID ��T�C
		 */
		savedCompanyArray=companyArray;
		totalCompany=savedCompanyArray.length;
		saveCompanyData(
			companyArray,
			saveCompanyDataCallback
		);
	}

	/* �禡 getClassTableCallback �O�U�����q���O�������\��|�I�s���禡
	 * �A�禡�ǤJ���ѼƬO���q���O���}�C�C���d���~��I�s getCompanyArray
	 * �禡�H�K�U���Ҧ����O�������A�è��o�U���q�N�����}�C�C���o���q�N
	 * ���}�C��A�|�I�s getCompanyArrayCallback �禡�C
	 */
	function getClassTableCallback(classArray) {
		getCompanyArray(
			classArray,
			getCompanyArrayCallback
		);
	}

	/* �禡 downloadCompanyInfo �O�bŪ�� company.txt ���ѮɳQ�I�s
	 * ���禡�A���ɭn�q�����W�U���U���q�����ΥN����ơA�åB���s��
	 * �� company.txt �ɮסC
	 */
	function downloadCompanyInfo() {
		openLocalFileSystem("/STOCK");
		getClassTable(getClassTableCallback);
	}

	/* �禡 readCompanyFileCallback �OŪ�� company.txt ���\��|�Q
	 * �I�s���禡�A�p�G company.txt Ū�X�����e�O "" �A��ܬO�Ĥ@��
	 * ����{���A�ҥH�ɮפ��s�b�A���ɥ����I�s downloadCompanyInfo
	 * �禡���s�Ѻ����U�����q��ơA�æs�ɦ� company.txt �ɡC�p�G
	 * ���O�Ĥ@������{���A�h company.txt �ɮ׷|�s�b�A�h�����Υ�
	 * Ū�X�����e�Ӳ��ͤ��q�N���ΦW�ٸ�ƪ� companyArray �}�C�Y�i�C
	 */
	function readCompanyFileCallback(companyTextArray) {
		var companyText=companyTextArray[0];
		if (companyText=="") {
			/* �p�G company.txt ���s�b�A�h�I�s downloadCompanyInfo
			 * �U���s�����q������ơC
			 */
			downloadCompanyInfo();
		} else {
			var companyArray=[];
			/* �N company.txt �ɮ�Ū�X�����e�� "\n" ���Φ��U���q
			 * ����Ʀr��Cfor �j�餤�{���аѦҺ�X�d�� 3 ����
			 * findStockIdByHref() �禡���������C
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

	/* �{���@�}�l�n�p��X�d�� 3 ���@�ˡA������ company.txt�A�o�ˤ~�i�H
	 * �T�w�ϥΪ̦b idText ��J������J���N���O�_�s�b�C���ۤ]�n����X
	 * �d�� 5 �@��A�n���إߥX�U���q���ؿ��ΰ��ɮסA�p���b���d�Ҥ��~�i
	 * �H�b�U���q�ؿ����s�J���v��ƪ��ɮסC
	 */
	showInterface();

	/* ��ܧ��ϥΪ̤�����A�ߨ�Ū�� company.txt �ɮסA�H���o���q�N������
	 * �ơAŪ�� company.txt �ɮ׫�A�|�I�s readCompanyFileCallback �禡�C
	 * �p�G�O�Ĥ@�����榹�{���h company.txt �ɮױN���s�b�A�|Ū�����ơA
	 * �o�ɴN�i�H�A������W�U���U���q���O��T�����Y�i�C
	 */
	readLocalTextFileSeries(
		["/STOCK"],
		["company.txt"],
		readCompanyFileCallback
	);
};
