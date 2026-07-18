import fs from 'fs';

let content = fs.readFileSync('resources/js/Pages/Prizes.vue', 'utf8');

// Add animation to the FAQ btn-primary
content = content.replace(
    /\.btn-primary \{([\s\S]*?)transition: all 0\.3s ease; border: none; cursor: pointer; text-align: center;\s*\}/g,
    `.btn-primary {$1transition: all 0.3s ease; border: none; cursor: pointer; text-align: center; animation: epicSinglePulse 8s ease-in-out infinite 2s;\n}`
);

fs.writeFileSync('resources/js/Pages/Prizes.vue', content);
console.log('FAQ Button pulse added.');
