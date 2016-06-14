/*
 * �d�Ң��G�ռg�@�{���q�ɮפ�Ū�X�U���q�򥻸�ơAEPS�A�禬��ƤΪѧQ��T
 *         �åѨϥΪ̿�J���q�W�٩Τ��qID���j�M�A���Ӥ��q����ƫ�A��
 *	   �ϥΪ̤Ŀ�n�ݪ����ءC
 */

function doEx6WindowOnload() {

  	var companyName=[];     // �Ҧ����q�W�ٺc�����}�C�A�q�ɮפ�Ū�X��A�}�C�j�p�OtotalCompany
  	var companyID=[];       // �Ҧ����qID�c�����}�C
  	var totalCompany=0;     // �Ҧ����q���ƶq�A�Y companyName,companyID ���j�p
  	var inputBox;           // HTML ���� inputBox �� Javascript ����
  	var searchButton;       // HTML ���� searchButton �� Javascript ����
  	var messageBox;         // HTML ���� messageBox �� Javascript ����
  	var companyInfo="";
  	var companySeasonEPS="";
  	var companyYearEPS="";
  	var companyEarning="";
  	var companyDividend="";
  
 	/* (21):
   	 * windowOnResize �禡�O�b�����Q�ϥΪ��ܧ�j�p�ɷ|�եΪ��禡�A���b
   	 * showInterface �禡���Q���w�� window.onresize ���ƥ�B�z�禡�C
   	 * ������j�p�ܧ�ɡA�i��|�v�T messageBox ���������ܡA�Ь� (12) ����
   	 */

  	function windowOnResize() {
    		messageBox.style.overflow="scroll";
    		messageBox.style.width=window.innerWidth-15;
    		messageBox.style.height=window.innerHeight-messageBox.offsetTop-15;    
  	}

  	/* (11):
   	 * readComanyInformationOK �禡�bŪ�X�@�Ӥ��q�������ɮ׫�Q�I�s�A
   	 * �ǤJ���Ѽ� textArray �O�r��}�C�A�ѩ�uŪ����@���q����ơA�ҥH
   	 * textArray[0] �O���q���򥻸�Ʀr��A�榡�O "���ƪ�/�`�g�z/�ѥ�"
   	 * textArray[1] �O���q���C�uEPS��Ʀr��
	 * textArray[2] �O���q���C�~EPS��Ʀr��
	 * textArray[3] �O���q���C���禬��T�r��
	 * textArray[4] �O���q���t���t�Ѹ�T�r��
   	 */

  	function readComanyInformationOK(textArray) {
    		companyInfo=textArray[0];
    		companySeasonEPS=textArray[1];
    		companyYearEPS=textArray[2];
    		companyEarning=textArray[3];
    		companyDividend=textArray[4];
    
    		/* (12):
     		 * �]���᭱�b messageBox ����ܸ�ƮɡA�i��]����Ʒ|�W�L�����~��
     		 * �ҥH�n�]�w messageBox �����פμe�סA����ܸ�ƶW�L�]�w�����׮�
     		 * �N�n�X�{���ʱ����ϥΪ̥i�H���ʨ�Q�ݪ��a��C
     		 * messageBox.style �O messageBox �� style sheet �ݩ�
     		 * style.overflow �]�� scroll ��ܷ�W�L��ܽd��ɡA�n�X�{���ʱ�
     		 * style.width �]����������e�צA�p 15 �I�A�O�� messageBox �[�W��
     		 *             �ʱ��A�٬O�i�H�X�{�b�������A���ʱ�]���|�]������~�C
     	 	 * style.height ���F�n��������פp���~�A�٭n�Ҽ{ messageBox ����
     		 *              �W��O�b�����������m(�Y offsetTop )
     		 */

    		messageBox.style.overflow="scroll";
    		messageBox.style.width=window.innerWidth-15;
    		messageBox.style.height=window.innerHeight-messageBox.offsetTop-15;
    
    		/* (13):
     		 * �p�G�ϥΪ̦��Ŀ�n�d�ݤ��q�򥻸�T�A�~��ܤ��q�򥻸�T
     		 */

    		if (document.getElementById("infoCheck").checked) {
      			var companyInfoSplitArray=companyInfo.split("/");
      			appendMessage("���ƪ��G"+companyInfoSplitArray[0]+"\n"+
        			"�`�g�z�G"+companyInfoSplitArray[1]+"\n"+
        			"�ꥻ�B�G"+companyInfoSplitArray[2]+"\n");
    		}

    		/* (14):
     		 * �p�G�Ϫ̦��Ŀ�n�d�ݨC�u EPS ��T�A�~��ܨC�u EPS ��T
     		 */

    		if (document.getElementById("seasonEPSCheck").checked) {
			var seasonEPSSplit=companySeasonEPS.split("\n");
      			appendMessage("EPS(�C�u)�G\n");
			for (var j=0;j<4;j++) {
				appendMessage("\t"+seasonEPSSplit[j]+"\n");
			}
    		}

    		/* (15):
     		 * �p�G�Ϫ̦��Ŀ�n�d�ݨC�~ EPS ��T�A�~��ܨC�~ EPS ��T
     		 */
    
    		if (document.getElementById("yearEPSCheck").checked) {
			var yearEPSSplit=companyYearEPS.split("\n");
      			appendMessage("EPS(�C�~)�G\n");
			for (var j=0;j<4;j++) {
				appendMessage("\t"+yearEPSSplit[j]+"\n");
			}
    		}

    		/* (16):
     		 * �p�G�Ϫ̦��Ŀ�n�d�ݬվl��T�A�~��ܬվl��T
     		 */

    		if (document.getElementById("earningCheck").checked) {
      			appendMessage("�C��զ��G\n");

    			/* (17):
     			 * �C�~���վl��T�O�@�Ӧr��A�� \n ���j
     			 */
          
      			var companyEarningSplitArray=companyEarning.split("\n");
      			for (i=0;i<companyEarningSplitArray.length-1;i++) {

        			/* (18):
         			 * �q companyEarningSplitArray[i] ���o�@�~���վl��T�r��
         			 * ��@�~�վl�r��� "/" ���j�}�Ӧ��}�C�A�}�C�� 0 �Ӥ����O
         			 * �~�׭ȡA�ӫ� 12 �Ӥ������O�O 12 �Ӥ몺�վl��
         			 */

        			var oneYearEarning=companyEarningSplitArray[i];
        			var oneYearEarningSplitArray=oneYearEarning.split("/");
        			appendMessage("�~�סG\n"+oneYearEarningSplitArray[0]+"\n");
        			for (k=1;k<13;k++) {
          				appendMessage("    �� "+k+"�G"+
          				oneYearEarningSplitArray[k]+"��\n");
        			}
      			}
      			appendMessage("\n");
    		}

    		/* (19):
     		 * �C�~���ѧQ��T�O�@�Ӧr��A�� \n ���j
     		 */
 
    		if (document.getElementById("dividendCheck").checked) {
      			var companyDividendSplitArray=companyDividend.split("\n");
      			appendMessage("�t���t��:\n"+
			"\t�~��\t�{���ѧQ\t�վl�t��\t���n�t��\t�Ѳ��ѧQ\t�X�p\n");   
      			for (i=0;i<companyDividendSplitArray.length-1;i++) {

        			/* (20):
         			 * �q companyDividendSpliArray[i] ���o�@�~���ѧQ��T�r��
         			 * ��@�~�ѧQ�r��� "/" ���j�}�Ӧ��}�C�A�}�C�� 0 �Ӥ����O
         			 * �~�׭ȡA�ӫ᭱ 5 �Ӥ������O�O�{���ѧQ�B�վl�t�ѡB���n�t��
         			 * �Ѳ��ѧQ�ΦX�p
         			 */  

        			var oneYearDividend=companyDividendSplitArray[i];
				var oneYearDividendSplit=oneYearDividend.split("/");
				for (var k=0;k<oneYearDividendSplit.length;k++) {
					appendMessage("\t"+oneYearDividendSplit[k]);
				}
				appendMessage("\n");
      			}
    		}        
  	}

  	/* (10):
   	 * readCompanyInformation �禡�����@�� searchID �ѼơA�ھڸӰѼ�
   	 * Ū�J���� ID ���q����ơCŪ�J��Ƨ�����I�s�@readComanyInformationOK
   	 */

  	function readComanyInformation(searchID) {
    		var companyDirectoryArray=[];
    		for (var i=0;i<5;i++) {     // �@�������ɮ׭nŪ��
      			// �����ɮשҦb�ؿ����� "STOCK/ID"
      			companyDirectoryArray.push("STOCK/"+searchID);
    		}
    		var infoFileArray=[];
    		infoFileArray.push("companyInfo.txt");    // ���q�򥻸���ɮצW��
    		infoFileArray.push("seasonEPS.txt");      // �C�u EPS ����ɮצW��
    		infoFileArray.push("yearEPS.txt");        // �C�~ EPS ����ɮצW��
    		infoFileArray.push("earning.txt");        // �վl�ɮצW��
    		infoFileArray.push("Dividend.txt");       // �ѧQ�ɮצW��
    		var idIndex=companyID.indexOf(searchID);
    		showMessage("<pre>���q�W�١G"+companyName[idIndex]+"\n"+
     			"���q�N���G"+searchID+"\n");
    		readLocalTextFileSeries(companyDirectoryArray,infoFileArray,
                	readComanyInformationOK);
  	}
  
  	/* (7):
   	 * ���U searchButton �|�I�s���禡�A�禡���D�n�O�q inputBox �����o�n
   	 * �j�M�����q�W�٩�ID�A�M��b
   	 */

  	function startSearch() {
    		var searchText=inputBox.value;        // ���o�ϥΪ̿�J�j�M�r��

    		/* (8):
     		 * ���b companyID �}�C���j�M�ϥΪ̿�J�r��A�p�G�䤣��A�h�A��
     		 * companyName ���C���j�M�C�p�G���䤣��A�h��ܰT�����ܨϥΪ̧�
     		 * ����A�Э��s��J�÷j�M�C
     		 */

    		var companyIndex=companyID.indexOf(searchText);
    		if (companyIndex===-1) {
      			companyIndex=companyName.indexOf(searchText);
    		}
    		if (companyIndex===-1) {
      			showMessage(
			"�䤣�즹���q�N���Τ��q�W�١A\n"+
        		"�Э��s��J���q�N���Τ��q�W��...�I\n");
      			return;                             // ���X�禡�A�����j�M
    		}

    		/* (9):
     		 * ���ϥΪ̷j�M���r��b companyName �� companyID �������ޭ�
     		 * �A��ܸӤ��q���W�ٵ��ϥΪ̨åB���ܸ��J�Ӥ��q��ƪ��T���C��
     		 * �۩I�s readComanyInformation �禡���J�Ӥ��q��ơC
     		 */

    		var searchID=companyID[companyIndex];
		var searchName=companyName[companyIndex];
    		showMessage("�еy�ԡA���bŪ��"+searchName+"���q���...\n");
    		readComanyInformation(searchID);
  	}
  
  	/* (4):
   	 * showInterface �禡�D�n�O�ΨӦb HTML ��󤤴��J�ϥΪ̤���������
   	 * �{���X�A�åB���w���䪺�ƥ�B�z�禡�C
   	 */

  	function showInterface() {

    		/* (5):
     		 * ���� HTML ���n�Ψ쪺����A���@�ӿ�J�� inputBox �Ψӱ����ϥΪ̿�
     		 * �J�n�d�ߪ����q�W�٩�ID�A���s searchButton �ΨӨϥΪ�Ĳ�o�j�M�ʧ@
     		 * �A�q�� messageBox �h���T����X���A���ϥΪ̬ݨ�{�����T���ηj�M
     		 * �����G�C
     		 */

    		document.body.innerHTML=
      		"<p><input type=text id='inputBox' placeholder="+
      		"'�Цb����J���q�N���Τ��q�W�١G' size=30>"+
      		"<input type=button id='searchButton' value='�j�M'></p>"+
      		"<input type=checkbox id='infoCheck' checked>�򥻸�T"+
      		"<input type=checkbox id='seasonEPSCheck' checked>EPS(�C�u)"+
      		"<input type=checkbox id='yearEPSCheck' checked>EPS(�C�~)"+
      		"<input type=checkbox id='earningCheck' checked>�վl��T"+
      		"<input type=checkbox id='dividendCheck' checked>�ѧQ��T"+
      		"<p><pre id='msg'>�ФĿ�Q�d�ݪ���ơA��J���q�N���Τ��q�W�١A"+
		"���U�y�j�M�z���s�}�l�d�T�C</pre></p>";
    		inputBox=document.getElementById("inputBox");
    		searchButton=document.getElementById("searchButton");
		messageBox=document.getElementById("msg");

    		/* (6):
     		 * ���w���U searchButton ���s�|Ĳ�o startSearch �禡�C
     		 */

    		searchButton.onclick=startSearch;
    		window.onresize=windowOnResize;
  	}
  
  	/* ����(2)�G
    	 * �bŪ�J company.txt �ɮ׫�|�I�s���禡�A���禡�D�n���ɮפ��e
	 * �B�z�X�U���q�W�٤�ID�A�o�� companyName,companyID �}�C�� 
   	 * totalCompany �ܼơC
  	 * �аѦҽd��5�� readCompanyFileCallback �禡�������A�o�ت��{��
   	 * �M�d��5���{���X�G�����ۦP�C
   	 */

  	function readCompanyOK(textArray) {
    		var companyText=textArray[0];
    		var companyTextSlpitArray=companyText.split("\n");
    		totalCompany=companyTextSlpitArray.length-1;   
    		for (var i=0;i<totalCompany;i++) {
      			var oneCompanyText=companyTextSlpitArray[i];
      			var oneCompanySplitArray=oneCompanyText.split(" ");
      			var oneCompanyID=oneCompanySplitArray[0];
      			var oneCompanyName=oneCompanySplitArray[1];
      			companyName.push(oneCompanyName);
      			companyID.push(oneCompanyID);
    		}
    		/* (3):
     		 * �B�z�o�� companyArray ����A�I�s showInterface �禡�A�Ө�
     		 * ���D�n�ΨӦb�������[�J�ϥΪ̤���.
     		 */

    		showInterface();
  	}
      
	/* ����(1)�G
	 * ���d�ҵ{���Ѧ��}�l����A�{���Ψ쪺����ܼƤΨ禡��������b
   	 * doEx6WindowOnload ���C
   	 * �{���@�}�l��Ū�J company.txt �ɮת����e�CŪ���ɮת��禡�b�o
   	 * �̬O�ϥ� readLoaclTextFileSeries�A���M�o�Ө禡�D�n�O�i�H�@��
   	 * Ū���h���ɮסA���O�Υ���Ū���@���ɮפ]�O�i�H���C�u�n��nŪ��
   	 * ���ɮשҦb�ؿ���b�}�C���Φ��Ĥ@�ӰѼơA�nŪ�����ɮצW�٩�J
   	 * �@�Ӱ}�C���Φ��ĤG�ӰѼƧY�i�C
   	 * Ū�� compnay.txt �ɮק�����|�I�s readCompanyOK �禡�C
   	 */

  	readLocalTextFileSeries(["/STOCK"],["company.txt"],readCompanyOK);

}

/* ����(0)�G
 * ���d�Ҫ��i�J�I�O���B�� window.onload �禡�A�ѩ󤣦P�{�������ɮפ���
 * ���ۦ@�ΡA�ҥH��X�d��3�κ�X�d��5���s�U���ɮסA�b�o�ӽd�Ҥ�����QŪ
 * ���A�ҥH�����b���d�Ҥ��s�U company.txt �ΦU���q���򥻸���ɮסC���F�F
 * ��o�ӥت��A�����b���d�ҦU����@���d��3�νd��5�A��ʱN�U���ɮצs��
 * �@���A�o�ˤ~��b���d�Ҥ��QŪ���X�ӡC
 * window.onload ���Q�ΤG�ӫ��s�y��X�d��3�z�Ρy��X�d��5�z���A�i�H�b��
 * �d�Ҥ��୫�s����d��3�νd��5�o�H����company.txt�ΦU���q���򥻸���ɮסC
 * �t�@�ӡy��X�d��6�z���s�~�O�Ұʥ��d�ҵ{�����u������C
 */

window.onload=function() {
	document.body.innerHTML=
		"<input type=button id='ex3Button' value='��X�d��3'>"+
		"<input type=button id='ex5Button' value='��X�d��5'>"+
		"<input type=button id='ex6Button' value='��X�d��6'>"+
		"<p><pre id='msg'>���B�O�T�����A�b����ܰT���C</pre></p>";

	document.getElementById("ex3Button").onclick=function() {
		doEx3WindowOnload();
	};

	document.getElementById("ex5Button").onclick=function() {
		doEx5WindowOnload();
	};

	document.getElementById("ex6Button").onclick=function() {
		doEx6WindowOnload();
	};
};