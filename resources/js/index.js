const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let navbar = $('.header');
let navItems = $$('.nav-item');
let navAbout = $('.nav-item__about');
let about = $('#about');
let project = $('#project');
let experience = $('#experience');
let skills = $('#skills');
let photo = $('#photo');
let more = $('#more');
let silverMedal = $('.silver-medal');
let modal = $('.modal');
let btnModalClose = $('.modal-btn-close');
let imgModal = $('.modal-img');
let photoItems = $$('.photo-item__img');

function reRenderNavActiveItem(i) {
    let currentActive = $('.nav-item.active');
    currentActive.classList.remove('active');
    navItems[i].classList.add('active');
}

window.onscroll = () => {
    let windowTopLocation = window.pageYOffset;
    // change nav
    let sticky = about.offsetTop;

    if (windowTopLocation >= sticky) {
        navbar.classList.add('scroll');
    } else {
        navbar.classList.remove('scroll');
    }

    // change item active
    const arr = [about.offsetTop, project.offsetTop, experience.offsetTop, skills.offsetTop, photo.offsetTop, more.offsetTop];
    if (windowTopLocation < arr[0]) {
        reRenderNavActiveItem(1);
    } else if (windowTopLocation > arr[arr.length - 1]) {
        reRenderNavActiveItem(arr.length);
    }
    else {
        for (let i = 0; i < arr.length - 1; i++) {
            if (windowTopLocation + 45 > arr[i] && windowTopLocation + 45 < arr[i + 1]) {
                reRenderNavActiveItem(i + 1);
                break;
            }
        }
    }
}

function scrollToTop(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        left: 0,
    });
}

// nav about btn click
navAbout.onclick = (e) => {
    scrollToTop(e);
};

function showModal(src) {
    modal.classList.add('active');
    imgModal.src = src;
}

// silver medal click
silverMedal.onclick = () => {
    let src = './resources/img/silver.jpg';
    showModal(src);
}

// close modal
function removeClass() {
    modal.classList.remove('active');
}

btnModalClose.onclick = removeClass;
modal.onclick = removeClass;
$(".modal-container").onclick = (e) => {
    e.stopPropagation();
}

// photo img click
Array.from(photoItems).forEach(photoItem => {
    photoItem.onclick = () => {
        showModal(photoItem.src);
    }
});

// mobile nav
$('.mobile-menu__btn').onclick = () => {
    let isClose = navbar.clientHeight === 54;
    if (isClose) {
        navbar.style.height = 'auto';
        $('.nav-item:nth-child(2)').style.borderTop = '1px solid let(--text-color)';
        navbar.classList.add('scroll');
    } else {
        navbar.style.height = null;
        $('.nav-item:nth-child(2)').style.borderTop = null;
        navbar.classList.remove('scroll');
    }
}

// job animation
let TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    let i = this.loopNum % this.toRotate.length;
    let fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    let that = this;
    let delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    let elements = document.getElementsByClassName('typewrite');
    for (let i = 0; i < elements.length; i++) {
        let toRotate = elements[i].getAttribute('data-type');
        let period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    let css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #333}";
    document.body.appendChild(css);
};