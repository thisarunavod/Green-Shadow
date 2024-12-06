export function generateNewCropCode(callback) {
  const http = new XMLHttpRequest();
  http.onreadystatechange = () => {
    if (http.readyState === 4) {
      if (http.status === 200) {
        callback(http.responseText); // Pass the response to the callback
      } else {
        console.error("Failed");
        console.error("Status", http.status);
        console.error("Ready State", http.readyState);
        console.error("Failed with Status:", http.status);
      }
    }
  };

  http.open("GET", "http://localhost:8080/greenShadow/api/v1/crop", true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send();
}


export function saveCrop(crop){
    const http = new XMLHttpRequest();
    http.onreadystatechange = () => {
      if (http.readyState === 4) {
        if (http.status === 201) {
          alert("Crop Added Successfully");
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
  
    http.open("POST", "http://localhost:8080/greenShadow/api/v1/crop", true);
    http.send(crop);
}
    

export function getAllCropDetails(fieldCode){
    const http = new XMLHttpRequest();
    http.onreadystatechange = () => {
      if (http.readyState === 4) {
        if (http.status === 200) {
          const cropList = JSON.parse(http.responseText);
          cropList.forEach((crop) => {
            $("#cropTableBody").append(
                `<tr class="cropDetails">
                    <td id = "crCode">${crop.cropCode}</td>
                    <td>${crop.cropCommonName}</td>
                    <td>${crop.cropScientificName}</td>
                    <td>${crop.cropCategory}</td>
                    <td>${crop.cropSeason}</td>
                    <td><img src="data:image/jpeg;base64,${ crop.cropImage }" width="100" height="50"></td>
                    <td> <button class="btn btn-success view-btn">Edit</button></td>
                </tr>`
            );
          });
        } else {
          console.error("Failed");
          console.error("Status", http.status);
          console.error("Ready State", http.readyState);
          console.error("Failed with Status:", http.status);
        }
      }
    };
    http.open( "GET", "http://localhost:8080/greenShadow/api/v1/crop/getAllCropsByField/"+fieldCode, true );
    http.send();
}



export function updateCrop(cropFormData , cropCode){
    return new Promise((resolve,reject)=>{
      const http = new XMLHttpRequest();
      http.onreadystatechange = () => {
        if (http.readyState === 4) {
          if (http.status === 204) {
            alert("Crop Details Updated Successfully");
            resolve();          
          } else {
            console.error("Failed");
            console.error("Status", http.status);
            console.error("Ready State", http.readyState);
            reject(new Error("Failed to update crop with status: " + http.status));
          }
        }
      };
  
      http.open("PATCH", "http://localhost:8080/greenShadow/api/v1/crop/"+cropCode, true);
      http.send(cropFormData);
    })
}

export function deleteCrop(cropCode) {
  return new Promise((resolve, reject) => {
    const http = new XMLHttpRequest();
    http.onreadystatechange = () => {
      if (http.readyState === 4) {
        if (http.status === 204) {
          alert("Crop Removed Successfully");
          resolve(); // Resolve the promise on success
        } else {
          console.error("Failed");
          console.error("Status", http.status);
          console.error("Ready State", http.readyState);
          reject(new Error("Failed to delete crop with status: " + http.status)); // Reject the promise on failure
        }
      }
    };
    http.open("DELETE", "http://localhost:8080/greenShadow/api/v1/crop/" + cropCode, true);
    http.send();
  });
}

