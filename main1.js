let domElements = {
	alphabetContainer: document.querySelector('.browse-by-alphabet-container'),
	alphabetLetters: document.querySelectorAll('.letter'),
	breedNames: document.querySelectorAll('.breed-name'),
	breedInput: document.getElementById('input-breed'),
	searchContainer: document.querySelector('.search-bar-container'),
	searchBtn: document.getElementById('search-btn')
}

let breedObjects = [];
let breedNames = ["Affenpinscher", "Afghan-Hound", "Akita", "Alaskan-Malamute", 
		"Basset-Hound", "Beagle", "Belgian-Malinois", "Cavalier-King-Charles-Spaniel", 
		"Chihuahua", "Dachshund", "Dalmatian", "Doberman-Pinscher", "English-Foxhound", 
		"English-Toy-Spaniel", "Field-Spaniel", "French-Bulldog", "German-Shepherd", 
		"Golden-Retriever", "Havanese", "Irish-Terrier", "Italian-Greyhound", "Jadgterrier", 
		"Jindo", "Keeshond", "Kuvasz", "Labrador-Retriever", "Lhasa-Apso", "Mastiff",
		"Mudi", "Norfolk-Terrier", "Norwegian-Buhund", "Old-English-Sheepdog",
		"Otterhound", "Parson-Russell-Terrier", "Pekingese", "Pomeranian", 
		"Rhodesian-Ridgeback", "Rottweiler", "Saint-Bernard", "Samoyed", "Shiba-Inu", 
		"Tibetan-Mastiff", "Tibetan-Terrier", "Vizsla", "Whippet", "Wire-Fox-Terrier",
		"Xoloitzcuintli", "Yorkshire-Terrier"]

function Breed(name, info = 'Lorem ipsum dolor sit amet, consectetur.') {
	this.name = name;
	this.info = info;
	this.numAvailable = this.generateNumAvailable();
	breedObjects.push(this);
}

Breed.prototype.generateNumAvailable = function() {
	return Math.ceil(Math.random() * 6);
}

Breed.prototype.addBreedToPage = function(dog) {
	// // create breed container
	let breedContainer = document.createElement('div');
	breedContainer.classList.add('breed-container');

	// remove hypens from the dog name if they exist
	if(dog.name.indexOf('-') > -1) {
		dog.modifiedName = dog.name.replace(/-/g, ' ');
	} else {
		dog.modifiedName = dog.name;
	}
	
	// build breed container html
	breedContainer.innerHTML = `
								<div class='breed-img-container'>
									<img src='./img/breeds/${dog.name}.jpg'>
								</div>

								<div class='description-container'>
									<p class='breed-name'>${dog.modifiedName}</p>
									<p class='breed-info'>
										<span>Info:</span> ${dog.info}
									</p>
									<p class='breed-available'>
										<span>Left in stock:</span> <span class='stock-num'>${dog.numAvailable}</span>
									</p>
								</div>
								 `

	// append to dog-list div
	let dogList = document.querySelector('.dog-list');
	dogList.appendChild(breedContainer);
}

breedNames.forEach( e => {
	// create a dog object
	let dog = new Breed(e);

	//add the dog breed to the webpage
	dog.addBreedToPage(dog);
});

domElements.breedNames = document.querySelectorAll('.breed-name');

// alphabet event listeners
domElements.alphabetContainer.addEventListener('click', function(e){
	// if the clicked element is a letter highlight it red
	if(e.target.classList.contains('letter')) {
		e.target.classList.add('highlight-red');
	}

	// if the letters were not clicked then remove the red highlight
	domElements.alphabetLetters.forEach( el => {
		if(e.target !== el) {
			el.classList.remove('highlight-red');
		}
	});

	// hide the dogs that dont match the chosen letter name
	domElements.breedNames.forEach( el => {
		if(e.target.classList.contains('letter')) {
			if(e.target.textContent == el.textContent.charAt(0)) {
				el.parentNode.parentNode.classList.remove('hide');
			} else {
				el.parentNode.parentNode.classList.add('hide');
			}
		}
	});
});


// breed search code
domElements.breedInput.addEventListener('keyup', function(e) {
	let matchingBreeds = getMatchingBreeds(this.value);
	displayMatchingBreeds(matchingBreeds);
});

function getMatchingBreeds(input) {
	// initialie matching breeds array
	let matchingBreeds = [];

	// convert breed names to lower case and remove hyphens for validation purposes
	let modifiedBreedNames = breedNames.map( e => {
		e = e.toLowerCase();
		e = e.replace(/-/g, ' ');
		return e;
	});

	// check if the input value matches any breed names and if so add them to array
	modifiedBreedNames.forEach( e => {
		if(e.indexOf(input) === 0) {
			matchingBreeds.push(e);
		}
	});

	//return matchingBreeds array
	return matchingBreeds;
}

function displayMatchingBreeds(breedsArray) {
	let resultsContainerCheck = document.querySelector('.results-container');
	let resultsContainer;

	if(resultsContainerCheck) {
		domElements.searchContainer.removeChild(resultsContainerCheck);
	}

	if(breedsArray.length > 0) {
		//create the results div container
		resultsContainer = document.createElement('div');
		resultsContainer.classList.add('results-container');

		for(let i = 0; i < breedsArray.length; i++) {
			// create the matching breed element
			let matchContainer = document.createElement('div');
			matchContainer.classList.add('match-container');
			matchContainer.innerHTML = `${breedsArray[i]}`;

			// attach event listener
			matchContainer.addEventListener('click', updateSearchInput)

			// append the match to the results container
			resultsContainer.appendChild(matchContainer);

			// append the results container to search bar container
			domElements.searchContainer.appendChild(resultsContainer);
		}
	}

	function updateSearchInput(e) {
		// store clicked breed in variable
		let breedName = e.target.textContent;

		// update input value with breed
		domElements.breedInput.value = breedName;

		// put focus back on input
		domElements.breedInput.focus();

		// remove the results container
		resultsContainer.remove();
	}
}

// search event listener
domElements.searchBtn.addEventListener('click', showBreed);

function showBreed(e) {
	// prevent form from submitting
	e.preventDefault();

	// grab the input value
	let input = domElements.breedInput.value;
	
	// hide all the other breeds and only display the inputted one
	domElements.breedNames.forEach(e => {
		if(e.textContent.toUpperCase() == input.toUpperCase()) {
			e.parentNode.parentNode.classList.remove('hide');
			e.parentNode.parentNode.scrollIntoView();
		} else {
			e.parentNode.parentNode.classList.add('hide');
		}
	})
}


window.addEventListener('keyup', e => {
	console.log(e.key)
})