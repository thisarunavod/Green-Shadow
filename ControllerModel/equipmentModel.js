import { getAllFields } from "../ControllerModel/fm.js"

export function generateNewEquipmentId(callback) {
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
  
    http.open("GET", "http://localhost:8080/greenShadow/api/v1/equipment", true);
    http.setRequestHeader("Content-Type", "application/json");
    http.send();
}

export function saveEquipment(equipmentObj){
    console.log(equipmentObj)
    const equipmentObjJSON = JSON.stringify(equipmentObj)
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
                reject(new Error("Failed to save equipment with status: " + http.status));
                }
            }
        };    
        http.open("POST", "http://localhost:8080/greenShadow/api/v1/equipment", true);
        http.setRequestHeader("Content-Type","application/json");
        http.send(equipmentObjJSON);
    });
}

// export function loadAvailableStaffIds(){
//     const http = new XMLHttpRequest();
//     http.onreadystatechange = () => {
//         if (http.readyState === 4) {
//             if (http.status === 200) {
//                 const staffList = JSON.parse(http.responseText);
//                 staffList.forEach((labor) => {
//                     // var staffId = labor.staffId;
//                     $('#assignedStaff').append(
//                         ` <option value="${labor.id}"> (${labor.id +")-->"+labor.firstName+"-->"+labor.designation}</option>
//                         `
//                     );      
//                 });
//             } else {
//                 console.error("Failed");
//                 console.error("Status", http.status);
//                 console.error("Ready State", http.readyState);
//                 console.error("Failed with Status:", http.status);
//             }
//         }
//     };
//     http.open( "GET", "http://localhost:8080/greenShadow/api/v1/equipment/allAvailableLabors", true );
//     http.send();
    
// }

export function loadAvailableFieldCodes(){
    
    getAllFields((fieldList) => {
        fieldList.forEach((field)=>{
            $("#assignedField").append( 
                `<option value="${field.fieldCode}"> (${field.fieldCode +")-->"+field.fieldName}</option>
                `
            );
        });
    });
}

export function getAllEquipment(callBack){
    const http = new XMLHttpRequest();
    http.onreadystatechange = () => {
      if (http.readyState === 4) {
        if (http.status === 200) {
          const equipmentList = JSON.parse(http.responseText);
          equipmentList.forEach((equipment) => {
            if(equipment.staffId === null) equipment.staffId ="N/A"
            if(equipment.fieldCode === null) equipment.fieldCode ="N/A"
            $("#equipmentTableBody").append(
                `<tr class="equipmentDetails">
                    <td id = "eId">${equipment.equipmentId}</td>
                    <td>${equipment.name}</td>
                    <td>${equipment.type}</td>
                    <td>${equipment.status}</td>
                    <td>${equipment.staffId}</td>
                    <td>${equipment.fieldCode}</td>
                    <td> <button class="btn btn-success view-btn">Edit</button></td>
                </tr>`
            );
          });
          callBack(equipmentList)
          
        } else {
          console.error("Failed");
          console.error("Status", http.status);
          console.error("Ready State", http.readyState);
          console.error("Failed with Status:", http.status);
        }
      }
    };
    http.open( "GET", "http://localhost:8080/greenShadow/api/v1/equipment/allEquipments", true );
    http.send();
}

export function getEquipment(equipmentId , setValues){
    return new Promise((resolve,reject)=>{
        const http = new XMLHttpRequest();
        http.onreadystatechange = () => {
          if (http.readyState === 4) {
            if (http.status === 200) {
                const equipment = JSON.parse(http.responseText)
                console.log(equipment)
                setValues(equipment)
                resolve();
            } else {
              console.error("Failed");
              console.error("Status", http.status);
              console.error("Ready State", http.readyState);
              reject(new Error("Failed to update crop with status: " + http.status));
            }
          }
        };
    
        http.open("GET", "http://localhost:8080/greenShadow/api/v1/equipment/"+equipmentId, true);
        http.setRequestHeader("Content-Type","application/json");
        http.send();
    });
}



export function updateEquipment(equipment){
    console.log(equipment)
    const equipmentObjJSON = JSON.stringify(equipment)
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
    
        http.open("PATCH", "http://localhost:8080/greenShadow/api/v1/equipment/"+equipment.equipmentId, true);
        http.setRequestHeader("Content-Type","application/json");
        http.send(equipmentObjJSON);
    });
}