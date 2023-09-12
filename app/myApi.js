function callApi(endpoint, token, callback) {
  const headers = new Headers();
  const bearer = `Bearer ${token}`;
  console.log(bearer);
  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers: headers,
  };

  console.log("request made to call MY API at: " + new Date().toString());

  fetch(endpoint, options)
    .then((response) => response)
    .then((response) => callback(response, endpoint))
    .catch((error) => console.log(error));
}

// This is used to test the Core Token Auth
// function callApi(endpoint, token) {
//   console.log("in");
//   console.log(token);
//   token =
//     "eyJpc3MiOiJYYW50dXJhQ09SRSIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0=.eyJhdWQiOiJJbnNpZ2h0IEFwcGxpY2F0aW9uIiwic3ViIjoiMzA5MTA1IiwiZXhwIjoiMTY5MzA3Njk2ODEyMCJ9.R21lvFC/PgXKh01enme7R+dKBp7CZbSv4n1nMK3FJW/RP0C6lGAEw01wPz4p2OgH3ewYQY2te3yL2VRIqs4cG7EbAO3gtFXfeLgVH9WlXvpWfejVjAmexHVOLmos2FFSHYSowAeCBo5NUaOr2n2vL9jmWxLPLPFeylpJcPhW1IVO1eV3ooWsgkuS8SJIl/dXuNH4DX4+I2HDeSfSkCgJuGSFcJqVCtsaAUiwCS9L7tsq0uW88JQSY/KoB1Ki9qE0NlfMZn9JXTKOy+uJ61Jecdkd58ABS4LkN86K277W8PDX9MBGgH27kaH0D7cWjKVaLt2qFmOnnHVZjbV0GSxnhQ==";
//   const headers = new Headers();
//   //const bearer = `X-API-KEY ${token}`;

//   //headers.append("Authorization", bearer);
//   headers.append("X-API-KEY", token);

//   const options = {
//     method: "GET",
//     headers: headers,
//   };

//   logMessage("Calling Web API...");

//   // fetch(endpoint, options)
//   //   //.then((response) => response.json())
//   //   .then((response) => {
//   //     if (response) {
//   //       console.log("response", response);
//   //       console.log("response.json", response.json());
//   //       logMessage("Web API responded: Hello " + response.json() + "!");
//   //     }

//   //     return response;
//   //   })
//   //   .catch((error) => {
//   //     console.error(error);
//   //   });

//   fetch(endpoint, options)
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         throw new Error("Request failed with status: " + response.status);
//       }
//     })
//     .then((jsonData) => {
//       console.log("Response JSON:", jsonData);

//       if (jsonData.panels && jsonData.panels.length > 0) {
//         console.log("Panels:", jsonData.panels);
//       } else {
//         console.log("No panels found in the response.");
//       }

//       // You can also access other properties like Header and Footer if needed
//       console.log("Header:", jsonData.header);
//       console.log("Footer:", jsonData.footer);

//       // You can use these properties in any way you need
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }
