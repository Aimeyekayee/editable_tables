export interface ImagePath{
  url:string
  local_path:string
}


export interface DataSource {
  id: number | null;
  part_no: string | null;
  plc_data: string | null;
  image_path: ImagePath[];
  created_at: Date | null;
  updated_at: Date | null;
}
