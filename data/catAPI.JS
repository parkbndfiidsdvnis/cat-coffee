import { writeFileSync } from 'fs'

// Khai báo API Key và URL
fetch('https://api.thecatapi.com/v1/images/search?limit=100', {
    headers: {
        'x-api-key': 'live_oD192LMhvsyD0njxcaRhFvlzAIg2SNeE8cfzO4MKwH07GLNOVlD71qEdHSPd2Z6r'
    }
})
.then(response => response.json())

.then(data => writeFileSync("cats.json", JSON.stringify(data, null, 2)))
.catch(error => console.error('Error:', error));

