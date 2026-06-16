import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {CustomEase} from "gsap/CustomEase";

let registered = false;

if (!registered) {
    registered = true;
    gsap.registerPlugin(ScrollTrigger, CustomEase);
    gsap.config({nullTargetWarn: false});

    CustomEase.create("expo", "0.19, 1, 0.22, 1");
    CustomEase.create("expoOut", "0.16, 1, 0.3, 1");
    CustomEase.create("smooth", "0.22, 1, 0.36, 1");
}

export {gsap, ScrollTrigger, CustomEase};
