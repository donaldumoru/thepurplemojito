import SearchBar from './components/Form';
import GalleryCard from './components/GalleryCard';

import posts from './data/posts.json';

function HomeView() {
  return (
    <main>
      <section className="home-view">
        <div className="hero-text-container">
          <h1>
            moments, places, and <span>a few things in between.</span>
          </h1>
        </div>

        <SearchBar />

        <section className="gallery-section">
          {posts.map(post => (
            <GalleryCard key={post.id} post={post} />
          ))}
        </section>
      </section>
    </main>
  );
}

export default HomeView;
