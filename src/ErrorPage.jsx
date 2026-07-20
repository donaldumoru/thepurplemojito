import Header from './components/Header';
import Empty from './components/Empty';
import EmptyContainerText from './components/EmptyContainerText';
import Text from './components/Text';

const ErrorPage = () => {
  return (
    <>
      <Header />
      <main>
        <Empty>
          <EmptyContainerText>
            <>
              <Text type="h2">This route doesn't exist!</Text>
            </>
          </EmptyContainerText>
        </Empty>
      </main>
    </>
  );
};

export default ErrorPage;
