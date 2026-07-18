import fs from 'fs';

const vueCode = fs.readFileSync('c:/Users/tisch/OneDrive/Desktop/TrustboxRoyale/web/resources/js/Pages/Partner.vue', 'utf8');

// Extract template
let templateMatch = vueCode.match(/<template>([\s\S]*?)<\/template>/);
let templateCode = templateMatch ? templateMatch[1] : '';

// Remove <AppLayout>
templateCode = templateCode.replace(/<AppLayout>/g, '').replace(/<\/AppLayout>/g, '');
// Replace Vue click handlers
templateCode = templateCode.replace(/@click\.prevent="([^"]+)"/g, 'onclick="event.preventDefault(); $1()"');
// Replace Link components with standard anchor tags if any
templateCode = templateCode.replace(/<Link href="([^"]+)"/g, '<a href="$1"').replace(/<\/Link>/g, '</a>');

// Replace relative image paths with absolute placeholder paths or leave them relative
// Assuming images are in the same folder or a local 'public' folder. 

// Extract styles
let styleMatch = vueCode.match(/<style scoped>([\s\S]*?)<\/style>/);
let styleCode = styleMatch ? styleMatch[1] : '';

// Add base styles that are normally inherited from app.css
const baseStyles = `
body, html {
  margin: 0;
  padding: 0;
  font-family: 'Century Gothic', system-ui, sans-serif;
  background-color: #0F0514; /* Der dunkle Hintergrund für den Header */
  color: #333;
  overflow-x: hidden;
}
* {
  box-sizing: border-box;
}
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
a {
  text-decoration: none;
}
`;

const htmlFile = `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TrustBox Partner - Standalone</title>
    <style>
${baseStyles}
${styleCode}
    </style>
</head>
<body style="background: #fff;"> <!-- Body wird im hellen Bereich weiß, der dunkle Container liegt drüber -->
${templateCode}

<script>
function scrollToTariffs() {
    const el = document.getElementById('tariffs');
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
</script>
</body>
</html>`;

fs.writeFileSync('c:/Users/tisch/OneDrive/Desktop/Trustbox_Partner_Landingpage.html', htmlFile);
console.log('Exported successfully to Desktop!');
