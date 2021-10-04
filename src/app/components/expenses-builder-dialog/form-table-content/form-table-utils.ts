export const FormTableUtils = {
  convertHeadersToCellObject(headers: string[]) {
    const obj: any = {};
    // const arr: object[] = [];
    headers.forEach(
      (header: string) => {
        obj[header] = header;
      })
    return obj;
  },
  includeEditColumn(dataArray: object[]) {
    const newArray: object[] = [];
    dataArray.forEach(
      (objElement: any) => {
        objElement['edit'] = true;
        newArray.push(objElement);
      })
    return newArray;
  }
}
