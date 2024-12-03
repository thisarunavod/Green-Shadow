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
    console.log(staffObj)
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