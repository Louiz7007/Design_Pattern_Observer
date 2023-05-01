let subject;
let observerList = [];

function createSubject() {
  subject = new Subject();
}

function createObserver() {
  observerList.push(
    new Observer(document.getElementById("inputObserverName").value)
  );
}

class Subject {
  constructor() {
    this.frame = document.createElement("div");
    this.frame.classList.add("subject");

    this.image = document.createElement("img");
    this.image.src =
      "https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$";
    this.image.alt = "PS5 - Bild";
    this.image.style.width = "15vw";

    this.element = document.createElement("h1");
    this.element.innerHTML = "Nicht verfügbar";

    this.changeButton = document.createElement("button");
    this.changeButton.innerHTML = "Verfügbarkeit ändern";

    this.frame.appendChild(this.image);
    this.frame.appendChild(this.element);
    this.frame.appendChild(this.changeButton);

    document.body.appendChild(this.frame);

    this.changeButton.addEventListener("click", () => {
      if (this.element.innerHTML === "Verfügbar") {
        this.element.innerHTML = "nicht Verfügbar";
      } else {
        this.element.innerHTML = "Verfügbar";
      }
      this.notifyObservers(this.element.innerHTML);
    });

    this.observerList = [];
  }

  addObserver = (observer) => {
    this.observerList.push(observer);
  };

  removeObserver = (observer) => {
    for (let i = 0; i < this.observerList.length; i++) {
      if (observer.name === this.observerList[i].name) {
        this.observerList.splice(i, 1);
      }
    }
  };

  notifyObservers = (info) => {
    for (let observer of this.observerList) {
      observer.updateStatus(info);
    }
  };
}

class Observer {
  constructor(name) {
    this.name = name;
    this.frame = document.createElement("div");
    this.frame.classList.add("observer");
    this.element = document.createElement("h2");
    this.element.innerHTML = name;

    this.status = document.createElement("p");
    this.status.innerHTML = "Status unbekannt";

    this.aktualisierenButton = document.createElement("button");
    this.aktualisierenButton.innerHTML = "Aktualisieren";

    this.subscribeButton = document.createElement("button");
    this.subscribeButton.innerHTML = "Subjekt abonnieren";

    this.unsubscribeButton = document.createElement("button");
    this.unsubscribeButton.innerHTML = "Subjekt deabonnieren";

    this.frame.appendChild(this.element);
    this.frame.appendChild(this.status);
    this.frame.appendChild(this.aktualisierenButton);
    this.frame.appendChild(this.subscribeButton);
    this.frame.appendChild(this.unsubscribeButton);

    document.body.appendChild(this.frame);
    this.aktualisierenButton.addEventListener("click", () => {
      this.status.innerHTML = subject.element.innerHTML;
    });

    this.subscribeButton.addEventListener("click", () => {
      subject.addObserver(this);
    });

    this.unsubscribeButton.addEventListener("click", () => {
      subject.removeObserver(this);
    });
  }

  updateStatus = (info) => {
    this.status.innerHTML = info;
  };
}
