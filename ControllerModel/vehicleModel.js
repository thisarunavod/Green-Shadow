import { getAllStaffMembers} from "../ControllerModel/staffModel.js"


export function generateNewVehicleCode(callback) {
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
  
    http.open("GET", "http://localhost:8080/greenShadow/api/v1/vehicle", true);
    http.setRequestHeader("Content-Type", "application/json");
    http.send();
  }
  
  
  
export function saveVehicle(vehicleObj){
    console.log(vehicleObj)
    const vehicleObjJSON = JSON.stringify(vehicleObj)
    return new Promise((resolve,reject)=>{
        const http = new XMLHttpRequest();
        http.onreadystatechange = () => {
            if (http.readyState === 4) {
                if (http.status === 201) {
                    resolve();
                } else {
                console.error("Failed");
                console.error("Status", http.status);
                console.error("Ready State", http.readyState);
                reject(new Error("Failed to update crop with status: " + http.status));
                }
            }
        };
    
        http.open("POST", "http://localhost:8080/greenShadow/api/v1/vehicle", true);
        http.setRequestHeader("Content-Type","application/json");
        http.send(vehicleObjJSON);
    });
}
  
export function getAllVehicles(){
    const http = new XMLHttpRequest();
    http.onreadystatechange = () => {
        if (http.readyState === 4) {
        if (http.status === 200) {
            const vehicleList = JSON.parse(http.responseText);
            vehicleList.forEach((vehicle) => {
                var staffId = vehicle.staffId;
                if( staffId === null) {staffId = 'NOT_ASSIGNED';}
                $("#vehicleTableBody").append(
                    `<tr class="vehicleDetails">
                        <td id = "vCode">${vehicle.vehicleCode}</td>
                        <td>${vehicle.licensePlateNumber}</td>
                        <td>${vehicle.category}</td>
                        <td>${vehicle.fuelType}</td>
                        <td>${vehicle.status}</td>
                        <td>${staffId}</td>
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
    http.open( "GET", "http://localhost:8080/greenShadow/api/v1/vehicle/allVehicles", true );
    http.send();
}

  export function getVehicle(vehicleCode,setValues){
    return new Promise((resolve,reject)=>{
      const http = new XMLHttpRequest();
      http.onreadystatechange = () => {
        if (http.readyState === 4) {
          if (http.status === 200) {
              const vehicle = JSON.parse(http.responseText)
              console.log(vehicle)
              setValues(vehicle)
              resolve();
          } else {
            console.error("Failed");
            console.error("Status", http.status);
            console.error("Ready State", http.readyState);
            reject(new Error("Failed to update crop with status: " + http.status));
          }
        }
      };
  
      http.open("GET", "http://localhost:8080/greenShadow/api/v1/vehicle/"+vehicleCode, true);
      http.setRequestHeader("Content-Type","application/json");
      http.send();
    });
  }
  
  export function updateVehicle(vehicleObj){
      console.log(vehicleObj)
      const vehicleObjJSON = JSON.stringify(vehicleObj)
      return new Promise((resolve,reject)=>{
          const http = new XMLHttpRequest();
          http.onreadystatechange = () => {
            if (http.readyState === 4) {
              if (http.status === 204) {
                  resolve();
              } else {
                console.error("Failed");
                console.error("Status", http.status);
                console.error("Ready State", http.readyState);
                reject(new Error("Failed to update Staff Member with status: " + http.status));
              }
            }
          };
      
          http.open("PATCH", "http://localhost:8080/greenShadow/api/v1/vehicle/"+vehicleObj.vehicleCode, true);
          http.setRequestHeader("Content-Type","application/json");
          http.send(vehicleObjJSON);
      });
  }
  
  export function deleteVehicle(vehicleCode){

    return new Promise((resolve, reject) => {
      const http = new XMLHttpRequest();
      http.onreadystatechange = () => {
        if (http.readyState === 4) {
          if (http.status === 204) {
            resolve(); // Resolve the promise on success
          } else {
            console.error("Failed");
            console.error("Status", http.status);
            console.error("Ready State", http.readyState);
            reject(new Error("Failed to delete Staff member with status: " + http.status)); // Reject the promise on failure
          }
        }
      };
      http.open("DELETE", "http://localhost:8080/greenShadow/api/v1/vehicle/"+vehicleCode, true);
      http.send();
    });
  } 



  export function loadStaffIds(){
       
      getAllStaffMembers((staffList) => {
          staffList.forEach((staff)=>{
            $('#loadStaffId').append(
              ` <option value="${staff.id}"> (${staff.id +")-->"+staff.firstName+"-->"+staff.designation}</option>
              `
            );
          });
       });

  }       
  // }<td>${staffId}</td>