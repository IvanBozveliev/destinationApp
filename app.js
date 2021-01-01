import {getHome,getRegister,getLogin,postLogin,postRegister, logout} from './main/userdata.js';
import {getDetails,getAdd,postAdd,getEdit,postEdit,destinationDelete,getDest,} from './main/data.js';

window.addEventListener('load', function (){

    const app = Sammy('#container', function (){

        this.use('Handlebars','hbs')
        
        this.get('index.html', function (){
            this.redirect('#/home')
        })
        this.get('#/home', getHome)
     //   this.get('#/home/search', search)
        this.get('#/register', getRegister)
        this.get('#/login', getLogin)
        this.get('#/logout', logout)

        this.post('#/register', postRegister)
        this.post('#/login', postLogin)
        
        this.get('#/details/:destinationId', getDetails)

        this.get('#/add', getAdd);
        this.post('#/add', postAdd);

        this.get('#/edit/:destinationId',getEdit);
        this.post('#/edit/:destinationId',postEdit);

        this.get('#/delete/:destinationId', destinationDelete);

        this.get('#/destinations', getDest);
        // this.get('#/destinations', postDest);
      

    })

    app.run()
})