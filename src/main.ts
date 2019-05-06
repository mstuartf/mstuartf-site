// IMAGES ////////////////////////////////////////////////////////////////////////////////////////////////////
import './assets/logo.png';


// 3RD-PARTY CSS /////////////////////////////////////////////////////////////////////////////////////////////
require('animate.css');


// GLOBALS ///////////////////////////////////////////////////////////////////////////////////////////////////
const sectionIds = [1, 2, 3];
const headers = ['Fixed', 'Floating', 'MobileDropdown'];
const navLinkSelector = 'a[href*="#"]';


// SMOOTH SCROLLING //////////////////////////////////////////////////////////////////////////////////////////
const SmoothScroll = require('smooth-scroll');
var scroll = new SmoothScroll(navLinkSelector, {speed: 1000});


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
