
import { getFieldData,updateField } from "../ControllerModel/fm.js";
import { saveCrop ,getAllCropDetails } from "../ControllerModel/cropModel.js";
const urlParams = new URLSearchParams(window.location.search);;
const fieldCode = urlParams.get('fieldCode');;


$(document).ready(function() {
  
  getFieldData(fieldCode,(field) => {
        
        $('#fecode').text(field.fieldCode)
        $('#fieldCode').val(field.fieldCode)
        
        $('#fename').text(field.fieldName)
        $('#fieldName').val(field.fieldName)
        
        $('#felocation').text(field.fieldLocation.x +","+field.fieldLocation.y)
        $('#fieldLocation').val(field.fieldLocation.x +","+field.fieldLocation.y)
        
        $('#fesize').text(field.extentSizeOfTheField)
        $('#fieldSize').val(field.extentSizeOfTheField)
        
        $('#fieldImageView .Image1').append(
            `<img src="data:image/jpeg;base64,${ field.fieldImage1 }"width="220" height="220">`
        );

        // Initialize with existing image
        const base64Prefix = "data:image/jpeg;base64,";
        
        const validBase64String1 = base64Prefix + field.fieldImage1;
        selectedImage1 = base64ToFile(validBase64String1, "image1.jpg");
        
        $('#fieldImageView .Image2').append(
          `<img src="data:image/jpeg;base64,${ field.fieldImage2 }" width="220" height="220">`
        );
        
        // Initialize with existing image
        const validBase64String2 = base64Prefix + field.fieldImage2;
        selectedImage2 = base64ToFile(validBase64String2, "image2.jpg");


        
   });
   getAllCropDetails()

});


function base64ToFile(base64String, filename) {
  // Decode the base64 string

    // Log the base64 string to debug
    console.log("Base64 String: ", base64String);

    // Check if the base64 string has the correct format
    if (!base64String.startsWith('data:image/jpeg;base64,')) {
        console.error("Invalid base64 string. It must start with 'data:image/jpeg;base64,'.");
        return null; // Return null if the string is invalid
    }

    // Extract base64 data part (after 'data:image/jpeg;base64,')
    const base64Data = base64String.split(',')[1];

    if (!base64Data) {
        console.error("Base64 data part is missing or empty.");
        return null; // If the base64 data part is missing, return null
    }

    // Try decoding the base64 string into bytes
    try {
        const byteCharacters = atob(base64Data); 
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
            const slice = byteCharacters.slice(offset, offset + 1024);
            const byteNumbers = new Array(slice.length);
            
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, {type: 'image/jpeg'}); // Adjust MIME type if needed
        const file = new File([blob], filename, {type: 'image/jpeg'}); // Adjust file name and MIME type
        return file;
    } catch (e) {
        console.error("Failed to decode base64 string: ", e);
        return null; // Return null if there is an error while decoding
    }
}


$('#saveField').click(function(){
  
  const fieldCode = $("#fieldCode").val();
  const fieldName = $("#fieldName").val();
  const fieldLocation = $("#fieldLocation").val();
  const [fieldLocationX, fieldLocationY] = fieldLocation.split(',').map(coord => parseFloat(coord.trim()));    
  const extentSizeOfTheField = $("#fieldSize").val();
  
  const updatedformData = new FormData();
  updatedformData.append('fieldName', fieldName);
  updatedformData.append('fieldLocationX', fieldLocationX);
  updatedformData.append('fieldLocationY', fieldLocationY);
  updatedformData.append('extentSizeOfTheField', extentSizeOfTheField);
  updatedformData.append('fieldImage1', selectedImage1);
  updatedformData.append('fieldImage2', selectedImage2);

  updateField(updatedformData,fieldCode)
  
});

let selectedImage1 ;
let selectedImage2 ;

$('#fieldImage1').on('change', function () {
    const file = this.files[0]; // Get the selected file
    if (file) {
        selectedImage1 = file; // Store the file in the variable  
        // console.log(selectedImage1) 
    }
});


$('#fieldImage2').on('change', function () {
    const file = this.files[0]; // Get the selected file
    if (file) {
      selectedImage2 = file; // Store the file in the variable  
    }
});





let selectedCropImage = null
$('#cropImage').on('change', function () {
  const file = this.files[0]; 
  if (file) {
    selectedCropImage = file; 
  } 
});

$('#editFormcropImage').on('change', function () {
  const file = this.files[0]; 
  if (file) {
    selectedCropImage = file; 
  } 
});


$('#addCrop').click(function () {
    
    const cropCode = $('#cropCode').val();
    const cropCommonName = $('#cropCommonName').val() 
    const cropScientificName =$('#cropScientificName').val()
    const cropCategory = $('#cropCategory').val()
    const cropSeason = $('#cropSeason').val()
    const cropImage = selectedCropImage;

    const cropFormData  = new FormData()
    cropFormData.append('cropCode',cropCode)
    cropFormData.append('cropCommonName',cropCommonName)
    cropFormData.append('cropScientificName',cropScientificName)
    cropFormData.append('cropCategory',cropCategory)
    cropFormData.append('cropSeason',cropSeason)
    cropFormData.append('filedCode',fieldCode)
    cropFormData.append('cropImage',cropImage)
    
    saveCrop(cropFormData)

    // let cropImageSrc = "";
    // if (cropImageInput.files.length > 0) {
    //   cropImageSrc = URL.createObjectURL(cropImageInput.files[0]);
    // }

    // const tableBody = document.getElementById("cropTableBody");
    // const row = `
    //     <tr>
    //         <td>${cropCode}</td>
    //         <td>${cropCommonName}</td>
    //         <td>${cropScientificName}</td>
    //         <td>${cropCategory}</td>
    //         <td>${cropSeason}</td>
    //         <td><img src="${cropImageSrc}" alt="Crop Image" width="50" height="50"></td>
    //     </tr>
    // `;
    // tableBody.insertAdjacentHTML("beforeend", row);
    // document.getElementById("cropForm").reset();
  });
  

  // function addVehicle() {
    // const vehicleType = document.getElementById("vehicleType").value;
    // const vehicleCode = document.getElementById("vehicleCode").value;
    // const vehicleImageInput = document.getElementById("vehicleImage");

    // let vehicleImageSrc = "";
    // if (vehicleImageInput.files.length > 0) {
    //   vehicleImageSrc = URL.createObjectURL(vehicleImageInput.files[0]);
    // }

    // const tableBody = document.getElementById("vehicleTableBody");
    // const row = `
    //     <tr>
    //         <td>${vehicleType}</td>
    //         <td>${vehicleCode}</td>
    //         <td><img src="${vehicleImageSrc}" alt="Vehicle Image" width="50" height="50"></td>
    //     </tr>
    // `;
    // tableBody.insertAdjacentHTML("beforeend", row);
    // document.getElementById("vehicleForm").reset();
  // }


  $(document).on("click", ".view-btn", function () {
    
    const row = $(this).closest("tr");
    const cropCode = row.find("#crCode").text();
    const cropCommonName = row.find("td:nth-child(2)").text();
    const cropScientificName = row.find("td:nth-child(3)").text();
    const cropCategory = row.find("td:nth-child(4)").text();
    const cropSeason = row.find("td:nth-child(5)").text();
    const cropImage = row.find('img').attr('src')
    selectedCropImage = base64ToFile(cropImage,"image3.jpg") 
    
    console.log(selectedCropImage)
    
    $("#editFormcropCode").val(cropCode);
    $("#editFormcropCommonName").val(cropCommonName);
    $("#editFormcropScientificName").val(cropScientificName);
    $("#editFormcropCategory").val(cropCategory);
    $("#editFormcropSeason").val(cropSeason);
    

    // Show the modal
    $("#editCropModal").modal("show");
});

$('#saveCropChanges').click( function(){
    
});
