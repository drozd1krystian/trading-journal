import React, { useEffect, useRef, useState } from "react";
import "./style.scss";

// Layouts
import MainLayout from "../../layouts/main.js";

// Icons
import { ReactComponent as CalendarIcon } from "../../assets/calendar.svg";
import { ReactComponent as AddIcon } from "../../assets/add.svg";

// Components
import Button from "../../components/Button";
import CalendarInput from "../../components/Calendar";
import Journal from "../../components/Journal";
import PostForm from "../../components/PostForm";
import { useDispatch, useSelector } from "react-redux";
import {
  addPostStart,
  fetchPostsStart,
  postLoading,
} from "../../redux/Posts/posts.actions";
import InputTag from "../../components/InputTags";

const mapState = ({ posts, user }) => ({
  posts: posts.posts,
  loading: posts.isLoading,
  user: user.currentUser,
});

const DailyJournal = (props) => {
  const [value, onChange] = useState([new Date(), new Date()]);
  const [tags, setTags] = useState([]);
  const { posts, user, loading } = useSelector(mapState);
  const dispatch = useDispatch();
  const journalRef = useRef(null);

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPostsStart({ user: user.id, dateRange: value }));
    }
  }, []);

  const handleFiltersClear = () => {
    onChange([new Date(), new Date()]);
    setTags("");
  };

  const handleSearchInput = (tags) => setTags(tags);

  const handleFilterSubmit = () => {
    dispatch(postLoading());
    dispatch(
      fetchPostsStart({ user: user.id, dateRange: value, search: tags })
    );
    if (!loading) journalRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (postTitle, postComments, postDate, tags) => {
    const post = { postTitle, postComments, postDate, tags };
    dispatch(addPostStart({ post, uid: user.id }));
  };

  return (
    <MainLayout title="Daily Journal">
      <section className="section">
        <h4 className="section_title">
          <CalendarIcon className="icon-small" />
          <span>Filter</span>
        </h4>
        <div className="row">
          <div className="col-3">
            <CalendarInput
              value={value}
              onChange={onChange}
              showDate={true}
              selectRange={true}
              returnValue="range"
            />
          </div>
          <div className="col-3">
            <InputTag
              defaultTags={tags}
              onChange={handleSearchInput}
              limit={3}
            />
          </div>
          <Button handler={handleFilterSubmit}>Filter </Button>
          <Button btnStyle="btn--unstyled" handler={handleFiltersClear}>
            Clear
          </Button>
        </div>
      </section>

      <section className="section">
        <h4 className="section_title">
          <AddIcon className="icon-small" />
          <span>Add Post</span>
        </h4>
        <PostForm handler={handleSubmit}>
          <Button type="submit" btnStyle="btn--submit">
            <AddIcon className="icon-small icon-white" /> Create
          </Button>
        </PostForm>
      </section>
      <Journal posts={posts} title="Trading Journal" journalRef={journalRef} />
    </MainLayout>
  );
};

export default DailyJournal;
