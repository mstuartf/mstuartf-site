// IMAGES
import './assets/logo.png';


// SMOOTH SCROLLING
const SmoothScroll = require('smooth-scroll');
var scroll = new SmoothScroll('a[href*="#"]', {speed: 1000});


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

const ids = [1, 2, 3];
const headers = ['Fixed', 'Floating'];
headers.forEach(header => ids.forEach(id => setupButtonHoverListeners(`section${id}Link${header}`)));

