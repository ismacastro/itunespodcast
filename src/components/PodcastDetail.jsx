import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const PodcastDetail = () => {
  const { podcastId } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [episodes, setEpisodes] = useState(null);

  useEffect(() => {
    const fetchPodcastDetail = async () => {
      try {
        const response = await fetch(`https://cors-anywhere.herokuapp.com/https://itunes.apple.com/lookup?id=${podcastId}`, {
          method: 'GET',
          headers: {
            'Origin': 'http://localhost:5173',
          }
        });
        if (!response.ok) {
          throw new Error('No se pudo obtener el detalle del podcast.');
        }
        const data = await response.json();
    
        console.log('Respuesta de la API:', data);
    
        if (data) {
          const podcastData = data.results[0]; // Suponemos que obtenemos un solo resultado.
          setPodcast(podcastData);
          fetchEpisodes(podcastData.collectionId);
        } else {
          console.error('La respuesta de la API es nula o no contiene la propiedad "results".');
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchEpisodes = async (collectionId) => {
      try {
        const response = await fetch(`https://itunes.apple.com/lookup?id=${collectionId}&entity=podcastEpisode`);
        if (!response.ok) {
          throw new Error('No se pudieron cargar los episodios del podcast.');
        }
        const data = await response.json();
        console.log('Episodios:', data);

        if (data.resultCount > 1) {
          const episodesData = data.results.slice(1); // Ignoramos el primer resultado ya que es el podcast en sí
          setEpisodes(episodesData);
        } else {
          console.error('No se encontraron episodios para este podcast.');
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchPodcastDetail();
  }, [podcastId]);

  if (!podcast) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <Link to="/">Volver a la lista de podcasts</Link>
      <div className="sidebar">
        <img src={podcast.artworkUrl100} alt={podcast.collectionName} />
        <h2>{podcast.collectionName}</h2>
        <p>Autor: {podcast.artistName}</p>
        <p>Descripción: {podcast.collectionCensoredName}</p>
      </div>
      <div className="main-content">
        <h3>Episodios</h3>
        <ul>
          {episodes ? (
            episodes.map(episode => (
              <li key={episode.trackId}>
                <Link to={`/podcast/${podcastId}/episode/${episode.trackId}`}>
                  {episode.trackName}
                </Link>
              </li>
            ))
          ) : (
            <p>Cargando episodios...</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PodcastDetail;
