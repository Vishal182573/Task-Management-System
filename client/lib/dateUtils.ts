
export function calculateDaysDifference(inputDate: String) {
    const currentDate = new Date();
    const inputDateObj = new Date(inputDate);
  
    // Calculate the difference in milliseconds
    const differenceMilliseconds = currentDate - inputDateObj;
  
    // Convert milliseconds to days
    const daysDifference = Math.floor(differenceMilliseconds / (1000 * 60 * 60 * 24));
  
    return daysDifference;
}
  