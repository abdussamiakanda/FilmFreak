var provider = new firebase.auth.GoogleAuthProvider();

document.getElementById('login').addEventListener('click', GoogleLogin)
document.getElementById('logout').addEventListener('click', LogoutUser)

function GoogleLogin() {
  firebase.auth().signInWithPopup(provider).then(res=>{
    showUserData(res.user)
    document.getElementById('user_head').style.display="flex";
    document.getElementById('nonuser_head').style.display="none";
  }).catch((e)=>{})
}

function showUserData(user){
  document.getElementById('user_name').innerHTML = `Hola, ${user.displayName}`
  document.getElementById('user_image_div').innerHTML = `<img src="${user.photoURL}" class="user-image">`
}

function checkAuthState(){
  firebase.auth().onAuthStateChanged(user=>{
    if(user){
      document.getElementById('user_head').style.display="flex";
      document.getElementById('nonuser_head').style.display="none";
      showUserData(user)
      alertMessage(type="success", "You're logged in!")
    }else{

    }
  })
}

function LogoutUser() {
  firebase.auth().signOut().then(()=>{
    document.getElementById('user_head').style.display="none";
    document.getElementById('nonuser_head').style.display="flex";
    alertMessage(type="success", "You're logged out!")
  }).catch((e)=>{
    console.log(e)
  })
}
checkAuthState()
