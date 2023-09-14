// https://www.convertsimple.com/convert-json-to-typescript/
// types for front end

export interface IResObject {
  message: string;
  data: VectorData[];
  id: string;
}

export interface VectorData {
  id: string;
  score: number;
  values: any[];
  metadata: Metadata;
}

interface Metadata {
  id?: string;
  text?: string;
  title: string;
  body?: string;
}
