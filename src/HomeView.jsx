import { useOutletContext } from 'react-router';
import SearchBar from './components/Form';
import GalleryCard from './components/GalleryCard';
import Empty from './components/Empty';
import Pill from './components/Pill';

function HomeView() {
  const { postsToRender, handleSearch, searchQuery, emptyTags } =
    useOutletContext();

  return (
    <main>
      <section className="home-view">
        <div className="hero-text-container">
          <h1 className="main-title">
            moments, places, and <span>a few things in between.</span>
          </h1>
        </div>

        <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />

        {postsToRender.length === 0 ? (
          <Empty searchQuery={searchQuery}>
            <ul>
              {emptyTags.map(tag => (
                <Pill key={tag} tag={tag} handleSearch={handleSearch} />
              ))}
            </ul>
          </Empty>
        ) : (
          <section className="gallery-section">
            {postsToRender.map(post => (
              <GalleryCard key={post.id} post={post} />
            ))}
          </section>
        )}
      </section>
    </main>
  );
}

export default HomeView;
