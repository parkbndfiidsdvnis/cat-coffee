// Tải dữ liệu từ tệp JSON và hiển thị tin tức
fetch('../data/news.json')
    .then(response => response.json())
    .then(data => {
        const newsList = document.getElementById('news-list');
        newsList.innerHTML = ""; // Xóa nội dung cũ nếu có

        data.forEach(news => {
            const newsCard = document.createElement('div');
            newsCard.className = 'col';

            newsCard.innerHTML = `
                <div class="card h-100">
                    <img src="${news.image}" class="card-img-top" alt="${news.title}">
                    <div class="card-body">
                        <h5 class="card-title">${news.title}</h5>
                        <p class="card-text text-truncate">${news.description}</p>
                        <small class="text-muted">${news.date}</small>
                        <button class="btn btn-warning mt-2" onclick="viewNews(${news.id})">Xem thêm</button>
                    </div>
                </div>
            `;
            newsList.appendChild(newsCard);
        });
    })
    .catch(error => console.error("Lỗi khi tải tin tức:", error));

// Chuyển hướng đến trang chi tiết bài viết
function viewNews(id) {
    localStorage.setItem("newsId", id); // Lưu ID bài viết vào localStorage
    window.location.href = './news-detail.html'; // Điều hướng đến trang chi tiết bài viết
}
