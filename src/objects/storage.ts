import { attribute } from "../core";
import { SessionObject } from "../object";

export class Storage extends SessionObject {

  /**
   * `true` if object is a token object and
   * `false` if object is a session object.
   * Default is `false`.
   */
  @attribute("token")
  public token: boolean;

  /**
   * `true` if object is a private object and
   * `false` if object is a public object.
   * Default value is token-specific, and may depend on the values of other attributes of the object.
   */
  @attribute("private")
  public private: boolean;

  /**
   * `true` if object can be modified. Default is `false`
   */
  @attribute("modifiable")
  public modifiable: boolean;

  /**
   * Description of the object (default empty)
   */
  @attribute("label")
  public label: string;

}
