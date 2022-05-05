export interface File {
  creationDateTime: string;
  status: string;
  modifiedBy: number | string;
  type: string;
  uri: string;
  version: number;
  id: string;
  fileId: string;
  scheduled: boolean;
  title: string;
  createdBy: number | string;
  modifiedDateTime: string;
  live: boolean;
  popularity: number | boolean;
}
