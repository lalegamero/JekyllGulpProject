/* Navigation menu for medium & small devices */
(function(){
    var burger = document.querySelector('.mobile-nav-toggle');
    var content = document.querySelector('.mobile-container');

    burger.onclick = function() {
        content.classList.toggle('menu-opened');
        window.scrollTo(0, 0);
    }
}());

/* Function to show/hide the contact pop up window */
(function(){
    var envelopeBtn = document.querySelector('.help-nav-toggle');
    var contactPopUp = document.querySelector('.contact-mobile-nav');

    envelopeBtn.onclick = function() {
        contactPopUp.classList.toggle('show-window');
    }
}());

/* Function to display all insurance services related to any service */
/*
function onTabClick(event) {
  let activeTabs = document.querySelectorAll('.active');
  event.preventDefault();

  // deactivate existing active tab and panel
  for( let i = 0; i < activeTabs.length; i++) {
    activeTabs[i].className = activeTabs[i].className.replace('active', '');
  }

  // activate new tab and panel
  event.target.className += ' active';
  document.getElementById(event.target.querySelector('a').getAttribute('href').split('#')[1]).className += ' active';
}

const homeServiceList = document.getElementById('homeServiceList');
homeServiceList.addEventListener('click', onTabClick, false);
*/

/* Function to control testimonials message boxes */
let messageBox = document.querySelectorAll('.testimonials-message-box');
let btnLeft = document.querySelector('.arrow-left');
let btnRight = document.querySelector('.arrow-right');
let current = 0;

// Clear all boxes
function resetBoxes() {
  for (let i = 0; i < messageBox.length; i++) {
    messageBox[i].style.display = "none";
  }
}

// Init the boxes
function initBoxes() {
  resetBoxes();
  messageBox[0].style.display = "block";
  messageBox[1].style.display = "block";
}

// Show previous box
function boxLeft() {
  resetBoxes();
  messageBox[current - 1].style.display = "block";
  current--;
}

// Show next box
function boxRight() {
  resetBoxes();
  messageBox[current + 1].style.display = "block";
  current++;
}

// Left arrow click
btnLeft.addEventListener("click", function() {
  if (current === 0) {
    current = messageBox.length;
  }
  boxLeft();
});

// Right arrow click
btnRight.addEventListener("click", function() {
  if (current === messageBox.length - 1) {
    current = -1;
  }
  boxRight();
});

initBoxes();
