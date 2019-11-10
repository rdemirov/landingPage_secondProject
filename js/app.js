/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

const documentSections = document.querySelectorAll("section");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */
// Scroll to anchorId when it is clicked from the menu

const scrollToSection = event => {
    event.preventDefault();
    const targetPath = event.target.getAttribute("href");
    let targetId = targetPath.split("#")[1];
    const targetElement = document.getElementById(targetId);
    documentSections.forEach((section) => {
        let sectionId = section.getAttribute('id');
        if (sectionId !== targetId) section.classList.remove('your-active-class');
    });
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'center'});
};
/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav containing the sections defined in index.html

const buildNavMenu = () => {
    const menuRoot = document.getElementById("navbar__list");
    documentSections.forEach(section => {
    const listItem = document.createElement("li");
    const sectionInfo = section.getAttribute("data-nav");
    const sectionLink = document.createElement("a");
    sectionLink.setAttribute('data-nav',sectionInfo);
    sectionLink.setAttribute("href", `#${section.getAttribute("id")}`);
    sectionLink.addEventListener("click", scrollToSection);
    sectionLink.classList.add("menu__link");
    sectionLink.textContent = sectionInfo;
    listItem.appendChild(sectionLink);
    menuRoot.appendChild(listItem);
    });
};

// Add class 'active' to section when near top of viewport

const setSectionActive = () => {
    documentSections.forEach((section) => {
        const headerElement = document.querySelector('.page__header');
        const headerY = headerElement.getBoundingClientRect().y;
        const sectionTop = section.getBoundingClientRect().top;
        const sectionNav = section.getAttribute('data-nav');
        const sectionLink = document.querySelector(`a[data-nav="${sectionNav}"]`);
    if (sectionTop > headerY/2 && sectionTop <= (window.innerHeight*0.8))
        {
            sectionLink.style.backgroundColor='black';
            sectionLink.style.color='white';
            section.classList.add("your-active-class");
        }
        else
            {
                sectionLink.style.backgroundColor='white';
                sectionLink.style.color='black';
                section.classList.remove("your-active-class");
            }
    });
};
/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
buildNavMenu();

// Set sections as active

window.addEventListener("scroll", () => {
    setSectionActive();
});
