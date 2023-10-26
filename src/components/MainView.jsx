import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MainView = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [popularPodcasts, setPopularPodcasts] = useState([]); 

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
      <h1>Lista de Podcasts Populares</h1>
      <input
        type="text"
        placeholder="Buscar por título o autor"
        value={searchText}
        onChange={handleSearch}
      />
      <ul>
        {podcasts.map((podcast) => (
          <li key={podcast.id.attributes['im:id']}>
            <Link to={`/podcast/${podcast.id.attributes['im:id']}`}>{podcast['im:name'].label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainView;
