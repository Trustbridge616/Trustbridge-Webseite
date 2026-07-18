import fs from 'fs';

let content = fs.readFileSync('resources/js/Pages/Prizes.vue', 'utf8');

// Fix any dangling .btn-primary from previous script
content = content.replace(/<\/style>\s*\.btn-primary \{[\s\S]*?\}\s*/g, '</style>\n');
// Make sure .btn-primary is inside style scoped if not already
if (!content.includes('.btn-primary {')) {
    content = content.replace(
        /<\/style>/,
        `.btn-primary {
  display: inline-block; padding: 1rem 2.5rem; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 1.1rem;
  background: linear-gradient(135deg, #F0CF5A, #b8860b); color: #000; box-shadow: 0 10px 20px rgba(240,207,90,0.3); transition: all 0.3s ease; border: none; cursor: pointer; text-align: center;
}
.btn-primary:hover { box-shadow: 0 15px 30px rgba(240,207,90,0.5); transform: translateY(-3px); }
</style>`
    );
}

// 1. faq-item Closed State
content = content.replace(
    /\.faq-item \{ \s*background: rgba\(42, 25, 68, 0\.4\); \s*border: 1px solid rgba\(255,255,255,0\.08\); \s*border-radius: 16px; margin-bottom: 1rem; overflow: hidden; transition: all 0\.4s ease; \s*backdrop-filter: blur\(10px\);\s*\}/g,
    `.faq-item { 
  background: rgba(26, 15, 46, 0.5); 
  border: 1px solid rgba(255,255,255,0.06); 
  border-radius: 16px; margin-bottom: 1rem; overflow: hidden; 
  transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); 
  backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  position: relative;
}`
);

// Hover
content = content.replace(
    /\.faq-item:hover \{ background: rgba\(255,255,255,0\.05\); border-color: rgba\(255,255,255,0\.1\); \}/g,
    `.faq-item:hover { background: rgba(35, 20, 60, 0.6); border-color: rgba(255,255,255,0.15); box-shadow: 0 8px 25px rgba(0,0,0,0.4); }`
);

// 2. faq-item Open State
content = content.replace(
    /\.faq-item\.open \{ \s*background: rgba\(52, 31, 86, 0\.85\); \s*border-color: rgba\(240,207,90,0\.5\); \s*box-shadow: 0 15px 40px rgba\(0,0,0,0\.5\), inset 0 0 20px rgba\(240,207,90,0\.1\); \s*\}/g,
    `.faq-item.open { 
  background: rgba(45, 25, 75, 0.85); 
  border-color: rgba(142, 245, 210, 0.4); 
  box-shadow: 0 25px 50px rgba(0,0,0,0.6), inset 0 0 30px rgba(142, 245, 210, 0.1); 
  transform: translateY(-4px);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  z-index: 5;
}`
);

// 3. Question text and Chevron
content = content.replace(
    /\.faq-q \{ width: 100%; padding: 1\.5rem; background: none; border: none; color: #F7F1FF; font-size: 1\.15rem; font-weight: 700; text-align: left; display: flex; justify-content: space-between; align-items: center; cursor: pointer; font-family: inherit; \}/g,
    `.faq-q { width: 100%; padding: 1.5rem; background: none; border: none; color: #F7F1FF; font-size: 1.15rem; font-weight: 700; text-align: left; display: flex; justify-content: space-between; align-items: center; cursor: pointer; font-family: inherit; transition: color 0.4s ease, text-shadow 0.4s ease; }
.faq-item.open .faq-q { text-shadow: 0 0 10px rgba(255,255,255,0.3); }`
);

content = content.replace(
    /\.faq-chev \{ color: rgba\(255,255,255,0\.4\); transition: transform 0\.3s ease; \}/g,
    `.faq-chev { color: rgba(255,255,255,0.4); transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), color 0.5s ease; }`
);

content = content.replace(
    /\.faq-item\.open \.faq-chev \{ transform: rotate\(180deg\); color: #F0CF5A; \}/g,
    `.faq-item.open .faq-chev { transform: rotate(180deg); color: #8EF5D2; filter: drop-shadow(0 0 8px rgba(142,245,210,0.5)); }`
);

// 4. Answer text slide up animation
content = content.replace(
    /\.faq-a-wrap \{ display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0\.3s ease; \}/g,
    `.faq-a-wrap { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); }`
);

content = content.replace(
    /\.faq-a p \{[\s\S]*?\}/g,
    `.faq-a p {
  padding: 0 1.5rem 1.5rem; margin: 0; color: #F7F1FF;
  line-height: 1.7; font-size: 1.05rem; opacity: 0; transform: translateY(15px); transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); transition-delay: 0s; font-weight: 400;
}
.faq-item.open .faq-a p { opacity: 0.95; transform: translateY(0); transition-delay: 0.15s; }`
);

// 5. Optional spotlight background effect for the active item
content = content.replace(
    /\.faq-item\.open \{/g,
    `.faq-item::before {
  content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background: radial-gradient(circle at 50% 10%, rgba(142,245,210,0.08) 0%, transparent 60%);
  opacity: 0; transition: opacity 0.5s ease; pointer-events: none;
}
.faq-item.open::before { opacity: 1; }
.faq-item.open {`
);

fs.writeFileSync('resources/js/Pages/Prizes.vue', content);
console.log('FAQ Refined to premium frosted glass look.');
