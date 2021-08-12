var provider = new firebase.auth.GoogleAuthProvider();
var database = firebase.database();

document.getElementById('login').addEventListener('click', GoogleLogin)
document.getElementById('logout').addEventListener('click', LogoutUser)

function GoogleLogin() {
  firebase.auth().signInWithPopup(provider).then(res=>{
    alertMessage(type="success", "You're logged in!")
    showUserData(res.user)
    document.getElementById('user_head').style.display="flex";
    document.getElementById('nonuser_head').style.display="none";
  }).catch((e)=>{})
}

function showUserData(user){
  FriendsHandler(user);
  //document.getElementById('user_name').innerHTML = `Hola, ${user.displayName}`
  document.getElementById('user_image_div').innerHTML = `<img src="${user.photoURL}" class="user-image">`
}

function checkAuthState(){
  firebase.auth().onAuthStateChanged(user=>{
    if(user){
      document.getElementById('user_head').style.display="flex";
      document.getElementById('nonuser_head').style.display="none";
      showUserData(user);
    }else{

    }
  })
}

function FriendsHandler(userdata){
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

function LogoutUser() {
  firebase.auth().signOut().then(()=>{
    document.getElementById('user_head').style.display="none";
    document.getElementById('nonuser_head').style.display="flex";
    alertMessage(type="danger", "You're logged out!")
  }).catch((e)=>{
    console.log(e)
  })
}
checkAuthState()
