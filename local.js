export  function setData(data){
    localStorage.setItem('iptv', JSON.stringify(data))
        console.log(data)
}

export  function getData(){
   let data = localStorage.getItem("iptv")
   return JSON.parse(data);
}

