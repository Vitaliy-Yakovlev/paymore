export interface QuestionAnswer {
  id: number;
  question_id: number;
  value: string;
  is_active: boolean;
}

export interface QuestionDeviceVariant {
  created_at: string;
  device_id: number;
  id: number;
  is_active: boolean;
  label: string;
  price: number;
  storage: string;
  updated_at: string;
}

export interface CategoricalQuestion {
  id: number;
  question: string;
  question_type: string;
  description: string;
  category_id: number;
  is_active: boolean;
}

export interface CategoricalQuestionWithAnswers extends CategoricalQuestion {
  question_answers: QuestionAnswer[];
}
