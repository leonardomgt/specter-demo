import { ActionIcon, Skeleton, Tooltip } from "@mantine/core";
import { IconChevronLeft, IconChevronRight, IconMenu2 } from "@tabler/icons";
import cn from "classnames";
import { useContext } from "react";
import { Link } from "react-router-dom";

import { useMatchBreakpoint } from "src/hooks/useMatchBreakpoint";
import { SideMenuContext } from "src/layout/Layout";
import { Company } from "src/types";

import styles from "./CompanyPageHeader.module.css";

export const CompanyPageHeader = ({ company }: { company: Company }) => {
  const { "Company Name": Name, Rank } = company;

  const isLG = useMatchBreakpoint("lg");
  const isMD = useMatchBreakpoint("md");
  const [, setOpened] = useContext(SideMenuContext);

  return (
    <>
      {!isMD && (
        <ActionIcon onClick={() => setOpened(true)} size={40}>
          <IconMenu2 />
        </ActionIcon>
      )}

      <span className={styles.rank}>{Rank}</span>
      <h1 className={cn(styles.title, { [styles.mobile]: !isMD, [styles.tablet]: !isLG })}>
        {Name}
      </h1>
      {isMD && (
        <>
          {Rank && (
            <Tooltip label="Previous">
              <Link to={`/company/${Rank - 1}`}>
                <IconChevronLeft color="#ee4e95" size={40} />
              </Link>
            </Tooltip>
          )}
          <Tooltip label="Next">
            <Link to={`/company/${Rank + 1}`}>
              <IconChevronRight color="#ee4e95" size={40} />
            </Link>
          </Tooltip>
        </>
      )}
    </>
  );
};

export const CompanyPageHeaderSkeleton = () => {
  return (
    <>
      <Skeleton w={50} h={50} radius="md" />
      <Skeleton w={550} h={80} radius="md" mr="auto" />
      <Skeleton w={50} h={50} radius="md" />
      <Skeleton w={50} h={50} radius="md" />
    </>
  );
};
