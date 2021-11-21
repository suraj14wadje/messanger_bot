const moment = require('moment')

function calculateDaysTillNextBirthDay(date){
    let [year,month,day] = date.trim().split('-')

    const currentDate = new Date();

    if(currentDate.getMonth() > month) year = currentDate.getFullYear()+1;
    else year = currentDate.getFullYear();


    return moment(`${month}-${day}-${year}`,'MM-DD-YYYY').diff(moment.now(),'days')
}


module.exports = { 
    calculateDaysTillNextBirthDay
}