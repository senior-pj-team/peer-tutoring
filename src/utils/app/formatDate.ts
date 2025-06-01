export const formatDate= (timestampzString: string | null)=>{
	if(!timestampzString) return "NA"
	const date = new Date(timestampzString);
	return new Date(date.getFullYear(), date.getMonth(), date.getDate()).toDateString()?? "NA"
}