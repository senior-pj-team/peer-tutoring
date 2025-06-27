type Params = {
    bank_name: string;
    account_name: string;
    account_number: string;
    account_type: TBankAccountType;
};

export async function insertBankInfo(
    supabase: TSupabaseClient,
    { bank_name, account_name, account_number, account_type }: Params,
): Promise<boolean> {
    const { error } = await supabase
        .from('bank_info')
        .insert({
            bank_name,
            account_name,
            account_number,
            account_type
        })

    if (error) {
        console.log("Error in insertBankinfo: ", error.message);
        return false;
    }

    return true;
}
