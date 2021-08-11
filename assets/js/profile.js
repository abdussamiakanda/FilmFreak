var provider = new firebase.auth.GoogleAuthProvider();
var database = firebase.database();

var userdata = null;


document.getElementById('login').addEventListener('click', GoogleLogin);
document.getElementById('logout').addEventListener('click', LogoutUser);
document.getElementById('profilelogout').addEventListener('click', LogoutUser);
document.getElementById('settings_btn').addEventListener('click', SettingsManager);
document.getElementById('wishlist_btn').addEventListener('click', WishlistManager);
document.getElementById('watched_btn').addEventListener('click', WatchedManager);
document.getElementById('dashboard_btn').addEventListener('click', DashboardManager);

function GoogleLogin() {
  firebase.auth().signInWithPopup(provider).then(res=>{
    alertMessage(type="success", "You're logged in!")
    showUserData(res.user)
    document.getElementById('user_head').style.display="flex";
    document.getElementById('nonuser_head').style.display="none";
  }).catch((e)=>{})
}

function showUserData(user){
  document.getElementById('profile_name').innerHTML = `${user.displayName}`
  document.getElementById('user_image_div').innerHTML = `<img src="${user.photoURL}" class="user-image">`
  document.getElementById('profile_image').innerHTML = `<img src="${user.photoURL}" class="user-profile-image">`

}

function checkAuthState(){
  firebase.auth().onAuthStateChanged(user=>{
    if(user){
      userdata = user;
      document.getElementById('user_head').style.display="flex";
      document.getElementById('nonuser_head').style.display="none";
      showUserData(user);
      PublicProfileHandler(user);
      wishMoviesHandler(user);
      watchedMoviesHandler(user);
      document.title = user.displayName + " - FilmFreak";
    }else{
    alertMessage(type="danger", "You're logged out!")
    setTimeout(() => { window.location.replace("./index.html"); }, 2000);
    }
  })
}

function LogoutUser() {
  firebase.auth().signOut().then(()=>{
    document.getElementById('user_head').style.display="none";
    document.getElementById('nonuser_head').style.display="flex";
    setTimeout(() => { window.location.replace("./index.html"); }, 2000);
  }).catch((e)=>{
    console.log(e)
  })
}

function SettingsManager(){
  document.getElementById("settings_div").style.display="block";
  document.getElementById("wishlist_div").style.display="none";
  document.getElementById("watched_div").style.display="none";
  document.getElementById("short_info").style.display="none";
}

function WishlistManager(){
  document.getElementById("settings_div").style.display="none";
  document.getElementById("wishlist_div").style.display="block";
  document.getElementById("watched_div").style.display="none";
  document.getElementById("short_info").style.display="none";
}
function WatchedManager(){
  document.getElementById("settings_div").style.display="none";
  document.getElementById("wishlist_div").style.display="none";
  document.getElementById("watched_div").style.display="block";
  document.getElementById("short_info").style.display="none";
}
function DashboardManager(){
  document.getElementById("settings_div").style.display="none";
  document.getElementById("wishlist_div").style.display="none";
  document.getElementById("watched_div").style.display="none";
  document.getElementById("short_info").style.display="block";
}

checkAuthState();

// FIREBASE

document.getElementById("toggle").addEventListener('click', PublicProfileManager);

function PublicProfileManager(){
  database.ref('/'+userdata.uid+'/profile').once("value").then((snapshot) => {
    var public = snapshot.child("public").val();

    if (public === true){
      database.ref('/'+userdata.uid+'/profile').update({
        public: false,
      })
      PublicProfileHandler(userdata);
    }else {
      database.ref('/'+userdata.uid+'/profile').update({
        public: true,
        name: userdata.displayName,
        email: userdata.email,
        image: userdata.photoURL
      })
      PublicProfileHandler(userdata);
    }
  })
}

function PublicProfileHandler(userdata){
  database.ref('/'+userdata.uid+'/profile').once("value").then((snapshot) => {
    var public = snapshot.child("public").val();
    if(public === true){
      document.getElementById("toggle").checked = "checked";
      document.getElementById("friends").innerHTML = `
        <div class="dropdown-menu-item">Friends</div>
      `
    }else{
      document.getElementById("toggle").checked = false;
    }
  })
}

var modal = document.getElementById("myModal");

document.getElementById("download_data").onclick = function (){
  alertMessage(type="success", "This feature is not available yet!");
}
document.getElementById("delete_data").onclick = function (){
  modal.style.display = "block";
}
document.getElementById("no_button").onclick = function (){
  modal.style.display = "none";
}

document.getElementById("yes_button").onclick = function (){
  modal.style.display = "none";
  database.ref('/'+userdata.uid+'/movies').remove();
  alertMessage(type="danger", "All all your film data are deleted permanently!");
}


function wishMoviesHandler(user){

}

function watchedMoviesHandler(user){

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
