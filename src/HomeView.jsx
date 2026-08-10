import { useOutletContext } from 'react-router';
import SearchBar from './components/SearchBar';
import GalleryCard from './components/GalleryCard';
import Empty from './components/Empty';
import Pill from './components/Pill';
import TagsContainer from './components/TagsContainer';
import { RotatingSquare } from 'react-loader-spinner';
import Text from './components/Text';
import EmptyContainerText from './components/EmptyContainerText';
import { useEffect, useRef } from 'react';
import Gallery from './components/Gallery';
import Main from './components/Main';

function HomeView() {
  const {
    posts,
    postsToRender,
    handleSearch,
    searchQuery,
    emptyTags,
    errorMessage,
  } = useOutletContext();

  const mainRef = useRef(null);

  useEffect(() => {
    if (!mainRef.current) {
      return;
    }

    const main = mainRef.current;
    main.classList.replace('opacity-0', 'opacity-100');

    return () => {
      main.classList.replace('opacity-100', 'opacity-0');
    };
  }, []);

  return (
    <Main className="opacity-0 xl:mx-36" ref={mainRef}>
      <Text
        type="h1"
        className="mt-4 mb-10 text-center text-2xl font-light text-(--primary) sm:mb-16 sm:text-[2rem] dark:text-(--dark-primary)"
      >
        Moments, places, and{' '}
        <span className="text-(--accent) italic">a few things in between</span>
      </Text>

      <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />

      {errorMessage ? (
        <Empty>
          <EmptyContainerText>
            <>
              <Text type="h2" className="text-[1.1rem]">
                {errorMessage}
              </Text>
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
              <Text type="h2" className="font-light">
                No memories about{' '}
                <span className="text-(--accent) italic">"{searchQuery}"</span>{' '}
                yet
              </Text>
              <Text
                type="p"
                className="font-light text-(--primary) sm:text-[1.1rem]"
              >
                But these memories might interest you instead
              </Text>
            </>
          </EmptyContainerText>
          <TagsContainer className="justify-center">
            {emptyTags.map(tag => (
              <Pill key={tag} tag={tag} handler={handleSearch} />
            ))}
          </TagsContainer>
        </Empty>
      ) : (
        <Gallery>
          {postsToRender.map(post => (
            <GalleryCard key={post.slug} post={post} />
          ))}
        </Gallery>
      )}
    </Main>
  );
}

export default HomeView;
