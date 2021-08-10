const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchQuery = urlParams.get('id')

//themoviedb

const API_KEY = "api_key=bef5eb55028208771a057a3a652b8632";
const BASE_URL = "https://api.themoviedb.org/3"
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const MOVIE_URL = "https://api.themoviedb.org/3/movie/"+ searchQuery + "?" + API_KEY + "&language=en-US";


const image = document.getElementById('movie_image');
const title = document.getElementById('movie_header');
const overview = document.getElementById('overview');
const movie_menu = document.getElementById('movie_menu');


getFilms(MOVIE_URL);

function getFilms(url){
  fetch(url).then(res => res.json()).then(data =>{
    console.log(data)
    if(data.success === false){
      title.innerHTML = `Invalid movie id!`
    }else{
      showFilms(data);
    }
  })
}

function showFilms(data){
  image.innerHTML = `<img class="movie-image" src="${IMG_URL+data.poster_path}" alt="${data.title}">`
  title.innerHTML = `${data.title} - ${data.release_date.substring(0,4)} <span>${data.vote_average}</span>`
  overview.innerHTML = `<p>${data.tagline}</p><h4>Overview:</h4>${data.overview}`
  movie_menu.innerHTML = `
    <div class="movie-menu-item">Status: ${data.status}</div>
    <div class="movie-menu-item">Release: ${data.release_date}</div>
    <div class="movie-menu-item">Runtime: ${data.runtime} minutes</div>
    <div class="movie-menu-item">Ratings: ${data.vote_average}</div>
    <div class="movie-menu-item">Vote Counts: ${data.vote_count}</div>
    <div class="movie-menu-item">Budget: ${data.budget} &#36;</div>
    <div class="movie-menu-item">Revenue: ${data.revenue} &#36;</div>
  `

}

function getColor(vote){
  if(vote>=7){
    return 'green'
  }else{
    return 'orange'
  }
}

function alertMessage(type="success", message){
    let x = document.getElementById("alerts")
    let content = ``
    if(type==="success") {
        x.classList.add("show-alerts-success")
        setTimeout(function(){ x.className = x.className.replace("show-alerts-success", ""); }, 2000);
        content += `
                ${message}`
        x.innerHTML = content;
    }
    else {
        x.classList.add("show-alerts-danger")
        setTimeout(function(){ x.className = x.className.replace("show-alerts-danger", ""); }, 2000);
        content += `
                ${message}`
        x.innerHTML = content;
    }
}
