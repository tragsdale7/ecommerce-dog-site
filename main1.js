let domElements = {
	alphabetContainer: document.querySelector('.browse-by-alphabet-container'),
	alphabetLetters: document.querySelectorAll('.letter'),
	breedNames: document.querySelectorAll('.breed-name')
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
									<p class='breed-name'>${dog.modifiedName}
									</p>
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
	if(e.target.classList.contains('letter')) {
		e.target.classList.add('highlight-red');
	}

	domElements.alphabetLetters.forEach( el => {
		if(e.target !== el) {
			el.classList.remove('highlight-red');
		}
	});

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