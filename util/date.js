const moment = require('moment')
moment.suppressDeprecationWarnings = true;

function calculateDaysTillNextBirthDay(date){
    let [year,month,day] = date.trim().split('-')

    const currentDate = new Date();

    if(currentDate.getMonth() > month) year = currentDate.getFullYear()+1;
    else year = currentDate.getFullYear();


    return moment(`${month}-${day}-${year}`,'MM-DD-YYYY').diff(moment.now(),'days')
}

function isValid(date){
    let momentDate = moment(date);
    return momentDate.isValid()
}


module.exports = { 
    calculateDaysTillNextBirthDay,
    isValid
}