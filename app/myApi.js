// function callMyApi(endpoint, token, callback) {
//   const headers = new Headers();
//   const bearer = `Bearer ${token}`;
//   console.log(bearer);
//   headers.append("Authorization", bearer);

//   const options = {
//     method: "GET",
//     headers: headers,
//   };

//   console.log("request made to call MY API at: " + new Date().toString());

//   fetch(endpoint, options)
//     .then((response) => response)
//     .then((response) => callback(response, endpoint))
//     .catch((error) => console.log(error));
// }

function callApi(endpoint, token) {
  //console.log(token);
  const headers = new Headers();
  const bearer = `Bearer ${token}`;

  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers: headers,
  };

  logMessage("Calling Web API...");

  // fetch(endpoint, options)
  //   //.then((response) => response.json())
  //   .then((response) => {
  //     if (response) {
  //       console.log("response", response);
  //       console.log("response.json", response.json());
  //       logMessage("Web API responded: Hello " + response.json() + "!");
  //     }

  //     return response;
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  fetch(endpoint, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Request failed with status: " + response.status);
      }
    })
    .then((jsonData) => {
      console.log("Response JSON:", jsonData);

      if (jsonData.panels && jsonData.panels.length > 0) {
        console.log("Panels:", jsonData.panels);
      } else {
        console.log("No panels found in the response.");
      }

      // You can also access other properties like Header and Footer if needed
      console.log("Header:", jsonData.header);
      console.log("Footer:", jsonData.footer);

      // You can use these properties in any way you need
    })
    .catch((error) => {
      console.error(error);
    });
}
