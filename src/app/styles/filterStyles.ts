import { css } from "../../../styled-system/css";

const nonSelected = css({
    opacity: 0.5,
    transition: "0.2s ease-in-out",
    _hover: {
        opacity: 1,
    },
});

const selected = css({
    opacity: 1,
    transition: "0.2s ease-in-out",
});

export { nonSelected, selected };
