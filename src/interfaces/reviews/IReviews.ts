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
  id: number;
  date: string;
  user: user;
  message: comment;
  stars: number;
  archived: boolean;
}
