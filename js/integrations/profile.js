
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

  console.log({ token, userId })

  $.ajax({
    type: "GET",
    url: `http://localhost:5000/api/get-user-profile/${userId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    success: function (response) {
      // Update the user's name and image
      $("#username").text(response.username);
      $("#referralCode").text(response.referral_code);
      $("#todayProfit").text(`USDT ${response.commission}`);
      $("#totalBalance").text(` USDT ${response.balance}`);


      const userLevel = response.level_id;

      // Define the membership levels and their descriptions based on level_id
      const membershipLevels = {
        1: {
          name: "Bronze Membership",
          description:
            "0.5% Commission per data, 40 data per set & 2 sets every day",
        },
        2: {
          name: "Silver Membership",
          description:
            "1.0% Commission per data, 40 data per set & 2 sets every day",
        },
        3: {
          name: "Gold Membership",
          description:
            "1.5% Commission per data, 45 data per set & 2 sets every day",
        },
        4: {
          name: "Diamond Membership",
          description:
            "2.0% Commission per data, 50 data per set & 2 sets every day",
        },
      };

      
      if (membershipLevels[userLevel]) {
        // Set the level name and description based on level_id
        const levelName = membershipLevels[userLevel].name;
        const levelDescription = membershipLevels[userLevel].description;
        $("#levelName").text(levelName);
        $("#levelDescription").text(levelDescription);

        const userImage = document.getElementById("userImage");
        userImage.src = `./assets/images/badge${userLevel}.png`;

         // Check if the user has a profile picture
      if (response.profile_pic !== null) {
        // Set the user's profile image if available
        $("#profile-img").attr("src", response.profile_pic);
      } else {
        // Set a default profile image if the user doesn't have one
        $("#profile-img").attr("src", "./assets/images/default_headimg.jpg");
      }
      } else {
        // Handle the case where the user's level doesn't match any defined level
        console.error("Invalid user level:", userLevel);
      }
    },
    error: function (error) {
      console.error(error);
    },
  });
});
