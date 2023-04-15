// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bodyData = {
    query: `query uniBlocksQuery($short: String, $type: String) {

      \n locale(short: $short) {
        \n universalBlocks(type: $type) {\nposts{\ndata{\nid\nslug\npostTranslate{\nid\ntitle\navatar}}}}}
    
    }`,
    operationName: 'uniBlocksQuery',
    variables: {
      key: 'uni-blocks',
      short: 'br',
      cacheTimeInMS: 60000,
    },
  };

  const response = await fetch('https://conpletus.cointelegraph.com/v1/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyData),
  });

  const data = await response.json();
  const { posts } = data.data.locale.universalBlocks[0];

  const newData: any = [];

  posts.data.forEach((post: any) => {
    const { slug } = post;
    const { title } = post.postTranslate;
    const { avatar } = post.postTranslate;

    newData.push({
      slug,
      title,
      avatar,
    });
  });

  return res.status(200).json([...newData]);
  // return res.status(200).json(data);
}
