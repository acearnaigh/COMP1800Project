//Shows how to load Skeleton (navbar, hamburger menu and sticky footer into
//a html document. In this case: createPost.html


console.log($("#navbarPlaceholder").load("nav.xml"));
console.log($("#hamPlaceholder").load("hamburger.html"));
console.log($("#footerPlaceholder").load("footer.html"));