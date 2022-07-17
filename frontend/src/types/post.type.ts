export interface Post {
  _id: string;
  month: number;
  electricity: number;
  gas: number;
  water: number;
  internet: number;
}

export enum TypeEnum {
  create = "create",
  update = "update",
}
