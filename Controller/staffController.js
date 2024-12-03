import {
    saveStaffMember,
    generateNewStaffId,
    getAllStaffMembers,
    getStaffMember ,
    updateStaffMember,
    deleteStaffMember
} from "../ControllerModel/staffModel.js"

$(document).ready(function(){
    
    getAllStaffMembers((staffList) => {});
    
    generateNewStaffId((id) => {
        $("#staffId").val(id); 
    });

    // getAllStaffMembers();
});

$("#addMember").click(function(){
    resetForms();
});


$('#saveStaffBtn').click( function(){
    
    saveStaffMember(getStaffObject()).then(()=>{
        alert("Staff Member Added Successfully");
        updateTableWithSaving(getStaffObject())
        resetForms();
        
    }).catch((error) => { 
        console.error("Error:", error);
    });

});

$('#updateStaffBtn').click( function (){
    const member = getStaffObject();
    updateStaffMember(member).then(()=>{
        alert("Staff Member Added Successfully");
        updateTableWithUpdateProcess(member)
        resetForms();
        $("#staffModal").modal("hide");
    }).catch((error) => { 
        console.error("Error:", error);
    });
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
    $("#saveStaffBtn").hide()
    $("#removeStaffBtn").show()
    $("#updateStaffBtn").show()

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
