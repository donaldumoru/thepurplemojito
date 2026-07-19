import { useOutletContext } from 'react-router';
import SearchBar from './components/Form';
import GalleryCard from './components/GalleryCard';
import Empty from './components/Empty';
import Pill from './components/Pill';
import TagsContainer from './components/Tags';
import { RotatingSquare } from 'react-loader-spinner';
import Text from './components/Text';
import EmptyContainerText from './components/EmptyContainerText';

function HomeView() {
  const {
    posts,
    postsToRender,
    handleSearch,
    searchQuery,
    emptyTags,
    errorMessage,
  } = useOutletContext();

  return (
    <main>
      <section className="home-view">
        <div className="hero-text-container">
          <Text type="h1" className="main-title">
            Moments, places, and <span>a few things in between</span>
          </Text>
        </div>

        <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />

        {errorMessage ? (
          <Empty>
            <EmptyContainerText>
              <>
                <Text type="h2">{errorMessage}</Text>
                <Text type="p">Come back soon</Text>
              </>
            </EmptyContainerText>
          </Empty>
        ) : posts.size < 1 ? (
          <RotatingSquare
            color="rgb(58, 58, 58)"
            ariaLabel="rotating-square-loading"
            wrapperStyle={{ justifyContent: 'center' }}
          />
        ) : postsToRender.length === 0 ? ( // TODO: fix for when no data to display data is empty and not havent made any memories yet
          <Empty>
            <EmptyContainerText>
              <>
                <Text type="h2">
                  No memories about{' '}
                  <span className="postcard-query">"{searchQuery}"</span> yet
                </Text>
                <Text type="p">
                  But these memories might interest you instead
                </Text>
              </>
            </EmptyContainerText>
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
