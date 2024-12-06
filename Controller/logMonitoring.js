import { generateNewLogCode, getAllFeildsCodes , getAllCropCodes ,getAllStaffMemberIDs} from "../ControllerModel/logMonitoringModel.js"



$(document).ready(function(){
    
    generateNewLogCode((newlogCode) => {
        $("#logCode").val(newlogCode); 
    });
    getAllFeildsCodes((fieldCodesList)=>{
        let list = fieldCodesList
        
        list.forEach(fieldCode => {
            $("#fieldSelect").append(
                ` <option value="${fieldCode}">${fieldCode}</option>
                `
            );
        });
    });
    
    getAllCropCodes((cropCodesList)=>{
        let list = cropCodesList
        list.forEach(cropCode => {
            $("#cropSelect").append(
                ` <option value="${cropCode}">${cropCode}</option>
                `
            );
        });
    });

    getAllStaffMemberIDs((staffIDList)=>{
        let list = staffIDList
        list.forEach(staffID => {
            $("#staffSelect").append(
                ` <option value="${staffID }">${staffID }</option>
                `
            );
        });
    });
    
});



let fieldList =[];
$('#fieldSelect').on('change', function () {
    let fieldCode = $("#fieldSelect").val();
    if  (!fieldList.includes(fieldCode)) {
        fieldList.push(fieldCode)
    }
    $("#selectedFieldValue").text(fieldList);
    // console.log($("#selectedFieldValue").val());
});


$("#clearFieldSelection").click(function (){
    fieldList=[];
    $("#selectedFieldValue").text('');
});


let cropList =[];
$('#cropSelect').on('change', function () {
    console.log("awaaa");
    let cropCode = $("#cropSelect").val();
    console.log(cropCode);    
    if(!cropList.includes(cropCode)) {
        cropList.push(cropCode)
    }
    $("#selectedCropValue").text(cropList);
    
});


$("#clearCropsSelection").click(function (){
    cropList=[];
    $("#selectedCropValue").text('');
});

let staffList =[];
$('#staffSelect').on('change', function () {
    
    let staffID = $("#staffSelect").val();    
    if(!staffList.includes(staffID)) {
        staffList.push(staffID)
    }
    $("#selectedStaffValue").text(staffList);
    
});


$("#clearStaffSelection").click(function (){
    staffList=[];
    $("#selectedStaffValue").text('');
});


document.getElementById("saveLogBtn").addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission
  
    if(validateForm()){
        console.log("thisaru");
    };

});
  
function validateForm(){
    const logDate = document.getElementById("logDate");
    const logDetails = document.getElementById("logDetails");
    const observedImage = document.getElementById("observedImage");

    let isValid = true;


    if (!logDate.value) {
        isValid = false;
        logDate.classList.add("is-invalid");
    } else {
        logDate.classList.remove("is-invalid");
    }


    
    


    if (!observedImage.files || observedImage.files.length === 0) {
        isValid = false;
        observedImage.classList.add("is-invalid");
    } else {
        observedImage.classList.remove("is-invalid");
    }

    return isValid;

}