function inViewport(el) {
    var project = el.getBoundingClientRect();
    return (
        (project.top <= 0 && project.bottom >= 0 ) ||
        (project.bottom >= window.innerHeight && project.top <= window.innerHeight) ||
        (project.top >=0 && project.bottom <= window.innerHeight)
    );
}

function pageScroll(){
    var projectItems = document.querySelectorAll(".tab");
    projectItems.forEach(item => inViewport(item) 
    ? item.classList.add('appear') 
    : item.classList.remove('appear'));
    window.requestAnimationFrame(pageScroll);
}

pageScroll();

