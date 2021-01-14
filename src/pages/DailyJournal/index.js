import React, { useEffect, useState } from "react";
import "./style.scss";

// Layouts
import MainLayout from "../../layouts/main.js";

// Icons
import { ReactComponent as CalendarIcon } from "../../assets/calendar.svg";
import { ReactComponent as AddIcon } from "../../assets/add.svg";

// Components
import Input from "../../components/Input";
import Button from "../../components/Button";
import CalendarInput from "../../components/Calendar";
import Journal from "../../components/Journal";
import PostForm from "../../components/PostForm";
import Popup from "../../components/Popup";
import { useDispatch, useSelector } from "react-redux";
import { addPostStart, fetchPostsStart } from "../../redux/Posts/posts.actions";

const mapState = ({ posts, user }) => ({
  posts: posts.posts,
  errors: posts.errors,
  user: user.currentUser,
});

const DailyJournal = (props) => {
  const [value, onChange] = useState([new Date(), new Date()]);
  const [search, setSearch] = useState("");
  const { posts, user, errors } = useSelector(mapState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPostsStart({ user: user.id, dateRange: value }));
    }
  }, [dispatch, user]);

  const handleFiltersClear = () => {
    onChange([new Date(), new Date()]);
    setSearch("");
  };

  const handleFilterSubmit = () =>
    dispatch(fetchPostsStart({ user: user.id, dateRange: value, search }));

  const handleSubmit = (postTitle, postComments, postDate) => {
    const post = { postTitle, postComments, postDate };
    dispatch(addPostStart({ post, uid: user.id }));
  };

  const handleRemovePost = (id) => {};

  return (
    <MainLayout title="Daily Journal">
      <Popup
        message={
          errors.length > 0
            ? "Something went wrong."
            : "Post added successfully!"
        }
      />
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
              selectRange={true}
              returnValue="range"
            />
          </div>
          <div className="col-3">
            <Input
              value={search}
              placeholder="Search your journal by title"
              handler={(e) => setSearch(e.target.value)}
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
      <Journal
        posts={posts}
        title="Trading Journal"
        removePost={handleRemovePost}
      />
    </MainLayout>
  );
};

export default DailyJournal;
