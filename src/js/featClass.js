export class featEvent {
  constructor(name, date, description, image_url, id) {
    this.name = name;
    this.date = date;
    this.description = description;
    this.image_url = image_url;
    this.id = id;
    // this.regBtn = regBtn;

    this.refreshEvent();
    this.register();
  }
  refreshEvent() {
    this.container = document.createElement("div");
    this.container.innerHTML = `<div class="card__featured">
          <img src="${this.image_url}" alt="Picture" class="card__image" /><div class="card__featured--text">
          <h2>${this.name}</h2>
          <p>${this.description}</p>
          <button type="submit" class="button button__register">
            Register
          </button></div>`;
  }
  register() {
    const modal = document.querySelector(".modal");
    console.log(modal);

    // Get the button that opens the modal
    const btn = this.container.querySelector(".button__register");
    console.log(btn);

    // Get the <span> element that closes the modal
    const close = document.querySelector(".close");
    console.log(close);

    // When the user clicks on the button, open the modal
    btn.addEventListener("click", () => {
      console.log("clicked the button register");
      modal.style.display = "block";
      const regHeader = document.querySelector(".form__heading");
      regHeader.textContent = this.name;
    });

    // When the user clicks on <span> (x), close the modal
    close.addEventListener("click", () => {
      console.log("clicked the button close");
      modal.style.display = "none";
    });

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };

    const nameInput = document.getElementById("name");
    const surnameInput = document.getElementById("surname");
    const emailInput = document.getElementById("mail");

    const submit = document.querySelector(".submit");

    submit.addEventListener("click", async (e) => {
      e.preventDefault();
      const url = `https://test-api.codingbootcamp.cz/api/65d16700/events/${this.id}/registrations`;
      const myDataObject = {
        name: nameInput.value,
        surname: surnameInput.value,
        email: emailInput.value,
      };

      const myResponse = await fetch(url, {
        method: "POST",
        body: JSON.stringify(myDataObject),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const myUsableResponse = await myResponse.json();
      console.log(myUsableResponse);
      const form = document.querySelector("form");
      const regSuccess = document.createElement("h3");
      regSuccess.textContent = "Registered!";
      if (myUsableResponse.status == "success") {
        submit.style.display = "none";
        form.appendChild(regSuccess);
      }
    });
  }
}
