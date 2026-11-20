let channelslist = document.querySelector("#channels-list")
let player = document.querySelector("#player")
let loadingspiner = document.querySelector("#loading-spiner")

async function displaychannel(channel)
{
    loadingspiner.classList.remove("hidden")
    player.innerHTML = `
        <h2>${channel.name}</h2>
        <img src ="${channel.previewImage}">
        <p>${channel.category}</p>
        <p>${channel.epg.currentProgram}</p>
    `
    let spinerimg = player.querySelector("img")
    await new Promise(function(resolve){
        spinerimg.addEventListener("load", resolve)
    })
    await new Promise(resolve => setTimeout(resolve, 4000))
    loadingspiner.classList.add("hidden")
}

const furl = "https://6afc2ab3892984c4494b034f.mockapi.io/channels"

fetch(furl)
.then(function(response){
    return response.json()
})
.then(function(channels){

    let favoritechannels = []
    let blacklistchannels = []

    function displaychannels(channellist){

        if (channellist !== blacklistchannels){
            channellist = channellist.filter(function(channel){
                return !blacklistchannels.includes(channel)
            })
        }

        channelslist.innerHTML = ""
        for (let channel of channellist)
        {
            channelslist.innerHTML += `<div class=" channel-button flex 
            justify-between items-center bg-gray-700 hover:bg-gray-600 p-4 mb-4
            rounded-lg cursor-pointer w-full text-left">${channel.channelNumber}
            - ${channel.name} <div><span class="text-yellow-400 cursor-pointer">
            ${favoritechannels.includes(channel) ? "★" : "☆"}</span><button data-id="${channel.id}" class="black-list ml-4 cursor-pointer">⌫</button>
            <button class= "edit ml-4 cursor-pointer">✎</button></div></div>`
        }
        let allchannelBtn = document.querySelectorAll(".channel-button")

        allchannelBtn.forEach(function(button){
        button.addEventListener("click", function(){

            console.log("channel clicked")

            let selectedchannel = channellist.find(function(channel){
                return button.textContent.startsWith(channel.channelNumber)
            })

            allchannelBtn.forEach(function(btn){
                btn.style.backgroundColor = ""
            })
            button.style.backgroundColor = "#f72585"
            displaychannel(selectedchannel)
        })
    })


    let allstars = document.querySelectorAll(".channel-button span")
    let allblacklist = document.querySelectorAll(".black-list")

    allblacklist.forEach(function(button){
        button.addEventListener("click", function(event){
            event.stopPropagation()
            console.log("blacklist clicked")

            let clickedblack = channellist.find(function(channel){
                return channel.id == button.dataset.id
            })

            if (currentchannel === blacklistchannels) {
                let blackindex = blacklistchannels.indexOf(clickedblack)
                blacklistchannels.splice(blackindex, 1)

                for (let list of [channels, sportchannels, newschannels, musicchannels, favoritechannels]){
                    let index = list.indexOf(clickedblack)

                    if (index !== -1) {
                        list.splice(index, 1)
                    }
                }

                displaychannels(blacklistchannels)

            } else {
                    if(!blacklistchannels.includes(clickedblack)) {
                        blacklistchannels.push(clickedblack)
                }
                let newblacklist = channellist.filter(function(channel){
                    return channel.id !== clickedblack.id
                })
                displaychannels(newblacklist)
            }
        })
    })

    allstars.forEach(function(span, favchannel)
    {
        span.addEventListener("click", function(event){
            event.stopPropagation()

            let clickedchannel = channellist[favchannel]
            if (span.textContent.trim() === "☆"){
            span.textContent = "★"

            favoritechannels.push(clickedchannel)

            }else {
            span.textContent = "☆"

            let chcekfavorite = currentchannel === favoritechannels

            favoritechannels = favoritechannels.filter(function (favchannel){
                    return favchannel.channelNumber !== clickedchannel.channelNumber
                })

                if (chcekfavorite){
                    currentchannel = favoritechannels
                    displaychannels(favoritechannels)
                }
            }

        })
    })

}
     displaychannels(channels)

    let sportchannels = channels.filter(function(channel){
        return channel.category === "SPORT"
    })

    let newschannels = channels.filter(function(channel){
        return channel.category === "NEWS"
    })

    let musicchannels = channels.filter(function(channel){
        return channel.category === "MUSIQUE"
    })
 
    let sport = document.querySelector("#sport")
    sport.addEventListener("click", function()
    {
        displaychannels(sportchannels)
        categorysidebar.classList.add("-translate-x-full")
        currentchannel = sportchannels
    })

    let news = document.querySelector("#news")
    news.addEventListener("click", function()
    {
        displaychannels(newschannels)
        categorysidebar.classList.add("-translate-x-full")
        currentchannel = newschannels
    })

    let music = document.querySelector("#music")
    music.addEventListener("click", function()
    {
        displaychannels(musicchannels)
        categorysidebar.classList.add("-translate-x-full")
        currentchannel = musicchannels
    })

    let allchannels = document.querySelector("#all-chanels")
    allchannels.addEventListener("click", function(){
        displaychannels(channels)
        categorysidebar.classList.add("-translate-x-full")
        currentchannel = channels
    })

    let favorite = document.querySelector("#favorite")
    favorite.addEventListener("click", function(){
        displaychannels(favoritechannels)
        categorysidebar.classList.add("-translate-x-full")
        currentchannel = favoritechannels
    })

    let black = document.querySelector("#black-list")
    black.addEventListener("click", function(){
        displaychannels(blacklistchannels)
        categorysidebar.classList.add("-translate-x-full")
        currentchannel = blacklistchannels
    })

    let searchbar = document.querySelector("#search-bar")
    let currentchannel = channels

    searchbar.addEventListener("input", function(){
        let searchvalue = searchbar.value
            searchvalue = searchvalue.toLowerCase().trim()

        let filtredchannels = currentchannel.filter(function(channel){
            return channel.channelNumber.toString().includes(searchvalue) ||
                channel.name.toLowerCase().includes(searchvalue)
        })
        displaychannels(filtredchannels)
    })
})


let sidebartrigger = document.querySelector("#sidebar-trigger")
let categorysidebar = document.querySelector("#category-sidebar")
let sidebarclose = document.querySelector("#close-sidebar")

sidebartrigger.addEventListener("mouseenter", function()
{
    categorysidebar.classList.remove("-translate-x-full")
});

sidebarclose.addEventListener("click", function()
{
    categorysidebar.classList.add("-translate-x-full")
});