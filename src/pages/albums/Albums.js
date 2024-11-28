import {useEffect, useState} from 'react';
import axios from 'axios';

export default function Albums() {

    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/api/albums")
            .then((response) => {
                setAlbums(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    console.log(albums);

    return (
        <>
            {albums.map((album) => (
                <a href={`/album/${album.id}`}><p>{album.title}</p></a>
            ))}
        </>
    )
        ;

}