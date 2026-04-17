const isPdfExport = new URLSearchParams(window.location.search).has(
  "print-pdf",
);
const showPdfNotes = new URLSearchParams(window.location.search).has("notes");

Reveal.initialize({
  controls: true,
  progress: true,
  center: true,
  hash: true,
  transition: "convex",
  showNotes: isPdfExport && showPdfNotes ? "separate-page" : false,
  pdfSeparateFragments: false,

  animate: {
    autoplay: true,
  },

  customcontrols: {
    controls: [
      {
        id: "toggle-overview",
        title: "Overview",
        icon: '<i class="fas fa-th"></i>',
        action: "Reveal.toggleOverview();",
      },
      {
        id: "toggle-chalkboard",
        title: "Chalkboard",
        icon: '<i class="fas fa-pen-square"></i>',
        action: "RevealChalkboard.toggleChalkboard();",
      },
      {
        id: "toggle-fullscreen",
        title: "Fullscreen",
        icon: '<i class="fas fa-expand"></i>',
        action:
          "document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();",
      },
    ],
  },
  anything: [
    {
      className: "anything",
      initialize: function (container, options) {
        container.innerHTML = "<p>" + options.text + "</p>";
      },
    },
  ],
  // Learn about plugins: https://revealjs.com/plugins/

  plugins: [
    RevealZoom,
    RevealNotes,
    RevealSearch,
    RevealMarkdown,
    RevealHighlight,
    RevealChalkboard,
    RevealCustomControls,
    RevealLoadContent,
    RevealAnimate,
    RevealChart,
    RevealAnything,
    RevealMermaid,
  ],
  mermaid: {
    startOnLoad: true,
  },
});
