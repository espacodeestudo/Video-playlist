import Data from "./video.js";
const Modulo = document.querySelector(".Modulo")
const Playlist = document.querySelector("#Playlist")
const BtnPlay = document.querySelector("#Btn-play")
const BtnNext =document.querySelector("#Btn-next")
const Btnprev = document.querySelector("#Btn-Prev")
const Video = document.querySelector("#Videoplay")
let videoitemActive = null;

let index = 0
let ButtonActive = false


function HandleCategory() {
    Data.forEach(item => {
        const Button = document.createElement("button")
        Button.classList.add(`Btn-Categoy`)
        Button.setAttribute("id", "Btn-Categoy")
        Button.innerHTML = `<h2>${item.category}</h2> <i class='bx bx-chevron-down'></i>`
        Playlist.insertBefore(Button, Playlist.firstChild);
        Button.onclick = () => {
            LoadVideoCategory()}
    });
}

function LoadVideoCategory() {
    const ButtonCategory = document.querySelector("#Btn-Categoy")
    Modulo.innerHTML = ""

    Data.forEach(dataItem => {

        dataItem.playlist.forEach(videoItem => {


            const Container = document.createElement("div");
            const Video = document.createElement("video");
            const H2 = document.createElement("h2")
            H2.textContent = `${videoItem.title}`
            Container.classList.add("video-item")
            Video.setAttribute("src", videoItem.video);
            Container.appendChild(Video);
            Container.appendChild(H2);
            Modulo.appendChild(Container);

            Container.onclick = () => {
              ButtonActive = true
                Handle(videoItem)
                if (videoitemActive) {
                    videoitemActive.classList.remove("video-itemActive")
                }
                Container.classList.add("video-itemActive")
                videoitemActive = Container

            }


        });

        ButtonCategory.onclick = () => {
            if (Modulo.classList.contains("Modulo")) {
                Modulo.className = "Modulo-desative"
            }
            else {
                Modulo.className = "Modulo"
            }
        }

    });


}


BtnPlay.onclick = () =>{
     
    if(Video.paused){
        Video.play()
    }
    else{
        Video.pause()
    }
}



BtnNext.onclick =() =>{
   
    const VideoItem = document.querySelectorAll(".video-item")
    

    if(!ButtonActive){
        
    if(videoitemActive !==  VideoItem[index]){
    
            
                if (videoitemActive) {
                    videoitemActive.classList.remove("video-itemActive")
                }
                VideoItem[index].classList.add("video-itemActive")
                videoitemActive = VideoItem[index]
         
                const NewVideoItem ={
                 video: VideoItem[index].querySelector("video").getAttribute("src"),
                 title: VideoItem[index].querySelector("h2").textContent
                }
                
                Handle(NewVideoItem )
                
            
        }
        if(VideoItem.length > index) index++;
       
      
    }
    else{
        index = 0
        
        Array.from(VideoItem).map((item, ind) =>{
            if( videoitemActive=== VideoItem[ind]){
                console.log(VideoItem.length - 1 >= index)
            if(VideoItem.length - 1 >= index) index = ind + 1;

        }
              return index
        })

        
        if(index){

            if (videoitemActive) {
                videoitemActive.classList.remove("video-itemActive")
            }
            VideoItem[index].classList.add("video-itemActive")
            videoitemActive = VideoItem[index]
     
            const NewVideoItem ={
             video: VideoItem[index].querySelector("video").getAttribute("src"),
             title: VideoItem[index].querySelector("h2").textContent
            }
            
            Handle(NewVideoItem )   
                
        }
       
        else{
            Handle()  
            
        }
        
    }

   
  
    
        
    
}

Btnprev.onclick = () => {
    --index
    const VideoItem = document.querySelectorAll(".video-item")            

    if(ButtonActive){
        HandleNewVideoItem(index)
    }

    else{

        Array.from(VideoItem).map((item, ind) =>{
            if( videoitemActive=== VideoItem[ind]){
               
            if(VideoItem.length - 1 >= index) index = ind - 1;

        }
              return index
        })
        
        HandleNewVideoItem(index)
                
    }
        
    
}


function HandleNewVideoItem(itemidex){
    const VideoItem = document.querySelectorAll(".video-item")
    if (videoitemActive) {
        videoitemActive.classList.remove("video-itemActive")
    }
    VideoItem[itemidex].classList.add("video-itemActive")
    videoitemActive = VideoItem[itemidex]

    const NewVideoItem ={
     video: VideoItem[itemidex].querySelector("video").getAttribute("src"),
     title: VideoItem[itemidex].querySelector("h2").textContent
    }
    
    Handle(NewVideoItem )
}

function Handle(VideoItem) {

   
    const Description = document.querySelector("#Description")
    Video.src = VideoItem ? VideoItem.video : "../Video/girl.mp4"
    Description.textContent =VideoItem ? VideoItem.title : "Introduction"

   
}


HandleCategory()
LoadVideoCategory()