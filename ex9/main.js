/*
 * �d�Ң��G�ռg�@�{���U���j�L���v�ѻ���T�A�s�ɡA��Ū�X�C
 * �����G�j�L���v�ѻ���T�i�H�� https://tw.quote.finance.yahoo.net/quote/q?
 *       type=ta&perd=d&mkt=10&sym=%23001 ���o�A�U����ƪ��榡�O
 *
 *       null({"mkt":"10","id":"#001","perd":"d","type":"ta","mem":{
 *       "id":"#001","name":"�[�v����","129":7664.01,...,"126":7729.01},
 *       "ta":[{"t":20151001,"o":8194.3,"h":8317.79,"l":8170.78,"c":8295.94
 *       ,"v":87824},...,{"t":20160122,"o":7729.01,"h":7774.12,"l":7706.14,
 *       "c":7756.18,"v":69118}]
 *
 *       ²�����[�v���ƪ����v�C��ѻ��O�b�G�Ӥ��A�� [] ���A�C�@���Ѥj�A��
 *       {} �]��A �C�Ӹ�ƥѳr�� , ���}�A�p�U����:
 *
 *          "t":20160122 ���
 *          "o":7729.01 �}�L��
 *          "h":7774.12 �̰���
 *          "l":7706.14 �̧C��
 *          "c":7756.18 ���L��
 *          "v":69118 ����q
 *
 *       �s�ɦb STOCK/dayHistory.txt ���A�榡���C�C�@�Ѫ���ơA�C�C��Ʈ榡��
 *       ���,�}�L��,�̰���,�̧C��,���L��,�����\n
 *       �b�s�ɫe�A�|��Ū�X�ɮש�b�O����}�C���A�Y�Y�Ѫ���Ƥw�s�b�h������
 *       �s�ɡC
 *      
 *	 �b�U�����}���� perd=d �O�N��U�������Ƹ�ƬO�C�Ѫ���ơA�Y�אּ perd=w
 *	 �h�U�������Ƹ�ƬO�C�g�@������ơAperd=m �h�O�C��@������ơC
 */


/* ���d�Ҫ��i�J�I�O���B�� window.onload �禡�C */

window.onload=function() {
	var downloadButton;
	var saveButton;
	var readButton;
	var dayRadio;
	var weekRadio;
	var monthRadio;
	var messageBox;
	var historyType;

	/* �禡 readHistoryDataCallback �OŪ���j�L���v��Ƨ�����Q�I�s��
	 * �禡�C�b���禡���D�n�O�NŪ�X���j�L���v��Ʀr����ܵ�Ū�̬d�ݡA
	 * �åB�N��Ʀr���ഫ���}�C�Φ��A�H�ݫ᭱���d�ҨϥΡC
	 */

	function readHistoryDataCallback(textArray) {

		/* �ѩ�O�� readLocalTextFileSeries Ū���ɮסA�]��Ū�X�����
		 * �r��O��b�}�C���A�ҥH textArray[0] ���O�ɮ�Ū�X���r��C
		 */

		var historyDataString=textArray[0];

		showMessage("<pre>Ū�X�j�L��Ʀp�U�G\n");
		appendMessage("�ɶ�		�}�L��	���L��	�̰���	�̧C��	����q(��)\n");

		/* �NŪ�X����Ʀr���ഫ���}�C���Φ��A����ܵ��ϥΪ̬d�ݡC
		 * ��ꪽ���N historyDataString ��ܵ��ϥΪ̬d�ݤ]�O�@�ˡA
		 * �b���u�O�ܽd historyDataArray �j�L��ư}�C���Ϊk�A�b��
		 * �����d�Ҥ��N�|�Q�� historyDataArray �ӵ�ø�ϡC
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

	/* �禡 saveHistoryDataCallback �O�b�x�s�j�L���v��Ƨ�����Q�I�s
	 * ���禡�C�b���禡���D�n�O�N�yŪ�ɡz���s�P��A�åB�]�w���U�yŪ�ɡz
	 * ���s�᪺�{���C
	 */

	function saveHistoryDataCallback() {
		showMessage("�x�s�j�L��Ƨ����A�Ы��yŪ�ɡz���sŪ�X��ƨӬd�ݡC");
		readButton.removeAttribute("disabled");
		readButton.onclick=function () {
			switch (historyType) {
				case "d":
					showMessage("Ū���C��j�L��Ƥ�...");
					readLocalTextFileSeries(
						["/STOCK"],
						["dayHistory.txt"],
						readHistoryDataCallback
					);
				break;
				case "w":
					showMessage("Ū���C�g�j�L��Ƥ�...");
					readLocalTextFileSeries(
						["/STOCK"],
						["weekHistory.txt"],
						readHistoryDataCallback
					);
				break;
				case "m":
					showMessage("Ū���C��j�L��Ƥ�...");
					readLocalTextFileSeries(
						["/STOCK"],
						["monthHistory.txt"],
						readHistoryDataCallback
					);
				break;
			}
		}
	}

	/* �禡 downloadHistoryDataCallback �O�b�U���j�L���v��Ƨ�����
	 * �Q�I�s���禡�C
	 * �禡�D�n�\��O�N�U���������ܵ��ϥΪ̬d�ݡA�åB�]�w�y�s�ɡz
	 * ���s���P�઺���A�A�åB���w���U�y�s�ɡz���s�᪺�{���C
	 */

	function downloadHistoryDataCallback(historyDataArray) {
		showMessage("<pre>�j�L���v��ƤU�������A��Ʀp�U�A�Ы��y�s�ɡz���s�i��s�ɡC\n\n");
		appendMessage("�ɶ�		�}�L��	���L��	�̰���	�̧C��	����q(��)\n");
		historyString=historyDataArrayToString(historyDataArray);
		appendMessage(historyString+"</pre>");

		saveButton.removeAttribute("disabled");
		saveButton.onclick=function () {
			switch (historyType) {
				case "d":
					showMessage("�x�s�C��j�L��Ƥ�...");
					saveLocalTextFileSeries(
						["/STOCK"],
						["dayHistory.txt"],
						[historyString],
						saveHistoryDataCallback,
						true);
				break;
				case "w":
					showMessage("�x�s�C�g�j�L��Ƥ�...");
					saveLocalTextFileSeries(
						["/STOCK"],
						["weekHistory.txt"],
						[historyString],
						saveHistoryDataCallback,
						true);
				break;
				case "m":
					showMessage("�x�s�C��j�L��Ƥ�...");
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

		/* �b HTML �� body �аO�����J�ϥΪ̾ާ@����������аO�C */

    		document.body.innerHTML=
      		"<p><input type=button id='downloadButton' value='�U��'>"+
		"<input type=button id='saveButton' value='�s��'>"+
		"<input type=button id='readButton' value='Ū��'></p>"+
		"<p>�U����ƪ��Φ��G</p>"+
		"<p><input type=radio id='dayRadio' name='type'>�C����"+
		"<input type=radio id='weekRadio' name='type'>�C�g���"+
		"<input type=radio id='monthRadio' name='type'>�C����</p>"+
      		"<p><pre id='msg'>�Х�����U����ƪ��Φ��A"+
		"�A���y�U���z���s�}�l�U���j�L���v��ơC</pre></p>";

		/* �Q�� getElementById ���o�ϥΪ̾ާ@��������b JavaScript
		 * �y����������A�æs��ϰ��ܼƤ��C
		 */

		downloadButton=document.getElementById("downloadButton");
		saveButton=document.getElementById("saveButton");
		readButton=document.getElementById("readButton");
		dayRadio=document.getElementById("dayRadio");
		weekRadio=document.getElementById("weekRadio");
		monthRadio=document.getElementById("monthRadio");
    		messageBox=document.getElementById("msg");

		/* �]�w�ϥΪ̾ާ@��������l���A�C */
		
		saveButton.setAttribute("disabled","true");
		readButton.setAttribute("disabled","true");

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

		/* �]�w�y�U���z���s���ƥ�B�z�禡�C	
		 * �b���ƥ�B�z�禡���|�I�s downloadHistoryData �禡�A
		 * �ñN�U����ƧΦ����ϰ��ܼ� historyType �ǤJ�Ө禡�A
		 * �P�ɤ]�n�ǤJ�@�Ӧ^�I�禡 downloadHistoryDataCallback
		 * ��ܤU���j�L���v��ƨóB�z���}�C�Φ���A�ҭn�^�I��
		 * �禡�A���^�I�禡�|���U����Ӧp��B�z���v��ư}�C��
		 * �u�@�C
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
