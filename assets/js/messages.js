const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const profileId = urlParams.get('id');

var provider = new firebase.auth.GoogleAuthProvider();
var database = firebase.database();

var userdata = null;

const API_KEY = "api_key=bef5eb55028208771a057a3a652b8632";
const BASE_URL = "https://api.themoviedb.org/3"
const IMG_URL = "https://image.tmdb.org/t/p/w500";

document.getElementById('login').addEventListener('click', GoogleLogin);
document.getElementById('logout').addEventListener('click', LogoutUser);

function GoogleLogin() {
  firebase.auth().signInWithPopup(provider).then(res=>{
    alertMessage(type="success", "You're logged in!")
    showUserData(res.user)
    document.getElementById('user_head').style.display="flex";
    document.getElementById('nonuser_head').style.display="none";
  }).catch((e)=>{})
}

function showUserData(user){
  document.getElementById('user_image_div').innerHTML = `<img src="${user.photoURL}" class="user-image">`
}

function checkAuthState(){
  firebase.auth().onAuthStateChanged(user=>{
    if(user){
      userdata = user;
      document.getElementById('user_head').style.display="flex";
      document.getElementById('nonuser_head').style.display="none";
      checkPermission(user);
      showUserData(user);
      PublicProfileHandler(user);
      showReqFriendsNum(user);
      document.title = "Messages - FilmFreak";
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

checkAuthState();

// FIREBASE

function checkPermission(user){
  database.ref('/'+user.uid+'/profile').once("value").then((snapshot) => {
    var public = snapshot.child("public").val();
    if(public === false){
      alertMessage(type="danger", "You're not authorized to see this page!");
      setTimeout(() => { window.location.replace("./profile.html"); }, 2000);
    }else{
    }
  })
}

function PublicProfileHandler(userdata){
  database.ref('/'+userdata.uid+'/profile').once("value").then((snapshot) => {
    var public = snapshot.child("public").val();
    if(public === true){
      document.getElementById("friends").innerHTML = `
        <div class="dropdown-menu-item">Friends</div>
      `
      document.getElementById("friends-icon").innerHTML = `
        <i class="search-icon fa fa-users" aria-hidden="true"></i>
      `
      document.getElementById("message-icon").innerHTML = `
        <i class="search-icon fa fa-comments-o" aria-hidden="true"></i>
      `
    }else{
    }
  })
}


function showReqFriendsNum(user){
  database.ref('/'+user.uid+'/friends').orderByKey().once("value").then((snapshot) => {
    var num = 0;
    snapshot.forEach(function(childSnapshot){
      var profileId = childSnapshot.key;
      database.ref('/'+user.uid+'/friends/'+profileId).once("value").then((snapshot) => {
        var status = snapshot.child('status').val();
        if (status === false){
          num++;
          showNumber(num);
        }else{
          num = num;
        }
      });
    });
  });
}

function showNumber(num){
  document.getElementById('friends-icon').style.position = 'relative';
  document.getElementById('friends-icon').innerHTML += `
    <i class="badge-dot fa fa-circle" aria-hidden="true"></i>
  `
}

document.getElementById("send_message").onclick = function (){
  console.log('p')
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
