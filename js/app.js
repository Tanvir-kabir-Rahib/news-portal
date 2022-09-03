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
                .then(data => displayNews(data.data, category.category_name))
                .catch((error) => {
                    console.log(error);
                });
            spinner(true);
        });
    });
}

function displayNews(data, name) {
    const newsContainer = document.getElementById("news-container");
    newsContainer.textContent = "";
    const resultContainer = document.getElementById("result-container");
    const result = document.getElementById("result");
    const categoryName = document.getElementById("category-name");
    result.innerText = `${data.length}`;
    categoryName.innerText = `${name}`;
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
                <div class="m-3 d-flex justify-content-evenly">
                    <div class="d-flex justify-content-start">
                        <img src=${(news.author.img)?news.author.img:"Not Available"} class="rounded-circle author-img" alt="...">
                        <div class="ms-2">
                            <p class="mb-0">${(news.author.name)?news.author.name:"Not Available"}</p>
                            <p class="mb-0">${(news.author.published_date)?news.author.published_date:"Not Available"}</p>
                        </div>
                    </div>
                    <div class="d-flex align-items-center">
                        <i class="fa-regular fa-eye pe-2 fs-3"></i>
                        <span class="fs-5">${news.total_view}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `
        div.classList.add("container");
        div.setAttribute("data-bs-target","#exampleModal")
        div.setAttribute("data-bs-toggle","modal")
        newsContainer.appendChild(div);
        div.addEventListener("click", () => {
            fetch(`https://openapi.programming-hero.com/api/news/${news._id}`)
                .then(res => res.json())
                .then(data => loadNews(data.data[0]))
                .catch((error) => {
                    console.log(error);
                });
        });

    });
    spinner(false)
}

function loadNews(data) {
    const modalSection = document.getElementById("modal-section");
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header flex-column">
                <img src=${data.image_url} class="img-fluid" alt="">
                <h5 class="modal-title mt-3" id="exampleModalLabel">${data.title}</h5>
            </div>
            <div class="modal-body">
                <div>
                    ${data.details}
                </div>
                <div class="d-flex align-items-center mt-3">
                    <i class="fa-regular fa-eye pe-2 fs-3"></i>
                    <span class="fs-5">${(data.total_view)? data.total_view : "Not Available"}</span>
                </div>
                <div class="d-flex align-items-center mt-3">
                    <i class="fa-solid fa-star me-2 fs-3"></i>
                    <span class="fs-5">${(data.rating.number)? data.rating.number : "Not Available"}</span>
                </div>
                <div class="d-flex justify-content-start mt-3">
                    <img src=${(data.author.img)? data.author.img : "Not Available"} class="rounded-circle author-img" alt="...">
                    <div class="ms-2">
                        <p class="mb-0">${(data.author.name)? data.author.name : "Not Available"}</p>
                        <p class="mb-0">${(data.author.published_date)? data.author.published_date : "Not Available"}</p>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
  `
    modalSection.appendChild(div)
}

function spinner(spin) {
    const loader = document.getElementById("loader");
    if (spin) {
        loader?.classList.remove("d-none");
    }
    else {
        loader?.classList.add("d-none");
    }
}