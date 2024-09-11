 const encodedString ='W3siTmFtZSI6IlJhbSBLcmlzaG5hIiwiUm9sbE51bWJlciI6IkExMS0xMiIsIk1hcmtzIjoxODAsIlJlbWFya3MiOiJOQSJ9LHsiTmFtZSI6IlNoeWFtIFNoZWUiLCJSb2xsTnVtYmVyIjoiQjExLTIzIiwiTWFya3MiOjE4MSwiUmVtYXJrcyI6Ik5BIn0seyJOYW1lIjoiTGFrc2htYW4gRGFzIiwiUm9sbE51bWJlciI6IkIxMS0yNCIsIk1hcmtzIjoxODIsIlJlbWFya3MiOiJOQSJ9LHsiTmFtZSI6IkJoYXJhdCBEYXMiLCJSb2xsTnVtYmVyIjoiQjExLTI1IiwiTWFya3MiOjE4MywiUmVtYXJrcyI6Ik5BIn0seyJOYW1lIjoiS2FybmEgRGFzIiwiUm9sbE51bWJlciI6IkIxMS0yNiIsIk1hcmtzIjoxODQsIlJlbWFya3MiOiJOQSJ9LHsiTmFtZSI6IktyaXNobmEgRGFzIiwiUm9sbE51bWJlciI6IkIxMS0yNyIsIk1hcmtzIjoxODUsIlJlbWFya3MiOiJOQSJ9XQ=='

// Decode a Base64 string
//const decodedString = atob(encodedString);
//console.log(decodedString); 
 
 
 function showResult() {
			
			var error = document.getElementById('error');
			var boolMobNum = false;
			var nameInput = document.getElementById('inputValueName').value;			
            var rollNumInput = document.getElementById('inputValue').value;
			//var mobileInput = document.getElementById('inputValueCellNo').value;
			//var dobInput = document.getElementById('inputValueDob').value;
			
			   // Check if the input is a 10-digit number
           /* if (/^\d{10}$/.test(mobileInput)) {
				boolMobNum = true;
                error.style.display = 'none';
                //alert('Mobile number is valid!');
            } else {
				boolMobNum = false;
                error.style.display = 'block';
				alert('Mobile number is Invalid!');
            }*/		
			
			if ( nameInput !="" && rollNumInput !=""){
				boolMobNum = true;
			}
			
			if ( boolMobNum ) {
            //document.getElementById('resultDisplay').innerText = inputValueName + ' Marks is : ' + inputValue;
				// Excel Data Read and show 
			//var retMarks = readExcelData ( nameInput , rollNumInput)
			strToJson (encodedString,nameInput , rollNumInput)
			
			
			
			//document.getElementById('resultDisplay').innerText = 'Dear '+ nameInput + ', you have scored 120 out of 200 marks.' ;
			//document.getElementById('resultDisplay').style.backgroundColor = 'green';
			} else {
				document.getElementById('resultDisplay').innerText = 'Please enter correct details to see your result !!!!'
				document.getElementById('resultDisplay').style.backgroundColor = 'red';
			}
			
 };

		
function readExcelData(inputName,inputRollNum) {

	var resultMarks ='NA'
	var resultName ='NA'
	var resultRoll ='NA'
    const token = 'ghp_9YaCXXXXXXXXXXX'; // Replace with your actual token
    const owner = 'AnkushKanrar'; // Replace with the repository owner's username
    const repo = 'DataProcess'; // Replace with your repository name
    const path = 'ResultData2.csv'; // Replace with the path to your CSV file in the repository

    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    fetch(apiUrl, {
        headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3.raw'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.text();
    })
    .then(data => {
		//alert ('data-->'+data)
		const jsonArray = csvToJson(data);
		console.log ('Name-------------->'+inputName)
		console.log ('Roll Number------->'+inputRollNum)
		//console.log (jsonArray)
         //document.getElementById('csvData').textContent = json;		 
		 //var inputName = 'Bharat' 
		 resultName = inputName.toUpperCase();
		 console.log ('Name in Upper -------------->'+resultName)
		 const transformedArray = jsonArray.map(item => {
			return {
				Name: item.Name.toUpperCase().replace(/\s+/g, ''),
				DOB: item.DOB,
				MobileNumber: item.MobileNumber,
				Marks: item.Marks,
				Remarks: 'NA'
			};
		});

			
		//console.log (transformedArray);
		 
		 const student = transformedArray.find(item => item.Name === resultName);
		 //let value;
			if (student === null || typeof student === 'undefined') {
				console.log('Value is null or undefined');
				document.getElementById('resultDisplay').innerText = 'Please enter correct details to see your result !!!!'
				document.getElementById('resultDisplay').style.backgroundColor = 'red';
			}
			else 
			{		 
				 console.log(student);
				 console.log(student.MobileNumber); 
				 resultMarks = student.Marks ;
				 console.log(student.Marks );
			
				 document.getElementById('resultDisplay').textContent =  'Dear '+ inputName + ', you have scored '+resultMarks+' out of 200 marks.' ;
				 document.getElementById('resultDisplay').style.backgroundColor = 'green';
				 //document.getElementById('resultDisplay').textContent = jsonArray.stringify(json, null, 2);
			}
    })
    .catch(error => console.error('Error fetching the CSV file:', error));
	
	
	//return resultMarks;
	
};	


function strToJson(encodedString,inputName,inputRollNum){
	// Decode a Base64 string
	const strInput = atob(encodedString);
	//console.log(strInput);

	var resultMarks ='NA'
	var resultName ='NA'
	var resultRoll ='NA'
	// Parse JSON string to array of objects
	const jsonArray = JSON.parse(strInput);

	// Output the array of objects
	//console.log(jsonArray);
		
	//console.log ('Name-------------->'+inputName)
	//console.log ('Roll Number------->'+inputRollNum)

	resultName = inputName.toUpperCase().replace(/\s+/g, '');
	console.log ('Name in Upper -------------->'+resultName);
	resultRoll = inputRollNum.toUpperCase().replace(/\s+/g, '');
	console.log ('Roll in Upper -------------->'+resultRoll);
	const transformedArray = jsonArray.map(item => {
		return {
			Name: item.Name.toUpperCase().replace(/\s+/g, ''),
			RollNumber: item.RollNumber.toUpperCase().replace(/\s+/g, ''),			
			Marks: item.Marks,
			Remarks: 'NA'
		};
	});

			
	console.log (transformedArray);
	 
	const student = transformedArray.find(item => item.Name === resultName);
	 
	 //let value;
		if (student === null || typeof student === 'undefined') {
			console.log('Value is null or undefined');
			document.getElementById('resultDisplay').innerText = 'Please enter your name exactly as it appears on your admit card !'
			document.getElementById('resultDisplay').style.backgroundColor = 'red';
		}
		else if (student.RollNumber == resultRoll)
		{		 
			 console.log(student);
			 console.log(student.RollNumber); 
			 resultMarks = student.Marks ;
			 console.log(student.Marks );
		
			 document.getElementById('resultDisplay').textContent =  'Dear '+ inputName + ', you have scored '+resultMarks+' out of 200 marks.' ;
			 document.getElementById('resultDisplay').style.backgroundColor = 'green';
			 //document.getElementById('resultDisplay').textContent = jsonArray.stringify(json, null, 2);
		}
		else 
		{
			document.getElementById('resultDisplay').innerText = 'Please enter your roll number exactly as it appears on your admit card !'
			document.getElementById('resultDisplay').style.backgroundColor = 'red';
		}
   
};

		
		

function csvToJson(csv) {
	//alert ('Incoming CSV--->'+csv)
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    const jsonData = [];
	//alert ('Incoming CSV Headers--->'+headers)
	//alert ('Incoming CSV Lines--->'+lines)
    for (let i = 1; i < lines.length; i++) {
		 if (!lines[i])
            continue
        const obj = {};
        const currentLine = lines[i].split(',');


		headers.forEach((header, index) => {
				//let cellVal   = currentLine[index].replaceAll(" ", "");;
				//let headerVal = header.split("").replaceAll(" ", "");
				if ( currentLine[index] !="") {
					//alert (cellVal)
					obj[header] = currentLine[index];
				}
			});
	   

        jsonData.push(obj);
    }

    return jsonData;
}

