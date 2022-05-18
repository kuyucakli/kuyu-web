import { useEffect, useState } from "react";

export const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState({ x: null, y: null });
    useEffect(() => {

        const mouseMoveHandler = (event: React.MouseEvent) => {
            const { clientX, clientY } = event;
            setMousePosition({ x: clientX, y: clientY });
        };

        document.addEventListener("mousemove", mouseMoveHandler);

        return () => {
            document.removeEventListener("mousemove", mouseMoveHandler);
        };

    }, []);
    
    return mousePosition;
};
