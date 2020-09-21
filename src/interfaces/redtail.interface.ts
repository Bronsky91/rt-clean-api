export interface RedtailContact {
    id: number;
    type: string;
    salutation_id?: any;
    business_id: number;
    servicing_advisor_id: number;
    writing_advisor_id: number;
    source_id: number;
    category_id: number;
    status_id: number;
    first_name: string;
    middle_name: string;
    last_name: string;
    suffix?: any;
    designation: string;
    company_name?: any;
    nickname: string;
    tax_id: string;
    dob: Date;
    death_date?: any;
    marital_status: number;
    job_title: string;
    marital_date: Date;
    gender: number;
    referred_by: string;
    client_since: Date;
    client_termination_date?: any;
    dob_reminder: number;
    recycle_delete: number;
    deleted: number;
    created_at: Date;
    updated_at: Date;
    temp_id?: any;
  }
  