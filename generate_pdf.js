const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    // Load the HTML file
    const filePath = `file://${path.resolve('index.html')}`;
    await page.goto(filePath, { waitUntil: 'domcontentloaded', timeout: 60000 });
    
    // Wait an extra 3 seconds for fonts/icons to render
    await new Promise(r => setTimeout(r, 3000));
    
    // Hide the cover page to only print the second page (map and footer)
    await page.evaluate(() => {
        const cover = document.querySelector('.cover-page');
        if (cover) cover.style.display = 'none';
        
        // Remove margin/padding from body to prevent extra space
        document.body.style.margin = '0';
        document.body.style.padding = '0';
    });

    // Get the exact dimensions of the remaining content
    const dimensions = await page.evaluate(() => {
        const map = document.querySelector('.map-section');
        const footer = document.querySelector('.apa-footer');
        return {
            width: Math.max(map.scrollWidth, footer.scrollWidth, document.documentElement.clientWidth),
            height: map.scrollHeight + footer.scrollHeight
        };
    });

    // Set viewport to the calculated dimensions to render correctly
    await page.setViewport({
        width: Math.ceil(dimensions.width) || 1200,
        height: Math.ceil(dimensions.height) || 2000,
        deviceScaleFactor: 2 // High resolution
    });

    // Generate PDF with the exact size of the content
    await page.pdf({
        path: 'Mapa_Conceptual.pdf',
        width: `${Math.ceil(dimensions.width) || 1200}px`,
        height: `${Math.ceil(dimensions.height) + 50}px`,
        printBackground: true,
        pageRanges: '1'
    });

    await browser.close();
    console.log('PDF generado exitosamente como Mapa_Conceptual.pdf');
})();
