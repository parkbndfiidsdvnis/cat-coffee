// Fetch movie data and generate carousel content
fetch('../data/topcats.json')
	.then(response => response.json())
	.then(data => {
		const carouselContent = document.getElementById('carousel-content-topcat');
		const chunkSize = 5; // Number of items per carousel item
		let isActive = ' active';

		for (let i = 0; i < data.length; i += chunkSize) {
			const chunk = data.slice(i, i + chunkSize);
			const carouselItem = document.createElement('div');
			carouselItem.className = `carousel-item${isActive}`;
			isActive = ''; // Only the first item should be active

			const row = document.createElement('div');
			row.className = 'row row-cols-5 g-4';

			chunk.forEach(cat => {
				const col = document.createElement('div');
				col.className = 'col';

				const card = `
				<div class="card overflow-hidden" onclick="GoToDetail(${cat.id})">
					<div class="card-img-top ratio" style="--bs-aspect-ratio: 120%;">
					<img src="${cat.url}" class="object-fit-cover" alt="${cat.title}">
					</div>
					<div class="card-body bg-dark" style="">
					<h6 class="card-title text-truncate">${cat.title}</h6>
					</div>
				</div>
				`;

				col.innerHTML = card;
				row.appendChild(col);
			});

			carouselItem.append(row);
			carouselContent.appendChild(carouselItem);
		}
	})
	.catch(error => console.error('Error fetching cat data:', error));
	function GoToDetail(id) {
		localStorage.setItem('catId', id);
		window.location.href = '../html/service.html';
	}

