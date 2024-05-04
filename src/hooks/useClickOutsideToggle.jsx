 import { useEffect, useRef, useState } from "react";

const useClickOutsideToggle = () => {
    // This State will be use to control the burger menu collapse
    const [expanded, setExpanded] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setExpanded(false);
            }
        };
        document.addEventListener("mouseup", handleClickOutside);
        return () => {
            document.removeEventListener("mouseup", handleClickOutside);
        };
    }, [ref]);

    return { expanded, setExpanded, ref }
}

export default useClickOutsideToggle