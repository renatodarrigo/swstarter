"use client";

import styles from "./page.module.css";
import Box from "@/components/Box";
import InputForm from "@/components/InputForm";
import Results from "@/components/Results";
import { useSearch } from "@/hooks/useSearch";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "";
  const value = searchParams.get("value") || "";

  const { data, isLoading, isFetching } = useSearch(type, value);

  return (
    <div className={styles.page}>
      <div className={styles.leftcolumn}>
        <Box>
          <InputForm searching={isLoading || isFetching} />
        </Box>
      </div>
      <div className={styles.rightcolumn}>
        <Box>
          <Results data={data} searching={isLoading || isFetching} />
        </Box>
      </div>
    </div>
  );
}
