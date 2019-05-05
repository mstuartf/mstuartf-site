// IMAGES
import './assets/logo.png';

const sectionIds = [1, 2, 3];
const headers = ['Fixed', 'Floating', 'MobileDropdown'];
const navLinkSelector = 'a[href*="#"]';

// SMOOTH SCROLLING
const SmoothScroll = require('smooth-scroll');
var scroll = new SmoothScroll(navLinkSelector, {speed: 1000});


// FLOATING HEADER
const floatingHeader = document.getElementById('floatingHeader');
function updateScroll() {
	floatingHeader.style.height = window.scrollY > 200 ? '53px' : '0';
}
window.addEventListener('scroll', updateScroll);


// HOVER UNDERLINE
const addUnderline = (span: HTMLElement) => span.style['background-color'] = 'white';
const removeUnderline = (span: HTMLElement) => span.style['background-color'] = 'unset';

const setupButtonHoverListeners = (linkId: string) => {
	const link: HTMLElement = document.getElementById(linkId);
	const linkUnderline: HTMLElement = document.getElementById(linkId + 'Underline');
	link.addEventListener('mouseenter', () => addUnderline(linkUnderline));
	link.addEventListener('mouseleave', () => removeUnderline(linkUnderline));
}

headers.forEach(header => sectionIds.forEach(id => setupButtonHoverListeners(`section${id}Link${header}`)));


// ANIMATED BURGER
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
