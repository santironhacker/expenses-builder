import { Constants } from "../shared/constants";

export enum AcceptedFileFormats {
  CSV = 'csv',
  PDF = 'pdf'
}

export function getLowercaseAcceptedFileFormats(): Array<string> {
  return Object.keys(AcceptedFileFormats).map(key => key.toLowerCase());
}

export function getSpacedLowercaseAcceptedFileFormats(): Array<string> {
  return Object.keys(AcceptedFileFormats).map(key => `${Constants.SINGLE_SPACE}${key.toLowerCase()}`);
}
