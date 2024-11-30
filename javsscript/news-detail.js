// Lấy ID bài viết từ localStorage
const newsId = localStorage.getItem("newsId");

// Tải dữ liệu từ news.json
fetch('../data/news.json')
    .then(response => response.json())
    .then(data => {
        const news = data.find(item => item.id == newsId); // Tìm bài viết theo ID
        const newsDetail = document.getElementById("news-detail");

        if (news) {
            newsDetail.innerHTML = `
                <h1 class="text-warning">${news.title}</h1>
                <img src="${news.image}" alt="${news.title}" class="img-fluid mb-4">
                <p>${news.description}</p>
                <small class="text-muted">Ngày đăng: ${news.date}</small>
            `;
        } else {
            newsDetail.innerHTML = "<p>Không tìm thấy bài viết.</p>";
        }
    })
    .catch(error => console.error("Lỗi khi tải chi tiết bài viết:", error));
