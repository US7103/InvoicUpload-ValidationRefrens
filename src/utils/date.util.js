
// exports.isValidDate = (dateStr)=>{
//     return !isNaN(Date.parse(dateStr));
// }

exports.isValidDate = (dateStr) => {
  // Case 1: Excel serial number
  if (typeof dateStr === 'number') {
    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
    const date = new Date(excelEpoch.getTime() + dateStr * 86400000);

    if (!isNaN(date.getTime())) {
      return date.toISOString().split('T')[0]; // YYYY-MM-DD
    }
    return null;
  }

  // Case 2: Normal date string
  if (typeof dateStr === 'string') {
    const parsed = new Date(dateStr);

    if (!isNaN(parsed.getTime())) {
      return parsed.toISOString().split('T')[0];
    }
  }

  return null; // Invalid date
};
