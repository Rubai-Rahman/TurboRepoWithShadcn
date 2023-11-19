import { GET_CONTACT_BY_IDQuery } from '@api-lib/gql/graphql';
import CustomAccordion from '@localShared/components/CustomAccordion/CustomAccordion';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { BsTwitter } from 'react-icons/bs';

const Social = ({
  maxWidth = 'w-1/4',
  contactData,
}: {
  maxWidth: string;
  contactData: GET_CONTACT_BY_IDQuery['payload'];
}) => {
  const { t } = useTranslation('rightSide');
  return (
    <div className="w-full">
      <CustomAccordion title={t('rightSide.social')} titleClass="font-thin">
        <div className="flex flex-col justify-start items-start gap-3 px-4">
          {/* {options.map((item) => (
              <div key={item.id} className="flex justify-start items-center gap-x-4 gap-y-5">
                <div
                  className={`w-6 h-6 rounded-full flex justify-center items-center ${item.channel.toLowerCase() === "twitter" && "bg-twitter text-white"} ${
                    item.channel.toLowerCase() === "instagram" && "bg-instagram text-white"
                  }`}
                >
                  {item.icon}
                </div>
                <div className="flex flex-col justify-center items- gap-1.5">
                  <div className="flex gap-x-2 items-center">
                    <p className="text-small leading-4 font-semibold text-darkCustom">{item.handle}</p>
                    <p className="text-small leading-4 font-semibold text-grayCustom">{item.channel}</p>
                  </div>
                  <div className="flex justify-between gap-x-4">
                    <div>
                      {item.channel.toLowerCase() === "twitter" && (
                        <p className="text-grayCustom text-small leading-4 font-semibold">
                          <span className="text-darkCustom">{item.tweets}</span> Tweets
                        </p>
                      )}
                      {item.channel.toLowerCase() === "instagram" && (
                        <p className="text-grayCustom text-small leading-4 font-semibold">
                          <span className="text-darkCustom">{item.posts}</span> Posts
                        </p>
                      )}
                    </div>
                    <p className="text-grayCustom text-small leading-4 font-semibold">
                      <span className="text-darkCustom">{item.following}</span> Following
                    </p>
                    <p className="text-grayCustom text-small leading-4 font-semibold">
                      <span className="text-darkCustom">{item.followers}</span> Followers
                    </p>
                  </div>
                </div>
              </div>
            ))} */}
          {contactData?.profile_twitter ? (
            <div className="flex justify-start items-start gap-x-4 gap-y-5 py-3">
              <div className="w-6 h-6 p-1.5 rounded-full flex justify-center items-center bg-twitter text-white">
                <BsTwitter />
              </div>
              <div className="flex flex-col justify-center items- gap-1.5">
                <div className="flex gap-x-2 items-center">
                  <p className="text-small leading-4 font-semibold text-blueCustom">
                    <Link
                      href={`https://twitter.com/${contactData?.profile_twitter.username}`}
                      target="_blank"
                    >
                      @{contactData?.profile_twitter.username}
                    </Link>
                  </p>
                  <p className="text-small leading-4 font-semibold text-grayCustom">
                    twitter
                  </p>
                </div>
                <div className="flex justify-between gap-x-4">
                  <div>
                    <p className="text-grayCustom text-small leading-4 font-semibold">
                      <span className="text-darkCustom">
                        {contactData?.profile_twitter.tweet_count}
                      </span>{' '}
                      Tweets
                    </p>
                  </div>
                  <p className="text-grayCustom text-small leading-4 font-semibold">
                    <span className="text-darkCustom">
                      {contactData?.profile_twitter.following_count}
                    </span>{' '}
                    Following
                  </p>
                  <p className="text-grayCustom text-small leading-4 font-semibold">
                    <span className="text-darkCustom">
                      {contactData?.profile_twitter.followers_count}
                    </span>{' '}
                    Followers
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p>No social profile</p>
          )}
        </div>
      </CustomAccordion>
    </div>
  );
};

export default Social;
