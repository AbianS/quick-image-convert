import * as vscode from "vscode";
import path from "path";
import sharp from "sharp";

interface GenOutputPathOptions {
  ext?: string;
  concatName?: string;
}

export function genOutputPath(uri: vscode.Uri, options: GenOutputPathOptions) {
  const { dir, name: originalName, ext: orginalExt } = path.parse(uri.fsPath);
  const { ext, concatName } = options;

  const outputName = concatName ? originalName + concatName : originalName;
  const outputExt = ext || orginalExt;

  return path.join(dir, `${outputName}.${outputExt}`);
}

export async function getImageWidthAndHeight(uri: vscode.Uri) {
  try {
    const metadata = await sharp(uri.fsPath).metadata();
    return { width: metadata.width, height: metadata.height };
  } catch (error) {
    throw error;
  }
}

export async function getFileSize(uri: vscode.Uri) {
  try {
    const stats = await vscode.workspace.fs.stat(uri);
    const fileSizeInBytes = stats.size;
    const fileSizeInKilobytes = fileSizeInBytes / 1024;
    const fileSizeInMegabytes = fileSizeInKilobytes / 1024;
    const fileSizeInGigabytes = fileSizeInMegabytes / 1024;

    if (fileSizeInGigabytes > 1) {
      return `${fileSizeInGigabytes.toFixed(2)} GB`;
    } else if (fileSizeInMegabytes > 1) {
      return `${fileSizeInMegabytes.toFixed(2)} MB`;
    } else {
      return `${fileSizeInKilobytes.toFixed(2)} KB`;
    }
  } catch (error) {
    throw error;
  }
}
