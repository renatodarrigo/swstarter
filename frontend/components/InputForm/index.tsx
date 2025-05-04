"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./InputForm.module.css";
import LinkButton from "@/components/LinkButton";
import Radio from "@/components/Radio";
import TextInput from "@/components/TextInput";

export default function InputForm({ searching }: { searching?: boolean }) {
  const [searchType, setSearchType] = useState("people");
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const placeHolderText =
    searchType === "people"
      ? "e.g. Chewbacca, Yoda, Boba Fett"
      : "e.g. The Empire Strikes Back, Return of the Jedi";

  const href =
    searchValue.trim() !== ""
      ? `/?type=${searchType}&value=${searchValue}`
      : "";

  function handleSearchTypeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchType(e.target.value);
    setSearchValue("");
  }

  function handleSearchValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchValue.trim() !== "") {
        router.push(href);
      }
    }
  }

  return (
    <div className={styles.inputform}>
      <p className={styles.title}>What are you searching for?</p>
      <div className={styles.radiogroup}>
        <Radio
          label="People"
          value="people"
          checked={searchType === "people"}
          onChange={handleSearchTypeChange}
        />
        <Radio
          label="Movies"
          value="movies"
          checked={searchType === "movies"}
          onChange={handleSearchTypeChange}
        />
      </div>
      <div>
        <TextInput
          placeholder={placeHolderText}
          value={searchValue}
          onChange={handleSearchValueChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div>
        <LinkButton href={href} disabled={!searchValue}>
          {searching ? "Searching..." : "Search"}
        </LinkButton>
      </div>
    </div>
  );
}
