/**
 * Define Global Variables
 *
 */
const SECTIONS_DIVS = document.querySelectorAll(".landing__container");
let SECTIONS_DIVS_INFO = [];
const NAV_BAR_UL = document.querySelector("#navbar__list");
/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * @description nav links event handler
 * @param {object} e
 */
const handleMenuLinkClick = (e) => {
  //get the "data-nav" of the clicked item
  let linkData = e.target.getAttribute("data-nav");

  let removingOldActiveClassDone = false;
  let addingNewActiveClassDone = false;
  let newActiveSection;

  //#region Menu Link
  //remove class "your-active-class" from old active link
  //get the links
  const currentLinks = document.querySelectorAll(".menu__link");
  for (const link of currentLinks) {
    if (link.classList.contains("your-active-class")) {
      link.classList.remove("your-active-class");
      break;
    }
  }
  //add class "your-active-class" to the link
  e.target.classList.add("your-active-class");
  //#endregion

  //#region Sections
  for (const secDiv of SECTIONS_DIVS) {
    let secDivData = secDiv.parentElement.getAttribute("data-nav");
    let isActive = secDiv.parentElement.classList.contains("your-active-class");

    //remove class "your-active-class" from the one it holds
    if (!removingOldActiveClassDone && isActive) {
      secDiv.parentElement.classList.remove("your-active-class");
      removingOldActiveClassDone = true;
    }

    //add class "your-active-class" to the current SECTION
    if (!addingNewActiveClassDone && linkData === secDivData) {
      secDiv.parentElement.classList.add("your-active-class");
      newActiveSection = secDiv;
      addingNewActiveClassDone = true;
    }

    if (removingOldActiveClassDone && addingNewActiveClassDone) {
      scrollToSection(newActiveSection);
      break;
    }
  }
  //#endregion
};

/**
 * Scroll to the active section
 * @param {object} secDiv the active section div
 */
const scrollToSection = (secDiv) => {
  secDiv.scrollIntoView({ block: "end" });
};

/**
 * @description create an li for each section, define its event listener
 * @param {string} id li element id
 * @param {string} title li element text
 * @param {string} data li element data attribute value 'data-nav'
 */
const createLiForEachSection = (id, title, data) => {
  let navBarLi = document.createElement("li");
  navBarLi.id = `nav__${id}`;
  navBarLi.textContent = title;
  navBarLi.setAttribute("data-nav", data);
  navBarLi.classList.add("menu__link");
  navBarLi.addEventListener("click", (e) => {
    handleMenuLinkClick(e);
  });

  return navBarLi;
};

/**
 * @description Getting the sections, creating a link representing each section & append them
 */
const buildMenu = () => {
  //create document fragment
  const docFrgmnt = document.createDocumentFragment();

  //loop the sections
  for (const section of SECTIONS_DIVS) {
    let id = section.parentElement.id;
    let data = section.parentElement.getAttribute("data-nav");
    let title = section.querySelector("h2").textContent;

    //get section top
    let sectionTop = section.getBoundingClientRect().y;
    let sectionBottom = sectionTop + section.getBoundingClientRect().height;
    SECTIONS_DIVS_INFO.push({
      sectionTop,
      sectionBottom,
      data,
    });

    //create li
    let navBarLi = createLiForEachSection(id, title, data);

    docFrgmnt.appendChild(navBarLi);
  }
  NAV_BAR_UL.appendChild(docFrgmnt);
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

//When the document is loaded, add the event listener of the scrolling, up btn
document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("scroll", () => {
    handleScrollingEvent();
  });
  document.querySelector(".scrollToTopBtn").addEventListener("click", () => {
    scrollToTop();
  });
});

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
buildMenu();

// Scroll to section on link click
/**
 * @description Handle when the user scrolls, it will handle active status of the sections & nav links
 */
const handleScrollingEvent = () => {
  let currentActiveSctn = document.querySelector("section.your-active-class");
  let currentActiveLink = document.querySelector(
    "#navbar__list .your-active-class"
  );

  for (const sctnDiv of SECTIONS_DIVS) {
    const sectionTop = sctnDiv.getBoundingClientRect().top;
    if (
      sectionTop >= 0 &&
      sectionTop <= document.documentElement.clientHeight / 2
    ) {
      addRemoveActiveStatus(currentActiveSctn, currentActiveLink, sctnDiv);
      break;
    }
  }
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
  });
};

// Set sections as active
/**
 * handles the setting active status on and off on the sections & links
 * @param {HTMLElement} currentActiveSctn
 * @param {HTMLElement} currentActiveLink
 * @param {HTMLElement} sctnDiv
 */
const addRemoveActiveStatus = (
  currentActiveSctn,
  currentActiveLink,
  sctnDiv
) => {
  //remove old active classes from nav bar & sections
  if (currentActiveSctn)
    currentActiveSctn.classList.remove("your-active-class");
  if (currentActiveLink)
    currentActiveLink.classList.remove("your-active-class");

  //add new active classes from nav bar & sections
  sctnDiv.parentElement.classList.add("your-active-class");

  let newSctnData = sctnDiv.parentElement.getAttribute("data-nav");
  document
    .querySelector(`.menu__link[data-nav="${newSctnData}"]`)
    .classList.add("your-active-class");
};
