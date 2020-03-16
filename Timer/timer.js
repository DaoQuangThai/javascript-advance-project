// TIMER APPLICATION
/*
- PART 1 - UNDERSTAND THE PROBLEM

Output?
place to display time
"start" button every time it click it start to count down
"pause" button - click - pause count down
"input" when click to place display time it can change current time
drawing a border every second the timers count down => 0 => full border

Input?
Những cái trên đã quá rõ

PART 2 - HOW TO SOLVE IT?
1 - How to count down a time
2 - add evt listener to "start button" to start count down
3 - add -----------------"pause button" to pause count down
4 - How display the timer on the screen? and display everytime it has changed
5 - How to change the current time? by clicking to the display area?
*/

/* Một vài lỗi gặp phải khi làm
1 - event of null bởi vì dom chưa load hết mà đã excicute do để script phía trên => fix bằng cách để cuối body
2 - event of undefine constuctor có 3 arr thì khi add new phải thêm 3 arr đặc biệt là phải đúng vị trí

*/

/* Kiến thức mới
******** Constructor function and this keyword ********** 
What this in this case means?
Khi chúng ta tạo ra một new instance thì điều đầu tiên là:
"new" sẽ tạo ra 1 empty object
constructor function will get call and execute code inside and assign value to the empty object just create
Nó sẽ assign cái gì?
"this" trong trường hợp này sẽ reffer to the new Instance that we create
What this means?
this.name = name => person.name = name;
this.age = age =>  person.age = age
function Person(name, age) {
  this.name = name;
  this.age = age;
}
const person = new Person("Thái", 29);
console.log(person);
-------------------------
The value of this inside a class
- Value of this inside a method  of a class behave kind of different so need to bind this
3 big rules of "This"
     1 - with the arrow function this key word will same as the log code right above
     2 - bind. call, apply frist arr will overide the value of this inside the function
     3 - other case, what ever on the left of the dot(.) will be the value of "this"
------------------------
in order to use this across method in a class we're will assign to "instance variable"
const timer = ...
this.timer = ....
------------------------
callback function is a function that pass as a arrgument to another function

***************** setTimeout / setInterval / clear ********************
setTimeout chỉ chạy 1 lần sau thời gian chỉ định
setInterval chạy mãi mãi
clearInterval () dừng chạy 
cách sử dụng setTimeout(run cái gì?, time)     
*/

class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    // assign value to instance variable
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;

    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }

    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
  }

  start = () => {
    if (this.onStart) {
      this.onStart();
    }
    this.tick();
    this.interval = setInterval(this.tick, 1000);
  };

  pause = () => {
    clearInterval(this.interval);
  };

  tick = () => {
    if (this.timeRemaining <= 0) {
      this.pause();
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      // what this say: get time remaining  and set time this value to time remaining
      this.timeRemaining = this.timeRemaining - 1; // what ever on the right side will be (time) in set
      if (this.onTick) {
        this.onTick();
      }
    }
  };

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }
  set timeRemaining(time) {
    this.durationInput.value = time;
  }
}

const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

const timer = new Timer(durationInput, startButton, pauseButton, {
  onStart() {
    console.log("Start draw border when button is");
  },
  onTick() {
    console.log("Timer just ticked down");
  },
  onComplete() {
    console.log("Timer is completed");
  }
});
