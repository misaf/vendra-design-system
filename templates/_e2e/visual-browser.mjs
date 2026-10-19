// GPU photo rasterization can vary between browser processes. Visual comparisons use one
// software path; interaction and device specs keep the normal browser configuration.
export const VISUAL_BROWSER = {launchOptions: {args: ['--disable-gpu']}};
