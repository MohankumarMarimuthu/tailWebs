/* eslint-disable @typescript-eslint/no-explicit-any */
export interface loginData {
  email: string;
  password: string;
}

export interface listDataItems {
  id: string;
  name: string;
  subject: string;
  date: any;
  marks: any;
}

export interface listData {
  data: listDataItems[];
}

export interface FormData {
  name: string;
  subject: string;
  marks: number;
  date: Date;
  id?: any;
}

export interface studentModalProps {
  show?: boolean;
  isEdit?: boolean;
  editId?: string;
  setEdit?: any;
  editstatus?: any;
}
