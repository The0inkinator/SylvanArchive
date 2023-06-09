//Name elements & pull values

//Menu Grid
const menu = document.getElementById("menu") as HTMLDivElement;

//Home Button
const homeButton = document.getElementById("homeButton") as HTMLDivElement;
const homeTitle = document.getElementById("homeButtonTitle") as HTMLDivElement;
const homeTitleWidth = window.getComputedStyle(homeTitle).width;
//Search Bar
const searchBar = document.getElementById("searchBar") as HTMLDivElement;
const searchBarInput = document.getElementById(
  "searchBarInput"
) as HTMLInputElement;
const searchCloseButton = document.getElementById(
  "searchCloseButton"
) as HTMLDivElement;
//Bookmarks Button
const bookmarkBar = document.getElementById("bookmarkBar") as HTMLDivElement;
const bookmarkDropdown = document.getElementById(
  "bookmarkDropdown"
) as HTMLDivElement;
const bookmarkCloseButton = document.getElementById(
  "bookmarkCloseButton"
) as HTMLDivElement;
//Account Button
const accountButton = document.getElementById(
  "accountButton"
) as HTMLAnchorElement;

//Define element logic states
let searchCloseHover = false;
let bookmarkCloseHover = false;

//Define hover listeners
searchCloseButton.addEventListener("mouseenter", () => {
  searchCloseHover = true;
});
searchCloseButton.addEventListener("mouseleave", () => {
  searchCloseHover = false;
});
bookmarkCloseButton.addEventListener("mouseenter", () => {
  bookmarkCloseHover = true;
});
bookmarkCloseButton.addEventListener("mouseleave", () => {
  bookmarkCloseHover = false;
});

//Create style states
function vsHomeButtonOpen() {
  homeTitle.style.width = "100%";
  if (window.innerWidth > 480) {
    //Styles
    homeButton.style.width = `calc((var(--MenuHeight) * 1.2) + ${homeTitleWidth}`;
    homeButton.style.gridTemplateColumns = "var(--MenuHeight) 0";
    homeTitle.style.display = "block";
    homeTitle.style.visibility = "visible";
    homeTitle.style.width = "100%";
    //Logic
  }
}

function vsHomeButtonCollapsed() {
  //Styles
  homeButton.style.width = "var(--MenuHeight)";
  homeButton.style.gridTemplateColumns = "var(--MenuHeight) 0";
  homeTitle.style.display = "none";
  homeTitle.style.visibility = "visible";
  homeTitle.style.width = "0";
  //Logic
}

function vsSearchBarCollapsed() {
  //Styles
  searchBar.style.width = "var(--MenuHeight)";
  searchBar.style.gridTemplateColumns = "var(--MenuHeight) 0 0";
  searchBarInput.style.cursor = "text";
  searchCloseButton.style.display = "none";
  //Logic
  searchBarInput.blur();
  //Mobile Menu
  setTimeout(() => {
    if (
      window.innerWidth <= 480 &&
      document.activeElement !== bookmarkDropdown
    ) {
      homeButton.style.display = "grid";
      searchBar.style.display = "grid";
      bookmarkBar.style.display = "grid";
      accountButton.style.display = "flex";
    }
  }, 200);
}

function vsSearchBarClicked() {
  //Styles
  searchBar.style.width =
    "calc(var(--MenuHeight) * 2.2 + var(--SearchBarWidth))";
  searchBar.style.gridTemplateColumns =
    "var(--MenuHeight) 1fr var(--MenuHeight)";
  searchBarInput.style.cursor = "text";
  searchCloseButton.style.display = "grid";
  //Logic
  vsHomeButtonCollapsed();
  vsBookmarkBarCollapsed();
  //Mobile Menu
  if (window.innerWidth <= 480) {
    homeButton.style.display = "none";
    bookmarkBar.style.display = "none";
    accountButton.style.display = "none";
  }
}

function vsBookmarkBarCollapsed() {
  //Styles
  bookmarkBar.style.width = "var(--MenuHeight)";
  bookmarkBar.style.gridTemplateColumns = "var(--MenuHeight) 0 0";
  bookmarkDropdown.style.width = "0";
  bookmarkDropdown.style.visibility = "visible";
  bookmarkCloseButton.style.display = "none";

  //Logic
  bookmarkDropdown.blur();
  //Mobile Menu
  setTimeout(() => {
    if (window.innerWidth <= 480 && document.activeElement !== searchBarInput) {
      homeButton.style.display = "grid";
      searchBar.style.display = "grid";
      bookmarkBar.style.display = "grid";
      accountButton.style.display = "flex";
    }
  }, 200);
}

function vsBookmarkBarClicked() {
  //Styles
  bookmarkBar.style.width =
    "calc((var(--MenuHeight) * 2) + var(--SearchBarWidth))";
  bookmarkBar.style.gridTemplateColumns =
    "var(--MenuHeight) 1fr var(--MenuHeight)";
  bookmarkDropdown.style.width = "100%";
  bookmarkDropdown.style.visibility = "visible";
  bookmarkCloseButton.style.display = "grid";
  //Logic
  vsHomeButtonCollapsed();
  vsSearchBarCollapsed();
  //Mobile Menu
  if (window.innerWidth <= 480) {
    homeButton.style.display = "none";
    searchBar.style.display = "none";
    accountButton.style.display = "none";
  }
}

//Establish base states
if (window.scrollY === 0) {
  vsHomeButtonOpen();
  vsSearchBarCollapsed();
  vsBookmarkBarCollapsed();
} else {
  vsHomeButtonCollapsed();
  vsSearchBarCollapsed();
  vsBookmarkBarCollapsed();
}

//Event listeners
//SCROLL
window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    vsHomeButtonCollapsed();
    vsSearchBarCollapsed();
    vsBookmarkBarCollapsed();
  } else {
    vsHomeButtonOpen();
    vsSearchBarCollapsed();
    vsBookmarkBarCollapsed();
  }
});

//SEARCHBAR
searchBar.addEventListener("click", () => {
  searchBarInput.focus();
});

searchBar.addEventListener("mousedown", () => {
  if (searchCloseHover === true) {
    if (window.scrollY > 0) {
      vsSearchBarCollapsed();
    } else {
      vsHomeButtonOpen();
      vsSearchBarCollapsed();
    }
  }
});

searchBar.addEventListener("focusin", () => {
  vsSearchBarClicked();
});

searchBar.addEventListener("focusout", () => {
  setTimeout(vsSearchBarCollapsed, 100);
  setTimeout(() => {
    if (window.scrollY === 0 && bookmarkDropdown !== document.activeElement) {
      vsHomeButtonOpen();
    }
  }, 101);
});

//BOOKMARK BAR
bookmarkBar.addEventListener("click", () => {
  bookmarkDropdown.focus();
});

bookmarkBar.addEventListener("focusin", () => {
  vsBookmarkBarClicked();
  bookmarkCloseButton.focus();
});

bookmarkCloseButton.addEventListener("focus", () => {
  console.log("lost focus");
});

bookmarkBar.addEventListener("focusout", () => {
  setTimeout(vsBookmarkBarCollapsed, 100);
  setTimeout(() => {
    if (window.scrollY === 0 && searchBarInput !== document.activeElement) {
      vsHomeButtonOpen();
    }
  }, 101);
});

bookmarkBar.addEventListener("mousedown", () => {
  if (bookmarkCloseHover === true) {
    if (window.scrollY > 0) {
      vsBookmarkBarCollapsed();
    } else {
      vsHomeButtonOpen();
      vsBookmarkBarCollapsed();
    }
  }
});

//Grid Layout
const windowSmall = window.matchMedia("(max-width: 480px)");

windowSmall.addEventListener("change", () => {
  if (window.innerWidth <= 480) {
    vsHomeButtonCollapsed();
  } else {
    vsHomeButtonOpen();
  }
});
