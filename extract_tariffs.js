const fs = require('fs');

const lines = fs.readFileSync('C:/Users/tisch/.gemini/antigravity-ide/brain/4268fd82-63db-422b-801a-85c15848074e/.system_generated/logs/transcript_full.jsonl', 'utf-8').split('\n');

let latestHtml = null;
let foundHtml = false;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (!line.trim()) continue;
  try {
    const obj = JSON.parse(line);
    
    // Look for tool outputs
    if (obj.source === 'SYSTEM' && obj.type === 'TOOL_RESPONSE' && obj.name === 'view_file' && obj.content && obj.content.includes('Partner.vue')) {
         if (obj.content.includes('<section id="tariffs" class="tariffs-section">')) {
             latestHtml = obj.content;
         }
    }
    
    // What if it was in the output of grep_search or replace_file_content?
    if (obj.source === 'MODEL' && obj.type === 'PLANNER_RESPONSE' && obj.tool_calls) {
        for (const call of obj.tool_calls) {
            if (call.name === 'replace_file_content') {
                if (call.args && call.args.TargetFile && call.args.TargetFile.includes('Partner.vue')) {
                    if (call.args.ReplacementContent && call.args.ReplacementContent.includes('<section id="tariffs"')) {
                        latestHtml = call.args.ReplacementContent;
                    }
                }
            }
        }
    }
  } catch (e) {}
}

if (latestHtml) {
   fs.writeFileSync('found_in_log.txt', latestHtml, 'utf-8');
   console.log('Saved raw matched content to found_in_log.txt');
} else {
   console.log('Not found in transcript');
}
