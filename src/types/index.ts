export interface LPJHistoryItem {
    id: number;
    no_request: string;
    tgl_lpj: string;
    file_path: string;
    created_at: string;
  }
  
  export interface RincianItem {
    id: number;
    deskripsi_pum: string;
    jumlah_pum: number;
    deskripsi_lpj: string;
    jumlah_lpj: number;
  }
  
  export interface FormValues {
    no_request: string;
    nama_pemohon: string;
    jabatan: string;
    nama_departemen: string;
    uraian: string;
    nama_jenis: string;
    jml_request: string;
    jml_terbilang: string;
    rincianItems: RincianItem[];
    total_pum: number;
    total_lpj: number;
    nama_approve_vpkeu: string;
    nama_approve_vptre: string;
    kode_departemen: string;
    nama_approve_vp: string;
    tgl_lpj: string;
  }