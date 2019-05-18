// 3RD-PARTY CSS /////////////////////////////////////////////////////////////////////////////////////////////
require('animate.css');


// GLOBALS ///////////////////////////////////////////////////////////////////////////////////////////////////
const sectionIds = [1, 2, 3];
const headers = ['Fixed', 'Floating', 'MobileDropdown'];
const navLinkSelector = 'a[href*="#"]';


// SMOOTH SCROLLING //////////////////////////////////////////////////////////////////////////////////////////
const SmoothScroll = require('smooth-scroll');
const scrollInstance = new SmoothScroll(navLinkSelector, {speed: 1000});


// FLOATING HEADER ///////////////////////////////////////////////////////////////////////////////////////////
const floatingHeader = document.getElementById('floatingHeader');
function updateScroll() {
	floatingHeader.style.height = window.scrollY > 200 ? '53px' : '0';
}
window.addEventListener('scroll', updateScroll);


// VIEW ANIMATIONS ///////////////////////////////////////////////////////////////////////////////////////////
const isInView = (element: Element) => {
	const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
	return element.getBoundingClientRect().top && element.getBoundingClientRect().top < viewportHeight;
}
const triggerAnimations = () => {
	const elements = document.querySelectorAll("[class*=view-animate-]");
	elements.forEach(element => {
		if (isInView(element)) {
			const delayClass = element.classList.value.split(' ').find(cl => cl.startsWith('view-animate-'));
			const animationClass = delayClass.replace('view-animate-', '');
			element.classList.add('animated', animationClass);
			element.classList.remove(delayClass);
		}
	})
}
window.addEventListener('scroll', triggerAnimations);


// ANIMATED BURGER ///////////////////////////////////////////////////////////////////////////////////////////
let burgerOpen = false;
const mobileMenu = document.getElementById('mobileMenu');

const toggleBurgerMenuOpen = () => {
	headers.forEach(header => {
		const burger = document.getElementById(`burgerMenu${header}`);
		burger.classList.toggle('burger-menu-open');
	});
	mobileMenu.classList.toggle('h-full');
	burgerOpen = !burgerOpen;
};

const setupBurgerClickListeners = (burgerId: string) => {
	const burger = document.getElementById(burgerId);
	burger.addEventListener('click', () => toggleBurgerMenuOpen());
}

headers.forEach(header => setupBurgerClickListeners(`burgerMenu${header}`));

// mobile dropdown should always close when they click a link
const allLinks = document.querySelectorAll(navLinkSelector);
allLinks.forEach(link => link.addEventListener('click', () => burgerOpen && toggleBurgerMenuOpen()));


// CONTACT FORM //////////////////////////////////////////////////////////////////////////////////////////////
const contactForm = document.forms['contactForm'];
const submitButton = <HTMLInputElement> document.getElementById('contactFormButton');
const contactFormUrl = 'https://fbz3wd9b0e.execute-api.eu-west-2.amazonaws.com/prod/new_enquiry';

interface ContactPayload {
	name: string;
	email: string;
	message: string;
}

const checkContactForm = () => {
	let formValid = true;
	for (var i = 0; i < contactForm.elements.length; i++) {  // can't use forEach as not an array
		if (!contactForm.elements[i].checkValidity()) {
			formValid = false;
		}
	}
	submitButton.disabled = !formValid;
}

const nameInput = <HTMLInputElement> document.getElementById('nameInput');
const emailInput = <HTMLInputElement> document.getElementById('emailInput');
const messageInput = <HTMLInputElement> document.getElementById('messageInput');

const submitContactForm = () => {
	toggleLoadingSpinner();
	const xhttp = new XMLHttpRequest();
	const payload = buildPayload();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4) {
	    	console.log(this.response);
	       if (this.status == 200) {
	       	handleSubmitSuccess()
	       }
	       else {
	       	handleSubmitFailure(this.response);
	       }
	    }
	};
	xhttp.open("POST", contactFormUrl, true);
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send(JSON.stringify(payload));
}

const wipeForm = () => {
	for (var i = 0; i < contactForm.elements.length; i++) {  // can't use forEach as not an array
		contactForm.elements[i].value = '';
	}
	checkContactForm();
}

const toggleLoadingSpinner = () => {
	const spinner = document.getElementById('loadingSpinner');
	spinner.classList.toggle('hidden');
	spinner.classList.toggle('flex');
}

const buildPayload = (): ContactPayload => {
	return {
		name: nameInput.value,
		email: emailInput.value,
		message: messageInput.value,
	}
}

const handleSubmitSuccess = () => {
	wipeForm();
	toggleLoadingSpinner();
	showPopup('Thanks!', 'Thanks for your enquiry - I\'ll be in touch soon!');
}

const handleSubmitFailure = (resp) => {
	toggleLoadingSpinner();
	showPopup('Error', resp);
}

// add event listeners for input and button
for (var i = 0; i < contactForm.elements.length; i++) {  // can't use forEach as not an array
	contactForm.elements[i].addEventListener('keyup', () => checkContactForm());
}
submitButton.addEventListener('click', () => submitContactForm());


// POPUPS ////////////////////////////////////////////////////////////////////////////////////////////////////

const togglePopup = () => {
	const spinner = document.getElementById('contactPopup');
	spinner.classList.toggle('hidden');
	spinner.classList.toggle('flex');
}

const showPopup = (title: string, message: string) => {
	document.getElementById('popupTitle').innerHTML = title;
	document.getElementById('popupMessage').innerHTML = message;
	togglePopup();
}

document.getElementById('popupButton').addEventListener('click', () => togglePopup());

