let menuBtn = document.querySelector('.mobile_menu-btn');
let menu = document.querySelector('.mobile_menu');

menuBtn.addEventListener('click', function(){
	menuBtn.classList.toggle('active');
	menu.classList.toggle('active');
})