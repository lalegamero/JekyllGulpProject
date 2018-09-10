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
