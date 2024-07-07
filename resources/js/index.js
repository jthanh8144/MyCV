const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const darkTheme = 'dark';
const lightTheme = 'light';

const header = $('.header');
const nav = $('.nav');
const navItems = $$('.sub-nav-item');
const navAbout = $('.sub-nav-item__about');
const themeModeSwitch = $('#nav-switch');
const about = $('#about');
const project = $('#project');
const experience = $('#experience');
const skills = $('#skills');
const photo = $('#photo');
const more = $('#more');
const silverMedal = $('.silver-medal');
const modal = $('.modal');
const btnModalClose = $('.modal-btn-close');
const imgModal = $('.modal-img');
const yearsExp = $('#years-exp');
const nowLabel = $('#now-label');
const photoItems = $$('.photo-item__img');

const photos = [
  $('#photo-1'),
  $('#photo-2'),
  $('#photo-3'),
  $('#photo-4'),
  $('#photo-5'),
  $('#photo-6'),
];

// change active item in nav
function reRenderNavActiveItem(i) {
  let currentActive = $('.sub-nav-item.active');
  currentActive.classList.remove('active');
  navItems[i].classList.add('active');
}

window.onscroll = () => {
  let windowTopLocation = window.scrollY;
  // change nav
  let sticky = about.offsetTop;

  if (windowTopLocation >= sticky) {
    header.classList.add('scroll');
  } else {
    header.classList.remove('scroll');
  }

  // change item active
  const arr = [
    about.offsetTop,
    project.offsetTop,
    experience.offsetTop,
    skills.offsetTop,
    photo.offsetTop,
    more.offsetTop,
  ];
  if (windowTopLocation < arr[0]) {
    reRenderNavActiveItem(0);
  } else if (windowTopLocation > arr[arr.length - 1]) {
    reRenderNavActiveItem(arr.length - 1);
  } else {
    for (let i = 1; i < arr.length - 1; i++) {
      if (
        windowTopLocation + 45 > arr[i] &&
        windowTopLocation + 45 < arr[i + 1]
      ) {
        reRenderNavActiveItem(i);
        break;
      }
    }
  }
};

function scrollToTop(e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    left: 0,
  });
}

// nav about btn click
navAbout.onclick = scrollToTop;

// handle switch theme mode
function getCurrentTheme() {
  let currentSetting = localStorage.getItem('theme');
  if (!currentSetting) {
    const { matches } = window.matchMedia('(prefers-color-scheme: dark)');
    currentSetting = matches ? darkTheme : lightTheme;
  }
  return currentSetting;
}

function setThemeMode(theme) {
  themeModeSwitch.checked = theme === darkTheme;
  document.querySelector('html').setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

themeModeSwitch.onclick = () => {
  const nextTheme = getCurrentTheme() === darkTheme ? lightTheme : darkTheme;
  setThemeMode(nextTheme);
}

// mobile nav
$('.mobile-menu__btn').onclick = () => {
  const showNav = $('.nav.show')
  if (!showNav) {
    nav.classList.add('show');
  } else {
    nav.classList.remove('show');
  }
};

// job typing animation
class TxtType {
  constructor(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  }
  tick() {
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

    if (this.isDeleting) {
      delta /= 2;
    }

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
  }
}

// modal
function showModal(src) {
  modal.classList.add('active');
  imgModal.src = src;
}

function closeModal() {
  modal.classList.remove('active');
}

btnModalClose.onclick = closeModal;
modal.onclick = closeModal;
$('.modal-container').onclick = (e) => {
  e.stopPropagation();
};

// silver medal click
silverMedal.onclick = () => {
  let src = './resources/img/silver.jpg';
  showModal(src);
};

// photo img click
Array.from(photoItems).forEach((photoItem) => {
  photoItem.onclick = () => {
    showModal(photoItem.src);
  };
});

function performTypingAnimation() {
  let elements = document.getElementsByClassName('typewrite');
  for (let i = 0; i < elements.length; i++) {
    let toRotate = elements[i].getAttribute('data-type');
    let period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
}

function calculateFieldRelatedWithTime() {
  const now = new Date();

  const startTime = new Date('2022-06-01');
  const diffYears = Math.floor((now - startTime) / (1000 * 60 * 60 * 24 * 365));
  yearsExp.innerHTML = diffYears;
  
  nowLabel.innerHTML = `<span class="experience-left__text--month">${now.toString().slice(4, 7)}</span> ${now.toString().slice(11, 15)}`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// random image in photo section
function randomPhotos() {
  const numbers = [
    random(0, 5),
    random(0, 4),
    random(0, 6),
    random(0, 4),
    random(0, 3),
    random(0, 3),
  ];
  for (let i = 0; i < photos.length; i++) {
    photos[i].src = `./resources/img/photo-section/${i + 1}/${numbers[i]}.jpg`;
  }
}

window.onload = function () {
  setThemeMode(getCurrentTheme());
  performTypingAnimation();
  calculateFieldRelatedWithTime();
  randomPhotos();
};
