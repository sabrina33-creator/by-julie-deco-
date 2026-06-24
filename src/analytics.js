export const trackEvent = (name, params = {}) => {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
};
