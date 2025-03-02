// Function to get the current window size
export function getWindowSize() {
  const windowWidth = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
  const windowHeight = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
  return {
    width: windowWidth,
    height: windowHeight,
  };
}

export function getViewPort() {
  const { width } = getWindowSize();
  if (width >= 900) {
    return 'desktop';
  }
  return 'mobile';
}

export function capitalize(s) {
  return String(s[0]).toUpperCase() + String(s).slice(1);
}

export function normalizeString(str) {
  return str.toLowerCase().replace(/ /g, '-');
}

// Links opening in new tab
export function externalLinks(main) {
  const links = main.querySelectorAll('a[href]');
  links.forEach((linkItem) => {
    const hrefURL = new URL(linkItem.href);
    if (hrefURL.pathname.includes('pdf') || hrefURL.hostname !== window.location.hostname) {
      linkItem.setAttribute('target', '_blank');
    }
  });
}
