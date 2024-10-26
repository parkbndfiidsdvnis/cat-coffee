
// Import necessary Firebase functions
import { auth } from "./Firebase.js"
import { createUserWithEmailAndPassword,} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

// Function to handle form submission
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Ngăn chặn form gửi đi mặc định

        // Lấy giá trị từ các input
        const email = document.getElementById('email_input').value;
        const username = document.getElementById('username_input').value;
        const password = document.getElementById('password_input').value;
        const confirmPassword = document.getElementById('confirmPassword_input').value;
        const agree = document.getElementById('agree_checkbox').checked;

        // Kiểm tra điều kiện trước khi đăng ký
        if (!agree) {
            alert("You must agree to the terms and conditions.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // Đăng ký tài khoản với Firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Đăng ký thành công
                const user = userCredential.user;
                alert("Registration successful! Redirecting to login...");
                window.location.href = './login.html';
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Error signing up:", errorCode, errorMessage);
                alert(`Error: ${errorMessage}`);
            });
    });
});