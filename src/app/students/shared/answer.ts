export interface Answer {
  id: number;
  alternative_id: number;
  alternative_flag: boolean;
  complement: string;
  phase: number;
  question_id: number;
  student_id: number;
}
