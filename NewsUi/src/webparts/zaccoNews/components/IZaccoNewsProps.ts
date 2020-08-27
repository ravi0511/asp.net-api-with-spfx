import { HttpClient } from "@microsoft/sp-http";
export interface IZaccoNewsProps {
  description: string;
  httpClient: HttpClient;
  currentUser: any;
}
