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

export function getAllStaffMembers(){
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
                  <td>${member.dateOfBirth}</td>
                  <td>${member.contactNo}<br>${member.email}</td>
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
  http.open( "GET", "http://localhost:8080/greenShadow/api/v1/staff/allStaffMembers", true );
  http.send();
}



