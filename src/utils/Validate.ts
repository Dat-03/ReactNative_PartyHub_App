export class Validate {
  static email(email: string) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  }
  static Password = (val: string) => {
    return val.length >= 6;
  };
}
