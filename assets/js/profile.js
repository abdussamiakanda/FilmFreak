var provider = new firebase.auth.GoogleAuthProvider();

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
      document.getElementById('user_head').style.display="flex";
      document.getElementById('nonuser_head').style.display="none";
      showUserData(user);
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

checkAuthState()

// FIREBASE



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
