import { generateNewEquipmentId,getAllEquipment,saveEquipment,loadAvailableStaffIds,loadAvailableFieldCodes } from "../ControllerModel/equipmentModel.js"


$(document).ready(function(){
    // loadStaffIds();
    generateNewEquipmentId((equipmentId) => {
        $("#equipmentId").val(equipmentId); 
    });
    
    getAllEquipment((equipmentList)=>{});
    loadAvailableStaffIds();
    loadAvailableFieldCodes();
});


$("#addEquipment").click(function(){
    resetForms();
    $("#updateEquipmentBtn").hide()
    $("#removeEquipmentBtn").hide()
});


$('#saveEquipmentBtn').click(function (){ 
    
    const equipment = getEquipmentObject();
    saveEquipment(equipment).then(()=>{
        alert("Vehicle Saved Successfully");
        updateTableWithSaveEquipment(equipment)
        resetForms();
    }).catch((error) => { 
        console.error("Error:", error);
    });
    
});

function updateTableWithSaveEquipment(equipment){
    $("#equipmentTableBody").append(
        `<tr class="equipmentDetails">
            <td id = "eId">${equipment.equipmentId}</td>
            <td>${equipment.name}</td>
            <td>${equipment.type}</td>
            <td>${equipment.status}</td>
            <td>${equipment.staffId}</td>
            <td>${equipment.fieldCode}</td>
            <td> <button class="btn btn-success view-btn">Edit</button></td>
        </tr>
        `
    );
}

function resetForms(){
    generateNewEquipmentId((id) => {
        $("#equipmentId").val(id); 
    });
    $('#equipmentId').val(''),
    $('#equipmentName').val(''),
    $('#equipmentType').val(''),
    $('#equipmentStatus').val(''),
    $('#assignedStaff').val('')
    $('#assignedField').val('')    

}


function getEquipmentObject(){
    const equipment = {
        equipmentId: $('#equipmentId').val(),
        name:        $('#equipmentName').val(),
        type:        $('#equipmentType').val(),
        status:      $('#equipmentStatus').val(),
        staffId:     $('#assignedStaff').val(),
        fieldCode:   $('#assignedField').val(),
    }
    return equipment;
}



