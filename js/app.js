fetch("https://openapi.programming-hero.com/api/news/categories")
.then(res => res.json())
.then(data => navItem(data.data.news_category))


function navItem(data){
    for (category of data){
        const span = document.createElement("span");
        const categoryContainer = document.getElementById("category");
        span.innerText = category.category_name;
        span.classList.add("text-secondary", "fs-5", "pointer")
        span.addEventListener("click", ()=>{
            
            fetch(`https://openapi.programming-hero.com/api/news/category/${category.category_id}`)
            .then(res => res.json())
            .then(data => displayNews(data.data))
            function displayNews(data){}
        }, true);
        categoryContainer.appendChild(span)
    }
}