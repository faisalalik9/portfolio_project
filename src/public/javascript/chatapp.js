const chatForm = $('#message-form');
const socket = io();
const chatMessages = $('.messages-container');

socket.on('message', message=>{
  console.log(message);
  outputMessage(message);

  chatMessages.animate({ scrollTop: $(document).height() },0);
});


function outputMessage(message){
  const div = document.createElement('div');
  $(div).addClass("message");
  $(div).html(`<p>${message.text}</p>
  <div class="user-img-container">
    <img src="${message.image}" alt="">
  </div>
  <div class="time-container">
    ${message.time}
  </div>`);

  $('.messages-container').append(div);
}



chatForm.on('submit', (e)=>{
  e.preventDefault();

  const msg = $('#txt').val();

  socket.emit('chatMessage',msg);

  $('#txt').val("");

})
