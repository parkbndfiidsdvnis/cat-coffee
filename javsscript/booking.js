export async function loadBookingData() {
    const querySnapshot = await getDocs(collection(db, "booking")); // Lấy dữ liệu từ Firestore
    let data = [];
    querySnapshot.forEach((doc) => {
        data.push({
            id: doc.id,
            ...doc.data() // Lấy tất cả dữ liệu trong từng document
        });
    });
    return data; // Trả về danh sách lịch đặt
}
export async function booking(catId, startTime, endTime) {
    try {
        // Kiểm tra trùng thời gian
        const q = query(
            collection(db, "booking"),
            where("startTime", "<=", endTime), // Bắt đầu trước hoặc trong thời gian đặt
            where("endTime", ">=", startTime), // Kết thúc sau hoặc trong thời gian đặt
            where("catId", "==", catId) // Lọc theo `catId`
        );
        const querySnapshot = await getDocs(q);

        // Nếu trùng lịch
        if (!querySnapshot.empty) {
            return { success: false, message: "Thời gian này đã được đặt trước!" };
        }

        // Thêm lịch mới
        const docRef = await addDoc(collection(db, "booking"), {
            catId: catId,
            startTime: startTime,
            endTime: endTime
        });
        console.log("Đặt chỗ thành công với ID: ", docRef.id);

        return { success: true, message: "Đặt lịch thành công!" };
    } catch (e) {
        console.error("Lỗi khi thêm dữ liệu: ", e);
        return { success: false, message: "Lỗi khi đặt lịch, vui lòng thử lại!" };
    }
}
    export async function renderBookingList() {
    const bookingList = await loadBookingData(); // Lấy danh sách lịch đặt
    const bookingContainer = document.getElementById("booking-list"); // Container để hiển thị danh sách
    bookingContainer.innerHTML = ""; // Xóa nội dung cũ

    if (bookingList.length === 0) {
        bookingContainer.innerHTML = "<p>Hiện chưa có lịch đặt nào.</p>"; // Hiển thị thông báo nếu trống
        return;
    }

    bookingList.forEach((booking) => {
        const bookingItem = document.createElement("div");
        bookingItem.className = "booking-item";
        bookingItem.innerHTML = `
            <p><strong>Cat ID:</strong> ${booking.catId}</p>
            <p><strong>Thời gian:</strong> ${booking.startTime} - ${booking.endTime}</p>
        `;
        bookingContainer.appendChild(bookingItem); // Thêm từng lịch vào giao diện
    });
}
    document.getElementById("booking-form").addEventListener("submit", async (e) => {
    e.preventDefault(); // Ngăn trang reload
console.log("adkojfhjkasdhkjf")
    // Lấy thông tin từ form
    const catId = document.getElementById("cat-id").value;
    const startTime = document.getElementById("start-time").value;
    const endTime = document.getElementById("end-time").value;

    // Gọi hàm booking
    const result = await booking(catId, startTime, endTime);

    // Hiển thị thông báo trạng thái
    const statusMessage = document.getElementById("status-message");
    statusMessage.textContent = result.message;
    statusMessage.style.color = result.success ? "green" : "red";

    // Cập nhật danh sách nếu thành công
    if (result.success) {
        renderBookingList();
    }
});
