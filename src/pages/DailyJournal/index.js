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
import { addPostStart } from "../../redux/Posts/posts.actions";

const mapState = ({ posts, user }) => ({
  posts: posts.posts,
  user: user.currentUser,
});

const DailyJournal = (props) => {
  const [value, onChange] = useState(new Date());
  const [search, setSearch] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const { posts, user } = useSelector(mapState);
  const dispatch = useDispatch();

  const handleFiltersClear = () => {
    onChange(new Date());
    setSearch("");
  };

  const handleSubmit = (postTitle, postComments, postDate) => {
    const post = { postTitle, postComments, postDate };
    dispatch(addPostStart(post));
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  const handleRemovePost = (id) => {};

  return (
    <MainLayout title="Daily Journal">
      {showPopup ? <Popup message="Post added successfully!" /> : null}

      <section className="section">
        <h4 className="section_title">
          <CalendarIcon className="icon-small" />
          <span>Filter</span>
        </h4>
        <div className="row">
          <div className="col-3">
            <CalendarInput value={value} onChange={onChange} />
          </div>
          <div className="col-3">
            <Input
              value={search}
              placeholder="Search your journal"
              handler={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button value="Filter" />
          <Button
            value="Clear"
            btnStyle="btn--unstyled"
            handler={handleFiltersClear}
          />
        </div>
      </section>

      <section className="section">
        <h4 className="section_title">
          <AddIcon className="icon-small" />
          <span>Add Post</span>
        </h4>
        <PostForm handler={handleSubmit} />
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
