import * as vscode from "vscode";
import { getFileSize, getImageWidthAndHeight } from "../utils/utils";
import * as ImageConvert from "./convert";
import {
  getAvifSettingsOptions,
  getResizeSettingsOptions,
  getWebpSettingsOptions,
} from "../utils/settings";

export function registerConvertToAvifCommnad(context: vscode.ExtensionContext) {
  return vscode.commands.registerCommand(
    "quick-image-convert.ToAvif",
    async (uri: vscode.Uri) => {
      const avifSettings = getAvifSettingsOptions();

      if (!avifSettings.useDefaultValues) {
        const qualityInput = await vscode.window.showInputBox({
          prompt: "Enter the quality",
          placeHolder: "default: 80",
          validateInput(value) {
            if (isNaN(parseInt(value))) {
              return "Quality must be a number";
            }

            return null;
          },
        });

        const losslessInput = await vscode.window.showQuickPick(
          ["true", "false"],
          {
            placeHolder: "Select Lossless (default: false)",
            title: "Lossless",
          },
        );

        const effortInput = await vscode.window.showInputBox({
          prompt: "Enter the effort",
          placeHolder: "default: 4",
          validateInput(value) {
            if (
              isNaN(parseInt(value)) ||
              parseInt(value) < 0 ||
              parseInt(value) > 9
            ) {
              return "Effort must be a number between 0 and 9";
            }

            return null;
          },
        });

        const chromaSubsamplingInput = await vscode.window.showQuickPick(
          ["4:4:4", "4:2:0"],
          {
            placeHolder: "Select ChromaSubsampling (default: 4:4:4)",
            title: "ChromaSubsampling",
          },
        );

        const bitdepthInput = await vscode.window.showQuickPick(
          ["8", "10", "12"],
          {
            placeHolder: "Select Bitdepth (default: 8)",
            title: "Bitdepth",
          },
        );

        avifSettings.quality = qualityInput
          ? parseInt(qualityInput)
          : avifSettings.quality;

        avifSettings.lossless = losslessInput
          ? losslessInput === "true"
          : avifSettings.lossless;

        avifSettings.effort = effortInput
          ? parseInt(effortInput)
          : avifSettings.effort;

        avifSettings.chromaSubsampling = chromaSubsamplingInput
          ? chromaSubsamplingInput
          : avifSettings.chromaSubsampling;

        avifSettings.bitdepth = bitdepthInput
          ? (parseInt(bitdepthInput) as 8 | 10 | 12)
          : avifSettings.bitdepth;
      }

      await vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: "Converting to AVIF...",
          cancellable: true,
        },
        async () => {
          try {
            const { useDefaultValues, ...avifOptions } = avifSettings;
            const newPath = await ImageConvert.toAvif(uri, avifOptions);

            vscode.window.showInformationMessage(
              `Converted to AVIF: Original Size: ${await getFileSize(
                uri,
              )} | New Size: ${await getFileSize(newPath)}`,
            );
          } catch (error) {
            vscode.window.showErrorMessage("Failed to convert to AVIF");
          }
        },
      );
    },
  );
}

export function registerConvertToWebpCommnad(context: vscode.ExtensionContext) {
  return vscode.commands.registerCommand(
    "quick-image-convert.ToWebP",
    async (uri: vscode.Uri) => {
      const webpSettings = getWebpSettingsOptions();

      if (!webpSettings.useDefaultValues) {
        const qualityInput = await vscode.window.showInputBox({
          prompt: "Enter the quality",
          placeHolder: "default: 80",
          validateInput(value) {
            if (isNaN(parseInt(value))) {
              return "Quality must be a number";
            }

            return null;
          },
        });

        const alphaQualityInput = await vscode.window.showInputBox({
          prompt: "Enter the alphaQuality",
          placeHolder: "default: 100",
          validateInput(value) {
            if (
              isNaN(parseInt(value)) ||
              parseInt(value) < 0 ||
              parseInt(value) > 100
            ) {
              return "AlphaQuality must be a number between 0 and 100";
            }

            return null;
          },
        });

        const losslessInput = await vscode.window.showQuickPick(
          ["true", "false"],
          {
            placeHolder: "Select Lossless (default: false)",
            title: "Lossless",
          },
        );

        const nearLosslessInput = await vscode.window.showQuickPick(
          ["true", "false"],
          {
            placeHolder: "Select NearLossless (default: false)",
            title: "NearLossless",
          },
        );

        const smartSubsampleInput = await vscode.window.showQuickPick(
          ["true", "false"],
          {
            placeHolder: "Select SmartSubsample (default: true)",
            title: "SmartSubsample",
          },
        );

        const effortInput = await vscode.window.showInputBox({
          prompt: "Enter the effort",
          placeHolder: "default: 4",
          validateInput(value) {
            if (
              isNaN(parseInt(value)) ||
              parseInt(value) < 0 ||
              parseInt(value) > 6
            ) {
              return "Effort must be a number between 0 and 6";
            }

            return null;
          },
        });

        const minSizeInput = await vscode.window.showQuickPick(
          ["true", "false"],
          {
            placeHolder: "Select MinSize (default: false)",
            title: "MinSize",
          },
        );

        const mixedInput = await vscode.window.showQuickPick(
          ["true", "false"],
          {
            placeHolder: "Select Mixed (default: false)",
            title: "Mixed",
          },
        );

        const presetInput = await vscode.window.showQuickPick(
          ["default", "photo", "picture", "drawing", "icon", "text"],
          {
            placeHolder: "Select Preset (default: default)",
            title: "Preset",
          },
        );

        webpSettings.quality = qualityInput
          ? parseInt(qualityInput)
          : webpSettings.quality;

        webpSettings.alphaQuality = alphaQualityInput
          ? parseInt(alphaQualityInput)
          : webpSettings.alphaQuality;

        webpSettings.lossless = losslessInput
          ? losslessInput === "true"
          : webpSettings.lossless;

        webpSettings.nearLossless = nearLosslessInput
          ? nearLosslessInput === "true"
          : webpSettings.nearLossless;

        webpSettings.smartSubsample = smartSubsampleInput
          ? smartSubsampleInput === "true"
          : webpSettings.smartSubsample;

        webpSettings.effort = effortInput
          ? parseInt(effortInput)
          : webpSettings.effort;

        webpSettings.minSize = minSizeInput
          ? minSizeInput === "true"
          : webpSettings.minSize;

        webpSettings.mixed = mixedInput
          ? mixedInput === "true"
          : webpSettings.mixed;

        webpSettings.preset = presetInput
          ? (presetInput as
              | "default"
              | "photo"
              | "picture"
              | "drawing"
              | "icon"
              | "text")
          : webpSettings.preset;
      }

      await vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: "Converting to Webp...",
          cancellable: true,
        },
        async () => {
          try {
            const { useDefaultValues, ...webpOptions } = webpSettings;
            const newPath = await ImageConvert.toWebp(uri, webpOptions);

            vscode.window.showInformationMessage(
              `Converted to Webp: Original Size: ${await getFileSize(
                uri,
              )} | New Size: ${await getFileSize(newPath)}`,
            );
          } catch (error) {
            vscode.window.showErrorMessage("Failed to convert to Webp");
          }
        },
      );
    },
  );
}

export function registerResizeImageCommnad(context: vscode.ExtensionContext) {
  return vscode.commands.registerCommand(
    "quick-image-convert.Resize",
    async (uri: vscode.Uri) => {
      const { width: actualWidth, height: actualheight } =
        await getImageWidthAndHeight(uri);

      const resizeSettings = getResizeSettingsOptions();

      const width = await vscode.window.showInputBox({
        prompt: "Enter the width",
        placeHolder: `actual width: ${actualWidth}`,
        validateInput(value) {
          if (isNaN(parseInt(value))) {
            return "Width must be a number";
          }

          return null;
        },
      });

      const height = await vscode.window.showInputBox({
        prompt: "Enter the height",
        placeHolder: `actual height: ${actualheight}`,
        validateInput(value) {
          if (isNaN(parseInt(value))) {
            return "Height must be a number";
          }

          return null;
        },
      });

      if (!width || !height) {
        vscode.window.showWarningMessage("Invalid width or height");
        return;
      }

      if (!resizeSettings.useDefaultValues) {
        const fitInput = await vscode.window.showQuickPick(
          ["cover", "contain", "fill", "inside", "outside"],
          {
            placeHolder: "Select Fit (default: contain)",
            title: "Fit",
          },
        );

        const positionInput = await vscode.window.showQuickPick(
          [
            "centre",
            "top",
            "right top",
            "right",
            "right bottom",
            "bottom",
            "left bottom",
            "left",
            "left top",
          ],
          {
            placeHolder: "Select Position (default: centre)",
            title: "Position",
          },
        );

        const kernelInput = await vscode.window.showQuickPick(
          ["nearest", "cubic", "lanczos2", "lanczos3", "mitchell"],
          {
            placeHolder: "Select Kernel (default: lanczos3)",
            title: "Kernel",
          },
        );

        const withoutEnlargementInput = await vscode.window.showQuickPick(
          ["true", "false"],
          {
            placeHolder: "Select WithoutEnlargement (default: false)",
            title: "WithoutEnlargement",
          },
        );

        const withoutReductionInput = await vscode.window.showQuickPick(
          ["true", "false"],
          {
            placeHolder: "Select WithoutReduction (default: false)",
            title: "WithoutReduction",
          },
        );

        const fastShrinkOnLoadInput = await vscode.window.showQuickPick(
          ["true", "false"],
          {
            placeHolder: "Select FastShrinkOnLoad (default: true)",
            title: "FastShrinkOnLoad",
          },
        );

        resizeSettings.fit = fitInput
          ? (fitInput as "cover" | "contain" | "fill" | "inside" | "outside")
          : resizeSettings.fit;

        resizeSettings.position = positionInput
          ? (positionInput as
              | "centre"
              | "top"
              | "right top"
              | "right"
              | "right bottom"
              | "bottom"
              | "left bottom"
              | "left"
              | "left top")
          : resizeSettings.position;

        resizeSettings.kernel = kernelInput
          ? (kernelInput as
              | "nearest"
              | "cubic"
              | "lanczos2"
              | "lanczos3"
              | "mitchell")
          : resizeSettings.kernel;

        resizeSettings.withoutEnlargement = withoutEnlargementInput
          ? withoutEnlargementInput === "true"
          : resizeSettings.withoutEnlargement;

        resizeSettings.withoutReduction = withoutReductionInput
          ? withoutReductionInput === "true"
          : resizeSettings.withoutReduction;

        resizeSettings.fastShrinkOnLoad = fastShrinkOnLoadInput
          ? fastShrinkOnLoadInput === "true"
          : resizeSettings.fastShrinkOnLoad;
      }

      await vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: "Resizing image...",
          cancellable: true,
        },
        async () => {
          const {
            useDefaultValues,
            width: w,
            height: h,
            ...resizeOptions
          } = resizeSettings;
          try {
            const newPath = await ImageConvert.rezize(
              uri,
              parseInt(width),
              parseInt(height),
              resizeOptions,
            );

            vscode.window.showInformationMessage(
              `Resized image: Original Size: ${await getFileSize(
                uri,
              )} | New Size: ${await getFileSize(newPath)}`,
            );
          } catch (error) {
            vscode.window.showErrorMessage("Failed to resize image");
          }
        },
      );
    },
  );
}
