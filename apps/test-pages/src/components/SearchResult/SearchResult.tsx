import { Button } from '@shadcn/button';
import { SearchTypes } from './SearchResult.types';

function SearchResult({ results, btnText }: SearchTypes) {
  return (
    <div className="max-w-sm space-y-3 w-1/4 px-3 py-2 shadow-sm">
      <div className=" flex items-center justify-between">
        <p className="text-gray-400 text-xs">{results} Results</p>
        <Button className="text-blue-700 text-xs font-Inter font-medium">
          {btnText}
        </Button>
      </div>
    </div>
  );
}

export default SearchResult;
