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

function skipPatternCount(text,skipPattern,skipCount) {
  	for (var i=0;i<skipCount;i++) {
    		var tempPos=text.indexOf(skipPattern);
    		text=text.slice(tempPos+skipPattern.length,text.length);
  	}
  	return text;
}

function removeComma(text) {
  	var textArray=text.split(",");
  	text="";
  	for (var i=0;i<textArray.length;i++) {
    		text=text+textArray[i];
  	}
  	return text;
}

String.prototype.sliceByPattern=function(beginPattern,endPattern,includePattern) {
  	var beginPos=this.indexOf(beginPattern);
  	if (beginPos==-1) {
    		return "";
	}
  	if (!includePattern) {
    		beginPos=beginPos+beginPattern.length;
  	}
  	var tempString=this.slice(beginPos,this.length);
  	var endPos=tempString.indexOf(endPattern);
  	if (includePattern) {
    		endPos=endPos+endPattern.length;
  	}
  	tempString=tempString.slice(0,endPos);
  	return tempString;
};

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

function saveLocalTextFileSeries(directoryArray,fileNameArray,textArray,callback,truncate) {
  	var index=0;
  	var requestFileSystem = window.webkitRequestFileSystem;
  	requestFileSystem(PERSISTENT, 0, haveFileSystem, errorHandler);
  
  	function nextFileOrEnd() {
    		index++;
    		if (index==directoryArray.length) {
      			callback();
    		} else {
      			var requestFileSystem = window.webkitRequestFileSystem;
      			requestFileSystem(PERSISTENT, 0, haveFileSystem, errorHandler);
    		}
  	}
  
  	function hasFileWriter(fw) {
    		fileWriter=fw;
    		fileWriter.onwrite = function(e) {
      			if (truncate) {
        			fileWriter.onwrite = function(e) {
          				nextFileOrEnd();
        			};
        			var blob = new Blob([textArray[index]],{type: 'text/plain'});
        			fileWriter.write(blob);
      			} else {
        			nextFileOrEnd();
      			}
    		};
    		fileWriter.onerror = errorHandler;
    		if (truncate) {
      			fileWriter.truncate(0);
    		} else {
      			var blob = new Blob([textArray[index]],{type: 'text/plain'});
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

  	function haveFileSystem(fs) {
    		fs.root.getDirectory(
			directoryArray[index],
      			{
        			create: true,
        			exclusive: false
      			},
      		function (de) {
        		directoryEntry = de;
        		directoryEntry.getFile(
          			fileNameArray[index],
          			{ 
					create: true, 
					exclusive: false 
				},
          			hasFileEntry,
          			errorHandler
        		);        
      		},
      		errorHandler
    		);
  	}
}

function readLocalTextFileSeries(directoryArray,fileNameArray,callback) {
  	var index=0;
  	var textArray=[];
  	var requestFileSystem = window.webkitRequestFileSystem;
  	requestFileSystem(PERSISTENT, 0, haveFileSystem, errorHandler);
  
  	function createFileReader(file) {
    		var reader=new FileReader();
    		reader.onload=function () {
      			textArray.push(reader.result);
      			index++;
      			if (index==directoryArray.length) {
        			callback(textArray);
      			} else {
        			var requestFileSystem = window.webkitRequestFileSystem;
        			requestFileSystem(PERSISTENT, 0, haveFileSystem, errorHandler);
      			}
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

  	function haveFileSystem(fs) {
    		fs.root.getDirectory(
			directoryArray[index],
      			{
        			create: true,
        			exclusive: false
      			},
      			function (de) {
        			directoryEntry = de;
        			directoryEntry.getFile(
          				fileNameArray[index],
          				{ create: true, exclusive: false},
          				hasFileEntry,
          				errorHandler
        			); 
      			},
      			errorHandler
    		);
  	}
}
