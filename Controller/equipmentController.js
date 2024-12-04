import { generateNewEquipmentId,getAllEquipment,getEquipment,saveEquipment,updateEquipment,loadAvailableFieldCodes } from "../ControllerModel/equipmentModel.js"


$(document).ready(function(){
    
    generateNewEquipmentId((equipmentId) => {
        $("#equipmentId").val(equipmentId); 
    });
    
    getAllEquipment((equipmentList)=>{});
    // loadAvailableStaffIds();
    loadAvailableFieldCodes();
});


$("#addEquipment").click(function(){
    
    resetForms();
    // loadAvailableFieldCodes();
    $("#saveEquipmentBtn").show();
    $("#updateEquipmentBtn").hide();
    $("#removeEquipmentBtn").hide();
    $("#currentField").hide();

});


$('#saveEquipmentBtn').click(function (){ 
    
    const equipment = getEquipmentObject();
    saveEquipment(equipment).then(()=>{
        alert("Vehicle Saved Successfully");
        updateTableWithSaveEquipment(equipment);
        resetForms();
    }).catch((error) => { 
        console.error("Error:", error);
    });
    
});

$("#updateEquipmentBtn").click(function(){
    const equipment = getEquipmentObject();
    updateEquipment(equipment).then(()=>{
        alert("Equipoment Updated Successfully");
        updateEquipmentTableWithUpdateProcess(equipment);
        $("#equipmentModal").modal("hide");
    }).catch((error) => { 
        console.error("Error:", error);
    });
});

function updateEquipmentTableWithUpdateProcess(equipment){
    selectedRow.find("td:nth-child(1)").text(equipment.equipmentId);
    selectedRow.find("td:nth-child(2)").text(equipment.name);
    selectedRow.find("td:nth-child(3)").text(equipment.type);
    selectedRow.find("td:nth-child(4)").text(equipment.status);
    selectedRow.find("td:nth-child(5)").text(equipment.staffId);
    selectedRow.find("td:nth-child(6)").text(equipment.fieldCode);
}

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
    $("#currentField").show();
    // loadAvailableFieldCodes();
    // loadAvailableStaffIds();
    const equipmentId = selectedRow.find("#eId").text();  
    getEquipment(equipmentId,(equipment)=>{
        $('#equipmentId').val(equipment.equipmentId)
        $('#equipmentName').val(equipment.name),
        $('#equipmentType').val(equipment.type),
        // if(equipment.status === "")
        $('#equipmentStatus').val(equipment.status),
        // $('#assignedStaff').val(equipment.staffId),
        $('#assignedField').val(equipment.fieldCode)
    });
    
});
function resetForms(){
    generateNewEquipmentId((id) => {
        $("#equipmentId").val(id); 
    });
    $('#equipmentId').val('');
    $('#equipmentName').val('');
    $('#equipmentType').val('');
    $('#equipmentStatus').val('AVAILABLE');
    $('#assignedField').val('');    
    // $('#assignedStaff').val('')

}


function getEquipmentObject(){
    const equipment = {
        equipmentId: $('#equipmentId').val(),
        name:        $('#equipmentName').val(),
        type:        $('#equipmentType').val(),
        status:      $('#equipmentStatus').val(),
        staffId:     "N/A",
        fieldCode:   $('#assignedField').val()
    }
    return equipment;
}

