import React from 'react'
import Link from 'next/link'

const NotFound = () => {
  return (
    <div className='mx-auto max-w-5xl px-6 flex flex-col justify-center items-center'>
       <main
      className="text-center"
      style={{
        height: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h1
        style={{
          color: "white",
          fontSize: "28px",
        }}
      >
        Sorry, the page you requested could not be found
      </h1>
     
      <p style={{ fontSize: "20px" }}>
        please visit <Link href={"/"}>Home page</Link>
      </p>
    </main>
    </div>
  )
}

export default NotFound
