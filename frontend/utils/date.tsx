interface IyearMonthDate {
    year:string
    month:string
    day:string
}


export function getYearMonthDay(date:string):IyearMonthDate{
    const monthNames = [
        'Ocak',
        'Şubat',
        'Mart',
        'Nisan',
        'Mayıs',
        'Haziran',
        'Temmuz',
        'Ağustos',
        'Eylül',
        'Ekim',
        'Kasım',
        'Aralık'
    ]

    const dateObj = new Date(date)
    const year = dateObj.getFullYear();
    const day = dateObj.getDate();
    const monthIndex = dateObj.getMonth()
    const monthName = monthNames[monthIndex]

    return {year:`${year}`, month:`${monthName}`, day:`${day}` }

   
}



export function formatDateForRoute(date:string){
    const ymd = getYearMonthDay(date);
    
    return `${ymd.year}/${ymd.month}/${ymd.day}`
}