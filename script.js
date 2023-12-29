function controls() {
    const sound_buttons = document.querySelectorAll(".mute");
    const audio = document.createElement("audio");
    const fullscreens = document.querySelectorAll(".fullscreen");
    audio.src = './bbc_scottish-c_nhu0510409.mp3';

    sound_buttons.forEach(sound_button => {
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
    })
    fullscreens.forEach(fullscreen => {
        let parent = fullscreen.parentElement;
        fullscreen.addEventListener("click", () => {
            parent.classList.toggle('video-fullscreen');
            if(parent.classList.contains('video-fullscreen')) {
                console.log('entering fullscreen')
                parent.requestFullscreen();
            } else {
                console.log('exiting fullscreen')
                document.exitFullscreen();
            }
        })
    })
}

function type_writer(text_query, speed, timeout) {
    let texts = document.querySelectorAll(text_query);
    texts.forEach(text => {
        let original_text = text.textContent;
        text.textContent = '';
        let i = 0;
        setTimeout(() => {
            let interval_id = setInterval(() => {
                i++
                text.textContent += original_text[i-1];
                if(i === original_text.length) {clearInterval(interval_id)}
            }, speed);
        }, timeout);
    })
}

function anims() {
    type_writer('.heading', 80, 1000);
    type_writer('p.par', 20, 4000);
    type_writer('p.send-off', 20, 6000);
    type_writer('h2', 80, 8000);
}

function create_element(type, class_name) {
    const element = document.createElement(type);
    element.classList.add(class_name);

    return element;
}

function append_children(parent, child_arr) {
    child_arr.forEach(child => {
        parent.appendChild(child)
    })
}

async function fetch_data(file_path) {
    try {
      const response = await fetch(file_path);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching JSON:', error);
      throw error; // Propagate the error to the calling code if needed
    }
}

function create_card(recipient, letter, random_string) {
    const letters_container = document.querySelector(".letters-container");

    const container = create_element("div", "card");
    container.setAttribute("id", random_string)

    const video_container = create_element("div", "video-container");

    const video = create_element("video", "video");
    video.setAttribute("muted", "true");
    video.setAttribute("loop", "true");

    video.src = './pexels_videos_1437396 (2160p).mp4';

    const play_video = create_element("button", "play-button");
    const play_img = create_element("img", "play-image");
    play_img.src = './play-button.png';

    play_video.addEventListener("click", () => {video.play(); play_video.remove();})

    const mute = create_element("button", "mute");
    mute.textContent = 'Play Audio';

    const fullscreen_container = create_element("button", "fullscreen");

    const fullscreen_svg = create_element("svg", "fullscreen-svg");
    fullscreen_svg.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="none" stroke="white" stroke-width="1.5" d="M18.25 10V5.75H14M18.25 14v4.25H14m-4 0H5.75V14m0-4V5.75H10"></path>
    </svg>
    `

    const letter_container = create_element("div", "letter");

    const heading = create_element("h1", "heading");
    heading.textContent = `Dear  ${recipient},`;

    const paragraph = create_element("p", "par");
    paragraph.textContent = letter;
    
    const send_off = create_element("p", "send-off");
    send_off.textContent = 'Wishing you a Merry Christmas and a Happy New Year!';

    const subheading = create_element("h2", "subheading");
    subheading.textContent = 'Love from Blake';
    
    play_video.appendChild(play_img)

    fullscreen_container.appendChild(fullscreen_svg);
    append_children(video_container, [video, mute, fullscreen_container, play_video])
    container.appendChild(video_container);

    append_children(letter_container, [heading, paragraph, send_off, subheading])
    container.appendChild(letter_container);

    letters_container.appendChild(container);
}

function highlight_target_element() {
    // Get the hash value from the URL
    var hash = window.location.hash.substr(1);

    // Remove the highlighting from all elements
    var allDivs = document.querySelectorAll("div");
    allDivs.forEach(function(div) {
        div.classList.remove("highlight");
    });

    // Highlight the targeted element
    var targetElement = document.getElementById(hash);
    if (targetElement) {
        targetElement.classList.add("highlight");
    }

    return targetElement;
}

fetch_data('cards.json')
.then(data => {
    const letters = Array.from(data);
    letters.forEach(letter_data => {
        create_card(letter_data.name, letter_data.letter, letter_data.random_string);
    })
})
.catch(error => {console.error('Error in fetch_data:', error);});

setTimeout(() => {
    anims();
    controls();

    highlight_target_element();
    const other_els = document.querySelectorAll('.card:not(.highlight)')
    other_els.forEach(el => {el.style.display = 'none'})
}, 2000);

// IxUrsjNZVZ
// ghqNJLupmb
// wGbrzMWJyv
// FBNjsmYvFI
// cepSJypXKW
// YvaGhHyPpA
// ehuwAjSgQX
// cMldcVyBSU
// xuZHMhKbrp
// RWEDudpKlt






