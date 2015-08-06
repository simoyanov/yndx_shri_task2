/**
 * Реализация API, не изменяйте ее
 * @param {string} url
 * @param {function} callback
 */
function getData(url, callback) {
    var RESPONSES = {
        '/countries': [
            {name: 'Cameroon', continent: 'Africa'},
            {name :'Fiji Islands', continent: 'Oceania'},
            {name: 'Guatemala', continent: 'North America'},
            {name: 'Japan', continent: 'Asia'},
            {name: 'Yugoslavia', continent: 'Europe'},
            {name: 'Tanzania', continent: 'Africa'}
        ],
        '/cities': [
            {name: 'Bamenda', country: 'Cameroon'},
            {name: 'Suva', country: 'Fiji Islands'},
            {name: 'Quetzaltenango', country: 'Guatemala'},
            {name: 'Osaka', country: 'Japan'},
            {name: 'Subotica', country: 'Yugoslavia'},
            {name: 'Zanzibar', country: 'Tanzania'},
        ],
        '/populations': [
            {count: 138000, name: 'Bamenda'},
            {count: 77366, name: 'Suva'},
            {count: 90801, name: 'Quetzaltenango'},
            {count: 2595674, name: 'Osaka'},
            {count: 100386, name: 'Subotica'},
            {count: 157634, name: 'Zanzibar'}
        ]
    };

    setTimeout(function () {
        var result = RESPONSES[url];
        if (!result) {
            return callback('Unknown url');
        }

        callback(null, result);
    }, Math.round(Math.random * 1000));
}

/**
 * Ваши изменения ниже
 */
var requests = ['/countries', '/cities', '/populations'];
var responses = [];
var userRequest = prompt('Введите название страны или города:', 'Tanzania');
for (i = 0; i < 3; i++) {
    var request = requests[i];
    var callback = function (error, result) {
        responses[responses.length] = result;
        
        if (responses.length == 3) {
            var c = [], cc = [], p = 0;
            for (i = 0; i < responses[0].length; i++) {
                if (responses[0][i].continent === 'Africa') {
                    c.push(responses[0][i].name);
                }
            }
            for (i = 0; i < responses[1].length; i++) {
                for (j = 0; j < c.length; j++) {
                    if (responses[1][i].country === c[j]) {
                        cc.push(responses[1][i].name);
                    }
                }
            }
            for (i = 0; i < responses[2].length; i++) {
                for (j = 0; j < cc.length; j++) {
                    if (responses[2][i].name === cc[j]) {
                        p += responses[2][i].count;
                    }
                }
            }
            console.log('Total population in African cities: ' + p);
            foundPopulation(userRequest);
        }
    };
    getData(request, callback);
}


function foundPopulation(uR){
    var textAlert = "";
    for (i = 0; i < responses[1].length; i++) {
        if (uR == responses[1][i].name){
            for (j = 0; j < responses[2].length; j++){
                if(uR == responses[2][j].name){
                    textAlert = 'Население города ' + responses[2][j].count;
                }
            }
        } else if(uR == responses[1][i].country){
            for (j = 0; j < responses[2].length; j++){
                if(responses[1][i].name == responses[2][j].name){
                    textAlert = 'Население страны ' + responses[2][j].count;//усложнить
                }
            }
        }
    }
    if (textAlert !== ""){
        alert(textAlert);
    } else{
        alert('Ничего не найдено!');
    }
         
}

