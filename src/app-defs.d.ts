export interface HasStatus {
  status: string;
}
export interface StatusResponseTest extends HasStatus {
  'api.version': string;
}
