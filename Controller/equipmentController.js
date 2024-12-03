import { generateNewEquipmentId,getAllEquipment,getEquipment,saveEquipment,loadAvailableStaffIds,loadAvailableFieldCodes } from "../ControllerModel/equipmentModel.js"


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
    if(equipment.staffId === null) equipment.staffId ="N/A"
    if(equipment.fieldCode === null) equipment.fieldCode ="N/A"
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

let selectedRow = null;
$(document).on("click", ".view-btn", function () {
    
    selectedRow = $(this).closest("tr"); 
    $("#equipmentModal").modal("show");
    $("#saveEquipmentBtn").hide()
    $("#updateEquipmentBtn").show()
    $("#removeEquipmentBtn").show()
    loadAvailableFieldCodes();
    loadAvailableStaffIds();
    const equipmentId = selectedRow.find("#eId").text();  
    getEquipment(equipmentId,(equipment)=>{
        $('#equipmentId').val(equipment.equipmentId)
        $('#equipmentName').val(equipment.name),
        $('#equipmentType').val(equipment.type),
        $('#equipmentStatus').val(equipment.status),
        $('#assignedStaff').val(equipment.staffId),
        $('#assignedField').val(equipment.fieldCode)
    });
    
});
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



