import { useOutletContext } from 'react-router';
import SearchBar from './components/Form';
import GalleryCard from './components/GalleryCard';
import Empty from './components/Empty';
import Pill from './components/Pill';
import TagsContainer from './components/Tags';
import { RotatingSquare } from 'react-loader-spinner';

function HomeView() {
  const { posts, postsToRender, handleSearch, searchQuery, emptyTags } =
    useOutletContext();

  //     {posts.size < 1 ? (
  //   <Empty isEmpty={true} />
  // ) :

  return (
    <main>
      <section className="home-view">
        <div className="hero-text-container">
          <h1 className="main-title">
            Moments, places, and <span>a few things in between</span>
          </h1>
        </div>

        <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />

        {posts.size < 1 ? (
          <RotatingSquare
            color="rgb(58, 58, 58)"
            ariaLabel="rotating-square-loading"
            wrapperStyle={{ justifyContent: 'center' }}
          />
        ) : postsToRender.length === 0 ? ( // TODO: fix for when no data to display data is empty and not havent made any memories yet
          <Empty searchQuery={searchQuery}>
            <TagsContainer>
              {emptyTags.map(tag => (
                <Pill key={tag} tag={tag} handleSearch={handleSearch} />
              ))}
            </TagsContainer>
          </Empty>
        ) : (
          <section className="gallery-section">
            {postsToRender.map(post => (
              <GalleryCard key={post.slug} post={post} />
            ))}
          </section>
        )}
      </section>
    </main>
  );
}

export default HomeView;
