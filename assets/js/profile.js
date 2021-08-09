var provider = new firebase.auth.GoogleAuthProvider();

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
  document.getElementById('profile_name').innerHTML = `${user.displayName}`
  document.getElementById('user_image_div').innerHTML = `<img src="${user.photoURL}" class="user-image">`
  document.getElementById('profile_image').innerHTML = `<img src="${user.photoURL}" class="user-profile-image">`

}

function checkAuthState(){
  firebase.auth().onAuthStateChanged(user=>{
    if(user){
      document.getElementById('user_head').style.display="flex";
      document.getElementById('nonuser_head').style.display="none";
      showUserData(user)
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
checkAuthState()
