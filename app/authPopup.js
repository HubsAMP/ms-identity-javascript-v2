// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js
const myMSALObj = new msal.PublicClientApplication(msalConfig);

let username = "";

function selectAccount() {
  /**
   * See here for more info on account retrieval:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
   */

  const currentAccounts = myMSALObj.getAllAccounts();
  if (currentAccounts.length === 0) {
    return;
  } else if (currentAccounts.length > 1) {
    // Add choose account code here
    console.warn("Multiple accounts detected.");
  } else if (currentAccounts.length === 1) {
    username = currentAccounts[0].username;
    showWelcomeMessage(username);
  }
}

function handleResponse(response) {
  /**
   * To see the full list of response object properties, visit:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#response
   */

  if (response !== null) {
    username = response.account.username;
    showWelcomeMessage(username);
  } else {
    selectAccount();
  }
}

function signIn() {
  /**
   * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
   */

  myMSALObj
    .loginPopup(loginRequest)
    .then(handleResponse)
    .catch((error) => {
      console.error(error);
    });
}

function signOut() {
  /**
   * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
   */

  const logoutRequest = {
    account: myMSALObj.getAccountByUsername(username),
    postLogoutRedirectUri: msalConfig.auth.redirectUri,
    mainWindowRedirectUri: msalConfig.auth.redirectUri,
  };

  myMSALObj.logoutPopup(logoutRequest);
}

function getTokenPopup(request) {
  /**
   * See here for more info on account retrieval:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
   */
  request.account = myMSALObj.getAccountByUsername(username);

  return myMSALObj.acquireTokenSilent(request).catch((error) => {
    console.warn("silent token acquisition fails. acquiring token using popup");
    if (error instanceof msal.InteractionRequiredAuthError) {
      // fallback to interaction when silent call fails
      return myMSALObj
        .acquireTokenPopup(request)
        .then((tokenResponse) => {
          console.log(tokenResponse);
          return tokenResponse;
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.warn(error);
    }
  });
}

function seeProfile() {
  getTokenPopup(loginRequest)
    .then((response) => {
      callMSGraph(graphConfig.graphMeEndpoint, response.accessToken, updateUI);
    })
    .catch((error) => {
      console.error(error);
    });
}

function readMail() {
  getTokenPopup(tokenRequest)
    .then((response) => {
      callMSGraph(
        graphConfig.graphMailEndpoint,
        response.accessToken,
        updateUI
      );
    })
    .catch((error) => {
      console.error(error);
    });
}

// function callApi() {
//   var apiUrl = "https://localhost:7192/WeatherForecast";
//   getTokenPopup(tokenRequest)
//     .then((response) => {
//       callMyApi(apiUrl, response.accessToken, updateAPIResponse);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }

function callIGConfig() {
  getTokenPopup(tokenRequest).then((response) => {
    if (response) {
      console.log("access_token acquired at: " + new Date().toString());
      //console.log(response);
      try {
        callApi(apiConfig.igconfigUrl, response.accessToken, myCallBack);
        // callApi(
        //   apiConfig.uri,
        //   "eyJpc3MiOiJYYW50dXJhQ09SRSIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0=.eyJhdWQiOiJJbnNpZ2h0IEFwcGxpY2F0aW9uIiwic3ViIjoiMzA5MTA1IiwiZXhwIjoiMTY5MzA3Njk2ODEyMCJ9.R21lvFC/PgXKh01enme7R+dKBp7CZbSv4n1nMK3FJW/RP0C6lGAEw01wPz4p2OgH3ewYQY2te3yL2VRIqs4cG7EbAO3gtFXfeLgVH9WlXvpWfejVjAmexHVOLmos2FFSHYSowAeCBo5NUaOr2n2vL9jmWxLPLPFeylpJcPhW1IVO1eV3ooWsgkuS8SJIl/dXuNH4DX4+I2HDeSfSkCgJuGSFcJqVCtsaAUiwCS9L7tsq0uW88JQSY/KoB1Ki9qE0NlfMZn9JXTKOy+uJ61Jecdkd58ABS4LkN86K277W8PDX9MBGgH27kaH0D7cWjKVaLt2qFmOnnHVZjbV0GSxnhQ=="
        // );
      } catch (error) {
        console.warn(error);
      }
    }
  });
}

function fetchData() {
  getTokenPopup(tokenRequest).then((response) => {
    if (response) {
      console.log("access_token acquired at: " + new Date().toString());
      //console.log(response);
      try {
        callApi(apiConfig.dataSetUrl, response.accessToken, myCallBack);
      } catch (error) {
        console.warn(error);
      }
    }
  });
}

function callOVRef() {
  getTokenPopup(tokenRequest).then((response) => {
    if (response) {
      console.log("access_token acquired at: " + new Date().toString());
      //console.log(response);
      try {
        callApi(apiConfig.ovrefUrl, response.accessToken, myCallBack);
      } catch (error) {
        console.warn(error);
      }
    }
  });
}

function myCallBack(response, endpoint) {
  // Check if the response status is OK (status code 200)
  if (response.status === 200) {
    response.json().then((data) => {
      // Select the div element
      const jsonDisplayDiv = document.getElementById("jsonDisplay");

      // Convert the JSON object to a formatted JSON string
      const formattedJSON = JSON.stringify(data, null, 2);

      // Update the innerHTML of the div to display the JSON
      jsonDisplayDiv.innerHTML = "<pre>" + formattedJSON + "</pre>";
    });
  } else {
    console.log("Request to", endpoint, "failed with status:", response.status);
  }
}
selectAccount();
