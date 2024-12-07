
import { saveField , generateNewFieldCode,getAllFields } from "../ControllerModel/fm.js";
$(document).ready(function(){
    generateNewFieldCode((code) => {
        $("#fieldCode").val(code); 
    });
    getAllFields((fields)=>{});
});


const fieldForm = document.getElementById('fieldForm');
const saveFieldBtn = document.getElementById('saveField');
const updateFieldBtn = document.getElementById('updateField');
const tableBody = document.getElementById('fieldTableBody');
let selectedRow = null;


function valiForms(){
    
    let isValid = true;
    
    var fieldName =  document.getElementById("fieldName")
    var fieldLocation = document.getElementById("fieldLocation")
    var extentSize =  document.getElementById("extentSize")
    var fieldImage1 = document.getElementById("fieldImage1")
    var fieldImage2 = document.getElementById("fieldImage2")
    var regexfieldName = /^[A-Za-z0-9\- ]+$/; ; // for names
    var regexSize = /^\d+(\.\d+)?$/
    var regexPoint = /^(\(\s*-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?\s*\)|-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?)$/
 
    if (!fieldImage2.value) {
        isValid = false;
        fieldImage2.classList.add("is-invalid");
    }else{
        fieldImage2.classList.remove("is-invalid");
        fieldImage2.classList.add("is-valid");
    }

    if (!fieldImage1.value) {
        isValid = false;
        fieldImage1.classList.add("is-invalid");
    }else{
        fieldImage1.classList.remove("is-invalid");
        fieldImage1.classList.add("is-valid");
    }

    if (!extentSize.value) {
        isValid = false;
        extentSize.classList.add("is-invalid");
    } else if (!regexSize.test(extentSize.value.trim())) { 
        isValid = false;
        extentSize.classList.add("is-invalid");
    } else {
        extentSize.classList.remove("is-invalid");
        extentSize.classList.add("is-valid");
    }

    if (!fieldName.value) {
        isValid = false;
        fieldName.classList.add("is-invalid");
    } else if (!regexfieldName.test(fieldName.value.trim())) { 
        isValid = false;
        fieldName.classList.add("is-invalid");
    } else {
        fieldName.classList.remove("is-invalid");
        fieldName.classList.add("is-valid");
    }

    if (!fieldLocation.value) {
        isValid = false;
        fieldLocation.classList.add("is-invalid");
    } else if (!regexPoint.test(fieldLocation.value.trim())) { 
        isValid = false;
        fieldLocation.classList.add("is-invalid");
    } else {
        fieldLocation.classList.remove("is-invalid");
        fieldLocation.classList.add("is-valid");
    }

    return isValid;
}


// Save Field
saveFieldBtn.addEventListener('click', function () {
    if(valiForms()){
            
        const fieldCode =  $("#fieldCode").val();
        const fieldName =  $("#fieldName").val();
        const fieldLocation =  $("#fieldLocation").val();
        const [fieldLocationX, fieldLocationY] = fieldLocation.split(',').map(coord => parseFloat(coord.trim()));    
        const extentSizeOfTheField =  $("#extentSize").val();
        const fieldImage1 = selectedImage1;
        const fieldImage2 = selectedImage2;
    
        const formData = new FormData();
        formData.append('fieldCode',fieldCode)
        formData.append('fieldName',fieldName)
        formData.append('fieldLocationX',fieldLocationX)
        formData.append('fieldLocationY',fieldLocationY)
        formData.append('extentSizeOfTheField',extentSizeOfTheField)
        formData.append('fieldImage1',fieldImage1)
        formData.append('fieldImage2',fieldImage2)
    
        saveField(formData);
    }


});

let selectedImage1 = null;

$('#fieldImage1').on('change', function () {
    const file = this.files[0]; // Get the selected file
    if (file) {
        selectedImage1 = file; // Store the file in the variable
        
        // console.log("Selected Image:", selectedImage1);
        // console.log("File Name:", selectedImage1.name);
        // console.log("File Size (bytes):", selectedImage1.size);
        // console.log("File Type:", selectedImage1.type);
        
        // Example: If needed, read the file for further processing
        // const reader = new FileReader();
        // reader.onload = function (e) {
            //     console.log("File Content (Data URL):", e.target.result);
            // };
            // reader.readAsDataURL(selectedImage);
    } else {
        console.log("No file selected.");
        selectedImage1 = null; // Reset the variable if no file is selected
    }
});
    
let selectedImage2 = null;
$('#fieldImage2').on('change', function () {
    const file = this.files[0]; // Get the selected file
    if (file) {
        selectedImage2 = file; // Store the file in the variable
    } else {
        console.log("No file selected.");
        selectedImage2 = null; // Reset the variable if no file is selected
    }
});
    
    
    


tableBody.addEventListener('click', function (e) {
    if (e.target.classList.contains('view-btn')) {

        const row = e.target.closest('tr'); // Find the closest table row
        const fieldCode = row.querySelector('#fcode').textContent.trim(); // Adjust selector to target the fieldCode cell

        // Redirect with fieldCode as a query parameter
        window.location.href = `field.html?fieldCode=${encodeURIComponent(fieldCode)}`;
        // window.location.href = `field.html`;
    }
});

$('#fieldTableBody').on('click', 'tr', function(){
    // let fieldCode = $(this).children('td:eq(0)').text();
    
      $("#fieldCode").val($(this).children('td:eq(0)').text());
      $("#fieldName").val($(this).children('td:eq(1)').text());
      $("#fieldLocation").val($(this).children('td:eq(2)').text());
      $("#extentSize").val($(this).children('td:eq(3)').text());
      
});

$('#fieldTableBody').on('click', 'tr', function () {
    const imageSrc = $(this).children('td:eq(4)').find('img').attr('src');
    if (imageSrc) {
        $('#fieldImage1').attr('src', imageSrc).show(); // Update an <img> for preview
    } else {
        $('#fieldImage1').hide(); // Hide if no image exists
    }
});