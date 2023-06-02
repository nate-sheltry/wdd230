
const __images = document.querySelectorAll("img[data-src]");

//This function allows us to use an attribute to switch our place holder
//and enables us to remove that attribute, which allows us to do some CSS magic.
function loadImages(image){
    const newSrc = image.getAttribute("data-src");
    //If our targeted item does not have a data-src attribute, escape!
    if(!newSrc){
        return;
    }
    //This is just replacing the placeholder with the new src.
    image.setAttribute("src", newSrc);
    //This is telling us to get rid of the attribute after the image loads.
    image.onload = () => {
        image.removeAttribute("data-src");
    }
}

//Options is defining our view area as we scroll
let options = {
    root: document.querySelector("#scrollArea"),
    rootMargin: "0px",
    //1 means closer to being centered in screen, 0 means the bottom.
    threshold: 0,
};

function callback(entries, imgObserver) {
    //Entry in this case is an instance of our observer detecting something.
    entries.forEach((entry) => {
        //If the image isn't being viewed or isn't viewable, exit out!
        if(!entry.isIntersecting){
            return;
        //If the image is viewable (our entry's target), load the image and stop observing it.
        } else {
        loadImages(entry.target);
        imgObserver.unobserve(entry.target);
        }
    })
}

//This is telling us to call a function, which automatically passes the event causing it, and the
//object which called it. Then options is our viewable scroll area.
const observer = new IntersectionObserver(callback, options);

//Here we are telling our new observer to observe every image on the page
__images.forEach((img) => {
    observer.observe(img);
});