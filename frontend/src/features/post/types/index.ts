export interface Author {
  id: string;
  firstname: string;
  lastname: string;
  mainImage?: string;
}
export interface Comment {
  id: string;
  author: Author;
  content: string;
}

export interface Image {
  id: string;
  authorId: string;
  path: string;
  post: {
    content: string;
  };
}

export interface Post {
  id: string;
  author: Author;
  content: string;
  createdAt: Date;
  comments: Comment[];
  image: Image[];
}

export interface Posts {
  posts: Post[];
}
