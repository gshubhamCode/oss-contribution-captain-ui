import { chakraPalette, chakraShades } from "./chakraPalettes"; // optional to keep clean

const fixedLabelColors: Record<string, string> = {
  "bug": "red.500",
  "feature": "green.500",
  "good first issue": "purple.500",
  "react": "cyan.500",
  "angular": "orange.500",
  "springboot": "teal.500",
};

const chakraColors = [
  "cyan", "blue", "teal", "green", "orange", "pink", "yellow", "purple", "linkedin", "facebook", "messenger", "whatsapp"
];

const chakraShades = [400, 500, 600];

export const generateLabelColorMap = (allLabels: string[]) => {
  const labelColorMap: Record<string, string> = {};
  let paletteIndex = 0;
  let shadeIndex = 0;

  for (const label of allLabels) {
    const labelKey = label.toLowerCase();
    if (fixedLabelColors[labelKey]) {
      labelColorMap[labelKey] = fixedLabelColors[labelKey];
      continue;
    }

    const palette = chakraColors[paletteIndex % chakraColors.length];
    const shade = chakraShades[shadeIndex % chakraShades.length];
    labelColorMap[labelKey] = `${palette}.${shade}`;

    // Update indices
    paletteIndex++;
    if (paletteIndex % chakraColors.length === 0) {
      shadeIndex++; // move to next shade if all colors used once
    }
  }

  return labelColorMap;
};
