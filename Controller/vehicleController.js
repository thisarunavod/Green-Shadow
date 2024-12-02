import { generateNewVehicleCode ,saveVehicle } from "../ControllerModel/vehicleModel.js"



$(document).ready(function(){
    generateNewVehicleCode((code) => {
        $("#vehicleCode").val(code); 
    });
});



$('#saveVehicleBtn').click(function (){ 
    saveVehicle(getVehicleObject()).then(()=>{
        alert("Vehicle Saved Successfully");
        // updateTableWithSaving(getStaffObject())
        // resetForms();
    }).catch((error) => { 
        console.error("Error:", error);
    });
    
});

function getVehicleObject(){
    const vehicle = {
        vehicleCode: $('#vehicleCode').val(),
        licensePlateNumber:$('#licensePlateNumber').val(),
        category:$('#category').val(),
        fuelType:$('#fuelType').val(),
        status:$('#status').val(),
        staffId:$('#staffId').val(),
        remarks:$('#remarks').val(),
    }

    return vehicle;
}