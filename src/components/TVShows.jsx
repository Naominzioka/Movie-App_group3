//This TVShows component is for handling data fetching
import { useEffect, useState } from "react";
import ShowCard from "./ShowCard";

function TVShows(){
    const[shows, setShows] = useState([]); //stores the fetched TV  shows

    //fetching shows from our api
    useEffect(()=> {
    fetch("http://localhost:6001/shows")
    .then(response => response.json())
    .then (data => setShows(data))
}, []); //runs API call once on mount

    return(
        <section style={{paddingTop: "120px", color: "white"}}>
            <h2>TV shows</h2>
            <p>Find your favorite TV shows in this sollection</p>
            {shows.map(show => (
                <ShowCard key = {show.id} show = {show} />

            )
            )}
        </section>
    );
}
export default TVShows;
