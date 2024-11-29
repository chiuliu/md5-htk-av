// import React, { useState } from "react";
// import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";

// const CategoryManagement = ({ categories, addCategory, deleteCategory }) => {
//   const [newCategory, setNewCategory] = useState("");
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [deletingId, setDeletingId] = useState(null);

//   const handleAddCategory = () => {
//     if (!newCategory.trim()) {
//       alert("Tên danh mục không được để trống.");
//       return;
//     }
//     addCategory(newCategory);
//     setNewCategory("");
//   };

//   const handleDeleteCategory = (id) => {
//     setDeletingId(id);
//     setIsDeleting(true);
//   };

//   const confirmDelete = () => {
//     deleteCategory(deletingId);
//     setIsDeleting(false);
//     setDeletingId(null);
//   };

//   const cancelDelete = () => {
//     setIsDeleting(false);
//     setDeletingId(null);
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Quản lý Danh mục</h2>

//       <div className="flex gap-2 mb-4">
//         <input
//           type="text"
//           className="border border-gray-300 rounded-md p-2 w-full"
//           placeholder="Thêm danh mục mới"
//           value={newCategory}
//           onChange={(e) => setNewCategory(e.target.value)}
//         />
//         <button
//           onClick={handleAddCategory}
//           className="bg-blue-500 text-white p-2 rounded-md flex items-center gap-1"
//         >
//           <AiOutlinePlus /> Thêm
//         </button>
//       </div>

//       <table className="w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border border-gray-300 p-2">ID</th>
//             <th className="border border-gray-300 p-2">Tên Danh mục</th>
//             <th className="border border-gray-300 p-2">Hành động</th>
//           </tr>
//         </thead>
//         <tbody>
//           {categories.map((category) => (
//             <tr key={category.id} className="hover:bg-gray-100">
//               <td className="border border-gray-300 p-2">{category.id}</td>
//               <td className="border border-gray-300 p-2">{category.name}</td>
//               <td className="border border-gray-300 p-2">
//                 <button
//                   onClick={() => handleDeleteCategory(category.id)}
//                   className="text-red-500 flex items-center gap-1"
//                 >
//                   <AiOutlineDelete /> Xóa
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Xác nhận xóa */}
//       {isDeleting && (
//         <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
//           <div className="bg-white p-6 rounded-md shadow-md">
//             <h3 className="text-lg font-semibold">Xác nhận xóa danh mục</h3>
//             <p>Bạn có chắc chắn muốn xóa danh mục này?</p>
//             <div className="mt-4 flex gap-4">
//               <button
//                 onClick={confirmDelete}
//                 className="bg-red-500 text-white px-4 py-2 rounded-md"
//               >
//                 Xóa
//               </button>
//               <button
//                 onClick={cancelDelete}
//                 className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
//               >
//                 Hủy
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CategoryManagement;

import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";

const CategoryManagement = ({
  categories,
  addCategory,
  deleteCategory,
  books,
}) => {
  const [newCategory, setNewCategory] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      alert("Tên danh mục không được để trống.");
      return;
    }
    addCategory(newCategory); // Thêm danh mục mới
    setNewCategory("");
  };

  const handleDeleteCategory = (id) => {
    // Kiểm tra xem danh mục có sách nào không
    const booksInCategory = books.filter((book) => book.category === id);
    if (booksInCategory.length > 0) {
      alert("Không thể xóa danh mục này vì có sách thuộc danh mục.");
      return;
    }
    setDeletingId(id);
    setIsDeleting(true);
  };

  const confirmDelete = () => {
    deleteCategory(deletingId); // Xóa danh mục
    setIsDeleting(false);
    setDeletingId(null);
  };

  const cancelDelete = () => {
    setIsDeleting(false);
    setDeletingId(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Quản lý Danh mục</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border border-gray-300 rounded-md p-2 w-full"
          placeholder="Thêm danh mục mới"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button
          onClick={handleAddCategory}
          className="bg-blue-500 text-white p-2 rounded-md flex items-center gap-1"
        >
          <AiOutlinePlus /> Thêm
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Tên Danh mục</th>
            <th className="border border-gray-300 p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{category.id}</td>
              <td className="border border-gray-300 p-2">{category.name}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="text-red-500 flex items-center gap-1"
                >
                  <AiOutlineDelete /> Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Xác nhận xóa */}
      {isDeleting && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-lg font-semibold">Xác nhận xóa danh mục</h3>
            <p>Bạn có chắc chắn muốn xóa danh mục này?</p>
            <div className="mt-4 flex gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Xóa
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;
