// Get the header and navbar elements
const topHeader = document.querySelector('.top-header');
const navbar = document.getElementById('navbar');

// Get the position where the navbar should stick
const sticky = navbar.offsetTop;

// Add scroll event listener to the window
window.onscroll = function() {
    handleStickyNavbar();
};

function handleStickyNavbar() {
    if (window.pageYOffset > sticky) {
        navbar.classList.add("sticky");
        topHeader.style.top = "-100px";  // Hide the top header
    } else {
        navbar.classList.remove("sticky");
        topHeader.style.top = "0";  // Show the top header
    }
}



// Load section content dynamically based on the menu item clicked
document.addEventListener('DOMContentLoaded', function () {
    const menuLinks = document.querySelectorAll('#navbar a');

    menuLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();  // Prevent default link behavior (page reload)
            const sectionId = this.getAttribute('href');  // Get the href attribute (e.g., #home)

            // Update the URL to reflect the section change
            updateUrl(sectionId);

            // Load the corresponding section content
            loadSectionContent(sectionId);
        });
    });
});

// Function to dynamically load section content
function loadSectionContent(sectionId) {
    // Fetch the section content dynamically (assuming separate HTML files for each section)
    fetch(`${sectionId.replace('#', '')}`)  // e.g., Asset/home.html, Asset/About.html
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        // Update the main content area with the fetched content
        document.querySelector('main').innerHTML = data;
    })
    .catch(error => console.error('Error loading section:', error));
}

// Function to update the URL without reloading the page
function updateUrl(sectionId) {
    // Use history.pushState to change the URL without reloading the page
    const newUrl = `${window.location.origin}/${sectionId.replace('#', '')}`;
    
    history.pushState(null, '', newUrl);
}

// Handle back/forward browser navigation
window.onpopstate = function() {
    let section = window.location.pathname.split("/").pop();
    if (section) {
        loadSectionContent(`#${section}`);
    }
};

