const fs = require('fs');
const path = require('path');

const ResData = function(state, stateInfo, data) {
	this.state = state!=undefined ? state : 0;
	this.stateInfo = stateInfo ? stateInfo : '';
	this.data = data ? data : null;
}

function createRandomId() {
	return (Math.random()*10000000).toString(16).substr(0,4)+'-'+(new Date()).getTime()+'-'+Math.random().toString().substr(2,5);
}

function mkdirsSync(dirname) {  
    if (fs.existsSync(dirname)) {  
        return true;  
    } else {  
        if (mkdirsSync(path.dirname(dirname))) {  
            fs.mkdirSync(dirname);  
            return true;  
        }  
    }  
}  

module.exports = {
	ResData,
	createRandomId,
	mkdirsSync
}
