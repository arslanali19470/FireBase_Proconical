// types.ts
export interface TopicDetail {
  id: string;
  TopicName: string;
  Date: string;
  Time: string;
}

export interface ProsConsType {
  id: string;
  TopicName: string;
  type: string | undefined;
  description: string;
  importance: number;
  TopicId: string;
}
