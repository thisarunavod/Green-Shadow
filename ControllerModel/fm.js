export function generateNewFieldCode(callback) {
  const http = new XMLHttpRequest();
  http.onreadystatechange = () => {
    if (http.readyState === 4) {
      if (http.status === 200) {
        // console.log("Response:", http.responseText);
        callback(http.responseText); // Pass the response to the callback
      } else {
        console.error("Failed");
        console.error("Status", http.status);
        console.error("Ready State", http.readyState);
        console.error("Failed with Status:", http.status);
      }
    }
  };

  http.open("GET", "http://localhost:8080/greenShadow/api/v1/field", true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send();
}

export function saveField(formData) {
  console.log(formData);
  const http = new XMLHttpRequest();
  http.onreadystatechange = () => {
    if (http.readyState === 4) {
      if (http.status === 201) {
        alert("Field added successfully");
      } else {
        console.error("Failed");
        console.error("Status", http.status);
        console.error("Ready State", http.readyState);
        console.error("Failed with Status:", http.status);
      }
    }
  };

  http.open("POST", "http://localhost:8080/greenShadow/api/v1/field", true);
  http.send(formData);
}


export function getFieldData(fieldCode,setFieldValues){
  
  const http = new XMLHttpRequest();
    http.onreadystatechange = () => {
      if (http.readyState === 4) {
        if (http.status === 200) {
            
          const field = JSON.parse(http.responseText);
          // console.log(field.fieldImage1)
          setFieldValues(field)

        } else {
          console.error("Failed");
          console.error("Status", http.status);
          console.error("Ready State", http.readyState);
          console.error("Failed with Status:", http.status);
        }
      }
    };

    http.open("GET", "http://localhost:8080/greenShadow/api/v1/field/"+fieldCode, true);
    http.setRequestHeader("Content-Type", "application/json");
    http.send();
}

export function getAllFields(callBack) {
  const http = new XMLHttpRequest();
  http.onreadystatechange = () => {
    if (http.readyState === 4) {
      if (http.status === 200) {
        const fields = JSON.parse(http.responseText);
        fields.forEach((field) => {
          $("#fieldTableBody").append(
              `<tr class="fieldDetails">
              
                  <td id = "fcode">${field.fieldCode || "N/A"}</td>
                  <td>${field.fieldName}</td>
                  <td>${field.fieldLocation.x},${field.fieldLocation.y}</td>
                  <td>${field.extentSizeOfTheField}</td>
                  <td><img src="data:image/jpeg;base64,${field.fieldImage1}" width="50" height="50"></td>
                  <td><img src="data:image/jpeg;base64,${ field.fieldImage2 }" width="50" height="50"></td>
                  <td> <button class="btn btn-success view-btn" data-id="${ field.fieldCode}" onclick="myFunction()><i class="bi bi-eye"></i>View</button></td>
              </tr>`
          );
        });
        callBack(fields)
      } else {
        console.error("Failed");
        console.error("Status", http.status);
        console.error("Ready State", http.readyState);
        console.error("Failed with Status:", http.status);
      }
    }
  };
  http.open(
    "GET",
    "http://localhost:8080/greenShadow/api/v1/field/getAllFields",
    true
  );
  http.send();
}


export function updateField(updateFormData,fieldCode){
      
  console.log(updateFormData.get('fieldImage1'));
  const http = new XMLHttpRequest();
  http.onreadystatechange = () => {
    if (http.readyState === 4) {
      if (http.status === 204) {
          alert("Field Details Updated successfully");
          setTimeout(() => {
            location.reload();
          }, 500);
      } else {
        console.error("Failed");
        console.error("Status", http.status);
        console.error("Ready State", http.readyState);
        console.error("Failed with Status:", http.status);
      }
    }
  };

  http.open("PATCH" , "http://localhost:8080/greenShadow/api/v1/field/"+ fieldCode, true);
  http.send(updateFormData); 
}