import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './mainView.css';

const MainView = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [popularPodcasts, setPopularPodcasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado de carga

  useEffect(() => {
    const fetchPopularPodcasts = async () => {
      try {
        const response = await fetch(
          'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
        );

        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de podcasts populares.');
        }

        const data = await response.json();
        const popularPodcasts = data.feed.entry;

        setPodcasts(popularPodcasts);
        setPopularPodcasts(popularPodcasts);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // Cuando finalice la carga, establece el estado de carga en "false"
      }
    };

    fetchPopularPodcasts();
  }, []);

  const handleSearch = (e) => {
    const newText = e.target.value;
    setSearchText(newText);

    if (newText === '') {
      setPodcasts(popularPodcasts);
    } else {
      filterPodcasts(newText);
    }
  };

  const filterPodcasts = (text) => {
    const lowerText = text.toLowerCase();
    const filteredPodcasts = popularPodcasts.filter((podcast) => {
      const title = podcast['im:name'].label.toLowerCase();
      const author = podcast['im:artist'].label.toLowerCase();
      return title.includes(lowerText) || author.includes(lowerText);
    });
    setPodcasts(filteredPodcasts);
  };

  return (
    <div>
      <div className="header">
        <h1>Lista de Podcasts Populares</h1>
        <input
          className="search-input"
          type="text"
          placeholder="Buscar por título o autor"
          value={searchText}
          onChange={handleSearch}
        />
      </div>
      {isLoading ? (
        <div className="loading-message">
          Cargando...
        </div>
      ) : (
        <div className="card-list">
          {podcasts.map((podcast) => (
            <div className="card" key={podcast.id.attributes['im:id']}>
              <img src={podcast['im:image'][2].label} alt={podcast['im:name'].label} />
              <div className="card-content">
                <h3>{podcast['im:name'].label}</h3>
                <p>Por: {podcast['im:artist'].label}</p>
              </div>
              <Link to={`/podcast/${podcast.id.attributes['im:id']}`}>Ver detalles</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MainView;
