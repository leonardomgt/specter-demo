import { IconBuildingFactory2, IconMapPin, IconRocket } from "@tabler/icons";
import cn from "classnames";

import { Company } from "src/types";

import { IconData } from "../IconData";

import styles from "./CompanyBasicInfo.module.css";

export const CompanyBasicInfo = ({
  company,
  vertical,
}: {
  company: Company;
  vertical?: boolean;
}) => {
  const {
    "HQ Location": HQLocation,
    "HQ Region": HQRegion,
    Industry,
    "Founded Date": FoundedDate,
  } = company;

  return (
    <div className={cn(styles.container, { [styles.vertical]: vertical })}>
      <IconData
        Icon={IconMapPin}
        value={(HQLocation || HQRegion).split(", ").slice(0, 2).join(", ")}
      />
      <IconData Icon={IconBuildingFactory2} value={Industry} />
      <IconData Icon={IconRocket} value={FoundedDate} />
    </div>
  );
};
