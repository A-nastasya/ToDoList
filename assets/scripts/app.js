class Card {
  finishCard(event) {
    console.log("FINISH");
    const actionButton = event.currentTarget;
    const finishedProjects = document.querySelector("#finished-projects ul");
    actionButton.innerText = "Activate";
    const card = actionButton.parentNode;
    actionButton.removeEventListener("click", (event) =>
      this.newCard.finishCard(event)
    );
    actionButton.addEventListener("click", (event) => this.activateCard(event));
    finishedProjects.appendChild(card);
  }

  activateCard(event) {
    console.log("ACTIVATE");
    const actionButton = event.currentTarget;
    const activeProjects = document.querySelector("#active-projects ul");
    actionButton.innerText = "Finish";
    const card = actionButton.parentNode;
    actionButton.removeEventListener("click", (event) =>
      this.newCard.activateCard(event)
    );
    actionButton.addEventListener("click", (event) => this.finishCard(event));
    activeProjects.appendChild(card);
  }

  dragStart(event) {
    event.dataTransfer.setData("application/my-app", event.target.id);
    event.dataTransfer.effectAllowed = "move";
  }

  showMoreInfo(event) {
    const target = event.currentTarget;
    const dataExtraInfo = target.parentElement.dataset.extraInfo;
    const coords = target.getBoundingClientRect();
    const modal = new MoreInfoModal(dataExtraInfo).positionModal(coords);
  }
}
class MoreInfoModal {
  constructor(dataExtraInfo) {
    this.message = `${dataExtraInfo}`;
    this.render();
    this.moreInfoModal.style.cssText = "position:absolute; font-weight:bold";
  }

  closeModal() {
    const element = this.moreInfoModal;
    element.parentNode.removeChild(element);
  }
  positionModal(coords) {
    const scroll = {
      bottom: coords.bottom + pageYOffset,
      left: coords.left + pageXOffset,
    };
    this.moreInfoModal.style.left = scroll.left + "px";
    this.moreInfoModal.style.top = scroll.bottom + "px";
  }

  render() {
    this.moreInfoModal = document.createElement("div");
    this.moreInfoModal.className = "more-info-modal";
    this.moreInfoModal.innerHTML = `
			<p>${this.message}</p>
    `;
    this.moreInfoModal.addEventListener("click", this.closeModal.bind(this));
    document.querySelector(".card").parentElement.append(this.moreInfoModal);
  }
}

class App {
  static init() {
    this.newCard = new Card();

    const projects = document.querySelectorAll(".card");
    projects.forEach((item) => {
      item.addEventListener("dragstart", (event) =>
        this.newCard.dragStart(event)
      );
    });
    const body = document.querySelector("body");

    body.addEventListener("dragover", (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      if (event.target.tagName === "UL") {
        event.target.classList.add("dragndrop");
      }
    });
    body.addEventListener("dragleave", (event) => {
      event.preventDefault();
      event.target.classList.remove("dragndrop");
    });
    body.addEventListener("drop", (event) => {
      event.preventDefault();
      const data = event.dataTransfer.getData("application/my-app");
      if (event.target.tagName === "UL") {
        event.target.appendChild(document.getElementById(data));
      }
      event.target.classList.remove("dragndrop");
    });

    const projectList = document.querySelectorAll(".alt");
    projectList.forEach((moreInfoBtn) => {
      moreInfoBtn.addEventListener("click", (event) =>
        this.newCard.showMoreInfo(event)
      );
    });

    const activeProjectCollection = document.querySelectorAll(
      "#active-projects .card"
    );
    activeProjectCollection.forEach((item) => {
      item.lastElementChild.addEventListener("click", (event) =>
        this.newCard.finishCard(event)
      );
    });

    const finishedProjectCollection = document.querySelectorAll(
      "#finished-projects .card"
    );
    finishedProjectCollection.forEach((item) => {
      item.lastElementChild.addEventListener("click", (event) =>
        this.newCard.activateCard(event)
      );
    });
  }
}
App.init();
