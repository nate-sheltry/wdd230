
const __images = document.querySelectorAll("img[data-src]");

function loadImages(image){
    const newSrc = image.getAttribute("data-src");
    if(!newSrc){
        return;
    }
    image.setAttribute("src", newSrc);
    image.onload = () => {
        image.removeAttribute("data-src");
    }
}

let options = {
    root: document.querySelector("#scrollArea"),
    rootMargin: "0px",
    //1 means closer to being centered in screen, 0 means the bottom.
    threshold: 0,
};

function callback(entries, imgObserver) {
    entries.forEach((entry) => {
        //If the image isn't being viewed or isn't viewable, exit out!
        if(!entry.isIntersecting){
            return;
        //If the image is viewable, load the image and stop observing it.
        } else {
        loadImages(entry.target);
        imgObserver.unobserve(entry.target);
        }
    })
}

const observer = new IntersectionObserver(callback, options);

__images.forEach((img) => {
    observer.observe(img);
});