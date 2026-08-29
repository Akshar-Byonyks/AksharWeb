// Shared geometry for the site's authored figures.
//
// This lives in `lib` rather than beside the component that draws it largest
// because two surfaces need it and they must not drift: the exchange figure on
// `/innovation/how-it-works/` and the doorway mark on `/innovation/` that
// leads there. A reader who clicks that card should meet the same outline
// again at full scale — which only works if it is literally the same outline.
//
// Importing it from `exchange-cycle.tsx` would have done the job and dragged a
// client-component dependency (`InViewStage`) into the hub's module graph for
// the sake of one string.

/**
 * The peritoneal cavity, in a `0 0 160 150` viewBox. A closed rounded form,
 * not an anatomical cross-section: an approximated organ outline drawn from
 * memory is the same class of risk as the India boundary withdrawn from "the
 * night," and this project has no nephrologist review to back one. Anywhere
 * it is drawn at explanatory size, the caption says it is a schematic.
 */
export const PERITONEAL_CAVITY =
  "M26 56C26 43 38 37 54 37H106C122 37 134 43 134 56V104C134 120 114 128 80 128C46 128 26 120 26 104Z";
