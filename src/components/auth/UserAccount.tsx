import { User } from "@supabase/supabase-js";
import { flex } from "$/styled-system/patterns";
import { greetMsg } from "@/lib/dictionary";

const boxStyle = flex({
    alignItems: "center",
    gap: "0.5rem",
    maxWidth: "400px",
});

const UserAccount = ({ user }: { user: User }) => {
    const name = user.user_metadata.name || user.user_metadata.full_name;
    // const picture = user.user_metadata.avatar_url;

    return (
        <div className={boxStyle}>
            <span>{greetMsg.ko.replace("${name}", name)}</span>
        </div>
    );
};

export default UserAccount;
