/*
 * �d�Ң��G�ռg�@�{��Ū�X�U���q�򥻸�ơBEPS��A�A�U���U���q�ثe��
 *         �ѻ��A�p��U���q���q��A�̥��q��Ƨ�(�Ѥp��j)�Ƨǫe
 *         �������a���q�C
 *
 * �����G�U���q�ѻ��i�ѡyhttps://tw.quote.finance.yahoo.net/quote/q
 *       ?type=tick&perd=1m&mkt=10&sym=���qID�z�o��C�Ӻ����O�C
 *       ��ѻ����չϡA�u�b�}�L�e30�������k�S����ơA�䥦����ɶ���
 *       �i�H�o���ѩΫe�@�Ѫ����չϡC�q�Ӻ������⦨������X�A�i�H
 *       ��O�Y�ɪ��ѻ���T�C
 */

function doEx8WindowOnload() {

  	var allCompanyDirectoryArray=[];
  	var allCompanyInfoFileArray=[];
  	var allCompanySeasonEPSFileArray=[];
  	var companyName=[];         // �Ҧ����q�W�ٰ}�C
  	var companyID=[];           // �Ҧ����qID�}�C
  	var companyPresident=[];    // �Ҧ����q�����ƪ��}�C
  	var companyCEO=[];          // �Ҧ����q���`�g�z�}�C
  	var companyCapital=[];      // �Ҧ����q���ѥ��}�C
  	var companyEPS=[];          // �Ҧ����q��EPS�}�C
  	var companyPrice=[];        // �Ҧ����q���ثe�������}�C
  	var totalCompany=0;         // �Ҧ����q���ƶq�A�Y companyArray ���j�p
  	var sortPERatioButton;      // HTML ���� sortPERatio �� Javascript ����
  	var messageBox;             // HTML ���� messageBox �� Javascript ����
  	var companyInfo="";
  	var companySeasonEPS="";
  	var companyYearEPS="";

  	function peratioCompare(idPERatio1,idPERatio2) {
    		return idPERatio1.peratio-idPERatio2.peratio;
  	}

  	/* (26):
   	 * sortPERatioButtonClick �禡�O��ϥΪ̫��U�y�����q��(�e�|�uEPS)�Ƨǡz
   	 * ���s��|�I�s���ƥ�B�z�禡�C
   	 * �����p��C�a���q�����q��A��J peRatioArray �A�M��p�e�@�ӽd��
   	 * �ǳƦn�y���q��z�ΡyID�z���X������}�C idPERatioArray�A�M��~��
   	 * ���}�C�i�楻�q�񪺱Ƨ�(�Ѥp��j)�C
   	 */

  	function sortPERatioButtonClick() {
    		var peRatioArray=[];
    		for (i=0;i<totalCompany;i++) {
      			if (isNaN(companyPrice[i])||(companyEPS[i]<=0)) {

        			/* (27):
         		 	 * �p�G�e���U�����q�ѻ����ɭԥ��ѡA�h companyPrice �O NaN�A
         		 	 * ���ɤ���p�⥻�q��C�t�~�Y EPS �`�X�O�t���ܡA�Ѥp��j�h��
         		 	 * �ǤϦӷ|�ƨ�e���A�ڭ����ߪ����ӬO EPS �`�X�O���ƪ��ƧǡA
         		 	 * �ҥH�e���o�G�ر��γ����i�H�h�ƧǡA�ڭ̧⥦�����q��]����
         		 	 * �L���j�A�ƧǮɦ۵M�|�]��̫᭱�F�C
         		 	 */

        			peRatioArray.push(Number.POSITIVE_INFINITY);
      			} else {
        			peRatioArray.push(companyPrice[i]/companyEPS[i]);
      			}
    		}
    		var idPERatioArray=[];
    		for (i=0;i<totalCompany;i++) {
      			idPERatioArray.push({"id":companyID[i],"peratio":peRatioArray[i]});
    		}
    		idPERatioArray.sort(peratioCompare);
    		showMessage("");
    		for (i=0;i<100;i++) {
      			var idIndex=companyID.indexOf(idPERatioArray[i].id);
      			appendMessage(
                             	"�ƦW "+(i+1)+"\n"+
                             	"���q�W�١G"+companyName[idIndex]+"\n"+
                             	"���q�N���G"+idPERatioArray[i].id+"\n"+
				"�e�|�uEPS�`�X�G"+companyEPS[idIndex]+"\n"+
				"�ثe�ѻ��G"+companyPrice[idIndex]+"\n"+
                             	"���q��G"+idPERatioArray[i].peratio+"\n\n"
			);
    		}
  	}

  	/* (25):
   	 * windowOnResize �禡�O�b�����Q�ϥΪ��ܧ�j�p�ɷ|�եΪ��禡�A���b
   	 * showInterface �禡���Q���w�� window.onresize ���ƥ�B�z�禡�C
   	 * ������j�p�ܧ�ɡA�i��|�v�T messageBox ���������ܡA�Ь� (17) ����
   	 */
   
  	function windowOnResize() {
    		messageBox.style.overflow="scroll";
    		messageBox.style.width=window.innerWidth-15;
    		messageBox.style.height=window.innerHeight-messageBox.offsetTop-15;    
  	}

  	/* (22):
    	 * showInterface �禡�D�n�O�ΨӦb HTML ��󤤴��J�ϥΪ̤���������
   	 * �{���X�A�åB���w���䪺�ƥ�B�z�禡�C
   	 */

  	function showInterface() {

    		/* (23):
     		 * ���� HTML ���n�Ψ쪺����A���@�ӫ��s�A sortPERatio �ΨӱƧǫe
     		 * �������j���q�񪺤��q�A�q�� messageBox �h���T����X���A���ϥΪ�
     		 * �ݨ�{�����T���ηj�M�����G�C
     		 * �b�٨S�q�ɮפ�Ū�X�U���q����ƫe���N sortPERatio�T��C�b���禡��
     		 * �٭n�]�w window.onresize �ƥ�B�z�禡�A�H�ζ}�l�ɰT����X�����j�p
     		 * (�̵������j�p)�C
     		 */

    		document.body.innerHTML=
      		"<p><input type=button id='sortPERatio' value='�����q��(�e�|�uEPS)�Ƨ�'></p>"+
      		"<p><pre id='msg'>�Ы��W�����s�i��ƧǡC</pre></p>";
    		sortPERatioButton=document.getElementById("sortPERatio");
    		messageBox=document.getElementById("msg");
    		sortPERatioButton.setAttribute("disabled","true");
    		window.onresize=windowOnResize;   // ���w�����j�p���ܮɪ��ƥ�B�z�禡

    		/* (24):
     		 * �̵������j�p�]�w�T����X�����j�p�A�b�����]���ʱ쪺�e�׬O 15�A
     		 * �T����X�������׬O���������צA��h�T�����b body ���Z�W�䪺�j�p
     		 * �A�٭n��h�U�䱲�ʱ쪺���סA�]�O���]�O 15�C
     		 * ���ʱ쪺�p�פ��Ϋܺ�ǡA�u�n������X�{�b�������Y�i�C
     		 */ 

    		messageBox.style.overflow="scroll";
    		messageBox.style.width=window.innerWidth-15;
      		messageBox.style.height=window.innerHeight-messageBox.offsetTop-15;  
  	}

  	/* (15):
   	 * downloadCompanyStockPrice �U���U���q���Y�ɨ��չϺ����A���}�O
   	 * �yhttps://tw.quote.finance.yahoo.net/quote/q?type=tick&perd=1m&
   	 * mkt=10&sym=���qID�z�A�M��q���������X�ثe������C
   	 */

  	function downloadCompanyStockPrice() {
    		var index;
    
    		/* (21):
     		 * processcCompanyPriceInfoArray �禡���@�νаѦҽd�Ң�����
     		 * processMarketInfoArray �禡�����C
     		 */ 

    		function processcCompanyPriceInfoArray(CompanyPriceInfo) {
      			var CompanyPriceInfoSplitArray=CompanyPriceInfo.split(",");
      			var CompanyPriceInfoArray=new Array(2);
      			CompanyPriceInfoArray[0]=[];
      			CompanyPriceInfoArray[1]=[];
      			for (var i=0;i<CompanyPriceInfoSplitArray.length;i++) {
        			var oneInfo=CompanyPriceInfoSplitArray[i].split(":");
        			CompanyPriceInfoArray[0].push(oneInfo[0]);
        			CompanyPriceInfoArray[1].push(oneInfo[1]);
      			}
      			return CompanyPriceInfoArray; 
    		}
    
    		/* (17):
     		 * processCompanyPriceInfo �禡�t�d�B�z�U�����U���q���չϺ����C
     		 * �q�U�����q���չϭ�l�X�����X CompanyPriceInfoArray ����k�M
     		 * �d�Ң������X�j�L marketInfoArray ����k�@�ˡA�аѾ\���e�����C
     		 */

    		function processCompanyPriceInfo() {

      			/* (19):
       			 * ��l�� price �� NaN ���ت��O���F�U�������Y�O���Ѫ����ΤU�A
       			 * �Ӥ��q��������N���s�b�A���O�Ҧ����q��������}�C���٬O�n��
       			 * �@�ӭȩ�J��}�C���A�b����ܱN NaN ��J�A����b�p�⥻�q��
       			 * ���ɭԱN���p�⦨������s�b�����q�C
       			 */

      			var price=Number.NaN;
      			if (this.status === 200) {
        			var CompanyPriceInfo=this.response;
        			var tempIndex1=CompanyPriceInfo.indexOf("name");
        			CompanyPriceInfo=CompanyPriceInfo.slice(tempIndex1-1);
        			tempIndex1=CompanyPriceInfo.indexOf("[");
        			CompanyPriceInfo=CompanyPriceInfo.slice(0,tempIndex1-9);
        			CompanyPriceInfoArray=processcCompanyPriceInfoArray(CompanyPriceInfo);
        
				/* (18):
         			 * �U����������Ƥ����p�U���榡
         			 * "name":"�p��","128":2036.0,...,"122":81.0,"125":123.5,"126":113.0
         			 * processcCompanyPriceInfoArray �B�z��Ǧ^�� CompanyPriceInfoArray
         			 * �O�@�ӤG���}�C�A�䤤
         			 * CompanyPriceInfoArray[0] ���e�O "name","128",...,"125","126"
         			 * CompanyPriceInfoArray[1] ���e�O "�p��",2036.0,...,123.5,113
         			 * �n�`�N�쪺�O���e�]�t�����޸��b�ح��A����ȬO�۹��
         			 * CompanyPriceInfoArray[0] ���e�O "125" �����@�� index �b 
         			 * CompanyPriceInfoArray[1] �����ȡA�H�W�Ҩӻ��N�O 123.5�A��
         			 * indexOf �ӷj�M "125" �r��ɡA�n�]�A���޸��C
         			 */

        			var priceIndex=CompanyPriceInfoArray[0].indexOf("\"125\"");
        			if (priceIndex!=-1) {
          				// �U����Ƥ�������ȮɡA�~�]�w price ���ȡA�_�h price �|�O NaN
          				price=parseFloat(CompanyPriceInfoArray[1][priceIndex]); 
        			}
      			} else {
        			showMessage("�U�����q�Y�ѻ�����! status="+
                                this.status);
      			}      

      			/* (20):
       		 	 * ���פ��q���ѻ��s�b�P�_�A���n�b�Ҧ����q������}�C����J�@��
       		 	 * �ȡC�M��A�~��U�@�Ӥ��q�������U���C
       		 	 * �p�G��F�̫�@�a���q�A�h�N sortPERatio ���s���T��h���A����
       		 	 * �Ϊ̥i�H���U���s�A�}�l�i��ƧǡC
       		 	 */

      			companyPrice.push(price);
			showMessage("�еy�ԡA���b�U���U���q�Y�ɪѻ�������...\n"+
				"index="+index);
      			index++;    // �~��U�@�a���q
      			if (index==totalCompany) {
        			showMessage("�U�������A�Ы��W����s�i��Ƨ�...\n");
        			sortPERatioButton.removeAttribute("disabled");
        			sortPERatioButton.onclick=sortPERatioButtonClick;
      			} else {
        			getUrlSource(
          				companyPriceUrlArray[index],
          				processCompanyPriceInfo,
          				errorHandler
        			);      
      			}
    		}
    
    		/* (16):
     		 * �����ǳƦn�U���q���չϺ��}���}�C companyPriceUrlArray�A�M��
    	 	 * �̧ǤU���U���q�����C�U���U���q���չϺ������{���i�H�Ѧҽd�Ң�
    	 	 * ���U���j�L���չϪ��{���C
   	  	 * index �O�ثe�n�U�����q�������b companyPriceUrlArray ������m�A
    	 	 * �@�}�l���]��0��ܱq��0�Ӻ��}�}�l�U���C�U���������M�O�Q��
    	 	 * getUrlSource �禡�i��A�C�U�����@�Ӻ����N�I�s processCompanyPriceInfo
    	 	 * �禡�A�t�d�B�z�U����������l�X�C
   	  	 */

   	 	var companyPriceUrlArray=[];
   	 	for (i=0;i<totalCompany;i++) {
   	   		companyPriceUrlArray.push(
   	   		"https://tw.quote.finance.yahoo.net/quote/q?type=tick&perd=1m&mkt=10&sym="+
   	   		companyID[i]);
    		}
    		index=0;
    		showMessage("�еy�ԡA���b�U���U���q�Y�ɪѻ�������...\n");
   	 	getUrlSource(
     	 		companyPriceUrlArray[index],
     	 		processCompanyPriceInfo,
     	 		errorHandler
    		);
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
     	  		 * �o��Ҧ����q�e�|�uEPS�`�X�ƭȫ�A�Y�i�� sortPERatio  
      	 		 * ���s�h���T�઺���A�A���ϥΪ̥i�H�ۥѫ��U���C
      	 		 * �Ъ`�N�o�ت� EPS �`�X�O�e�|�u�A�����O�P�@�~�ת���Q�A�p�G�n�O�P
     	  		 * �@�~�ת���Q�A�̦n�O�C�~2,3��ɤw�g�T�w�e�@�~�ץ|�u EPS ���ɭԡA
     	  		 * �~�Ӱ��榹�{���C
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
    		downloadCompanyStockPrice();
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
    		showMessage("�еy�ԡAŪ���U���q�C�uEPS�ɮפ�...\n");

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
    		showMessage("�еy�ԡAŪ�����q�򥻸���ɮפ�...\n");

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
   	 * �аѦҽd��5�� readCompanyFileOK �禡�������A�o�ت��{���M�d��5
   	 * ���{���X�G�����ۦP�C
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
 * �t�@�ӡy��X�d��8�z���s�~�O�Ұʥ��d�ҵ{�����u������C
 */

window.onload=function() {
	document.body.innerHTML=
		"<input type=button id='ex3Button' value='��X�d��3'>"+
		"<input type=button id='ex5Button' value='��X�d��5'>"+
		"<input type=button id='ex8Button' value='��X�d��8'>"+
		"<p><pre id='msg'>���B�O�T�����A�b����ܰT���C</pre></p>";

	document.getElementById("ex3Button").onclick=function() {
		doEx3WindowOnload();
	};

	document.getElementById("ex5Button").onclick=function() {
		doEx5WindowOnload();
	};

	document.getElementById("ex8Button").onclick=function() {
		doEx8WindowOnload();
	};
};
