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
    await processImage('public/Panther_muenzelegacy.png', 'public/panther-muenze-legacy-nobg.png');
    await processImage('public/Panther_muenzeohneabo.png', 'public/panther-muenze-ohneabo-nobg.png');
}

main();
