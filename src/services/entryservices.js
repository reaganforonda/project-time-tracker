import axios from 'axios';

export function addEntry(entry){
    let newEntry = {}
    
    axios.post(`http://localhost:3005/api/entry/add`, (entry)).then((result) => {
      newEntry = result.data
    }).catch((e) => {
      console.log(`Error: ${e}`)
    })

    return newEntry;
}