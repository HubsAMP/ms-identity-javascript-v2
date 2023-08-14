/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */

// Note you have to use nmp start to test this applicaiton

const msalConfig = {
  auth: {
    // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
    clientId: "f50adc4b-fba6-4795-8b6c-fcc83b537ad4",
    // Full directory URL, in the form of https://login.microsoftonline.com/<tenant-id>
    authority:
      "https://login.microsoftonline.com/4f45223a-8b22-4a46-a75b-845310de5d25",
    // Full redirect URL, in form of http://localhost:3000
    redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case msal.LogLevel.Error:
            console.error(message);
            return;
          case msal.LogLevel.Info:
            console.info(message);
            return;
          case msal.LogLevel.Verbose:
            console.debug(message);
            return;
          case msal.LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
    },
  },
};

// Add here the endpoints and scopes for the web API you would like to use.
const apiConfig = {
  uri: "https://localhost:7111/api", // e.g. http://localhost:5000/api
  scopes: ["api://f50adc4b-fba6-4795-8b6c-fcc83b537ad4/access_as_user"], // e.g. ["scp1", "scp2"]
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
const loginRequest = {
  scopes: ["User.Read"],
};

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
// const tokenRequest = {
//   scopes: [
//     "User.Read",
//     "Mail.Read",
//     "api://f50adc4b-fba6-4795-8b6c-fcc83b537ad4/access_as_user",
//   ],
//   forceRefresh: false, // Set this to "true" to skip a cached token and go to the server to get a new token
// };

/**
 * Scopes you add here will be used to request a token from Azure AD to be used for accessing a protected resource.
 * To learn more about how to work with scopes and resources, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
const tokenRequest = {
  scopes: [...apiConfig.scopes],
};
