const slides = [
    {file: null, 
    description: `
        The video that was meant to show here has not been rendered yet. 
        In 3D Design, rendering is the process of calculating the colour of each pixel
        based on a series of complex light bounces. Unfortunately, for a project this huge
        (with over 17,000,000 triangles!), it will take a considerable amount of time to complete
        (I'm talking 6 days). You will be notified by Blake once the rendering has processed and you can
        watch the infinite theatre in all its glory! Click on the arrows to view the rendered stills from the scene.
    `
    },
    {file: './slideshow-images/real/1.png', 
    description: `
        Main view of the Theatre
    `
    },
    {file: './slideshow-images/real/2.png', 
    description: `
        Point of View: Row K, seat 15
    `
    },
    {file: './slideshow-images/real/3.png', 
    description: `
        Closeup of the Nutcrackers as they enjoy 
        their premium seating in the box, both standing 12 feet tall!
    `
    },
    {file: './slideshow-images/real/4.png', 
    description: `
        Point of View: Second box on the right of the theatre
    `
    }
]

let slide = 0;

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
                parent.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        })
    })
}

function add_description(slide, image_container, image_description) {
    if(slide.file == undefined) {
        image_container.style.background = 'rgba(255, 255, 255, 0.2)';
        image_description.classList.add('center-text');
    } else {
        image_container.style.backgroundImage = `url(${slide.file})`
    }
    image_description.textContent = slide.description;
}

function create_carousel(slides_arr, slides_container) {
    for(let i = 0; i<2; i++) { 
        slides_arr.forEach(slide => {
            const slide_container = create_element("div", "slide");
            
            const image_container = create_element("div", "image-container");
            const image_description = create_element("span", "image-description");
            
            add_description(slide, image_container, image_description)

            append_children(slide_container, [image_container, image_description])
            slides_container.appendChild(slide_container)

            if(is_landscape() === false && i === 0) {
                if(max_width(700)) {
                    image_description.textContent = 'Please turn your phone to landscape mode to view the slideshow';
                    let buttons;
                    setTimeout(() => {
                        buttons = document.querySelector('.carousel-controls');
                        buttons.style.opacity = '0';
                        window.addEventListener("orientationchange", () => {
                            auto_widths(['.heading', 'p.par', 'p.send-off', 'h2']);
                            buttons.style.opacity = '1';
                            add_description(slide, image_container, image_description)
                        })
                    }, 2000);
                }
            }   
    })}    

    slides_container.style.width = `${slides_arr.length * 200}%`
}

function fix_widths(el_arr) {
    el_arr.forEach(el_query => {
        const els = document.querySelectorAll(el_query);
        els.forEach(el => {
            el.style.width = el.offsetWidth + 'px'
        })
    })
}

function auto_widths(el_arr) {
    el_arr.forEach(el_query => {
        const els = document.querySelectorAll(el_query);
        els.forEach(el => {
            el.style.width = 'auto'
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
    fix_widths(['.heading', 'p.par', 'p.send-off', 'h2'])
    type_writer('.heading', 80, 1000);
    type_writer('p.par', 20, 4000);
    type_writer('p.send-off', 20, 6000);
    type_writer('h2', 80, 8000);
    setTimeout(() => {
        if(max_width(700)) {
            auto_widths(['.heading', 'p.par', 'p.send-off', 'h2'])
        }
    }, 9000);
}

function max_width(width) {
    return width > document.body.offsetWidth;
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

    const slide_container = create_element("div", "slides-container");

    const slide_wrapper = create_element("div", "slides-wrapper")

    create_carousel(slides, slide_container)
    
    const letter_container = create_element("div", "letter");

    const heading = create_element("h1", "heading");
    heading.textContent = `Dear  ${recipient},`;

    const paragraph = create_element("p", "par");
    paragraph.textContent = letter;
    
    const send_off = create_element("p", "send-off");
    send_off.textContent = 'Wishing you a Merry Christmas and a Happy New Year!';

    const subheading = create_element("h2", "subheading");
    subheading.textContent = 'Love from Blake';
    
    // const video_container = create_video('./pexels_videos_1437396 (2160p).mp4');
    // slide_container.appendChild(video_container);

    const back_button = create_element("img", "back-btn");
    back_button.src = './backwards.png';

    const forward_button = create_element("img", "forward-btn");
    forward_button.src = './forwards.png';

    const controls = create_element("div", "carousel-controls");

    append_children(controls, [back_button, forward_button])

    append_children(slide_wrapper, [slide_container, controls])
    container.appendChild(slide_wrapper);

    append_children(letter_container, [heading, paragraph, send_off, subheading]);
    container.appendChild(letter_container);

    letters_container.appendChild(container);

    // controls logic
    setTimeout(() => {
        if(screen.orientation.type === 'landscape-primary') {
            console.log('landscape')
            const transform_el =  document.querySelector('.slides-container');
            let slide_percentage = transform_el.offsetWidth / (slides.length) / 2;

            back_button.addEventListener("click", () => {
                slide--; 
                if(slide < 0) {slide = slides.length - 1}
                transform_el.style.transform = `translateX(${-slide_percentage * slide}px)`;
            });
            forward_button.addEventListener("click", () => {
                slide++; 
                if(slide > slides.length - 1) {slide = 0}
                transform_el.style.transform = `translateX(${-slide_percentage * slide}px)`;
            });
        } else {
        window.addEventListener("orientationchange", () => {
            console.log('landscape')
            setTimeout(() => {
                const transform_el =  document.querySelector('.slides-container');
                let slide_percentage = transform_el.offsetWidth / (slides.length) / 2;

                back_button.addEventListener("click", () => {
                    slide--; 
                    if(slide < 0) {slide = slides.length - 1}
                    transform_el.style.transform = `translateX(${-slide_percentage * slide}px)`;
                });
                forward_button.addEventListener("click", () => {
                    slide++; 
                    if(slide > slides.length - 1) {slide = 0}
                    transform_el.style.transform = `translateX(${-slide_percentage * slide}px)`;
                });
            }, 300);
        })
        }
    }, 200);    
}

function create_video(src) {
    const video_container = create_element("div", "video-container");

    const video = create_element("video", "video");
    video.setAttribute("muted", "true");
    video.setAttribute("loop", "true");

    video.src = src;

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
    play_video.appendChild(play_img)
    fullscreen_container.appendChild(fullscreen_svg);
    append_children(video_container, [video, mute, fullscreen_container, play_video]);

    return video_container;
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

function is_landscape() {
    const client_width = document.body.offsetWidth;
    const client_height = document.body.offsetHeight;
    return client_width > client_height;
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
    const loading = document.querySelector('.loading');
    loading.remove();
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






