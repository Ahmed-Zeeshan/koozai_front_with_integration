
// // Integration for user Registration API

// const toastrOptions = {
//   closeButton: true,        
//   progressBar: true,       
//   positionClass: "toast-top-center", 
//   timeOut: 5000,            
//   extendedTimeOut: 2000,    
//   showDuration: 1000,        
//   hideDuration: 5000,       
//   preventDuplicates: true,  
//   newestOnTop: true         
// };
      
//       $(document).ready(function () {
//         $("#submit-button").click(function (e) {
//           e.preventDefault();
    
//           // Get input values
//           const username = $("#username").val();
//           const phone = $("#phone").val();
//           const password = $("#password").val();
//           const confirm_password = $("#confirm-password").val(); // New input for password confirmation
//           const withdraw_password = $("#withdraw-password").val();
//           const gender = $("#gender").val();
//           const invitation_code = $("#invitation-code").val();
//           const agreedToTerms = $("#agreedToTerms").prop("checked");
    
//           // Front-end validation for password confirmation
//           if (password !== confirm_password) {
//             $("#password-error").text("Passwords do not match");
//             return;
//           } else {
//             $("#password-error").text(""); // Clear any previous error message
//           }
    
//           // Create the data object to send to the API
//           const data = {
//             username,
//             phone,
//             password,
//             confirm_password, // Send confirmation password to the server
//             withdraw_password,
//             gender,
//             invitation_code,
//             agreedToTerms,
//           };
    
//           // Make an AJAX POST request to your API endpoint
//           $.ajax({
//             type: "POST",
//             url: "http://localhost:5000/api/user-registration", // Replace with your actual API endpoint URL
//             data: JSON.stringify(data),
//             contentType: "application/json",
//             success: function (response) {
//               // Handle successful registration
//               toastr.success("Registration successful.");
//             },
//             error: function (error) {
//               // Handle registration errors
//               console.log(error);
    
//               if (error.responseJSON && error.responseJSON.error) {
//                 // Display the specific error message from the server using Toastr
//                 toastr.error(error.responseJSON.error, "Registration Error",toastrOptions);
//               } else {
//                 // Generic error message
//                 // alert("Registration failed. Please try again.");
//               }
//             },
//           });
//         });
//       });
 




//   const toastrOptions = {
//     closeButton: true,
//     progressBar: true,
//     positionClass: "toast-top-center",
//     timeOut: 5000,
//     extendedTimeOut: 2000,
//     showDuration: 1000,
//     hideDuration: 5000,
//     preventDuplicates: true,
//     newestOnTop: true,
//   };

//   $(document).ready(function () {
//     $("#submit-button").click(function (e) {
//       e.preventDefault();

//       // Get input values
//       const username = $("#username").val();
//       const phone = $("#phone").val();
//       const password = $("#password").val();
//       const confirm_password = $("#confirm-password").val(); // New input for password confirmation
//       const withdraw_password = $("#withdraw-password").val();
//       const gender = $("#gender").val();
//       const invitation_code = $("#invitation-code").val();
//       const agreedToTerms = $("#agreedToTerms").prop("checked");

//       // Front-end validation for password confirmation
//       if (password !== confirm_password) {
//         $("#password-error").text("Passwords do not match");
//         return;
//       } else {
//         $("#password-error").text(""); // Clear any previous error message
//       }

//       // Create the data object to send to the API
//       const data = {
//         username,
//         phone,
//         password,
//         confirm_password, // Send confirmation password to the server
//         withdraw_password,
//         gender,
//         invitation_code,
//         agreedToTerms,
//       };

//       // Show the loading spinner
//       $("#loadingSpinner").removeClass("d-none");

//       // Make an AJAX POST request to your API endpoint
//       $.ajax({
//         type: "POST",
//         url: "http://localhost:5000/api/user-registration", // Replace with your actual API endpoint URL
//         data: JSON.stringify(data),
//         contentType: "application/json",
//         success: function (response) {
//           // Hide the loading spinner
//           $("#loadingSpinner").addClass("d-none");

//           // Handle successful registration
//           toastr.success("Registration successful.");
//         },
//         error: function (error) {
//           // Hide the loading spinner
//           $("#loadingSpinner").addClass("d-none");

//           // Handle registration errors
//           console.log(error);

//           if (error.responseJSON && error.responseJSON.error) {
//             // Display the specific error message from the server using Toastr
//             toastr.error(
//               error.responseJSON.error,
//               "Registration Error",
//               toastrOptions
//             );
//           } else {
//             // Generic error message
//             // alert("Registration failed. Please try again.");
//           }
//         },
//       });
//     });
//   });



  const toastrOptions = {
    closeButton: true,
    progressBar: true,
    positionClass: "toast-top-center",
    timeOut: 5000,
    extendedTimeOut: 2000,
    showDuration: 1000,
    hideDuration: 5000,
    preventDuplicates: true,
    newestOnTop: true,
  };

  $(document).ready(function () {
    $("#submit-button").click(function (e) {
      e.preventDefault();

      // Get input values
      const username = $("#username").val();
      const phone = $("#phone").val();
      const password = $("#password").val();
      const confirm_password = $("#confirm-password").val();
      const withdraw_password = $("#withdraw-password").val();
      const gender = $("#gender").val();
      const invitation_code = $("#invitation-code").val();
      const agreedToTerms = $("#agreedToTerms").prop("checked");

      // Front-end validation for password confirmation
      if (password !== confirm_password) {
        $("#password-error").text("Passwords do not match");
        return;
      } else {
        $("#password-error").text(""); 
      }

      // Check if any field is empty
      const fields = [
        { id: "username", name: "Username" },
        { id: "phone", name: "Phone" },
        { id: "password", name: "Password" },
        { id: "confirm-password", name: "Confirm Password" },
        { id: "withdraw-password", name: "Withdraw Password" },
        { id: "gender", name: "Gender" },
        { id: "invitation-code", name: "Invitation Code" },
      ];

      for (const field of fields) {
        const value = $(`#${field.id}`).val().trim();
        if (value === "") {
          toastr.error(`${field.name} is required.`, "Registration Error", toastrOptions);
          return; // Stop processing if any field is empty
        }
      }

      // Create the data object to send to the API
      const data = {
        username,
        phone,
        password,
        confirm_password,
        withdraw_password,
        gender,
        invitation_code,
        agreedToTerms,
      };

      // Show the loading spinner
      $("#loadingSpinner").removeClass("d-none");

      // Make an AJAX POST request to your API endpoint
      $.ajax({
        type: "POST",
        url: "http://localhost:5000/api/user-registration",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function (response) {
          // Hide the loading spinner
          $("#loadingSpinner").addClass("d-none");

          // Handle successful registration
          toastr.success("Registration successful.Please go to login page and continue.");

          // Clear the form
          $("#username").val("");
          $("#phone").val("");
          $("#password").val("");
          $("#confirm-password").val("");
          $("#withdraw-password").val("");
          $("#gender").val("");
          $("#invitation-code").val("");
          $("#agreedToTerms").prop("checked", false);

        //   Redirect to login.html
          window.location.href = "login.html";
        },
        error: function (error) {
          // Hide the loading spinner
          $("#loadingSpinner").addClass("d-none");

          // Handle registration errors
          console.log(error);

          if (error.responseJSON && error.responseJSON.error) {
            // Display the specific error message from the server using Toastr
            toastr.error(
              error.responseJSON.error,
              "Registration Error",
              toastrOptions
            );
          } else {
            // Generic error message
            // alert("Registration failed. Please try again.");
          }
        },
      });
    });
  });



//   #### LOGIN API CALL

   
$(document).ready(function () {
    $("#login-button").click(function (e) {
      e.preventDefault();

      // Get input values
      const identifier = $("input[name='identifier']").val();
      const password = $("input[name='password']").val();

      // Create the data object to send to the API
      const data = {
        identifier,
        password,
      };

      // Make an AJAX POST request to your login API endpoint
      $.ajax({
        type: "POST",
        url: "http://localhost:5000/api/user-login", 
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function (response) {
            // console.log(response)
          // Store the token in local storage
          localStorage.setItem("user_token", response.token);

          // Redirect to index.html
          window.location.href = "index.html";
        },
        error: function (error) {
          console.log(error);

          if (error.responseJSON && error.responseJSON.error) {
            // Display the specific error message from the server using Toastr
            toastr.error(error.responseJSON.error, "Login Error",toastrOptions);
          } else {
            // Generic error message
            toastr.error("Login failed. Please try again.", "Login Error",toastrOptions);
          }
        },
      });
    });
  });
