import { auth, db } from "./Firebase.js"
import { collection, query, where, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";


const booking_data = []

export async function loadBookingData() {
    const querySnapshot = await getDocs(collection(db, "booking"));
    let data = []
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        data.push({
            id: doc.id,
            ...doc.data()
        })
    });
    return data;
}

export async function loadBookingDataByCatId(catId) {
    const querySnapshot = await getDocs(collection(db, "booking"), where("catId", "==", catId));
    let data = []
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        data.push({
            id: doc.id,
            ...doc.data()
        })
    });
    return data;
}
// Đặt lịch//
export async function booking(catId, startTime, endTime) {
    try {
        // Kiểm tra thời gian đã được đặt chưa
        const q = query(
            collection(db, "booking"),
            where("startTime", "<=", endTime),
            where("endTime", ">=", startTime),
            where("catId", "==", catId)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            console.error("Thời gian này đã được đặt trước cho catId: ", catId);
            return { success: false, message: "Thời gian này đã được đặt trước!" };
        }

        // Thêm đặt chỗ mới
        const docRef = await addDoc(collection(db, "booking"), {
            catId: catId,
            startTime: startTime,
            endTime: endTime
        });
        console.log("Đặt chỗ thành công với ID: ", docRef.id);
        return { success: true, message: "Đặt lịch thành công!" }
    } catch (e) {
        console.error("Lỗi khi thêm dữ liệu: ", e);
        return { success: false, message: "Lỗi khi đặt lịch, vui lòng thử lại!" };
    }
}
// danh sách lịch đã đặt//
export async function renderBookingList() {
    const bookingList = await loadBookingData();
    const bookingContainer = document.getElementById("booking-list");
    bookingContainer.innerHTML = ""; // Reset danh sách
    if (bookingList.length === 0) {
        bookingContainer.innerHTML = "<p>Hiện chưa có lịch đặt nào.</p>";
        return;
    }

    bookingList.forEach((booking) => {
        const bookingItem = document.createElement("div");
        bookingItem.className = "booking-item";
        bookingItem.innerHTML = `
            <p><strong>Cat ID:</strong> ${booking.catId}</p>
            <p><strong>Thời gian:</strong> ${booking.startTime} - ${booking.endTime}</p>
        `;
        bookingContainer.appendChild(bookingItem);
    });
}

/**
 * Xử lý đặt lịch từ form
 */
document.getElementById("booking-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const catId = document.getElementById("cat-id").value;
    const startTime = document.getElementById("start-time").value;
    const endTime = document.getElementById("end-time").value;

    const result = await booking(catId, startTime, endTime);
    const statusMessage = document.getElementById("status-message");

    // Hiển thị thông báo trạng thái
    statusMessage.textContent = result.message;
    statusMessage.style.color = result.success ? "green" : "red";

    // Tải lại danh sách lịch đặt nếu đặt lịch thành công
    if (result.success) {
        renderBookingList();
    }
});
