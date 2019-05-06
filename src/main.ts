// IMAGES ////////////////////////////////////////////////////////////////////////////////////////////////////
import './assets/logo.png';


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
