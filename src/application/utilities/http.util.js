import { PARAM_KEY } from "../common/constants/endpoint.const"

export class HttpUtil {
  static getApi(url: string, ...params): string {
    params.forEach((param, index) => {
      url = url.replace(PARAM_KEY.concat(index + 1), param);
    })
    
    return url;
  }
}