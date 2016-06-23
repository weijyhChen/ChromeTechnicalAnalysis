/*
 * �d��11�G���d�ұN�ܽd�j�L���ƤΦU�Ѿ��v��T���ʯ���R�C�ʯ����
 *         �D�n�O�M����q�B���^�a�ơB���^���a�ơB�зs���C�a�Ʀ���
 *         �p��Ҳ��ͪ����СA�Ҧp����s�q����(Absolute Breadth Index
 *         ,ABI)�B�˸�����(Advance/Decline Line)�B���^��v(Advance/
 *         Decline Ratio)�B���^���L�� ��q(Advancing, Declining,
 *         Unchanged Valume)�B�s�q�ĤO����(Breadth Thrust)�B���w�ʯ�
 *         �\������(Chande Momentum Oscillator)�B�ֿn����q����(
 *         Cumulative Volume Index)�B�ʺA�ʯ����(Dynamic Momentum
 *         Index)�B�s���C��v(New Highs/New Lows Ratio)�B��q���R
 *         (On Balance Volume)�K�C
 *         ���ǰʯ���ЬO�H���饫���Ӱ����R�A�ҿפ�����A���饫
 *         ���V�W�ɡA�U�ѦV�W�����v�]�ɰ��C���ǰʯ���йB�Φb�U�ѡA
 *         ��ʯ���ЦV�U�A���ѻ��o�I���V�W�ɡA�N�O�n��ߪ��ɨ�C
 *         �Ҧ����d�Ҥ������Ьҥi���U�M���A�H�ۮɶ��y�u�A���_�p��
 *         �X�s�����е��G�A�b���d�Ҥ��N�u�O�L�X���G�Ѱ��ѦҡA���
 *         ���Ϊ��t������۰ʱ��ץX�ثe���������A�O�_�ȱo���A��
 *         ���X�U�@�d�Ҫ��޳N���СA�D��X���n���ؼШѨϥΪ̿�ܡC
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
 * �ʥ�O��ʩΦ۰ʵo�͡A�Y�O�]���ϥΪ̫��U�y�}�l�C�X�ʯ���Сz
 * �ҳy�����۰ʧ�s�A�h�|�N���ȳ]�� true�C
 */
var startButtonPressed=false;

/* totalDayAdvanceArray �ΨӰO���C��W���a�ƪ��}�C�A�@�}�l�����ȬO
 * null ����٨S���ھڦU���q���v��ƨӧ�X�C��W���a�ơA�g�L�p���
 * ���}�C���j�p���ӷ|�M�j�L���v��T�}�C���j�p�@�P�A�p�G�o�ͤ��@�P
 * �����ΡA�N�A���s�p��@���C��W�����a�ơA���o�ر������ӵo�;��v
 * ���j�A�]���γ̷s�����v��T�p��L���}�C�@����A���D�{���]�W�L�@
 * �ѡA���s�����v��T�X�{�A�_�h���|�o�ͤW�z���ΡC
 */
var totalDayAdvanceArray=[];

/* totalWeekAdvanceArray �ΨӰO���C�g�W���a�ƪ��}�C */
var totalWeekAdvanceArray=[];

/* totalMonthAdvanceArray �ΨӰO���C��W���a�ƪ��}�C */
var totalMonthAdvanceArray=[];

/* totalDayAdvanceVolumeArray �ΨӰO���C��W���a�Ʀ���q�`�X���}�C */
var totalDayAdvanceVolumeArray=[];

/* totalWeekAdvanceVolumeArray �ΨӰO���C�g�W���a�Ʀ���q�`�X���}�C */
var totalWeekAdvanceVolumeArray=[];

/* totalMonthAdvanceVolumeArray �ΨӰO���C��W���a�Ʀ���q�`�X���}�C */
var totalMonthAdvanceVolumeArray=[];

/* totalDayDeclineArray �ΨӰO���C��U�^�a�ƪ��}�C */
var totalDayDeclineArray=[];

/* totalWeekDeclineArray �ΨӰO���C�g�U�^�a�ƪ��}�C */
var totalWeekDeclineArray=[];

/* totalMonthDeclineArray �ΨӰO���C��U�^�a�ƪ��}�C */
var totalMonthDeclineArray=[];

/* totalDayDeclineVolumeArray �ΨӰO���C��U�^�a�Ʀ���q�`�X���}�C */
var totalDayDeclineVolumeArray=[];

/* totalWeekDeclineVolumeArray �ΨӰO���C�g�U�^�a�Ʀ���q�`�X���}�C */
var totalWeekDeclineVolumeArray=[];

/* totalMonthDeclineVolumeArray �ΨӰO���C��U�^�a�Ʀ���q�`�X���}�C */
var totalMonthDeclineVolumeArray=[];

/* AbiMaArray �}�C�Ψ��x�s�M�j�L����������s�q����(Absolute Breadth Index,ABI)��
 * 10 ��/�g/�몺���ʥ����ȡC
 */
var AbiMaArray=[];

/* adlArray �}�C�ΨӦs��M�j�L�������˸�����( */
var adlArray=[];

/* adrMaArray �}�C�ΨӦs��M�j�L���������^��v(Advance/Decline Ratio)��15��/�g/�몺���ʥ����ȡC */
var adrMaArray=[];

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

	/* �禡 calcDayAdvDecArray �Ψӭp��C�麦�^�򥻸�� */
	function calcDayAdvDecArray() {
		if (totalDayAdvanceArray.length!=marketDayHistoryObject.historyDataArray.length) {
			/* �p�G totalDayAdvanceArray �}�C�j�p�M�j�L�C����v���
			 * �}�C���j�p���@�ˮɪ�ܭn���s�p��U�ذ򥻸�ư}�C�C
			 * �p��U�ذ򥻸�ư}�C���{���i�H��b�禡���A�C�Ө禡�p
			 * ��@�Ӱ}�C����ơA�o�˪��{�������ҲդơC���O�b������
			 * ��Ҧ��򥻸�ư}�C���p����������즹�@�禡���A�S���S
			 * �O���n�B�A�º�@�̭ӤH�ۤv�K�y��ƦӤw�C
			 */

			/* �p��C��򥻸�ư}�C�G
			 *	totalDayAdvanceArray
			 *	totalDayAdvanceVolumeArray
			 *	totalDayDeclineArray
			 *	totalDayDeclineVolumeArray
			 * �����n�`�N��C�a�Ѳ������������@�ˡA���ɬY�a�Ѳ��|
			 * �Ȱ�����Ƥ�A�p���C�a�Ѳ������v��Ƥ���N�|�����P�A
			 * ���v��ư}�C���j�p�]�|�����@�P�����ΡC
			 */

			/* �����N�U�򥻸�ư}�C������������l�Ƭ�0�A�Ϩ�j�p�M
			 * marketDayHistoryObject.historyDataArray �}�C���j�p�@
			 * �P�A���O�����j�L�Y�Ѫ��έp��ơC
			 */
			for (var dayIndex=0;dayIndex<marketDayHistoryObject.historyDataArray.length;dayIndex++) {
				totalDayAdvanceArray.push(0);
				totalDayAdvanceVolumeArray.push(0);
				totalDayDeclineArray.push(0);
				totalDayDeclineVolumeArray.push(0);
			}
			/* �� marketDayHistoryObject.historyDataArray �}�C��������
			 * ���󪺮ɶ�(time)��W��X�Ӧ����}�C�C�Φb�᭱ advanceArray
			 * �����ɶ�(time)����ֳt����X������ historyDataArray �� index
			 */
			var timeArray=[];
			for (var i=0;i<marketDayHistoryObject.historyDataArray.length;i++) {
				var time=marketDayHistoryObject.historyDataArray[i].time;
				timeArray.push(time);
			}
			/* �N�C�@�a���q���C�@�Ѻ��^�Ȯɥ���J advanceArray ��
			 * declineArray ���A��J�o�G�Ӱ}�C�����O�p�U������G
			 *	{"time":�ɶ�,"inc":�W�[��,"Volume":����q}
			 * �䤤�C�a���q�b�Y�@�ѭY�O�W���A�h�[�J�@�ӤW�z������
			 * �� advanceArray ���Ainc �ȬO 1�C
			 * ���� advanceArray �M declineArray ��A�A�ھڪ���
 		 	 * �� time �ƧǡA�Ƨǧ���N�ۦP�ɶ��� inc �� Volume
			 * �ۥ[�A�Y�i�o��򥻸�ư}�C�����e�C
			 */
			var advanceArray=[];
			var declineArray=[];
			for (var i=0;i<totalCompany;i++) {							// �Ҧ����q���C����v��T���n�B�z
				var oneCompanyDayHistory=companyDayHistoryObjectArray[i];
				var companyName=oneCompanyDayHistory.companyName;
				var dayHistoryData=oneCompanyDayHistory.historyDataArray;
				if (dayHistoryData.length<=1) {
					/* �p�G�s�W�������q�u���@�Ѫ���ơA����P�_���^��T */
					continue;
				}
				var prevClose=dayHistoryData[0].close;				// ���o�Ĥ@�Ѫ����L��
				for (var k=1;k<dayHistoryData.length;k++) {	// �ѲĤG�Ѱ_�P�_���^
					var oneData=dayHistoryData[k];							// �o��@�Ѫ����
					var time=oneData.time;
					var close=oneData.close;
					/* ����q�n���`����Ӥ��O�αi�ơA���]���S���O�������`����A�ҥH�u��γ̧C
					 * ����������i�ƪ�����C(�չL�γ̰����γ̧C�������ȷ|�W�L�j�L�`����q)
					 * �᭱�L�X���^������q��A�o�{�`�X�|���W�L�j�L�`����q�����ΡA�ثe�L�k
					 * ��X���D�Ҧb�C
					 */
					var volume=oneData.volume*1000*oneData.low;
					if (close>prevClose) {											// �W��
						advanceArray.push(
							{
								"time":time,
								"inc":1,
								"volume":volume,
								"name":companyName
							}
						);
					} else if (close<prevClose) {							// �U�^
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
			/* ���ͦn�F advanceArray �� declineArray ��A�n�⥦�̫��ɶ��[�H
			 * �ƧǡA�Ƨǧ�����A��ۦP�ɶ��� inc �ۥ[�Y�i�o��Ӯɶ����W���a��
			 * �ΤU�^�a�ơC��ۦP�ɶ��� volume �ۥ[�Y�i�o��Ӯɶ��W�����q���`
			 * ����q�C
			 */
			advanceArray.sort(timeCompare);
			declineArray.sort(timeCompare);
			var advanceCountArray=[];
			var declineCountArray=[];
			var advanceTime=advanceArray[0].time;							// advanceTime �ΨӰO���n�p��W���a�ƪ��ɶ�
			var advanceCount=advanceArray[0].inc;							// advanceCount �Ψӭp�Ʈɶ��O advanceTime �ɤW�����a��
			var advanceVolume=advanceArray[0].volume;					// advanceVolume �Ψӭp�Ʈɶ��O advanceTime �ɤW���a�ƪ��`����q
			for (var i=1;i<advanceArray.length;i++) {
				if (advanceArray[i].time===advanceTime) {				// �p�G�ɶ��ۦP
					advanceCount=advanceCount+advanceArray[i].inc;// �W�[�W���a�ƪ��p�ƭ�
					advanceVolume=advanceVolume+advanceArray[i].volume;
				} else {																				// �p�G�ɶ����ۦP
					advanceCountArray.push(												// �N�ثe���W���a�ƭp�ƭȤ��`����q�Ȱ�J advanceCountArray ��
						{
							"time":advanceTime,
							"count":advanceCount,
							"volume":advanceVolume
						}
					);
					advanceTime=advanceArray[i].time;							// ���m�p�Ʈɶ�
					advanceCount=advanceArray[i].inc;							// ���m�p�ƤW���a��
					advanceVolume=advanceArray[i].volume;					// ���m�W���a���`����q
				}
			}
			/* �̫�@�Ѫ��֭p�n���J */
			advanceCountArray.push(												// �N�ثe���W���a�ƭp�ƭȤ��`����q�Ȱ�J advanceCountArray ��
				{
					"time":advanceTime,
					"count":advanceCount,
					"volume":advanceVolume
				}
			);
			/* advanceCountArray �}�C�����e�ثe�O�U�ӡy�ɶ��z�ɡA�W���a�ƪ��`�X��
			 * �W���a���`����q���`�X�C�u�n��ɶ� time ��X���b timeArray �� index
			 * �Y�i�N�W�z��T��J�� totalDayAdvanceArray �� totalDayAdvanceVolumeArray
			 * �۹����� index ��m���C
			 * ��X time �b timeArray ���� index �u�n�� indexOf ��k�Y�i�A�@��
			 * �{���N�ѨM�F�A�o�O�e���S�O�ǳ� timeArray ����]�C�p�G���o�˰��A�N�n
			 * �b marketWeekHistoryObject.historyDataArray �}�C���@�@����U��
			 * �� time �ݩʡA�{��������C
			 */
			for (var i=0;i<advanceCountArray.length;i++) {
				var time=advanceCountArray[i].time;
				var index=timeArray.indexOf(time);
				if (index>=0) {
					totalDayAdvanceArray[index]=advanceCountArray[i].count;
					totalDayAdvanceVolumeArray[index]=advanceCountArray[i].volume/100000000;
				}
			}
			var declineTime=declineArray[0].time;							// declineTime �ΨӰO���n�p��U�^�a�ƪ��ɶ�
			var declineCount=declineArray[0].inc;							// declineCount �Ψӭp�Ʈɶ��O declineTime �ɤU�^���a��
			var declineVolume=declineArray[0].volume;					// declineVolume �Ψӭp�Ʈɶ��O declineTime �ɤU�^�a�ƪ��`����q
			for (var i=1;i<declineArray.length;i++) {
			  if (declineArray[i].time===declineTime) {				// �p�G�ɶ��ۦP
			    declineCount=declineCount+declineArray[i].inc;// �W�[�U�^�a�ƪ��p�ƭ�
			    declineVolume=declineVolume+declineArray[i].volume;
			  } else {																				// �p�G�ɶ����ۦP
			    declineCountArray.push(												// �N�ثe���U�^�a�ƭp�ƭȤ��`����q�Ȱ�J declineCountArray ��
			      {
			        "time":declineTime,
			        "count":declineCount,
			        "volume":declineVolume
			      }
			    );
			    declineTime=declineArray[i].time;							// ���m�p�Ʈɶ�
			    declineCount=declineArray[i].inc;							// ���m�p�ƤU�^�a��
			    declineVolume=declineArray[i].volume;					// ���m�U�^�a���`����q
			  }
			}
			/* �̫�@�Ѫ��֭p�n���J */
			declineCountArray.push(												// �N�ثe���U�^�a�ƭp�ƭȤ��`����q�Ȱ�J declineCountArray ��
				{
					"time":declineTime,
					"count":declineCount,
					"volume":declineVolume
				}
			);
			/* declineCountArray �}�C�����e�ثe�O�U�ӡy�ɶ��z�ɡA�U�^�a�ƪ��`�X��
			 * �U�^�a���`����q���`�X�C�u�n��ɶ� time ��X���b timeArray �� index
			 * �Y�i�N�W�z��T��J�� totalDaydDeclineArray �� totalDayDeclineVolumeArray
			 * �۹����� index ��m���C
			 * ��X time �b timeArray ���� index �u�n�� indexOf ��k�Y�i�A�@��
			 * �{���N�ѨM�F�A�o�O�e���S�O�ǳ� timeArray ����]�C�p�G���o�˰��A�N�n
			 * �b marketWeekHistoryObject.historyDataArray �}�C���@�@����U��
			 * �� time �ݩʡA�{��������C
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
		/* �L�X���^�򥻸�� */
		appendMessage("�C��W���U�^�򥻸�ơG"+"\n");
		appendMessage("�ɶ�\t\t���a��\t�^�a��\t���a����q(��)\t�^�a����q(��)\t�`����q(��)\n")
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

	/* �禡 calcWeekAdvDecArray �Ψӭp��C�g���^�򥻸�� */
	function calcWeekAdvDecArray() {
		if (totalWeekAdvanceArray.length!=marketWeekHistoryObject.historyDataArray.length) {
			/* �p�G totalWeekAdvanceArray �}�C�j�p�M�j�L�C�g���v���
			 * �}�C���j�p���@�ˮɪ�ܭn���s�p��U�ذ򥻸�ư}�C�C
			 * �p��U�ذ򥻸�ư}�C���{���i�H��b�禡���A�C�Ө禡�p
			 * ��@�Ӱ}�C����ơA�o�˪��{�������ҲդơC���O�b������
			 * ��Ҧ��򥻸�ư}�C���p����������즹�@�禡���A�S���S
			 * �O���n�B�A�º�@�̭ӤH�ۤv�K�y��ƦӤw�C
			 */

			/* �p��C�g�򥻸�ư}�C�G
			 *	totalWeekAdvanceArray
			 *	totalWeekAdvanceVolumeArray
			 *	totalWeekDeclineArray
			 *	totalWeekDeclineVolumeArray
			 * �����n�`�N��C�a�Ѳ������������@�ˡA���ɬY�a�Ѳ��|
			 * �Ȱ�����Ƥ�A�p���C�a�Ѳ������v��Ƥ���N�|�����P�A
			 * ���v��ư}�C���j�p�]�|�����@�P�����ΡC
			 */

			/* �����N�U�򥻸�ư}�C������������l�Ƭ�0�A�Ϩ�j�p�M
			 * marketWeekHistoryObject.historyDataArray �}�C���j�p�@
			 * �P�A���O�����j�L�Y�Ѫ��έp��ơC
			 */
			for (var weekIndex=0;weekIndex<marketWeekHistoryObject.historyDataArray.length;weekIndex++) {
				totalWeekAdvanceArray.push(0);
				totalWeekAdvanceVolumeArray.push(0);
				totalWeekDeclineArray.push(0);
				totalWeekDeclineVolumeArray.push(0);
			}
			/* �� marketWeekHistoryObject.historyDataArray �}�C��������
			 * ���󪺮ɶ�(time)��W��X�Ӧ����}�C�C�Φb�᭱ advanceArray
			 * �����ɶ�(time)����ֳt����X������ historyDataArray �� index
			 */
			var timeArray=[];
			for (var i=0;i<marketWeekHistoryObject.historyDataArray.length;i++) {
				var time=marketWeekHistoryObject.historyDataArray[i].time;
				timeArray.push(time);
			}
			/* �N�C�@�a���q���C�@�g���^�Ȯɥ���J advanceArray ��
			 * declineArray ���A��J�o�G�Ӱ}�C�����O�p�U������G
			 *	{"time":�ɶ�,"inc":�W�[��,"Volume":����q}
			 * �䤤�C�a���q�b�Y�@�g�Y�O�W���A�h�[�J�@�ӤW�z������
			 * �� advanceArray ���Ainc �ȬO 1�C
			 * ���� advanceArray �M declineArray ��A�A�ھڪ���
		 	 * �� time �ƧǡA�Ƨǧ���N�ۦP�ɶ��� inc �� Volume
			 * �ۥ[�A�Y�i�o��򥻸�ư}�C�����e�C
			 */
			var advanceArray=[];
			var declineArray=[];
			for (var i=0;i<totalCompany;i++) {							// �Ҧ����q���C�g���v��T���n�B�z
				var oneCompanyWeekHistory=companyWeekHistoryObjectArray[i];
				var companyName=oneCompanyWeekHistory.companyName;
				var weekHistoryData=oneCompanyWeekHistory.historyDataArray;
				if (weekHistoryData.length<=1) {
					/* �p�G�s�W�������q�u���@�g����ơA����P�_���^��T */
					continue;
				}
				var prevClose=weekHistoryData[0].close;				// ���o�Ĥ@�g�����L��
				for (var k=1;k<weekHistoryData.length;k++) {	// �ѲĤG�g�_�P�_���^
					var oneData=weekHistoryData[k];							// �o��@�g�����
					var time=oneData.time;
					var close=oneData.close;
					/* ����q�n���`����Ӥ��O�αi�ơA���]���S���O�������`����A�ҥH�u��γ̧C
					 * ����������i�ƪ�����C(�չL�γ̰����γ̧C�������ȷ|�W�L�j�L�`����q)
					 * �᭱�L�X���^������q��A�o�{�`�X�|���W�L�j�L�`����q�����ΡA�ثe�L�k
					 * ��X���D�Ҧb�C
					 */
					var volume=oneData.volume*1000*oneData.low;
					if (close>prevClose) {											// �W��
						advanceArray.push(
							{
								"time":time,
								"inc":1,
								"volume":volume,
								"name":companyName
							}
						);
					} else if (close<prevClose) {							// �U�^
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
			/* ���ͦn�F advanceArray �� declineArray ��A�n�⥦�̫��ɶ��[�H
			 * �ƧǡA�Ƨǧ�����A��ۦP�ɶ��� inc �ۥ[�Y�i�o��Ӯɶ����W���a��
			 * �ΤU�^�a�ơC��ۦP�ɶ��� volume �ۥ[�Y�i�o��Ӯɶ��W�����q���`
			 * ����q�C
			 */
			advanceArray.sort(timeCompare);
			declineArray.sort(timeCompare);
			var advanceCountArray=[];
			var declineCountArray=[];
			var advanceTime=advanceArray[0].time;							// advanceTime �ΨӰO���n�p��W���a�ƪ��ɶ�
			var advanceCount=advanceArray[0].inc;							// advanceCount �Ψӭp�Ʈɶ��O advanceTime �ɤW�����a��
			var advanceVolume=advanceArray[0].volume;					// advanceVolume �Ψӭp�Ʈɶ��O advanceTime �ɤW���a�ƪ��`����q
			for (var i=1;i<advanceArray.length;i++) {
				if (advanceArray[i].time===advanceTime) {				// �p�G�ɶ��ۦP
					advanceCount=advanceCount+advanceArray[i].inc;// �W�[�W���a�ƪ��p�ƭ�
					advanceVolume=advanceVolume+advanceArray[i].volume;
				} else {																				// �p�G�ɶ����ۦP
					advanceCountArray.push(												// �N�ثe���W���a�ƭp�ƭȤ��`����q�Ȱ�J advanceCountArray ��
						{
							"time":advanceTime,
							"count":advanceCount,
							"volume":advanceVolume
						}
					);
					advanceTime=advanceArray[i].time;							// ���m�p�Ʈɶ�
					advanceCount=advanceArray[i].inc;							// ���m�p�ƤW���a��
					advanceVolume=advanceArray[i].volume;					// ���m�W���a���`����q
				}
			}
			/* �̫�@�g���֭p�n���J */
			advanceCountArray.push(												// �N�ثe���W���a�ƭp�ƭȤ��`����q�Ȱ�J advanceCountArray ��
				{
					"time":advanceTime,
					"count":advanceCount,
					"volume":advanceVolume
				}
			);
			/* advanceCountArray �}�C�����e�ثe�O�U�ӡy�ɶ��z�ɡA�W���a�ƪ��`�X��
			 * �W���a���`����q���`�X�C�u�n��ɶ� time ��X���b timeArray �� index
			 * �Y�i�N�W�z��T��J�� totalWeekAdvanceArray �� totalWeekAdvanceVolumeArray
			 * �۹����� index ��m���C
			 * ��X time �b timeArray ���� index �u�n�� indexOf ��k�Y�i�A�@��
			 * �{���N�ѨM�F�A�o�O�e���S�O�ǳ� timeArray ����]�C�p�G���o�˰��A�N�n
			 * �b marketWeekHistoryObject.historyDataArray �}�C���@�@����U��
			 * �� time �ݩʡA�{��������C
			 */
			for (var i=0;i<advanceCountArray.length;i++) {
				var time=advanceCountArray[i].time;
				var index=timeArray.indexOf(time);
				if (index>=0) {
					totalWeekAdvanceArray[index]=advanceCountArray[i].count;
					totalWeekAdvanceVolumeArray[index]=advanceCountArray[i].volume/100000000;
				}
			}
			/* ���۳B�z�U�^����T */
			var declineTime=declineArray[0].time;							// declineTime �ΨӰO���n�p��U�^�a�ƪ��ɶ�
			var declineCount=declineArray[0].inc;							// declineCount �Ψӭp�Ʈɶ��O declineTime �ɤU�^���a��
			var declineVolume=declineArray[0].volume;					// declineVolume �Ψӭp�Ʈɶ��O declineTime �ɤU�^�a�ƪ��`����q
			for (var i=1;i<declineArray.length;i++) {
			  if (declineArray[i].time===declineTime) {				// �p�G�ɶ��ۦP
			    declineCount=declineCount+declineArray[i].inc;// �W�[�U�^�a�ƪ��p�ƭ�
			    declineVolume=declineVolume+declineArray[i].volume;
			  } else {																				// �p�G�ɶ����ۦP
			    declineCountArray.push(												// �N�ثe���U�^�a�ƭp�ƭȤ��`����q�Ȱ�J declineCountArray ��
			      {
			        "time":declineTime,
			        "count":declineCount,
			        "volume":declineVolume
			      }
			    );
			    declineTime=declineArray[i].time;							// ���m�p�Ʈɶ�
			    declineCount=declineArray[i].inc;							// ���m�p�ƤU�^�a��
			    declineVolume=declineArray[i].volume;					// ���m�U�^�a���`����q
			  }
			}
			/* �̫�@�g���֭p�n���J */
			declineCountArray.push(												// �N�ثe���U�^�a�ƭp�ƭȤ��`����q�Ȱ�J declineCountArray ��
				{
					"time":declineTime,
					"count":declineCount,
					"volume":declineVolume
				}
			);
			/* declineCountArray �}�C�����e�ثe�O�U�ӡy�ɶ��z�ɡA�U�^�a�ƪ��`�X��
			 * �U�^�a���`����q���`�X�C�u�n��ɶ� time ��X���b timeArray �� index
			 * �Y�i�N�W�z��T��J�� totalWeekDeclineArray �� totalWeekDeclineVolumeArray
			 * �۹����� index ��m���C
			 * ��X time �b timeArray ���� index �u�n�� indexOf ��k�Y�i�A�@��
			 * �{���N�ѨM�F�A�o�O�e���S�O�ǳ� timeArray ����]�C�p�G���o�˰��A�N�n
			 * �b marketWeekHistoryObject.historyDataArray �}�C���@�@����U��
			 * �� time �ݩʡA�{��������C
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
		/* �L�X���^�򥻸�� */
		appendMessage("�C�g�W���U�^�򥻸�ơG"+"\n");
		appendMessage("�ɶ�\t\t���a��\t�^�a��\t���a����q(��)\t�^�a����q(��)\t�`����q(��)\n")
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

	/* �禡 calcMonthAdvDecArray �Ψӭp��C�뺦�^�򥻸�� */
	function calcMonthAdvDecArray() {
	  if (totalMonthAdvanceArray.length!=marketMonthHistoryObject.historyDataArray.length) {
	    /* �p�G totalMonthAdvanceArray �}�C�j�p�M�j�L�C����v���
	     * �}�C���j�p���@�ˮɪ�ܭn���s�p��U�ذ򥻸�ư}�C�C
	     * �p��U�ذ򥻸�ư}�C���{���i�H��b�禡���A�C�Ө禡�p
	     * ��@�Ӱ}�C����ơA�o�˪��{�������ҲդơC���O�b������
	     * ��Ҧ��򥻸�ư}�C���p����������즹�@�禡���A�S���S
	     * �O���n�B�A�º�@�̭ӤH�ۤv�K�y��ƦӤw�C
	     */

	    /* �p��C��򥻸�ư}�C�G
	     *	totalMonthAdvanceArray
	     *	totalMonthAdvanceVolumeArray
	     *	totalMonthDeclineArray
	     *	totalMonthDeclineVolumeArray
	     * �����n�`�N��C�a�Ѳ������������@�ˡA���ɬY�a�Ѳ��|
	     * �Ȱ�����Ƥ�A�p���C�a�Ѳ������v��Ƥ���N�|�����P�A
	     * ���v��ư}�C���j�p�]�|�����@�P�����ΡC
	     */

	    /* �����N�U�򥻸�ư}�C������������l�Ƭ�0�A�Ϩ�j�p�M
	     * marketMonthHistoryObject.historyDataArray �}�C���j�p�@
	     * �P�A���O�����j�L�Y�Ѫ��έp��ơC
	     */
	    for (var monthIndex=0;monthIndex<marketMonthHistoryObject.historyDataArray.length;monthIndex++) {
	      totalMonthAdvanceArray.push(0);
	      totalMonthAdvanceVolumeArray.push(0);
	      totalMonthDeclineArray.push(0);
	      totalMonthDeclineVolumeArray.push(0);
	    }
	    /* �� marketMonthHistoryObject.historyDataArray �}�C��������
	     * ���󪺮ɶ�(time)��W��X�Ӧ����}�C�C�Φb�᭱ advanceArray
	     * �����ɶ�(time)����ֳt����X������ historyDataArray �� index
	     */
	    var timeArray=[];
	    for (var i=0;i<marketMonthHistoryObject.historyDataArray.length;i++) {
	      var time=marketMonthHistoryObject.historyDataArray[i].time;
	      timeArray.push(time);
	    }
	    /* �N�C�@�a���q���C�@�뺦�^�Ȯɥ���J advanceArray ��
	     * declineArray ���A��J�o�G�Ӱ}�C�����O�p�U������G
	     *	{"time":�ɶ�,"inc":�W�[��,"Volume":����q}
	     * �䤤�C�a���q�b�Y�@��Y�O�W���A�h�[�J�@�ӤW�z������
	     * �� advanceArray ���Ainc �ȬO 1�C
	     * ���� advanceArray �M declineArray ��A�A�ھڪ���
	     * �� time �ƧǡA�Ƨǧ���N�ۦP�ɶ��� inc �� Volume
	     * �ۥ[�A�Y�i�o��򥻸�ư}�C�����e�C
	     */
	    var advanceArray=[];
	    var declineArray=[];
	    for (var i=0;i<totalCompany;i++) {							// �Ҧ����q���C����v��T���n�B�z
	      var oneCompanyMonthHistory=companyMonthHistoryObjectArray[i];
	      var companyName=oneCompanyMonthHistory.companyName;
	      var monthHistoryData=oneCompanyMonthHistory.historyDataArray;
	      if (monthHistoryData.length<=1) {
	        /* �p�G�s�W�������q�u���@�몺��ơA����P�_���^��T */
	        continue;
	      }
	      var prevClose=monthHistoryData[0].close;				// ���o�Ĥ@�몺���L��
	      for (var k=1;k<monthHistoryData.length;k++) {	// �ѲĤG��_�P�_���^
	        var oneData=monthHistoryData[k];							// �o��@�몺���
	        var time=oneData.time;
	        var close=oneData.close;
	        /* ����q�n���`����Ӥ��O�αi�ơA���]���S���O�������`����A�ҥH�u��γ̧C
	         * ����������i�ƪ�����C(�չL�γ̰����γ̧C�������ȷ|�W�L�j�L�`����q)
	         * �᭱�L�X���^������q��A�o�{�`�X�|���W�L�j�L�`����q�����ΡA�ثe�L�k
	         * ��X���D�Ҧb�C
	         */
	        var volume=oneData.volume*1000*oneData.low;
	        if (close>prevClose) {											// �W��
	          advanceArray.push(
	            {
	              "time":time,
	              "inc":1,
	              "volume":volume,
	              "name":companyName
	            }
	          );
	        } else if (close<prevClose) {							// �U�^
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
	    /* ���ͦn�F advanceArray �� declineArray ��A�n�⥦�̫��ɶ��[�H
	     * �ƧǡA�Ƨǧ�����A��ۦP�ɶ��� inc �ۥ[�Y�i�o��Ӯɶ����W���a��
	     * �ΤU�^�a�ơC��ۦP�ɶ��� volume �ۥ[�Y�i�o��Ӯɶ��W�����q���`
	     * ����q�C
	     */
	    advanceArray.sort(timeCompare);
	    declineArray.sort(timeCompare);
	    var advanceCountArray=[];
	    var declineCountArray=[];
	    var advanceTime=advanceArray[0].time;							// advanceTime �ΨӰO���n�p��W���a�ƪ��ɶ�
	    var advanceCount=advanceArray[0].inc;							// advanceCount �Ψӭp�Ʈɶ��O advanceTime �ɤW�����a��
	    var advanceVolume=advanceArray[0].volume;					// advanceVolume �Ψӭp�Ʈɶ��O advanceTime �ɤW���a�ƪ��`����q
	    for (var i=1;i<advanceArray.length;i++) {
	      if (advanceArray[i].time===advanceTime) {				// �p�G�ɶ��ۦP
	        advanceCount=advanceCount+advanceArray[i].inc;// �W�[�W���a�ƪ��p�ƭ�
	        advanceVolume=advanceVolume+advanceArray[i].volume;
	      } else {																				// �p�G�ɶ����ۦP
	        advanceCountArray.push(												// �N�ثe���W���a�ƭp�ƭȤ��`����q�Ȱ�J advanceCountArray ��
	          {
	            "time":advanceTime,
	            "count":advanceCount,
	            "volume":advanceVolume
	          }
	        );
	        advanceTime=advanceArray[i].time;							// ���m�p�Ʈɶ�
	        advanceCount=advanceArray[i].inc;							// ���m�p�ƤW���a��
	        advanceVolume=advanceArray[i].volume;					// ���m�W���a���`����q
	      }
	    }
	    /* �̫�@�몺�֭p�n���J */
	    advanceCountArray.push(												// �N�ثe���W���a�ƭp�ƭȤ��`����q�Ȱ�J advanceCountArray ��
	      {
	        "time":advanceTime,
	        "count":advanceCount,
	        "volume":advanceVolume
	      }
	    );
	    /* advanceCountArray �}�C�����e�ثe�O�U�ӡy�ɶ��z�ɡA�W���a�ƪ��`�X��
	     * �W���a���`����q���`�X�C�u�n��ɶ� time ��X���b timeArray �� index
	     * �Y�i�N�W�z��T��J�� totalMonthAdvanceArray �� totalMonthAdvanceVolumeArray
	     * �۹����� index ��m���C
	     * ��X time �b timeArray ���� index �u�n�� indexOf ��k�Y�i�A�@��
	     * �{���N�ѨM�F�A�o�O�e���S�O�ǳ� timeArray ����]�C�p�G���o�˰��A�N�n
	     * �b marketMonthHistoryObject.historyDataArray �}�C���@�@����U��
	     * �� time �ݩʡA�{��������C
	     */
	    for (var i=0;i<advanceCountArray.length;i++) {
	      var time=advanceCountArray[i].time;
	      var index=timeArray.indexOf(time);

	      if (index>=0) {
	        totalMonthAdvanceArray[index]=advanceCountArray[i].count;
	        totalMonthAdvanceVolumeArray[index]=advanceCountArray[i].volume/100000000;
	      }
	    }
	    /* ���۳B�z�U�^����T */
	    var declineTime=declineArray[0].time;							// declineTime �ΨӰO���n�p��U�^�a�ƪ��ɶ�
	    var declineCount=declineArray[0].inc;							// declineCount �Ψӭp�Ʈɶ��O declineTime �ɤU�^���a��
	    var declineVolume=declineArray[0].volume;					// declineVolume �Ψӭp�Ʈɶ��O declineTime �ɤU�^�a�ƪ��`����q
	    for (var i=1;i<declineArray.length;i++) {
	      if (declineArray[i].time===declineTime) {				// �p�G�ɶ��ۦP
	        declineCount=declineCount+declineArray[i].inc;// �W�[�U�^�a�ƪ��p�ƭ�
	        declineVolume=declineVolume+declineArray[i].volume;
	      } else {																				// �p�G�ɶ����ۦP
	        declineCountArray.push(												// �N�ثe���U�^�a�ƭp�ƭȤ��`����q�Ȱ�J declineCountArray ��
	          {
	            "time":declineTime,
	            "count":declineCount,
	            "volume":declineVolume
	          }
	        );
	        declineTime=declineArray[i].time;							// ���m�p�Ʈɶ�
	        declineCount=declineArray[i].inc;							// ���m�p�ƤU�^�a��
	        declineVolume=declineArray[i].volume;					// ���m�U�^�a���`����q
	      }
	    }
	    /* �̫�@�몺�֭p�n���J */
	    declineCountArray.push(												// �N�ثe���U�^�a�ƭp�ƭȤ��`����q�Ȱ�J declineCountArray ��
	      {
	        "time":declineTime,
	        "count":declineCount,
	        "volume":declineVolume
	      }
	    );
	    /* declineCountArray �}�C�����e�ثe�O�U�ӡy�ɶ��z�ɡA�U�^�a�ƪ��`�X��
	     * �U�^�a���`����q���`�X�C�u�n��ɶ� time ��X���b timeArray �� index
	     * �Y�i�N�W�z��T��J�� totalMonthDeclineArray �� totalMonthDeclineVolumeArray
	     * �۹����� index ��m���C
	     * ��X time �b timeArray ���� index �u�n�� indexOf ��k�Y�i�A�@��
	     * �{���N�ѨM�F�A�o�O�e���S�O�ǳ� timeArray ����]�C�p�G���o�˰��A�N�n
	     * �b marketMonthHistoryObject.historyDataArray �}�C���@�@����U��
	     * �� time �ݩʡA�{��������C
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
		/* �L�X���^�򥻸�� */
		appendMessage("�C��W���U�^�򥻸�ơG"+"\n");
		appendMessage("�ɶ�\t\t���a��\t�^�a��\t���a����q(��)\t�^�a����q(��)\t�`����q(��)\n")
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

	/* �禡 calcAdvDecArray �Ψӭp��C��/�C�g/�C��
	 * �W��/�U�^�a�Ƶ��򥻸�ƪ��}�C�C
	 */
	function calcAdvDecArray() {
		calcDayAdvDecArray();
		calcWeekAdvDecArray();
		calcMonthAdvDecArray();
	}

	var totalAdvanceArray=[];
	var totalDeclineArray=[];
	/* �禡 determineCalcArray �ΨӨM�w�p��U���ʯ���Юɭn�Ψ쪺 totalAdvanceArray
	 * �� totalDeclineArray �}�C�O���V���ӯu�����}�C�C
	 */
	function determineCalcArray() {
		/* �ھ� historyType �M�w�n�έ��Ӿ��v��ư}�C���p�� */
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

	/* �禡 clacABIArray �Ψӭp��M�j�L����������s�q����(Absolute Breadth Index,ABI) */
	function calcABIArray() {
		AbiMaArray=[];
		var ABIArray=[];
		if ((totalAdvanceArray.length==0)||(totalDeclineArray.length==0)) {
			/* �p�G���v��ư}�C�� 0 �h�����j�L�ʯ��� */
			return;
		}
		/* �}�l�p��ʯ��ư}�C */
		for (var i=0;i<totalAdvanceArray.length;i++) {
			ABIArray.push(
				Math.abs(totalAdvanceArray[i]-totalDeclineArray[i])/
				totalCompany
			);
		}
		/* �p�� 10 ��/�g/�� �����u */
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

	/* �禡 calcAdlArray �Ψӭp��M�j�L�������˸�����(Advance/Decline Line) */
	function calcAdlArray() {
		adlArray=[];
		if ((totalAdvanceArray.length==0)||(totalDeclineArray.length==0)) {
			/* �p�G���v��ư}�C�� 0 �h�����j�L�ʯ��� */
			return;
		}
		var sumAdl=0;
		for (var i=0;i<totalAdvanceArray.length;i++) {
			sumAdl=sumAdl+(totalAdvanceArray[i]-totalDeclineArray[i]);
			adlArray.push(sumAdl);
		}
	}

	/* �禡 calcAdrArray �Ψӭp��M�j�L���������^��v(Advance/Decline Ratio)�A
	 * �íp��X5�骺���ʥ����ȡC
	 */
	function calcAdrArray() {
		var adrArray=[];
		if ((totalAdvanceArray.length==0)||(totalDeclineArray.length==0)) {
			/* �p�G���v��ư}�C�� 0 �h�����j�L�ʯ��� */
			return;
		}
		for (var i=0;i<totalAdvanceArray.length;i++) {
			adrArray.push(totalAdvanceArray[i]/totalDeclineArray[i]);
		}
		/* �p�� 15 ��/�g/�� �����u */
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

	/* �禡calcMomentumIndicator �ΨӶ��X�I�s�U�حp��ʯ���Ш禡 */
	function calcMomentumIndicator() {
		determineCalcArray();
		calcABIArray();
		calcAdlArray();
		calcAdrArray();
	}

	/* �禡 showMomentumIndicator �I�s�p�⺦�^��T���禡�έp��U�ذʯ���Ъ��禡 */
	function showMomentumIndicator() {
		showMessage("");
		appendMessage("�}�l�p��j�L���C��/�C�g/�C��W���U�^�a�Ƶ���T�A�еy��...\n");
		calcAdvDecArray();
		appendMessage("�p��j�L���C��/�C�g/�C��W���U�^�a�Ƶ���T�����C\n");
		appendMessage("�}�l�p��U�ذʯ���СA�еy��...\n");
		calcMomentumIndicator();
		appendMessage("�p��U�ذʯ���Ч����A�L�X�U�ذʯ���СC");
		/* �L�X adrMaArray */
		for (var i=0;i<adrMaArray.length;i++) {
			appendMessage(i+"\t"+adrMaArray[i].toFixed(2)+"%\n");
		}
	}

	/* �禡 createCompanyHistoryObjectCallback �O�ѨϥΪ̿�ܤ��q
	 * ID �Τj�L����A���ͥX�Ӥ��q���v��T�� companyHistoryObject
	 * ����Q�I�s���禡�C���ɴN�i�H�Φ����v��T����Ӷi��C�X�ʯ�
	 * ���Ъ��u�@�C
	 */
	function createCompanyHistoryObjectCallback() {
		if (updatedHistoryData===false) {
			/* ���v��ƥ���s�A�}�l������s���v��ơC�ѩ�
			 * �I�s updateButton.onclick() �禡��A���|�A
			 * �^�즹�禡���A�]���]�w startButtonPressed
			 * �ܼƬ� true �A��ܬO�ѩ�ϥΪ̫��U�y�}�l
			 * �C�X�ʯ���Сz�ҳy������s�C
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
			/* �b HTML �� body �аO�����J�ϥΪ̾ާ@����������аO�C */
			/* ���d�Ҫ��H�������M�e�@�ӽd�ҴX�G�@�ˡA�ߤ@�����P�u����
		 	 * ��� K �u�Ϫ� canvas �h���C�]���Ψ쪺��ƩM�e�@�ӽd��
		 	 * �����@�ˡA�u�O�e�@�ӽd�ҬO�e K �u�ϡA���d�ҬO�C�X�ʯ�
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
			"<input type=button id='startButton' value='�}�l�C�X�ʯ����'>&nbsp&nbsp"+
			"<input type=button id='clearButton' value='�M���T��'></p>"+
      		"<p><pre id='msg'>�п�J���q�N���ΤĿ�y�j�L�z�A"+
			"�M����U�y�}�l�C�X�ʯ���Сz���s\n</pre></p>";
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
					 * �C�X�ʯ���Сz���s�ҳy������s�ʧ@�A�b
					 * ��s������A�n�I�s�C�X�ʯ���Ъ��禡�C
					 */
					startButtonPressed=false;
					showMomentumIndicator();
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
				var found=false;
				var foundIndex=-1;
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
			"�M����U�y�}�l�C�X�ʯ���Сz���s\n");
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
