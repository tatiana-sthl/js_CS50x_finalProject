window.onload = () => 
{

  //represent book
  class Book 
  {
    constructor(title, author, rating) 
    {
      this.title = title;
      this.author = author;
      this.rating = rating;
    }
  }

  //UI change
  class UI 
  {
    static displayBook() 
    {
      const storedBooks = Store.getBooks();
      const books = storedBooks;
      books.map(book => UI.addBookToList(book));
    }
    
    static addBookToList(book) 
    {
      const list = document.getElementById("book-list");
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.rating}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;
      list.appendChild(row);
    }

    static clearInputFields() 
    {
      document.getElementById("title").value = "";
      document.getElementById("author").value = "";
      document.getElementById("rating").value = "";
    }

    static removeBook(el) 
    {
      if (el.classList.contains("delete")) 
      {
        el.parentNode.parentNode.remove();
      }
    }

    static showAlert(message, className) 
    {
      const div = document.createElement("div");
      div.className = `alert alert-${className}`;
      div.innerHTML = message;

      const container = document.querySelector(".container");
      const form = document.getElementById("book-form");
      container.insertBefore(div, form);

      setTimeout(() => div.remove(), 5000);
    }
  }

  //local storage
  class Store 
  {
    static getBooks() 
    {
      let books;
      if (localStorage.getItem("books") == null) 
      {
        books = [];
      } 
      else 
      {
        books = JSON.parse(localStorage.getItem("books"));
      }

      return books;
    }
    static addBooks(book) 
    {
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem("books", JSON.stringify(books));
    }
    static removeBooks(rating) 
    {
      const books = Store.getBooks();
      books.forEach((book, index) => 
      {
        if (book.rating == rating) 
        {
          books.splice(index, 1);
        }
      });
      localStorage.setItem("books", JSON.stringify(books));
    }
  }


  document.addEventListener("load", UI.displayBook());

  //submit form
  document.getElementById("book-form").addEventListener("submit", e => 
  {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const rating = document.getElementById("rating").value;


    if (title == "" || author == "" || rating == "") 
    {
      UI.showAlert("Missing information", "danger");
    } 
    else 
    {
      const book = new Book(title, author, rating);

      UI.addBookToList(book);

      Store.addBooks(book);

      UI.showAlert("Book on the shelf", "success");


      UI.clearInputFields();
    }
  });

  //delete book
  document.getElementById("book-list").addEventListener("click", e => 
  {

    UI.removeBook(e.target);

    Store.removeBooks(e.target.parentNode.previousElementSibling.innerHTML);

    UI.showAlert("Book removed from shelf", "success");
  });
  
  //search bar
  (function() {
	  'use strict';
	  var TableFilter = (function() {
	    var Arr = Array.prototype;
	    var input;
	    
	    function onInputEvent(e) {
			  input = e.target;
			  var table1 = document.getElementsByClassName(input.getAttribute('data-table'));
			  Arr.forEach.call(table1, function(table) {
				  Arr.forEach.call(table.tBodies, function(tbody) {
					  Arr.forEach.call(tbody.rows, filter);
				  });
			  });
		  }

		  function filter(row) {
			  var text = row.textContent.toLowerCase();
        var val = input.value.toLowerCase();
			  row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
		  }

		return {
			init: function() {
				var inputs = document.getElementsByClassName('table-filter');
				Arr.forEach.call(inputs, function(input) {
					input.oninput = onInputEvent;
				});
			}
		};
 
	})();

  TableFilter.init(); 
  })();
};