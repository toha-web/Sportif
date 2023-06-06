// Mobile Menu

let menuBtn = document.querySelector('.mobile_menu-btn');
let menu = document.querySelector('.mobile_menu');

menuBtn.addEventListener('click', function(){
	menuBtn.classList.toggle('active');
	menu.classList.toggle('active');
})
// -----------------


// ---- Loading
window.addEventListener("DOMContentLoaded", () => {
	if(window.location.pathname.includes("catalog")){	
		const width = window.innerWidth;
		const [...tabs] = document.querySelectorAll(".filter_title");
		if(width <= 991){
			tabs.forEach(el => {
				el.nextElementSibling.classList.add("disabled");
			});
		}
		for(let i = 0; i < colorsSource.length; i++){
			setFilterColors(colorsSource[i]);
		}
		for(let i = 0; i < sizesSource.length; i++){
			setFilterSizes(sizesSource[i]);
		}
		showCatalog(productList, currentPage);
	}
	if(/*window.location.pathname.includes("index") && */!window.location.pathname.includes("catalog")){
		showPrewCards();
	}
	getCart();
});

document.addEventListener("click", (event) => {
	if( event.target.classList[0] === ("filter_title") ){
		const filterTitle = event.target;
		const filterBody = filterTitle.nextElementSibling;
		filterTitle.classList.toggle("active");
		filterBody.classList.toggle("disabled");
	}
	else if( event.target.type === "radio" ){
		for(let i = 0; i < event.target.parentElement.length; i++){
			if(event.target.parentElement.elements[i].checked){
				event.target.parentElement.elements[i].nextElementSibling.classList.add("checked");
			}
			else{
				event.target.parentElement.elements[i].nextElementSibling.classList.remove("checked");
			}					
		}
	}
	else if( event.target.classList.contains("p_button") ){
		const blockPages = document.querySelector(".pagination");
		const buttonPrev = document.querySelector(".arrow_prew");
		const buttonNext = document.querySelector(".arrow_next");
		if( event.target.classList.contains("active") ){
			event.preventDefault();
		}
		else{					
			if(!event.target.classList.contains("arrow_prew") && !event.target.classList.contains("arrow_next")){
				for(let i = 0; i < blockPages.children.length; i++){
					blockPages.children[i].classList.remove("active");
				}
				event.target.classList.add("active");
				if(+event.target.innerText > 1){
					buttonPrev.style.display = "flex";
					if(+event.target.innerText === pagesCount){
						buttonNext.style.display = "none";
					}
					else if(+event.target.innerText < pagesCount){
						buttonNext.style.display = "flex";
					}
				}
				else if(+event.target.innerText === 1){
					buttonPrev.style.display = "none";
					buttonNext.style.display = "flex";
				}
			}
			else if( event.target.classList.contains("arrow_prew") ){
				buttonNext.style.display = "flex";
				for(let i = 1; i < blockPages.children.length - 1; i++){
					if( blockPages.children[i].classList.contains("active") && event.target !== blockPages.children[i-1]){
						blockPages.children[i-1].classList.add("active");
						blockPages.children[i].classList.remove("active");
						if(event.target === blockPages.children[i-2]){
							buttonPrev.style.display = "none";
						}
						break;
					}					
				}
			}
			else if( event.target.classList.contains("arrow_next") ){
				buttonPrev.style.display = "flex";
				for(let i = blockPages.children.length - 1; i > 0; i--){
					if( blockPages.children[i].classList.contains("active") && event.target !== blockPages.children[i+1]){
						blockPages.children[i+1].classList.add("active");
						blockPages.children[i].classList.remove("active");
						if(event.target === blockPages.children[i+2]){
							buttonNext.style.display = "none";
						}
						break;
					}					
				}
			}
			for(let i = 0; i < blockPages.children.length; i++){
				if( blockPages.children[i].classList.contains("active") ){
					currentPage = +blockPages.children[i].innerText;
					if(filteredList.length > 0){
						showCatalog(filteredList, currentPage);
					}
					else if(filteredList.length === 0){
						showCatalog(productList, currentPage);
					}
				}
			}
			window.scrollTo(0, 0);
		}
	}
});
// --------------------


// ---- UP Arrow

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


// ---- Create Modal
function createModal(prod){
	const modal = document.createElement("div");
	modal.className = "modal";

	const product = document.createElement("div");
	product.className = "product";

	const prodImage = document.createElement("div");
	prodImage.className = "product_image";

	const fullImage = document.createElement("div");
	fullImage.className = "full_img";
	const image = document.createElement("img");
	image.setAttribute("src", `${prod.image}`);
	image.setAttribute("alt", `Шорты ${prod.title}`);
	fullImage.append(image);
	const thumbs = document.createElement("div");
	thumbs.className = "small_imgs";
	const thumb = document.createElement("div");
	thumb.className = "small_img";
	const thumbImage = document.createElement("img");
	thumbImage.setAttribute("src", `${prod.image}`);
	thumbImage.setAttribute("alt", `Шорты ${prod.title}`);
	thumb.append(thumbImage);
	thumbs.append(thumb);
	prodImage.append(fullImage);
	prodImage.append(thumbs);

	const prodInfo = document.createElement("div");
	prodInfo.className = "product_info";

	const prodTitle = document.createElement("div");
	prodTitle.className = "product_title";
	const itemId = document.createElement("span");
	itemId.innerText = `ITEM # 0523 - ${prod.id}`;
	prodTitle.append(`${prod.title} Original Short `, itemId);

	const prodRate = document.createElement("div");
	prodRate.className = "product_rate";
	const rateStars = document.createElement("div");
	rateStars.className = "rate_stars";	
	for(let i = 0; i < prod.rate; i++){
		const rateStar = document.createElement("img");
		rateStar.setAttribute("src", "../img/star-yellow.svg");
		rateStar.setAttribute("alt", "Rate Star");
		rateStars.append(rateStar);
	}
	const rev = document.createElement("span");
	rev.innerText = `${Math.floor( Math.random() * 100 )} Reviews`;
	prodRate.append(rateStars);
	prodRate.append(rev);

	const prodPrice = document.createElement("div");
	prodPrice.className = "product_price";
	const priceSpan = document.createElement("span");
	priceSpan.innerText = "As low as ";
	const price = document.createElement("div");
	price.className = "price";
	price.innerText = `$${prod.price}`;
	prodPrice.append(priceSpan);
	prodPrice.append(price);

	const prodColors = document.createElement("div");
	prodColors.className = "product_colors";
	const colorSpan = document.createElement("span");
	colorSpan.innerText = "Color:";
	const colors = document.createElement("form");
	colors.className = "mcolors";
	colors.setAttribute("autocomplete", "off");
	for(let i = 0; i < prod.color.length; i++){
		const input = document.createElement("input");
		input.setAttribute("type", "radio");
		input.setAttribute("name", "mcolor");
		input.setAttribute("id", `m${prod.id}-${prod.color[i]}`);
		input.setAttribute("value", `${prod.color[i]}`);
		const label = document.createElement("label");
		label.className = "color";
		label.setAttribute("for", `m${prod.id}-${prod.color[i]}`);
		label.style.backgroundColor = prod.color[i];
		colors.append(input);
		colors.append(label);
		if(input.value === prod.selectColor){
			input.checked = true;
			input.nextElementSibling.classList.add("checked");
		}
	}
	prodColors.append(colorSpan);
	prodColors.append(colors);

	const prodSize = document.createElement("div");
	prodSize.className = "product_size";
	const sizeSpan = document.createElement("span");
	sizeSpan.innerText = "Size:";
	const sizes = document.createElement("form");
	sizes.className = "sizes";
	for(let i = 0; i < prod.size.length; i++){
		const input = document.createElement("input");
		input.setAttribute("type", "radio");
		input.setAttribute("name", "size");
		input.setAttribute("id", `${prod.id}-${prod.size[i]}`);
		input.setAttribute("value", `${prod.size[i]}`);
		const label = document.createElement("label");
		label.className = "size";
		label.setAttribute("for", `${prod.id}-${prod.size[i]}`);
		label.innerText = `${prod.size[i]}`;
		sizes.append(input);
		sizes.append(label);
		if(i === 0){
			input.checked = true;
			input.nextElementSibling.classList.add("checked");
		}
	}
	prodSize.append(sizeSpan);
	prodSize.append(sizes);

	const buttons = document.createElement("div");
	buttons.className = "product_add_btns";
	const cartBtn = document.createElement("button");
	cartBtn.className = "add-to-bag";
	cartBtn.innerText = "Add to bag";
	const wishBtn = document.createElement("button");
	wishBtn.className = "add-to-wish";
	wishBtn.innerText = "Add to wishlist";
	buttons.append(cartBtn);
	buttons.append(wishBtn);

	const socials = document.createElement("div");
	socials.className = "product_social";
	const fb = document.createElement("img");
	fb.setAttribute("src", "../img/fb.svg");
	fb.setAttribute("alt", "Facebook");
	const tw = document.createElement("img");
	tw.setAttribute("src", "../img/twitter.svg");
	tw.setAttribute("alt", "Twitter");
	const pi = document.createElement("img");
	pi.setAttribute("src", "../img/pinterest.svg");
	pi.setAttribute("alt", "Pinterest");
	const link = document.createElement("img");
	link.setAttribute("src", "../img/link.svg");
	link.setAttribute("alt", "Link");
	socials.append(fb);
	socials.append(tw);
	socials.append(pi);
	socials.append(link);

	const free = document.createElement("div");
	free.className = "product_free";
	const freeTitle = document.createElement("div");
	freeTitle.className = "free_title";
	freeTitle.innerText = "- Worry Free Shopping -";
	const hr = document.createElement("hr");
	const freeItems = document.createElement("div");
	freeItems.className = "free_items";
	const shipping = document.createElement("div");
	shipping.className = "shipping";
	shipping.innerText = "FREE PRIORITY SHIPPING ON ORDERS $99+*";
	const exchange = document.createElement("div");
	exchange.className = "exchange";
	exchange.innerText = "FREE RETURNS & EXCHANGES*";
	freeItems.append(shipping);
	freeItems.append(exchange);
	free.append(freeTitle);
	free.append(hr);
	free.append(freeItems);

	prodInfo.append(prodTitle);
	prodInfo.append(prodRate);
	prodInfo.append(prodPrice);
	prodInfo.append(prodColors);
	prodInfo.append(prodSize);
	prodInfo.append(buttons);
	prodInfo.append(socials);
	prodInfo.append(free);

	product.append(prodImage);
	product.append(prodInfo);

	modal.append(product);
	modal.addEventListener("click", (event) => {
		if(event.target.type === "radio"){
			for(let i = 0; i < event.target.parentElement.length; i++){
				if(event.target.name === "mcolor"){
					prod.selectColor = event.target.value;
				}
				else if(event.target.name === "size"){
					prod.selectSize = event.target.value;
				}
			}
		}
		else if(event.target.className === "add-to-bag"){
			cartList.push( structuredClone(prod) );
			saveCart(cartList);
			createCartIcon();
			modal.remove();
		}
		else if(event.target.className !== "add-to-bag" && event.target.localName !== "label"){
			modal.remove();
		}
	});

	return modal;
}

// ---- Open modal

function modal(){
	const [...card] = document.querySelectorAll(".card");
	card.forEach(element => {
		const wrapper = document.querySelector(".wrapper");
		let id = parseInt(element.id.slice(1));
		productList[id].selectColor = element.currentColor;
		productList[id].selectSize = element.currentSize;
		element.addEventListener("click", (event) => {
			if(event.target.type === "radio"){
				productList[id].selectColor = event.target.value;
			}
			else if(event.target.className === "add_btn"){
				cartList.push( structuredClone(productList[id]) );
				saveCart(cartList);
				createCartIcon();
			}
			else if(event.target.className === "card"){
				wrapper.append( createModal(productList[id]) );
			}
		});
	});
};
// -----------------------


// ---- Products

class Product{
	constructor(id){
		this.id = id;
		this.image = images[id];
		this.title = getTitle(id);
		this.rate = getRate();
		this.price = getPrice();
		this.color = getColor();
		this.size = getSize();
	}
}

const sizesSource = [36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 66, 70];
const colorsSource = ["beige", "blue", "darkred", "violet", "white", "yellow", "green", "coral", "brown", "orange", "pink"];

function getPrice(){
	return Math.floor(350 + Math.random() * 410);
}
function getSize(){
	let count = Math.round(3.5 + (Math.random() * 10 + 1.5) / 3);
	let sizes = [];
	for(count; count > 0; count--){
		let index = Math.floor(Math.random() * sizesSource.length)
		if(!sizes.includes(sizesSource[index])){
			sizes.push(sizesSource[index]);
		}
		else{
			continue;
		}
	}
	return sizes.sort( (a, b) => a - b);
}
function getRate(){
	return Math.round( 2.5 + ( Math.random() * (1.5 + 1) ) );
}
function getColor(){
	let count = Math.round(2.5 + (Math.random() * 10 + 1.5) / 3);
	let colors = [];
	for(count; count > 0; count--){
		let index = Math.floor(Math.random() * colorsSource.length)
		if(!colors.includes(colorsSource[index])){
			colors.push(colorsSource[index]);
		}
		else{
			continue;
		}
	}
	return colors;
}
function getTitle(id){
	if(id < brand.length){
		return brand[id];
	}
	else if(id >= brand.length){
		let divider = Math.floor(id / brand.length);
		return brand[id - brand.length * divider];
	}
}

const brand = ["Feel and Fly", "HiBrand", "Exclusive", "Aeropostale", "Without", "Роза", "Benetton", "DEFACTO", "AGER", "Love&Live", "QUIK SILVER", "Levi's", "Custom Wear", "GAP", "Esprit", "Promin", "H&M", "C&A", "Tommy Hilfiger", "Daniel Hechter", "Errea", "Old Navy", "Banana Republic", "Koton", "Pit Bull", "Angelo litrico", "American giant", "THE SMURFS", "MTP", "Diesel", "Cos", "Kiabi", "Weekday", "Calvin Klein", "Clockhouse"];

const images = ["https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20211203/131/20211203131837_005930345_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20190405/094/20190405094037_003221405_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20190405/094/20190405094037_003221405_4.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220217/132/20220217132229_006007306_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220729/112/20220729112353_006066691_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20211203/131/20211203131713_005930344_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20230417/154/20230417154536_006270157_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20230417/154/20230417154536_006270157_2.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220726/181/20220726181225_006062255_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20230417/154/20230417154536_006270160_2.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20230315/163/20230315163932_006246870_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220217/132/20220217132229_006007311_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220217/132/20220217132229_006007311_4.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220217/132/20220217132229_006007317_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220217/132/20220217132229_006007319_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220217/132/20220217132229_006007297_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220217/132/20220217132229_006007316_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220217/132/20220217132229_006007316_4.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220720/195/20220720195139_006056888_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220614/175/20220614175225_005808046_8.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220217/132/20220217132229_006007308_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220217/132/20220217132229_006007313_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220217/132/20220217132229_006007313_4.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220217/132/20220217132229_006007318_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20230315/163/20230315163932_006246867_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20230315/163/20230315163932_006246871_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20230406/165/20230406165455_006263432_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20230406/165/20230406165455_006263432_4.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20230417/154/20230417154536_006270156_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20230228/090/20230228090822_006174863_6.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20230406/165/20230406165455_006263433_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20230315/163/20230315163932_006246869_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20230315/163/20230315163932_006246869_2.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220726/181/20220726181226_006062269_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20230426/092/20230426092625_006281293_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220726/181/20220726181225_006062258_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20210701/112/20210701112559_005803063_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20160429/175/20160429175153_002294472_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20190405/094/20190405094726_004978871_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20200707/171/20200707171035_005478872_2.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220217/132/20220217132229_006007310_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220217/132/20220217132229_006007310_2.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220217/132/20220217132229_006007307_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220720/195/20220720195139_006056893_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220217/132/20220217132229_006007305_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220726/181/20220726181226_006062267_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220726/181/20220726181226_006062267_2.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220729/112/20220729112352_006066627_2.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220729/112/20220729112352_006066628_2.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220720/195/20220720195139_006056890_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20210310/094/20210310094623_005690666_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20230426/092/20230426092625_006281282_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20230214/152/20230214152716_006131093_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20230426/092/20230426092625_006281278_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20230426/092/20230426092625_006281280_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20230426/092/20230426092625_006281280_2.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20230426/092/20230426092625_006281273_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20230426/092/20230426092625_006281279_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20210415/000/20210415000441_005733193_4.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220729/112/20220729112353_006066688_3.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20210415/000/20210415000441_005733192_6.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20210415/000/20210415000441_005733192_3.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20230426/092/20230426092625_006281281_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220715/161/20220715161946_006056086_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20230417/154/20230417154536_006270158_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220726/181/20220726181225_006062257_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220726/181/20220726181225_006062257_3.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20230426/092/20230426092625_006281272_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20221013/215/20221013215519_006100787_2.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20230228/090/20230228090913_006178680_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20230228/090/20230228090924_006179079_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20230228/090/20230228090924_006179079_3.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20221013/215/20221013215518_006100751_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20230315/163/20230315163932_006246868_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20230417/154/20230417154536_006270159_3.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20230406/165/20230406165455_006263432_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20230406/165/20230406165455_006263432_3.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220813/003/20220813003648_006069352_17.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220720/195/20220720195139_006056889_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220721/144/20220721144147_006052747_19.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220715/161/20220715161946_006056198_3.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220715/161/20220715161946_006056198_2.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20221013/215/20221013215519_006100788_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20230426/092/20230426092625_006281295_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220726/181/20220726181226_006062266_2.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220715/161/20220715161946_006056197_3.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220715/161/20220715161946_006056197_2.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220726/181/20220726181225_006062261_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20230426/092/20230426092625_006281277_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20230426/092/20230426092626_006281303_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220826/122/20220826122039_006080406_1.jpg", "https://cdn.lbtq.io/productImage/resize/300x400_40cd750bba9870f18aada2478b24840a/20220826/122/20220826122039_006080406_3.jpg"];


// ---- Add Sizes Filter
function setFilterSizes(size){
	const form = document.querySelector(".filter_size form");
	const input = document.createElement("input");
	input.setAttribute("type", "radio");
	input.setAttribute("name", "size");
	input.setAttribute("id", `filter-${size}`);
	input.setAttribute("value", `${size}`);
	const label = document.createElement("label");
	label.setAttribute("for", `${input.id}`);
	const span = document.createElement("span");
	span.innerText = size;
	label.appendChild(span);
	form.appendChild(input);
	form.appendChild(label);
	input.addEventListener("change", () => {
		filtering();
		if(window.innerWidth <= 991){
			document.querySelector(".filter_size .filter_title").classList.toggle("active");
			document.querySelector(".filter_size .filter_title").nextElementSibling.classList.toggle("disabled")
		}
	});
}


// ---- Add Color Filter
function setFilterColors(color){
	const form = document.querySelector(".filter_color form");
	const input = document.createElement("input");
	input.setAttribute("type", "radio");
	input.setAttribute("name", "color");
	input.setAttribute("id", `filter-${color}`);
	input.setAttribute("value", `${color}`);
	const label = document.createElement("label");
	label.setAttribute("for", `${input.id}`);
	const span = document.createElement("span");
	span.style.backgroundColor = color;
	label.appendChild(span);
	form.appendChild(input);
	form.appendChild(label);
	input.addEventListener("change", () => {
		filtering();
		if(window.innerWidth <= 991){
			document.querySelector(".filter_color .filter_title").classList.toggle("active");
			document.querySelector(".filter_color .filter_title").nextElementSibling.classList.toggle("disabled")
		}
	});
}


// ---- Create Card
function createCard(prod, flag){
	const card = document.createElement("div");
	card.className = "card";

	const imgBlock = document.createElement("div");
	imgBlock.className = "card_image";
	const image = document.createElement("img");
	image.setAttribute("src", prod.image);
	image.setAttribute("alt", `Шорты ${prod.title}`);
	imgBlock.append(image);

	const title = document.createElement("div");
	title.className = "card_title";
	title.innerText = `${prod.title}`;

	const rate = document.createElement("div");
	rate.className = "card_rate";
	for(let i = 0; i < prod.rate; i++){
		const rateStar = document.createElement("img");
		rateStar.setAttribute("src", "/img/star-yellow.svg");
		rateStar.setAttribute("alt", "Rate");
		rate.append(rateStar);
	}

	const price = document.createElement("div");
	price.className = "price";
	const priceSpan = document.createElement("span");
	priceSpan.innerText = "As low as ";
	price.append(priceSpan, `$${prod.price}`);

	const colorBlock = document.createElement("div");
	colorBlock.className = "color";
	const colorForm = document.createElement("form");
	colorForm.setAttribute("autocomplete", "off");
	colorBlock.append(colorForm);
	for(let i = 0; i < prod.color.length; i++){
		const input = document.createElement("input");
		input.setAttribute("type", "radio");
		input.setAttribute("name", "color");
		input.setAttribute("id", `${prod.id}-${prod.color[i]}`);
		input.setAttribute("value", `${prod.color[i]}`);
		const label = document.createElement("label");
		label.setAttribute("for", `${prod.id}-${prod.color[i]}`);
		const colorSpan = document.createElement("span");
		colorSpan.style.backgroundColor = prod.color[i];
		label.append(colorSpan);
		colorForm.append(input);
		colorForm.append(label);
		if(i === 0){
			input.checked = true;
			input.nextElementSibling.classList.add("checked");
		}
	}

	const buttonAdd = document.createElement("div");
	buttonAdd.className = "add_btn";
	buttonAdd.innerText = "Add to cart";

	card.append(imgBlock);
	card.append(title);
	card.append(rate);
	card.append(price);
	if(flag){
		card.append(colorBlock);
	}
	card.append(buttonAdd);
	card.setAttribute("id", `c${prod.id}`);
	card.currentColor = prod.color[0];
	card.currentSize = prod.size[0];
	return card;
}


// ---- Create ProductList
const productList = [];
for(let i = 0; i < images.length; i++){
	productList.push( new Product(i) );
}
let filteredList = [];


function showCatalog(list, cur){
	const catalog = document.querySelector(".catalog .cards");
	pagesCount = Math.ceil(list.length / itemsOnPage);
	createPageButtons(pagesCount, cur);
	catalog.replaceChildren();
	for(let i = 0; i < itemsOnPage; i++){
		if(list[itemsOnPage * (currentPage - 1) + i]){
			catalog.append( createCard(list[itemsOnPage * (currentPage - 1) + i], 1) );
		}
		else{
			break;
		}		
	}
	modal();
}
function filtering(){
	const catalog = document.querySelector(".catalog .cards");
	const [...sizes] = document.querySelectorAll(".filter_size form > input")
	const [...colors] = document.querySelectorAll(".filter_color form > input")
	let size, color;
	sizes.forEach(el => {
		if(el.checked === true){
			size = +el.value;
		}
	});
	colors.forEach(el => {
		if(el.checked === true){
			color =  el.value;
		}
	});
	if(color && !size){
		filteredList = productList.filter(el => el.color.includes(color));
	}
	else if(!color && size){
		filteredList = productList.filter(el => el.size.includes(size));
	}
	else if(color && size){
		filteredList = productList.filter(el => el.color.includes(color) && el.size.includes(size));
	}
	currentPage = 1;
	showCatalog(filteredList, currentPage);
}


// ---- Create FirstPage Cards
function showPrewCards(){
	const catPrew = document.querySelector(".catalog_prew .cards");
	let prewCardsList = [];
	for(let i = 0; i < 4; i++){
		let random = Math.floor( Math.random() * productList.length);
		if(!prewCardsList.includes(productList[random])){
			prewCardsList.push(productList[random]);
			catPrew.append( createCard(productList[random]) );
		}
		else if(prewCardsList.includes(productList[random])){
			continue;
		}
	}
	modal();
}



// ---- Create Shopping Cart
let cartList = [];

function showCart(){
	const wrapper = document.querySelector(".wrapper");
	const modal = document.createElement("div");
	modal.className = "modal";

	const cart = document.createElement("div");
	cart.className = "cart";

	const cartTitle = document.createElement("h2");
	cartTitle.innerText = "Ваши покупки:";

	const cartBody = document.createElement("table");
	const cartBodyHeader = document.createElement("thead");
	cartBodyHeader.insertAdjacentHTML("afterbegin", "<tr><td></td><td>Товар</td><td>Размер</td><td>Цвет</td><td>Цена</td><td>Удалить</td></tr>");

	cartBody.append(cartBodyHeader);
	cartBody.append( createCartBody(modal) );

	cart.append(cartTitle);
	cart.append(cartBody);

	modal.append(cart);
	wrapper.append(modal);

	modal.addEventListener("click", (e) => {
		if(e.target.className !== "close"){
			modal.remove();
		}		
	})
}

function createCartBody(modal){
	const cartBodyProd = document.createElement("tbody");
	cartList.forEach((prod, i) => {
		const cartProd = document.createElement("tr");
		cartProd.insertAdjacentHTML("afterbegin", `
		<td><img src="${prod.image}" alt="${prod.title}"></td>
		<td><p>${prod.title}</p></td>
		<td><p>${prod.selectSize}</p></td>
		<td><p>${prod.selectColor}</p></td>
		<td><p>$${prod.price}</p></td>
		`);
		const del = document.createElement("td");
		const delIcon = document.createElement("img");
		delIcon.className = "close";
		delIcon.setAttribute("src", "../img/close.png");
		delIcon.setAttribute("alt", "Delete");
		del.append(delIcon);
		cartProd.append(del);

		cartBodyProd.append(cartProd);

		del.addEventListener("click", () => {
			if(cartList.length > 1){
				cartList.splice(i, 1);
				saveCart(cartList);
				modal.remove();
				showCart();
				createCartIcon();
			}
			else if(cartList.length === 1){
				cartList.length = 0;
				modal.remove();
				document.querySelector(".cart_icon").remove();
				localStorage.clear();
			}			
		});
	});
	return cartBodyProd;
}

function createCartIcon(){
	if(document.querySelector(".cart_icon")){
		document.querySelector(".cart_icon").remove();
	}	
	const wrapper = document.querySelector(".wrapper");
	const icon = document.createElement("div");
	icon.className = "cart_icon";
	const iconImage = document.createElement("img");
	iconImage.setAttribute("src", "../img/cart2.png");
	iconImage.setAttribute("alt", "Cart Icon");
	const cartCount = document.createElement("span");
	cartCount.innerText = `${cartList.length}`;
	icon.append(iconImage);
	icon.append(cartCount);
	wrapper.append(icon);

	icon.addEventListener("click", () => {
		showCart();
	});
}


// ---- Create Pagination
let itemsOnPage = 10;
let pagesCount;
let currentPage = 1;

function createPageButtons(count, cur){
	const blockPages = document.querySelector(".pagination");
	blockPages.replaceChildren();
	for(let i = 0; i < (count + 2); i++){
		const button = document.createElement("button");
		button.className = "p_button";
		if(i === 0){
			button.classList.add("arrow_prew");
		}
		else if(i === cur){
			button.innerText = i;
			button.classList.add("active");
			if(cur > 1){
				document.querySelector(".arrow_prew").style.display = "flex";
			}
		}
		else if(i === (count + 2) - 1){
			button.classList.add("arrow_next");
			if(cur === count){
				button.style.display = "none";
			}
		}
		else{
			button.innerText = i;
		}
		blockPages.append(button);
	}
}


// ---- Save Cart to LocaleStorage
function saveCart(list){
	localStorage.setItem("cart", JSON.stringify(list));
}
function getCart(){
	if(localStorage.length > 0){
		cartList = JSON.parse(localStorage.cart);
		createCartIcon();
	}
}


// ---- Search
document.addEventListener("input", (event) => {
	if(event.target.type === "search"){
		const input = event.target;
		input.addEventListener("blur", () => {
			setTimeout(() => {
				input.nextElementSibling.replaceChildren();
				input.nextElementSibling.classList.add("disabled");
				input.value = "";
			}, 200);
		});
		if(input.value === ""){
			input.nextElementSibling.replaceChildren();
			input.nextElementSibling.classList.add("disabled");
		}
		else{
			input.nextElementSibling.replaceChildren();
			input.nextElementSibling.classList.remove("disabled");
			let i = 0;
			search(input, input.value, input.dataset.flag, i);
		}		
	}
});

function search(input, value, flag, i){
	productList.filter(prod => {
		let productValues = Object.values(prod).flat();
		productValues.forEach(el => {
			if( el.toString().toLowerCase().includes(value.toString().toLowerCase()) ){
				showSearchResult(input, prod, flag, i++)
			}
		})
	});
}

function showSearchResult(input, item, flag, i){
	if(i > 9) return;
	const result = input.nextElementSibling;

	const resultItem = document.createElement("div");
	resultItem.className = "result_item";
	resultItem.classList.add(flag);

	const resultImg = document.createElement("div");
	resultImg.className = "res_img";
	const resImage = document.createElement("img");
	resImage.src = item.image;
	resImage.alt = item.title;
	resultImg.append(resImage);

	const resultTitle = document.createElement("div");
	resultTitle.innerText = `${item.title}`;

	const resultSize = document.createElement("div");
	resultSize.innerText = `${item.size[0]} - ${item.size.at(-1)}`;

	const resultColor = document.createElement("div");
	resultColor.innerText = "Various";

	const resultPrice = document.createElement("div");
	resultPrice.innerText = `$${item.price}`;

	resultItem.append(resultImg);
	resultItem.append(resultTitle);
	if(flag === "bg"){
		resultItem.append(resultSize);
		resultItem.append(resultColor);
	}
	resultItem.append(resultPrice);

	result.append(resultItem);

	resultItem.addEventListener("click", () => {
		const wrapper = document.querySelector(".wrapper");
		wrapper.append( createModal(item) );
	});
}