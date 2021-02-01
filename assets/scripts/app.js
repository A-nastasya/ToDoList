class Card {
  static finishCard(event) {
    console.log("FINISH");
    const actionButton = event.currentTarget
    const finishedProjects = document.querySelector("#finished-projects ul");
    actionButton.innerText = "Activate";
    const card = actionButton.parentNode;
    actionButton.removeEventListener("click", (event) =>
      Card.finishCard(event)
    );
    actionButton.addEventListener("click", (event) =>
      Card.activateCard(event)
    );
    finishedProjects.appendChild(card);
  }

  static activateCard(event) {
    const actionButton = event.currentTarget
    const activeProjects = document.querySelector("#active-projects ul");
    actionButton.innerText = "Finish";
    const card = actionButton.parentNode;
    actionButton.removeEventListener("click", (event) =>
      Card.activateCard(event)
    );
    actionButton.addEventListener("click", (event) =>
      Card.finishCard(event)
    );
    activeProjects.appendChild(card);
  }

  static showMoreInfo(event) {
    const target = event.currentTarget;
    const name = target.parentElement.firstElementChild.innerHTML;
    this.modal = new MoreInfoModal(name);
    document
      .getElementById("main-header")
      .parentElement.append(this.modal.render());
  }
}

class MoreInfoModal {
  constructor(name) {
    this.message = `I don't want to ${name.toLowerCase()}`;
    this.cardName = name.toLowerCase().replace(" ", "-");
  }

  closeModal() {
    const element = document.getElementById(`modal-${this.cardName}`);
    element.parentNode.removeChild(element);
  }

  render() {
    const moreInfoModal = document.createElement("div");
    moreInfoModal.className = "more-info-modal";
    moreInfoModal.id = `modal-${this.cardName}`;
    moreInfoModal.innerHTML = `
			<h2>${this.message}</h2>
    `;
    moreInfoModal.addEventListener("click", this.closeModal.bind(this));
    return moreInfoModal;
  }
}

class App {
  static init() {
    const projectList = document.getElementsByClassName("alt");
    const array = [...projectList];
    array.forEach((item) => {
      item.addEventListener("click", (event) => Card.showMoreInfo(event));
    });
    const activeProjectCollection = document.querySelectorAll(
      "#active-projects .card"
    );
    activeProjectCollection.forEach((item) => {
      item.lastElementChild.addEventListener("click", (event) =>
        Card.finishCard(event)
      );
    });
    const finishedProjectCollection = document.querySelectorAll(
      "#finished-projects .card"
    );
    finishedProjectCollection.forEach((item) => {
      item.lastElementChild.addEventListener("click", (event) =>
        Card.activateCard(event)
      );
    });
  }
}
App.init();
