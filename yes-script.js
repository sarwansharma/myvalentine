window.addEventListener("load", () => {
    const music = document.getElementById("bg-music")
    music.volume = 0.3
    music.play().catch(()=>{})
})
