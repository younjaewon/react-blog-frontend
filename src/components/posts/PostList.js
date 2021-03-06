import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SubInfo from '../../containers/common/SubInfo';
import Tags from '../../containers/common/Tags';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import Responsive from '../common/Responsive';

const PostListBlock = styled(Responsive)`
margin-top: 3rem;
`;

const WritePostButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`;

const PostItemBlock = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  /* 맨 위 포스트는 padding-top 없음 */
  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid ${palette.gray[2]};
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;
    &:hover {
      color: ${palette.gray[6]};
    }
  }
  
  p {
    margin-top: 2rem;
  }
`;

const PostItem = ({ post }) => {
  const { publishedDate, user, tags, title, body, _id } = post;
  return (
    <PostItemBlock>
      <h2><Link to={`/@${user.userName}/${_id}`}>{title}</Link></h2>
      <SubInfo userName={user.userName} publishedDate={new Date(publishedDate)} />
      <Tags tags={tags} />
      <p>{body}</p>
    </PostItemBlock>
  )
}

const PostList = ({ posts, loading, error, showWriteButton }) => {
  if (error) {
    return <PostListBlock>에러가 발생했습니다.</PostListBlock>;
  }

  return (
    <PostListBlock>
      <WritePostButtonWrapper>
        {
          showWriteButton && (
            <Button cyan to="/write">
              새 글 작성하기
            </Button>
          )}
      </WritePostButtonWrapper>
      {
        !loading && posts && (
          <div>
            {posts.map(post => (
              <PostItem post={post} key={post._id} />
            ))}
          </div>
        )}
    </PostListBlock>
  );
};

export default PostList;