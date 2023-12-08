import { ChangeEvent, useState } from "react";
import { MdSearch, MdClose } from "react-icons/md";
import styles from "./Search.module.scss";
import { useStoreActions } from "@/app/hooks/useStoreActions";
import { useRouter } from "next/router";

const Search: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const { setFilters, clearFilters } = useStoreActions();
  const router = useRouter();

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    setFilters({ search: inputValue, page: 1, perPage: 10 });
    router.push(`/music?search=${encodeURIComponent(inputValue)}`);
  };

  const clearSearch = () => {
    setInputValue("");
    clearFilters();
    router.push(`/music`);
  };

  return (
    <div className={styles.main}>
      <span className={styles.r_icon}>
        <MdSearch className={styles.icon} />
      </span>
      <input
        className={styles.input_field}
        type="text"
        placeholder="search"
        value={inputValue}
        onChange={(e) => onInputChange(e)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      {inputValue && (
        <span onClick={() => clearSearch()} className={styles.l_icon}>
          <MdClose className={styles.icon} />
        </span>
      )}
    </div>
  );
};

export default Search;