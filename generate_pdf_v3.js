const puppeteer = require('puppeteer');
const path = require('path');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    
    console.log("Generating Cover PDF...");
    await page.goto(`file://${path.resolve('cover.html')}`, { waitUntil: 'networkidle0' });
    await page.pdf({
        path: 'cover.pdf',
        format: 'A4',
        printBackground: true
    });

    console.log("Generating Map PDF (Landscape)...");
    // Set A3 landscape viewport BEFORE loading the page
    await page.setViewport({ width: 1684, height: 1190, deviceScaleFactor: 2 });
    await page.goto(`file://${path.resolve('index.html')}`, { waitUntil: 'networkidle0', timeout: 60000 });
    await new Promise(r => setTimeout(r, 3000));
    
    await page.pdf({
        path: 'map_only.pdf',
        format: 'A3',
        landscape: true,
        printBackground: true,
        pageRanges: '1'
    });
    
    await browser.close();

    console.log("Merging PDFs...");
    const coverBytes = fs.readFileSync('cover.pdf');
    const mapBytes = fs.readFileSync('map_only.pdf');

    const pdfDoc = await PDFDocument.create();
    
    const coverDoc = await PDFDocument.load(coverBytes);
    const mapDoc = await PDFDocument.load(mapBytes);

    const [coverPage] = await pdfDoc.copyPages(coverDoc, [0]);
    pdfDoc.addPage(coverPage);

    const [mapPage] = await pdfDoc.copyPages(mapDoc, [0]);
    pdfDoc.addPage(mapPage);

    const mergedBytes = await pdfDoc.save();
    fs.writeFileSync('Homework02.pdf', mergedBytes);

    console.log('PDF merged successfully into Homework02.pdf');
})();
