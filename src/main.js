import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const lenis = new Lenis({
    smoothWheel: true
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

lenis.on('scroll', ScrollTrigger.update)

const cta = document.getElementById('cta')

function updateCTA() {
    if (!cta) return

    const vv = window.visualViewport

    if (!vv) return

    const top =
        vv.offsetTop +
        vv.height -
        cta.offsetHeight -
        16

    gsap.to(cta, {
        top,
        duration: 0.15,
        overwrite: true
    })
}

updateCTA()

window.visualViewport?.addEventListener(
    'resize',
    updateCTA
)

window.visualViewport?.addEventListener(
    'scroll',
    updateCTA
)

lenis.on('scroll', updateCTA)

const theme =
    document.querySelector(
        'meta[name="theme-color"]'
    )

ScrollTrigger.create({
    trigger: '.dark',
    start: 'top center',

    onEnter: () => {
        theme.setAttribute(
            'content',
            '#000000'
        )
    },

    onLeaveBack: () => {
        theme.setAttribute(
            'content',
            '#ffffff'
        )
    }
})