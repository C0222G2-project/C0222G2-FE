export interface Feedback {
  id?: number;
  code?: string;
  creator?: string;
  email?: string;
  content?: string;
  rating?: number;
  feedbackDate?: Date;
  image?: string;
  isDeleted?: boolean;
}
