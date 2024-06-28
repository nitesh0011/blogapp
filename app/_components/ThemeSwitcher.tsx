"use client";

import {useTheme} from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  return (
    <div className="flex flex-col gap-2  text-lg dark:text-white p-2 rounded-md  ">
     
      <button className="text-left hover:underline " onClick={() => setTheme('light')}>Light Mode</button>
      <button className="text-left hover:underline" onClick={() => setTheme('dark')}>Dark Mode </button>
    </div>
  )
};