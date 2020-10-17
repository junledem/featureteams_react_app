export class ObjectUtil {
  static isEmpty(obj, deepCheckProp?: string[]): boolean {
    if (obj === undefined) {
      return true;
    }
    if (obj === null) {
      return true;
    }
    if (obj instanceof Object && obj.length === 0) {
      return true;
    }
    if (deepCheckProp) {
      const deepObjEmpty = deepCheckProp.some(prop => {
        let deepObj = obj;
        if (!deepObj.hasOwnProperty(prop)) {
          return true;
        }
        deepObj = obj[prop];
        return false;
      });
      if (deepObjEmpty) {
        return true;
      }
    }

    return false;
  }

  static removeDuplicate(arr: any[], prop: string): any[] {
    return arr.filter((obj, pos, filterArr) => {
      return filterArr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    }) || [];
  }

  static sortBy(array, prop: string, asc = true): any[] {
    const compare = (a, b) => {
      if (a[prop] < b[prop]) {
        return asc ? -1 : 1;
      }
      if (a[prop] > b[prop]) {
        return asc ? 1 : -1;
      }
      return 0;
    }
    return array.sort(compare);
  }
}