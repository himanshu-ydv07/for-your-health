let navbar = document.querySelector('.header .navbar');
let menu  = document.querySelector('#menu');

menu.onclick = () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
};

window.onscroll = () =>{
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}
// Get the chat box container and elements
const chatBox = document.getElementById('chat-box');
const chatLog = document.getElementById('chat-log');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');

// Add event listener to the chat send button
chatSend.addEventListener('click', () => {
  // Get the user's input
  const userInput = chatInput.value.trim();
  if (userInput === '') {
    alert('Please enter a message');
    return;
  }
  // Send the input to the ChatGPT API
  fetch('/api/chatgpt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'prompt': userInput,
      'max_tokens': 100,
      'stop': '\n'
    })
  })
  .then(response => response.json())
  .then(data => {
    // Display the response in the chat log
    const responseText = data.choices[0].text;
    chatLog.innerHTML += `<p><strong>User:</strong> ${userInput}</p><p><strong>ChatGPT:</strong> ${responseText}</p>`;
    chatInput.value = '';
  })
  .catch(error => {
    console.error(error);
    alert('Error: Unable to process request');
  });
});


$(document).ready(function(){

    $('.buttons').click(function(){

        $(this).addClass('active').siblings().removeClass('active');

        var filter = $(this).attr('data-filter')

        if(filter == 'all'){
            $('.diet .box').show(400);
        }
        else{
            $('.diet .box').not('.'+ filter).hide(200);
            $('.diet .box').filter('.'+ filter).show(400);
        }

    });

});


var swiper = new Swiper('.review-slider', {
    loop: true,
    grabCursor:true,
    spaceBetween:20,
    breakpoints:{
        0:{
            slidesPerView: 1,
        },
        640:{
            slidesPerView: 2,
        },
        768:{
            slidesPerView: 3,
        },
    },
});
