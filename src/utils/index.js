export const scrollTo = (id) => {
  const element = document.getElementById(id);
  if (element) {
    if (window.lenis) {
      window.lenis.scrollTo('#' + id, { duration: 1.5 });
    } else {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
};
