/*
 * �d�Ң��G�ռg�@�{��Ū�X�U���q�򥻸�ơAEPS ��A
 *         �]���^�̪ѥ��Ƨǫe�@�������@�j���q
 *         �]���^�̫e�|�u EPS �Ƨǫe�@�������@�j���q
 */

function doEx7WindowOnload() {

  	var allCompanyDirectoryArray=[];
  	var allCompanyInfoFileArray=[];
  	var allCompanySeasonEPSFileArray=[];
  	var companyName=[];         // �Ҧ����q�W�ٰ}�C
  	var companyID=[];           // �Ҧ����qID�}�C
  	var companyPresident=[];    // �Ҧ����q�����ƪ��}�C
  	var companyCEO=[];          // �Ҧ����q���`�g�z�}�C
  	var companyCapital=[];      // �Ҧ����q���ѥ��}�C
  	var companyEPS=[];          // �Ҧ����q��EPS�}�C
  	var totalCompany=0;         // �Ҧ����q���ƶq�A�Y companyArray ���j�p
  	var sortCapitalButton;      // HTML ���� sortCapital �� Javascript ����
  	var sortSeasonEPSButton;    // HTML ���� sortSeasonEPS �� Javascript ����
  	var messageBox;             // HTML ���� messageBox �� Javascript ����
  	var companyInfo="";
  	var companySeasonEPS="";
  	var companyYearEPS="";

  	function epsCompare(companyIDEPS1,companyIDEPS2) {
    		return companyIDEPS2.eps-companyIDEPS1.eps;
  	}

  	/* (23):
   	 * sortSeasonEPSButtonClick �禡�O��ϥΪ̫��U�y���|�uEPS�`�X�Ƨǡz
   	 * ���s��|�I�s���ƥ�B�z�禡�C�Բӻ����аѦ� (20)(21)(22)
   	 */

  	function sortSeasonEPSButtonClick() {
    		var companyIDEPSArray=[];
    		for (i=0;i<totalCompany;i++) {
      			companyIDEPSArray.push({
        			"id":companyID[i],
        			"eps":companyEPS[i]
                        });
    		}
    		companyIDEPSArray.sort(epsCompare);
    		showMessage("");
    		for (i=0;i<100;i++) {
	      		var id=companyIDEPSArray[i].id;
      			var idIndex=companyID.indexOf(id);
      			appendMessage(
	      			"�ƦW "+(i+1)+"\n"+
      				"    ���q�N���G"+id+"\n"+
      				"    ���q�W�١G"+companyName[idIndex]+"\n"+
	      			"    �|�uEPS�`�X�G"+companyEPS[idIndex]+"\n\n"
			);
    		}
  	}

  	/* (22):
   	 * capitalCompare �禡�O�ΨӰ��ƧǪѥ��ɩҥΨ쪺����禡�A��I�s
   	 * companyIDCapitalArray.sort �ӱƧǮɡAsort �|�I�s capitalCompare
   	 * �öǤJ�G�Ӥ��q������A����禡�n��ǤJ���G�Ӫ���[�H����A
   	 * �Ǧ^���G�C�ѩ�O����ƧǡA�ҥH�βĤG�ӰѼƴ�Ĥ@�ӰѼƪ����G
   	 * �Ǧ^�C�Цۦ����d�Ң���������禡 companyComp�C
   	 */

  	function capitalCompare(companyIDCapital1,companyIDCapital2) {
    		return companyIDCapital2.capital-companyIDCapital1.capital;
  	}
  
  	/* (19):
   	 * sortCapitalButtonClick �禡�O��ϥΪ̫��U�y���ꥻ�B�Ƨǡz
   	 * ���s��|�I�s���ƥ�B�z�禡�C
   	 */

  	function sortCapitalButtonClick() {

    		/* (20):
   	  	 * �n�ƧǪѥ��ɡA�n���⥦�M���qID���X�b�@�_�h�ƧǡA�~�i�H�b�ѥ��Ƨ�
    	 	 * �����᪾�D���q��ID�O����C
    	 	 * companyIDCapitalArray �N�O���X ID �M�ѥ��ҧΦ����}�C�A��������
   	  	 * �O�@�Ӫ���A{"id":���q ID�A"capital":�ѥ�}
   	  	 */

    		var companyIDCapitalArray=[];
    		for (i=0;i<totalCompany;i++) {
      			companyIDCapitalArray.push({
       		 		"id":companyID[i],
        			"capital":companyCapital[i]
			});
    		}

    		/* (21):
     		 * �b�� companyIDCapitalArray �ƧǮɡA�ϥ� capitalCompare �禡
     		 * ��������禡�C�Ƨ���C�X�e 100 �j���q�� ID�B�W�٤Ϊѥ��C
     		 */

    		companyIDCapitalArray.sort(capitalCompare);
    		showMessage("��� : ����\n");
    		for (i=0;i<100;i++) {
      			var id=companyIDCapitalArray[i].id;
      			var idIndex=companyID.indexOf(id);
	      		appendMessage(
      				"�ƦW "+(i+1)+"\n"+
      				"    �N���G"+id+"\n"+
	      			"    ���q�W�١G"+companyName[idIndex]+"\n"+
      				"    �ꥻ�B�G"+companyCapital[idIndex]+"\n\n"
			);
	    	}
	}

  	/* (18):
   	 * windowOnResize �禡�O�b�����Q�ϥΪ��ܧ�j�p�ɷ|�եΪ��禡�A���b
   	 * showInterface �禡���Q���w�� window.onresize ���ƥ�B�z�禡�C
   	 * ������j�p�ܧ�ɡA�i��|�v�T messageBox ���������ܡA�Ь� (17) ����
   	 */
   
  	function windowOnResize() {
    		messageBox.style.overflow="scroll";
    		messageBox.style.width=window.innerWidth-15;
    		messageBox.style.height=window.innerHeight-messageBox.offsetTop-15;    
  	}

  	/* (15):
   	 * showInterface �禡�D�n�O�ΨӦb HTML ��󤤴��J�ϥΪ̤���������
   	 * �{���X�A�åB���w���䪺�ƥ�B�z�禡�C
   	 */

  	function showInterface() {

    		/* (16):
     	 	 * ���� HTML ���n�Ψ쪺����A���G�ӫ��s�A sortCapital �ΨӱƧǫe
     		 * �������j�ѥ������q�AsortSeasonEPS �ΨӱƧǫe�������j�Ӣޢ᪺���q
     		 * �A�q�� msg �h���T����X���A���ϥΪ̬ݨ�{�����T���ηj�M
     		 * �����G�C
     		 * �b�٨S�q�ɮפ�Ū�X�U���q����ƫe���N sortCapital �� sortSeasonEPS
     		 * �T��C�b���禡���٭n�]�w window.onresize �ƥ�B�z�禡�A�H�ζ}�l
     		 * �ɰT����X�����j�p(�̵������j�p)�C
     		 */

    		document.body.innerHTML=
      		"<p><input type=button id='sortCapital' value='���ꥻ�B�Ƨ�'></p>"+
      		"<p><input type=button id='sortSeasonEPS' value='���|�uEPS�`�X�Ƨ�'></p>"+
      		"<p><pre id='msg'>Message box.</pre></p>";
    		sortCapitalButton=document.getElementById("sortCapital");
    		sortSeasonEPSButton=document.getElementById("sortSeasonEPS");
    		messageBox=document.getElementById("msg");
    		sortCapitalButton.setAttribute("disabled","true");
    		sortSeasonEPSButton.setAttribute("disabled","true");
    		window.onresize=windowOnResize;   // ���w�����j�p���ܮɪ��ƥ�B�z�禡
    		
		/* (17):
    		 * �̵������j�p�]�w�T����X�����j�p�A�b�����]���ʱ쪺�e�׬O 15�A
		 * �T����X�������׬O���������צA��h�T�����b body ���Z�W�䪺�j�p
     		 * �A�٭n��h�U�䱲�ʱ쪺���סA�]�O���]�O 15�C
     		 * ���ʱ쪺�p�פ��Ϋܺ�ǡA�u�n������X�{�b�������Y�i�C
     		 */
 
    		messageBox.style.overflow="scroll";
    		messageBox.style.width=window.innerWidth-15;
    		messageBox.style.height=window.innerHeight-messageBox.offsetTop-15;  
  	}

  	/* (13):
   	 * readAllCompanySeasonEPSOK �禡�O�bŪ�����Ҧ����q�C�uEPS�ɮ׫�Q
   	 * �I�s�A�ǤJ���Ѽ� textArray �OŪ�ɱo�쪺��r�r��}�C�A�j�p�]�O
   	 * totalCompany �A���}�C�����C�@�Ӥ����O�@�Ӥ��q���C�uEPS��ơC
   	 * �����������O�A�b�o�ئ��@�Ӱ��]�s�b�A���`�ӻ��C�u EPS ���ɮ׷|
   	 * �H�ۮɶ��W�j�A���s�@�u�� EPS �X�ӮɡA�n���[���ɮפ��A�ثe�C�u
   	 * EPS ���s�ɵ{��(�d�Ң�)�O��U������������ƪ����л\�C�u EPS ���ɮ�
   	 * �A�A�����ۤv�ק�{�������[�s�@�u����ƨ��ɮפ��C�t�~�A�A�]����
   	 * �ۤv�g�{���P�_ EPS ���~�����ݩ�ĴX�u�C
   	 */

  	function readAllCompanySeasonEPSOK(textArray) {
    		for (i=0;i<totalCompany;i++) {
      			var oneCompanySeasonEPS=textArray[i];    // �o��@�a���qEPS���򥻸��

      			/* (14):
       		 	 * �N�@�a���q���U�uEPS�r��� "\n" ���}���@�u�@�u���r��A�A�N
       		 	 * �@�u���r��� ":" ���}���}�C�A���}��}�C����0�Ӥ����O�~�פ�
       		 	 * �ĴX�u�A��1�Ӥ����~�O�@�u��EPS�A�NEPS�� parseFloat �ন�ƭ�
       		 	 * �⥦�[�`�� totalEPS ���A�e�|�u��EPS�[�`������A�Y�i��J
       		  	 * companyEPS �}�C���C
       		 	 * �o��Ҧ����q�e�|�uEPS�`�X�ƭȫ�A�Y�i�� sortCapital �� 
       		 	 * sortSeasonEPS �G�ӫ��s�h���T�઺���A�A���ϥΪ̥i�H�ۥѫ��U���̡C
       		 	 */

      			var totalEPS=0;
      		 	var oneCompanySeasonEPSSplitArray=oneCompanySeasonEPS.split("\n");
      			for (k=0;k<oneCompanySeasonEPSSplitArray.length-1;k++) {
        			var oneSeasonEPSText=oneCompanySeasonEPSSplitArray[k];
        			var oneSeasonEPSTextSplitArray=oneSeasonEPSText.split(":");
        			var seasonEPS=parseFloat(oneSeasonEPSTextSplitArray[1]);
        			totalEPS=totalEPS+seasonEPS;
      			}
      			companyEPS.push(totalEPS);
    		}

    		showMessage("�ɮ�Ū�������A�A�i���U�C���s�Ƨ�...\n");
    		sortCapitalButton.removeAttribute("disabled");
    		sortSeasonEPSButton.removeAttribute("disabled");
    		sortCapitalButton.onclick=sortCapitalButtonClick;
    		sortSeasonEPSButton.onclick=sortSeasonEPSButtonClick;
  	}
  
  	/* (10):
   	 * readAllCompanySeasonEPS �禡�t�d�Ұ�Ū���U���q�C�u�վl���@�~�C
   	 * �b�}�lŪ�J�@�~�e�n���ǳƦn�U�ɮת��ؿ����ɦW�A�ѩ�ؿ��b
   	 * readAllComanyInformation �禡���w�ǳƹL�F�A�]���b���禡���u�n
   	 * ���ɦW�}�C�ǳƧY�i�C
   	 */

  	function readAllCompanySeasonEPS() {

    		/* (11):
     	 	 * �ǳƩҦ����q�C�uEPS�ɮצW�٪��}�C allCompanySeasonEPSFileArray
     		 */    

    		allCompanySeasonEPSFileArray=[];
    		for (i=0;i<totalCompany;i++) {     // �@�� totalCompany ���ɮ׭nŪ��
      			// �ɮצW�٧��� "seasonEPS.txt"
      			allCompanySeasonEPSFileArray.push("seasonEPS.txt");
    		}       
    		showMessage("�еy�ԡA���bŪ��EPS(�C�u)�ɮ�...\n");

    		/* (12):
     		 * �ե� readLOcalTextFileSeries �禡Ū�J�Ҧ����q�C�uEPS����ɮסC
     		 * �Ҧ��ɮ�Ū��������I�s readAllCompanySeasonEPSOK �禡�C
     		 */      

    		readLocalTextFileSeries(allCompanyDirectoryArray,
                            allCompanySeasonEPSFileArray,
                            readAllCompanySeasonEPSOK);    
  	}
  
  	/* (8):
   	 * readAllComanyInformationOK �禡�O�bŪ�����������q���򥻸���ɮ׫�
   	 * �Q�I�s�C�ǤJ���Ѽ� textArray �OŪ�ɱo�쪺��r�r��}�C�A�j�p�]�O
   	 * totalCompany �A���}�C�����C�@�Ӥ����O�@�Ӥ��q���򥻸�ơA�榡�O
   	 * ���ƪ�/�`�g�z/�ѥ�/�C
   	 * �B�z���Ҧ����q�򥻸�ƫ�A�I�s readAllCompanySeasonEPS �禡
   	 */

  	function readAllComanyInformationOK(textArray) {
     		for (i=0;i<totalCompany;i++) {
      			var oneCompanyInfo=textArray[i];    // �o��@�a���q���򥻸��

      			/* (9):
       			 * �N�@�a���q����ƨ� "/" ���}���}�C�A���}��}�C���� 0 ��
       			 * �����O���ƪ��A�� 1 �Ӥ����O�`�g�z�A�� 2 �Ӥ����O�ѥ��A
       			 * ���O�N�U������J������ܼ� companyPresident�BcompanyCEO
       			 * companyCapital �T�Ӱ}�C���C
       			 */

      			var oneCompanyInfoSplitArray=oneCompanyInfo.split("/");
      			companyPresident.push(oneCompanyInfoSplitArray[0]);
      			companyCEO.push(oneCompanyInfoSplitArray[1]);
      			companyCapital.push(parseFloat(oneCompanyInfoSplitArray[2]));
    		}
    		readAllCompanySeasonEPS();
  	}
  
  	/* (4):
   	 * readAllComanyInformation �禡�t�d�Ұ�Ū�J�Ҧ����q�򥻸�ƪ��@�~�C
   	 * �b�}�lŪ�J�@�~�e�n�ǳƦn�Ҧ����q�򥻸�ƩҦb���ؿ��}�C���ɮץؿ�
   	 * �}�C�A�o�G�Ӱ}�C���j�p���O totalCompany�C
   	 */

  	function readAllComanyInformation() {

    		/* (5):
     		 * �����ǳƩҦ����q�򥻸���ɮשҦb�ؿ����}�C allCompanyDirectoryArray
     		 */

    		allCompanyDirectoryArray=[];
    		for (i=0;i<totalCompany;i++) {     // �@�� totalCompany ���ɮ׭nŪ��
      			// �ɮשҦb�ؿ����� "STOCK/ID"
      			allCompanyDirectoryArray.push("STOCK/"+companyID[i]);
    		}

    		/* (6):
     		 * ���۷ǳƩҦ����q�򥻸���ɮצW�٪��}�C allCompanyInfoFileArray
     		 */    

    		allCompanyInfoFileArray=[];
    		for (i=0;i<totalCompany;i++) {     // �@�� totalCompany ���ɮ׭nŪ��
      			// �ɮצW�٧��� "companyInfo.txt"
      			allCompanyInfoFileArray.push("companyInfo.txt");
    		}    
    		showMessage("�еy�ԡA���bŪ�����q�򥻸���ɮ�...\n");

    		/* (7):
     		 * �ե� readLOcalTextFileSeries �禡Ū�J�Ҧ����q�򥻸���ɮסC
     		 * �Ҧ��ɮ�Ū��������I�s readAllComanyInformationOK �禡�C
     		 */ 
     
    		readLocalTextFileSeries(allCompanyDirectoryArray,
                            allCompanyInfoFileArray,
                            readAllComanyInformationOK);
  	}
  
  	/* (2):
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
    		showInterface();

    		/* (3):
     		 * �B�z�o�� companyArray ����A�I�s readAllComanyInformation �禡�A�Ө�
     		 * ���D�n�ΨӱҰ�Ū�J�Ҧ����q�򥻸���ɮת��@�~�C
     		 */
    		readAllComanyInformation();
  	}
      
  	/* (1):
   	 * ���d�ҵ{���Ѧ��}�l����A�{���Ψ쪺����ܼƤΨ禡��������b
   	 * windoiw.onload ���C
   	 * �{���@�}�l��Ū�J company.txt �ɮת����e�CŪ���ɮת��禡�b�o
   	 * �O�ϥ� readLoaclTextFileSeries �A���M�o�Ө禡�D�n�O�i�H�@��
   	 * Ū���h���ɮסA�Υ���Ū���@���ɮפ]�O�i�H���C�u�n��nŪ����
   	 * ��@�ɮשҦb�ؿ���b�}�C���Φ��Ĥ@�ӰѼơA�nŪ�����ɮצW��
   	 * �P�˩�J�@�Ӱ}�C���Φ��ĤG�ӰѼƧY�i�C
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
		"<input type=button id='ex7Button' value='��X�d��7'>"+
		"<p><pre id='msg'>���B�O�T�����A�b����ܰT���C</pre></p>";

	document.getElementById("ex3Button").onclick=function() {
		doEx3WindowOnload();
	};

	document.getElementById("ex5Button").onclick=function() {
		doEx5WindowOnload();
	};

	document.getElementById("ex7Button").onclick=function() {
		doEx7WindowOnload();
	};
};
