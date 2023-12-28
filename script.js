const sound_button = document.querySelector(".mute");
const audio = document.createElement("audio");
const fullscreen = document.querySelector(".fullscreen");
const video = document.querySelector("video")
audio.src = './bbc_scottish-c_nhu0510409.mp3';

console.log(sound_button)

let count = 1;
sound_button.addEventListener("click", () => {
    count++
    if(count % 2 === 0) {
        sound_button.textContent = 'Pause Audio';
        audio.play();
    } else {
        sound_button.textContent = 'Play Audio';
        audio.pause();
    }
})

fullscreen.addEventListener("click", () => {
    video.parentElement.classList.toggle('video-fullscreen')
})

function type_writer(text_query, speed, timeout) {
    let text = document.querySelector(text_query)
    let original_text = text.textContent;
    text.textContent = '';
    let i = 0;
    let parent = text.parentElement;
    setTimeout(() => {
        let interval_id = setInterval(() => {
            i++
            text.textContent += original_text[i-1];
            if(i === original_text.length) {clearInterval(interval_id)}
        }, speed);
    }, timeout);

    return speed * original_text.length;
}

type_writer('h1', 80, 1000);
type_writer('p', 20, 4000);
type_writer('h2', 80, 8000);

