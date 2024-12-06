
import {getAllStaffMembers , saveAsUser} from "../ControllerModel/userModel.js"



function validForms(){

    let isValid = true;
        
    var email =  document.getElementById("email")
    var regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
    
    if (!email.value) {
        isValid = false;
        email.classList.add("is-invalid");
    } else if (!regexEmail.test(email.value.trim())) { 
        isValid = false;
        email.classList.add("is-invalid");
    } else {
        email.classList.remove("is-invalid");
        email.classList.add("is-valid");
    }

    return isValid
    
}


document.getElementById("saveUserBtn").addEventListener("click", (event) => {
    event.preventDefault();
    if(validForms()) { 

        const user = getUserObject()
        saveAsUser(user).then(()=>{
            alert("Save as User")
            
        }).catch((error) => { 
            console.error("Error:", error);
        });    
    };
});

function getUserObject(){
    let user = {
        userId   :  $("#staffId").val(), 
        email    :  $("#email").val() ,
        password :  $("#password").val(),
        role     :  $("#role").val(),
    }

    return user;

}


let list = [];
$(document).ready(function(){
    getAllStaffMembers((memberList)=>{
        list= memberList
        console.log(memberList);
        list.forEach(member => {
            $("#staffId").append(
                ` <option value="${member.id}">${member.id}</option>
                `
            );
        });
    })
});

$('#staffId').on('change', function () {
    
    console.log(list)
    let id  = $('#staffId').val()
    list.forEach(member => {
        if(id == member.id ){
            $("#role").val(member.role)
        }
    });
});


