




// // Function to parse JWT token
// function parseJwt(token) {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = decodeURIComponent(
//         atob(base64)
//             .split('')
//             .map(function (c) {
//                 return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//             })
//             .join('')
//     );

//     return JSON.parse(jsonPayload);
// }

// $(document).ready(function () {
//     // Fetch the user's profile using the bearer token
//     const token = localStorage.getItem('user_token');
//     const decodedToken = parseJwt(token);
//     const userId = decodedToken.userId;

//     // Function to show the loading spinner
//     function showLoadingSpinner() {
//         $('#loadingSpinner').removeClass('d-none');
//     }

//     // Function to hide the loading spinner
//     function hideLoadingSpinner() {
//         $('#loadingSpinner').addClass('d-none');
//     }

//     // Function to handle AJAX errors
//     function handleAjaxError(xhr, textStatus, error) {
//         hideLoadingSpinner(); // Hide the loading spinner once

//         if (!handleAjaxError.shownError) {
//             handleAjaxError.shownError = true; // Set a flag to prevent displaying errors multiple times
//             if (xhr.status === 0) {
//                 // Network error or server unreachable
//                 console.error('Network error or server unreachable.');
//             } else if (xhr.status === 401) {
//                 // Unauthorized, handle accordingly (e.g., log out the user)
//                 console.error('Unauthorized error. Please log out.');
//             } else {
//                 // Handle other errors
//                 console.error('Error:', error);
//             }
//         }
//     }

//     // Function to load data for a specific tab
//     function loadTabData(tabId, status) {
//         showLoadingSpinner(); // Show the loading spinner

//         $.ajax({
//             url: `http://localhost:5000/api/get-transactions-by-status/${userId}/${status}`,
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//             type: 'GET',
//             success: function (data) {
//                 hideLoadingSpinner(); // Hide the loading spinner

//                 console.log(data);
//                 // Handle the data received from the API
//                 const tabContent = $(tabId);
//                 // Clear existing content
//                 tabContent.empty();

//                 // Loop through the data and append it to the content area
//                 data.dataWithCommissions.forEach(function (item) {
//                     const recordHtml = `
//                         <div class="records-list">
//                             <div class="record">
//                                 <div class="d-flex justify-content-between align-items-center">
//                                     <div><b>2023-07-19 19:53:35</b></div>
//                                     <div class="order-status completed">${item.status}</div>
//                                 </div>
//                                 <div class="info">
//                                     <div class="goods">
//                                         <img src=${item.product_image_url} />
//                                         <div class="name">${item.product_description}</div>
//                                     </div>
//                                     <div class="order pt-2">
//                                         <div class="row">
//                                             <div class="col-md-6">
//                                                 <label>Total Amount</label>
//                                                 <div class="value">USDT ${item.product_price}</div>
//                                             </div>
//                                             <div class="col-md-6">
//                                                 <label>Profit</label>
//                                                 <div class="value">USDT ${item.commission}</div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     `;
//                     tabContent.append(recordHtml);
//                 });
//             },
//             error: function (xhr, textStatus, error) {
//                 handleAjaxError(xhr, textStatus, error);
//             },
//         });
//     }

//     // Load data for the "All" tab when the page loads
//     loadTabData('#all-content', 'all');

//     // Load data for the "Pending" tab when the page loads
//     loadTabData('#pending-content', 'pending');

//     // Load data for the "Completed" tab when the page loads
//     loadTabData('#completed-content', 'completed');

//     // Load data for the "Frozen" tab when the page loads
//     loadTabData('#frozen-content', 'frozen');

//     // Handle tab clicks to load data for each tab
//     $('#all-tab').click(function () {
//         loadTabData('#all-content', 'all');
//     });

//     $('#pending-tab').click(function () {
//         loadTabData('#pending-content', 'pending');
//     });

//     $('#completed-tab').click(function () {
//         loadTabData('#completed-content', 'completed');
//     });

//     $('#frozen-tab').click(function () {
//         loadTabData('#frozen-content', 'frozen');
//     });
// });



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

    $(document).ready(function () {
        // Fetch the user's profile using the bearer token
        const token = localStorage.getItem('user_token');
        const decodedToken = parseJwt(token);
        const userId = decodedToken.userId;

        // Function to show the loading spinner
        function showLoadingSpinner() {
            $('#loadingSpinner').removeClass('d-none');
        }

        // Function to hide the loading spinner
        function hideLoadingSpinner() {
            $('#loadingSpinner').addClass('d-none');
        }

        // Function to handle AJAX errors
        function handleAjaxError(xhr, textStatus, error) {
            hideLoadingSpinner(); // Hide the loading spinner

            if (xhr.status === 0) {
                // Network error or server unreachable
                console.error('Network error or server unreachable.');
            } else if (xhr.status === 401) {
                // Unauthorized, handle accordingly (e.g., log out the user)
                console.error('Unauthorized error. Please log out.');
            } else {
                // Handle other errors
                console.error('Error:', error);
            }
        }

        // Function to load data for a specific tab
        function loadTabData(tabId, status) {
            showLoadingSpinner(); // Show the loading spinner

            $.ajax({
                url: `http://localhost:5000/api/get-transactions-by-status/${userId}/${status}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                type: 'GET',
                success: function (data) {
                    hideLoadingSpinner(); // Hide the loading spinner

                    console.log(data);
                    // Handle the data received from the API
                    const tabContent = $(tabId);
                    // Clear existing content
                    tabContent.empty();

                    // Loop through the data and append it to the content area
                    data.dataWithCommissions.forEach(function (item) {
                        const recordHtml = `
                            <div class="records-list">
                                <div class="record">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div><b>2023-07-19 19:53:35</b></div>
                                        <div class="d-flex">
                                        <div class="order-status text-capitalize ${item.status === 'pending' ? 'btn btn-danger' : 'completed'}">${item.status}</div>
                                        ${item.status === 'pending'  ? '<button class="submit-button ms-3 btn btn-success btn-sm" data-product-id="' + item.product_id + '">Submit</button>' : ''}
                                        </div>
                                    </div>
                                    <div class="info">
                                        <div class="goods">
                                            <img src=${item.product_image_url} />
                                            <div class="name">${item.product_description}</div>
                                        </div>
                                        <div class="order pt-2">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label>Total Amount</label>
                                                    <div class="value">USDT ${item.product_price}</div>
                                                </div>
                                                <div class="col-md-6">
                                                    <label>Profit</label>
                                                    <div class="value">USDT ${item.commission}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                        tabContent.append(recordHtml);
                    });

                    // Add click event for the "Submit" button
                    $('.submit-button').click(function () {
                        const productId = $(this).data('product-id');
                        $('#confirmationModal').modal('show');

                        // Add click event for the "Okay" button in the modal
                        $('#submitButton').click(function () {
                            // Call the submit API here with the productId
                            $.ajax({
                                url: 'http://localhost:5000/api/submit-data',
                                type: 'POST',
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    'Content-Type': 'application/json',
                                },
                                data: JSON.stringify({
                                    user_id: userId,
                                    product_id: productId,
                                }),
                                success: function (response) {
                                    // Handle the response from the submit API
                                    console.log(response);
                                    // Close the modal after submission
                                    $('#confirmationModal').modal('hide');
                                },
                                error: function (xhr, textStatus, error) {
                                    handleAjaxError(xhr, textStatus, error);
                                    // Close the modal on error
                                    $('#confirmationModal').modal('hide');
                                },
                            });
                        });
                    });
                },
                error: function (xhr, textStatus, error) {
                    handleAjaxError(xhr, textStatus, error);
                },
            });
        }

        // Load data for the "All" tab when the page loads
        loadTabData('#all-content', 'all');

        // Load data for the "Pending" tab when the page loads
        loadTabData('#pending-content', 'pending');

        // Load data for the "Completed" tab when the page loads
        loadTabData('#completed-content', 'completed');

        // Load data for the "Frozen" tab when the page loads
        loadTabData('#frozen-content', 'frozen');

        // Handle tab clicks to load data for each tab
        $('#all-tab').click(function () {
            loadTabData('#all-content', 'all');
        });

        $('#pending-tab').click(function () {
            loadTabData('#pending-content', 'pending');
        });

        $('#completed-tab').click(function () {
            loadTabData('#completed-content', 'completed');
        });

        $('#frozen-tab').click(function () {
            loadTabData('#frozen-content', 'frozen');
        });
    });


