import React from 'react';
import {
  BsEmojiFrownFill,
  BsFillEmojiNeutralFill,
  BsFillEmojiSmileFill,
} from 'react-icons/bs';

function Reactions() {
  return (
    <div className="w-1/4 flex items-center gap-3">
      <BsFillEmojiNeutralFill className="text-gray-400 hover:text-green-700" />
      <BsEmojiFrownFill className="text-gray-400 hover:text-green-700" />
      <BsFillEmojiSmileFill className="text-gray-400 hover:text-green-700" />
    </div>
  );
}

export default Reactions;
