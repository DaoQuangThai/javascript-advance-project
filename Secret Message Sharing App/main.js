/*
Output?
1 - Watch for a submit event and get what ever user input turn to a base 64 message (secret messge)
2 - share this link with someone esle and when they click to this link the message will show

Input?
1 - form
2 - submit event
3 - function base 64

How to solve this problem?
1 - create 2 form
2 - add a submit event to a form
3 - get what ever user input and turn it to base 64
4 - turn it in to a share link and when someone else click to  show the message
*/

const { hash } = window.location;
const message = atob(hash.replace('#', ''));
console.log(message);

// Tại sao lại có vấn đề này? vì khi pass một cái url mới thì phần code phía trên nó sẽ run và tạo ra cái message tồn tại
if (message) {
  document.querySelector('#message-form').classList.add('hide');
  document.querySelector('#message-show').classList.remove('hide');

  document.querySelector('h1').innerHTML = message;
}

document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault();

  document.querySelector('#message-form').classList.add('hide');
  document.querySelector('#link-form').classList.remove('hide');

  const input = document.querySelector('#message-input');
  const encrypted = btoa(input.value);

  const linkInput = document.querySelector('#link-input');
  linkInput.value = `${window.location}#${encrypted}`;
  linkInput.select();
});
