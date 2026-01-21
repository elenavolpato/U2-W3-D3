const booksURL = "https://striveschool-api.herokuapp.com/books";
const bookCardsContainerEl = document.getElementById("cards-container");

const getData = function () {
  fetch(booksURL)
    .then((res) => res.json())

    .then((arrayOfBooks) => {
      for (let book of arrayOfBooks) {
        bookCardsContainerEl.innerHTML += `
        <div class="col-4 mb-4" id="${book.asin}">
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

      bookCardsContainerEl.addEventListener("click", function (e) {
        //only deletes if the the click is on the button
        if (e.target.classList.contains("discard-btn")) {
          e.preventDefault();
          e.target.parentElement.parentElement.parentElement.parentElement.remove();
        }
        // Add to cart button
        if (e.target.classList.contains("add-to-cart")) {
          e.preventDefault();
          const cardDiv = e.target.parentElement.parentElement.parentElement;
          const title = cardDiv.querySelector(".card-title").textContent;
          const price = parseFloat(cardDiv.querySelector(".card-text").textContent.replace("€", ""));
          const id = cardDiv.parentElement.id;
          console.log(cardDiv.parentElement.id);

          addToCart(title, price, id);
        }
      });
    })
    .catch((err) => {
      console.log("error", err);
    });
};
getData();

const cart = [];

const addToCart = (bookName, bookPrice, bookId) => {
  let addedBook = {
    title: bookName,
    price: bookPrice,
    id: bookId,
  };
  cart.push(addedBook);

  const cardList = document.getElementById("card-list");

  //adds a line with the total price of the cart
  let sumPrice = cart.reduce((acc, book) => acc + parseFloat(book.price), 0);
  let totalPriceEl = document.getElementById("total-price");

  if (!totalPriceEl) {
    totalPriceEl = document.createElement("div");
    totalPriceEl.id = "total-price";
    totalPriceEl.classList = "fw-bold border-bottom px-2 pt-2";
    cardList.appendChild(totalPriceEl);
  }
  totalPriceEl.innerHTML = `<p>Total: € ${sumPrice}</p>`;
  cardList.innerHTML += `
    <div class="d-flex justify-content-between border-bottom px-2 pt-2"> 
        <p>${bookName}</p> 
        <p>€ ${bookPrice}</p> 
    </div>`;
};
