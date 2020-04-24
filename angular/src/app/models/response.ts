export interface Response {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  update_date_time: string;
  local_new_cases: number;
  local_total_cases: number;
  local_total_number_of_individuals_in_hospitals: number;
  local_deaths: number;
  local_new_deaths: number;
  local_recovered: number;
  local_active_cases: number;
  global_new_cases: number;
  global_total_cases: number;
  global_deaths: number;
  global_new_deaths: number;
  global_recovered: number;
  hospital_data: HospitalDatum[];
}

export interface HospitalDatum {
  id: number;
  hospital_id: number;
  cumulative_local: number;
  cumulative_foreign: number;
  treatment_local: number;
  treatment_foreign: number;
  created_at: string;
  updated_at: null;
  deleted_at: null;
  cumulative_total: number;
  treatment_total: number;
  hospital: Hospital;
}

export interface Hospital {
  id: number;
  name: string;
  name_si: string;
  name_ta: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}
