document.addEventListener("DOMContentLoaded", function () {

    const images = document.querySelectorAll(".picture img"); // Select all images
    let currentIndex = 0; // Track the currently visible image

    function changeImage() {
        // Remove the active class from the current image
        images[currentIndex].classList.remove("active");

        // Move to the next image (loop back to the first one if at the end)
        currentIndex = (currentIndex + 1) % images.length;

        // Add the active class to the next image
        images[currentIndex].classList.add("active");
    }

    // Change the image every 3 seconds
    setInterval(changeImage, 5000);

    

  // Get the Create Account button
  const createAccountButton = document.getElementById("btnCreateAccount");
  
  // Add a click event listener to the button
  createAccountButton.addEventListener("click", function () {
    // Replace the existing form with the Create Account form
    const mainForm = document.querySelector(".mainform");

    mainForm.innerHTML = `
      <form>
        <div class="row mb-3">
          <label for="inputUsername" class="col-sm-2 col-form-label">Username</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="inputUsername" />
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-10">
            <input type="email" class="form-control" id="inputEmail" />
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
          <div class="col-sm-10">
            <input type="password" class="form-control" id="inputPassword" />
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputConfirmPassword" class="col-sm-2 col-form-label">Confirm Password</label>
          <div class="col-sm-10">
            <input type="password" class="form-control" id="inputConfirmPassword" />
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Register</button>
        <button type="button" class="btn btn-secondary" id="btnBackToLogin">Back to Login</button>
      </form>
    `;

    // Add functionality to "Back to Login" button
    document.getElementById("btnBackToLogin").addEventListener("click", function () {
      window.location.reload(); // Reload the page to show the login form
    });
  });
});


