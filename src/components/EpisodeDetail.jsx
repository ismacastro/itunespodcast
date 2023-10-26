import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './EpisodeDetail.css'

const EpisodeDetail = () => {
  const { podcastId, episodeId } = useParams();
  const [episode, setEpisode] = useState(null);

  useEffect(() => {
    const fetchEpisodeDetail = async () => {
      try {
        const response = await fetch(`https://cors-anywhere.herokuapp.com/https://itunes.apple.com/lookup?id=${podcastId}&entity=podcastEpisode&limit=9`);
        if (!response.ok) {
          throw new Error('No se pudo obtener el detalle del episodio.');
        }
        const data = await response.json();

        if (data && data.resultCount >= 1) {
          const episodeData = data.results[0];
          setEpisode(episodeData);
        } else {
          console.error('La respuesta de la API no contiene el episodio solicitado.');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchEpisodeDetail();
  }, [episodeId, podcastId]);

  if (!episode) {
    return <div>Cargando...</div>;
  }

  const audioUrl = episode.episodeUrl; 

  return (
    <div>
      <Link to={`/podcast/${podcastId}`}>Volver al detalle del podcast</Link>
      <div className='episode-detail-container'>
      <div className="sidebar">
        <img src={episode.artworkUrl100} alt={episode.collectionName} />
        <h2>{episode.collectionName}</h2>
        <p>Autor: {episode.artistName}</p>
        <p>Nombre del episodio: {episode.trackName}</p>
      </div>
      <div className="main-content">
        <h3>Detalles del Episodio</h3>
        <p>Descripción: {episode.collectionCensoredName}</p>
        <p>Duración: {episode.trackTimeMillis} ms</p>
        <p>Fecha de lanzamiento: {episode.releaseDate}</p>
        <audio controls>
          <source src={audioUrl} type="audio/mpeg" />
          Tu navegador no admite la reproducción de audio.
        </audio>
      </div>
      </div>
    </div>
  );
};

export default EpisodeDetail;
