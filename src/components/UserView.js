import React, {useEffect, useState} from "react";
import axios from "axios";

const UserView = ({city, onSearchClick}) => {
    const handleDelete = (c) => {
        axios.delete("https://localdev.infotamia.com/weather/api/v1/weather/favourites/" + c, {
            withCredentials: true
        }).then((res) => {
            const copy = [...cities]
            let index = copy.findIndex(e => e.city === c);
            copy.splice(index, 1)
            setCities(copy)
        })
    }

    const handleAdd = () => {
        if (!city) return;
        axios.post("https://localdev.infotamia.com/weather/api/v1/weather/favourites/",{
            city
        } , {
            withCredentials: true
        }).then((res) => {
            if (!cities.find(c => c.city === city)) {
                const copy = [...cities]
                copy.push(res.data)
                setCities(copy)
            }
        })
    }

    const [cities, setCities] = useState([])
    useEffect(() => {
        axios.get("https://localdev.infotamia.com/weather/api/v1/weather/favourites", {
            withCredentials: true
        }).then((res) => {
            setCities(res.data)
        })
    }, [])

    const validate = () => {
        if (!cities.find(c => c.city === city)) {
            return false;
        }
        return true;
    }

    return (
        <div>
            <button disabled={validate()} onClick={handleAdd}>add</button>
            <table>
                <tr>
                    <th>city</th>
                    <th>delete</th>
                    <th>search</th>
                </tr>
                {
                    cities.map(c =>
                        <tr key={c.city}><th>{c.city}</th>
                        <th><button onClick={() => handleDelete(c.city)}>delete</button></th>
                        <th><button onClick={() => onSearchClick(c.city)}>search</button></th>
                        </tr>)
                }
            </table>
        </div>
    )
}

export default UserView