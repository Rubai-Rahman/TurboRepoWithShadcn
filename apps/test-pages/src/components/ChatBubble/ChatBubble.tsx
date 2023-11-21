import {
  BsArrow90DegRight,
  BsThreeDots,
  BsFillEmojiNeutralFill,
  BsFillEmojiFrownFill,
  BsFillEmojiSmileFill,
} from 'react-icons/bs';
import { FiExternalLink } from 'react-icons/fi';
import Image from 'next/image';
import { Button } from '@shadcn/button';
import { ChatBubbleTypes } from './ChatBubble.types';

const ChatBubble = ({
  image = true,
  name = 'Neil Simenson',
  handle = '@neil_simenson',
  last_activity = '19 min',
  message = 'So by colonel hearted ferrars. Draw from upon here gone add one. He in sportsman household otherwise it perceived instantly. Is inquiry no he several excited am. Called though excuse length ye needed it he having.',
  channel = '@alt_care',
}: ChatBubbleTypes) => {
  return (
    <div className="flex gap-x-2">
      <div>
        {image ? (
          <Image
            className="w-10 h-10 rounded-full"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            alt="Rounded avatar"
          />
        ) : null}
      </div>

      <div className="w-2/5 px-3 py-2 border border-newBorder rounded-r-2xl rounded-bl-2xl">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex gap-x-2 items-center">
              <p className="text-small font-semibold leading-4 text-textDark">
                {name}
              </p>

              <p className="text-small font-medium leading-4 text-textGray">
                {handle}
              </p>
            </div>
            <p className="text-small font-medium leading-4 text-textGray">
              {last_activity}
            </p>
          </div>

          <div className="flex gap-x-2">
            <BsFillEmojiNeutralFill className="text-[#BECCFD]" />
            <BsFillEmojiFrownFill className="text-[#BECCFD]" />
            <BsFillEmojiSmileFill className="text-newSuccess" />
          </div>
        </div>
        <p className="text-small font-medium leading-4 text-textDark my-2">
          {message}
        </p>
        <p className="text-small font-medium leading-4 mb-4 text-textGray">
          DM To {channel}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex gap-x-2">
            <Button
              type="button"
              className="border border-newBorder rounded-full text-small font-medium leading-4 px-6 py-1.5 text-textDark"
            >
              Product
            </Button>
            <Button
              type="button"
              className="border border-newBorder rounded-full text-small font-medium leading-4 px-6 py-1.5 text-textDark"
            >
              Sales
            </Button>
            <Button
              type="button"
              className="border border-newBorder rounded-full text-big font-medium text-textGray px-2.5"
            >
              +
            </Button>
          </div>

          <div className="flex gap-x-3 items-center text-textGray">
            <BsArrow90DegRight />
            <FiExternalLink />
            <BsThreeDots />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
