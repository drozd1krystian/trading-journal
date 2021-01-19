import React, { useState, useEffect } from "react";
import "./style.scss";

import Button from "../Button";
import { ReactComponent as RemoveIcon } from "../../assets/cancel.svg";
import { motion, AnimatePresence } from "framer-motion";

const InputTag = ({ defaultTags, onChange, label, limit = 10 }) => {
  const [tags, setTags] = useState(defaultTags ? defaultTags : []);
  const [value, setValue] = useState("");

  const handleRemoveTag = (tagId) => {
    const arr = tags.filter((_, id) => id !== tagId);
    setTags(arr);
    onChange(arr);
  };

  const changeHandler = (e) => {
    if (tags.length === limit) return;
    setValue(e.target.value);
  };

  useEffect(() => {
    if (defaultTags.length === 0) setTags([]);
  }, [defaultTags]);

  const handleInput = (e) => {
    e.preventDefault();
    if (tags.length === limit) return;

    if (e.target.value !== "" && e.target.value !== ",") {
      if (e.key === ",") {
        const newTag = value.trim().split(",")[0];

        if (!tags.includes(newTag) && newTag !== "") {
          const arr = [...tags, newTag];
          setTags(arr);
          onChange(arr);
        }
        setValue("");
      } else if (e.key === "Enter") {
        const newTag = value.trim();

        if (!tags.includes(newTag) && newTag !== "") {
          const arr = [...tags, newTag];
          setTags(arr);
          onChange(arr);
        }
        setValue("");
      }
    }
  };

  return (
    <div className="input_tag">
      {label ? (
        <label htmlFor="tag" className="label">
          {label}
        </label>
      ) : null}

      <ul className="tags input list-unstyled">
        <AnimatePresence>
          {tags.map((el, id) => (
            <motion.li
              className="tag"
              key={id}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: 100 }}
            >
              <Button
                btnStyle="btn--unstyled btn--remove"
                handler={() => handleRemoveTag(id)}
                type="button"
              >
                <RemoveIcon className="tag_remove" />
              </Button>
              <span className="tag_value">{el}</span>
            </motion.li>
          ))}
          <motion.li transition={{ duration: 2 }} className="input_wrap">
            <input
              type="text"
              name="tag"
              className="tag_input"
              placeholder={`Press enter to add tag (max ${limit})`}
              value={value}
              autoComplete="off"
              onKeyUp={handleInput}
              onChange={changeHandler}
              onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
              onKeyPress={(e) => e.key === "Enter" && e.preventDefault()}
            />
          </motion.li>
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default InputTag;
