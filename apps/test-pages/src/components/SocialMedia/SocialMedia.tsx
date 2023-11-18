import { BsTwitter } from 'react-icons/bs';

const data = {
  id: 1,
  handle: '@neil_simenson',
  channel: 'Twitter',
  tweets: 128,
  following: 799,
  followers: 3.7,
  icon: <BsTwitter />,
};

const SocialMedia = () => {
  return (
    <div>
      <div className="flex gap-x-4">
        <div
          className={`w-6 h-6 rounded-full flex justify-center items-center ${
            data.channel.toLowerCase() === 'twitter' && 'bg-twitter text-white'
          }`}
        >
          {data.icon}
        </div>
        <div>
          <div className="flex gap-x-2 items-center">
            <p className="text-black text-base font-semibold">{data.handle}</p>
            <p className="text-xs text-textGray">{data.channel}</p>
          </div>
          <div className="flex justify-between gap-x-4">
            <p className="text-textGray text-xs">
              <span className="font-semibold text-black text-base">
                {data.tweets}
              </span>{' '}
              Tweets
            </p>
            <p className="text-textGray text-xs">
              <span className="font-semibold text-black text-base">
                {data.following}
              </span>{' '}
              Following
            </p>
            <p className="text-textGray text-xs">
              <span className="font-semibold text-black text-base">
                {data.followers}
              </span>{' '}
              Followers
            </p>
          </div>
        </div>
      </div>

      {/* <div className='flex gap-x-4'>
      <div className='text-sm w-6 h-6 rounded-full bg-twitter text-white flex datas-center justify-center'>
        {data.icon}
      </div>
      <div>
        <div className='flex gap-x-2 datas-center'>
          <p className='text-black text-sm font-semibold'>{data.handle}</p>
          <p className='text-xs text-textGray'>{data.channel}</p>
        </div>
        <div className='flex justify-between'>
          <p>
            <span className='font-medium'>{data.tweets}</span>
            Tweets
          </p>
          <p>
            <span className='font-medium'>{data.following}</span>
            Following
          </p>
          <p>
            <span className='font-medium'>{data.followers}K</span>
            Followers
          </p>
        </div>
      </div>
    </div> */}
    </div>
  );
};

export default SocialMedia;
