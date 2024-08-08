import "@scss/page.scss";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import { Fancybox } from "@fancyapps/ui";
import SlimSelect from "slim-select";

Fancybox.bind("[data-fancyboxModal]", {
  // Custom options for all galleries
});
window.SlimSelect = [];
document.querySelectorAll("[data-select]").forEach((elem) => {
  let slimS = new SlimSelect({
    select: elem,
    settings: {
      showSearch: true,
      searchHighlight: true,
    },
  });

  window.SlimSelect.push(slimS);
});

Fancybox.bind("[data-fancybox]", {
  // Custom options for all galleries
});

Fancybox.bind("[data-fancybox-modal]", {
  // Custom options for all galleries
  backdropClick: false,
  dragToClose: false,
});
