
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

