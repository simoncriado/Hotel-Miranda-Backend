type user = {
  name: string;
  email: string;
  phone: string;
};
type comment = {
  subject: string;
  body: string;
};

export interface IReviews {
  reviewID: number;
  id: number;
  date: Date;
  name: string;
  email: string;
  phone: string;
  comment: string;
  stars: number;
  archived: number;
}
