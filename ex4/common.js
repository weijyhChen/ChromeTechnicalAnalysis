function showMessage(message) {
	document.getElementById("msg").innerHTML=message;
}

function appendMessage(message) {
	document.getElementById("msg").innerHTML+=message;
}

function appendTopMessage(message) {
	document.getElementById("msg").innerHTML=message+
	document.getElementById("msg").innerHTML;
}

function errorHandler(e) {
	showMessage(e);
}

function getUrlSource(url,callback,error) {
	var req=new XMLHttpRequest();
	req.onload=callback;
	req.onerror=error;
	req.responseType="text";
	req.open("get",url);
	req.send();
}

String.prototype.sliceByPattern=function(beginPattern,endPattern) {
	var beginPos=this.indexOf(beginPattern);
	if (beginPos==-1) {
		return "";
	}
	var tempString=this.slice(beginPos,this.length);
	var endPos=tempString.indexOf(endPattern);
	tempString=tempString.slice(0,endPos);
	return tempString;
}

var directoryEntry;

function saveLocalTextFile(fileName,text,callback,truncate) {
  	var fileSize=0;
  	
	function hasFileWriter(fw) {
    		fileWriter=fw;
    		fileWriter.onwrite = function(e) {
      			if (truncate) {
        			fileWriter.onwrite = function(e) {
          				callback();
        			};
        	
				var blob = new Blob([text],{type: "text/plain"});
        			fileWriter.write(blob);
      			} else {
        			callback();
      			}
	    	};

	   	fileWriter.onerror = errorHandler;
    		if (truncate) {
      			fileWriter.truncate(0);
	    	} else {
      			var blob = new Blob([text],{type: "text/plain"});
      			fileWriter.seek(fileWriter.length);
	      		fileWriter.write(blob);
    		}
	}

	function hasFileEntry(fe) {
		fileEntry=fe;
    		fileEntry.createWriter(
      			hasFileWriter,
      			errorHandler
    		);
  	}

	if (directoryEntry===null) {
    		return;
	}
  	directoryEntry.getFile(
    		fileName,
		{ create: true, exclusive: false },
		hasFileEntry,
		errorHandler
	);
}

function readLocalTextFile(fileName,callback) {

  	function createFileReader(file) {
   		var reader=new FileReader();
    		reader.onload=function () {
      			callback(reader.result);
    		};
    		reader.readAsText(file);
  	}
  
	function hasFileEntry(fe) {
    		fileEntry=fe;
    		fileEntry.file(
      			createFileReader, 
      			errorHandler
    		);
  	}
  
	if (directoryEntry===null) {
    		return;
	}

  	directoryEntry.getFile(
    		fileName,
    		{ create: true, exclusive: false},
    		hasFileEntry,
    		errorHandler
  	); 
}

function openLocalFileSystem(directory) {

  	function haveFileSystem(fs) {
    		fs.root.getDirectory(
			directory,
      			{
		        	create: true,
        			exclusive: false
      			},
      			function (de) {
        			directoryEntry = de;
      			},
      			errorHandler
    		);
  	}

	directoryEntry=null;
  	var requestFileSystem = window.webkitRequestFileSystem;
  	requestFileSystem(PERSISTENT, 0, haveFileSystem, errorHandler);
}

