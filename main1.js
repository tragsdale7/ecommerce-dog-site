
let data;
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
	if(xhr.readyState == XMLHttpRequest.DONE) {
		console.log(xhr.responseText)
		let json = xhr.responseText;
		data = JSON.parse(json);

		console.log(data.message);

		for (var property in data.message) {
		    if (data.message.hasOwnProperty(property)) {
		       console.log(property);
		    }
		}	
	}
}

xhr.open('GET', 'https://dog.ceo/api/breeds/list/all', true);
xhr.send(null);






