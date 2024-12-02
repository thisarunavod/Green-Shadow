import {saveStaffMember,generateNewStaffId , getAllStaffMembers} from "../ControllerModel/staffModel.js"

$(document).ready(function(){
    
    getAllStaffMembers();
    generateNewStaffId((id) => {
        $("#staffId").val(id); 
    });

    // getAllStaffMembers();
});



$('#saveStaffBtn').click( function(){
    
    saveStaffMember(getStaffObject()).then(()=>{
        alert("Staff Member Added Successfully");
        resetForms();
    }).catch((error) => { 
        console.error("Error:", error);
    });

});


function getStaffObject(){
    const staffMember = {
        id: $('#staffId').val(),
        firstName:$('#firstName').val(),
        lastName:$('#lastName').val(),
        designation:$('#designation').val(),
        dateOfBirth:$('#dob').val(),
        gender:$('#gender').val(),
        joinedDate:$('#joinedDate').val(),
        addressLine1:$('#addressLine1').val(),
        addressLine2:$('#addressLine2').val(),
        addressLine3:$('#addressLine3').val(),
        addressLine4:$('#addressLine4').val(),
        addressLine5:$('#addressLine5').val(),
        contactNo:$('#contact').val(),
        email:$('#email').val(),
        role:$('#role').val(),
    }

    return staffMember;
}


function resetForms(){
    generateNewStaffId((id) => {
        $("#staffId").val(id); 
    });
    $('#firstName').val('')
    $('#lastName').val('')
    $('designation').val('')
    $('#dob').val('')
    $('#joinedDate').val('')
    $('#addressLine1').val('')
    $('#addressLine2').val('')
    $('#addressLine3').val('')
    $('#addressLine4').val('')
    $('#addressLine5').val('')
    $('#contact').val('')
    $('#email').val('')
    $('#role').val('')
}
