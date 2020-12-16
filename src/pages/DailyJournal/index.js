import React, { useEffect, useState } from "react";
import "./style.scss";

// Layouts
import MainLayout from "../../layouts";

// Icons
import { ReactComponent as CalendarIcon } from "../../assets/calendar.svg";
import { ReactComponent as AddIcon } from "../../assets/add.svg";

// Components
import Input from "../../components/Input";
import Button from "../../components/Button";
import CalendarInput from "../../components/Calendar";
import "react-calendar/dist/Calendar.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Journal from "../../components/Journal";

const DailyJournal = (props) => {
  const [value, onChange] = useState(new Date());
  const [search, setSearch] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postComments, setPostComments] = useState("");
  const [postDate, setPostDate] = useState(new Date());
  const [journal, setJournal] = useState([]);

  const handleFiltersClear = () => {
    onChange(new Date());
    setSearch("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setJournal((prevState) => [
      ...prevState,
      { postComments, postTitle, postDate },
    ]);

    // Clear Form
    setPostComments("");
    setPostDate(new Date());
    setPostTitle("");
  };

  const handleRemovePost = (id) => {
    setJournal((prevState) => prevState.filter((el) => el === id));
  };

  return (
    <MainLayout title="Daily Journal">
      <section className="section">
        <h4 className="section_title">
          <CalendarIcon className="icon-small" />
          <span>Filter</span>
        </h4>
        <div className="section_content">
          <CalendarInput value={value} onChange={onChange} />
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
        <form className="form">
          <div className="col-10">
            <Input
              label="Post Title"
              value={postTitle}
              name={postTitle}
              handler={(e) => setPostTitle(e.target.value)}
              required
            />
          </div>
          <label className="label">Comments</label>
          <div className="col-10 ">
            <ReactQuill
              className="quill"
              value={postComments}
              onChange={setPostComments}
            />
          </div>
          <div className="col-10 mt-2">
            <label className="label">Choose a date</label>
            <CalendarInput value={postDate} onChange={setPostDate} />
          </div>
          <div className="col-3 mt-2">
            <Button
              type="submit"
              value="Create"
              btnStyle="btn--submit"
              handler={(e) => handleSubmit(e)}
            />
          </div>
        </form>
      </section>
      <Journal
        posts={journal}
        title="Trading Journal"
        removePost={handleRemovePost}
      />
    </MainLayout>
  );
};

export default DailyJournal;
