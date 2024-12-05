import { getAllFields } from "../ControllerModel/fm.js"

export function generateNewStaffId(callback) {
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

  http.open("GET", "http://localhost:8080/greenShadow/api/v1/staff", true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send();
}



export function saveStaffMember(staffObj){
    
    const staffObjJSON = JSON.stringify(staffObj)
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
    
        http.open("POST", "http://localhost:8080/greenShadow/api/v1/staff", true);
        http.setRequestHeader("Content-Type","application/json");
        http.send(staffObjJSON);
    });
}

export function getAllStaffMembers(callBack){
  const http = new XMLHttpRequest();
  http.onreadystatechange = () => {
    if (http.readyState === 4) {
      if (http.status === 200) {
        const staffList = JSON.parse(http.responseText);
        staffList.forEach((member) => {
          $("#staffTableBody").append(
              `<tr class="cropDetails">
                  <td id = "sId">${member.id}</td>
                  <td>${member.firstName}</td>
                  <td>${member.designation}</td>
                  <td>${member.gender}</td>
                  <td>${member.joinedDate}</td>
                  <td>${member.contactNo}<br>${member.email}</td>
                  <td> <button class="btn btn-success view-btn">Edit</button></td>
              </tr>`
          );
        });
        callBack(staffList)
        
      } else {
        console.error("Failed");
        console.error("Status", http.status);
        console.error("Ready State", http.readyState);
        console.error("Failed with Status:", http.status);
      }
    }
  };
  http.open( "GET", "http://localhost:8080/greenShadow/api/v1/staff/allStaffMembers", true );
  http.send();
}

export function getStaffMember(id,setVslues){
  return new Promise((resolve,reject)=>{
    const http = new XMLHttpRequest();
    http.onreadystatechange = () => {
      if (http.readyState === 4) {
        if (http.status === 200) {
            const member = JSON.parse(http.responseText)
            console.log(member)
            setVslues(member)
            resolve();
        } else {
          console.error("Failed");
          console.error("Status", http.status);
          console.error("Ready State", http.readyState);
          reject(new Error("Failed to update crop with status: " + http.status));
        }
      }
    };

    http.open("GET", "http://localhost:8080/greenShadow/api/v1/staff/"+id, true);
    http.setRequestHeader("Content-Type","application/json");
    http.send();
  });
}

export function updateStaffMember(staffObj){
    console.log(staffObj)
    const staffObjJSON = JSON.stringify(staffObj)
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
    
        http.open("PATCH", "http://localhost:8080/greenShadow/api/v1/staff/"+staffObj.id, true);
        http.setRequestHeader("Content-Type","application/json");
        http.send(staffObjJSON);
    });
}


export function deleteStaffMember(id){
  console.log(id)
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
    http.open("DELETE", "http://localhost:8080/greenShadow/api/v1/staff/"+id, true);
    http.send();
  });
} 



export function loadFieldCodes(){
    
  getAllFields((fieldList) => {
      fieldList.forEach((field)=>{
          $("#field").append( 
              `<option value="${field.fieldCode}"> (${field.fieldCode +")-->"+field.fieldName}</option>
              `
          );
      });
  });
}

export function saveFieldStaffDetails(fieldCode,id){
  
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
  
      http.open("POST", "http://localhost:8080/greenShadow/api/v1/fieldStaffDetails/"+fieldCode+"/"+id, true);
      http.setRequestHeader("Content-Type","application/json");
      http.send();
  });
}


export function updateFieldStaffDetails(fieldCode,id){
  
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
            reject(new Error("Failed to update Field-Staff Details with status: " + http.status));
          }
        }
      };
  
      http.open("PATCH", "http://localhost:8080/greenShadow/api/v1/fieldStaffDetails/"+fieldCode+"/"+id, true);
      http.setRequestHeader("Content-Type","application/json");
      http.send();
  });
}

export function getFieldStaffMembers(fieldCode,takeIdList){
  const http = new XMLHttpRequest();
  http.onreadystatechange = () => {
    if (http.readyState === 4) {
      if (http.status === 200) {
        const staffList = JSON.parse(http.responseText);
        
        let relavantFieldStaffList = [];
        staffList.forEach((member) => {
          relavantFieldStaffList.push(member.id)
          $("#staffTableBody").append(
              `<tr class="staffDetails">
                  <td id = "sId">${member.designation}</td>
                  <td>${member.id}</td>
                  <td>${member.firstName}</td>
                  <td>${member.contactNo}<br>${member.email}</td>
                  <td>${member.vehicleCodeList}</td>
              </tr>`
            );
        });
        takeIdList(relavantFieldStaffList)
                
        
      } else {
        console.error("Failed");
        console.error("Status", http.status);
        console.error("Ready State", http.readyState);
        console.error("Failed with Status:", http.status);
      }
    }
  };

  http.open( "GET", "http://localhost:8080/greenShadow/api/v1/fieldStaffDetails/"+fieldCode, true );
  http.send();

}


export function getFieldStaffVehicles(staffIdList){
  // if(relavantFieldStaffList != null){
    
    const http = new XMLHttpRequest();
    http.onreadystatechange = () => {
        if (http.readyState === 4) {
        if (http.status === 200) {
            const vehicleList = JSON.parse(http.responseText);
            
            vehicleList.forEach((vehicle) => {
              if(staffIdList.includes(vehicle.staffId)){
                $("#vehicleTableBody").append(
                    `<tr class="vehicleDetails">
                        <td>${vehicle.category}</td>
                        <td id = "vCode">${vehicle.vehicleCode}</td>
                        <td>${vehicle.licensePlateNumber}</td>
                        <td>${vehicle.fuelType}</td>
                        <td>${vehicle.status}</td>
                      </tr>`
                );
              }
            
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


export function getRelavantFieldEquipments(){
  
}

