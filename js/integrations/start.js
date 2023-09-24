
//   // Check if a token is available in localStorage
//   const auth_token = localStorage.getItem('user_token');

//   if (!auth_token) {
//     // No token is available, so redirect to the login page
//     window.location.href = './login.html';
//   } else {
//     // Token is available; parse and check its expiration
//     try {
//       const tokenPayload = JSON.parse(atob(auth_token.split('.')[1])); 
//       const tokenExpiration = tokenPayload.exp * 1000; 
//       const twoDaysInMilliseconds = 2 * 24 * 60 * 60 * 1000; 
  
//       // Calculate the current time
//       const currentTime = Date.now();
  
//       // Check if the token has expired (current time is greater than or equal to expiration time)
//       if (currentTime >= tokenExpiration) {
//         // Token has expired; redirect to the login page
//         window.location.href = './login.html';
//       } else if (tokenExpiration - currentTime <= twoDaysInMilliseconds) {
       
       
//       } else {
//         // Token is valid; continue normal operations
//       }
//     } catch (error) {
//       console.error('Error parsing or checking token:', error);
//       // Handle any token parsing errors gracefully, e.g., redirect to login
//       window.location.href = './login.html';
//     }
//   }
  


  $(document).ready(function () {
      // Function to parse JWT token
      function parseJwt(token) {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(
              atob(base64)
                  .split('')
                  .map(function (c) {
                      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                  })
                  .join('')
          );

          return JSON.parse(jsonPayload);
      }
      

      // Fetch the user's profile using the bearer token
      const token = localStorage.getItem('user_token');
      const decodedToken = parseJwt(token);
      const userId = decodedToken.userId;
      

      // Function to update drive data status
      function updateDriveDataStatus() {
          $.ajax({
              url: `http://localhost:5000/api/get-drive-data-status/${userId}`,
              method: "GET",
              headers: {
                  Authorization: `Bearer ${token}`,
              },
              success: function (driveDataResponse) {
                  

                  // You can update the UI with the drive_data status here
                  // For example, set it to a specific HTML element:
                  $("#drive-data").html(`<b>Drive Data (${driveDataResponse.driveData})</b>`);
              },
              error: function (error) {
                  console.error(error.responseJSON.error);
                  // Handle the error if needed
              },
          });
      }

      // Call the updateDriveDataStatus function on page load
      updateDriveDataStatus();

      // Attach click event to Drive Data button
      $("#drive-data").click(function () {
          // Fetch product details
          $.ajax({
              url: "http://localhost:5000/api/drive-data",
              headers: {
                  Authorization: `Bearer ${token}`,
              },
              method: "POST",
              data: {
                  user_id: userId,
              },
              success: function (response) {
                  console.log(response)
                  // Check if there are no errors
                  if (!response.error) {
                      // Update modal content with product details using IDs
                      $("#product_img").attr("src", response.selected_product.product_image_url);
                      $("#product_description").html(response.selected_product.product_description);
                      $("#product_price").html(`USDT ${response.selected_product.product_price}`);
                      $("#product_commission").html(`USDT ${response.commission.toFixed(2)}`);
                      $("#creation_time").html(moment(response.selected_product.user_product_created_at).format("YYYY-MM-DD HH:mm:ss"));
                      $("#data_no").html(`${response.selected_product.product_id}`);

                      // Attach click event to Submit button within the modal
                      $(".btn-theme").click(function () {
                          // Call the submit data API
                          $.ajax({
                              url: "http://localhost:5000/api/submit-data",
                              headers: {
                                  Authorization: `Bearer ${token}`,
                              },
                              method: "POST",
                              data: {
                                  user_id: userId,
                                  product_id: response.selected_product.product_id,
                              },
                              success: function (submitResponse) {
                                  // Update the drive data status after submitting
                                  updateDriveDataStatus();

                                  // Close the Drive Data modal on success
                                  $("#driveDataModal").modal("hide");
                              },
                              error: function (submitError) {
                                  // Handle the error if the submit data API fails
                                  // Show error message in the Bootstrap modal
                                  $("#errorSuccessModalLabel").text("Koozai");
                                  $("#errorSuccessMessage").text(submitError.responseJSON.error);
                                  $("#errorSuccessModal").modal("show");
                              },
                          });
                      });

                      // Show the Drive Data modal
                      $("#driveDataModal").modal("show");
                  } else {
                      // Show error message in the Bootstrap modal
                      $("#errorSuccessModalLabel").text("Koozai");
                      $("#errorSuccessMessage").text(response.error);
                      $("#errorSuccessModal").modal("show");
                  }
              },
              error: function (error) {
                  // Handle the error if fetching product details fails
                  // Show error message in the Bootstrap modal
                  $("#errorSuccessModalLabel").text("Koozai");
                  $("#errorSuccessMessage").text(error.responseJSON.error);
                  $("#errorSuccessModal").modal("show");
              },
          });
      });

      // Close the error message modal when the "Confirm" button is pressed
      $("#confirmButton").click(function () {
          $("#errorSuccessModal").modal("hide");
      });
  });
