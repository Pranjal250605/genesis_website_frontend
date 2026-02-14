export interface ContactSubmission {
  name: string
  email: string
  subject: string
  message: string
}

export interface OpenApplicationInsert {
  full_name: string
  email: string
  expertise: string
  cv_url?: string
}

export interface UpdateRow {
  id: string
  headline_en: string
  headline_ja: string
  summary_en: string
  summary_ja: string
  date_en: string
  date_ja: string
  category_en: string
  category_ja: string
  transmission_id: string
  featured: boolean
  created_at: string
}
