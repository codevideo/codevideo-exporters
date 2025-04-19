import { generatePng } from "./generatePng";
import { generatePngsZip } from "./utils/generatePngsZip";

/**
 * Given an array of CodeVideoIDE React DOM rendered strings at a given action, (generated via ReactDOMServer.renderToString(<CodeVideoIDE {...props} />);),
 * this function generates a zip file containing the pngs of the snapshots.
 * @param reactDomRenderedStrings An array of CodeVideoIDE snapshot strings.
 * @param options The options to use when generating the PNGs.
 */
export const generatePngsFromActions = async (reactDomRenderedStrings: Array<string>) => {
    // generate markdown
    const pngs: Array<string> = []

    // for each react dom string, generate a png
    for (let i = 0; i < reactDomRenderedStrings.length; i++) {
        const png = await generatePng(reactDomRenderedStrings[i]);
        pngs.push(png);
    }

    // generate pngs zip!
    await generatePngsZip(pngs);
}
