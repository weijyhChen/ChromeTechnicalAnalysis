
/* �禡 historyDataArrayToString �ΨӱN�j�L���v��T�}�C����
 * ����ഫ���r��C�ഫ�X���r��i�H�Ψ���ܩΦs�ɡC
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

/* �禡 historyStringToDataArray �ΨӱN�j�L���v��Ʀr��
 * �ഫ���}�C���Φ��C�}�C���C�Ӥ������O�@���j�L���v���
 * ������A����榡�p�U�G
 * 	{
 *		"time":�ɶ�,
 *		"open":�}�L��,
 *		"close":���L��,
 *		"high":�̰���,
 *		"low":�̧C��,
 *		"volume":����q
 *	}
 */

function historyStringToDataArray(historyDataString) {
	
	/* �j�L���v��T�r��C�@���O�� "\n" ���} */

	var dataStringSplitArray=historyDataString.split("\n");
	var historyDataArray=[];
	for (var i=0;i<(dataStringSplitArray.length-1);i++) {

		/* �C�@����Ʀr�ꤤ�O�� "\t" ���}�U�ظ�� */

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

/* �禡 downloadHistoryData �O�t�d�U���j�L���v��ƪ��禡�C
 * ���禡���Ĥ@�ӰѼ� historyType �O�n�U���j�L���v��ƪ��Φ��A
 *
 * 	historyType �O "d" ��ܭn�U���C���ơC
 * 	historyType �O "w" ��ܭn�U���C�g��ơC
 * 	historyType �O "m" ��ܭn�U���C���ơC
 *
 * ���禡���ĤG�ӰѼƬO�^�I�禡�A�b���禡�N�U����ƳB�z
 * ���}�C���Φ���A�|�^�I���Ѽƫ��w���禡�A�ñN��ư}�C
 * ���^�I�禡���Ĥ@�ӰѼƶǵ����C
 */

function downloadHistoryData(historyType,callback) {

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

	/* processHistoryData �禡�O�U���j�L���v��T����
	 * ���\��A�|�Q�I�s���禡�C
	 */

	function processHistoryData() {
		if (this.status === 200) {
			historyData=this.response;

			/* �b���n�N���o�� historyData �j�L���v��T�r��
			 * �B�z������ư}�C�����c�A��K����{�����B�z�A
			 * �}�C���W�٬� historyDataArray�C
			 * �o��}�C��A�|�I�s callback �禡�A�åB�N
			 * historyDataArray ���Ѽƶǵ��^�I�禡�A
			 * ���^�I�禡�M�w�n�p��B�z�}�C������ơC
			 */

			/* �j�L���v��T�r�ꪺ�e�b���O���j�L���Y�ɸ�T�A
			 * �q "ta":[{ �}�l�~�O�j�L���v��T�A�åB�@���� }]
			 * ����O�C�骺��ƩҺc�����r��A�]���n���q�U��
			 * �쪺 historyData �r�ꤤ���ΥX���v��T�r��A�Q
			 * �� sliceByPattern �禡�N�}�Y�O "[{" �B�����O 
			 * "}]" ���r����ΥX�ӧY�i�C
			 */

			historyData=historyData.sliceByPattern("[{","}]",true);

			/* �ŧi historyDataArray ���Ű}�C�A���}�C�t�d�x�s
			 * �j�L���v��T�g�B�z�᪺���c�C�C�@�Ӱ}�C�������Y
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

			var historyDataArray=[];

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
				historyDataArray.push(oneDataObject);

				/* �N historyData ���L�w�g�Q���ΥX�Ӫ��@����� */

				historyData=skipPatternCount(historyData,"{",1);

				/* �A�����ΥX�@�����v��� */

				oneData=historyData.sliceByPattern("{","}",false);
			}

			/* �B�z�o�� historyDataArray ��A�N���}�C����
			 * �ƶǵ� callback �禡�C
			 */

			callback(historyDataArray);
		} else {
			showMessage("�U���j�L���v��ƥ���! status="+
			this.status);
		}
	}

	/* �ھڶǤJ�� historyType �ѼƲ��� urlString�A�ΥH�U����ơC */

	var urlString="https://tw.quote.finance.yahoo.net/quote/q?"+
		      "type=ta&perd="+historyType+"&mkt=10&sym=%23001";

	/* �I�s getUrlSource �禡�U�� urlSting ���}����ơA
	 * �U��������A�I�s processHistoryData �禡�t�d�B�z
	 * �U������ơC
	 */

	getUrlSource(
		urlString,
		processHistoryData,
		errorHandler
	);		
}