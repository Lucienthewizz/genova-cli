import kleur from "kleur";

/**
 * Simple logger utilities
 */
export const log = (msg) => console.log(msg);
export const logInfo = (msg) => console.log(kleur.dim(msg));
export const logError = (msg) => console.error(kleur.red(msg));

/**
 * Display simple banner
 */
export function displayBanner() {
  console.log("");
  console.log(kleur.bold("GENOVA CLI"));
  console.log("");
}
