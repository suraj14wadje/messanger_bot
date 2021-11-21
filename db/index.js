
const messages ={
    get :function(){return this.data},
    push:function(data){this.data.push(data)},
    filter:function(cb){return this.data.filter(cb)},
    find:function(cb){return this.data.find(cb)},
    set:function(data){this.data = data},
    delete:function(id){this.data = this.data.filter(m=>m.id!=id)},
    data:[],
}

const users ={
    get :function(){return this.data},
    push:function(data){
        this.data.push(data);
        return data;
    },
    filter:function(cb){return this.data.filter(cb)},
    find:function(cb){return this.data.find(cb)},
    set:function(data){this.data = data},
    delete:function(id){this.data = this.data.filter(m=>m.id!=id)},
    update:function(user){
        const newData = this.filter(u=>u.id!=user.id);
        newData.push(user);
        this.set(newData);
        return newData;
    },
    data:[],
}


module.exports = { messages,users }