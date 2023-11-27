"use client"
import React, { useEffect, useRef } from "react";

const BgLineAnimationFooter = () => {
    const pathOneRef = useRef(null);
    const pathTwoRef = useRef(null);

    useEffect(() => {
        const pathOne = pathOneRef.current;
        const pathTwo = pathTwoRef.current;
        const totalLengthOne = pathOne.getTotalLength();
        const totalLengthTwo = pathTwo.getTotalLength();

        pathOne.style.strokeDasharray = totalLengthOne;
        pathOne.style.strokeDashoffset = totalLengthOne;

        pathTwo.style.strokeDasharray = totalLengthTwo;
        pathTwo.style.strokeDashoffset = 0;

        const animation1 = pathOne.animate(
            [
                { strokeDashoffset: totalLengthOne },
                { strokeDashoffset: -totalLengthOne },
            ],
            {
                duration: 5000,
                easing: "ease-in-out",
                iterations: Infinity,
            }
        );

        const animation2 = pathTwo.animate(
            [{ strokeDashoffset: 0 }, { strokeDashoffset: totalLengthTwo * 2 }],
            {
                duration: 4000,
                easing: "ease-in-out",
                iterations: Infinity,
            }
        );

        return () => {
            animation1.cancel();
            animation2.cancel();
        };
    }, []);
    return (
        <div className="w-[100%]">
            <svg
                viewBox="0 0 1440 709"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[100%]"
                preserveAspectRatio="xMidYMid meet"
            >
                <g>
                    <path
                        d="M-0.000183105 6.57922C212.022 9.36982 347.714 39.5073 444.794 100.963C558.954 173.064 620.07 288.424 688.681 455.122C695.6 468.965 701.942 485.693 722.122 485.693C742.302 485.693 749.221 468.965 756.14 455.122C824.751 289.578 885.867 174.217 1000.03 100.963C1096.36 39.9829 1231.21 9.83826 1440 6.64919"
                        stroke="#27B3FB"
                        strokeWidth="1"
                        ref={pathOneRef}
                        className="opacity"
                    />
                    <path
                        d="M6.10352e-05 313.913C194.266 304.127 339.431 324.037 444.794 377.56C554.014 432.449 621.279 523.38 658.35 652.787C666.639 681.72 692.314 702.881 722.411 702.881C752.507 702.881 778.182 681.72 786.471 652.787C823.543 523.38 890.808 432.449 1000.03 377.56C1104.53 323.389 1247.69 304.321 1440 313.668"
                        stroke="#27B3FB"
                        strokeWidth="1"
                        ref={pathTwoRef}
                        className="opacity"
                    />
                </g>
            </svg>
        </div>
    );
};

export default BgLineAnimationFooter;
