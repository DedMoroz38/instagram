import { useEffect } from "react";

export const useResize = (generateGrid: () => void, posts: any) => {
  useEffect(() => {
    window.addEventListener("resize", () => {
      generateGrid();
    });
    generateGrid();

    return () => {
      window.removeEventListener("resize", generateGrid);
    }
  }, [posts]);
}