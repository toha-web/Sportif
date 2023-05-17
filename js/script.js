// Mobile Menu

let menuBtn = document.querySelector('.mobile_menu-btn');
let menu = document.querySelector('.mobile_menu');

menuBtn.addEventListener('click', function(){
	menuBtn.classList.toggle('active');
	menu.classList.toggle('active');
})
// -----------------


// Filter Menu

window.addEventListener("DOMContentLoaded", () => {
	const width = window.innerWidth;
	const [...tabs] = document.querySelectorAll(".filter_title");
	if(width <= 991){
		tabs.forEach(el => {
			el.nextElementSibling.classList.add("disabled");
		});
	}
});

document.addEventListener("click", (event) => {
	if(event.target.classList[0] === ("filter_title")){
		const filterTitle = event.target;
		const filterBody = filterTitle.nextElementSibling;
		filterTitle.classList.toggle("active");
		filterBody.classList.toggle("disabled");
	}
});
// --------------------


// UP Arrow

document.addEventListener("scroll", () => {
	const up = document.querySelector(".up");
	if(window.pageYOffset > 700){		
		up.classList.remove("disabled");
		up.addEventListener("click", () => {
			window.scrollTo(0, 0);
		});
	}
	else if(window.pageYOffset < 700){
		up.classList.add("disabled");
	}
});
// ----------------------


// Open modal

function modal(){
	const [...card] = document.querySelectorAll(".card");
	const modal = document.querySelector(".modal");
	card.forEach(element => {
		element.addEventListener("click", (event) => {
			if(event.target.className !== "add_btn"){
				modal.classList.remove("disabled");
				modal.addEventListener("click", (event) => {
					if(event.target.className !== "add-to-bag"){
						modal.classList.add("disabled");
					}
				});
			}
		});
	});
};
modal();
// -----------------------