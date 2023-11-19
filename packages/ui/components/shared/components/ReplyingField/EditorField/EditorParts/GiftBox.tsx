import {
  Grid,
  SearchBar,
  SearchContext,
  SearchContextManager,
} from '@giphy/react-components';
// import Button from "@localShared-components/Button";
import { useContext } from 'react';

// the search experience consists of the manager and its child components that use SearchContext
const GifBox = ({ onGifClick }) => (
  <SearchContextManager
    shouldDefaultToTrending
    apiKey={'4xbo1NYX9EUqUIY8l2Z4IPdBkA844z2O'}
  >
    <Components onGifClick={onGifClick} />
  </SearchContextManager>
);

export default GifBox;

// define the components in a separate function so we can
// use the context hook. You could also use the render props pattern
const Components = ({ onGifClick }) => {
  const { fetchGifs, searchKey } = useContext(SearchContext);

  return (
    <>
      <div className="w-full flex justify-between">
        <SearchBar
          autoFocus
          clear
          className="my-2 ml-2 border overflow-hidden w-[380px] rounded-full"
        />
        {/* <Button icon={<HiOutlineX />} text="" colors="bg-transparent" className="text-2xl" padding="px-3" /> */}
      </div>
      {/** 
              key will recreate the component, 
              this is important for when you change fetchGifs 
              e.g. changing from search term dogs to cats or type gifs to stickers
              you want to restart the gifs from the beginning and changing a component's key does that 
          **/}
      <Grid
        noLink={true}
        hideAttribution
        onGifClick={onGifClick}
        key={searchKey}
        columns={3}
        width={400}
        fetchGifs={fetchGifs}
      />
    </>
  );
};
