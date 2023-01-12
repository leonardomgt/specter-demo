import { Tooltip } from "@mantine/core";
import {
  IconBrandGooglePlay,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandApple,
  TablerIcon,
  IconBrandLinkedin,
} from "@tabler/icons";
import cn from "classnames";

import { Company } from "src/types";

import styles from "./SocialLinks.module.css";

type Props = {
  company: Company;
  vertical?: boolean;
};

const socials = {
  LinkedIn: {
    Icon: IconBrandLinkedin,
    color: "#0077b5",
  },
  Twitter: {
    Icon: IconBrandTwitter,
    color: "#1DA1F2",
  },
  Instagram: {
    Icon: IconBrandInstagram,
    color: "#C13584",
  },
  iTunes: {
    Icon: IconBrandApple,
  },
  "Google Play": {
    Icon: IconBrandGooglePlay,
  },
};

const SocialLinks = ({ company, vertical }: Props) => {
  return (
    <div className={cn(styles.container, { [styles.vertical]: vertical })}>
      {Object.entries(socials).map(([social, props]) => {
        const href = company[`${social} - URL` as keyof Company];
        if (!href) return null;

        return <SocialLink key={social} label={social} href={href} {...props} />;
      })}
    </div>
  );
};

type LinkProps = {
  href: string;
  Icon?: string | TablerIcon;
  label?: string;
  color?: string;
};

const SocialLink = ({ href, Icon, label, color = "#000" }: LinkProps) => {
  return (
    <Tooltip label={label}>
      <a href={href} target="_blank" rel="noreferrer" className={styles.icon_link}>
        {Icon &&
          (typeof Icon === "string" ? (
            <img className={styles.icon} src={Icon} alt={`Nav item: ${label}`} />
          ) : (
            <Icon className={styles.icon} color={color} />
          ))}
      </a>
    </Tooltip>
  );
};

export default SocialLinks;
