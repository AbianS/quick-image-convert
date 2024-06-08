import sharp, { AvifOptions, ResizeOptions, WebpOptions } from "sharp";
import * as vscode from "vscode";
import { genOutputPath } from "../utils/utils";

/**
 * Converts an image file to AVIF format.
 * @param uri - The URI of the image file to convert.
 * @param options - The options for the AVIF conversion.
 * @returns A Promise that resolves to the URI of the converted AVIF file.
 */
export async function toAvif(
  uri: vscode.Uri,
  options: AvifOptions,
): Promise<vscode.Uri> {
  const path = genOutputPath(uri, { ext: "avif" });

  await sharp(uri.fsPath).avif(options).toFile(path);
  return vscode.Uri.file(path);
}

/**
 * Converts an image file to WebP format.
 * @param uri - The URI of the image file to convert.
 * @param options - The options for the WebP conversion.
 * @returns A Promise that resolves to the URI of the converted WebP file.
 */
export async function toWebp(
  uri: vscode.Uri,
  options: WebpOptions,
): Promise<vscode.Uri> {
  const path = genOutputPath(uri, { ext: "webp" });

  await sharp(uri.fsPath).webp(options).toFile(path);
  return vscode.Uri.file(path);
}

/**
 * Resizes an image to the specified width and height.
 * @param uri - The URI of the image file.
 * @param width - The desired width of the resized image.
 * @param height - The desired height of the resized image.
 * @returns A Promise that resolves to the URI of the resized image file.
 */
export async function rezize(
  uri: vscode.Uri,
  width: number,
  height: number,
  options: ResizeOptions,
): Promise<vscode.Uri> {
  const { width: w, height: h, ...restOptions } = options;
  const path = genOutputPath(uri, { concatName: `_${width}x${height}` });

  await sharp(uri.fsPath).resize(width, height, restOptions).toFile(path);
  return vscode.Uri.file(path);
}
