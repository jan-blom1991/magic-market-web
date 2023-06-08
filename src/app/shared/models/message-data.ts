import {ResponseSeverity} from "./response-severity";

export interface MessageData {
  severity?: ResponseSeverity;
  message?: string;
}
