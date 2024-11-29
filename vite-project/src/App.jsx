import React, { useState } from "react";
import CategoryManagement from "./Components/CategoryManagement";
import BookManagement from "./Components/BookManagement";

function App() {
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const [activePage, setActivePage] = useState("categories");

  // Hàm thêm danh mục
  const addCategory = (name) => {
    const id = Date.now();
    const newCategories = [...categories, { id, name }];
    setCategories(newCategories);

    // Lưu vào localStorage
    localStorage.setItem("categories", JSON.stringify(newCategories));
  };

  // Hàm xóa danh mục
  const deleteCategory = (id) => {
    if (books.some((book) => book.category === id)) {
      alert("Không thể xóa danh mục khi còn sách thuộc danh mục này.");
      return;
    }
    const updatedCategories = categories.filter(
      (category) => category.id !== id
    );
    setCategories(updatedCategories);

    // Lưu vào localStorage
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
  };

  // Hàm thêm sách
  const addBook = (book) => {
    const id = Date.now();
    const newBooks = [...books, { ...book, id }];
    setBooks(newBooks);

    // Lưu vào localStorage
    localStorage.setItem("books", JSON.stringify(newBooks));
  };

  // Hàm cập nhật sách
  const updateBook = (updatedBook) => {
    const updatedBooks = books.map((book) =>
      book.id === updatedBook.id ? updatedBook : book
    );
    setBooks(updatedBooks);

    // Lưu vào localStorage
    localStorage.setItem("books", JSON.stringify(updatedBooks));
  };

  // Hàm xóa sách
  const deleteBook = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);

    // Lưu vào localStorage
    localStorage.setItem("books", JSON.stringify(updatedBooks));
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-2xl font-bold">Quản lý Thư viện</h1>
      </header>

      {/* Điều hướng */}
      <nav className="bg-gray-200 p-4 flex justify-center gap-4">
        <button
          onClick={() => setActivePage("categories")}
          className={`px-4 py-2 rounded-md ${
            activePage === "categories"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          Quản lý Danh mục
        </button>
        <button
          onClick={() => setActivePage("books")}
          className={`px-4 py-2 rounded-md ${
            activePage === "books"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          Quản lý Sách
        </button>
      </nav>

      <main className="p-4">
        {/* Chỉ hiển thị phần tương ứng */}
        {activePage === "categories" && (
          <CategoryManagement
            categories={categories}
            addCategory={addCategory}
            deleteCategory={deleteCategory}
          />
        )}
        {activePage === "books" && (
          <BookManagement
            books={books}
            categories={categories}
            addBook={addBook}
            updateBook={updateBook}
            deleteBook={deleteBook}
          />
        )}
      </main>

      <footer className="bg-gray-200 text-center p-4 mt-4">
        <p>© 2024 Quản lý Thư viện. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
