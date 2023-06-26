import React, { useState } from "react";
import s from "./styles.module.scss";
import {
  LOWERCASE_LETTERS_SET,
  NUMBERS_SET,
  SYMBOLS_SET,
  UPPERCASE_LETTERS_SET,
} from "./common";
import { message } from "antd";

const PasswordGenerator = () => {
  const [characterLength, setCharacterLength] = useState(8);
  const [password, setPassword] = useState(
    getRandomString(characterLength, NUMBERS_SET)
  );
  const [passWordType, setPasswordType] = useState({
    numbers: true,
    upperCaseLetters: false,
    lowerCaseLetters: false,
    symbols: false,
  });

  const [passwordStrength, setPasswordStrength] = useState("Weak");

  const handleSliderChange = (e) => {
    setCharacterLength(e.target.value);
  };

  const handlePasswordTypeChange = (e) => {
    setPasswordType({
      ...passWordType,
      [e.target.name]: e.target.checked,
    });
  };

  function maxRandomNumber(max) {
    return Math.floor(Math.random() * max);
  }

  function getRandomString(length, characterSet) {
    let random_string = "";
    for (let i = 0; i < length; i++) {
      random_string += characterSet[maxRandomNumber(characterSet.length - 1)];
    }
    return random_string;
  }

  const generatePassword = () => {
    if (
      !passWordType.lowerCaseLetters &&
      !passWordType.numbers &&
      !passWordType.symbols &&
      !passWordType.upperCaseLetters
    ) {
      message.error("Please select any valid type");
      return;
    }
    const characterSet = [
      passWordType.numbers && NUMBERS_SET,
      passWordType.upperCaseLetters && UPPERCASE_LETTERS_SET,
      passWordType.lowerCaseLetters && LOWERCASE_LETTERS_SET,
      passWordType.symbols && SYMBOLS_SET,
    ]
      .filter(Boolean)
      .join("");
    setPassword(getRandomString(characterLength, characterSet));
    getPasswordStrength();
  };

  const getPasswordStrength = () => {
    const values = Object.values(passWordType);
    const trueCount = values.filter((value) => value === true).length;
    if (trueCount === 1) {
      setPasswordStrength("Weak");
    } else if (trueCount === 2 && characterLength > 5 && characterLength < 20) {
      setPasswordStrength("Medium");
    } else if (trueCount === 4 && characterLength >= 8) {
      setPasswordStrength("Strong");
    }
  };

  const handleCopyToClipboard = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      message.success("Copied successfully");
    }
  };

  return (
    <section className={s.wrapper}>
      <h4 className={s.title}>Password Generator</h4>
      <div className={s.cardWrapper}>
        <div className={s.passwordWrapper}>
          <h4 className={s.password}>{password}</h4>
          <button
            className={s.copyBtn}
            title="copy"
            onClick={() => handleCopyToClipboard(password)}
          >
            Copy
          </button>
        </div>
        <div className={s.rangeWrapper}>
          <div className={s.sliderTextWrapper}>
            <h4 className={s.text}>Character length</h4>
            <p>{characterLength}</p>
          </div>
          <div className={s.sliderWrapper}>
            <input
              type="range"
              value={characterLength}
              min="1"
              max="20"
              onChange={(e) => handleSliderChange(e)}
              className={s.slider}
            />
          </div>
        </div>
        <div className={s.checkboxWrapper}>
          <div className={s.labelWrapper}>
            <input
              type="checkbox"
              value={passWordType.upperCaseLetters}
              name="upperCaseLetters"
              id="upperCaseLetters"
              className={s.checkbox}
              onChange={(e) => handlePasswordTypeChange(e)}
            />
            <label htmlFor="upperCaseLetters">includes Uppercase letters</label>
          </div>
          <div className={s.labelWrapper}>
            <input
              type="checkbox"
              value={passWordType.lowerCaseLetters}
              name="lowerCaseLetters"
              id="lowerCaseLetters"
              className={s.checkbox}
              onChange={(e) => handlePasswordTypeChange(e)}
            />
            <label htmlFor="lowerCaseLetters">includes Lowercase letters</label>
          </div>
          <div className={s.labelWrapper}>
            <input
              type="checkbox"
              value={passWordType.numbers}
              checked={passWordType.numbers}
              className={s.checkbox}
              name="numbers"
              id="numbers"
              onChange={(e) => handlePasswordTypeChange(e)}
            />
            <label htmlFor="numbers">includes Numbers</label>
          </div>
          <div className={s.labelWrapper}>
            <input
              type="checkbox"
              value={passWordType.symbols}
              name="symbols"
              className={s.checkbox}
              id="symbols"
              onChange={(e) => handlePasswordTypeChange(e)}
            />
            <label htmlFor="symbols">includes Symbols</label>
          </div>
        </div>
        <div>
          <div className={s.strengthWrapper}>
            <h4 className={s.text}>Strength</h4>
            <p className={`${s.strengthText} ${s[passwordStrength]}`}>
              {passwordStrength}
            </p>
          </div>
          <div className={s.btnWrapper}>
            <button
              className={s.generateBtn}
              onClick={() => generatePassword()}
            >
              Generate Password
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PasswordGenerator;
