import { User } from "@supabase/supabase-js";
import { flex } from "$/styled-system/patterns";
import { greetMsg } from "@/lib/dictionary";
import { css } from "$/styled-system/css";

type UserAccountProps = {
    locale: string;
    user: User;
};

const boxStyle = flex({
    alignItems: "center",
    gap: "0.5rem",
    maxWidth: "400px",
});

const textStyle = css({
    fontSize: {
        base: "fBase",
        md: "fMd",
    },
});

const UserAccount = ({ locale, user }: UserAccountProps) => {
    const name = user.user_metadata.name || user.user_metadata.full_name;

    return (
        <div className={boxStyle}>
            <span className={textStyle}>
                {greetMsg[locale].replace("${name}", name)}
            </span>
        </div>
    );
};

export default UserAccount;
