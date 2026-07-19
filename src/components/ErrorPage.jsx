import Header from './Header';
import Empty from './Empty';
import EmptyContainerText from './EmptyContainerText';
import Text from './Text';

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
