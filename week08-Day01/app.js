let [letter, city, form, tbody, lclick, cclick] = 
[
    document.querySelector('#letter'),
    document.querySelector('#city'),
    document.querySelector('form'),
    document.querySelector('tbody'),
    document.querySelector('#letter_click'),
    document.querySelector('#city_click'),
]
let result = fetch('https://api.jsonbin.io/b/5e255a4e8d761771cc941bc0')
// form.onkeyup = e =>{
//     result.then(res =>{
//         return res.clone().json()
//     }).then(res =>{
//         for(let elem in res){
//             if(e.target.value === res[elem].name[0]){
//                 console.log(res[elem].name)
//             }
//             if(e.target.value === res[elem].state){
//                 console.log(res[elem].state);
//             }
//         }
//     })
// }


    result.then(res =>{
        return res.json()
    }).then(res =>{
        lclick.onclick = e =>{
            e.preventDefault()
            if(tbody.firstChild){
                while(tbody.firstChild){
                    tbody.firstChild.remove()
                }
            }
            for( let elem in res){
                if(letter.value === res[elem].name[0]){
                    tbody.innerHTML += `
                        <tr>
                            <td>${elem}</td>
                            <td>${res[elem].name}</td>
                        </tr>
                    `
                }
            }
        }
        cclick.onclick = e =>{
            e.preventDefault()
            if(tbody.firstChild){
                while(tbody.firstChild){
                    tbody.firstChild.remove()
                }
            }
            for(let elem in res){
                if(city.value === res[elem].state){
                    tbody.innerHTML += `
                        <tr>
                            <td>${elem}</td>
                            <td>${res[elem].name}</td>
                        </tr>
                    `
                }
            }
        }
    })

