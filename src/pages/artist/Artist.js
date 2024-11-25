import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";


export default function Artist(){

    let { id } = useParams();

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [headers, setHeaders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/artist/${id}`);
                setName(response.data.name);
                setAge(response.data.age);
                setHeaders(response.data.headers);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <>
            <h1>{name}</h1>
            <h1>{age}</h1>
            {headers && Object.keys(headers).length > 0 && (
                Object.entries(headers).map(([key, value], index) => (
                    <div key={index}>
                        <h2>{key}</h2>
                        <p>{value}</p>
                    </div>
                ))
            )}
        </>
    );



}