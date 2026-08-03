import { ref, onMounted, onBeforeUnmount } from 'vue';

// Animierter Zähler: zählt von 0 auf `target`, sobald `elRef` sichtbar wird.
// Gibt eine formatierte Ref zurück (de-DE, optional mit Suffix wie "+" oder "%").
export function useCountUp(elRef, target, { duration = 1800, suffix = '', decimals = 0 } = {}) {
    const display = ref('0' + suffix);
    let raf = null;
    let io = null;

    const run = () => {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced) {
            display.value = format(target);
            return;
        }
        const start = performance.now();
        const tick = (now) => {
            const p = Math.min(1, (now - start) / duration);
            // easeOutExpo — schnelles Anlaufen, weiches Ausrollen
            const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
            display.value = format(target * eased);
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
    };

    const format = (val) =>
        Number(val).toLocaleString('de-DE', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        }) + suffix;

    onMounted(() => {
        if (!elRef.value || typeof IntersectionObserver === 'undefined') {
            display.value = format(target);
            return;
        }
        io = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    run();
                    io.disconnect();
                    io = null;
                }
            },
            { threshold: 0.4 }
        );
        io.observe(elRef.value);
    });

    onBeforeUnmount(() => {
        if (raf) cancelAnimationFrame(raf);
        if (io) io.disconnect();
    });

    return display;
}
