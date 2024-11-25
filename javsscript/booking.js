import {auth, db} from "./Firebase.js"
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
export async function booking(id, startTime, endTime) {
    try {
        // Kiểm tra thời gian đã được đặt chưa
        const q = query(
            collection(db, "booking"),
            where("startTime", "<=", endTime),
            where("endTime", ">=", startTime)
        );
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
            console.error("Thời gian này đã được đặt trước!");
            return false;
        }

        // Thêm đặt chỗ mới
        const docRef = await addDoc(collection(db, "booking"), {
            id: id,
            startTime: startTime,
            endTime: endTime
        });
        console.log("Đặt chỗ thành công với ID: ", docRef.id);
        return true;
    } catch (e) {
        console.error("Lỗi khi thêm dữ liệu: ", e);
        return false;
    }
}