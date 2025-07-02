import { css } from "../../../styled-system/css";

const spinnerStyles = css({
    display: "inline-block",
    width: "2rem",
    height: "2rem",
    border: "4px solid rgba(0,0,0,0.1)",
    borderRadius: "50%",
    borderLeftColor: "primary",
    animation: "spin 1s linear infinite",
});

const Spinner = () => {
    return <div className={spinnerStyles} />;
};

export default Spinner;
