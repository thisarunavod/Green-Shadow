

export function saveCrop(crop){
    console.log(crop.get('fieldCode'));
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


export function getAllCropDetails(){
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
    http.open( "GET", "http://localhost:8080/greenShadow/api/v1/crop/getAllCrops", true );
    http.send();
}