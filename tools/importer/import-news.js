/* global WebImporter */
import {
  createMetadata,
  fetchAndParseDocument,
  blockSeparator,
  getMobileBgBlock,
  getDesktopBgBlock,
  buildSectionMetadata, getImportPagePath, fixPdfLinks, setPageTitle,
} from './utils.js';

function getBackgroundUrl(element) {
  if (!element || !element.style) {
    return null; // Return null if the element is invalid or doesn't have a style property
  }

  const backgroundStyle = element.style.background;
  const urlMatch = backgroundStyle.match(/url\(['"]?(.*?)['"]?\)/);

  // If a match is found, return the URL; otherwise, return null
  return urlMatch ? urlMatch[1] : null;
}

const extractPageInfo = async (url, href, results) => {
  const doc = await fetchAndParseDocument(url);
  const page = href.split('/').pop();
  if (doc) {
    const { body } = doc;
    const a = body.querySelector(`a[href="${page}"]`);
    const container = a.closest('.news');

    const bannerEl = container.querySelector('.news-banner');
    const backgroundImageUrl = getBackgroundUrl(bannerEl);
    let bannerUrl;
    if (backgroundImageUrl) {
      const u = new URL(backgroundImageUrl, 'https://webfiles.clarkcountynv.gov');
      const newPath = WebImporter.FileUtils.sanitizePath(`/assets/images/news/${u.pathname.split('/').pop()}`);
      bannerUrl = newPath;
      results.push({
        path: newPath,
        from: u.toString(),
      });
    }
    const publishDateEl = container.querySelector('.news-date');
    const categoryEl = publishDateEl.querySelector('span.news-category');
    let category;
    if (categoryEl) {
      category = categoryEl.textContent.trim();
      categoryEl.remove();
    }
    const publishDate = publishDateEl.textContent.replace(/-\s+/g, '').trim();
    const brief = container.querySelector('.news-brief').textContent.trim();

    return {
      bannerUrl,
      category,
      publishDate,
      brief,
    };
  }
  return {};
};

export default {

  transform: async ({
    // eslint-disable-next-line no-unused-vars
    document, url, html, params,
  }) => {
    const main = document.body;
    const results = [];

    // use helper method to remove header, footer, etc.
    WebImporter.DOMUtils.remove(main, [
      'header',
      'footer',
      'section', // hero background image
      'noscript',
      '#main',
      '#skip', // skip to main content
      '.modal', // share button modal
      '#goog-gt-tt', // google translation
      '.uwy.userway_p5.utb',
    ]);

    const newPagePath = getImportPagePath(params.originalURL);

    // Handle all PDFs
    fixPdfLinks(main, results, 'news');

    setPageTitle(main, params);

    main.insertBefore(blockSeparator().cloneNode(true), main.firstChild);
    main.insertBefore(getMobileBgBlock(), main.firstChild);
    main.insertBefore(blockSeparator().cloneNode(true), main.firstChild);
    main.insertBefore(getDesktopBgBlock(), main.firstChild);

    main.append(buildSectionMetadata([['Style', 'newsdetail']]));
    main.append(blockSeparator().cloneNode(true));

    params.template = 'agenda';
    params['breadcrumbs-base'] = '/news/news-breadcrumbs';
    params['breadcrumbs-title-override'] = 'News Post';
    const listMetadata = await extractPageInfo(
      'http://localhost:3001/newslist.php?host=https://www.clarkcountynv.gov/newslist.php',
      params.originalURL,
      results,
    );

    Object.keys(listMetadata).forEach((key) => {
      if (listMetadata[key] && listMetadata[key].length > 0) {
        params[key] = listMetadata[key];
      }
    });

    createMetadata(main, document, params);

    results.push({
      element: main,
      path: newPagePath,
    });

    return results;
  },
};
