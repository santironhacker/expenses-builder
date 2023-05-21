export interface EBDialogData {
  title: {
    titleText: string;
  }
  content: {
    formTable: {
      dataSource: Array<any>,
      displayedColumns: Array<any>
      toComplete: string;
    }
    contentText: string;
  },
  closeBtn: {
    closeBtnText?: string;
  },
  confirmBtn?: {
    confirmBtnText?: string;
  };
}
