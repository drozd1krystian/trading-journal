import React, { useState } from "react";
import "./style.scss";

import Button from "../Button";
import { ReactComponent as RemoveIcon } from "../../assets/cancel.svg";
import { motion, AnimatePresence } from "framer-motion";

const InputTag = ({ defaultTags, onChange }) => {
  const [tags, setTags] = useState(defaultTags ? defaultTags : []);
  const [value, setValue] = useState("");

  const handleRemoveTag = (tagId) => {
    setTags((prev) => prev.filter((_, id) => id !== tagId));
    onChange(tags);
  };

  const changeHandler = (e) => {
    setValue(e.target.value);
  };
  const handleInput = (e) => {
    e.preventDefault();

    if (e.target.value !== "" && e.target.value !== ",") {
      if (e.key === ",") {
        const newTag = value.trim().split(",")[0];
        if (!tags.includes(newTag) && newTag !== "") {
          const arr = [...tags, newTag];
          setTags(arr);
        }
        setValue("");
      } else if (e.key === "Enter") {
        const newTag = value.trim();

        if (!tags.includes(newTag) && newTag !== "") {
          const arr = [...tags, newTag];
          setTags(arr);
        }
        onChange(tags);
        setValue("");
      }
    }

    if (e.key === "Backspace" && tags.length > 0) {
      const copyOfTags = [...tags];
      copyOfTags.pop();
      setTags(copyOfTags);
    }
  };

  return (
    <div className="input_tag mt-2">
      <label htmlFor="tag" className="label">
        Tags
      </label>

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
              placeholder="Add tag"
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
