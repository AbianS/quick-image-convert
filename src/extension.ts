import * as vscode from "vscode";
import {
  registerConvertToAvifCommnad,
  registerConvertToWebpCommnad,
  registerResizeImageCommnad,
} from "./core/registers";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(registerConvertToAvifCommnad(context));
  context.subscriptions.push(registerConvertToWebpCommnad(context));
  context.subscriptions.push(registerResizeImageCommnad(context));
}

export function deactivate() {}
