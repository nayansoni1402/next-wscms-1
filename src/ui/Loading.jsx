"use client"
import React from 'react'
import gradLoader from '/public/lottie/loading.json';
import dynamic from 'next/dynamic';
const Loading = () => {

    const Player = dynamic(
        () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
        { ssr: false }
    );
    return (
        <div className='flex flex-col space-x-2 justify-center items-center'>
            <Player
                src={gradLoader}
                id="gradLoader"
                autoplay
                loop
            // style={{ width: "90px", height: "90px" }}
            ></Player>
        </div>
    )
}

export default Loading