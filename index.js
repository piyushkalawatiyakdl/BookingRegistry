const form=document.getElementById('form');
const fullname=document.getElementById('fname');
const email=document.getElementById('mail');
form.addEventListener('click',submit);
function submit(e){
    if(e.target.id=='submitbtn'){
    e.preventDefault();
    if(fullname.value==''||email.value==''){
        const msg=document.getElementById('msg');
        msg.innerHTML='<b>Enter All Fields</b>'
        msg.style.color='red';
        setTimeout(()=>msg.remove(),3000);
    }
    else{
        const key=`${email.value}`;
        const obj={
            name : fullname.value,
            email : email.value
        }
        fullname.value='';
        email.value='';
        //adding user to crudcrud using axios
        addUserdetails(obj);

        //DISPLAY USERDETAIL IN FRONTEND USING ul ELEMENT
        showUser(obj);

    }
    }
}

//getting Data from crud crud and displaying on frontend
function displayUser(){
axios.get('https://crudcrud.com/api/df2e6b16c54941d798a63ed4e2944917/appointmentApp')
.then(res=>{
    res.data.forEach((obj)=>{
        showUser(obj);
    })
})
.catch(err=>console.log(err))
}

displayUser()

// adding user to crudCrud using axios
function addUserdetails(obj){
   axios.post('https://crudcrud.com/api/df2e6b16c54941d798a63ed4e2944917/appointmentApp',obj)
   .then(res=>console.log(res))
   .catch(err=>console.log(err))
}
//showing new user in frontend
//DISPLAY USERDETAIL IN FRONTEND USING ul ELEMENT
//before adding to frontend check once
function showUser(obj){
        check(obj.email);
        const userDetail=document.getElementById('users');
        const newelement=document.createElement('li');
        newelement.innerHTML=`${obj.name} : ${obj.email}`
        const editbtn=document.createElement('button');
        editbtn.textContent='Edit';
        editbtn.id='editbtn'
        const dltbtn=document.createElement('button');
        dltbtn.textContent='delete';
        dltbtn.id='dltbtn'
        newelement.appendChild(editbtn);
        newelement.appendChild(dltbtn);
        userDetail.appendChild(newelement);
}


//Deletion of user details from frontend when email is overridden
function check(email){
const ul=document.getElementById('users');
for(let i=0;i<ul.children.length;i++){
if(ul.children[i].textContent.indexOf(email)!= -1)
ul.removeChild(ul.children[i]);
}
}

const ul=document.getElementById('users')
//delete and edit button functionality
ul.addEventListener('click',dlt_edit)
function dlt_edit(e){
if(e.target.id=='dltbtn'){
    ul.removeChild(e.target.parentElement);
    // for removing from local storage
    removeFromLS(e.target.parentElement.textContent);

}
if(e.target.id='editbtn'){
    keepElementback(e.target.parentElement.textContent);
    ul.removeChild(e.target.parentElement);
    removeFromLS(e.target.parentElement.textContent);
}
}

// delete from localStorage
function removeFromLS(str){
    Object.keys(localStorage).forEach((key)=>{
        if(str.indexOf(key) != -1){
            localStorage.removeItem(key);
        }
    })
}

//edit button functionality
function keepElementback(str){
    Object.keys(localStorage).forEach((key)=>{
        if(str.indexOf(key) != -1){
            const obj=JSON.parse(localStorage.getItem(key));
            fullname.value=obj.name;
            email.value=obj.email;
        }
    })
}
