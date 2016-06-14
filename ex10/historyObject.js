/* �禡 CompanyHistory �O���q���v��T���󪺫غc���A�ǤJ���Ĥ@�ӰѼƬO
 * �N���q���N���C�U���q���v�ѻ���T�i�H�ѡy 
 * https://tw.quote.finance.yahoo.net/quote/q?type=ta&perd=d&
 * mkt=10&sym=���q�N���z���o�A�Y���q�N���O�y%23001�z��ܬO�j�L
 * �����v��ơA�U����ƪ��榡�O
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
 * �ǤJ���ĤG�ӰѼ� historyType �N��n�d�ݪ���ƫ��A�A�ԲӪ������Ьݫغc��
 * ���������C
 * �ǤJ���ĤT�ӰѼ� callback �O���v��Ƨ�s����|�I�s���禡�C�b���ͪ���
 * ��U�A����{�������N�|���ɮפ�Ū�J�����ɮסA���X�w�g�s�ɪ����v��ơA
 * �M��|�U���������̷s�����v��Ƨ�s���󤤪� historyDataArray �}�C�A��
 * �s����|�A����v��Ʀs�ɡA�s���ɴN�|�I�s callback �禡�A�H�K�^�쪫��
 * �ϥΪ̪�������C
 *
 * ����X�d�Ҥ��A�Q�Ϋܦh�T����X����ܲ��������U�F�ѵ{�����檺���ΡA��
 * �Ǫ̥i�H�ǲ߳o�����ޥ��A�b�{�����檬�p���p�A���Q���ɡA���ɤ@�I�p�p��
 * �T���N�i�H���A�F�Ѱ��D�X�b����a��C
 */

function CompanyHistory(companyId,companyName,historyType,callback) {
	
	/* �ݩ� historyDataArray �O���q�����v��T�A���v��T���κA�O
	 * ���ݩ� historyType �M�w�C
	 */

	this.historyDataArray=[];

	/* �ݩ� companyId �O���q�N�� */

	this.companyId=companyId;
	this.companyName=companyName;

	/* �ݩ� callback �O���v��Ƨ�s�L��|�^�I���禡 */

	this.callback=callback;

	/* �ݩ� historyType �N�����v��T�O��u�B�g�u�Τ�u����ơA�����ȥi�H�O
	 *
	 * 	"d" ��ܬO�C����v���
	 *	"w" ��ܬO�C�g���v���
	 *	"m" ��ܬO�C����v���
	 *
	 * �b���Q�ΩI�s���󥻨�����k setHistoryType �ӳ]�w��ƫ��A�C
	 */

	this.setHistoryType(historyType);
	
	/* appendMessage("CompanyHistory:\ncompanyId="+this.companyId+
		"�AhistoryType="+this.historyType+"\n");*/
}

/* ���O CompanyHistory �� setHistoryType ��k�Ψӳ]�w�Ӫ���
 * historyType �ݩʡC
 * �b�@�몺�{�����A���M�i�H�� companyHistoryObject.historyType="d"
 * ���覡�����]�w companyHistoryObject ���� historyType �ݩʡA
 * ���o�O���諸�覡�A�Ҧ������ݩʳ����ӳz�L��k�ӧ��ܩΨ��o����
 * �ȡC�p�G���o�˰��i��|���H�U�����D�G
 *
 *	(1) �]�w���ݩʭȶW�L�e�\���d��C
 *	    �p�G�z�L��k�ӳ]�w�ݩʭȡA�b��k���N�i�H�Q�ε{�����ˬd
 *	    �]�w�ȬO�_�X�k�C
 *	(2) �]�w�ݩʭȫ�A���󤺳����A�L�k�۰ʧ�s�C
 *	    �p�G�z�L��k�ӳ]�w�ݩʭȡA�b��k���i�H�ھ��ݩʭȪ�����
 *	    �[�J�{���۰ʧ�s���󪺤������A(���)�C
 *
 * ���󪺤�k�@�볣�O���o�˥i�H�ѨϥΪ��󪺵{���ҩI�s���禡�A�ϥ�
 * ���󪺵{���z�L��k�i�H�ާ@����A�]�����󪺤�k���ɤ]�i�ٰ�
 * �y�����z�C
 * �H setHistoryType ��k�ӻ��A���M�u�O²�檺���ܪ��� historyType
 * ���ݩʡA���٬O�n�Τ@�Ӥ�k�ӧ����A�]���b�o�Ӥ�k���A�����n�ˬd
 * �]�w�ƭ� historyType �O�_�� "d","w"��"m"�A�p�G�ϥΪ̳]�w�F���~��
 * historyType �ƭȡA���� CompanyHistory ���󪺵{���i�ೣ�|�X���D
 * �F�C�t�~�A�]�w�� historyType �ݩʫ�A���������v��T�i��N����F
 * �A���ɴN�n�ھڷs�� historyType ��s���������v��Ƥ~��C
 */

CompanyHistory.prototype.setHistoryType=function (historyType) {
	if ((historyType!="d") && (historyType!="w") && (historyType!="m")) {

		/* ��ܳ]�w historyType ���~�T���A�r��V�X��B��
		 * �޸��O���F���ϥθ���r���A��ֵ{�������ëסC
		 */

		showMessage('�I�s setHistoryType ��k�ɡAhistoryType ���~!\n');
		appendMessage('historyType='+historyType+"\n");
		appendMessage('historyType �X�k�ȬO "d","w","m" �C');
	}
	this.historyType=historyType;
	this.update();
};

/* ���O CompanyHistory �� getHistoryType ��k�O�ΨӨ��o�Ӫ���
 * historyType �ݩʭȡC�M setHistoryType ��k�@�ˡA�n���o����
 * ���ݩʤ]�O�n�z�L��k�h���o�A���i�H�����s�����󤺳����ݩʡC
 */

CompanyHistory.prototype.getHistoryType=function () {
	return this.historyType;
};

/* ���O CompanyHistory �� update ��k�O�Ψӧ�s�Ӫ��󤺳���
 * historyDataArray ���v��T�}�C���e�C
 */

CompanyHistory.prototype.update=function () {

	/* �禡 downloadHistoryData �O�ΨӤU���j�L�ΦU���q�����v��T����
	 * �A�U���������|�Q�B�z���}�C�����c�A�ñN���}�C�ǵ� callback �^�I
	 * �禡�C����k���D�n�{���M�e�@�Ӻ�X�d�Ҥ��� downloadHistoryData
	 * �禡(�b history.js �ɮפ�)�X�G�@�ˡC
	 */

	function downloadHistoryData() {


		/* historyDataStringToObject �禡�O�N�U�C�榡�r�ꪺ�Ѽ��ഫ������
		 * ��Ǧ^�C
		 *
		 * "t":20151223,"o":8296.58,"h":8359.25,"l":8296.58,"c":8315.7,"v":74307
		 */

		function historyDataStringToObject(oneData) {
		
			/* �����N�ǤJ����Ʀr��� "," �[�H���ΡA�ño�� dataSplitArray
			 * �}�C�C�}�C���C�Ӥ����N���Ʀr�ꪺ���@�Ӹ�ơA���O�p�U�G
			 *
			 *	dataSplitArray[0] �� "t":20151223
			 *	dataSplitArray[1] �� "o":8296.58
			 *	dataSplitArray[2] �� "h":8259.25
			 *	dataSplitArray[3] �� "l":8296.58
			 *	dataSplitArray[4] �� "c":8315.7
			 *	dataSplitArray[5] �� "v":74307(��G�ʸU)
			 */

			var dataSplitArray=oneData.split(",");
			
			/* �B�z dataSplitArray[0] ���o�ɶ���T�A��k�O
			 * �N��� ":" �[�H���}�A�o�� tempSplitArray �}�C
			 * �AtempSplitArray �}�C���������p�U�G
			 *
			 *	tempSplitArray[0] �O "t"
			 *	tempSplitArray[1] �O 20151223 �Y�ɶ���T
			 */

			var tempSplitArray=dataSplitArray[0].split(":");
			var time=tempSplitArray[1];
			
			/* �B�z dataSplitArray[1] ���o�}�L����T�A��k�O
			 * �N��� ":" �[�H���}�A�o�� tempSplitArray �}�C
			 * �AtempSplitArray �}�C���������p�U�G
			 *
			 *	tempSplitArray[0] �O "o"
			 *	tempSplitArray[1] �O 8296.58 �Y�}�L����T
			 */

			tempSplitArray=dataSplitArray[1].split(":");
			var open=parseFloat(tempSplitArray[1]);

			/* �B�z dataSplitArray[2] ���o�̰�����T�A��k�O
			 * �N��� ":" �[�H���}�A�o�� tempSplitArray �}�C
			 * �AtempSplitArray �}�C���������p�U�G
			 *
			 *	tempSplitArray[0] �O "h"
			 *	tempSplitArray[1] �O 8259.25 �Y�̰�����T
			 */

			tempSplitArray=dataSplitArray[2].split(":");
			var high=parseFloat(tempSplitArray[1]);

			/* �B�z dataSplitArray[3] ���o�̧C����T�A��k�O
			 * �N��� ":" �[�H���}�A�o�� tempSplitArray �}�C
			 * �AtempSplitArray �}�C���������p�U�G
			 *
			 *	tempSplitArray[0] �O "l"
			 *	tempSplitArray[1] �O 8296.58 �Y�̧C����T
			 */

			tempSplitArray=dataSplitArray[3].split(":");
			var low=parseFloat(tempSplitArray[1]);

			/* �B�z dataSplitArray[4] ���o���L����T�A��k�O
			 * �N��� ":" �[�H���}�A�o�� tempSplitArray �}�C
			 * �AtempSplitArray �}�C���������p�U�G
			 *
			 *	tempSplitArray[0] �O "c"
			 *	tempSplitArray[1] �O 8315.7 �Y���L����T
			 */

			tempSplitArray=dataSplitArray[4].split(":");
			var close=parseFloat(tempSplitArray[1]);

			/* �B�z dataSplitArray[5] ���o����q��T�A��k�O
			 * �N��� ":" �[�H���}�A�o�� tempSplitArray �}�C
			 * �AtempSplitArray �}�C���������p�U�G
			 *
			 *	tempSplitArray[0] �O "v"
			 *	tempSplitArray[1] �O 74307 �Y����q��T
			 */

			tempSplitArray=dataSplitArray[5].split(":");
			var volume;

			/* �p�G�O�j�L�h����q�����O�y���z�A�U�ѫh����q���O�y�i�z */

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

		/* �禡 processHistoryData �O�U�����v��T������Q�I�s���禡 */

		function processHistoryData() {
			if (this.status === 200) {
				var historyData=this.response;
	
				/* �b���n�N���o�� historyData ���v��T�r��
				 * �B�z������ư}�C�����c�A��K����{�����B�z�A
				 * ��ư}�C�ȮɦW�٬O tempHistoryDataArray�C
				 */

				/* ���v��T�r�ꪺ�e�b���O��骺�Y�ɸ�T�A
				 * �q "ta":[{ �}�l�~�O���v��T�A�åB�@���� }]
				 * ����O�C�骺��ƩҺc�����r��A�]���n���q�U��
				 * �쪺 historyData �r�ꤤ���ΥX���v��T�r��A�Q
				 * �� sliceByPattern �禡�N�}�Y�O "[{" �B�����O 
				 * "}]" ���r����ΥX�ӧY�i�C
				 */

				historyData=historyData.sliceByPattern("[{","}]",true);

				/* �ŧi historyDataArray ���Ű}�C�A���}�C�t�d�x�s
				 * ���v��T�g�B�z�᪺���c�C�C�@�Ӱ}�C�������Y
				 * �O�@��(�@�ѩΪ̤@��B�@�~)��ơA�������c�O�@��
				 * ���󪺵��c�A�p�U�G
				 * 	{
				 *		"time":�ɶ�,
				 *		"open":�}�L��,
				 *		"close":���L��,
				 *		"high":�̰���,
				 *		"low":�̧C��,
				 *		"valume":�����(���O�ʸU��)
				 *	}
				 */

				var tempHistoryDataArray=[];

				/* �Q�� sliceByPattern �禡�N historyData �r�ꤤ��
				 * �Ĥ@�� "{�@�����v���}" ���ΥX�ӡA�é�b oneData
				 * �ܼƤ��C
				 */

				oneData=historyData.sliceByPattern("{","}",false);

				/* ���_�Q�� sliceByPattern �禡�N�@���@�����v���
				 * ���ΥX�ӡA�æb while �ԭz���P�_����X����Ʀr��
				 * �O�_���Ŧr��A�p�G���O�Ŧr��A�h�~����Τ@����
				 * ���ʧ@�C
				 */

				while (oneData!="") {
	
					/* �C�����@�����v��Ʀr��A���n�� 
					 * historyDataStringToObject �禡��r���ഫ
					 * �����󪺵��c oneDataObject�A�~��Ӫ���
					 * ��J�� historyDataArray �}�C���C
					 */

					oneDataObject=historyDataStringToObject(oneData);
					tempHistoryDataArray.push(oneDataObject);
	
					/* �N historyData ���L�w�g�Q���ΥX�Ӫ��@����� */

					historyData=skipPatternCount(historyData,"{",1);

					/* �A�����ΥX�@�����v��� */

					oneData=historyData.sliceByPattern("{","}",false);
				}

				var tempHistoryData=historyDataArrayToString(tempHistoryDataArray);
				appendMessage("�U�������v��T(�@"+tempHistoryDataArray.length+"��)�G\n"+
				tempHistoryData+"\n");

				/* �B�z�o�� tempHistoryDataArray ��A�n�q���}�C����X���b
				 * this.historyDataArray ������ơA�ñN��[�J��Ӱ}�C���C
				 * �ѩ�U����ƪ��̫�@���q�`���O���T����ơA�]�����Φ���
				 * ��Ƨ�s�O���C�Ҧp�b5��5��ɤU���C����v��T�A�]�|�o��
				 * �@��5��������v��ơA���o����ƬO�����㪺�@�Ӥ�������
				 * �ҥH���i�Ψӧ�s���v��T�C
				 */

				for (var i=0;i<(tempHistoryDataArray.length-1);i++) {

					/* �q�������v��ư}�C�����X�@�Ӥ��� */

					var historyObject=tempHistoryDataArray[i];

					/* �ѩ���v��T���ӷ��O�������o��A���쥻�N�O���Ӥ��
					 * ���ǱƦC�A�ҥH�b this.historyDataArray �}�C����M
					 * historyObject �ɡA�u�n�M this.historyDataArray
					 * �̫�@�Ӥ�������Y�i�A�p�G historyObject �����
					 * ��̫�@�Ӥ������ߡA��ܥ����b this.historyDataArray 
					 * �}�C���C
					 */

					var length=savedThisObject.historyDataArray.length-1;
					if (length==-1) {
	
						/* �p�G this.historyDataArray ���S�������A�h����
						 * ��������v��ƪ����[�J�� this.historyDataArray
						 * �Y�i�C
						 */
	
						savedThisObject.historyDataArray.push(historyObject);
					} else if (historyObject.time==savedThisObject.historyDataArray[length].time) {
					
						/* �b���B�ɡA��� historyObject ������M this.historyDataArray
						 * ���̫�@����ƪ�����O�@�˪��A�����������v��Ƥ@�w�O��
						 * �s���A�ҥH�� historyObject ���N this.historyDataArray
						 * ���̫�@����ơC
						 */

						savedThisObject.historyDataArray[length]=historyObject;	
					} else if (historyObject.time>savedThisObject.historyDataArray[length].time) {

						/* �b���B�ɡA��� historyObject ������� this.historyDataArray
						 * ���̫�@����ƪ�����ٱߡA������������v��ƪ����[�J
						 * �� this.historyDataArray ���Y�i�C
						 */

						savedThisObject.historyDataArray.push(historyObject);
					}
				}

				/* savedThisObject.historyDataArray �}�C���������A�������O�q
				 * �ɮפ�Ū�X�A�o�ɥ��������ȬO�r�ꫬ�A�C���Ǥ����h�O�q�����U
				 * ���o��A���ɤ���������ȬO�B�I�ƫ��A�C�ҥH����Ҧ�������
				 * �ƭ�(���ɶ��ȥ~)���אּ�B�I�ƫ��A�A�o�˦b�I�s historyDataArrayToString
				 * �禡�ɤ~���|�X���D�C
				 */

				for (var i=0;i<savedThisObject.historyDataArray.length;i++) {
					savedThisObject.historyDataArray[i].open=parseFloat(savedThisObject.historyDataArray[i].open);
					savedThisObject.historyDataArray[i].close=parseFloat(savedThisObject.historyDataArray[i].close);
					savedThisObject.historyDataArray[i].high=parseFloat(savedThisObject.historyDataArray[i].high);
					savedThisObject.historyDataArray[i].low=parseFloat(savedThisObject.historyDataArray[i].low);
					savedThisObject.historyDataArray[i].volume=parseFloat(savedThisObject.historyDataArray[i].volume);	
				}

				var historyString=historyDataArrayToString(savedThisObject.historyDataArray);
				appendMessage("��s�L�᪺���v��Ʀp�U�G\n");				
				appendMessage("�ɶ�		�}�L��	���L��	�̰���	�̧C��	����q(��)\n");
				appendMessage(historyString);
				
				if (savedThisObject.companyId=="%23001") {
					/* �j�L */
					appendMessage("�}�l�s�J��s�᪺�j�L���v��T�� /STOCK/"+
					savedThisObject.historyFilename+" �ɮפ��A�еy��...\n");
					saveLocalTextFileSeries(
						["/STOCK"],
						[savedThisObject.historyFilename],
						[historyString],
						savedThisObject.callback,
						true
					);
				} else {
					/* �Ӫ� */
					appendMessage("�}�l�s�J��s�᪺�ӪѾ��v��T�� /STOCK/"+
					savedThisObject.companyId+"/"+
					savedThisObject.historyFilename+" �ɮפ��A�еy��...\n");
					saveLocalTextFileSeries(
						["/STOCK/"+savedThisObject.companyId],
						[savedThisObject.historyFilename],
						[historyString],
						savedThisObject.callback,
						true
					);
				}			
			} else {
				showMessage("�U��"+this.companyName+
					    "���v��ƥ���! status="+
					    this.status);
			}
		}


		/* �ھڪ��� historyType ���� urlString�A�ΥH�U����ơC */

		var urlString="https://tw.quote.finance.yahoo.net/quote/q?"+
			      "type=ta&perd="+savedThisObject.historyType+"&mkt=10&sym="+
			      savedThisObject.companyId;

		/* �I�s getUrlSource �禡�U�� urlSting ���}����ơA
		 * �U��������A�I�s processHistoryData �禡�t�d�B�z
		 * �U������ơC
		 */

		appendMessage("�}�l�U�����v��T�����A�еy��...\n"+urlString+"\n");
		getUrlSource(
			urlString,
			processHistoryData,
			errorHandler
		);
	}

	/* �禡 readHistoryFileCallback �O�bŪ�X���v��T�ɮ׫�A
	 * �Q�I�s���禡�C�ǤJ���Ѽ� historyDataTextArray �OŪ�X�r
	 * ��ҧΦ����}�C�A�䤤�u���@�Ӥ����C
	 * ���禡������b update() ��k���A�p���~����Υ]�s�U�Ӫ�
	 * savedThisObject ���󥻨����ܼơC
	 */

	function readHistoryFileCallback(historyDataTextArray) {
		appendMessage("Ū�����v����ɮק����A�}�l�U�����v�����A�еy��...\n");
		var historyDataText=historyDataTextArray[0];
		if (historyDataText=="") {
			savedThisObject.historyDataArray=[];
		} else {
			savedThisObject.historyDataArray=historyStringToDataArray(historyDataText);
		}
		appendMessage("Ū�X���v��T�G\n"+historyDataText+"\n");
		downloadHistoryData();
	}

	/* update() ��k���D�n�{���Ѧ��}�l */

	/* �b���󪺤�k���O�s���󥻨��A�b�t�Φ^�I�ɤ~�i�H
	 * ���o��������C
	 */

	var savedThisObject=this;

	appendMessage("��s");
	
	/* �ھڪ����ݩ� historyType �M�w���v��T�ɮת��W�١A
	 * �ç��ɮצW�ٳ]�w���ݩ� historyFilename�C
	 */

	switch (this.historyType) {
		case "d":
		appendMessage("�C��");
		this.historyFilename="dayHistory.txt";
		break;
		case "w":
		appendMessage("�C�g");
		this.historyFilename="weekHistory.txt";
		break;
		case "m":
		appendMessage("�C��");
		this.historyFilename="monthHistory.txt";
		break;
	}

	/* ��ܰT���}�l��s���v��T�A��s���L�{�p�U�G
	 *
	 *	(1) Ū�����q�����v��T�ɮר���v��T�}�C���C
	 *	(2) �U�����q���v��T�����A�N�s�����v��T
	 *	    �[�J����v��T�}�C���C
	 *	(3) �N���v��T�}�C��Ƽg�J����v��T�ɮפ��C
	 */

	appendMessage("���v��Ʈw���A�еy��...\n");

	if (this.companyId=="%23001") {
		/* �j�L */
		readLocalTextFileSeries(
			["/STOCK"],
			[this.historyFilename],
			readHistoryFileCallback	
		);

	} else {
		/* �Ӫ� */
		readLocalTextFileSeries(
			["/STOCK/"+this.companyId],
			[this.historyFilename],
			readHistoryFileCallback	
		);
	}
};
