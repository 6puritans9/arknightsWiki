// import { css } from "$/styled-system/css";

// const spinnerStyles = css({
//     // display: "inline-block",
//     width: "2rem",
//     height: "2rem",
//     border: "4px solid rgba(0,0,0,0.1)",
//     borderRadius: "50%",
//     borderLeftColor: "primary",
//     animation: "spin 1s linear infinite, borderPulse 1s linear infinite",
// });

// const Spinner = () => {
//     return <div className={spinnerStyles} />;
// };

// export default Spinner;

import { css } from "$/styled-system/css";

const wrapper = css({
    display: "inline-block",
    width: "2rem",
    height: "2rem",
});

const spinnerSvg = css({
    width: "100%",
    height: "100%",
    transformOrigin: "50% 50%",
    animation: "spin 1s linear infinite",
});

const spinnerCircle = css({
    fill: "none",
    stroke: "primary",
    strokeWidth: 4,
    strokeLinecap: "round",
    // Animate the arc length
    strokeDasharray: "30, 150",
    strokeDashoffset: 60,
    animation: "dash 2s ease-in-out infinite",
});

export const Spinner = () => (
    <span className={wrapper}>
        <svg className={spinnerSvg} viewBox="22 22 44 44">
            <circle className={spinnerCircle} cx="44" cy="44" r="20" />
        </svg>
    </span>
);

export default Spinner;
