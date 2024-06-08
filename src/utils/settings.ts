import { AvifOptions, ResizeOptions, WebpOptions } from "sharp";
import * as vscode from "vscode";

export type AvifSettings = {
  useDefaultValues: boolean;
} & AvifOptions;

export function getAvifSettingsOptions(): AvifSettings {
  const imageConvertConfig = vscode.workspace.getConfiguration(
    "quick-image-convert",
  );

  return {
    quality: imageConvertConfig.get("avif.quality", 80),
    lossless: imageConvertConfig.get("avif.lossless", false),
    effort: imageConvertConfig.get("avif.effort", 4),
    chromaSubsampling: imageConvertConfig.get(
      "avif.chromaSubsampling",
      "4:4:4",
    ),
    bitdepth: imageConvertConfig.get("avif.bitdepth", 8),
    useDefaultValues: imageConvertConfig.get("avif.useDefaultValues", true),
  };
}

export type WebpSettings = {
  useDefaultValues: boolean;
} & WebpOptions;

export function getWebpSettingsOptions(): WebpSettings {
  const imageConvertConfig = vscode.workspace.getConfiguration(
    "quick-image-convert",
  );

  return {
    quality: imageConvertConfig.get("webp.quality", 80),
    alphaQuality: imageConvertConfig.get("webp.alphaQuality", 100),
    lossless: imageConvertConfig.get("webp.lossless", false),
    nearLossless: imageConvertConfig.get("webp.nearLossless", false),
    smartSubsample: imageConvertConfig.get("webp.smartSubsample", true),
    effort: imageConvertConfig.get("webp.effort", 4),
    minSize: imageConvertConfig.get("webp.minSize", false),
    mixed: imageConvertConfig.get("webp.minSize", false),
    preset: imageConvertConfig.get("webp.preset", "default"),
    useDefaultValues: imageConvertConfig.get("webp.useDefaultValues", true),
  };
}

export type ResizeSettings = {
  useDefaultValues: boolean;
} & ResizeOptions;

export function getResizeSettingsOptions(): ResizeSettings {
  const imageConvertConfig = vscode.workspace.getConfiguration(
    "quick-image-convert",
  );

  return {
    fit: imageConvertConfig.get("resize.fit", "contain"),
    position: imageConvertConfig.get("resize.position", "centre"),
    kernel: imageConvertConfig.get("resize.kernel", "lanczos3"),
    withoutEnlargement: imageConvertConfig.get(
      "resize.withoutEnlargement",
      false,
    ),
    withoutReduction: imageConvertConfig.get("resize.withoutReduction", false),
    fastShrinkOnLoad: imageConvertConfig.get("resize.fastShrinkOnLoad", true),
    useDefaultValues: imageConvertConfig.get("resize.useDefaultValues", true),
  };
}
