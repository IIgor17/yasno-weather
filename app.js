
const switchToggle = document.querySelector('.switch')
const switchButton = document.querySelector('.switch__toggle')
var switchState = 'off'

const weatherBoxes = document.querySelectorAll('.weather-box')

switchToggle.addEventListener('click', () => {
    toggleSwitch()
})

animateOpen()
renderDate()

function toggleSwitch() {

    if (switchState === 'off') {
        switchOn()
        switchState = 'inprogress'
        setTimeout( () => {
            switchState = 'on'
        },1000)
        gsap.to(switchButton, {x: '83%', ease: 'back', duration: .2, backgroundColor: '#32ed99'})
    }

    else if (switchState === 'on') {
        switchOff()
        switchState = 'inprogress'
        setTimeout( () => {
            switchState = 'off'
        },1000)
        gsap.to(switchButton, {x: '0%', ease: 'back', duration: .2, backgroundColor: '#ebebeb'})
    }
    
}

function switchOff() {
    console.log('off')


    gsap.to(weatherBoxes, {backgroundColor: '#fff', duration:.7, stagger:.1})
    gsap.to('.weather-box__name', {color: '#cccccc', duration:.7, stagger: .1})

    document.documentElement.style.setProperty('--text-color', '#4b4b4b')

    gsap.to(switchToggle, {backgroundColor: '#c9c9c9', duration: 1, delay: .5})

    document.body.style.setProperty('background', `url('https://cdn.glitch.global/b6a545d0-661f-43de-8b86-b6514cb0456b/bgbg.png?v=1659979499704')`)
    gsap.to('body', {backgroundColor:'#151515'})   

    gsap.to('.information__date', {color: '#fff'})
    gsap.to('.information__city', {color: '#fff'})

    gsap.to('.light', {backgroundColor: '#76d6ff'})
    gsap.to('.dark', {backgroundColor:'#3d6779'})

    gsap.to('img', {opacity:1})

    gsap.to('.search', {backgroundColor:'#fff'})
    gsap.to('input', {backgroundColor:'#fff'})

}

function switchOn() {

    console.log('on')

    gsap.to(weatherBoxes, {backgroundColor: '#232323', duration:.7, stagger:.1})
    gsap.to('.weather-box__name', {color: '#4b4b4b', duration:.7, stagger: .1})

    document.documentElement.style.setProperty('--text-color', '#707070')

    gsap.to(switchToggle, {backgroundColor: '#111111', duration: 1, delay: .5})

    document.body.style.setProperty('background', 'gray')
    gsap.to('body', {backgroundColor:'#151515'})   

    gsap.to('.information__date', {color: '#717171'})
    gsap.to('.information__city', {color: '#717171'})

    gsap.to('.light', {backgroundColor: '#555555'})
    gsap.to('.dark', {backgroundColor:'#151515'})

    gsap.to('img', {opacity:.7})

    gsap.to('.search', {backgroundColor:'#232323'})
    gsap.to('input', {backgroundColor:'#232323'})
}

function animateOpen() {
    gsap.from('.header', {y: -100, opacity:0, duration:.6, ease:'back'})
    gsap.from('.information', {y: -100, opacity: 0, delay: .3, duration: .6})
    gsap.from(weatherBoxes, {y: -100, opacity:0, duration:.5, stagger:.2, delay:.3})
}

function animateRequest() {
    gsap.from('.span-value', {y: -100, opacity:0, duration:.2, stagger:.1})
    gsap.from('.temperature-info', {x: -50, opacity: 0, duration: .2, delay:.3})
}

const api = {
    endpoint: "https://api.openweathermap.org/data/2.5/",
    key: "c95ded21f03f66825588e2e2109f3c78"
}
const searchInput = document.querySelector('.search__input')
searchInput.addEventListener('keypress', enter)


function enter(e) {
    if (e.keyCode === 13) {
        requestWeather(searchInput.value)
    }
}

async function requestWeather(data) {
    const requestResult = await fetch(`${api.endpoint}weather?q=${data}&units=metric&APPID=${api.key}`)
    const result = await requestResult.json()
    renderResult(result)
    animateOpen()
}


function renderResult(data) {

    
    let icon = document.querySelector('#conditions-image')
    let conditionsShort = document.querySelector('#conditions-short')
    let conditionsDetailed = document.querySelector('#conditions-detailed')
    let visibility = document.querySelector('#visibility')
    let humidity = document.querySelector('#humidity')
    let pressure = document.querySelector('#pressure')
    let cloudiness = document.querySelector('#cloudiness')
    let sunset = document.querySelector('#sunset')
    let sunrise = document.querySelector('#sunrise')
    let currTemp = document.querySelector('#current-temp')
    let feelsLike = document.querySelector('#feels-like')
    let minTemp = document.querySelector('#min')
    let maxTemp = document.querySelector('#max')
    let speed = document.querySelector('#speed')
    let direction = document.querySelector('#direction')
    let gust = document.querySelector('#gust')

    let cityName = document.querySelector('.information__city')

    cityName.innerHTML = `Today's weather in <span id="city">${data.name}</span>:`

    conditionsShort.textContent = `${data.weather[0].main}`
    conditionsDetailed.textContent = `${data.weather[0].description}`

    visibility.textContent = `${ Math.round(data.visibility/1000)}km`
    humidity.textContent = `${data.main.humidity}%`
    pressure.textContent = `${ Math.round(data.main.pressure*0.75)}mm`
    cloudiness.textContent = `${data.clouds.all}%`
    
    sunrise.textContent = `${timeConverter(data.sys.sunrise)}`
    sunset.textContent = `${timeConverter(data.sys.sunset)}`

    currTemp.textContent = `${Math.round(data.main.temp)}°`


    feelsLike.textContent = `Feels like ${Math.round(data.main.feels_like)}°`

    minTemp.textContent = `${Math.round(data.main.temp_min)}°`
    maxTemp.textContent = `${Math.round(data.main.temp_max)}°`

    speed.textContent = `${data.wind.speed}m/s`
    direction.textContent = `${data.wind.deg}°`

    let gustValue = (data.wind.gust == undefined) ? 'none' : `${data.wind.gust}m/s`

    gust.textContent = gustValue


    icon.setAttribute(`src`, `images/${changeIcon(data.weather[0].icon)}`)

    function changeIcon(icon) {
        let iconID = parseInt(icon)

        if (iconID === 1) {
            return 'sun.png'
        }
        if (iconID === 2) {
            return 'cloudy-sun.png'
        }
        if (iconID === 3 || iconID === 4) {
            return 'cloudy.png'
        }
        if (iconID === 9 || iconID === 10) {
            return 'rain.png'
        }
        if (iconID === 11) {
            return 'thunder.png'
        }
        if (iconID === 13) {
            return 'snow.png'
        }
        if (iconID === 50) {
            return 'mist.png'
        }
    }

    function tempToColor(temp) {
        
    }

}






function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var hour = a.getHours();
    var min = a.getMinutes();

    hour = (hour < 10) ? '0' + hour : hour
    min = (min < 10) ? '0' + min : min
    
    var time = hour + ':' + min;
    return time;
  }


function renderDate() {
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    let d = new Date()


    let time = `${d.getHours()}:${d.getMinutes()}`
    let weekday = d.getDay()
    let day = d.getDate()
    let month = d.getMonth()
    let year = d.getFullYear()

    document.querySelector('.information__date').textContent = `${weekdays[weekday-1]}, ${day} ${months[month]} ${year}, ${time}`
}

const blades = document.querySelector('.turb-head')



var windMove = gsap.to(blades, {
    rotate: 360, 
    ease: 'power0', 
    duration: 3,
    repeat: -1, 
})


function animateWind(state) {


    if (state === true) {
        windMove.play()
    }
    else {
        windMove.pause()
    }
}