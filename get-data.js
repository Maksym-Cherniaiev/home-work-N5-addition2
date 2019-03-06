document.querySelector(".main-container__get-data").addEventListener("click", loadData);
let offset = 0,
    elementQuantity = 4;

class UserInfoParams {
  constructor() {
  	this.mainContainer = document.querySelector(".main-container");
  	this.currentHeight = this.mainContainer.getBoundingClientRect().height;
  	this.userDataConteiner = document.querySelector(".main-container__user-data-container");
  	this.widthCounter = 0;
  	this.stretchedHeight = this.currentHeight + 240;
  	this.incrementHeigth();
  }

  stretchMainContainer(height) {
  	if (this.currentHeight < height) {
  	  this.currentHeight = this.currentHeight + this.widthCounter;
  	  this.mainContainer.style.height = `${this.currentHeight}px`;
  	  this.widthCounter++;
  	} else if (this.currentHeight >= height) {
  		clearInterval(this.repeatStretch);
  	}
  }

  incrementHeigth() {
  	this.repeatStretch = setInterval(() => this.stretchMainContainer(this.stretchedHeight), 30);
  }
}

//========================================================================================================

class CreatePageElements extends UserInfoParams {
  constructor() {
    super();
    this.timeInterval = 200;
    this.address = "https://jsonplaceholder.typicode.com/posts";
    this.getUserData();
  }

  getUserData() {
    fetch(this.address)
      .then(response => response.json())
      .then(data => {
        this.dataHendler(data);
      });
  }

  dataHendler(arr) {
    this.elements = arr.splice(offset, elementQuantity);
    setTimeout(() => { this.elements.forEach(element => {
      setTimeout(() => {
        this.createElementOnPage(element)
      }, this.timeInterval);
      this.timeInterval = this.timeInterval + 200;
    }, 1000)});
    offset = offset + elementQuantity;
  }

  createElementOnPage(object) {
	  this.userDataElement = document.createElement("li");
	  this.userDataElement.classList.add("user-data__element");
	  this.userTitle = document.createElement("span");
	  this.userTitle.textContent = object.title;
	  this.userDataElement.appendChild(this.userTitle);
	  this.userDataConteiner.appendChild(this.userDataElement);
    this.userDataElement.getBoundingClientRect();
	  this.userDataElement.classList.add("user-data__element--visible");
  }
}

function loadData() {
  let modifyHeight = new UserInfoParams();
  let newData = new CreatePageElements();
}