
const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b402d5f585809ad88c465c928348a15d&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?api_key=b402d5f585809ad88c465c928348a15d&query=';

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

function returnMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data.results);
            data.results.forEach(element => {
                const div_card = document.createElement('div');
                div_card.setAttribute('class','card');

                const image = document.createElement('img');
                image.setAttribute('class','thumbnail');
                image.src = IMG_PATH + element.poster_path;

                const title = document.createElement('h3');
                title.innerHTML = `${element.title}<br><a href="movie.html?id=${element.id}&title=${element.title}">reviews</a>`;

                div_card.appendChild(image);
                div_card.appendChild(title);

                main.appendChild(div_card);
            });
        })
        .catch(err => console.error("Error fetching movies:", err));
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = '';

    const searchItem = search.value;

    if(searchItem){
        returnMovies(SEARCHAPI + searchItem);
        search.value = "" ;
    }
});


returnMovies(APILINK);
