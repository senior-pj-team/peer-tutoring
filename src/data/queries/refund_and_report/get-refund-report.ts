export const getRefundReport = async (
  supabase: TSupabaseClient,
  {
    session_id,
    student_id,
  }: {
    session_id?: number;
    student_id?: string;
  }
): Promise<TRefundReportResult[] | null> => {
  let query = supabase
    .from('refund_report')
    .select('*');

  if (session_id) query = query.eq('session_id', session_id)
  if (student_id) query = query.eq('student_id', student_id)

  const { data, error } =await query.order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching refund report:', error);
    return null;
  }

  return data as TRefundReportResult[] | null;
};
