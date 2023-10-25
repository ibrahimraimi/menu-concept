import gsap from "gsap";
import { TextPlugin } from "gsap/all";

gsap.registerPlugin(TextPlugin);

const menu = document.querySelector(".menu"),
  menu_wrapper = menu.children[0],
  menu_frame = menu_wrapper.children[0],
  menu_subframe = menu_wrapper.children[1],
  menu_overlay = menu.children[1];

const wrapper_element = menu.querySelectorAll(".menu__pages__links .ofh a"),
  wrapper_pages = menu.querySelectorAll(".menu__pages__title > p"),
  frame_element = menu_subframe.querySelectorAll(".ofh > div");

const nav = document.querySelector(".nav"),
  nav_menu = nav.querySelector(".nav__menu"),
  nav_menu_text = nav.querySelector(".nav_menu > span");

let is_enabled = false;

const toggle = (action) => {
  !action ? open() : close();
};

const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } });
const tl_button = gsap.timeline({
  paused: true,
  defaults: { ease: "expo.out" },
});

const animate_menu = () => {
  gsap.set(menu, { pointerEvents: "inherit" });

  tl.from(
    [menu_frame, menu_subframe],
    {
      duration: 0.8,
      y: "-101%",
      stagger: 0.02,
    },
    0
  )
    .from(
      [wrapper_element, wrapper_pages, frame_element],
      {
        duration: 0.7,
        y: "-100%",
        stagger: {
          each: 0.016,
          from: "bottom",
        },
      },
      0.2
    )
    .from(
      menu_overlay,
      {
        duration: 0.8,
        autoAlpha: 0,
        ease: "power4.out",
      },
      0
    );
};

const animate_button = () => {
  tl_button
    .to(nav_menu_text, {
      duration: 0.8,
      autoAlpha: 0,
    })
    .to(nav_menu_text, {
      duration: 0.8,
      autoAlpha: 1,
    })
    .to(
      nav_menu_text,
      {
        duration: 0.5,
        text: {
          value: "Close",
          delimiter: " ",
          speed: 1,
        },
      },
      0.32
    );
};

const open = () => {
  if (tl) tl.play();
  if (tl_button) tl_button.play();
  is_enabled = true;

  menu.computedStyleMap.pointerEvents = "inherit";
};

const close = () => {
  if (tl) tl.reverse();
  if (tl_button) tl_button.reverse();
  is_enabled = false;

  menu.style.pointerEvents = "inherit";
};

const add_event_listeners = () => {
  nav_menu.onclick = () => toggle(is_enabled);
  menu_overlay.onclick = () => close();
};

window.onload = () => {
  animate_menu();
  animate_button();

  add_event_listeners();
};
