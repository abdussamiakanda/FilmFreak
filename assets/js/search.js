const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const searchQuery = urlParams.get('s')

document.getElementById("big_search").value = searchQuery;
