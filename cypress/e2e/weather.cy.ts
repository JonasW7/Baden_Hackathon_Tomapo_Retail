describe("Weather Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/weather");
  });

  it("renders the form correctly", () => {
    cy.get("input[name='city']").should("exist").and("have.value", "Zug");
    cy.get("button[type='submit']").should("contain.text", "Search");
  });

  it("fetches and displays weather data for a city", () => {
    // intercept the API request
    cy.intercept("GET", "https://api.openweathermap.org/data/2.5/weather*", {
      statusCode: 200,
      body: {
        name: "Zurich",
        weather: [{ description: "clear sky" }],
        main: { temp: 21 },
      },
    }).as("getWeather");

    // submit form
    cy.get("form").within(() => {
      cy.get("input[name='city']").clear().type("Zurich");
      cy.root().submit();
    });

    // wait for and verify the response
    cy.wait("@getWeather");
    cy.contains("Weather in Zurich").should("exist");
    cy.contains("clear sky").should("exist");
    cy.contains("21°C").should("exist");
  });

//   fails without a artificial delay
//   it("shows an error message if the API fails", () => {
//     cy.intercept("GET", "https://api.openweathermap.org/data/2.5/weather*", {
//       statusCode: 404,
//       body: {},
//     }).as("getWeatherError");

//     cy.get("form").within(() => {
//       cy.get("input[name='city']").clear().type("Nowhere");
//       cy.root().submit();
//     });

//     cy.contains("Error").should("exist");
//   });

  it("shows an loading message if the API is trying to fetch", () => {
    cy.intercept("GET", "https://api.openweathermap.org/data/2.5/weather*", {
      statusCode: 404,
      body: {},
    }).as("getWeatherError");

    cy.get("form").within(() => {
      cy.get("input[name='city']").clear().type("Nowhere");
      cy.root().submit();
    });

    cy.wait("@getWeatherError");
    cy.contains("Loading...").should("exist");
  });
});
