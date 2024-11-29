import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const BookManagement = ({
  books,
  categories,
  addBook,
  updateBook,
  deleteBook,
}) => {
  const [editingBook, setEditingBook] = useState(null); // Quản lý sách đang được chỉnh sửa
  const [bookForm, setBookForm] = useState({
    name: "",
    author: "",
    price: "",
    category: "",
    image: null,
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBookForm({ ...bookForm, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddOrUpdateBook = () => {
    const { name, author, price, category, image } = bookForm;

    // Kiểm tra thông tin đầu vào
    if (!name || !author || !price || !category) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (!image) {
      alert("Vui lòng upload hình ảnh cho sách.");
      return;
    }

    if (editingBook) {
      // Cập nhật sách
      updateBook({ ...bookForm, id: editingBook.id });
      setEditingBook(null); // Kết thúc chế độ sửa
    } else {
      // Thêm mới sách
      addBook(bookForm);
    }

    // Reset form
    setBookForm({ name: "", author: "", price: "", category: "", image: null });
    document.getElementById("fileInput").value = ""; // Reset file input
  };

  const handleEditBook = (book) => {
    setEditingBook(book); // Bật chế độ sửa
    setBookForm(book); // Đổ dữ liệu sách vào form
  };

  const handleCancelEdit = () => {
    setEditingBook(null); // Thoát chế độ sửa
    setBookForm({ name: "", author: "", price: "", category: "", image: null });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Quản lý Sách</h2>

      {/* Form thêm/sửa sách */}
      <form className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          className="border border-gray-300 rounded-md p-2"
          placeholder="Tên sách"
          value={bookForm.name}
          onChange={(e) => setBookForm({ ...bookForm, name: e.target.value })}
        />
        <input
          type="text"
          className="border border-gray-300 rounded-md p-2"
          placeholder="Tác giả"
          value={bookForm.author}
          onChange={(e) => setBookForm({ ...bookForm, author: e.target.value })}
        />
        <input
          type="number"
          className="border border-gray-300 rounded-md p-2"
          placeholder="Giá"
          value={bookForm.price}
          onChange={(e) => setBookForm({ ...bookForm, price: e.target.value })}
        />
        <select
          className="border border-gray-300 rounded-md p-2"
          value={bookForm.category}
          onChange={(e) =>
            setBookForm({ ...bookForm, category: e.target.value })
          }
        >
          <option value="">Chọn danh mục</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <div className="col-span-2">
          <input
            id="fileInput"
            type="file"
            className="border border-gray-300 rounded-md p-2"
            onChange={handleFileChange}
          />
          {/* Hiển thị ảnh đã chọn */}
          {bookForm.image && (
            <div className="mt-2">
              <img
                src={bookForm.image}
                alt="Preview"
                className="w-32 h-32 object-cover"
              />
            </div>
          )}
        </div>
        <div className="col-span-2 flex gap-2">
          <button
            type="button"
            onClick={handleAddOrUpdateBook}
            className={`p-2 rounded-md flex items-center gap-1 ${
              editingBook
                ? "bg-yellow-500 text-white"
                : "bg-green-500 text-white"
            }`}
          >
            {editingBook ? <AiOutlineEdit /> : <AiOutlinePlus />}
            {editingBook ? "Lưu thay đổi" : "Thêm Sách"}
          </button>
          {editingBook && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-500 text-white p-2 rounded-md"
            >
              Hủy
            </button>
          )}
        </div>
      </form>

      {/* Hiển thị danh sách sách */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Tên sách</th>
            <th className="border border-gray-300 p-2">Tác giả</th>
            <th className="border border-gray-300 p-2">Danh mục</th>
            <th className="border border-gray-300 p-2">Giá</th>
            <th className="border border-gray-300 p-2">Hình ảnh</th>
            <th className="border border-gray-300 p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{book.id}</td>
              <td className="border border-gray-300 p-2">{book.name}</td>
              <td className="border border-gray-300 p-2">{book.author}</td>
              <td className="border border-gray-300 p-2">
                {categories.find((category) => category.id === book.category)
                  ?.name || "Không rõ"}
              </td>
              <td className="border border-gray-300 p-2">{book.price}</td>
              <td className="border border-gray-300 p-2">
                <img
                  src={book.image}
                  alt={book.name}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleEditBook(book)}
                  className="text-yellow-500 flex items-center gap-1 mr-2"
                >
                  <AiOutlineEdit /> Sửa
                </button>
                <button
                  onClick={() => deleteBook(book.id)}
                  className="text-red-500 flex items-center gap-1"
                >
                  <AiOutlineDelete /> Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookManagement;
