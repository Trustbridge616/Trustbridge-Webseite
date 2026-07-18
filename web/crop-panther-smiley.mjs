import { Jimp } from "jimp";
import { removeBackground } from "@imgly/background-removal-node";
import fs from "fs";

async function main() {
    const inputFile = 'public/panther smiley nachdenklich.png';
    const croppedFile = 'public/panther-nachdenklich-cropped.png';
    const outputFile = 'public/panther-nachdenklich-nobg.png';

    const img = await Jimp.read(inputFile);
    const w = img.bitmap.width;
    const h = img.bitmap.height;
    console.log(`Original: ${w}x${h}px`);

    // Der Panther sitzt ganz unten im Bild — crop auf untere 38%
    const cropTop    = Math.round(h * 0.62);
    const cropHeight = Math.round(h * 0.38);
    const cropLeft   = Math.round(w * 0.05);
    const cropWidth  = Math.round(w * 0.90);

    const cropped = img.clone().crop({ x: cropLeft, y: cropTop, w: cropWidth, h: cropHeight });
    await cropped.write(croppedFile);
    console.log(`Gecroppt → ${croppedFile} (${cropWidth}x${cropHeight})`);

    // Hintergrund entfernen
    console.log('Hintergrund entfernen...');
    const blob = await removeBackground(croppedFile);
    const buffer = Buffer.from(await blob.arrayBuffer());
    fs.writeFileSync(outputFile, buffer);
    console.log(`✅ Fertig → ${outputFile}`);
}

main().catch(console.error);
