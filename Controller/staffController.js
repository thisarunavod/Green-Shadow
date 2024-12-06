import {
    saveStaffMember,
    generateNewStaffId,
    getAllStaffMembers,
    getStaffMember ,
    updateStaffMember,
    deleteStaffMember,
    loadFieldCodes,
    saveFieldStaffDetails,
    updateFieldStaffDetails
} from "../ControllerModel/staffModel.js"

$(document).ready(function(){
    
    getAllStaffMembers((staffList) => {});
    loadFieldCodes();
    generateNewStaffId((id) => {
        $("#staffId").val(id); 
    });

    $('.fieldAssign').hide();
});

$("#addMember").click(function(){
    resetForms();
    $("#currentField").hide();
});

function validateForm(){
    let isValid = true;
    var firstName = document.getElementById("firstName");
    var lastName =document.getElementById("lastName")
    var designation = document.getElementById("designation")
    var gender =  document.getElementById("gender")
    var joinDate = document.getElementById("joinedDate")
    var dob =  document.getElementById("dob")
    var addressLine1 =  document.getElementById("addressLine1")
    var addressLine2 =  document.getElementById("addressLine2")
    var addressLine3 =  document.getElementById("addressLine3")
    var addressLine4 =  document.getElementById("addressLine4")
    var addressLine5 =  document.getElementById("addressLine5")
    var contact =  document.getElementById("contact")
    var email =  document.getElementById("email")

    var regex = /^[A-Z][a-z]*$/; // for names
    var regexContact = /^\+?[0-9]{1,4}?[-.\s]?[0-9]{3,5}[-.\s]?[0-9]{3,5}[-.\s]?[0-9]{3,5}$/; 
    var regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
    var regexAddres = /^[a-zA-Z0-9\s.,#\-\/]+$/;


    if (!addressLine1.value) {
        isValid = false;
        addressLine1.classList.add("is-invalid");
    } else if (!regexAddres.test(addressLine1.value.trim())) { 
        isValid = false;
        addressLine1.classList.add("is-invalid");
        console.log("Regex failed for:", addressLine1.value);
    } else {
        addressLine1.classList.remove("is-invalid");
        addressLine3.classList.add("is-valid");
    }

    if (!addressLine2.value) {
        isValid = false;
        addressLine2.classList.add("is-invalid");
    } else if (!regexAddres.test(addressLine2.value.trim())) { 
        isValid = false;
        addressLine2.classList.add("is-invalid");
        console.log("Regex failed for:", addressLine2.value);
    } else {
        addressLine2.classList.remove("is-invalid");
        addressLine2.classList.add("is-valid");
    }

    if (!addressLine3.value) {
        isValid = false;
        addressLine3.classList.add("is-invalid");
    } else if (!regexAddres.test(addressLine3.value.trim())) { 
        isValid = false;
        addressLine3.classList.add("is-invalid");
        console.log("Regex failed for:", addressLine3.value);
    } else {
        addressLine3.classList.remove("is-invalid");
        addressLine3.classList.add("is-valid");
    }
    
    
    if (!email.value) {
        isValid = false;
        email.classList.add("is-invalid");
    } else if (!regexEmail.test(email.value.trim())) { 
        isValid = false;
        email.classList.add("is-invalid");
        console.log("Regex failed for:", email.value);
    } else {
        email.classList.remove("is-invalid");
        email.classList.add("is-valid");
    }
    
    if (!contact.value) {
        isValid = false;
        contact.classList.add("is-invalid");
    } else if (!regexContact.test(contact.value.trim())) { 
        isValid = false;
        contact.classList.add("is-invalid");
        console.log("Regex failed for:", contact.value);
    } else {
        contact.classList.remove("is-invalid");
        contact.classList.add("is-valid");
    }
   
   
    if (!firstName.value) {
        isValid = false;
        firstName.classList.add("is-invalid");
    } else if (!regex.test(firstName.value.trim())) { 
        isValid = false;
        firstName.classList.add("is-invalid");
        console.log("Regex failed for:", firstName.value);
    } else {
        firstName.classList.remove("is-invalid");
        firstName.classList.add("is-valid");
    }

    if (!lastName.value) {
        isValid = false;
        lastName.classList.add("is-invalid");
    } else if (!regex.test(lastName.value.trim())) { 
        isValid = false;
        lastName.classList.add("is-invalid");
        console.log("Regex failed for:", lastName.value);
    } else {
        lastName.classList.remove("is-invalid");
        lastName.classList.add("is-valid");
    }

    if (!designation.value) {
        isValid = false;
        designation.classList.add("is-invalid");
    } else {
        designation.classList.remove("is-invalid");
        designation.classList.add("is-valid");
    }

    if (!gender.value) {
        isValid = false;
        gender.classList.add("is-invalid");
    } else {
        gender.classList.remove("is-invalid");
        gender.classList.add("is-valid");
    }

    if (!joinDate.value) {
        isValid = false;
        joinDate.classList.add("is-invalid");
    } else {
        joinDate.classList.remove("is-invalid");
        joinDate.classList.add("is-valid");
    }

    if (!dob.value) {
        isValid = false;
        dob.classList.add("is-invalid");
    } else {
        dob.classList.remove("is-invalid");
        dob.classList.add("is-valid");
    }


    return isValid;

    
    
}


document.getElementById("saveStaffBtn").addEventListener("click", (event) => {
    event.preventDefault();
    if(validateForm()) { 
        const fieldCode = $("#field").val()
        const member = getStaffObject()
        saveStaffMember(member).then(()=>{
            if(fieldCode == 'not_set'){
                alert("Staff Member Added Successfully");
                updateTableWithSaving(getStaffObject())
                resetForms();
            }else{
                saveFieldStaffDetails(fieldCode,member.id).then(()=>{
                    alert("Staff Member Added Successfully");
                    updateTableWithSaving(getStaffObject());
                    resetForms();
                }).catch((error) => { 
                    console.error("Error:", error);
                });
            }
            
        }).catch((error) => { 
            console.error("Error:", error);
        });    
    };
});

// $('#saveStaffBtn').click( function(){
//     if(validateForm()) { console.log("OK OK")};
//     const fieldCode = $("#field").val()
//     const member = getStaffObject()
//     saveStaffMember(member).then(()=>{
//         if(fieldCode == 'not_set'){
//             alert("Staff Member Added Successfully");
//             updateTableWithSaving(getStaffObject())
//             resetForms();
//         }else{
//             saveFieldStaffDetails(fieldCode,member.id).then(()=>{
//                 alert("Staff Member Added Successfully");}).catch((error) => { 
//                 console.error("Error:", error);
//             });
//         }
        
//     }).catch((error) => { 
//         console.error("Error:", error);
//     });

// });

$('#updateStaffBtn').click( function (){
    if(validateForm()){
        
        const fieldCode = $("#field").val()
        const member = getStaffObject();
        updateStaffMember(member).then(()=>{
            // alert("Staff Member Added Successfully");
            // updateTableWithUpdateProcess(member)
            // resetForms();
            if(fieldCode == 'not_set'){
                alert("Staff Member Added Successfully");
            }else{
                updateFieldStaffDetails(fieldCode,member.id).then(()=>{
                    alert("Staff Member Updated Successfully");}).catch((error) => { 
                    console.error("Error:", error);
                });
            }
            updateTableWithUpdateProcess(getStaffObject())
            resetForms();
            $("#staffModal").modal("hide");
        }).catch((error) => { 
            console.error("Error:", error);
        });
    }
});

$('#removeStaffBtn').click( function (){
    let deleteId = selectedRow.find("#sId").text() 
    deleteStaffMember(deleteId).then(()=>{
        alert("Staff Member Added Successfully");
        selectedRow.remove()
        resetForms();
        $("#staffModal").modal("hide");
    }).catch((error) => { 
        console.error("Error:", error);
    });
});

function updateTableWithUpdateProcess(member){
    selectedRow.find("td:nth-child(1)").text(member.id);
    selectedRow.find("td:nth-child(2)").text(member.firstName);
    selectedRow.find("td:nth-child(3)").text(member.designation);
    selectedRow.find("td:nth-child(4)").text(member.gender);
    selectedRow.find("td:nth-child(5)").text(member.joinedDate);
    selectedRow.find("td:nth-child(6)").text(member.contactNo+"\n"+member.email);
}

function updateTableWithSaving(obj){
    $("#staffTableBody").append(
        `<tr class="staffDetails">
            <td id = "sId">${obj.id}</td>
            <td>${obj.firstName}</td>
            <td>${obj.designation}</td>
            <td>${obj.gender}</td>
            <td>${obj.dateOfBirth}</td>
            <td>${obj.contactNo}<br>${obj.email}</td>
            <td> <button class="btn btn-success view-btn">Edit</button></td>
        </tr>`
    );
}


let selectedRow = null;
$(document).on("click", ".view-btn", function () {
    
    selectedRow = $(this).closest("tr"); 
    $("#staffModal").modal("show");
    $("#saveStaffBtn").hide();
    $("#removeStaffBtn").show();
    $("#updateStaffBtn").show();
    $("#currentField").show();
    // $('.fieldAssign').show();

    const id = selectedRow.find("#sId").text();  
    getStaffMember(id,(member)=>{
        $('#staffId').val(member.id)
        $('#firstName').val(member.firstName),
        $('#lastName').val(member.lastName),
        $('#designation').val(member.designation),
        $('#dob').val(member.dateOfBirth),
        $('#gender').val(member.gender),
        $('#joinedDate').val(member.joinedDate),
        $('#addressLine1').val(member.addressLine1),
        $('#addressLine2').val(member.addressLine2),
        $('#addressLine3').val(member.addressLine3),
        $('#addressLine4').val(member.addressLine4),
        $('#addressLine5').val(member.addressLine5),
        $('#contact').val(member.contactNo),
        $('#email').val(member.email),
        $('#role').val(member.role)
        $('.fieldAssign').hide();
        if(member.role == "OTHER"){
            if(member.designation != "Office_Assistant"){
                $('.fieldAssign').show();
                $("#field").val('')
                $("#field").val(member.fieldStaffDetailsPKs[0].fieldCode);
            }
        
        }

    });
    
});



// chooose designTION action
$('#chooseDesignation').on('change', function () {
    var designationType = $('#chooseDesignation').val()  
    if (designationType === 'ALL') { $('#staffTableBody tr td').show()}
    
    $("#staffTableBody tr").each(function() {
        var desig = $(this).find("td").eq(2).text(); 
        if( desig != designationType && designationType != 'ALL'){
            $(this).find("td").hide()
        } else {
            $(this).find("td").show()
        }
    });

});


$(document).on("click", "#addMember", function () {
    
    $("#staffModal").modal("show");
    $("#saveStaffBtn").show()
    $("#removeStaffBtn").hide()
    $("#updateStaffBtn").hide()
    
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

$('#designation').on('change', function () {
    var designationType = $('#designation').val()  
    if (designationType === 'ALL') { $('#staffTableBody tr td').show()}
    switch(designationType) {
        case "Senior_Technician":
            $('.fieldAssign').show();
            $('#role').val('OTHER');
          break;
        case "Technician":
            $('.fieldAssign').show();
            $('#role').val('OTHER');
          break;
        case "Supervisors":
            $('.fieldAssign').show()
            $('#role').val('OTHER')
          break;
        case "Labors":
            $('.fieldAssign').show()
            $('#role').val('OTHER')
          break;
        case "Office_Assistant":
            $('.fieldAssign').hide()
            $('#role').val('OTHER')
          break;
        case "Labors":
            $('.fieldAssign').hide()
            $('#role').val('OTHER')
          break;
        case "Manager":
            $('.fieldAssign').hide()
            $('#role').val('MANAGER')
          break;
        case "Senior_Assistant_Manager":
            $('.fieldAssign').hide()
            $('#role').val('MANAGER')  
          break;
        case "Assistant_Manager":
            $('.fieldAssign').hide()
            $('#role').val('MANAGER')  
          break;
        case "Senior_Agronomist":
            $('.fieldAssign').hide()
            $('#role').val('SCIENTIST')  
          break;  
        case "Agronomist":
            $('.fieldAssign').hide()
            $('#role').val('SCIENTIST')  
          break;
        case "Soil_scientist":
            $('.fieldAssign').hide()
            $('#role').val('SCIENTIST')  
          break;
        default:$('#role').val('ADMINISTRATIVE')
          
    }   

});

// Office_Assistant
// Senior_Agronomist
// Agronomist
// Soil_scientist
// Senior_Technician
// Technician
// Supervisors
// Labors

// ADMINISTRATIVE
// MANAGER
// SCIENTIST
// OTHER


// ADMINISTRATIVE,MANAGER,SCIENTIST,OTHER