function gridInit(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        el.classList.add("iniciar-espiada");
        observer.disconnect();

        const delay = 3000;

        setTimeout(() => {
          const killAnim = () => el.classList.remove("iniciar-espiada");
          el.addEventListener("touchstart", killAnim, {
            once: true,
            passive: true,
          });
          el.addEventListener("scroll", killAnim, {
            once: true,
            passive: true,
          });
        }, delay);
      }
    },
    {
      threshold: 1.0,
    },
  );

  observer.observe(el);
}
