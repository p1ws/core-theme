/*
 * P1WS Core Scripts File
 * Author: P1WS
 *
 * This file should contain any js scripts you want to add to the site.
 * Instead of calling it in the header or throwing it inside wp_head()
 * this file will be called automatically in the footer so as not to
 * slow the page load.
 *
 * There are a lot of example functions and tools in here. If you don't
 * need any of it, just remove it. They are meant to be helpers and are
 * not required. It's your world baby, you can do whatever you want.
 */

/*
 * Get Viewport Dimensions
 * returns object with viewport dimensions to match css in width and height properties
 * ( source: http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript )
 */
function updateViewportDimensions() {
	var w = window,
		d = document,
		e = d.documentElement,
		g = d.getElementsByTagName('body')[0],
		x = w.innerWidth || e.clientWidth || g.clientWidth,
		y = w.innerHeight || e.clientHeight || g.clientHeight;
	return {
		width: x,
		height: y
	};
}
// setting the viewport width
var viewport = updateViewportDimensions();

/*
 * Throttle Resize-triggered Events
 * Wrap your actions in this function to throttle the frequency of firing them off, for better performance, esp. on mobile.
 * ( source: http://stackoverflow.com/questions/2854407/javascript-jquery-window-resize-how-to-fire-after-the-resize-is-completed )
 */
var waitForFinalEvent = (function () {
	var timers = {};
	return function (callback, ms, uniqueId) {
		if (!uniqueId) {
			uniqueId = "Don't call this twice without a uniqueId";
		}
		if (timers[uniqueId]) {
			clearTimeout(timers[uniqueId]);
		}
		timers[uniqueId] = setTimeout(callback, ms);
	};
})();

// how long to wait before deciding the resize has stopped, in ms. Around 50-100 should work ok.
var timeToWaitForLast = 100;

/*
 * Here's an example so you can see how we're using the above function
 *
 * This is commented out so it won't work, but you can copy it and
 * remove the comments.
 *
 * If we want to only do it on a certain page, we can setup checks so we do it
 * as efficient as possible.
 *
 * if( typeof is_home === "undefined" ) var is_home = $('body').hasClass('home');
 *
 * This once checks to see if you're on the home page based on the body class
 * We can then use that check to perform actions on the home page only
 *
 * When the window is resized, we perform this function
 * $(window).resize(function () {
 *
 *    // if we're on the home page, we wait the set amount (in function above) then fire the function
 *    if( is_home ) { waitForFinalEvent( function() {
 *
 *	// update the viewport, in case the window size has changed
 *	viewport = updateViewportDimensions();
 *
 *      // if we're above or equal to 768 fire this off
 *      if( viewport.width >= 768 ) {
 *        console.log('On home page and window sized to 768 width or more.');
 *      } else {
 *        // otherwise, let's do this instead
 *        console.log('Not on home page, or window sized to less than 768.');
 *      }
 *
 *    }, timeToWaitForLast, "your-function-identifier-string"); }
 * });
 *
 * Pretty cool huh? You can create functions like this to conditionally load
 * content and other stuff dependent on the viewport.
 * Remember that mobile devices and javascript aren't the best of friends.
 * Keep it light and always make sure the larger viewports are doing the heavy lifting.
 *
 */

/*
 * We're going to swap out the gravatars.
 * In the functions.php file, you can see we're not loading the gravatar
 * images on mobile to save bandwidth. Once we hit an acceptable viewport
 * then we can swap out those images since they are located in a data attribute.
 */
function loadGravatars() {
	// set the viewport using the function above
	viewport = updateViewportDimensions();
	// if the viewport is tablet or larger, we load in the gravatars
	if (viewport.width >= 768) {
		jQuery('.comment img[data-gravatar]').each(function () {
			jQuery(this).attr('src', jQuery(this).attr('data-gravatar'));
		});
	}
} // end function

/*
 * Put all your regular jQuery in here.
 */
jQuery(document).ready(function ($) {

	/*
	 * Let's fire off the gravatar function
	 * You can remove this if you don't need it
	 */
	loadGravatars();

	// Progressive Enhancement for Object-Fit
	if (!Modernizr.objectfit) {
		$('.objectfit-container').each(function () {
			var $container = $(this),
				imgUrl = $container.find('img').prop('src');

			if (imgUrl) {
				$container
					.css('backgroundImage', 'url(' + imgUrl + ')')
					.addClass('objectfit-fallback');
			}
		});
	}

	//Make Mobile Menu click to open menu
	//$('#nav--mobile__menu #responsive-menu-button').click(function(e){
	//	e.preventDefault();
	//	console.log('button is pressed');
	//	$('#header--global__content nav button').click();
	//	$(this).toggleClass('is-active');
	//});


	//Asynchronously Load iframes	
	jQuery(document).ready(function ($) {

		$('.async-iframe').each(function () {
			var iframe_url = $(this).attr('data-url');
			$(this).attr('src', iframe_url);
		});

	});

	/***********************
	Main Navigation and Mobile Navigation Functions
	***********************/
	//Main Navigation Arrow Dropdown
	$(document).ready(function () {
		$('#site__navigation nav ul#menu-main-navigation .menu-item-has-children > a').after('<div class="menu-main-menu__dropdown"><i class="far fa-chevron-down"></i></div>');
		//Check for which page is current and click the needed arrows to show current drop down
		function clickArrows2(){
			$('.current_page_item .menu-main-menu__dropdown').closest('.current-menu-parent').trigger('click');
		}

		function clickArrows(){
			$('.current-menu-ancestor > .menu-main-menu__dropdown').trigger("click");
		}

		setTimeout(clickArrows2, 2000);
		setTimeout(clickArrows, 500);

		$('.menu-main-menu__dropdown').click(function (e) { //Make the arrow
			e.preventDefault(); //Prevent the Arrow from navigating user to link
			let togglearrow = $(this).find('i');
			togglearrow.toggleClass('active-dropdown');
			let parent = $(this).closest('.menu-item-has-children');
			let child = parent.find('> .sub-menu');
			child.toggle('slow');
		});
	});

	// Mobile Navigation Slide Out clicking menu button
	$('.menu-bars').click(function(){
		$('.menu-bars').addClass('hidden');
		$('.menu-exit').removeClass('hidden');
		$('#site__navigation').addClass('site-navigation__open');

	});
	$('.menu-exit').click(function(){
		$('.menu-exit').addClass('hidden');
		$('.menu-bars').removeClass('hidden');
		$('#site__navigation').removeClass('site-navigation__open');
	});

	// Mobile Navigation Slide Out clicking search button
	$('#nav--mobile__search-btn').click(function(){
		console.log('search button clicked');
		$('#menu-bars').addClass('hidden');
		$('#menu-exit').removeClass('hidden');
		$('#site__navigation').addClass('site-navigation__open');
	});

	// MOBILE MENU MODAL

	const openModal = document.querySelectorAll("[data-open]");
	const closeModal = document.querySelectorAll("[data-close]");
	const isVisible = "is-visible";

	// CAN CONVERT TO JQUERY 

	for (const el of openModal) {
		el.addEventListener("click", function () {
			const modalId = this.dataset.open;
			document.getElementById(modalId).classList.add(isVisible);
		});
	}

	for (const el of closeModal) {
		el.addEventListener("click", function () {
			this.parentElement.parentElement.parentElement.classList.remove(isVisible);
		});
	}

	document.addEventListener("click", e => {
		if (e.target == document.querySelector(".modal.is-visible")) {
			document.querySelector(".modal.is-visible").classList.remove(isVisible);
		}
	});

	document.addEventListener("keyup", e => {
		// if we press the ESC
		if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
			document.querySelector(".modal.is-visible").classList.remove(isVisible);
		}
	});

	// === HOMEPAGE VIDEO MODAL === // JQUERY VERSION:

	// 	.$("span").hide();

	// Open modal on click 
	$(function() {
		$('#home-video__modal-btn').on('click', function() {
			$('#home-video__modal').show();
		})
	})

	// Close modal on click
	$('.close-modal').click(function() {
		$('#home-video__modal').hide();
	})

	// When the user clicks outside, trigger modal close
	$('#home-video__modal').click(function() {
		$('#home-video__modal').hide();
	})

	// When the user hits esc, hide modal
	$(function () {
		$('body').on("keyup", e => {
			if (e.key == "Escape") {
				$("#home-video__modal").hide();
			}
		})	
	})

	// Progressive Enhancement for Object-Fit
	if (!Modernizr.objectfit) {
		$('.objectfit-container').each(function () {
			var $container = $(this),
				imgUrl = $container.find('img').prop('src');

			if (imgUrl) {
				$container
					.css('backgroundImage', 'url(' + imgUrl + ')')
					.addClass('objectfit-fallback');
			}
		});
	}


	// Image Carousel Settings for Slick.js 
	$('.gallery--center').slick({
		centerMode: true,
		centerPadding: '5px',
		slidesToShow: 1,
		responsive: [{
			breakpoint: 1030,
			settings: {
				arrows: true,
				centerMode: true,
				centerPadding: '40px',
				slidesToShow: 1
			}
		},
					 {
						 breakpoint: 768,
						 settings: {
							 arrows: true,
							 centerMode: true,
							 centerPadding: '40px',
							 slidesToShow: 1
						 }
					 },
					 {
						 breakpoint: 480,
						 settings: {
							 arrows: false,
							 centerMode: true,
							 centerPadding: '10px',
							 slidesToShow: 1
						 }
					 }
					]
	});

	// Tab Functionality		
	$(function () {
		$('ul.tabs__nav li:first').addClass('active');
		$('#tabs__content-container article').hide();
		$('#tabs__content-container article:first').show();
		$('ul.tabs__nav li').on('click', function () {
			$('ul.tabs__nav li').removeClass('active');
			$(this).addClass('active')
			$('#tabs__content-container article').hide();
			var activeTab = $(this).find('a').attr('href');
			$(activeTab).show();
			return false;
		});
	})


	// Toggle Functionality
	$('.toggle__container').click(function() {
		$(this).toggleClass('active');
	});


	// Favorite Functionality for SEARCH RESULTS Pages
	$('.favorite > i').click(function () {
		$(this).toggleClass('active');
		$('.header__favorite').attr('data-title', 'Added to shortlist!').attr('data-value', 'favorite');
	});

	// Reset to Default for SEARCH RESULTS Pages
	$('.favorite > i').click(function () {
		if (!$(this).hasClass('active')) {
			$('.header__favorite').removeClass('active').attr('data-title', 'Click to add this boat to your shortlist!').removeAttr('data-value', 'favorite');
		}
	});


	// 	Favorite Functionality for DETAIL Pages
	$('.favorite xs--1of10 xs--align-right > i').click(function () {
		$(this).toggleClass('active');
		$('#header__favorite').attr('data-title', 'Added to shortlist!').attr('data-value', 'favorite');
	});

	// 	Reset to Default for DETAIL Pages
	$('.favorite xs--1of10 xs--align-right > i').click(function () {
		if (!$(this).hasClass('active')) {
			$('#header__favorite').removeClass('active').attr('data-title', 'Click to add this boat to your shortlist!').removeAttr('data-value', 'favorite');
		}
	});


	$(".mobile-open-modal").on("click", function () {
		let modalId = $(this).attr("data-open");
		$(modalId).addClass('is-visible');
	});

	//removes the "active" class to .mobile-modal and .mobile-modal-dialog
	$("mobile-close-modal, .mobile-modal").on("click", function () {
		$(".mobile-modal, .mobile-modal-dialog").removeClass('is-visible');
	});

	// if we press the ESC
	$('.mobile-modal').on("keydown", e => {
		if (e.key == "Escape") {
			$(".mobile-modal, .mobile-modal-dialog").removeClass('is-visible');
		}
	});


	// Desktop Fixed Header	
	$(window).scroll(function () {
		if ($(this).scrollTop() > 1) {
			$('#header--global').addClass("sticky");
		} else {
			$('#header--global').removeClass("sticky");
		}
	});

	//Simple Scroll Code for Desktop Navigation
	/**
	 * SimpleBar.js - v4.3.0-alpha.0
	 * https://grsmto.github.io/simplebar/ */

	!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).SimpleBar=e()}(this,function(){"use strict";var t=function(t){if("function"!=typeof t)throw TypeError(String(t)+" is not a function");return t},e=function(e,r,n){if(t(e),void 0===r)return e;switch(n){case 0:return function(){return e.call(r)};case 1:return function(t){return e.call(r,t)};case 2:return function(t,n){return e.call(r,t,n)};case 3:return function(t,n,i){return e.call(r,t,n,i)}}return function(){return e.apply(r,arguments)}},r=function(t){try{return!!t()}catch(t){return!0}},n={}.toString,i=function(t){return n.call(t).slice(8,-1)},o="".split,s=r(function(){return!Object("z").propertyIsEnumerable(0)})?function(t){return"String"==i(t)?o.call(t,""):Object(t)}:Object,a=function(t){if(null==t)throw TypeError("Can't call method on "+t);return t},c=function(t){return Object(a(t))},l=Math.ceil,u=Math.floor,f=function(t){return isNaN(t=+t)?0:(t>0?u:l)(t)},h=Math.min,d=function(t){return t>0?h(f(t),9007199254740991):0},p=function(t){return"object"==typeof t?null!==t:"function"==typeof t},v=Array.isArray||function(t){return"Array"==i(t)},g="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function y(t,e){return t(e={exports:{}},e.exports),e.exports}var b,m,x,E="object"==typeof window&&window&&window.Math==Math?window:"object"==typeof self&&self&&self.Math==Math?self:Function("return this")(),w=!r(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}),O=E.document,_=p(O)&&p(O.createElement),S=function(t){return _?O.createElement(t):{}},A=!w&&!r(function(){return 7!=Object.defineProperty(S("div"),"a",{get:function(){return 7}}).a}),k=function(t){if(!p(t))throw TypeError(String(t)+" is not an object");return t},L=function(t,e){if(!p(t))return t;var r,n;if(e&&"function"==typeof(r=t.toString)&&!p(n=r.call(t)))return n;if("function"==typeof(r=t.valueOf)&&!p(n=r.call(t)))return n;if(!e&&"function"==typeof(r=t.toString)&&!p(n=r.call(t)))return n;throw TypeError("Can't convert object to primitive value")},M=Object.defineProperty,j={f:w?M:function(t,e,r){if(k(t),e=L(e,!0),k(r),A)try{return M(t,e,r)}catch(t){}if("get"in r||"set"in r)throw TypeError("Accessors not supported");return"value"in r&&(t[e]=r.value),t}},R=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}},T=w?function(t,e,r){return j.f(t,e,R(1,r))}:function(t,e,r){return t[e]=r,t},W=function(t,e){try{T(E,t,e)}catch(r){E[t]=e}return e},z=y(function(t){var e=E["__core-js_shared__"]||W("__core-js_shared__",{});(t.exports=function(t,r){return e[t]||(e[t]=void 0!==r?r:{})})("versions",[]).push({version:"3.0.1",mode:"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})}),C=0,N=Math.random(),I=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++C+N).toString(36))},D=!r(function(){return!String(Symbol())}),P=z("wks"),V=E.Symbol,F=function(t){return P[t]||(P[t]=D&&V[t]||(D?V:I)("Symbol."+t))},B=F("species"),H=function(t,e){var r;return v(t)&&("function"!=typeof(r=t.constructor)||r!==Array&&!v(r.prototype)?p(r)&&null===(r=r[B])&&(r=void 0):r=void 0),new(void 0===r?Array:r)(0===e?0:e)},q=function(t,r){var n=1==t,i=2==t,o=3==t,a=4==t,l=6==t,u=5==t||l,f=r||H;return function(r,h,p){for(var v,g,y=c(r),b=s(y),m=e(h,p,3),x=d(b.length),E=0,w=n?f(r,x):i?f(r,0):void 0;x>E;E++)if((u||E in b)&&(g=m(v=b[E],E,y),t))if(n)w[E]=g;else if(g)switch(t){case 3:return!0;case 5:return v;case 6:return E;case 2:w.push(v)}else if(a)return!1;return l?-1:o||a?a:w}},$=F("species"),Y={}.propertyIsEnumerable,G=Object.getOwnPropertyDescriptor,X={f:G&&!Y.call({1:2},1)?function(t){var e=G(this,t);return!!e&&e.enumerable}:Y},U=function(t){return s(a(t))},Q={}.hasOwnProperty,K=function(t,e){return Q.call(t,e)},J=Object.getOwnPropertyDescriptor,Z={f:w?J:function(t,e){if(t=U(t),e=L(e,!0),A)try{return J(t,e)}catch(t){}if(K(t,e))return R(!X.f.call(t,e),t[e])}},tt=z("native-function-to-string",Function.toString),et=E.WeakMap,rt="function"==typeof et&&/native code/.test(tt.call(et)),nt=z("keys"),it=function(t){return nt[t]||(nt[t]=I(t))},ot={},st=E.WeakMap;if(rt){var at=new st,ct=at.get,lt=at.has,ut=at.set;b=function(t,e){return ut.call(at,t,e),e},m=function(t){return ct.call(at,t)||{}},x=function(t){return lt.call(at,t)}}else{var ft=it("state");ot[ft]=!0,b=function(t,e){return T(t,ft,e),e},m=function(t){return K(t,ft)?t[ft]:{}},x=function(t){return K(t,ft)}}var ht,dt={set:b,get:m,has:x,enforce:function(t){return x(t)?m(t):b(t,{})},getterFor:function(t){return function(e){var r;if(!p(e)||(r=m(e)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return r}}},pt=y(function(t){var e=dt.get,r=dt.enforce,n=String(tt).split("toString");z("inspectSource",function(t){return tt.call(t)}),(t.exports=function(t,e,i,o){var s=!!o&&!!o.unsafe,a=!!o&&!!o.enumerable,c=!!o&&!!o.noTargetGet;"function"==typeof i&&("string"!=typeof e||K(i,"name")||T(i,"name",e),r(i).source=n.join("string"==typeof e?e:"")),t!==E?(s?!c&&t[e]&&(a=!0):delete t[e],a?t[e]=i:T(t,e,i)):a?t[e]=i:W(e,i)})(Function.prototype,"toString",function(){return"function"==typeof this&&e(this).source||tt.call(this)})}),vt=Math.max,gt=Math.min,yt=(ht=!1,function(t,e,r){var n,i=U(t),o=d(i.length),s=function(t,e){var r=f(t);return r<0?vt(r+e,0):gt(r,e)}(r,o);if(ht&&e!=e){for(;o>s;)if((n=i[s++])!=n)return!0}else for(;o>s;s++)if((ht||s in i)&&i[s]===e)return ht||s||0;return!ht&&-1}),bt=function(t,e){var r,n=U(t),i=0,o=[];for(r in n)!K(ot,r)&&K(n,r)&&o.push(r);for(;e.length>i;)K(n,r=e[i++])&&(~yt(o,r)||o.push(r));return o},mt=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],xt=mt.concat("length","prototype"),Et={f:Object.getOwnPropertyNames||function(t){return bt(t,xt)}},wt={f:Object.getOwnPropertySymbols},Ot=E.Reflect,_t=Ot&&Ot.ownKeys||function(t){var e=Et.f(k(t)),r=wt.f;return r?e.concat(r(t)):e},St=function(t,e){for(var r=_t(e),n=j.f,i=Z.f,o=0;o<r.length;o++){var s=r[o];K(t,s)||n(t,s,i(e,s))}},At=/#|\.prototype\./,kt=function(t,e){var n=Mt[Lt(t)];return n==Rt||n!=jt&&("function"==typeof e?r(e):!!e)},Lt=kt.normalize=function(t){return String(t).replace(At,".").toLowerCase()},Mt=kt.data={},jt=kt.NATIVE="N",Rt=kt.POLYFILL="P",Tt=kt,Wt=Z.f,zt=function(t,e){var r,n,i,o,s,a=t.target,c=t.global,l=t.stat;if(r=c?E:l?E[a]||W(a,{}):(E[a]||{}).prototype)for(n in e){if(o=e[n],i=t.noTargetGet?(s=Wt(r,n))&&s.value:r[n],!Tt(c?n:a+(l?".":"#")+n,t.forced)&&void 0!==i){if(typeof o==typeof i)continue;St(o,i)}(t.sham||i&&i.sham)&&T(o,"sham",!0),pt(r,n,o,t)}},Ct=q(2),Nt=function(t){return!r(function(){var e=[];return(e.constructor={})[$]=function(){return{foo:1}},1!==e[t](Boolean).foo})}("filter");zt({target:"Array",proto:!0,forced:!Nt},{filter:function(t){return Ct(this,t,arguments[1])}});var It=function(t,e){var n=[][t];return!n||!r(function(){n.call(null,e||function(){throw 1},1)})},Dt=[].forEach,Pt=q(0),Vt=It("forEach")?function(t){return Pt(this,t,arguments[1])}:Dt;zt({target:"Array",proto:!0,forced:[].forEach!=Vt},{forEach:Vt});var Ft=Object.keys||function(t){return bt(t,mt)},Bt=w?Object.defineProperties:function(t,e){k(t);for(var r,n=Ft(e),i=n.length,o=0;i>o;)j.f(t,r=n[o++],e[r]);return t},Ht=E.document,qt=Ht&&Ht.documentElement,$t=it("IE_PROTO"),Yt=function(){},Gt=function(){var t,e=S("iframe"),r=mt.length;for(e.style.display="none",qt.appendChild(e),e.src=String("javascript:"),(t=e.contentWindow.document).open(),t.write("<script>document.F=Object<\/script>"),t.close(),Gt=t.F;r--;)delete Gt.prototype[mt[r]];return Gt()},Xt=Object.create||function(t,e){var r;return null!==t?(Yt.prototype=k(t),r=new Yt,Yt.prototype=null,r[$t]=t):r=Gt(),void 0===e?r:Bt(r,e)};ot[$t]=!0;var Ut=F("unscopables"),Qt=Array.prototype;null==Qt[Ut]&&T(Qt,Ut,Xt(null));var Kt,Jt,Zt,te=function(t){Qt[Ut][t]=!0},ee={},re=!r(function(){function t(){}return t.prototype.constructor=null,Object.getPrototypeOf(new t)!==t.prototype}),ne=it("IE_PROTO"),ie=Object.prototype,oe=re?Object.getPrototypeOf:function(t){return t=c(t),K(t,ne)?t[ne]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?ie:null},se=F("iterator"),ae=!1;[].keys&&("next"in(Zt=[].keys())?(Jt=oe(oe(Zt)))!==Object.prototype&&(Kt=Jt):ae=!0),null==Kt&&(Kt={}),K(Kt,se)||T(Kt,se,function(){return this});var ce={IteratorPrototype:Kt,BUGGY_SAFARI_ITERATORS:ae},le=j.f,ue=F("toStringTag"),fe=function(t,e,r){t&&!K(t=r?t:t.prototype,ue)&&le(t,ue,{configurable:!0,value:e})},he=ce.IteratorPrototype,de=function(){return this},pe=Object.setPrototypeOf||("__proto__"in{}?function(){var t,e=!1,r={};try{(t=Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set).call(r,[]),e=r instanceof Array}catch(t){}return function(r,n){return function(t,e){if(k(t),!p(e)&&null!==e)throw TypeError("Can't set "+String(e)+" as a prototype")}(r,n),e?t.call(r,n):r.__proto__=n,r}}():void 0),ve=F("iterator"),ge=ce.IteratorPrototype,ye=ce.BUGGY_SAFARI_ITERATORS,be=function(){return this},me=function(t,e,r,n,i,o,s){!function(t,e,r){var n=e+" Iterator";t.prototype=Xt(he,{next:R(1,r)}),fe(t,n,!1),ee[n]=de}(r,e,n);var a,c,l,u=function(t){if(t===i&&v)return v;if(!ye&&t in d)return d[t];switch(t){case"keys":case"values":case"entries":return function(){return new r(this,t)}}return function(){return new r(this)}},f=e+" Iterator",h=!1,d=t.prototype,p=d[ve]||d["@@iterator"]||i&&d[i],v=!ye&&p||u(i),g="Array"==e&&d.entries||p;if(g&&(a=oe(g.call(new t)),ge!==Object.prototype&&a.next&&(oe(a)!==ge&&(pe?pe(a,ge):"function"!=typeof a[ve]&&T(a,ve,be)),fe(a,f,!0))),"values"==i&&p&&"values"!==p.name&&(h=!0,v=function(){return p.call(this)}),d[ve]!==v&&T(d,ve,v),ee[e]=v,i)if(c={values:u("values"),keys:o?v:u("keys"),entries:u("entries")},s)for(l in c)!ye&&!h&&l in d||pt(d,l,c[l]);else zt({target:e,proto:!0,forced:ye||h},c);return c},xe=dt.set,Ee=dt.getterFor("Array Iterator"),we=me(Array,"Array",function(t,e){xe(this,{type:"Array Iterator",target:U(t),index:0,kind:e})},function(){var t=Ee(this),e=t.target,r=t.kind,n=t.index++;return!e||n>=e.length?(t.target=void 0,{value:void 0,done:!0}):"keys"==r?{value:n,done:!1}:"values"==r?{value:e[n],done:!1}:{value:[n,e[n]],done:!1}},"values");ee.Arguments=ee.Array,te("keys"),te("values"),te("entries");var Oe=It("reduce");zt({target:"Array",proto:!0,forced:Oe},{reduce:function(e){return function(e,r,n,i,o){t(r);var a=c(e),l=s(a),u=d(a.length),f=o?u-1:0,h=o?-1:1;if(n<2)for(;;){if(f in l){i=l[f],f+=h;break}if(f+=h,o?f<0:u<=f)throw TypeError("Reduce of empty array with no initial value")}for(;o?f>=0:u>f;f+=h)f in l&&(i=r(i,l[f],f,a));return i}(this,e,arguments.length,arguments[1],!1)}});var _e=j.f,Se=Function.prototype,Ae=Se.toString,ke=/^\s*function ([^ (]*)/;!w||"name"in Se||_e(Se,"name",{configurable:!0,get:function(){try{return Ae.call(this).match(ke)[1]}catch(t){return""}}});var Le=Object.assign,Me=!Le||r(function(){var t={},e={},r=Symbol();return t[r]=7,"abcdefghijklmnopqrst".split("").forEach(function(t){e[t]=t}),7!=Le({},t)[r]||"abcdefghijklmnopqrst"!=Ft(Le({},e)).join("")})?function(t,e){for(var r=c(t),n=arguments.length,i=1,o=wt.f,a=X.f;n>i;)for(var l,u=s(arguments[i++]),f=o?Ft(u).concat(o(u)):Ft(u),h=f.length,d=0;h>d;)a.call(u,l=f[d++])&&(r[l]=u[l]);return r}:Le;zt({target:"Object",stat:!0,forced:Object.assign!==Me},{assign:Me});var je=F("toStringTag"),Re="Arguments"==i(function(){return arguments}()),Te=function(t){var e,r,n;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(r=function(t,e){try{return t[e]}catch(t){}}(e=Object(t),je))?r:Re?i(e):"Object"==(n=i(e))&&"function"==typeof e.callee?"Arguments":n},We={};We[F("toStringTag")]="z";var ze="[object z]"!==String(We)?function(){return"[object "+Te(this)+"]"}:We.toString,Ce=Object.prototype;ze!==Ce.toString&&pt(Ce,"toString",ze,{unsafe:!0});var Ne="\t\n\v\f\r                　\u2028\u2029\ufeff",Ie="["+Ne+"]",De=RegExp("^"+Ie+Ie+"*"),Pe=RegExp(Ie+Ie+"*$"),Ve=E.parseInt,Fe=/^[-+]?0[xX]/,Be=8!==Ve(Ne+"08")||22!==Ve(Ne+"0x16")?function(t,e){var r=function(t,e){return t=String(a(t)),1&e&&(t=t.replace(De,"")),2&e&&(t=t.replace(Pe,"")),t}(String(t),3);return Ve(r,e>>>0||(Fe.test(r)?16:10))}:Ve;zt({global:!0,forced:parseInt!=Be},{parseInt:Be});var He,qe,$e=RegExp.prototype.exec,Ye=String.prototype.replace,Ge=$e,Xe=(He=/a/,qe=/b*/g,$e.call(He,"a"),$e.call(qe,"a"),0!==He.lastIndex||0!==qe.lastIndex),Ue=void 0!==/()??/.exec("")[1];(Xe||Ue)&&(Ge=function(t){var e,r,n,i,o=this;return Ue&&(r=new RegExp("^"+o.source+"$(?!\\s)",function(){var t=k(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}.call(o))),Xe&&(e=o.lastIndex),n=$e.call(o,t),Xe&&n&&(o.lastIndex=o.global?n.index+n[0].length:e),Ue&&n&&n.length>1&&Ye.call(n[0],r,function(){for(i=1;i<arguments.length-2;i++)void 0===arguments[i]&&(n[i]=void 0)}),n});var Qe=Ge;zt({target:"RegExp",proto:!0,forced:/./.exec!==Qe},{exec:Qe});var Ke=function(t,e,r){var n,i,o=String(a(t)),s=f(e),c=o.length;return s<0||s>=c?r?"":void 0:(n=o.charCodeAt(s))<55296||n>56319||s+1===c||(i=o.charCodeAt(s+1))<56320||i>57343?r?o.charAt(s):n:r?o.slice(s,s+2):i-56320+(n-55296<<10)+65536},Je=dt.set,Ze=dt.getterFor("String Iterator");me(String,"String",function(t){Je(this,{type:"String Iterator",string:String(t),index:0})},function(){var t,e=Ze(this),r=e.string,n=e.index;return n>=r.length?{value:void 0,done:!0}:(t=Ke(r,n,!0),e.index+=t.length,{value:t,done:!1})});var tr=function(t,e,r){return e+(r?Ke(t,e,!0).length:1)},er=function(t,e){var r=t.exec;if("function"==typeof r){var n=r.call(t,e);if("object"!=typeof n)throw TypeError("RegExp exec method returned something other than an Object or null");return n}if("RegExp"!==i(t))throw TypeError("RegExp#exec called on incompatible receiver");return Qe.call(t,e)},rr=F("species"),nr=!r(function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")}),ir=!r(function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var r="ab".split(t);return 2!==r.length||"a"!==r[0]||"b"!==r[1]}),or=function(t,e,n,i){var o=F(t),s=!r(function(){var e={};return e[o]=function(){return 7},7!=""[t](e)}),a=s&&!r(function(){var e=!1,r=/a/;return r.exec=function(){return e=!0,null},"split"===t&&(r.constructor={},r.constructor[rr]=function(){return r}),r[o](""),!e});if(!s||!a||"replace"===t&&!nr||"split"===t&&!ir){var c=/./[o],l=n(o,""[t],function(t,e,r,n,i){return e.exec===Qe?s&&!i?{done:!0,value:c.call(e,r,n)}:{done:!0,value:t.call(r,e,n)}:{done:!1}}),u=l[0],f=l[1];pt(String.prototype,t,u),pt(RegExp.prototype,o,2==e?function(t,e){return f.call(t,this,e)}:function(t){return f.call(t,this)}),i&&T(RegExp.prototype[o],"sham",!0)}};or("match",1,function(t,e,r){return[function(e){var r=a(this),n=null==e?void 0:e[t];return void 0!==n?n.call(e,r):new RegExp(e)[t](String(r))},function(t){var n=r(e,t,this);if(n.done)return n.value;var i=k(t),o=String(this);if(!i.global)return er(i,o);var s=i.unicode;i.lastIndex=0;for(var a,c=[],l=0;null!==(a=er(i,o));){var u=String(a[0]);c[l]=u,""===u&&(i.lastIndex=tr(o,d(i.lastIndex),s)),l++}return 0===l?null:c}]});var sr=Math.max,ar=Math.min,cr=Math.floor,lr=/\$([$&`']|\d\d?|<[^>]*>)/g,ur=/\$([$&`']|\d\d?)/g;or("replace",2,function(t,e,r){return[function(r,n){var i=a(this),o=null==r?void 0:r[t];return void 0!==o?o.call(r,i,n):e.call(String(i),r,n)},function(t,i){var o=r(e,t,this,i);if(o.done)return o.value;var s=k(t),a=String(this),c="function"==typeof i;c||(i=String(i));var l=s.global;if(l){var u=s.unicode;s.lastIndex=0}for(var h=[];;){var p=er(s,a);if(null===p)break;if(h.push(p),!l)break;""===String(p[0])&&(s.lastIndex=tr(a,d(s.lastIndex),u))}for(var v,g="",y=0,b=0;b<h.length;b++){p=h[b];for(var m=String(p[0]),x=sr(ar(f(p.index),a.length),0),E=[],w=1;w<p.length;w++)E.push(void 0===(v=p[w])?v:String(v));var O=p.groups;if(c){var _=[m].concat(E,x,a);void 0!==O&&_.push(O);var S=String(i.apply(void 0,_))}else S=n(m,a,x,E,O,i);x>=y&&(g+=a.slice(y,x)+S,y=x+m.length)}return g+a.slice(y)}];function n(t,r,n,i,o,s){var a=n+t.length,l=i.length,u=ur;return void 0!==o&&(o=c(o),u=lr),e.call(s,u,function(e,s){var c;switch(s.charAt(0)){case"$":return"$";case"&":return t;case"`":return r.slice(0,n);case"'":return r.slice(a);case"<":c=o[s.slice(1,-1)];break;default:var u=+s;if(0===u)return e;if(u>l){var f=cr(u/10);return 0===f?e:f<=l?void 0===i[f-1]?s.charAt(1):i[f-1]+s.charAt(1):e}c=i[u-1]}return void 0===c?"":c})}});var fr=function(t,e,r){for(var n in e)pt(t,n,e[n],r);return t},hr=!r(function(){return Object.isExtensible(Object.preventExtensions({}))}),dr=y(function(t){var e=I("meta"),r=j.f,n=0,i=Object.isExtensible||function(){return!0},o=function(t){r(t,e,{value:{objectID:"O"+ ++n,weakData:{}}})},s=t.exports={REQUIRED:!1,fastKey:function(t,r){if(!p(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!K(t,e)){if(!i(t))return"F";if(!r)return"E";o(t)}return t[e].objectID},getWeakData:function(t,r){if(!K(t,e)){if(!i(t))return!0;if(!r)return!1;o(t)}return t[e].weakData},onFreeze:function(t){return hr&&s.REQUIRED&&i(t)&&!K(t,e)&&o(t),t}};ot[e]=!0}),pr=(dr.REQUIRED,dr.fastKey,dr.getWeakData,dr.onFreeze,function(t,e,r){if(!(t instanceof e))throw TypeError("Incorrect "+(r?r+" ":"")+"invocation");return t}),vr=F("iterator"),gr=Array.prototype,yr=F("iterator"),br=function(t,e,r,n){try{return n?e(k(r)[0],r[1]):e(r)}catch(e){var i=t.return;throw void 0!==i&&k(i.call(t)),e}},mr=y(function(t){var r={};(t.exports=function(t,n,i,o,s){var a,c,l,u,f,h,p=e(n,i,o?2:1);if(s)a=t;else{if("function"!=typeof(c=function(t){if(null!=t)return t[yr]||t["@@iterator"]||ee[Te(t)]}(t)))throw TypeError("Target is not iterable");if(void 0!==(h=c)&&(ee.Array===h||gr[vr]===h)){for(l=0,u=d(t.length);u>l;l++)if((o?p(k(f=t[l])[0],f[1]):p(t[l]))===r)return r;return}a=c.call(t)}for(;!(f=a.next()).done;)if(br(a,p,f.value,o)===r)return r}).BREAK=r}),xr=dr.getWeakData,Er=dt.set,wr=dt.getterFor,Or=q(5),_r=q(6),Sr=0,Ar=function(t){return t.frozen||(t.frozen=new kr)},kr=function(){this.entries=[]},Lr=function(t,e){return Or(t.entries,function(t){return t[0]===e})};kr.prototype={get:function(t){var e=Lr(this,t);if(e)return e[1]},has:function(t){return!!Lr(this,t)},set:function(t,e){var r=Lr(this,t);r?r[1]=e:this.entries.push([t,e])},delete:function(t){var e=_r(this.entries,function(e){return e[0]===t});return~e&&this.entries.splice(e,1),!!~e}};var Mr={getConstructor:function(t,e,r,n){var i=t(function(t,o){pr(t,i,e),Er(t,{type:e,id:Sr++,frozen:void 0}),null!=o&&mr(o,t[n],t,r)}),o=wr(e),s=function(t,e,r){var n=o(t),i=xr(k(e),!0);return!0===i?Ar(n).set(e,r):i[n.id]=r,t};return fr(i.prototype,{delete:function(t){var e=o(this);if(!p(t))return!1;var r=xr(t);return!0===r?Ar(e).delete(t):r&&K(r,e.id)&&delete r[e.id]},has:function(t){var e=o(this);if(!p(t))return!1;var r=xr(t);return!0===r?Ar(e).has(t):r&&K(r,e.id)}}),fr(i.prototype,r?{get:function(t){var e=o(this);if(p(t)){var r=xr(t);return!0===r?Ar(e).get(t):r?r[e.id]:void 0}},set:function(t,e){return s(this,t,e)}}:{add:function(t){return s(this,t,!0)}}),i}},jr=F("iterator"),Rr=!1;try{var Tr=0;({next:function(){return{done:!!Tr++}},return:function(){Rr=!0}})[jr]=function(){return this}}catch(t){}var Wr=function(t,e,n,i,o){var s=E[t],a=s&&s.prototype,c=s,l=i?"set":"add",u={},f=function(t){var e=a[t];pt(a,t,"add"==t?function(t){return e.call(this,0===t?0:t),this}:"delete"==t?function(t){return!(o&&!p(t))&&e.call(this,0===t?0:t)}:"get"==t?function(t){return o&&!p(t)?void 0:e.call(this,0===t?0:t)}:"has"==t?function(t){return!(o&&!p(t))&&e.call(this,0===t?0:t)}:function(t,r){return e.call(this,0===t?0:t,r),this})};if(Tt(t,"function"!=typeof s||!(o||a.forEach&&!r(function(){(new s).entries().next()}))))c=n.getConstructor(e,t,i,l),dr.REQUIRED=!0;else if(Tt(t,!0)){var h=new c,d=h[l](o?{}:-0,1)!=h,v=r(function(){h.has(1)}),g=function(t,e){if(!e&&!Rr)return!1;var r=!1;try{var n={};n[jr]=function(){return{next:function(){return{done:r=!0}}}},t(n)}catch(t){}return r}(function(t){new s(t)}),y=!o&&r(function(){for(var t=new s,e=5;e--;)t[l](e,e);return!t.has(-0)});g||((c=e(function(e,r){pr(e,c,t);var n=function(t,e,r){var n,i=e.constructor;return i!==r&&"function"==typeof i&&(n=i.prototype)!==r.prototype&&p(n)&&pe&&pe(t,n),t}(new s,e,c);return null!=r&&mr(r,n[l],n,i),n})).prototype=a,a.constructor=c),(v||y)&&(f("delete"),f("has"),i&&f("get")),(y||d)&&f(l),o&&a.clear&&delete a.clear}return u[t]=c,zt({global:!0,forced:c!=s},u),fe(c,t),o||n.setStrong(c,t,i),c},zr=(y(function(t){var e,r=dt.enforce,n=!E.ActiveXObject&&"ActiveXObject"in E,i=Object.isExtensible,o=function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}},s=t.exports=Wr("WeakMap",o,Mr,!0,!0);if(rt&&n){e=Mr.getConstructor(o,"WeakMap",!0),dr.REQUIRED=!0;var a=s.prototype,c=a.delete,l=a.has,u=a.get,f=a.set;fr(a,{delete:function(t){if(p(t)&&!i(t)){var n=r(this);return n.frozen||(n.frozen=new e),c.call(this,t)||n.frozen.delete(t)}return c.call(this,t)},has:function(t){if(p(t)&&!i(t)){var n=r(this);return n.frozen||(n.frozen=new e),l.call(this,t)||n.frozen.has(t)}return l.call(this,t)},get:function(t){if(p(t)&&!i(t)){var n=r(this);return n.frozen||(n.frozen=new e),l.call(this,t)?u.call(this,t):n.frozen.get(t)}return u.call(this,t)},set:function(t,n){if(p(t)&&!i(t)){var o=r(this);o.frozen||(o.frozen=new e),l.call(this,t)?f.call(this,t,n):o.frozen.set(t,n)}else f.call(this,t,n);return this}})}}),{CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0});for(var Cr in zr){var Nr=E[Cr],Ir=Nr&&Nr.prototype;if(Ir&&Ir.forEach!==Vt)try{T(Ir,"forEach",Vt)}catch(t){Ir.forEach=Vt}}var Dr=F("iterator"),Pr=F("toStringTag"),Vr=we.values;for(var Fr in zr){var Br=E[Fr],Hr=Br&&Br.prototype;if(Hr){if(Hr[Dr]!==Vr)try{T(Hr,Dr,Vr)}catch(t){Hr[Dr]=Vr}if(Hr[Pr]||T(Hr,Pr,Fr),zr[Fr])for(var qr in we)if(Hr[qr]!==we[qr])try{T(Hr,qr,we[qr])}catch(t){Hr[qr]=we[qr]}}}var $r="Expected a function",Yr=NaN,Gr="[object Symbol]",Xr=/^\s+|\s+$/g,Ur=/^[-+]0x[0-9a-f]+$/i,Qr=/^0b[01]+$/i,Kr=/^0o[0-7]+$/i,Jr=parseInt,Zr="object"==typeof g&&g&&g.Object===Object&&g,tn="object"==typeof self&&self&&self.Object===Object&&self,en=Zr||tn||Function("return this")(),rn=Object.prototype.toString,nn=Math.max,on=Math.min,sn=function(){return en.Date.now()};function an(t,e,r){var n,i,o,s,a,c,l=0,u=!1,f=!1,h=!0;if("function"!=typeof t)throw new TypeError($r);function d(e){var r=n,o=i;return n=i=void 0,l=e,s=t.apply(o,r)}function p(t){var r=t-c;return void 0===c||r>=e||r<0||f&&t-l>=o}function v(){var t=sn();if(p(t))return g(t);a=setTimeout(v,function(t){var r=e-(t-c);return f?on(r,o-(t-l)):r}(t))}function g(t){return a=void 0,h&&n?d(t):(n=i=void 0,s)}function y(){var t=sn(),r=p(t);if(n=arguments,i=this,c=t,r){if(void 0===a)return function(t){return l=t,a=setTimeout(v,e),u?d(t):s}(c);if(f)return a=setTimeout(v,e),d(c)}return void 0===a&&(a=setTimeout(v,e)),s}return e=ln(e)||0,cn(r)&&(u=!!r.leading,o=(f="maxWait"in r)?nn(ln(r.maxWait)||0,e):o,h="trailing"in r?!!r.trailing:h),y.cancel=function(){void 0!==a&&clearTimeout(a),l=0,n=c=i=a=void 0},y.flush=function(){return void 0===a?s:g(sn())},y}function cn(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function ln(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&rn.call(t)==Gr}(t))return Yr;if(cn(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=cn(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(Xr,"");var r=Qr.test(t);return r||Kr.test(t)?Jr(t.slice(2),r?2:8):Ur.test(t)?Yr:+t}var un=function(t,e,r){var n=!0,i=!0;if("function"!=typeof t)throw new TypeError($r);return cn(r)&&(n="leading"in r?!!r.leading:n,i="trailing"in r?!!r.trailing:i),an(t,e,{leading:n,maxWait:e,trailing:i})},fn="Expected a function",hn=NaN,dn="[object Symbol]",pn=/^\s+|\s+$/g,vn=/^[-+]0x[0-9a-f]+$/i,gn=/^0b[01]+$/i,yn=/^0o[0-7]+$/i,bn=parseInt,mn="object"==typeof g&&g&&g.Object===Object&&g,xn="object"==typeof self&&self&&self.Object===Object&&self,En=mn||xn||Function("return this")(),wn=Object.prototype.toString,On=Math.max,_n=Math.min,Sn=function(){return En.Date.now()};function An(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function kn(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&wn.call(t)==dn}(t))return hn;if(An(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=An(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(pn,"");var r=gn.test(t);return r||yn.test(t)?bn(t.slice(2),r?2:8):vn.test(t)?hn:+t}var Ln=function(t,e,r){var n,i,o,s,a,c,l=0,u=!1,f=!1,h=!0;if("function"!=typeof t)throw new TypeError(fn);function d(e){var r=n,o=i;return n=i=void 0,l=e,s=t.apply(o,r)}function p(t){var r=t-c;return void 0===c||r>=e||r<0||f&&t-l>=o}function v(){var t=Sn();if(p(t))return g(t);a=setTimeout(v,function(t){var r=e-(t-c);return f?_n(r,o-(t-l)):r}(t))}function g(t){return a=void 0,h&&n?d(t):(n=i=void 0,s)}function y(){var t=Sn(),r=p(t);if(n=arguments,i=this,c=t,r){if(void 0===a)return function(t){return l=t,a=setTimeout(v,e),u?d(t):s}(c);if(f)return a=setTimeout(v,e),d(c)}return void 0===a&&(a=setTimeout(v,e)),s}return e=kn(e)||0,An(r)&&(u=!!r.leading,o=(f="maxWait"in r)?On(kn(r.maxWait)||0,e):o,h="trailing"in r?!!r.trailing:h),y.cancel=function(){void 0!==a&&clearTimeout(a),l=0,n=c=i=a=void 0},y.flush=function(){return void 0===a?s:g(Sn())},y},Mn="Expected a function",jn="__lodash_hash_undefined__",Rn="[object Function]",Tn="[object GeneratorFunction]",Wn=/^\[object .+?Constructor\]$/,zn="object"==typeof g&&g&&g.Object===Object&&g,Cn="object"==typeof self&&self&&self.Object===Object&&self,Nn=zn||Cn||Function("return this")();var In=Array.prototype,Dn=Function.prototype,Pn=Object.prototype,Vn=Nn["__core-js_shared__"],Fn=function(){var t=/[^.]+$/.exec(Vn&&Vn.keys&&Vn.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}(),Bn=Dn.toString,Hn=Pn.hasOwnProperty,qn=Pn.toString,$n=RegExp("^"+Bn.call(Hn).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),Yn=In.splice,Gn=ei(Nn,"Map"),Xn=ei(Object,"create");function Un(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function Qn(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function Kn(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function Jn(t,e){for(var r,n,i=t.length;i--;)if((r=t[i][0])===(n=e)||r!=r&&n!=n)return i;return-1}function Zn(t){return!(!ni(t)||(e=t,Fn&&Fn in e))&&(function(t){var e=ni(t)?qn.call(t):"";return e==Rn||e==Tn}(t)||function(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}(t)?$n:Wn).test(function(t){if(null!=t){try{return Bn.call(t)}catch(t){}try{return t+""}catch(t){}}return""}(t));var e}function ti(t,e){var r,n,i=t.__data__;return("string"==(n=typeof(r=e))||"number"==n||"symbol"==n||"boolean"==n?"__proto__"!==r:null===r)?i["string"==typeof e?"string":"hash"]:i.map}function ei(t,e){var r=function(t,e){return null==t?void 0:t[e]}(t,e);return Zn(r)?r:void 0}function ri(t,e){if("function"!=typeof t||e&&"function"!=typeof e)throw new TypeError(Mn);var r=function(){var n=arguments,i=e?e.apply(this,n):n[0],o=r.cache;if(o.has(i))return o.get(i);var s=t.apply(this,n);return r.cache=o.set(i,s),s};return r.cache=new(ri.Cache||Kn),r}function ni(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}Un.prototype.clear=function(){this.__data__=Xn?Xn(null):{}},Un.prototype.delete=function(t){return this.has(t)&&delete this.__data__[t]},Un.prototype.get=function(t){var e=this.__data__;if(Xn){var r=e[t];return r===jn?void 0:r}return Hn.call(e,t)?e[t]:void 0},Un.prototype.has=function(t){var e=this.__data__;return Xn?void 0!==e[t]:Hn.call(e,t)},Un.prototype.set=function(t,e){return this.__data__[t]=Xn&&void 0===e?jn:e,this},Qn.prototype.clear=function(){this.__data__=[]},Qn.prototype.delete=function(t){var e=this.__data__,r=Jn(e,t);return!(r<0||(r==e.length-1?e.pop():Yn.call(e,r,1),0))},Qn.prototype.get=function(t){var e=this.__data__,r=Jn(e,t);return r<0?void 0:e[r][1]},Qn.prototype.has=function(t){return Jn(this.__data__,t)>-1},Qn.prototype.set=function(t,e){var r=this.__data__,n=Jn(r,t);return n<0?r.push([t,e]):r[n][1]=e,this},Kn.prototype.clear=function(){this.__data__={hash:new Un,map:new(Gn||Qn),string:new Un}},Kn.prototype.delete=function(t){return ti(this,t).delete(t)},Kn.prototype.get=function(t){return ti(this,t).get(t)},Kn.prototype.has=function(t){return ti(this,t).has(t)},Kn.prototype.set=function(t,e){return ti(this,t).set(t,e),this},ri.Cache=Kn;var ii=ri,oi=function(){if("undefined"!=typeof Map)return Map;function t(t,e){var r=-1;return t.some(function(t,n){return t[0]===e&&(r=n,!0)}),r}return function(){function e(){this.__entries__=[]}return Object.defineProperty(e.prototype,"size",{get:function(){return this.__entries__.length},enumerable:!0,configurable:!0}),e.prototype.get=function(e){var r=t(this.__entries__,e),n=this.__entries__[r];return n&&n[1]},e.prototype.set=function(e,r){var n=t(this.__entries__,e);~n?this.__entries__[n][1]=r:this.__entries__.push([e,r])},e.prototype.delete=function(e){var r=this.__entries__,n=t(r,e);~n&&r.splice(n,1)},e.prototype.has=function(e){return!!~t(this.__entries__,e)},e.prototype.clear=function(){this.__entries__.splice(0)},e.prototype.forEach=function(t,e){void 0===e&&(e=null);for(var r=0,n=this.__entries__;r<n.length;r++){var i=n[r];t.call(e,i[1],i[0])}},e}()}(),si="undefined"!=typeof window&&"undefined"!=typeof document&&window.document===document,ai="undefined"!=typeof global&&global.Math===Math?global:"undefined"!=typeof self&&self.Math===Math?self:"undefined"!=typeof window&&window.Math===Math?window:Function("return this")(),ci="function"==typeof requestAnimationFrame?requestAnimationFrame.bind(ai):function(t){return setTimeout(function(){return t(Date.now())},1e3/60)},li=2;var ui=20,fi=["top","right","bottom","left","width","height","size","weight"],hi="undefined"!=typeof MutationObserver,di=function(){function t(){this.connected_=!1,this.mutationEventsAdded_=!1,this.mutationsObserver_=null,this.observers_=[],this.onTransitionEnd_=this.onTransitionEnd_.bind(this),this.refresh=function(t,e){var r=!1,n=!1,i=0;function o(){r&&(r=!1,t()),n&&a()}function s(){ci(o)}function a(){var t=Date.now();if(r){if(t-i<li)return;n=!0}else r=!0,n=!1,setTimeout(s,e);i=t}return a}(this.refresh.bind(this),ui)}return t.prototype.addObserver=function(t){~this.observers_.indexOf(t)||this.observers_.push(t),this.connected_||this.connect_()},t.prototype.removeObserver=function(t){var e=this.observers_,r=e.indexOf(t);~r&&e.splice(r,1),!e.length&&this.connected_&&this.disconnect_()},t.prototype.refresh=function(){this.updateObservers_()&&this.refresh()},t.prototype.updateObservers_=function(){var t=this.observers_.filter(function(t){return t.gatherActive(),t.hasActive()});return t.forEach(function(t){return t.broadcastActive()}),t.length>0},t.prototype.connect_=function(){si&&!this.connected_&&(document.addEventListener("transitionend",this.onTransitionEnd_),window.addEventListener("resize",this.refresh),hi?(this.mutationsObserver_=new MutationObserver(this.refresh),this.mutationsObserver_.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0})):(document.addEventListener("DOMSubtreeModified",this.refresh),this.mutationEventsAdded_=!0),this.connected_=!0)},t.prototype.disconnect_=function(){si&&this.connected_&&(document.removeEventListener("transitionend",this.onTransitionEnd_),window.removeEventListener("resize",this.refresh),this.mutationsObserver_&&this.mutationsObserver_.disconnect(),this.mutationEventsAdded_&&document.removeEventListener("DOMSubtreeModified",this.refresh),this.mutationsObserver_=null,this.mutationEventsAdded_=!1,this.connected_=!1)},t.prototype.onTransitionEnd_=function(t){var e=t.propertyName,r=void 0===e?"":e;fi.some(function(t){return!!~r.indexOf(t)})&&this.refresh()},t.getInstance=function(){return this.instance_||(this.instance_=new t),this.instance_},t.instance_=null,t}(),pi=function(t,e){for(var r=0,n=Object.keys(e);r<n.length;r++){var i=n[r];Object.defineProperty(t,i,{value:e[i],enumerable:!1,writable:!1,configurable:!0})}return t},vi=function(t){return t&&t.ownerDocument&&t.ownerDocument.defaultView||ai},gi=wi(0,0,0,0);function yi(t){return parseFloat(t)||0}function bi(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];return e.reduce(function(e,r){return e+yi(t["border-"+r+"-width"])},0)}function mi(t){var e=t.clientWidth,r=t.clientHeight;if(!e&&!r)return gi;var n=vi(t).getComputedStyle(t),i=function(t){for(var e={},r=0,n=["top","right","bottom","left"];r<n.length;r++){var i=n[r],o=t["padding-"+i];e[i]=yi(o)}return e}(n),o=i.left+i.right,s=i.top+i.bottom,a=yi(n.width),c=yi(n.height);if("border-box"===n.boxSizing&&(Math.round(a+o)!==e&&(a-=bi(n,"left","right")+o),Math.round(c+s)!==r&&(c-=bi(n,"top","bottom")+s)),!function(t){return t===vi(t).document.documentElement}(t)){var l=Math.round(a+o)-e,u=Math.round(c+s)-r;1!==Math.abs(l)&&(a-=l),1!==Math.abs(u)&&(c-=u)}return wi(i.left,i.top,a,c)}var xi="undefined"!=typeof SVGGraphicsElement?function(t){return t instanceof vi(t).SVGGraphicsElement}:function(t){return t instanceof vi(t).SVGElement&&"function"==typeof t.getBBox};function Ei(t){return si?xi(t)?function(t){var e=t.getBBox();return wi(0,0,e.width,e.height)}(t):mi(t):gi}function wi(t,e,r,n){return{x:t,y:e,width:r,height:n}}var Oi=function(){function t(t){this.broadcastWidth=0,this.broadcastHeight=0,this.contentRect_=wi(0,0,0,0),this.target=t}return t.prototype.isActive=function(){var t=Ei(this.target);return this.contentRect_=t,t.width!==this.broadcastWidth||t.height!==this.broadcastHeight},t.prototype.broadcastRect=function(){var t=this.contentRect_;return this.broadcastWidth=t.width,this.broadcastHeight=t.height,t},t}(),_i=function(){return function(t,e){var r,n,i,o,s,a,c,l=(n=(r=e).x,i=r.y,o=r.width,s=r.height,a="undefined"!=typeof DOMRectReadOnly?DOMRectReadOnly:Object,c=Object.create(a.prototype),pi(c,{x:n,y:i,width:o,height:s,top:i,right:n+o,bottom:s+i,left:n}),c);pi(this,{target:t,contentRect:l})}}(),Si=function(){function t(t,e,r){if(this.activeObservations_=[],this.observations_=new oi,"function"!=typeof t)throw new TypeError("The callback provided as parameter 1 is not a function.");this.callback_=t,this.controller_=e,this.callbackCtx_=r}return t.prototype.observe=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(t instanceof vi(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var e=this.observations_;e.has(t)||(e.set(t,new Oi(t)),this.controller_.addObserver(this),this.controller_.refresh())}},t.prototype.unobserve=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(t instanceof vi(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var e=this.observations_;e.has(t)&&(e.delete(t),e.size||this.controller_.removeObserver(this))}},t.prototype.disconnect=function(){this.clearActive(),this.observations_.clear(),this.controller_.removeObserver(this)},t.prototype.gatherActive=function(){var t=this;this.clearActive(),this.observations_.forEach(function(e){e.isActive()&&t.activeObservations_.push(e)})},t.prototype.broadcastActive=function(){if(this.hasActive()){var t=this.callbackCtx_,e=this.activeObservations_.map(function(t){return new _i(t.target,t.broadcastRect())});this.callback_.call(t,e,t),this.clearActive()}},t.prototype.clearActive=function(){this.activeObservations_.splice(0)},t.prototype.hasActive=function(){return this.activeObservations_.length>0},t}(),Ai="undefined"!=typeof WeakMap?new WeakMap:new oi,ki=function(){return function t(e){if(!(this instanceof t))throw new TypeError("Cannot call a class as a function.");if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");var r=di.getInstance(),n=new Si(e,r,this);Ai.set(this,n)}}();["observe","unobserve","disconnect"].forEach(function(t){ki.prototype[t]=function(){var e;return(e=Ai.get(this))[t].apply(e,arguments)}});var Li=void 0!==ai.ResizeObserver?ai.ResizeObserver:ki,Mi=!("undefined"==typeof window||!window.document||!window.document.createElement);function ji(){if("undefined"==typeof document)return 0;var t=document.body,e=document.createElement("div"),r=e.style;r.position="fixed",r.left=0,r.visibility="hidden",r.overflowY="scroll",t.appendChild(e);var n=e.getBoundingClientRect().right;return t.removeChild(e),n}var Ri=function(){function t(e,r){var n=this;this.onScroll=function(){n.scrollXTicking||(window.requestAnimationFrame(n.scrollX),n.scrollXTicking=!0),n.scrollYTicking||(window.requestAnimationFrame(n.scrollY),n.scrollYTicking=!0)},this.scrollX=function(){n.axis.x.isOverflowing&&(n.showScrollbar("x"),n.positionScrollbar("x")),n.scrollXTicking=!1},this.scrollY=function(){n.axis.y.isOverflowing&&(n.showScrollbar("y"),n.positionScrollbar("y")),n.scrollYTicking=!1},this.onMouseEnter=function(){n.showScrollbar("x"),n.showScrollbar("y")},this.onMouseMove=function(t){n.mouseX=t.clientX,n.mouseY=t.clientY,(n.axis.x.isOverflowing||n.axis.x.forceVisible)&&n.onMouseMoveForAxis("x"),(n.axis.y.isOverflowing||n.axis.y.forceVisible)&&n.onMouseMoveForAxis("y")},this.onMouseLeave=function(){n.onMouseMove.cancel(),(n.axis.x.isOverflowing||n.axis.x.forceVisible)&&n.onMouseLeaveForAxis("x"),(n.axis.y.isOverflowing||n.axis.y.forceVisible)&&n.onMouseLeaveForAxis("y"),n.mouseX=-1,n.mouseY=-1},this.onWindowResize=function(){n.scrollbarWidth=ji(),n.hideNativeScrollbar()},this.hideScrollbars=function(){n.axis.x.track.rect=n.axis.x.track.el.getBoundingClientRect(),n.axis.y.track.rect=n.axis.y.track.el.getBoundingClientRect(),n.isWithinBounds(n.axis.y.track.rect)||(n.axis.y.scrollbar.el.classList.remove(n.classNames.visible),n.axis.y.isVisible=!1),n.isWithinBounds(n.axis.x.track.rect)||(n.axis.x.scrollbar.el.classList.remove(n.classNames.visible),n.axis.x.isVisible=!1)},this.onPointerEvent=function(t){var e,r;n.axis.x.scrollbar.rect=n.axis.x.scrollbar.el.getBoundingClientRect(),n.axis.y.scrollbar.rect=n.axis.y.scrollbar.el.getBoundingClientRect(),(n.axis.x.isOverflowing||n.axis.x.forceVisible)&&(r=n.isWithinBounds(n.axis.x.scrollbar.rect)),(n.axis.y.isOverflowing||n.axis.y.forceVisible)&&(e=n.isWithinBounds(n.axis.y.scrollbar.rect)),(e||r)&&(t.preventDefault(),t.stopPropagation(),"mousedown"===t.type&&(e&&n.onDragStart(t,"y"),r&&n.onDragStart(t,"x")))},this.drag=function(e){var r=n.axis[n.draggedAxis].track,i=r.rect[n.axis[n.draggedAxis].sizeAttr],o=n.axis[n.draggedAxis].scrollbar;e.preventDefault(),e.stopPropagation();var s=(("y"===n.draggedAxis?e.pageY:e.pageX)-r.rect[n.axis[n.draggedAxis].offsetAttr]-n.axis[n.draggedAxis].dragOffset)/r.rect[n.axis[n.draggedAxis].sizeAttr]*n.contentWrapperEl[n.axis[n.draggedAxis].scrollSizeAttr];"x"===n.draggedAxis&&(s=n.isRtl&&t.getRtlHelpers().isRtlScrollbarInverted?s-(i+o.size):s,s=n.isRtl&&t.getRtlHelpers().isRtlScrollingInverted?-s:s),n.contentWrapperEl[n.axis[n.draggedAxis].scrollOffsetAttr]=s},this.onEndDrag=function(t){t.preventDefault(),t.stopPropagation(),n.el.classList.remove(n.classNames.dragging),document.removeEventListener("mousemove",n.drag,!0),document.removeEventListener("mouseup",n.onEndDrag,!0),n.removePreventClickId=window.setTimeout(function(){document.removeEventListener("click",n.preventClick,!0),document.removeEventListener("dblclick",n.preventClick,!0),n.removePreventClickId=null})},this.preventClick=function(t){t.preventDefault(),t.stopPropagation()},this.el=e,this.flashTimeout,this.contentEl,this.contentWrapperEl,this.offsetEl,this.maskEl,this.globalObserver,this.mutationObserver,this.resizeObserver,this.scrollbarWidth,this.minScrollbarWidth=20,this.options=Object.assign({},t.defaultOptions,r),this.classNames=Object.assign({},t.defaultOptions.classNames,this.options.classNames),this.isRtl,this.axis={x:{scrollOffsetAttr:"scrollLeft",sizeAttr:"width",scrollSizeAttr:"scrollWidth",offsetAttr:"left",overflowAttr:"overflowX",dragOffset:0,isOverflowing:!0,isVisible:!1,forceVisible:!1,track:{},scrollbar:{}},y:{scrollOffsetAttr:"scrollTop",sizeAttr:"height",scrollSizeAttr:"scrollHeight",offsetAttr:"top",overflowAttr:"overflowY",dragOffset:0,isOverflowing:!0,isVisible:!1,forceVisible:!1,track:{},scrollbar:{}}},this.removePreventClickId=null,t.instances.has(this.el)||(this.recalculate=un(this.recalculate.bind(this),64),this.onMouseMove=un(this.onMouseMove.bind(this),64),this.hideScrollbars=Ln(this.hideScrollbars.bind(this),this.options.timeout),this.onWindowResize=Ln(this.onWindowResize.bind(this),64,{leading:!0}),t.getRtlHelpers=ii(t.getRtlHelpers),this.init())}t.getRtlHelpers=function(){var e=document.createElement("div");e.innerHTML='<div class="hs-dummy-scrollbar-size"><div style="height: 200%; width: 200%; margin: 10px 0;"></div></div>';var r=e.firstElementChild;document.body.appendChild(r);var n=r.firstElementChild;r.scrollLeft=0;var i=t.getOffset(r),o=t.getOffset(n);r.scrollLeft=999;var s=t.getOffset(n);return{isRtlScrollingInverted:i.left!==o.left&&o.left-s.left!=0,isRtlScrollbarInverted:i.left!==o.left}},t.initHtmlApi=function(){this.initDOMLoadedElements=this.initDOMLoadedElements.bind(this),"undefined"!=typeof MutationObserver&&(this.globalObserver=new MutationObserver(function(e){e.forEach(function(e){Array.prototype.forEach.call(e.addedNodes,function(e){1===e.nodeType&&(e.hasAttribute("data-simplebar")?!t.instances.has(e)&&new t(e,t.getElOptions(e)):Array.prototype.forEach.call(e.querySelectorAll("[data-simplebar]"),function(e){!t.instances.has(e)&&new t(e,t.getElOptions(e))}))}),Array.prototype.forEach.call(e.removedNodes,function(e){1===e.nodeType&&(e.hasAttribute("data-simplebar")?t.instances.has(e)&&t.instances.get(e).unMount():Array.prototype.forEach.call(e.querySelectorAll("[data-simplebar]"),function(e){t.instances.has(e)&&t.instances.get(e).unMount()}))})})}),this.globalObserver.observe(document,{childList:!0,subtree:!0})),"complete"===document.readyState||"loading"!==document.readyState&&!document.documentElement.doScroll?window.setTimeout(this.initDOMLoadedElements):(document.addEventListener("DOMContentLoaded",this.initDOMLoadedElements),window.addEventListener("load",this.initDOMLoadedElements))},t.getElOptions=function(t){return Array.prototype.reduce.call(t.attributes,function(t,e){var r=e.name.match(/data-simplebar-(.+)/);if(r){var n=r[1].replace(/\W+(.)/g,function(t,e){return e.toUpperCase()});switch(e.value){case"true":t[n]=!0;break;case"false":t[n]=!1;break;case void 0:t[n]=!0;break;default:t[n]=e.value}}return t},{})},t.removeObserver=function(){this.globalObserver.disconnect()},t.initDOMLoadedElements=function(){document.removeEventListener("DOMContentLoaded",this.initDOMLoadedElements),window.removeEventListener("load",this.initDOMLoadedElements),Array.prototype.forEach.call(document.querySelectorAll("[data-simplebar]"),function(e){t.instances.has(e)||new t(e,t.getElOptions(e))})},t.getOffset=function(t){var e=t.getBoundingClientRect();return{top:e.top+(window.pageYOffset||document.documentElement.scrollTop),left:e.left+(window.pageXOffset||document.documentElement.scrollLeft)}};var e=t.prototype;return e.init=function(){t.instances.set(this.el,this),Mi&&(this.initDOM(),this.scrollbarWidth=ji(),this.recalculate(),this.initListeners())},e.initDOM=function(){var t=this;if(Array.prototype.filter.call(this.el.children,function(e){return e.classList.contains(t.classNames.wrapper)}).length)this.wrapperEl=this.el.querySelector("."+this.classNames.wrapper),this.contentWrapperEl=this.options.scrollableNode||this.el.querySelector("."+this.classNames.contentWrapper),this.contentEl=this.options.contentNode||this.el.querySelector("."+this.classNames.contentEl),this.offsetEl=this.el.querySelector("."+this.classNames.offset),this.maskEl=this.el.querySelector("."+this.classNames.mask),this.placeholderEl=this.el.querySelector("."+this.classNames.placeholder),this.heightAutoObserverWrapperEl=this.el.querySelector("."+this.classNames.heightAutoObserverWrapperEl),this.heightAutoObserverEl=this.el.querySelector("."+this.classNames.heightAutoObserverEl),this.axis.x.track.el=this.el.querySelector("."+this.classNames.track+"."+this.classNames.horizontal),this.axis.y.track.el=this.el.querySelector("."+this.classNames.track+"."+this.classNames.vertical);else{for(this.wrapperEl=document.createElement("div"),this.contentWrapperEl=document.createElement("div"),this.offsetEl=document.createElement("div"),this.maskEl=document.createElement("div"),this.contentEl=document.createElement("div"),this.placeholderEl=document.createElement("div"),this.heightAutoObserverWrapperEl=document.createElement("div"),this.heightAutoObserverEl=document.createElement("div"),this.wrapperEl.classList.add(this.classNames.wrapper),this.contentWrapperEl.classList.add(this.classNames.contentWrapper),this.offsetEl.classList.add(this.classNames.offset),this.maskEl.classList.add(this.classNames.mask),this.contentEl.classList.add(this.classNames.contentEl),this.placeholderEl.classList.add(this.classNames.placeholder),this.heightAutoObserverWrapperEl.classList.add(this.classNames.heightAutoObserverWrapperEl),this.heightAutoObserverEl.classList.add(this.classNames.heightAutoObserverEl);this.el.firstChild;)this.contentEl.appendChild(this.el.firstChild);this.contentWrapperEl.appendChild(this.contentEl),this.offsetEl.appendChild(this.contentWrapperEl),this.maskEl.appendChild(this.offsetEl),this.heightAutoObserverWrapperEl.appendChild(this.heightAutoObserverEl),this.wrapperEl.appendChild(this.heightAutoObserverWrapperEl),this.wrapperEl.appendChild(this.maskEl),this.wrapperEl.appendChild(this.placeholderEl),this.el.appendChild(this.wrapperEl)}if(!this.axis.x.track.el||!this.axis.y.track.el){var e=document.createElement("div"),r=document.createElement("div");e.classList.add(this.classNames.track),r.classList.add(this.classNames.scrollbar),e.appendChild(r),this.axis.x.track.el=e.cloneNode(!0),this.axis.x.track.el.classList.add(this.classNames.horizontal),this.axis.y.track.el=e.cloneNode(!0),this.axis.y.track.el.classList.add(this.classNames.vertical),this.el.appendChild(this.axis.x.track.el),this.el.appendChild(this.axis.y.track.el)}this.axis.x.scrollbar.el=this.axis.x.track.el.querySelector("."+this.classNames.scrollbar),this.axis.y.scrollbar.el=this.axis.y.track.el.querySelector("."+this.classNames.scrollbar),this.options.autoHide||(this.axis.x.scrollbar.el.classList.add(this.classNames.visible),this.axis.y.scrollbar.el.classList.add(this.classNames.visible)),this.el.setAttribute("data-simplebar","init")},e.initListeners=function(){var t=this;this.options.autoHide&&this.el.addEventListener("mouseenter",this.onMouseEnter),["mousedown","click","dblclick"].forEach(function(e){t.el.addEventListener(e,t.onPointerEvent,!0)}),["touchstart","touchend","touchmove"].forEach(function(e){t.el.addEventListener(e,t.onPointerEvent,{capture:!0,passive:!0})}),this.el.addEventListener("mousemove",this.onMouseMove),this.el.addEventListener("mouseleave",this.onMouseLeave),this.contentWrapperEl.addEventListener("scroll",this.onScroll),window.addEventListener("resize",this.onWindowResize),this.resizeObserver=new Li(this.recalculate),this.resizeObserver.observe(this.el),this.resizeObserver.observe(this.contentEl)},e.recalculate=function(){var t=this.heightAutoObserverEl.offsetHeight<=1,e=this.heightAutoObserverEl.offsetWidth<=1;this.elStyles=window.getComputedStyle(this.el),this.isRtl="rtl"===this.elStyles.direction,this.contentEl.style.padding=this.elStyles.paddingTop+" "+this.elStyles.paddingRight+" "+this.elStyles.paddingBottom+" "+this.elStyles.paddingLeft,this.wrapperEl.style.margin="-"+this.elStyles.paddingTop+" -"+this.elStyles.paddingRight+" -"+this.elStyles.paddingBottom+" -"+this.elStyles.paddingLeft,this.contentWrapperEl.style.height=t?"auto":"100%",this.placeholderEl.style.width=e?this.contentEl.offsetWidth+"px":"auto",this.placeholderEl.style.height=this.contentEl.scrollHeight+"px",this.axis.x.isOverflowing=this.contentWrapperEl.scrollWidth>this.contentWrapperEl.offsetWidth,this.axis.y.isOverflowing=this.contentWrapperEl.scrollHeight>this.contentWrapperEl.offsetHeight,this.axis.x.isOverflowing="hidden"!==this.elStyles.overflowX&&this.axis.x.isOverflowing,this.axis.y.isOverflowing="hidden"!==this.elStyles.overflowY&&this.axis.y.isOverflowing,this.axis.x.forceVisible="x"===this.options.forceVisible||!0===this.options.forceVisible,this.axis.y.forceVisible="y"===this.options.forceVisible||!0===this.options.forceVisible,this.hideNativeScrollbar(),this.axis.x.track.rect=this.axis.x.track.el.getBoundingClientRect(),this.axis.y.track.rect=this.axis.y.track.el.getBoundingClientRect(),this.axis.x.scrollbar.size=this.getScrollbarSize("x"),this.axis.y.scrollbar.size=this.getScrollbarSize("y"),this.axis.x.scrollbar.el.style.width=this.axis.x.scrollbar.size+"px",this.axis.y.scrollbar.el.style.height=this.axis.y.scrollbar.size+"px",this.positionScrollbar("x"),this.positionScrollbar("y"),this.toggleTrackVisibility("x"),this.toggleTrackVisibility("y")},e.getScrollbarSize=function(t){void 0===t&&(t="y");var e,r=this.scrollbarWidth?this.contentWrapperEl[this.axis[t].scrollSizeAttr]:this.contentWrapperEl[this.axis[t].scrollSizeAttr]-this.minScrollbarWidth,n=this.axis[t].track.rect[this.axis[t].sizeAttr];if(this.axis[t].isOverflowing){var i=n/r;return e=Math.max(~~(i*n),this.options.scrollbarMinSize),this.options.scrollbarMaxSize&&(e=Math.min(e,this.options.scrollbarMaxSize)),e}},e.positionScrollbar=function(e){void 0===e&&(e="y");var r=this.contentWrapperEl[this.axis[e].scrollSizeAttr],n=this.axis[e].track.rect[this.axis[e].sizeAttr],i=parseInt(this.elStyles[this.axis[e].sizeAttr],10),o=this.axis[e].scrollbar,s=this.contentWrapperEl[this.axis[e].scrollOffsetAttr],a=(s="x"===e&&this.isRtl&&t.getRtlHelpers().isRtlScrollingInverted?-s:s)/(r-i),c=~~((n-o.size)*a);c="x"===e&&this.isRtl&&t.getRtlHelpers().isRtlScrollbarInverted?c+(n-o.size):c,o.el.style.transform="x"===e?"translate3d("+c+"px, 0, 0)":"translate3d(0, "+c+"px, 0)"},e.toggleTrackVisibility=function(t){void 0===t&&(t="y");var e=this.axis[t].track.el,r=this.axis[t].scrollbar.el;this.axis[t].isOverflowing||this.axis[t].forceVisible?(e.style.visibility="visible",this.contentWrapperEl.style[this.axis[t].overflowAttr]="scroll"):(e.style.visibility="hidden",this.contentWrapperEl.style[this.axis[t].overflowAttr]="hidden"),this.axis[t].isOverflowing?r.style.display="block":r.style.display="none"},e.hideNativeScrollbar=function(){if(this.offsetEl.style[this.isRtl?"left":"right"]=this.axis.y.isOverflowing||this.axis.y.forceVisible?"-"+(this.scrollbarWidth||this.minScrollbarWidth)+"px":0,this.offsetEl.style.bottom=this.axis.x.isOverflowing||this.axis.x.forceVisible?"-"+(this.scrollbarWidth||this.minScrollbarWidth)+"px":0,!this.scrollbarWidth){var t=[this.isRtl?"paddingLeft":"paddingRight"];this.contentWrapperEl.style[t]=this.axis.y.isOverflowing||this.axis.y.forceVisible?this.minScrollbarWidth+"px":0,this.contentWrapperEl.style.paddingBottom=this.axis.x.isOverflowing||this.axis.x.forceVisible?this.minScrollbarWidth+"px":0}},e.onMouseMoveForAxis=function(t){void 0===t&&(t="y"),this.axis[t].track.rect=this.axis[t].track.el.getBoundingClientRect(),this.axis[t].scrollbar.rect=this.axis[t].scrollbar.el.getBoundingClientRect(),this.isWithinBounds(this.axis[t].scrollbar.rect)?this.axis[t].scrollbar.el.classList.add(this.classNames.hover):this.axis[t].scrollbar.el.classList.remove(this.classNames.hover),this.isWithinBounds(this.axis[t].track.rect)?(this.showScrollbar(t),this.axis[t].track.el.classList.add(this.classNames.hover)):this.axis[t].track.el.classList.remove(this.classNames.hover)},e.onMouseLeaveForAxis=function(t){void 0===t&&(t="y"),this.axis[t].track.el.classList.remove(this.classNames.hover),this.axis[t].scrollbar.el.classList.remove(this.classNames.hover)},e.showScrollbar=function(t){void 0===t&&(t="y");var e=this.axis[t].scrollbar.el;this.axis[t].isVisible||(e.classList.add(this.classNames.visible),this.axis[t].isVisible=!0),this.options.autoHide&&this.hideScrollbars()},e.onDragStart=function(t,e){void 0===e&&(e="y");var r=this.axis[e].scrollbar.el,n="y"===e?t.pageY:t.pageX;this.axis[e].dragOffset=n-r.getBoundingClientRect()[this.axis[e].offsetAttr],this.draggedAxis=e,this.el.classList.add(this.classNames.dragging),document.addEventListener("mousemove",this.drag,!0),document.addEventListener("mouseup",this.onEndDrag,!0),null===this.removePreventClickId?(document.addEventListener("click",this.preventClick,!0),document.addEventListener("dblclick",this.preventClick,!0)):(window.clearTimeout(this.removePreventClickId),this.removePreventClickId=null)},e.getContentElement=function(){return this.contentEl},e.getScrollElement=function(){return this.contentWrapperEl},e.removeListeners=function(){var t=this;this.options.autoHide&&this.el.removeEventListener("mouseenter",this.onMouseEnter),["mousedown","click","dblclick"].forEach(function(e){t.el.removeEventListener(e,t.onPointerEvent,!0)}),["touchstart","touchend","touchmove"].forEach(function(e){t.el.removeEventListener(e,t.onPointerEvent,{capture:!0,passive:!0})}),this.el.removeEventListener("mousemove",this.onMouseMove),this.el.removeEventListener("mouseleave",this.onMouseLeave),this.contentWrapperEl.removeEventListener("scroll",this.onScroll),window.removeEventListener("resize",this.onWindowResize),this.mutationObserver&&this.mutationObserver.disconnect(),this.resizeObserver.disconnect(),this.recalculate.cancel(),this.onMouseMove.cancel(),this.hideScrollbars.cancel(),this.onWindowResize.cancel()},e.unMount=function(){this.removeListeners(),t.instances.delete(this.el)},e.isChildNode=function(t){return null!==t&&(t===this.el||this.isChildNode(t.parentNode))},e.isWithinBounds=function(t){return this.mouseX>=t.left&&this.mouseX<=t.left+t.width&&this.mouseY>=t.top&&this.mouseY<=t.top+t.height},t}();return Ri.defaultOptions={autoHide:!0,forceVisible:!1,classNames:{contentEl:"simplebar-content",contentWrapper:"simplebar-content-wrapper",offset:"simplebar-offset",mask:"simplebar-mask",wrapper:"simplebar-wrapper",placeholder:"simplebar-placeholder",scrollbar:"simplebar-scrollbar",track:"simplebar-track",heightAutoObserverWrapperEl:"simplebar-height-auto-observer-wrapper",heightAutoObserverEl:"simplebar-height-auto-observer",visible:"simplebar-visible",horizontal:"simplebar-horizontal",vertical:"simplebar-vertical",hover:"simplebar-hover",dragging:"simplebar-dragging"},scrollbarMinSize:25,scrollbarMaxSize:0,timeout:1e3},Ri.instances=new WeakMap,Mi&&Ri.initHtmlApi(),Ri});

}); /* end of as page load scripts */