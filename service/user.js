const {users:usersDb} = require('../db')

const addNewUser = (id)=>{
    usersDb.push( {id,name:'',birthDate:''} )
}

const isUserExist = id => {
    const user = usersDb.find(user=> user.id === id);
    return Boolean(user)
}


module.exports = {
    addNewUser,
    isUserExist
}

