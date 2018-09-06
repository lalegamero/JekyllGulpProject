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

/* Funtion to show/hide all insurance services at the home page */
