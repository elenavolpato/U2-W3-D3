const booksURL = "https://striveschool-api.herokuapp.com/books";
const bookCardsContainerEl = document.getElementById("cards-container");
const getData = function () {
  fetch(booksURL)
    .then((res) => res.json())

    .then((arrayOfBooks) => {
      for (let book of arrayOfBooks) {
        bookCardsContainerEl.innerHTML += `
        <div class="col-3 mb-4">
          <div class="card h-100">
          <img class="card-img-top" src="${book.img}" alt="book cover" />
            <div class="card-body">
              <h5 class="card-title">${book.title}</h5>
              <p class="card-text">${book.price}</p>
              <a href="#" class="btn btn-danger discard-btn">Discard</a>
            </div>
             </div>
        </div>`;
      }
    })
    .catch((err) => {
      console.log("error", err);
    });

  bookCardsContainerEl.addEventListener("click", function (e) {
    //only deletes if the the click is on the button
    if (e.target.classList.contains("discard-btn")) {
      e.preventDefault();
      e.target.parentElement.parentElement.parentElement.remove();
    }
  });
};
getData();
