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
(function(){
  const serviceListItem = document.querySelectorAll('.service-list li');
  const insuranceFeatures = document.querySelectorAll('.auto-ins-bullet-list');

  for (let i = 0; i < serviceListItem.length; i++) {
    serviceListItem[i].onclick = function() {
      const x = this.getAttribute('id');
      console.log(x);

      for (let j = 0; j < insuranceFeatures.length; j++) {
          if (this.getAttribute('hide-show') === x) {
            console.log('vamossss!!');
          }
      }
    }
  }
}());
