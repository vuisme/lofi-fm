/// <reference types="vite-plugin-svgr/client" />
import { ReactComponent as PlayIcon } from "../../icons/play-icon.svg";
import { ReactComponent as PauseIcon } from "../../icons/pause-icon.svg";
import { ReactComponent as SoundIcon } from "../../icons/sound-icon.svg";
import { ReactComponent as SongsIcon } from "../../icons/songs-icon.svg";
import "./player-style.css";
import { useEffect, useRef, useState } from "react";
import Slider from "../Slider";

export type PlayerProps = {
  isPlaying: boolean;
  player: any;
  onPlayPauseClick(isPlaying: boolean): void;
  onPlayListClick?(): void;
};

function Player({
  isPlaying = false,
  player,
  onPlayPauseClick,
  onPlayListClick,
}: PlayerProps) {
  const [videoMeta, setVideoMeta] = useState<any>({});
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    let timerId: any;
    if (player) {
      timerId = setInterval(() => {
        setVideoMeta({
          duration: player.playerInfo.duration,
          current: player.playerInfo.currentTime,
        });
      }, 1000);
      player?.setVolume?.(50);
      setVolume(50);
    }

    return () => clearInterval(timerId);
  }, [player]);

  return (
    <div className="player-container">
      <div className="title">{player?.playerInfo?.videoData?.title}</div>
      <div className="player">
        <div className="progress">
          <div className="slidecontainer">
            <Slider
              min={0}
              max={videoMeta.duration}
              className="slider"
              value={videoMeta.current || 0}
              id="myRange"
              onInput={(e) => {
                const target = e.target as any;
                const val = parseInt(target.value);
                player.seekTo(val, true);
              }}
              background="rgb(0 13 53 / 36%)"
            />
          </div>
        </div>
        <div className="actions">
          <div className="secondary-actions">
            <button onClick={onPlayListClick}>
              <SongsIcon />
            </button>
            <button className="prev">
              <PlayIcon />
            </button>
          </div>
          <button
            onClick={() => onPlayPauseClick(!isPlaying)}
            className="play-pause"
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon className="play" />}
          </button>
          <div className="secondary-actions">
            <button className="next">
              <PlayIcon />
            </button>
            <div className="volume">
              <SoundIcon />
              <Slider
                min={0}
                max={100}
                className="slider"
                value={volume}
                id="myRange"
                onInput={(e: any) => {
                  player.setVolume(e.target.value);
                  setVolume(e.target.value);
                }}
                style={{ transform: "scale(0.7)" }}
                color="#8b90ff"
                background="rgb(0 13 53 / 10%)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;