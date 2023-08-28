import Data from "./video.js";
const Playlist = document.querySelector("#Playlist")

Data.forEach((item, index) => {
    const Button = document.createElement("button")
    Button.classList.add("Btn-Categoy")
    Button.innerHTML=`<h2>${item.category}</h2> <i class='bx bx-chevron-down'></i>` 

    
    if (index === 0) {
        
        Playlist.insertBefore(Button, Playlist.firstChild);
    } else {
        
        Playlist.appendChild(Button);
    }

    Button.onclick = () => LoadVideoCategory(item.category)
    
});

function LoadVideoCategory(category) {
    const  Modulo = document.querySelector(".Modulo")
    Modulo.innerHTML=""
    Data.forEach(dataItem => {
        if (dataItem.category === category) {
            dataItem.playlist.forEach(videoItem => {
               
                
                    const Container = document.createElement("div");
                    const Video = document.createElement("video");
                    const H2 = document.createElement("h2")
                    H2.textContent = `${videoItem.title}`
                    Container.classList.add("video-item")
                    Video.setAttribute("src", videoItem.video);
                    Container.classList.add("Container-video");
                    Container.appendChild(Video);
                    Container.appendChild(H2);
                    Modulo.appendChild(Container);

                    
                
            });
        }
    });
}
