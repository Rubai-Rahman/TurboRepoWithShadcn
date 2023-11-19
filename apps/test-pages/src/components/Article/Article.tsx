import React, { useState } from 'react';
import { BiGlobe } from 'react-icons/bi';
import ReactMarkdown from 'react-markdown';
import { GET_ALL_KNOWLEDGE_BASE_ARTICLESQuery } from '@api-lib/gql/graphql';
import { Knowledge_base_icon } from '@localShared/icons/knowledgeBaseIcon';
import ViewArticle from './ViewArticle';
import CustomDialog from '@localShared/components/CustomDialog/CustomDialog';

const Article = ({
  kbItem,
}: {
  kbItem: GET_ALL_KNOWLEDGE_BASE_ARTICLESQuery['payload'][0];
}) => {
  const [selected, setSelected] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // const { data: categoryById, isLoading } = useKbCategoriesById(kbItem?.category_id);
  const openMOdal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="w-full group border-b border-newBorder hover:bg-blueCustom/10 cursor-pointer">
      <div
        className={`${
          !!isOpen
            ? 'bg-blueCustom/5 border-blueCustom border-l-2'
            : 'border-transparent'
        } `}
        onClick={() => {
          openMOdal();
        }}
      >
        <div className="p-6 rounded-lg">
          <div className="flex justify-between mb-2">
            <div className="flex items-center gap-x-1 text-grayCustom">
              <Knowledge_base_icon />
              <div className="font-medium text-small leading-4 capitalize">
                {kbItem?.category?.name}
              </div>
            </div>
            <div className="flex gap-x-3">
              <BiGlobe className="text-grayCustom group-hover:text-blueCustom cursor-pointer text-xl" />
              {/* {!!selected && <AiOutlineStar className="text-grayCustom text-xl" />} */}
            </div>
          </div>
          <h5 className="my-3 text-big font-semibold leading-6 text-darkCustom">
            {kbItem?.name}
          </h5>
          <ReactMarkdown className="line-clamp-3 space-y-1">
            {kbItem?.body}
          </ReactMarkdown>
        </div>
      </div>

      <CustomDialog isOpen={isOpen} closeModal={closeModal}>
        <ViewArticle articleContent={kbItem} closeModal={closeModal} />
      </CustomDialog>
    </div>
  );
};

export default Article;
