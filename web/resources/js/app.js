
import '../css/app.css';

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Retouren Abo';

createInertiaApp({
    /* Kein automatisches "- Trustbridge" mehr: SeoHead liefert bereits
       vollstaendige Titel mit Markennamen, das Suffix stapelte sich zu
       "... | Trustbridge - Trustbridge". Der Fallback greift nur, wenn
       eine Seite gar keinen Titel setzt. */
    title: (title) => title || appName,
    resolve: (name) => {
        return resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue'));
    },
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
