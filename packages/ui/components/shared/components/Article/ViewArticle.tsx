import React from 'react';
import { IoMdClose } from 'react-icons/io';
import moment from 'moment';
import { Knowledge_base_icon } from '@localShared/icons/knowledgeBaseIcon';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Props } from './Article.types';

function flatten(text, child) {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
}

function HeadingRenderer(props) {
  var children = React.Children.toArray(props.children);
  var text = children.reduce(flatten, '');
  var slug = text.toLowerCase().replace(/\W/g, '-');
  return React.createElement('h' + props.level, { id: slug }, props.children);
}

const ViewArticle = ({ articleContent, closeModal }: Props) => {
  return (
    <div className="border-transparent cursor-pointer group px-3">
      <div className="flex justify-between items-center gap-3" dir="auto">
        <div className="flex items-center gap-3">
          <Knowledge_base_icon />
          <span className="text-grayCustom capitalize">
            {articleContent?.category?.name}
          </span>
        </div>
        <div
          className="cursor-pointer flex justify-center items-center rounded-full"
          onClick={() => {
            closeModal();
          }}
        >
          <IoMdClose className="text-grayCustom hover:bg-blueCustom/10 p-1 rounded-full h-7 w-7" />
        </div>
      </div>
      <div className="flex justify-between items-center" dir="auto">
        <h5 className="my-3 text-big font-semibold leading-6 text-darkCustom">
          {articleContent?.name}
        </h5>
        <p className="text-grayCustom">
          {moment(articleContent.created_at)
            .format('DD-MM-YYYY - h:mm a')
            .toString()}
        </p>
      </div>
      <div dir="auto">
        <ReactMarkdown
          className="rich-text space-y-3"
          remarkPlugins={[remarkGfm]}
          components={{ h1: HeadingRenderer, h2: HeadingRenderer }}
        >
          {articleContent?.body}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default ViewArticle;
