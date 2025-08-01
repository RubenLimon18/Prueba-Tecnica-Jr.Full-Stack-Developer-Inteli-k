const { ApiClient } = require('@mondaydotcomorg/api');
const myToken = "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjUwODQ4NzkwMiwiYWFpIjoxMSwidWlkIjo3NDAzMzU2MywiaWFkIjoiMjAyNS0wNS0wNVQxNzowNDoxNC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6Mjg3NjAwODIsInJnbiI6InVzZTEifQ.qlIIZccCkYAGhhTruWOHQF5a09I8uujVkJTV6q-ci2g"
const mondayApiClient = new ApiClient({ token: myToken });

const query = `
  query {
    boards(ids: 9708129485) {
      id
      name
      items_page(limit: 25) {
        items {
          id
          name
          group {
            id
          }
          column_values {
            id
            text
            value
          }
        }
      }
    }
  }
`;



mondayApiClient.request(query).then((response)=>{
    //console.log(response);
    console.log(JSON.stringify(response, null, 2));


}).catch((e) => {
    console.log(e);
})
