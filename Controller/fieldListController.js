
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

// Save Field
saveFieldBtn.addEventListener('click', function () {

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
    
    
    
// Update Field
updateFieldBtn.addEventListener('click', function () {
    
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