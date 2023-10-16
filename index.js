// on scroll=====================================
// const experiment = document.querySelector('.window');
// const img = document.querySelector('img');
// window.addEventListener('scroll', () => {
//     let wScroll = this.scrollY;
//     let opacity = (wScroll - experiment.offsetTop + 800) / wScroll;
//     let offset = Math.min(600, wScroll - experiment.offsetTop + window.innerHeight - 200);
//     if(wScroll > experiment.offsetTop - window.innerHeight){
//         img.style.transform = `translateX(-${(offset * .5)}px)`;
//         document.querySelector('p').style.opacity = opacity;
//         document.querySelector('p').style.transform = `translateX(${offset * .5}px)`;
        
//     }
// })


// let observer = new IntersectionObserver(entries => {
//     entries.forEach(entry => {
        
//     })
// }, {
//     threshold: .2,
// });
// observer.observe(experiment);

// preloader========================================================
const preload = document.getElementById('preloader');
const body = document.querySelector('body');

window.addEventListener('load', () => {
    body.removeChild(preload);
    document.querySelector('body').style.overflowY = 'scroll';
});


// setTimeOut=======================================================

let count = 1;
const sliderBg = () => {
    const slider = setInterval(() => {
        document.getElementById('bg' + count).checked = true;
        count++;
        if(count > 3){
            count = 1;
        }
    }, 10000);

    document.querySelectorAll('.manual-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            clearInterval(slider);
            sliderBg();
        })
    })
}
sliderBg();



// navigation========================================================

document.addEventListener('scroll', () => {
    const navi = document.querySelector('nav');
    if(window.scrollY > 0){
        navi.classList.add('scroll-nav');
    }else {
        navi.classList.remove('scroll-nav');
    }
});

// Intersection=======================================================

const pics = document.querySelectorAll('.pic');

let observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        entry.target.classList.toggle('pic-showing', entry.isIntersecting);
        if(entry.isIntersecting) observer.unobserve(entry.target);
    })
}, {
    threshold: .2,
    
});
pics.forEach(pic => {
    observer.observe(pic);
});



const imgs = document.querySelectorAll('.imgs');

let imgObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        entry.target.classList.toggle('showing', entry.isIntersecting);
        if(entry.isIntersecting) imgObserver.unobserve(entry.target);
    });
});

imgs.forEach(img => {
    imgObserver.observe(img);
})

// Form Reservation=========================================================

const forms = document.querySelector('form');
const result = document.querySelector('#reservation-result');
forms.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(forms);
    for(item of formData) {
        console.log(item[0], item[1]);
    }

    fetch('http://httpbin.org/post', {
        method: 'POST',
        body: formData,
    }).then(response => response.json())
    .then(response => console.log(response));

    const paxs = document.querySelectorAll('.reservation');
    paxs.forEach(pax => {
        if(pax.value === ""){
            result.textContent = 'Reservation Incomplete';
            result.style.color = 'red';
            return;
        }else {
            result.textContent = 'Reservation Complete';
            result.style.color = 'white';
            return paxs;
        }
    })
});