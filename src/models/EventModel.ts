export interface EventModel {
  authorId: string;
  date: number;
  description: string;
  endAt: number;
  imageUrl: string;
  location: Localtion;
  startAt: number;
  title: string;
  users: string[];
}
export interface Localtion {
  address: string;
  title: string;
}
