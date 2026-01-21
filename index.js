const booksURL = "https://striveschool-api.herokuapp.com/books";

const getData = function () {
  fetch(booksURL)
    .then((res) => res.json())

    .then((arrayOfBooks) => {
      const bookCardsContainerEl = document.getElementById("cards-container");
      for (let book of arrayOfBooks) {
        console.log(book);
        bookCardsContainerEl.innerHTML += `
        <div class="col-4 mb-4">
          <div class="card h-100">
          <img class="card-img-top" src="${book.img}" alt="book cover" />
            <div class="card-body">
              <h5 class="card-title">${book.title}</h5>
              <p class="card-text">${book.price}</p>
              <a href="#" class="btn btn-danger" id="discard-btn">Discard</a>
            </div>
             </div>
        </div>`;
      }
    })
    .catch((err) => {
      console.log("error", err);
    });
};
getData();
