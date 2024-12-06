export function generateNewLogCode(setCode) {
    const http = new XMLHttpRequest();
    http.onreadystatechange = () => {
      if (http.readyState === 4) {
        if (http.status === 200) {
            setCode(http.responseText); // Pass the response to the callback
        } else {
          console.error("Failed");
          console.error("Status", http.status);
          console.error("Ready State", http.readyState);
          console.error("Failed with Status:", http.status);
        }
      }
    };
  
    http.open("GET", "http://localhost:8080/greenShadow/api/v1/monitoringLog", true);
    http.setRequestHeader("Content-Type", "application/json");
    http.send();
}


export function saveMonitoringLog(){
  
}

export function getAllFeildsCodes(setValues){
    const http = new XMLHttpRequest();
    http.onreadystatechange = () => {
      if (http.readyState === 4) {
        if (http.status === 200) {
            const fieldCodeList =  JSON.parse(http.responseText)
            console.log(fieldCodeList)
            setValues(fieldCodeList);

        } else {
          console.error("Failed");
          console.error("Status", http.status);
          console.error("Ready State", http.readyState);
          console.error("Failed with Status:", http.status);
        }
      }
    };
  
    http.open("GET", "http://localhost:8080/greenShadow/api/v1/monitoringLog/allFieldCodes", true);
    http.setRequestHeader("Content-Type", "application/json");
    http.send();
}


export function getAllCropCodes(setValues){
    const http = new XMLHttpRequest();
    http.onreadystatechange = () => {
      if (http.readyState === 4) {
        if (http.status === 200) {
            const cropCodeList =  JSON.parse(http.responseText)
            console.log(cropCodeList)
            setValues(cropCodeList);

        } else {
          console.error("Failed");
          console.error("Status", http.status);
          console.error("Ready State", http.readyState);
          console.error("Failed with Status:", http.status);
        }
      }
    };
  
    http.open("GET", "http://localhost:8080/greenShadow/api/v1/monitoringLog/allCropCodes", true);
    http.setRequestHeader("Content-Type", "application/json");
    http.send();
}


export function getAllStaffMemberIDs(setValues){
    const http = new XMLHttpRequest();
    http.onreadystatechange = () => {
      if (http.readyState === 4) {
        if (http.status === 200) {
            const cropCodeList =  JSON.parse(http.responseText)
            console.log(cropCodeList)
            setValues(cropCodeList);

        } else {
          console.error("Failed");
          console.error("Status", http.status);
          console.error("Ready State", http.readyState);
          console.error("Failed with Status:", http.status);
        }
      }
    };
  
    http.open("GET", "http://localhost:8080/greenShadow/api/v1/monitoringLog/allStaffMemberIDs", true);
    http.setRequestHeader("Content-Type", "application/json");
    http.send();
}