import { generateNewVehicleCode,
         getAllVehicles ,
         loadStaffIds ,
         saveVehicle ,
         getVehicle,
         updateVehicle,
         deleteVehicle
} from "../ControllerModel/vehicleModel.js"



$(document).ready(function(){
    loadStaffIds();
    generateNewVehicleCode((code) => {
        $("#vehicleCode").val(code); 
    });
    getAllVehicles();
});

$("#addVehicle").click(function(){
    loadStaffIds();
    $("#updateVehicleBtn").hide()
    $("#removeVehicleBtn").hide()
});


function validForms(){

    let isValid = true;
    
    var licensePlateNumber =  document.getElementById("licensePlateNumber")
    var category =  document.getElementById("category")
    var fuelType =  document.getElementById("fuelType")
    var loadStaffId = document.getElementById("loadStaffId")
    var status = document.getElementById("status")

    
    var regex = /^[A-Z0-9-]{1,10}$/; // for names
    


    if (!licensePlateNumber.value) {
        isValid = false;
        licensePlateNumber.classList.add("is-invalid");
    } else if (!regex.test(licensePlateNumber.value.trim())) { 
        isValid = false;
        licensePlateNumber.classList.add("is-invalid");
        console.log("Regex failed for:", licensePlateNumber.value);
    } else {
        licensePlateNumber.classList.remove("is-invalid");
        licensePlateNumber.classList.add("is-valid");
    }

    return isValid
}

document.getElementById("saveVehicleBtn").addEventListener("click", (event) => {
    event.preventDefault();
    if(validForms()) { 
        console.log("OK OK")
        saveVehicle(getVehicleObject()).then(()=>{
            alert("Vehicle Saved Successfully");
            updateTableWithSave(getVehicleObject())
            resetForms();
            $("#vehicleModal").modal("hide");
        }).catch((error) => { 
            console.error("Error:", error);
        });
        
    };
});

// $('#saveVehicleBtn').click(function (){ 

    //     console.log($('#loadStaffId').val())
    //     saveVehicle(getVehicleObject()).then(()=>{
    //         alert("Vehicle Saved Successfully");
    //         // updateTableWithSaving(getStaffObject())
    //         updateTableWithSave(getVehicleObject())
    //         resetForms();
    //         $("#vehicleModal").modal("hide");
    //     }).catch((error) => { 
    //         console.error("Error:", error);
    //     });
// });

function updateTableWithSave(vehicle){
    
    $("#vehicleTableBody").append(
        `<tr class="vehicleDetails">
            <td id = "vCode">${vehicle.vehicleCode}</td>
            <td>${vehicle.licensePlateNumber}</td>
            <td>${vehicle.category}</td>
            <td>${vehicle.fuelType}</td>
            <td>${vehicle.status}</td>
            <td>${vehicle.staffId}</td>
            <td> <button class="btn btn-success view-btn">Edit</button></td>
        </tr>`
    );
}

let selectedRow = null;
$(document).on("click", ".view-btn", function () {
    
    
    selectedRow = $(this).closest("tr"); 
    $("#vehicleModal").modal("show");
    $("#saveVehicleBtn").hide()
    $("#updateVehicleBtn").show()
    $("#removeVehicleBtn").show()
    loadStaffIds()
    const vehicleCode = selectedRow.find("#vCode").text();  
    getVehicle(vehicleCode,(vehicle)=>{
        $('#vehicleCode').val(vehicle.vehicleCode)
        $('#licensePlateNumber').val(vehicle.licensePlateNumber),
        $('#category').val(vehicle.category),
        $('#fuelType').val(vehicle.fuelType),
        $('#loadStaffId').val(vehicle.staffId),
        $('#status').val(vehicle.status),
        $('#remarks').val(vehicle.remarks)
    });
    
});

$("#updateVehicleBtn").click(function(){
    if(validForms()){
        const vehicle = getVehicleObject();
        updateVehicle(vehicle).then(()=>{
            alert("Vehicle Updated Successfully");
            updateVehicleTableWithUpdateProcess(vehicle)
            resetForms();
            $("#vehicleModal").modal("hide");
        }).catch((error) => { 
            console.error("Error:", error);
        });
    }

});

$("#removeVehicleBtn").click(function(){

    let deleteVehicleCode = selectedRow.find("#vCode").text() 
    deleteVehicle(deleteVehicleCode).then(()=>{
        alert("Staff Member Added Successfully");
        selectedRow.remove();
        resetForms();
        $("#vehicleModal").modal("hide");
    }).catch((error) => { 
        console.error("Error:", error);
    });

});

function updateVehicleTableWithUpdateProcess(vehicle){
    
    selectedRow.find("td:nth-child(1)").text(vehicle.vehicleCode);
    selectedRow.find("td:nth-child(2)").text(vehicle.licensePlateNumber);
    selectedRow.find("td:nth-child(3)").text(vehicle.category);
    selectedRow.find("td:nth-child(4)").text(vehicle.fuelType);
    selectedRow.find("td:nth-child(5)").text(vehicle.status);
    selectedRow.find("td:nth-child(6)").text(vehicle.staffId);

}



$('#loadStaffId').on('change', function () {
    var staffId = $('#loadStaffId').val()
    if(staffId === "NOT_ASSIGNED"){
        $("#optInService").hide()
    } else { $("#optInService").show()}
});

function getVehicleObject(){
    const vehicle = {
        vehicleCode: $('#vehicleCode').val(),
        licensePlateNumber:$('#licensePlateNumber').val(),
        category:$('#category').val(),
        fuelType:$('#fuelType').val(),
        status:  $('#status').val(),
        staffId: $('#loadStaffId').val(),
        remarks: $('#remarks').val(),
    }
    return vehicle;
}


function resetForms(){
    generateNewVehicleCode((code) => {
        $("#vehicleCode").val(code); 
    });
    $('#licensePlateNumber').val(''),
    $('#category').val(''),
    $('#fuelType').val(''),
    $('#status').val(''),
    $('#staffId').val(''),
    $('#remarks').val('')    
}


$('#chooseCategory').on('change', function () {
    var category = $('#chooseCategory').val()  
    console.log(category)
    if (category === 'ALL') { $('#vehicleTableBody tr td').show()}
    
    $("#vehicleTableBody tr").each(function() {
        var ctype = $(this).find("td").eq(2).text(); 
        if( ctype != category && category != 'ALL'){
            $(this).find("td").hide()
        } else {
            $(this).find("td").show()
        }
    });
});