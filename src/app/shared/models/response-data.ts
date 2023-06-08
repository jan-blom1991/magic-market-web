import {ResponseSeverity} from "./response-severity";

export interface ResponseData {
  status: string;
  statusCode: number;
  statusPhrase: string;
  severity: ResponseSeverity;
  message: string;
  timestamp: string;
  body: object;
}
