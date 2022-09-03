fetch("https://openapi.programming-hero.com/api/news/categories")
    .then(res => res.json())
    .then(data => navItem(data.data.news_category))
    .catch((error) => {
        console.log(error)
      });


function navItem(data) {
    data.forEach(category => {
        const span = document.createElement("span");
        const categoryContainer = document.getElementById("category");
        span.innerText = category.category_name;
        span.classList.add("text-secondary", "fs-5", "pointer");
        categoryContainer.appendChild(span);
        span.addEventListener("click", () => {
            fetch(`https://openapi.programming-hero.com/api/news/category/${category.category_id}`)
            .then(res => res.json())
            .then(data => displayNews(data.data))
            .catch((error) => {
                console.log(error)
            });
        });
    });
}

function displayNews(data) {
    const newsContainer = document.getElementById("news-container");
    newsContainer.textContent = "";
    const resultContainer = document.getElementById("result-container");
    const result = document.getElementById("result");
    result.innerText = `${data.length}`
    resultContainer.classList.remove("d-none");
    data.forEach(news => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card mb-5">
        <div class="row g-0">
        <div class="col-md-4">
        <img src=${news.image_url} class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
        <div class="card-body">
        <h5 class="card-title">${news.title}</h5>
        <p class="card-text text-secondary overflow-ellipsis">${news.details}</p>
        </div>
        <div class="ms-3">
        <div class="d-flex justify-content-start">
        <img src= ${news.author.img} class="rounded-circle author-img" alt="...">
        <div class="ms-2">
        <p class="mb-0">${news.author.name}</p>
        <p class="mb-0">${news.author.published_date}</p>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        `
        div.classList.add("container")
        newsContainer.appendChild(div)
    });
}

function spinner(spin){
    const loader = document.getElementById("loader");
    if(spin){
        loader.classList.remove("d-none");
    }
    else{
        loader.classList.add("d-none")
    }
}