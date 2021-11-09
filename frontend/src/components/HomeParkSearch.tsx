
import React, { useEffect, useState, useContext } from "react";
import DarkPark, { Comments, filteredParks } from "../models/DarkPark";
import { LongLat } from "../models/LongLat";
import getParkList from "../services/GetParkList";
import {WeatherInterface} from "../models/WeatherInterface";
import { getSetWeather, getWeekForecast } from "../services/GetWeather";
import { Router, NavLink } from "react-router-dom"
import { upDateOne } from "../services/GetParkList";
import Forecast from "./Forecast";

// useContext stuff
import { SearchContext, SearchProps } from "../context/SearchProvider";
import Header from "./Header";


export default function HomeParkSearch() {
    // receive zip code from form
    // make sure it's on the list. If not return an err message
    // return lon/lat , 
    const { searchInputs, loadWeatherByLocation } = useContext(SearchContext);
    const [zipLat, setZipLat] = useState(searchInputs[0].searchLat);
    const [zipLon, setZipLon] = useState(searchInputs[0].searchLon);
    const [darkParkList, setDarkParkList] = useState<DarkPark[]>([]);
    // useContext stuff. Object containing searchLat, searchLon etc.
    const [filteredParks, setFilteredParks] = useState<filteredParks[]>([]);
    const [weather, setWeather] = useState<WeatherInterface>();
    const [forecast, setForecast] = useState<WeatherInterface>();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [numParks, setNumParks] = useState(0);



    // const[searchLatLon, setSearchLatLon] = useState<SearchProps>({searchLat: zipLat, searchLon: zipLon});
    const resetUse = () => {
        getParkList().then(function (res) {
            {
                res.map((data) => {
                    let pLat = data.latlong[0];
                    let pLon = data.latlong[1];
                    let zLat = zipLat;
                    let zLon = zipLon;

                    function calcDistance(zLat: number, zLon: number, pLat: number, pLon: number) {
                        var R = 6371; // km
                        var dLat = toRad(pLat - zLat);
                        var dLon = toRad(pLon - zLon);
                        var lat1 = toRad(zLat);
                        var lat2 = toRad(pLat);

                        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
                        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                        var d = R * c;
                        // return Math.round(d * .621371); // convert the km to miles
                        var solution = Math.round(d * .621371); // convert the km to miles
                        // return solution;

                        return data.miles = solution;

                    }
                    // Converts numeric degrees to radians
                    function toRad(Value: number) {
                        return Value * Math.PI / 180;
                    }
                    calcDistance(zLat, zLon, pLat, pLon);
                })
            }
            setDarkParkList(res);
        });
    }

    useEffect(() => {
        getParkList().then(function (res) {
            {
                res.map((data) => {
                    let pLat = data.latlong[0];
                    let pLon = data.latlong[1];
                    let zLat = zipLat;
                    let zLon = zipLon;

                    function calcDistance(zLat: number, zLon: number, pLat: number, pLon: number) {
                        var R = 6371; // km
                        var dLat = toRad(pLat - zLat);
                        var dLon = toRad(pLon - zLon);
                        var lat1 = toRad(zLat);
                        var lat2 = toRad(pLat);

                        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
                        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                        var d = R * c;
                        // return Math.round(d * .621371); // convert the km to miles
                        var solution = Math.round(d * .621371); // convert the km to miles
                        // return solution;

                        return data.miles = solution;

                    }
                    // Converts numeric degrees to radians
                    function toRad(Value: number) {
                        return Value * Math.PI / 180;
                    }
                    calcDistance(zLat, zLon, pLat, pLon);
                })
            }
            setDarkParkList(res);
        });

        console.log(searchInputs[0]);
        getSetWeather(zipLat, zipLon).then(res => setWeather(res));
        getWeekForecast(zipLat, zipLon).then((res) => setForecast(res));

    }, [zipLat])

    function formatWeather() {
        let timeZone = weather?.timezone;
        timeZone = timeZone?.replace("America/", "")
        timeZone = timeZone?.replace("_", " ")
        return timeZone;

    }

    function formatTemp(temp: any){
        let fixedTemp = temp?.toFixed()
        return fixedTemp;
    }

    function formatDateTime(unix: any) {
        var a = new Date(unix * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours() >= 12 ? a.getHours() - 12 + 'PM' : a.getHours() + 'AM';
        if (hour == "0PM"){
           hour = "12PM"
        }
        // var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
        var time = month + ' ' + date +  ' ' + hour  ;
        return time;
        
      }
    
      function formatDate(unix: any) {
        var a = new Date(unix * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
        // var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
        var monthDate = month + ' ' + date ;
        return monthDate;  
      }
    

    return (
        <main>
            {/* THIS CONTAINS BOTH NAVBAR AND WEATHER (USED FOR DESKTOP VIEW) */}
            <div className="desktop-wrap_nav_weather">
                <nav className="navbar_home">
                    <ul>
                        <li><NavLink to="/" style={{ textDecoration: "none" }}><p className="navbar_p_home">Home</p></NavLink></li>
                        <li><NavLink to="/learnmore" style={{ textDecoration: "none" }}><p className="navbar_p_home">Learn More</p></NavLink></li>
                        <li><NavLink to="/news" style={{ textDecoration: "none" }}><p className="navbar_p_home">News</p></NavLink></li>
                        <li><NavLink to="/darkparklist" style={{ textDecoration: "none" }}><p className="navbar_p_home">Park List</p></NavLink></li>
                    </ul>
                </nav>

        {/* THIS IS THE WEATHER HEADER BEGINNING */}
                <div className="weather_route_div_home">
                    <div className="timezone_and_conditions_div">
                        {/* Shows timezone. Automatically set to 'America/Detroit' until changed. */}
                        <h3 className="timezone_h3">
                            <div className="timezone_text">Time Zone: </div>
                            {formatWeather()}</h3>

                        {/* Grabs a small description of current weather conditions (example: moderate rain) */}
                        <p className="weather_conditions_p">
                            <p className="conditions_text"> Conditions: </p>
                            {weather?.current.weather[0].description}</p>
                    </div>


                    <div className="temp_icon_details_div">
                        {/* temperature */}
                        <p className="temp_p">{formatTemp(weather?.current.temp)}°</p>
                        {/* Icon representing weather */}
                        <img className="weather_icon_img" src={"http://openweathermap.org/img/wn/" + weather?.current.weather[0].icon + "@2x.png"} alt='icon representing weather conditions' />
                        {/* link to see 7-day forescast and more details */}
                        <p className="weather_info_p" onClick={(e) => {document.querySelectorAll(".modal_container").forEach(item => item.classList.toggle("hidden"))}}>&#9432;</p>
                    </div>
                </div>
            </div>
        {/* THIS IS WEATHER HEADER END */}

         {/* THIS IS THE FORECAST POP UP BEGINNING  */}
            <div className="modal_container hidden">
                <div className="modal">
                 <div className="modal-content">
                     <span className="close"
                    onClick={(e) => {document.querySelectorAll(".modal_container").forEach((item) => item.classList.toggle("hidden"));}}>
                    &times;
                    </span>
                     <h2 className="modal_h2">5 Hour Forecast</h2>
                     <div className="hourly_forecast">
                         {forecast?.hourly.map((hour, index) => {
                             return (
                                  <div key={index} className="hour_info">
                                        <p className="forecast_p">
                                         <img className="weather_icon_img" src={
                                        "http://openweathermap.org/img/wn/" +
                                         hour.weather[0].icon +
                                        "@2x.png" } alt="icon representing weather conditions" />
                                         </p>
                                    <div className="forecast_card">
                                        <p className="forecast_p"> {formatDateTime(hour.dt)} </p>
                                        <p className="forecast_p">{formatTemp(hour.temp)}°</p>
                                    </div>
                                </div>
                                )
                         }).slice(0, 5)}
             </div>
        
                <h2 className="modal_h2">7 Day Forecast</h2>
                 <div className="daily_forecast">
                    {forecast?.daily.map((day, index) => {
                         return <div key={index} className="daily_info">
                        <p className="forecast_p">
                        <img className="weather_icon_img" src={
                         "http://openweathermap.org/img/wn/" +
                          day.weather[0].icon +
                        "@2x.png" } alt="icon representing weather conditions" />
                         </p>
                     <div className="forecast_card">
                         <p className="forecast_p"> {formatDate(day.dt)}</p>
                         <p className="forecast_p">{formatTemp(day.temp.day)}°</p>
                     </div>
                 </div>;
                     }).slice(0,7)}
             </div>
        
            </div>
         </div>
     </div>
    {/* THIS IS THE FORECAST POP UP ENDING */}

    {/* THIS IS THE HEADER */}
            <Header />
        
            <div className="welcomeP_searchForm">
                <p aria-label="addP" role="Paragraph" className="welcome_p">Welcome! Have ever wondered of whats out there in the cosmos?
                    Do you want to find a place where you can relax and enjoy the night sky to see
                    an immense amount of stars and enjoy the scenery? Well this is the website for you!
                    Click "Learn more" to get more information about our site and where you can find these
                    majestic places. Your adventure is only one click away!
                </p>
                <div className="park-search">
                <form aria-label="addForm" role="Form" className="park-search-form">
                <h2 className="park-search-headline">Enter your zip to find parks near you.</h2>
                    <label className="park-search-label" aria-label="addLabel" role="Label" htmlFor="search"></label>
                        <input className="park-search-zip" name="search" id="search" type="text" placeholder="Enter Your Zip" onChange={(e) => {
                            if (e.target.value.length == 5) {
                                //setNumParks(10);

                                LongLat.forEach(array => {
                                    if (array[0] == e.target.value) {
                                        setZipLat(array[1]);
                                        setZipLon(array[2]);
                                    }

                                })
                                searchInputs.unshift({ searchLat: zipLat, searchLon: zipLon, hasSearched: true });
                                // console.log(searchInputs)

                            }
                        }} />
                    <button className="park-search-button" aria-label="addButton" role="Button" type="submit" onClick={(e) => {
                        e.preventDefault();
                        setNumParks(10)
                        console.log(zipLat);
                        console.log(zipLon);
                        let searchLatLon = { searchLat: zipLat, searchLon: zipLon, hasSearched: true };
                        searchInputs.unshift(searchLatLon);
                    }
                    }>Search</button>
                </form>
                </div>
            </div>

            <div className="park-list">
                {/* <h2 aria-label="addH2" role="H2" className="park-list-headline">Dark Parks Near You</h2> */}
                {darkParkList.sort((a, b) => a.miles - b.miles).map((data, index) => {
                    return (
                        <div key={index} className="info-card home-card">
                            <p className="park-list-name"><a href={data.url} target="_blank">{data.name}</a></p>
                            <p>{data.state}</p>
                            <p>{data.description}</p>
                            <p>{data.miles} miles from your location.</p>
                            
                            <a href={data.url} target="_blank" className="more-details-link">More Details</a>
                            <details>
                                <summary><span className="leaveRatingComment_h2">Click to Leave a Rating and Comment</span></summary>
                                <form method="PUT" id="comment-form" onSubmit={(e) => {
                                    e.preventDefault();
                                    let newComment: Comments = { rating, comment };
                                    // testing to see if pushing would refresh the page, it did not
                                    upDateOne(data._id, newComment).then(res => data.comments.push(res))
                                    setRating(0);
                                    setComment("");
                                    getParkList().then(res => setDarkParkList([...darkParkList]));
                                    // setRating(0);
                                    // setComment("");
                                    // resetUse();
                                    // document.getElementsByName("rating").forEach(input => input = 0);
                                    // document.querySelectorAll("input").forEach(input => input.textContent = "");
                                }}>


                                    <label htmlFor="rating">Rating:</label>
                                    <input placeholder="rating" className="ratingInput" type="number" max="10" min="1" name="rating" onChange={(e) => { setRating(e.target.valueAsNumber) }}></input>


                                    <label htmlFor="comment">Comment:</label>
                                    <input placeholder="comment" className="commentInput" type="text" name="comment" onChange={(e) => { setComment(e.target.value) }}></input>

                                    <button type="submit">
                                        Submit Comment
                                    </button>
                                </form>
                                <div>{data.comments.map((comment, index) => {
                                    return (
                                        <div key={index}>
                                            <p>{comment.rating}</p>
                                            <p>{comment.comment}</p>
                                        </div>
                                    )
                                })}</div>
                            </details>
                        </div>
                    )
                }).slice(0, numParks)}
            </div>
        </main >
    )

}
