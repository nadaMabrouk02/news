
const API_KEY = "1d3a0eefa97b499d8fbc4ee93eeb40b7";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("Cairo"));

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    show_data(data.articles);
}
function show_data(articles){
    const cardsContainer = document.getElementById("cards-container");
    const newsTemplate = document.getElementById("template-news-card");
    cardsContainer.innerHTML = "" ;

    articles.forEach((article) =>{
        // عشان الصوره
        if(!article.urlToImage) return;
        // هنعمل كذا نسخه من template ده
        const cardClone = newsTemplate.content.cloneNode(true);
        dataInCard(cardClone , article);
        cardsContainer.appendChild(cardClone);
    })
}
function dataInCard(cardClone , article){
    const newsImg = cardClone.querySelector("#news-img");
    const newstitle = cardClone.querySelector("#news-title");
    const newssource = cardClone.querySelector("#news-soure");
    const newsdesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newstitle.innerHTML =article.title;
    newsdesc.innerHTML = article.description;
    const date = new Date(article.publisheAt).toLocaleString("en-US" , {timeZone : "Asia/Jakarta"})
    newssource.innerHTML = `${article.source.name} ' ${date} `;
    // لما نضغط عالكارت هيفتح لاكن ف صفحه تانيه
    cardClone.firstElementChild.addEventListener("click" , () =>{
        window.open(article.url , "_blank")
    })
}

const searchb = document.getElementById("searchb");
const searcht = document.getElementById("searcht");

searchb.addEventListener("click" , () =>{
    const query = searcht.ariaValueMax;
    if(!query) return;
    fetchNews(query);
})
