
$(document).ready(function(){
        
});

document.getElementById("loginBtn").addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent the form from submitting
  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    const loginDetails = {
      email: email,
      password: password,
    };
  
    try {
      const response = await signIn(loginDetails); // Make the API call
      if (response.status === 200) {
        // Navigate to Dashboard.html on success

        const responseData = JSON.parse(response.responseText); // Parse the response data
        localStorage.setItem("authToken", responseData.token); // Save token to local storage
        localStorage.setItem("userData", JSON.stringify(responseData.user)); // Save user details to local storage
        window.location.href = "DashBoard.html";
        // DashBoard.html
      } else {
        alert("Login failed. Please check your credentials."); // Handle error
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred. Please try again later.");
    }
  });
  
  function signIn(loginDetails) {
    const loginDetailsJSON = JSON.stringify(loginDetails);
    return new Promise((resolve, reject) => {
      const http = new XMLHttpRequest();
      http.onreadystatechange = () => {
        if (http.readyState === 4) {
          if (http.status === 200) {
            resolve(http); 
          } else {
            reject(new Error("Failed to login. Status: " + http.status));
          }
        }
      };
  
      http.open("POST", "http://localhost:8080/greenShadow/api/v2/auth/signIn", true);
      http.setRequestHeader("Content-Type", "application/json");
      http.send(loginDetailsJSON);
    });
  }
  