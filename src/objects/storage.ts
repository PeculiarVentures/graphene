import { SessionObject } from "../object";

export class Storage extends SessionObject {

  /**
   * `true` if object is a token object;
   * `false` if object is a session object. Default is `false`.
   */
  get token(): boolean {
    return this.get("token");
  }

  set token(v: boolean) {
    this.set("token", v);
  }

  /**
   * `true` if object is a private object;
   * `false` if object is a public object.
   * Default value is token-specific, and may depend on the values of other attributes of the object.
   */
  get private(): boolean {
    return this.get("private");
  }

  set private(v: boolean) {
    this.set("private", v);
  }

  /**
   * `true` if object can be modified. Default is `false`
   */
  get modifiable(): boolean {
    return this.get("modifiable");
  }

  set modifiable(v: boolean) {
    this.set("modifiable", v);
  }

  /**
   * Description of the object (default empty)
   */
  get label(): string {
    return this.get("label");
  }

  set label(v: string) {
    this.set("label", v);
  }
}
