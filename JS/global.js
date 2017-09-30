
/********************************************************
*
*			            ¡IMPORTANTE!
*
*	Introducir aquí la dirección (URL) del directorio
*	donde Zendesk almacena los recursos del sitio.
*
*	1. Para obtener esta dirección, entre al
*	adiminstrador del help desk y dé click en
*	"Centro de Ayuda" en la esquina inferior izquierda.
*	2. Cuando se abra la previsualización del centro de
*	ayuda, en la esquina inferior derecha, dé click en
*	en "Personalizar diseño".
* 3. Del lado derecho, aparecerá la barra de herramientas,
*	en ella, debajo de "Tema", dé click en "Editar Tema".
*	4. En el "Editor de temas" dé click en "Recursos".
*	5. Arrastre un archivo a la sección
*	"Agregue un archivo o coloque archivos aquí"
*	6. Cuando aparezca el archivo en la lista, debajo
*	de su nombre se desplegará la ubicación del archivo.
*	7.Copie la dirección y reemplace la dirección que
*	se encuentra en este recuadro
*	NO INCLUYA EL NOMBRE DEL ARCHIVO, SÓLO COPIE LA
*	DIRECCIÓN HASTA EL NOMBRE DEL DIRECTORIO
*
*/
var BASE_URL =
"//p4.zdassets.com/hc/theme_assets/598858/200073509/";
/*							/\
*						   /  \
*						  /    \
*					   /-    -\
*						   |  |
*						   |  |
*					     |__|
*
*				REEMPLACE ESTA DIRECCIÓN
*
********************************************************/


/*******************************************************
*
*	Debido a que Zendesk no ofrece las herramientas de
*	navegación necesarias para crear vínculos a las
*	categorias, es necesario introducir manualmente
*	los nombres y ubicaciones de las categorias.
*
*/
var NAVIGATION_URLS = {
"Móvil": 		"/hc/es/categories/200353595-Móvil",
"Cómputo": 	"/hc/es/categories/200340329-Cómputo",
"General": 	"/hc/es/categories/200185719-General",
"Soluciones": "/hc/es/categories/200353605-Soluciones-Inmediatas"
};
/*
********************************************************/


/*******************************************************
*/
var fondo_documento =						"subtle_dots.png";
var ilustracion_movil = 				"M_vil_375.png";
var ilustracion_computo = 			"Computo_375.png";
var ilustracion_general = 			"General_375.png";
var ilustracion_soluciones = 		"FAQ_375.png";
var logo_encabezado_LX =				"LX.png";
var boton_busqueda_encabezado =	"guadalupeBttn.png";
var anon_user_icon =						"userIcon.png";
var ticket_icon =								"reporteBttn2.png";
var social_media = 							"ico_footer_social.png";
/*
********************************************************/

/*
* jQuery v1.9.1 included
*/
$(document).ready(function() {

// social share popups
$(".share a").click(function(e) {
e.preventDefault();
window.open(this.href, "", "height = 500, width = 500");
});

// toggle the share dropdown in communities
$(".share-label").on("click", function(e) {
e.stopPropagation();
var isSelected = this.getAttribute("aria-selected") == "true";
this.setAttribute("aria-selected", !isSelected);
$(".share-label").not(this).attr("aria-selected", "false");
});

$(document).on("click", function() {
$(".share-label").attr("aria-selected", "false");
});

// show form controls when the textarea receives focus or backbutton is used and value exists
var $answerbodyTextarea = $(".answer-body textarea"),
$answerFormControls = $(".answer-form-controls"),
$commentContainerTextarea = $(".comment-container textarea"),
$commentContainerFormControls = $(".comment-form-controls");

$answerbodyTextarea.one("focus", function() {
$answerFormControls.show();
});

$commentContainerTextarea.one("focus", function() {
$commentContainerFormControls.show();
});

if($commentContainerTextarea.val() !== "") {
$commentContainerFormControls.show();
}

if($answerbodyTextarea.val() !== "") {
$answerFormControls.show();
}


/*

AiDC -- Custom script

*/

function initMainPage() {


//papulate navigation bar
var headerList = document.getElementById("custom_navigation_list");
var lastItem = headerList.firstChild;

for( key in NAVIGATION_URLS ){
var newItem = document.createElement("li");
var newAnchor = document.createElement("a");

newAnchor.href = NAVIGATION_URLS[key];
newAnchor.innerText = key;

newItem.appendChild(newAnchor);
headerList.insertBefore(newItem, lastItem);
}

//clean the navigation bar
var community = headerList.getElementsByTagName("h4")[0];
var communityAnchor = community.getElementsByTagName("a")[0];
communityAnchor.innerHTML = "Comunidad";
community.parentNode.replaceChild(communityAnchor, community);

//Setup the submit a new ticket anchor link
var ticketLink = document.getElementById("custom_ticketLink");
var ticketAnchor = ticketLink.getElementsByTagName('a')[0];

//If the acount can submit a new ticket
if(typeof ticketAnchor !== "undefined") {
ticketAnchor.innerHTML = "";
}

//Setup the main category presentation
var mainCategory = document.getElementById("categoryList");
if(mainCategory === null) return;
var mainCategoryList = mainCategory.getElementsByTagName("ul")[0];
var categories = mainCategoryList.children;
var expectedCategories = ["Cómputo",
"General",
"Soluciones Inmediatas",
"Móvil"
];
var backgrounds = [ BASE_URL + ilustracion_computo,
BASE_URL + ilustracion_general,
BASE_URL + ilustracion_soluciones,
BASE_URL + ilustracion_movil
];

for(var cLi = 0; cLi < categories.length; cLi++) {

//restyle node
var anchor = categories[cLi].getElementsByTagName("a")[0];
var anchorText = anchor.innerText;
anchor.innerText = "";

var textDiv = document.createElement("div");
var titleParagraph = document.createElement("p");
titleParagraph.innerText = anchorText;
textDiv.appendChild(titleParagraph);

//set class and background image
switch(anchorText) {

case expectedCategories[0]:
categories[cLi].className = "liJump_1";
categories[cLi].style.backgroundImage = "url(" + backgrounds[0] + ")";
break;

case expectedCategories[3]:
categories[cLi].className = "liJump_1";
categories[cLi].style.backgroundImage = "url(" + backgrounds[3] + ")";
break;

case expectedCategories[1]:
categories[cLi].className = "liJump_2";
categories[cLi].style.backgroundImage = "url(" + backgrounds[1] + ")";
break;

case expectedCategories[2]:
categories[cLi].className = "liJump_2";
categories[cLi].style.backgroundImage = "url(" + backgrounds[2] + ")";
break;

default:
categories[cLi].className = "liJump_3";
break;

}

anchor.appendChild(textDiv);

}

//request content from promoted articles
var charactersToDisplay = 150;
var promotedContainer = document.getElementsByClassName("promoted-articles")[0];
if(typeof promotedContainer === "undefined") return;
var promotedArticles = promotedContainer.getElementsByTagName("ul")[0];
var articlesLi = promotedArticles.children;

for(var cLi = 0; cLi < articlesLi.length; cLi++) {

var articleLink = articlesLi[cLi].getElementsByTagName("a")[0].href;

$.ajax({
url: articleLink,
beforeSend: function(xhr) {
xhr.overrideMimeType("text/plain; charset=x-user-defined");
}
})
.done((function(currentLi) {
return function(data) {

data = data.replace("img","div");
var tempP = document.createElement("p");
tempP.innerHTML = data;

var author = tempP.getElementsByClassName("custom_authorName")[0];
var created = tempP.getElementsByClassName("custom_createdAt")[0];
var comments = tempP.getElementsByClassName("custom_commentCount")[0];
//var category = tempP.getElementsByClassName("breadcrumbs")[0].children[1].children[0];

var createdContent =  created.children[0].innerText;
created.children[0].innerText = createdContent.substring(0, createdContent.length - 5);

author.innerHTML = '<i class="custom_userIcon"></i>' + author.innerHTML;
created.innerHTML = '<i class="custom_createdIcon"></i>' + created.innerHTML;
comments.innerHTML = '<i class="custom_commentsIcon"></i>' + comments.innerHTML;
//category.innerHTML = "<div> " + category.innerHTML + " </div>";

var articleInfo = document.createElement("div");
articleInfo.className = "custom_articleInfo";
articleInfo.appendChild(author);
//articleInfo.appendChild(category);
articleInfo.appendChild(created);
articleInfo.appendChild(comments);

currentLi.appendChild(articleInfo);

var articleBody = tempP.getElementsByClassName("article-body")[0];
var extract = articleBody.children[0];
extract.innerText = extract.innerText.slice(0, 200) + "...";

currentLi.appendChild(extract);


articleBody = null;
extract = null

}
})(articlesLi[cLi]));

}

}

//display the seach bar
$(".custom_openClose-search").on("click", function(e) {
e.stopPropagation();

$("#custom_searchBar").toggleClass("active");

});

initMainPage();


//Fix the header when the user scroll past it

var innerMenu = $(".header-inner");
var innerMenuOffset = innerMenu.offset().top;

var isFixed = false;

$(window).scroll(function() {
var edge = $(window).scrollTop();

if(innerMenuOffset <= edge) {
//fix the header
if(!isFixed) {
innerMenu.toggleClass("fixed-style");
isFixed = true;
}

} else {
//restore header
if(isFixed) {
innerMenu.toggleClass("fixed-style");
isFixed = false;
}
}

});

//add alt text to user image

var avatar = document.getElementById("user-avatar");
if(avatar != null)
avatar.title = avatar.alt;

if( typeof $(".login").get(0) !== "undefined" ){
$(".login").get(0).alt = "Iniciar Sesión";
$(".login").get(0).title = "Iniciar Sesión";
}

//respond to window width

function checkWidth(){
var windowsize = $(window).width();
if (windowsize > 1280) {
$(".custom_body").addClass("custom_extended");
} else {
$(".custom_body").removeClass("custom_extended");
}
}

checkWidth();
$(window).resize(checkWidth);


//Fill resources

$("body").css("background-image", "url("+BASE_URL + fondo_documento+")");
$(".custom_user .login").css("background-image", "url("+BASE_URL + anon_user_icon+")");
$("#custom_ticketLink a").css("background-image", "url("+BASE_URL + ticket_icon+")");
$(".logo img").attr("src", BASE_URL + logo_encabezado_LX);
$(".custom_search img").attr("src", BASE_URL + boton_busqueda_encabezado);
$(".custom_menu li a").css("background-image", "url("+BASE_URL + social_media+")");

});
