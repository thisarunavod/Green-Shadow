


$(document).ready(function(){
    
});


document.
loginBtn

document.getElementById("loginBtn").addEventListener("click", (event) => {
    // event.preventDefault();
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    const logindDetails  = {email,password}

      
    signIn(logindDetails)
    .then((response) => {
        console.log("Server response:", response);
        // Handle success logic (e.g., redirect to a dashboard)
    })
    .catch((error) => {
        console.error("Error during login:", error.message);
        // Show error message to the user
    });
      
    

});

function signIn(loginDetails) {
    const loginDetailsJSON = JSON.stringify(loginDetails);
    return new Promise((resolve, reject) => {
      const http = new XMLHttpRequest();
      
      http.onreadystatechange = () => {
        if (http.readyState === 4) { // Request completed
          if (http.status === 200) { // HTTP OK
            try {
              const responseJSON = JSON.parse(http.responseText); // Parse response if it's JSON
              console.log("Login successful:", responseJSON);
              resolve(responseJSON); // Resolve the promise with the response data
            } catch (error) {
              console.error("Failed to parse response:", error);
              reject(new Error("Invalid response format"));
            }
          } else {
            console.error("Login failed. HTTP Status:", http.status);
            reject(new Error(`Request failed with status: ${http.status} - ${http.statusText}`));
          }
        }
      };
  
      // Configure the HTTP POST request
      http.open("POST", "http://localhost:8080/greenShadow/api/v2/auth/signIn", true);
      http.setRequestHeader("Content-Type", "application/json");
      http.send(loginDetailsJSON); // Send the JSON payload
    });
  }
  





// function signIn(loginDetails){
//     const loginDetailsJSON = JSON.stringify(loginDetails)
//     return new Promise((resolve,reject)=>{
//         const http = new XMLHttpRequest();
//         http.onreadystatechange = () => {
//           if (http.readyState === 4) {
//             if (http.status === 200) {
//                  console.log(http.responseText)
//             } else {
//               console.error("Failed");
//               console.error("Status", http.status);
//               console.error("Ready State", http.readyState);
//               reject(new Error("Failed to update crop with status: " + http.status));
//             }
//           }
//         };
    
//         http.open("POST", "http://localhost:8080/greenShadow/api/v2/auth/signIn", true);
//         http.setRequestHeader("Content-Type","application/json");
//         http.send(loginDetailsJSON);
//     });
// }


// document
//   .getElementById("loginForm")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();

//     console.log("hiiiii");
//     // Get email and password values from the form
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     const loginData = { email, password };

//     console.log("Submitting login data:", loginData);

//     // Send a POST request to the backend API for authentication
//     fetch("http://localhost:5055/cropmonitoringcollector/api/v1/auth/signin", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(loginData),
//     })
//       .then((response) => {
//         console.log("Response status:", response.status);
//         if (!response.ok) {
//           throw new Error(HTTP error! Status: ${response.status});
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log("Response JSON data:", data);
//         if (data.token) {
//           // Store the token in localStorage
//           localStorage.setItem("authToken", data.token);
//           console.log("Token stored:", data.token);
//           // Redirect to the dashboard
//           window.location.href = "crop_monitoring_dashboard.html";
//         } else {
//           throw new Error("Token not found in response");
//         }
//       })
//       .catch((error) => {
//         console.error("Error during login:", error);
//         alert(error.message || "An error occurred during login.");
//       });
//   });