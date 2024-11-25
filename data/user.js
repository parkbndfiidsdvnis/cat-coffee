// =============================================================================
// ==================== Xử lý hiển thị thông tin người dùng ====================
// =============================================================================
import {onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { auth } from "../javsscript/Firebase.js";

// Nếu đã đăng nhập thì hiển thị thông tin người dùng
onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      document.getElementById('user-profile').innerHTML = `
          <input id="search-query" class="form-control me-2" type="search" placeholder="Movie Name..." aria-label="Search">
          <button id="search-button" class="btn btn-outline-success text-nowrap me-4" type="submit">Search</button>
  
          <p class="text-nowrap m-0 me-3 text-white">Hello, ${user.email}</p>
          <button class="btn btn-primary text-nowrap me-2" type="button" onclick="logout()">
              <a class="nav-link" href="./login.html">Log out</a>
          </button>
          `
    } else {
        document.getElementById('user-profile').innerHTML = `
        <div class="search-cart">
                    <input type="text" placeholder="Search...">
                    <a href="#"><img src="../image/icons8-cat-footprint-48.png" alt="Cart Icon"></a>
                </div>  
            <div id="user-profile" class="login-signup">  
                    <a href="login.html" class="btn-login">Đăng nhập</a>
                    <a href="sign-up.html" class="btn-signup">Đăng ký</a>
                </div>
            </nav>  
        `
    }
  });

// Khi đăng xuất thì xóa thông tin người dùng trong Local Storage
function logout() {
    localStorage.removeItem('loggedUser');
}
//Xử lí tìm kiếm tên phim //
let searchButton = document.getElementById('search-button');
let searchQuery = document.getElementById('search-query');

// searchButton.addEventListener('click', () => {
//     // Lấy giá trị ô input
//     let query = searchQuery.value.trim().toLowerCase();
//     // Lưu giá trị search vào local storage
//     localStorage.setItem('searchQuery', query);
//     // Chuyển hướng sang trang search html//
//     window.location.href = '../html/search.html';
// });