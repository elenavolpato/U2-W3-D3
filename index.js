const booksURL = "https://striveschool-api.herokuapp.com/books";
const bookCardsContainerEl = document.getElementById("cards-container");
const getData = function () {
  fetch(booksURL)
    .then((res) => res.json())

    .then((arrayOfBooks) => {
      for (let book of arrayOfBooks) {
        bookCardsContainerEl.innerHTML += `
        <div class="col-4 mb-4">
          <div class="card h-100">
          <img class="card-img-top" src="${book.img}" alt="book cover" />
            <div class="card-body d-flex flex-column justify-content-between">
              <h5 class="card-title">${book.title}</h5>
              <p class="card-text">€ ${book.price}</p>
              <div class="d-flex gap-1 justify-content-evenly">
                <button class="btn btn-danger discard-btn">Discard</button>
                <button class="btn btn-primary add-to-cart">Add to cart</button>
              </div>
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
    if (e.target.classList.contains("add-to-cart")) {
      e.preventDefault();
      console.log(e.target);
    }
  });
};
getData();

const addToCart = () => {
  if (e.target.classList.contains("add-to-cart")) {
    e.preventDefault();
    console.log(e.target);
  }
};
