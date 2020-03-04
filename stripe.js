// function Stripe(apiKey, username) {
//   this.apiKey = apiKey
//   this.username = username
//   this.elements = []
//
//   this.elements = function () {
//   }
//
//   this.addElement = function (element) {
//
//   }
//
// }

class Stripe {
  constructor(apiKey, name) {
    this.name = name;
    this.apiKey = apiKey;
    this.elements = [];
  }
  addElements(element) {
    this.elements.push(element)
  }
  removeElements(element) {
    const i = this.elements.indexOf(element)
    this.elements.splice(i)
  }
  getElements() {
    return this.elements;
  }
}