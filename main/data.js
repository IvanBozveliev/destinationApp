import {loadAllPartials,saveUserData,getUserData} from './auth.js';

const DB = firebase.firestore();

export function getDetails(ctx){
   const {destinationId} = ctx.params;
   DB.collection('destinations')
   .doc(destinationId)
   .get()
   .then((response) =>{
       const {uid} = getUserData();
       const destinationData = response.data();
       const isMyDestination = destinationData.userid === uid;
    //    let isItmyDest = Boolean(destinationData.myDestinations.find(id => id === uid))
       ctx.destination = {...destinationData,isMyDestination,userid: destinationId}

       loadAllPartials(ctx)
       .then(function (){
           this.partial(`/templates/details.hbs`)
       })
   })
}

export function getAdd(ctx){

  loadAllPartials(ctx)
   .then(function(){
      this.partial('/templates/add.hbs')
   }).catch(err => console.log(err))
}

export function postAdd(ctx){
    const {destination,city,duration,departureDate,imgUrl} = ctx.params;

    DB.collection('destinations').add({
        destination,
        city,
        duration,
        departureDate,
        imgUrl,
        userid: getUserData().uid,
      //  myDestinations: []
    })
    .then(() =>{
        this.redirect('#/home')
    }).catch(err => console.log(err))
}

export function getEdit(ctx){
  const {destinationId} = ctx.params;
  DB.collection('destinations')
  .doc(destinationId)
  .get()
  .then(response =>{
      ctx.destination = {id: destinationId,...response.data()}
      loadAllPartials(ctx)
      .then(function (){
          this.partial('/templates/edit.hbs')
      })
  })

}

export function postEdit(ctx){
  const {destinationId,destination,city,duration,departureDate,imgUrl} = ctx.params;

  DB.collection('destinations')
  .doc(destinationId)
  .get()
  .then(response =>{
     return DB.collection('destinations')
            .doc(destinationId)
            .set({
                ...response.data(),
                destination,
                city,
                duration,
                departureDate,
                imgUrl
            })
            .then(response =>{
                this.redirect(`#/details/${destinationId}`)
            }).catch(err => console.log(err))
  })
}

export function destinationDelete(ctx){
   const {destinationId} = ctx.params;

   DB.collection('destinations')
   .doc(destinationId)
   .delete()
   .then(response =>{
       this.redirect('#/home')
   }).catch(err =>  console.log(err))
}

export function getDest(ctx){
  
       DB.collection('destinations')
       .get()
       .then(response =>{
        
        ctx.destinations = response.docs.map((dest) =>{
          let myDest = Boolean(dest.data().userid === getUserData().uid);
          return {id: dest.id, myDest, ...dest.data()}
        });
        loadAllPartials(ctx)
        .then(function(){  
        this.partial('./templates/destinations.hbs')
       })
    }).catch(err => console.log(err))
}


