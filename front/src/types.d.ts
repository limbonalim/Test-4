export interface INews {
  id: number;
  title: string;
  image: string | null;
  date: string;
}

export interface IFullNews extends INews {
  content: string;
}

export interface IComment {
  id: number;
  author: string | null;
  content: string;
}

export interface ICommentPost {
  author: string | null;
  content: string;
  newsId: number;
}
