import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function TitleDetails() {
  const { titleId } = useParams();
  const [animeInfo, setAnimeInfo] = useState(null);
  const isLoading = useSelector(state => state.anime.isLoading);

  useEffect(() => {
    const fetchAnimeInfo = async () => {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${titleId}`);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();
      setAnimeInfo(responseData.data);
    };
    fetchAnimeInfo();
  }, [titleId]);

  if (isLoading || !animeInfo) {
    return (
      <section>
        <h1>Loading...</h1>
      </section>
    );
  }

  return (
    <section>
      <h1>{animeInfo.title}</h1>
      <img src={animeInfo.images.jpg.image_url} alt={animeInfo.title} />
      <p>{animeInfo.synopsis}</p>
      <ul>
        <li>Type: {animeInfo.type}</li>
        <li>Episodes: {animeInfo.episodes}</li>
        <li>Score: {animeInfo.score}</li>
      </ul>
    </section>
  );
}

export default TitleDetails;
