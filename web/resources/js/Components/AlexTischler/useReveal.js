// Scroll-Reveal für die AlexTischler-Landingpage.
// Nutzung: v-reveal oder v-reveal="{ delay: 150 }" auf beliebigen Elementen.
// Elemente starten unsichtbar/verschoben und blenden beim ersten Eintritt
// in den Viewport weich ein. Respektiert prefers-reduced-motion.

const observed = new WeakMap();

let observer = null;

function getObserver() {
    if (observer) return observer;
    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const delay = observed.get(el)?.delay ?? 0;
                setTimeout(() => el.classList.add('aw-revealed'), delay);
                observer.unobserve(el);
                observed.delete(el);
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    return observer;
}

export const vReveal = {
    mounted(el, binding) {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced || typeof IntersectionObserver === 'undefined') {
            el.classList.add('aw-revealed');
            return;
        }
        el.classList.add('aw-reveal');
        observed.set(el, { delay: binding.value?.delay ?? 0 });
        getObserver().observe(el);
    },
    unmounted(el) {
        if (observed.has(el)) {
            getObserver().unobserve(el);
            observed.delete(el);
        }
    },
};
