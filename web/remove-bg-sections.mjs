import { removeBackground } from "@imgly/background-removal-node";
import fs from "fs";

async function processImage(inputFile, outputFile) {
    try {
        console.log(`Processing ${inputFile}...`);
        const blob = await removeBackground(inputFile);
        const buffer = Buffer.from(await blob.arrayBuffer());
        fs.writeFileSync(outputFile, buffer);
        console.log(`Saved ${outputFile}`);
    } catch (e) {
        console.error("Error processing", inputFile, e);
    }
}

async function main() {
    await processImage('public/Panther-Rechtsblick.png', 'public/panther-rechtsblick-nobg.png');
    await processImage('public/Panther-Linkssieg.png', 'public/panther-linkssieg-nobg.png');
}

main();
