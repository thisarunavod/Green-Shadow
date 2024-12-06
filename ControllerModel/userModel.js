export function getAllStaffMembers(callBack){

  const http = new XMLHttpRequest();
  http.onreadystatechange = () => {
    if (http.readyState === 4) {
      if (http.status === 200) {
        const staffList = JSON.parse(http.responseText);
        const onlyUsers = []
        staffList.forEach((member) => {
            if(member.role != "OTHER")
            onlyUsers.push(member)
        });
        callBack(onlyUsers)
        
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




export function saveAsUser(user){
    const userObjJSON = JSON.stringify(userObj)
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
    
        http.open("POST", "http://localhost:8080/greenShadow/api/v1/user", true);
        http.setRequestHeader("Content-Type","application/json");
        http.send(userObjJSON);
    });
}
    