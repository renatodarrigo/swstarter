"use client";

import Box from "@/components/Box";
import styles from "./page.module.css";
import LinkButton from "@/components/LinkButton";
import { usePeopleDetails } from "@/hooks/usePeopleDetails";
import { use } from "react";
import PeopleDetails from "@/components/PeopleDetails";

export default function PeoplePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data, isLoading, isFetching } = usePeopleDetails(id);

  return (
    <div className={styles.peoplepage}>
      <Box>
        <PeopleDetails loading={isLoading || isFetching} personData={data} />
        <div className={styles.nav}>
          <LinkButton href="/">Back to Search</LinkButton>
        </div>
      </Box>
    </div>
  );
}
