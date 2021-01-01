export function loadAllPartials(ctx){

    const user = getUserData();
    ctx.isLoggedIn = Boolean(user);
    ctx.userEmail = user ? user.email : '';
 
    return ctx.loadPartials({
         'header': '/common/header.hbs',
         'footer': '/common/footer.hbs',
         'notification': '/common/notification.hbs'
     })
 }
 
 export function saveUserData(data){
   const {user: {email,uid}} = data;
   localStorage.setItem('user',JSON.stringify({email,uid}))
 }
 
export function getUserData(){
     const user = localStorage.getItem('user');
     return user ? JSON.parse(user) : null
 }
 