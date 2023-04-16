export interface ResponseData {
  status: string;
  statusCode: number;
  statusPhrase: string;
  severity: string;
  message: string;
  errors: string[];
  timestamp: string;
  body: object;
}
