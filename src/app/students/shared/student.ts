import { Answer } from './answer';

export class Student {
  id: number;
  name: string;
  cell_phone: string;
  email: string;
  address: string;
  address_number: string;
  address_complment: string;
  address_district: string;
  address_zip_code: number;
  user_id: number;
  start_month: number;
  start_year: number;
  end_month: number;
  end_year: number;
  course_id: number;
  regional: number;
  unit_id: number;
  modality_id: number;
  area_id: number;
  occupation_id: number;
  class: number;
  distance_education: number;
  regimental_gratuity: number;
  agreement: number;
  agreement_name: number;
  pronatec_id: number;
  gender: string;
  ethnicity_id: number;
  cpf_number: number;
  rg_number: number;
  origin_id: number;
  birth_date: string;
  disability_id: number;
  city_id: number;
  base_id: number;
  answers: Answer = new Answer();

  // constructor(values: Object = {}){
  //   Object.assign(this, values);
  // }
}
