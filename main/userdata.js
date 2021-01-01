import {loadAllPartials,saveUserData} from './auth.js';

const userModel = firebase.auth();
const DB = firebase.firestore();

export function getHome(ctx){
   DB.collection('destinations')
   .get()
   .then(response =>{
       ctx.destinations = response.docs.map(x => ( {id: x.id, ...x.data()} ) );
       loadAllPartials(ctx)
       .then(function (){
           this.partial('/templates/home.hbs')
       })
   }).catch(err => console.log(err))
}

export function getRegister(ctx){
  loadAllPartials(ctx)
  .then(function (){
     this.partial('/templates/register.hbs')
  }).catch(err => console.log(err))

}

export function getLogin(ctx){
    loadAllPartials(ctx)
    .then(function (){
        this.partial('/templates/login.hbs')
    }).catch(err=> console.log(err))
}

export function logout(){
   localStorage.removeItem('user');
   userModel.signOut()
   .then(()=>{
       this.redirect('#/home')
   }).catch(err => console.log(err))
}

export function postRegister(ctx){
    const {email,password,repeatPassword} = ctx.params;
    if(password !== repeatPassword){
        alert('Passwords are not match!')
    }
  
    userModel.createUserWithEmailAndPassword(email,password)
    .then(response=>{
        saveUserData(response);
        this.redirect('#/home')
    }).catch(err => console.log(err))
}

export function postLogin(ctx){
  const {email,password} = ctx.params;
  userModel.signInWithEmailAndPassword(email,password)
  .then(response =>{
      saveUserData(response)
      this.redirect('#/home')
  }).catch(err => console.log(err))
}

//  function loadAllPartials(ctx){

//    const user = getUserData();
//    ctx.isLoggedIn = Boolean(user);
//    ctx.userEmail = user ? user.email : '';

//    return ctx.loadPartials({
//         'header': '/common/header.hbs',
//         'footer': '/common/footer.hbs',
//         'notification': '/common/notification.hbs'
//     })
// }

// function saveUserData(data){
//   const {user: {email,uid}} = data;
//   localStorage.setItem('user',JSON.stringify({email,uid}))
// }

// function getUserData(){
//     const user = localStorage.getItem('user');
//     return user ? JSON.parse(user) : null
// }

