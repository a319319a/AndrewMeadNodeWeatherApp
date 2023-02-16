// fetch("http://localhost:3000/products?address=London").then((response) => {
//   console.log(response);
//   response.json().then((data) => {
//     console.log(data);
//   });
// });
// fetch('https://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })
const messageOne=document.querySelector("#message_1")
const messageTwo=document.querySelector('#message_2')

messageOne.textContent=''
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const Localstring = "http://localhost:3000/products?address=";
weatherForm.addEventListener("submit", (E) => {
  E.preventDefault();
  messageOne.textContent='Loading...'
  const location = search.value;
  fetch("http://localhost:3000/products?address=" + location).then(
    (response) => {
      response.json().then((data) => {
       if (data.error) {
        messageOne.textContent=data.error
       } else {
        messageOne.textContent='Searched place is '+data.products
        messageTwo.textContent='The temperature is '+data.temperature+'. It is '+data.weather[0]
       }
      });
    }
  );
});
