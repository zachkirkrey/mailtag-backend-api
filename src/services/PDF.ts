import puppeteer from 'puppeteer';
import CONFIG from '@/config';

const generator = async (html, pdfName?) => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: CONFIG.CHROME_EXECUTABLE_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  await page.setContent(html, {
    waitUntil: 'networkidle0',
  });

  if (pdfName) {
    await page.pdf({
      format: 'a4',
      path: `${__dirname}/${pdfName}.pdf`,
    });
    await browser.close();
    return;
  }

  const pdfBuffer = await page.pdf({
    format: 'a4',
  });

  await browser.close();
  return pdfBuffer;
};

export default generator;
