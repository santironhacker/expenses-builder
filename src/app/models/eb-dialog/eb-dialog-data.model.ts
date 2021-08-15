export interface EBDialogData {
  title?: {
    titleText?: string;
  }
  content?: {
    formTable?: {
      toComplete: string;
    }
    contentText?: string;
  },
  closeBtn?: {
    closeBtnText?: string;
  };
}
